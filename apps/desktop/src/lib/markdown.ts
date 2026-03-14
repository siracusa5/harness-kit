import DOMPurify from "dompurify";

/**
 * Minimal markdown-to-HTML renderer for plugin documentation.
 * Output is always passed through DOMPurify before use.
 * Uses CSS variable-based inline styles to match the macOS HIG design system.
 */
export function renderMarkdown(md: string): string {
  const raw = md
    // Fenced code blocks (must run before inline code)
    .replace(
      /```(\w*)\n?([\s\S]*?)```/g,
      '<pre style="overflow-x:auto;border-radius:6px;background:var(--bg-base);border:1px solid var(--border-base);padding:12px 14px;font-size:11px;font-family:ui-monospace,monospace;line-height:1.6;margin:10px 0"><code>$2</code></pre>',
    )
    // Headings
    .replace(
      /^#### (.+)$/gm,
      '<h4 style="font-size:12px;font-weight:600;margin:16px 0 4px;color:var(--fg-base)">$1</h4>',
    )
    .replace(
      /^### (.+)$/gm,
      '<h3 style="font-size:13px;font-weight:600;margin:20px 0 6px;color:var(--fg-base)">$1</h3>',
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 style="font-size:14px;font-weight:700;margin:24px 0 8px;color:var(--fg-base)">$1</h2>',
    )
    .replace(
      /^# (.+)$/gm,
      '<h1 style="font-size:15px;font-weight:700;margin:0 0 10px;color:var(--fg-base)">$1</h1>',
    )
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Inline code
    .replace(
      /`([^`]+)`/g,
      '<code style="border-radius:4px;background:var(--bg-base);padding:1px 5px;font-size:11px;font-family:ui-monospace,monospace;color:var(--accent-text)">$1</code>',
    )
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" style="color:var(--accent-text);text-decoration:underline" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    // Unordered lists
    .replace(
      /^- (.+)$/gm,
      '<li style="margin-left:16px;list-style-type:disc;color:var(--fg-muted);margin-bottom:2px">$1</li>',
    )
    // Paragraphs (skip lines that start with HTML tags)
    .replace(
      /^(?!<[hluop]|<li|<pre|<code|<strong|<a|<br)(.+)$/gm,
      '<p style="margin:0 0 8px;color:var(--fg-muted)">$1</p>',
    );

  return DOMPurify.sanitize(raw, {
    ALLOWED_TAGS: ["h1", "h2", "h3", "h4", "p", "pre", "code", "strong", "a", "li", "ul", "ol"],
    ALLOWED_ATTR: ["href", "target", "rel", "style"],
    ALLOW_DATA_ATTR: false,
  });
}
