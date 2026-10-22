# Academic website

This is a static website. Open [index.html](./index.html) to preview it; no build step is required.

## English academic CV

[cv/Zhiyuan_Feng_CV.html](./cv/Zhiyuan_Feng_CV.html) is the editable, self-contained
three-page English CV. [cv/Zhiyuan_Feng_CV.pdf](./cv/Zhiyuan_Feng_CV.pdf) is the printable
PDF version, linked directly from the homepage's contact row. The CV uses the homepage's
verified content as of October 2026, retains full
author lists for 17 selected publications, marks first/co-first authorship, and separates preprints.
Use `First author` when Zhiyuan is listed first, even with equal contribution; use
`Co-first author` for shared first authorship when listed later. Omit equal-contribution
asterisks on the CV's `First author` entries; retain them on `Co-first author` entries.
The homepage retains the papers' original contribution markers.
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

## News milestone accents

News keeps a lightweight date timeline with one decorative `.news-icon` per entry.
Use a small mix of celebration icons for paper acceptances, a book for surveys, a robot
for robotics papers, a microphone for presentations, and launch/completion accents for
internships. Keep the icons fixed rather than random, and mark each `aria-hidden="true"`;
the message itself must communicate the milestone. A shared icon gutter aligns wrapped
text on both desktop and mobile. Retain `.news-acceptance` on accepted-paper entries
for their stronger timeline dot. Do not imply awards where none were received.

## Academic / Cyber styles and day/night modes

The bottom-right FX and Cyber buttons control animation and visual style. Academic
appearance retains the pink/white cherry-blossom petals with the corrected asymmetrical
shape, drifting, swaying and tumbling; the Cyber button switches to an
optional spaceship-cockpit style with cyan/magenta accents, an angular canopy,
approaching octagonal navigation gates, forward star trails, and an energy scanning line.
Wide screens have decorative navigation and propulsion HUDs; they are fictional scene
graphics, not measured site or device telemetry. Desktop pointer movement adds smooth
steering parallax. The two effects do not run together, and
there are no seasonal controls. Entering Cyber automatically selects Night. Returning to
academic style restores a manual mode choice or the current UTC-based mode. The top
Day/Night button remains usable in either style, including manually choosing Cyber's light HUD palette.

Mode (`theme`) and visual style (`visualStyle`) are saved separately and applied before
the first paint. New visitors get academic style with cherry blossoms and enabled effects.
Automatic academic mode uses **UTC 06:00 (inclusive) to 18:00 (exclusive) for Day** and
Night otherwise, independent of local time or the operating system's color scheme.
It updates at most one minute after a boundary and immediately when the page becomes visible.
The shared `getUtcTheme()` helper is used for both initialization and later updates.
Clicking Day/Night in academic style saves an explicit `academicMode` override
(`light` or `dark`); otherwise this preference is `auto`. An explicit choice remains
active across reloads and Cyber visits. Remove the `academicMode` storage key and reload
to return to automatic UTC scheduling. Saved Cyber mode may still be manually set to Day.
`seasonEffects` is retained for the shared FX preference; saved off choices are respected.
Old `season`, `dayTheme`, and `academicTheme` choices are no longer used; legacy cached
academic `theme` values do not override the new automatic UTC default.
If storage is unavailable, switches still work for the visit and a warning is logged.

The background renderer in [cyber-scene.js](./cyber-scene.js) is isolated from content
and uses Canvas without animation libraries. Rendering is capped at 30 frames per second,
160 stars (70 on narrow screens), seven navigation gates, 1.5 device-pixel ratio,
and 2.5 million backing pixels. Detailed HUDs are omitted below 1200px or on short screens.
The scene and scanning line do not capture clicks
or use strobing/glitch flashes. They pause when the page is hidden, stop when Cyber is off
or printing, and become static with reduced motion; mode changes repaint the static scene.
The canvas is attenuated behind the central reading column so trails stay brightest in the margins.
FX-off removes blossoms in academic style and freezes the background animation in Cyber.
Reduced motion disables FX and leaves a static Cyber scene. Blossoms remain limited to
24 particles (12 on narrow screens); all nested animations pause when the page is hidden.
All controls support Enter/Space and visible keyboard focus. CV PDF styling is independent.

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
HarnessPro and EnactOpt belong to harnesses and are listed as arXiv 2026 preprints.
TaskGround belongs to both harnesses and benchmarks; specialized work such as VolSplat,
TransDiff, and DCRNN currently remains in All.

The controls appear only after JavaScript initializes. Without JavaScript, the complete publication list remains visible.
Filter styles in [stylesheet.css](./stylesheet.css) follow day/night mode.

## Publication previews

HarnessPro and EnactOpt use `*-preview.png` thumbnails in [images/publish/](./images/publish/).
Each preview stacks the original overview above its corresponding `*2.png` results panel,
matching their widths while preserving aspect ratios and leaving a small white gap.
Keep both source panels when regenerating previews. Clicking a thumbnail opens the full combined image.

## Personal photo gallery

The homepage's Life link opens the standalone [Beyond Research gallery](./life/index.html).
The homepage no longer embeds the personal photos. The gallery uses a newest-first year timeline:

- **2026-09-04:** Kuaishou / Kling AI internship (`1_20260904.jpg`).
- **2025-05-17:** Microsoft 2025 Family Day (`2_20250517.jpg`).
- **2025-05-17:** Beijing Laffitte Chateau, with both photos in one entry
  (`3_20250517.jpg` and `4_20250517.jpg`). No within-day ordering is implied.

[images/life/](./images/life/) contains dated, full-frame `*-thumb.jpg` previews and larger JPEGs,
re-encoded without source EXIF metadata. Full photos are capped at 1600px on the long edge,
and user originals are untouched. The opening portrait loads immediately; later previews are
lazy-loaded. Full photos load only when opened. Screens up to 720px use a single-column album.

[appearance-init.js](./appearance-init.js) applies the same saved/UTC day-night appearance
on both pages before the first paint. The gallery has its own warm paper palette and gentle
ambient light rather than the homepage's blossom/Cyber effects. Its layout is isolated in
[life/gallery.css](./life/gallery.css).

[life/gallery.js](./life/gallery.js) controls the Motion button, two drifting background
lights, six floating warm light points (four on narrow screens), and one-time card entrances.
On shows the ambient layer; Off fades it out instead of merely freezing an almost identical
background. The light points stay in the margins or behind opaque photo cards, never over the
photos. Hover-capable devices also get a slight lift on photo frames.
Motion uses the existing `seasonEffects` FX preference, so a
saved off choice is respected on both pages. Reduced motion always disables these effects
without overwriting that preference; animations pause while the page is hidden. Background
lights never receive pointer events, and photos remain visible if JavaScript or scroll
observation is unavailable. Without JavaScript, the warm palette remains static.

Photo links and year navigation work without JavaScript. With JavaScript, the gallery and paper
figures share [image-viewer.js](./image-viewer.js) and [image-viewer.css](./image-viewer.css), with
descriptive alternative text, a keyboard-accessible close button, Escape support, and native focus
management. New memories should retain semantic dates, meaningful alt text, image dimensions,
and links to the uncropped photos; keep the timeline and displayed counts synchronized.