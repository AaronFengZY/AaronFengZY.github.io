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

## Cherry blossoms and day/night modes

The navigation bar controls Day/Night. A compact bottom-right FX button independently
controls the cherry-blossom animation. There is no seasonal selector: pink/white petals
with a notched silhouette drift, sway, and tumble against a soft pink/purple background
in both modes.

The current mode (`theme`) and animation preference (`seasonEffects`, retained for
compatibility) are saved in local storage. The first visit follows the system's light/dark
preference and enables blossoms unless reduced motion is requested. Previously saved
FX-off choices remain respected; old `season` and `dayTheme` choices are no longer used.
Mode is applied before the first paint. If storage is unavailable, controls still work
for the current visit and a warning is logged.

The SVG petals use only nested CSS transform/opacity animations and are limited to
24 particles (12 on narrow screens). Every animation layer pauses when the page is hidden.
FX-off and reduced motion remove the complete particle tree. Enter/Space work on both
buttons; no external images or animation libraries are required.

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
Filter styles in [stylesheet.css](./stylesheet.css) follow day/night mode.