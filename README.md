# Academic website

This is a static website. Open [index.html](./index.html) to preview it; no build step is required.

## Day and night modes

The navigation bar has a Day/Night toggle. It shares the same theme state as the floating
light, sepia, blue, and dark background presets. Switching back to Day restores the last
daytime background, including sepia or blue.

The current theme (`theme`) and daytime background (`dayTheme`) are saved in local storage.
On the first visit, with no valid saved theme, the site uses the system's light/dark preference.
The saved theme is applied before the page renders to avoid a flash of the wrong mode.
If browser storage is unavailable, switching still works for the current visit and a warning
is logged; the initial mode still follows the system preference.

## Publication filters

Selected Papers supports All, Agent harnesses, Foundation models, and Benchmarks and evaluation.
All is the default and displays every paper. Filtering preserves publication order and first-author highlighting.

Each active paper row in [index.html](./index.html) needs a `data-categories` attribute:

- `harnesses`: agent systems and inference-time reasoning frameworks.
- `models`: foundation-model learning, architectures, and related surveys.
- `benchmarks`: benchmark construction and evaluation.

Separate multiple categories with spaces, for example `data-categories="harnesses benchmarks"`.
Use `data-categories=""` for earlier work outside the current research areas, shown only in All.
TaskGround belongs to both harnesses and benchmarks; TransDiff and DCRNN currently remain in All.

The controls appear only after JavaScript initializes. Without JavaScript, the complete publication list remains visible.
Filter styles in [stylesheet.css](./stylesheet.css) follow the existing light, sepia, blue, and dark themes.