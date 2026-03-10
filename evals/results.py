"""Result aggregation and JSON output."""

import json
from datetime import datetime, timezone
from pathlib import Path


def compute_metrics(trials: list[dict]) -> dict:
    """Compute pass@1, pass@N, pass^N, and weighted quality score."""
    n = len(trials)
    if n == 0:
        return {"pass_at_1": 0.0, "pass_at_n": 0.0, "pass_all_n": 0.0, "weighted_score": 0.0}

    structure_passes = [t["structure_passed"] for t in trials]
    pass_at_1 = sum(structure_passes) / n
    pass_at_n = 1.0 if any(structure_passes) else 0.0
    pass_all_n = 1.0 if all(structure_passes) else 0.0

    quality_scores = [t["quality_score"] / max(t["quality_max"], 1) for t in trials]
    weighted_score = sum(quality_scores) / n

    return {
        "pass_at_1": round(pass_at_1, 3),
        "pass_at_n": round(pass_at_n, 3),
        "pass_all_n": round(pass_all_n, 3),
        "weighted_score": round(weighted_score, 3),
    }


def write_results(task_results: list[dict], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "run_at": datetime.now(timezone.utc).isoformat(),
        "task_results": task_results,
    }
    with open(output_path, "w") as f:
        json.dump(payload, f, indent=2)
    print(f"\nResults written to {output_path}")
