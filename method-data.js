window.LOT_METHOD_EXAMPLES = [
  {
    "title": "An ornate owl",
    "label": "Semantic masks",
    "tokens": 2208,
    "denseTokens": 3456,
    "panels": [
      {
        "src": "assets/results/method-sam3_mask-13-cue.webp",
        "label": "Semantic masks",
        "type": "image"
      },
      {
        "src": "assets/results/method-sam3_mask-13-grid.svg",
        "label": "LoT layout",
        "type": "image"
      },
      {
        "src": "assets/results/method-sam3_mask-13-generated.webp",
        "label": "Generation",
        "type": "image"
      }
    ]
  },
  {
    "title": "A knight in silver armor",
    "label": "Bounding boxes",
    "tokens": 979,
    "denseTokens": 4096,
    "panels": [
      {
        "src": "assets/results/method-sam3_box-8-cue.webp",
        "label": "Bounding boxes",
        "type": "image"
      },
      {
        "src": "assets/results/method-sam3_box-8-grid.svg",
        "label": "LoT layout",
        "type": "image"
      },
      {
        "src": "assets/results/method-sam3_box-8-generated.webp",
        "label": "Generation",
        "type": "image"
      }
    ]
  },
  {
    "title": "Glossy ibis in the grass",
    "label": "Depth of field",
    "tokens": 961,
    "denseTokens": 2560,
    "prompt": "Main subject is the primary subject on the focal plane in tack-sharp focus. A pair of glossy ibis in a lush, grassy environment. One bird prominently displays dark, iridescent plumage and a long, curved beak, while the other is partially obscured in the background. Compose the scene so the focused region is visually dominant, with clear foreground and background layers. Use soft directional light with realistic falloff, natural color, and faithful material texture at the focal plane. Render it as photorealistic shallow-depth-of-field photography through an 85mm lens at f/2, with natural circular bokeh and smooth optical defocus as distance from the focal plane increases.",
    "panels": [
      {
        "label": "Depth of field",
        "type": "image",
        "src": "assets/results/source-image-dof-1-cue.webp"
      },
      {
        "label": "LoT layout",
        "type": "image",
        "src": "assets/results/source-image-dof-1-grid.svg"
      },
      {
        "label": "LoT-Flux.2-9B",
        "type": "image",
        "src": "assets/results/source-image-dof-1-generated.webp"
      }
    ]
  }
];
