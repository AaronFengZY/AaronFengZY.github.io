# Academic website

This is a static website. Open [index.html](./index.html) to preview it; no build step is required.

## English academic CV

[cv/Zhiyuan_Feng_CV.html](./cv/Zhiyuan_Feng_CV.html) is the editable, self-contained
three-page English CV. [cv/Zhiyuan_Feng_CV.pdf](./cv/Zhiyuan_Feng_CV.pdf) is the printable
PDF version, linked directly from the homepage's contact row. The CV uses the homepage's
verified content as of October 2026, retains full
author lists for 15 selected publications, marks first authorship, and separates preprints.
The undergraduate degree is written without a B.S./B.E. abbreviation because the homepage
currently uses both; confirm the official degree type before changing it.

To update the PDF, edit the HTML and print from a Chromium browser using A4 paper,
100% scale, no browser headers/footers, no extra margins, and background graphics enabled.
The page padding and page numbers are part of the document. Keep the CV synchronized with
the homepage after changes to publications, experience, or service.

## Google Search Console verification

The URL-prefix property `https://aaronfengzy.github.io/` uses HTML-file ownership verification.
Keep [google6920066431803359.html](./google6920066431803359.html) at the website root with its
original filename and contents. After deployment, confirm the file is accessible at
`https://aaronfengzy.github.io/google6920066431803359.html`, then click Verify in Search Console.
Do not remove the file after verification; Google can check it again to confirm ownership.

## Seasons and day/night modes

The navigation bar controls Day/Night, independently of the bottom-right Spring, Summer,
Autumn, and Winter controls. Every season works in both modes. Purple link accents remain
consistent while seasonal backgrounds and decorative effects change:

- Spring: soft pink/purple tones and drifting petals.
- Summer: warm light/green tones and floating glimmers.
- Autumn: warm amber tones and falling leaves.
- Winter: cool blue tones and falling snow, including snowflake shapes.

The current mode (`theme`), season (`season`), and animation preference (`seasonEffects`)
are saved in local storage and restored on reload. The first visit uses the system's
light/dark preference and defaults to Autumn. Old sepia/blue preferences migrate to
Autumn/Winter; the old `dayTheme` value is used only for this migration.
Mode and season are applied before the first paint. If storage is unavailable,
controls still work for the current visit and a warning is logged.

The FX button can disable or re-enable animations without changing the season or mode.
Effects are noninteractive background decoration, use only CSS transform/opacity animation,
and are limited to 24 particles (12 on narrow screens). Animations pause when the page is
hidden and are removed when the system requests reduced motion. Arrow keys and Home/End
select seasons; Enter/Space work on the mode and FX buttons.

Homepage, advisor, and publication-author links share `--link-color` and
`--link-hover-color` in [stylesheet.css](./stylesheet.css). Each background theme
defines its own shades; dark mode keeps a brighter link color for readability.
Text links use a semibold weight of 600, while publication titles retain their existing bold weight.

## News

News uses a lightweight timeline with aligned dates; narrow screens place each date above its
message. Acceptance announcements have three decorative celebration icons before the message,
hidden from screen readers. Dates, message text, and links are unchanged by the layout.

## Publication filters

Selected Papers supports All, Agent harnesses, Foundation models, and Benchmarks and evaluation.
All is the default and displays every paper. Filtering preserves publication order and first-author highlighting.

Each active paper row in [index.html](./index.html) needs a `data-categories` attribute:

- `harnesses`: agent systems and inference-time reasoning frameworks.
- `models`: foundation-model learning, architectures, and related surveys.
- `benchmarks`: benchmark construction and evaluation.

Separate multiple categories with spaces, for example `data-categories="harnesses benchmarks"`.
Use `data-categories=""` for work outside the current research areas, shown only in All.
TaskGround belongs to both harnesses and benchmarks; specialized work such as VolSplat,
TransDiff, and DCRNN currently remains in All.

The controls appear only after JavaScript initializes. Without JavaScript, the complete publication list remains visible.
Filter styles in [stylesheet.css](./stylesheet.css) follow day/night mode across all four seasons.