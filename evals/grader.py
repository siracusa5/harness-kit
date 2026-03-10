"""Graders for eval tasks: code-based (fast, free) and model-based (Haiku)."""

import json
import re
from dataclasses import dataclass

import anthropic

from config import GRADER_MODEL


@dataclass
class GradeResult:
    name: str
    passed: bool
    score: float
    detail: str


class SectionGrader:
    """Check that required H2 sections exist in output."""

    def grade(self, output: str, task: dict) -> list[GradeResult]:
        required = task.get("expectations", {}).get("structure", {}).get("required_sections", [])
        results = []
        for section in required:
            found = bool(
                re.search(rf"^##\s+{re.escape(section)}", output, re.MULTILINE | re.IGNORECASE)
            )
            results.append(
                GradeResult(
                    name=f"section:{section}",
                    passed=found,
                    score=1.0 if found else 0.0,
                    detail=f"Section '## {section}' {'found' if found else 'not found'} in output",
                )
            )
        return results


class WordCountGrader:
    """Check min/max word count."""

    def grade(self, output: str, task: dict) -> list[GradeResult]:
        structure = task.get("expectations", {}).get("structure", {})
        min_words = structure.get("min_words")
        max_words = structure.get("max_words")
        word_count = len(output.split())
        results = []
        if min_words is not None:
            passed = word_count >= min_words
            results.append(
                GradeResult(
                    name="word_count:min",
                    passed=passed,
                    score=1.0 if passed else 0.0,
                    detail=f"Word count {word_count} {'≥' if passed else '<'} min {min_words}",
                )
            )
        if max_words is not None:
            passed = word_count <= max_words
            results.append(
                GradeResult(
                    name="word_count:max",
                    passed=passed,
                    score=1.0 if passed else 0.0,
                    detail=f"Word count {word_count} {'≤' if passed else '>'} max {max_words}",
                )
            )
        return results


class ContainsGrader:
    """Check must_contain / must_not_contain strings."""

    def grade(self, output: str, task: dict) -> list[GradeResult]:
        structure = task.get("expectations", {}).get("structure", {})
        must_contain = structure.get("must_contain", [])
        must_not_contain = structure.get("must_not_contain", [])
        results = []
        for phrase in must_contain:
            found = phrase.lower() in output.lower()
            results.append(
                GradeResult(
                    name=f"contains:{phrase}",
                    passed=found,
                    score=1.0 if found else 0.0,
                    detail=f"Required phrase '{phrase}' {'found' if found else 'not found'}",
                )
            )
        for phrase in must_not_contain:
            found = phrase.lower() in output.lower()
            results.append(
                GradeResult(
                    name=f"not_contains:{phrase}",
                    passed=not found,
                    score=1.0 if not found else 0.0,
                    detail=f"Forbidden phrase '{phrase}' {'found (FAIL)' if found else 'not found (pass)'}",
                )
            )
        return results


class ModelGrader:
    """Model-based quality grader using Haiku."""

    def __init__(self, client: anthropic.Anthropic):
        self.client = client

    def grade(self, output: str, task: dict) -> list[GradeResult]:
        criteria = task.get("expectations", {}).get("quality", [])
        return [self._grade_one(output, c) for c in criteria]

    def _grade_one(self, output: str, criterion: dict) -> GradeResult:
        text = criterion.get("criterion", "")
        weight = criterion.get("weight", 1)
        prompt = (
            "You are evaluating an AI assistant's response against a rubric criterion.\n\n"
            f"Criterion: {text}\n\n"
            "Response to evaluate:\n"
            "---\n"
            f"{output[:8000]}\n"
            "---\n\n"
            'Reply with valid JSON only, no prose: {"pass": true, "reason": "brief explanation"}'
        )
        try:
            msg = self.client.messages.create(
                model=GRADER_MODEL,
                max_tokens=256,
                messages=[{"role": "user", "content": prompt}],
            )
            raw = msg.content[0].text.strip()
            match = re.search(r"\{.*\}", raw, re.DOTALL)
            if match:
                data = json.loads(match.group())
                passed = bool(data.get("pass", False))
                reason = data.get("reason", "")
            else:
                passed = False
                reason = f"Could not parse grader response: {raw[:100]}"
        except Exception as e:
            passed = False
            reason = f"Grader error: {e}"

        return GradeResult(
            name=f"quality:{text[:60]}",
            passed=passed,
            score=float(weight) if passed else 0.0,
            detail=reason,
        )


_CODE_GRADERS = [SectionGrader(), WordCountGrader(), ContainsGrader()]


def run_code_graders(output: str, task: dict) -> list[GradeResult]:
    results = []
    for grader in _CODE_GRADERS:
        results.extend(grader.grade(output, task))
    return results


def run_model_graders(
    output: str, task: dict, client: anthropic.Anthropic
) -> list[GradeResult]:
    return ModelGrader(client).grade(output, task)
