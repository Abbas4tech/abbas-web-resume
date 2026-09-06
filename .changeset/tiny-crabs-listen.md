---
"abbas-web-resume": patch
---

Filled the remaining block-registry and rich-text coverage gaps identified in ADR 0021: `ContentList` now has a dispatch test for each of its four registered block types (was only testing CardGrid), and `RichText` now covers every supported node type (headings 1-6, ordered/unordered lists, blockquotes, tables) and text mark (bold, italic, underline, code), plus the function-form `headingClass` prop. Both files reach 100% statement/branch coverage.
