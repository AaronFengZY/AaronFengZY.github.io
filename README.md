# Academic website

This is a static website. Open [index.html](./index.html) to preview it; no build step is required.

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