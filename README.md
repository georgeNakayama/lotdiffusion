# Level-of-Token Diffusion project page

A responsive, static project page inspired by https://reconfusion.github.io/.
No build step or JavaScript dependencies are required.

## Preview

Open `index.html` directly, or serve this directory:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000. Clipboard copying requires localhost or HTTPS;
the citation remains selectable when clipboard access is unavailable.

## Content

- `index.html`: paper header, exact abstract, method summary, and provisional BibTeX.
- `style.css`: layout and typography.
- `assets/paper.pdf`: the supplied anonymous manuscript.
- `assets/method.png`: Figure 3 extracted from page 5 of the supplied manuscript.
- The empty `.teaser-placeholder` before the abstract reserves space for a future video.
- Results between Method and Citation include agent-assisted image/video demos, typography, and bounding-box layouts.

The manuscript names only “Anonymous authors”. No author names, affiliations, venue,
or arXiv identifier have been invented. The provisional `@unpublished` citation uses 2026 from the supplied
PDF's September 2026 creation date; verify the year and replace the author and
publication metadata before release.

To add a teaser, replace the empty placeholder with a `<video controls muted playsinline>`
and a local source. Set its width to 100%. Edit the selected examples in `results-data.js`.

## GitHub Pages

After reviewing the content and pushing it, select **Settings → Pages → Deploy from a
branch → main → / (root)** in the repository. All asset paths are relative, so the site
works under the repository's Pages path. This task does not publish the site.

## Credits

Layout inspiration: ReconFusion. This site's HTML, CSS, and JavaScript were written
for this project; no ReconFusion images, videos, or research text are included.
Lato fonts are bundled under the SIL Open Font License; see `assets/OFL.txt`.

## Animated method figure

`assets/method-animated.gif` is a 12.8-second looping walkthrough of Figure 3.
Components fade in sequentially and remain visible as the pipeline builds up.
Highlights and captions illustrate data flow; this is a schematic animation, not
an actual model inference recording. The page plays the animation automatically, defaults to the static figure for
reduced-motion preferences, and keeps
the original high-resolution image available by clicking the figure.

To regenerate the GIF, install `sharp` in your Node environment and run
`node scripts/animate-method.cjs`. The generator uses the original diagram as its
background and adds deterministic vector highlights and stage captions.

## Selected supplementary results

`results-data.js` stores two curated examples for each of four galleries, rendered by
`results.js`: agent-assisted videos (toy train, girl and corgi), agent-assisted images
(girl and corgi, studio portrait), typography (flowering letters, cosmic materials),
and bounding-box layouts (living room, still life). Assets are local in `assets/results/`;
`sources.json` records their original paths in the supplementary material. Bounding-box layout PNGs
include exact token boundaries from the associated layout JSON files.

Token counts and prompts come from the source manifests. Compression is computed as
full-resolution tokens divided by LoT tokens; it is not a generation speedup claim.
Workflow recordings load only when expanded. Videos play together when visible,
pause offscreen, and respect reduced-motion preferences.

### Shared layout colors

Agent image and video layouts use the same token-area palette as the typography
examples (pink for one finest-grid cell, progressing through peach and pale blue
for larger areas). A shared legend includes rectangular edge tokens by area.
Image SVGs preserve the original grid boundaries, recovered from the source grid
images and checked against the published token counts (1,546 and 892). Video
layouts are drawn from geometry in `layouts-data.js`, synchronized to the generated
video: 50,832 train tokens recovered from the grid video and 32,001 corgi tokens
from the original grid NPZ. Original downloaded media remain available unchanged.

The expanded galleries also include the platformer bounding-box scene and the
user-painted GUI recording. The manual demo is labeled as user-created and has
no GPT-6 attribution. The platformer shows the scene plan, derived layout, and generation. Its muted
layout is recovered from the correct `scene-layout-overlay.mp4` preview. All 21 temporal slices are recovered from actual playback frames and checked
against the published 34,698-token count. The canvas follows video playback.

## Layout-adaptive generation from different sources

Two additional galleries follow the agent demos, with five examples per source:
semantic masks, bounding boxes, texture variance, and depth of field (40 examples
total). Source tabs select the cue type, and a second row selects an example; each
source remembers its last selection. The video
examples use the supplementary showcase's compressed exact token geometry,
decoded into all 21 temporal slices. Image layouts are reconstructed from the
lossless grayscale grid values and rendered with the shared muted palette; counts
and lattice dimensions are checked against the manifest. Image results use the
source's 9B outputs and are labeled LoT-Flux.2-9B. Video outputs use LoT-Wan2.1-14B.
Source cues retain their original visualizations; token layouts use the shared
palette. Original asset paths are recorded in `assets/results/sources.json`.


## Native supplementary site

The complete supplementary site is served from `supplementary/`, including local
images, videos, 3D assets, scripts, and data. The main page and result-section links
use relative URLs so they work under the GitHub Pages project prefix. The PDF
links to `https://georgenakayama.github.io/lotdiffusion/supplementary/`.
