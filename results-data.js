window.LOT_RESULTS = [
  {
    "id": "agent-video",
    "title": "Agent-assisted video generation",
    "intro": "An agent plans where detail matters over time, using an animated 3D scene or painted keyframes. LoT turns that plan into a temporal token layout for video generation.",
    "examples": [
      {
        "title": "A toy train through a miniature town",
        "label": "Toy train",
        "description": "Train, houses, trees: 1×1 tokens · Ground, tracks: 2×2 · Sky: 4×4.",
        "tokens": 50832,
        "denseTokens": 75600,
        "prompt": "A charming realistic miniature red toy locomotive pulling two passenger carriages, blue and yellow, winds smoothly around a curved railway through a handcrafted miniature town. The train rolls continuously forward with rotating wheels and carriages following the curve. Small cream houses with red roofs, tiny windows, green model trees, wooden sleepers and steel rails surround the track. A low foreground house briefly occludes part of the passing train. The camera tracks smoothly alongside the train and gently lowers, revealing changing angles of the locomotive and the town with clear parallax. Warm daylight, believable miniature materials, stable geometry, one continuous shot, no cuts, no reversal, no text or logos. The locomotive leads exactly two passenger carriages, maintaining consistent spacing and proportions around the bend. Detailed handcrafted house facades, roof tiles, miniature trees and carriage windows remain stable as the camera follows. The sky is clear and uniform.",
        "panels": [
          {
            "label": "Scene plan",
            "src": "assets/results/video-train-0.mp4",
            "type": "video"
          },
          {
            "label": "LoT layout",
            "src": "assets/results/video-train-1.mp4",
            "type": "video"
          },
          {
            "label": "Generated video",
            "src": "assets/results/video-train-2.mp4",
            "type": "video"
          }
        ]
      },
      {
        "title": "A girl playing with a corgi",
        "label": "Girl & corgi",
        "description": "Fine tokens follow the girl and corgi; coarser tokens cover the background.",
        "tokens": 32001,
        "denseTokens": 75600,
        "prompt": "A continuous live-action video showing a little girl and a Pembroke Welsh corgi actively playing in a sunny park. Locked-off wide camera, full bodies visible throughout. On the left, the girl in a red pinafore and cream shirt starts crouching, rises to a half-standing position while lifting both arms excitedly, then bends her knees and crouches again, reaching forward and laughing. On the right, the golden-and-white corgi trots several steps left toward a small red ball in the lower center, makes a clear little upward hop with its paws leaving the ground, lands, and bounces forward again. Show visible coordinated leg movement, changing body height, swinging arms, and bouncing ears and fur throughout the shot. The girl stays in the left third while the corgi moves within the right half, with a little space between them. Natural anatomy and fluid energetic motion. Textured green grass, yellow and white foreground wildflowers in both lower corners, a hedge and leafy trees across the middle background, a slender tree trunk at the far right. Smooth pale blue sky in the upper fifth. Warm morning light, realistic shadows. No cuts or zoom, no text or watermark.",
        "panels": [
          {
            "label": "Detail map",
            "src": "assets/results/video-corgi-0.mp4",
            "type": "video"
          },
          {
            "label": "LoT layout",
            "src": "assets/results/video-corgi-1.mp4",
            "type": "video"
          },
          {
            "label": "Generated video",
            "src": "assets/results/video-corgi-2.mp4",
            "type": "video"
          }
        ],
        "recording": "assets/results/video-corgi-workflow.mp4",
        "poster": "assets/results/video-corgi-poster.jpg"
      },
      {
        "title": "A platformer jump between floating islands",
        "label": "Bounding-box scene",
        "description": "Player, islands: 1×1 tokens · Ground: 2×2 · Sky: 4×4.",
        "tokens": 34698,
        "denseTokens": 75600,
        "prompt": "A continuous third-person fantasy platformer gameplay shot, viewed directly from behind a single nimble adventurer wearing a teal jacket, tan trousers and brown boots. The full body stays visible near the center as the adventurer runs forward away from the camera across a grassy floating island, bends the knees and pushes off at the edge, jumps across an open gap in a clear rising and falling arc, then lands feet-first on the next floating island, absorbs the impact with bent knees and takes a recovery step. Show coordinated running legs, swinging arms, changing posture during flight and a grounded landing. A smooth chase camera follows directly behind and slightly above the player, looking ahead toward the landing island and gently following the jump height. Detailed grassy ledges, rocky island undersides and small bushes; several other floating islands remain visible around the route. Far below the floating islands lies a broad, smooth ground plane with a uniform muted sandy-beige color, a matte finish, gentle lighting gradients and soft shadows. The ground has very little visible texture: no grass, gravel, pebbles, cracks, tiles or repeating patterns. A clear uniform blue sky surrounds the islands. Polished stylized 3D game visuals, warm daylight, stable environment geometry, natural gravity, one uninterrupted shot.",
        "panels": [
          {
            "label": "Scene plan",
            "type": "video",
            "src": "assets/results/video-platformer-0.mp4"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/video-platformer-layout-overlay.mp4",
            "layoutKey": "video-platformer"
          },
          {
            "label": "Generated video",
            "type": "video",
            "src": "assets/results/video-platformer-2.mp4"
          }
        ]
      }
    ],
    "source": "supplementary/#video-demos"
  },
  {
    "id": "agent-image",
    "title": "Agent-assisted and user-painted image generation",
    "intro": "An agent or a user paints an importance map to plan where detail matters. Fine tokens preserve detail in the subjects, while coarser tokens reduce computation in the background.",
    "examples": [
      {
        "title": "A girl riding a corgi",
        "label": "Girl & corgi",
        "tokens": 1546,
        "denseTokens": 4096,
        "prompt": "A whimsical cinematic storybook photograph of a little girl riding an enormous friendly Pembroke Welsh corgi the size of a small pony through a sunny meadow. The corgi has fluffy golden-orange and white fur, very short sturdy legs, a long rounded body, large upright triangular ears, bright brown eyes, a white muzzle and chest, and a happy open-mouthed expression. Its full body is visible in side view facing right, its face turned slightly toward the camera, its four paws on the grassy path. The little girl sits comfortably astride the middle of its back, smiling, wearing a red pinafore dress over a cream long-sleeved shirt, brown ankle boots, and her brown hair tied in a ponytail. Her hands rest gently near the corgis shoulders. Square composition: girl in the upper middle with her head centered at 45 percent across and 22 percent down, body extending down to the dogs back; corgi body spans the lower middle from 18 to 75 percent across, centered at 67 percent down, its head on the right around 74 percent across and 55 percent down, paws around 87 percent down. Clear readable silhouettes, expressive faces, natural hands, detailed soft fur, realistic fabric folds. Warm gentle morning light. Simple softly defocused pale blue sky and distant green meadow background, a soft grassy path along the bottom, shallow depth of field. Charming, joyful, imaginative, polished cinematic realism. No lettering or watermark.",
        "recording": "assets/results/image-0-workflow.mp4",
        "poster": "assets/results/image-0-poster.jpg",
        "panels": [
          {
            "label": "Importance map",
            "src": "assets/results/image-0-0.webp",
            "type": "image"
          },
          {
            "label": "LoT layout",
            "src": "assets/results/image-0-layout.svg",
            "type": "image"
          },
          {
            "label": "Generated image",
            "src": "assets/results/image-0-2.webp",
            "type": "image"
          }
        ]
      },
      {
        "title": "Studio portrait",
        "label": "Studio portrait",
        "tokens": 892,
        "denseTokens": 4096,
        "prompt": "Photorealistic formal studio head-and-shoulders portrait of a middle-aged man with warm medium-brown skin, a long oval face, short tightly curled dark hair with a few gray strands, brown eyes, prominent dark eyebrows, slightly prominent ears, a straight broad nose, and a calm closed-mouth expression with a subtle smile. He looks directly into the camera. He wears a dark navy tailored suit jacket, pale blue dress shirt, and blue silk tie with narrow diagonal cream and gold stripes. Square composition: centered symmetrical pose, the top of his hair near the upper edge, eyes about 38 percent down the frame, mouth about 57 percent down, chin about 70 percent down, shoulders and tie filling the lower quarter; generous plain light-gray background on both sides of the head. Soft even studio lighting, natural skin pores, crisp eyes and eyelashes, individually resolved short curls, realistic fabric and silk. Professional editorial portrait photography, neutral colors, no text, no logos.",
        "recording": "assets/results/image-2-workflow.mp4",
        "poster": "assets/results/image-2-poster.jpg",
        "panels": [
          {
            "label": "Importance map",
            "src": "assets/results/image-2-0.webp",
            "type": "image"
          },
          {
            "label": "LoT layout",
            "src": "assets/results/image-2-layout.svg",
            "type": "image"
          },
          {
            "label": "Generated image",
            "src": "assets/results/image-2-2.webp",
            "type": "image"
          }
        ]
      },
      {
        "title": "Drawing a layout by hand",
        "label": "User-painted demo",
        "kind": "manual-recording",
        "description": "Four generations with different prompts, with manual layout edits and inspection of the resulting images and token grids.",
        "recording": "assets/results/image-manual-workflow.mp4",
        "poster": "assets/results/image-manual-poster.jpg"
      }
    ],
    "source": "supplementary/#painted-demos"
  },
  {
    "id": "source-video",
    "title": "Layout-adaptive video generation from different sources",
    "intro": "Semantic regions, bounding boxes, texture variance, and depth cues guide where to allocate detail over time.",
    "examples": [
      {
        "title": "Driving through a city",
        "label": "Semantic masks",
        "description": "Fine tokens preserve vehicles and lane markings; broader regions use coarser tokens.",
        "tokens": 57954,
        "denseTokens": 75600,
        "prompt": "Photorealistic driving footage on a rain-darkened downtown avenue enclosed by tall stone and glass buildings. A silver crossover waits directly ahead while large city buses pass close on the right, other cars fill the neighboring lanes, and traffic signals glow between the buildings. The damp asphalt carries soft reflections from brake lights and the cool overcast sky. The view is a stable continuous wide 16:9 shot from a fixed forward-facing dashboard camera at windshield height. The camera vehicle advances smoothly at a moderate, believable speed while lane geometry, vehicle spacing, wheel motion, reflections, and motion parallax remain physically consistent. Use natural documentary color, realistic road and vehicle materials, crisp but unexaggerated detail, and a generic unbranded streetscape.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "video",
            "src": "assets/results/source-video-mask-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "layoutKey": "source-video-mask",
            "src": "assets/results/source-video-mask-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-mask-generated.mp4"
          }
        ]
      },
      {
        "title": "Robotic object placement",
        "label": "Bounding boxes",
        "description": "Fine tokens follow the robot and object; coarser tokens cover the workspace.",
        "tokens": 50408,
        "denseTokens": 75600,
        "prompt": "In a single uninterrupted 5.4-second shot, a matte-graphite seven-axis torque-controlled research arm with a compact precision wrist performs one rigid-object placement into a fixed tray maneuver. At the opening frame, the flat-jaw servo gripper holds a blue wooden cube level and centered three centimeters above the open white compartment dish. The first 0.5 seconds establish a steady initial pose, the commanded maneuver occupies the next 4.1 seconds, and the final 0.8 seconds show a completely stable end pose. From 0.5 to 4.6 seconds, the wrist lowers vertically by three centimeters at constant orientation. The blue wooden cube remains rigid between the jaws, clears the four sides of the white compartment dish, reaches a level pose just above the tray floor, and stops. The gripper maintains its grasp instead of releasing during this shot. The white compartment dish is locked into bolted polymer cradle; the tray cannot slide, rotate, flex, or rise from the work surface. The robot base, camera, work surface, target fixture, and every uninvolved object remain exactly stationary. Every robot link stays rigid and constant in length; the joints articulate continuously as one connected kinematic chain. The end effector preserves a mechanically valid grasp or surface contact, with consistent contact points and occlusion. The manipulated object keeps constant size, shape, color, and material. Motion is slow, continuous, single-direction, and physically plausible, with smooth acceleration into and out of the maneuver. Recorded by a fixed oblique overhead camera with a 45 mm lens; cool diffused task lighting, realistic contact shadows, detailed rubber and anodized aluminum. The frame contains clean generic unbranded equipment and no visible writing, symbols, labels, logos, watermarks, screens, or interface graphics.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "video",
            "src": "assets/results/source-video-bbox-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "layoutKey": "source-video-bbox",
            "src": "assets/results/source-video-bbox-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-bbox-generated.mp4"
          }
        ]
      },
      {
        "title": "Running across a desert",
        "label": "Texture variance",
        "description": "Texture variation guides the allocation of fine and coarse tokens.",
        "tokens": 38893,
        "denseTokens": 75600,
        "prompt": "A powerful monkey warrior sprints across a bright expanse of rippled sand while carrying a long staff in one hand. Pale desert towers, wind-carved dunes, scattered rocks, and a clear luminous sky frame the route, while a controlled trail of dust and a small warm ember effect follows his feet. The third-person camera tracks smoothly from behind; the running cycle has believable weight, stable foot contact, and restrained cloth and fur motion. The view is one continuous wide 16:9 third-person gameplay shot with a stable camera that follows the player smoothly, coherent parallax, and no cuts. Motion is controlled and physically plausible; the main subject keeps a consistent identity, shape, scale, and contact with the ground. Render it as a polished high-end real-time game cinematic with detailed geometry, believable materials, natural depth, restrained contrast, and generic unmarked surfaces.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "video",
            "src": "assets/results/source-video-vrs-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "layoutKey": "source-video-vrs",
            "src": "assets/results/source-video-vrs-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-vrs-generated.mp4"
          }
        ]
      },
      {
        "title": "A cinematic portrait",
        "label": "Depth of field",
        "description": "Fine tokens emphasize the subject while the defocused background uses fewer tokens.",
        "tokens": 35487,
        "denseTokens": 75600,
        "prompt": "A seated man fills a centered medium close-up, shoulders relaxed and face turned slightly toward the camera as his mouth moves through a quiet sentence and his expression shifts subtly from thoughtful to attentive. He wears a mustard-gold cotton shirt with a narrow collar and fine woven texture. Behind him is a richly layered interior of dark walnut shelving, stacked books, a small ceramic vase, trailing fern leaves, and a deep olive curtain, all dimly illuminated and softly defocused rather than flat. A warm side lamp brushes one cheek while cool ambient fill preserves detail in his eyes, creating a natural cinematic portrait with steady framing and no dramatic movement across the 5.4-second shot.",
        "panels": [
          {
            "label": "Depth of field",
            "type": "video",
            "src": "assets/results/source-video-dof-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "layoutKey": "source-video-dof",
            "src": "assets/results/source-video-dof-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-dof-generated.mp4"
          }
        ]
      },
      {
        "title": "Hands at work",
        "label": "Semantic masks",
        "tokens": 35057,
        "denseTokens": 75600,
        "prompt": "Photorealistic first-person craft footage beside an open patio doorway. Two hands carefully use small scissors to trim and adjust a tiny round piece on a tan wooden animal figure decorated with dark spots, while a second matching figure stands upright nearby. Both pieces rest on a round black ribbed work mat, with small craft supplies arranged around the edge and soft greenery visible outside. The hands make precise, unhurried movements and keep the delicate figure steady. The view is a single continuous wide 16:9 shot from a natural first-person head- or chest-mounted camera, with gentle body-driven camera motion and no cuts. The action unfolds at a moderate, believable pace with stable object identity, physically consistent contact, realistic hand motion, and coherent motion parallax. Use natural documentary color, lifelike materials, restrained contrast, crisp but unexaggerated detail, and generic unmarked objects and surfaces.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "video",
            "src": "assets/results/source-video-0-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-0-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-0"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-0-generated.mp4"
          }
        ]
      },
      {
        "title": "Rainy-night driving",
        "label": "Semantic masks",
        "tokens": 38297,
        "denseTokens": 75600,
        "prompt": "Photorealistic rainy-night driving on an urban expressway. Raindrops bead across the windshield, illuminated billboards and streetlights flare softly through the water, red taillights mark several cars ahead, and concrete barriers and dark building facades confine the wet lanes. The camera car continues steadily while reflections stretch across the pavement and the scene remains readable through the rain. The view is a stable continuous wide 16:9 shot from a fixed forward-facing dashboard camera at windshield height. The camera vehicle advances smoothly at a moderate, believable speed while lane geometry, vehicle spacing, wheel motion, reflections, and motion parallax remain physically consistent. Use natural documentary color, realistic road and vehicle materials, crisp but unexaggerated detail, and a generic unbranded streetscape.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "video",
            "src": "assets/results/source-video-4-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-4-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-4"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-4-generated.mp4"
          }
        ]
      },
      {
        "title": "Placing a can on a shelf",
        "label": "Bounding boxes",
        "tokens": 50403,
        "denseTokens": 75600,
        "prompt": "In a single uninterrupted 5.4-second shot, a matte-graphite seven-axis torque-controlled research arm with a compact precision wrist performs one level insertion of a can onto a fixed cabinet shelf maneuver. At the opening frame, the V-groove parallel gripper holds a blue cylindrical canister upright and level with the opening of an open white storage cubby, two centimeters outside the shelf edge. The first 0.5 seconds establish a steady initial pose, the commanded maneuver occupies the next 4.1 seconds, and the final 0.8 seconds show a completely stable end pose. From 0.5 to 4.6 seconds, the wrist translates horizontally inward by five centimeters along the shelf normal. The blue cylindrical canister preserves its vertical orientation, clears the top and sides of the opening, and stops above the shelf without being released. The gripper and canister move as one rigid assembly. The open white storage cubby is immobilized by four-bolt cabinet base; its door, shelf, frame, countertop, and nearby objects remain stationary. The robot base, camera, work surface, target fixture, and every uninvolved object remain exactly stationary. Every robot link stays rigid and constant in length; the joints articulate continuously as one connected kinematic chain. The end effector preserves a mechanically valid grasp or surface contact, with consistent contact points and occlusion. The manipulated object keeps constant size, shape, color, and material. Motion is slow, continuous, single-direction, and physically plausible, with smooth acceleration into and out of the maneuver. Recorded by a fixed oblique overhead camera with a 45 mm lens; cool diffused task lighting, realistic contact shadows, detailed rubber and anodized aluminum. The frame contains clean generic unbranded equipment and no visible writing, symbols, labels, logos, watermarks, screens, or interface graphics.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "video",
            "src": "assets/results/source-video-13-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-13-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-13"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-13-generated.mp4"
          }
        ]
      },
      {
        "title": "Smoothing fabric",
        "label": "Bounding boxes",
        "tokens": 51941,
        "denseTokens": 75600,
        "prompt": "In a single uninterrupted 5.4-second shot, an ivory-white lightweight six-joint cobot with joint-torque sensing and a compact end-effector flange performs one single smoothing stroke over restrained fabric maneuver. At the opening frame, the orange linen swatch is spread across the black folding template and held by magnetic edge retainers; the rounded polymer smoothing shoe is already in light contact near one visible wrinkle. The first 0.5 seconds establish a steady initial pose, the commanded maneuver occupies the next 4.1 seconds, and the final 0.8 seconds show a completely stable end pose. From 0.5 to 4.6 seconds, the wrist executes one straight six-centimeter smoothing stroke at constant height and gentle downward pressure. The tool remains tangent to the fabric; the wrinkle diminishes progressively ahead of the tool while the cloth perimeter stays registered. The wrist stops and maintains contact in the final pose. The black folding template and magnetic edge retainers remain rigid and stationary, preventing the fabric from translating as a whole while permitting small local deformation. The robot base, camera, work surface, target fixture, and every uninvolved object remain exactly stationary. Every robot link stays rigid and constant in length; the joints articulate continuously as one connected kinematic chain. The end effector preserves a mechanically valid grasp or surface contact, with consistent contact points and occlusion. The manipulated object keeps constant size, shape, color, and material. Motion is slow, continuous, single-direction, and physically plausible, with smooth acceleration into and out of the maneuver. Recorded by a locked overhead camera with a 42 mm lens; even daylight-balanced laboratory light, quiet gray palette, physically accurate reflections. The frame contains clean generic unbranded equipment and no visible writing, symbols, labels, logos, watermarks, screens, or interface graphics.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "video",
            "src": "assets/results/source-video-17-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-17-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-17"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-17-generated.mp4"
          }
        ]
      },
      {
        "title": "An underwater scene",
        "label": "Texture variance",
        "tokens": 40605,
        "denseTokens": 75600,
        "prompt": "The video opens with a young girl standing in a dimly lit underwater scene, surrounded by tall, slender purple plants. She is wearing a sleeveless top with horizontal stripes in shades of yellow and white. As the video progresses, a large, blue shark with white teeth and gills swims into the frame. The shark approaches the girl, who appears to be unaware of its presence. The shark's mouth opens wide, revealing its sharp teeth, and it moves closer to the girl. The girl's facial expressions change from surprise to fear as she realizes the shark's intentions. The shark continues to circle around her, and the girl's fear escalates. The video ends with the shark swimming away, leaving the girl alone in the underwater environment.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "video",
            "src": "assets/results/source-video-20-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-20-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-20"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-20-generated.mp4"
          }
        ]
      },
      {
        "title": "A desert highway",
        "label": "Texture variance",
        "tokens": 34945,
        "denseTokens": 75600,
        "prompt": "A sleek white futuristic sports coupe drives steadily along a sunlit two-lane desert highway toward a distant modern skyline. Low cactus scrub, pale sand, weathered utility structures, and ochre rock formations pass on both sides beneath a clear cyan sky. The vehicle remains centered in a slightly elevated rear chase-camera view, follows the road cleanly, and makes small suspension movements over the asphalt. The view is one continuous wide 16:9 third-person gameplay shot with a stable camera that follows the player smoothly, coherent parallax, and no cuts. Motion is controlled and physically plausible; the main subject keeps a consistent identity, shape, scale, and contact with the ground. Render it as a polished high-end real-time game cinematic with detailed geometry, believable materials, natural depth, restrained contrast, and generic unmarked surfaces.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "video",
            "src": "assets/results/source-video-26-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-26-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-26"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-26-generated.mp4"
          }
        ]
      },
      {
        "title": "A kitchen portrait",
        "label": "Depth of field",
        "tokens": 27795,
        "denseTokens": 75600,
        "prompt": "The video features a person in a kitchen setting, wearing a red tank top and white gloves. The individual is holding a glass filled with a yellowish liquid, which appears to be a beverage. The person is seen making various facial expressions and gestures, suggesting a playful or exaggerated reaction to the drink. The kitchen has wooden cabinets and a stainless steel appliance in the background.",
        "panels": [
          {
            "label": "Depth of field",
            "type": "video",
            "src": "assets/results/source-video-31-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-31-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-31"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-31-generated.mp4"
          }
        ]
      },
      {
        "title": "A cyclist approaching",
        "label": "Depth of field",
        "tokens": 46971,
        "denseTokens": 75600,
        "prompt": "The video begins with a dark, blurry image of a road with a cyclist approaching. As the video progresses, the cyclist becomes more visible, revealing a person wearing a white and green top, black shorts, and a helmet. The cyclist is riding a red bicycle with black handlebars and is moving towards the camera. The road is lined with greenery, and the sky is clear, suggesting it's a sunny day. The cyclist maintains a steady pace throughout the video.",
        "panels": [
          {
            "label": "Depth of field",
            "type": "video",
            "src": "assets/results/source-video-35-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-35-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-35"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-35-generated.mp4"
          }
        ]
      },
      {
        "title": "Robotic container placement",
        "label": "Semantic masks",
        "tokens": 50416,
        "denseTokens": 75600,
        "prompt": "In a single uninterrupted 5.4-second shot, an ivory-white lightweight six-joint cobot with joint-torque sensing and a compact end-effector flange performs one controlled placement into a fixed open container maneuver. At the opening frame, the soft-pad servo gripper already holds one red polymer reagent bottle vertically, centered two centimeters above the interior of the clear rectangular storage basket. The first 0.5 seconds establish a steady initial pose, the commanded maneuver occupies the next 4.1 seconds, and the final 0.8 seconds show a completely stable end pose. From 0.5 to 4.6 seconds, the wrist follows one straight downward path of three centimeters along the container normal; the red polymer reagent bottle descends with the jaws as one rigid body, clears the rim on every side, enters the clear rectangular storage basket, and stops before touching its floor. The jaws remain closed and hold the object through the final pose. The clear rectangular storage basket is immobilized in a rigid perimeter frame; its rim, walls, and base remain rigid and exactly stationary. The robot base, camera, work surface, target fixture, and every uninvolved object remain exactly stationary. Every robot link stays rigid and constant in length; the joints articulate continuously as one connected kinematic chain. The end effector preserves a mechanically valid grasp or surface contact, with consistent contact points and occlusion. The manipulated object keeps constant size, shape, color, and material. Motion is slow, continuous, single-direction, and physically plausible, with smooth acceleration into and out of the maneuver. Recorded by a locked overhead camera with a 42 mm lens; even daylight-balanced laboratory light, quiet gray palette, physically accurate reflections. The frame contains clean generic unbranded equipment and no visible writing, symbols, labels, logos, watermarks, screens, or interface graphics.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "video",
            "src": "assets/results/source-video-2-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-2-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-2"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-2-generated.mp4"
          }
        ]
      },
      {
        "title": "Driving through a tunnel",
        "label": "Semantic masks",
        "tokens": 43407,
        "denseTokens": 75600,
        "prompt": "Photorealistic slow driving inside a tiled urban tunnel with warm amber illumination. A silver crossover fills the lane directly ahead, a tall container truck runs close on the left, another car edges along the right wall, and brake lights reflect across glossy tiles and the camera car's hood. The traffic creeps toward the bright tunnel exit while vehicle scale and clearances remain convincing. The view is a stable continuous wide 16:9 shot from a fixed forward-facing dashboard camera at windshield height. The camera vehicle advances smoothly at a moderate, believable speed while lane geometry, vehicle spacing, wheel motion, reflections, and motion parallax remain physically consistent. Use natural documentary color, realistic road and vehicle materials, crisp but unexaggerated detail, and a generic unbranded streetscape.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "video",
            "src": "assets/results/source-video-7-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-7-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-7"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-7-generated.mp4"
          }
        ]
      },
      {
        "title": "A city boulevard at night",
        "label": "Bounding boxes",
        "tokens": 40782,
        "denseTokens": 75600,
        "prompt": "Photorealistic nighttime driving along a lively, brightly illuminated city boulevard. Multiple lanes of sedans extend toward a sequence of green signals, parked vehicles crowd the right curb, storefront and building lights create pools of color, and oncoming headlights stream past on the left. The camera vehicle advances with the traffic while glossy bodywork and asphalt carry controlled urban reflections. The view is a stable continuous wide 16:9 shot from a fixed forward-facing dashboard camera at windshield height. The camera vehicle advances smoothly at a moderate, believable speed while lane geometry, vehicle spacing, wheel motion, reflections, and motion parallax remain physically consistent. Use natural documentary color, realistic road and vehicle materials, crisp but unexaggerated detail, and a generic unbranded streetscape.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "video",
            "src": "assets/results/source-video-12-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-12-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-12"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-12-generated.mp4"
          }
        ]
      },
      {
        "title": "A warrior on a rocky plateau",
        "label": "Bounding boxes",
        "tokens": 37503,
        "denseTokens": 75600,
        "prompt": "An armored monkey warrior carrying a long wooden staff advances across a broad ochre rocky plateau in warm amber light. Weathered stone pagodas, eroded cliffs, dry brush, drifting dust, and distant mountain silhouettes surround the open route. The third-person camera follows from behind as the warrior walks with measured steps, the staff remains secured in his hand, cloth and fur respond subtly, and both feet contact the uneven ground convincingly. The view is one continuous wide 16:9 third-person gameplay shot with a stable camera that follows the player smoothly, coherent parallax, and no cuts. Motion is controlled and physically plausible; the main subject keeps a consistent identity, shape, scale, and contact with the ground. Render it as a polished high-end real-time game cinematic with detailed geometry, believable materials, natural depth, restrained contrast, and generic unmarked surfaces.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "video",
            "src": "assets/results/source-video-14-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-14-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-14"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-14-generated.mp4"
          }
        ]
      },
      {
        "title": "Playing classical guitar",
        "label": "Texture variance",
        "tokens": 32915,
        "denseTokens": 75600,
        "prompt": "The video features a person seated on a stage, playing a classical guitar. The individual is wearing a white shirt and is focused on the guitar, which has a brown body and a darker fretboard. The person's right hand is positioned on the fretboard, while the left hand is strumming the strings. The stage is dimly lit, with a microphone stand visible to the left of the guitarist. The background is dark, emphasizing the performer and the instrument.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "video",
            "src": "assets/results/source-video-22-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-22-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-22"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-22-generated.mp4"
          }
        ]
      },
      {
        "title": "A beach at sunset",
        "label": "Texture variance",
        "tokens": 36422,
        "denseTokens": 75600,
        "prompt": "The video captures a serene beach scene during sunset. The sky is painted with hues of orange, pink, and blue, indicating the time of day. The sun is partially visible, casting a warm glow over the scene. In the foreground, there is a sandy beach with a few people walking and standing, enjoying the view. The Burj Al Arab, a prominent luxury hotel, stands tall in the background, its silhouette contrasting against the sky. The water is calm, reflecting the colors of the sky. The video is taken from a distance, giving a panoramic view of the beach and the hotel.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "video",
            "src": "assets/results/source-video-25-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-25-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-25"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-25-generated.mp4"
          }
        ]
      },
      {
        "title": "Fishing by the river",
        "label": "Depth of field",
        "tokens": 47589,
        "denseTokens": 75600,
        "prompt": "A solitary person stands full-length on the near riverbank, slightly left of center, facing the glowing horizon and holding a slender fishing rod angled modestly toward the water. They wear a dark waxed canvas jacket, charcoal trousers, and weathered boots, their posture calm and nearly still as the rod tip makes a small controlled adjustment. Calm ripples mirror the fading gold sky, while reeds, mossy stones, overhanging willow leaves, distant tree trunks, and a few far shoreline lights create layered depth behind the figure. Low sunset light rims the clothing and casts a long soft shadow toward the camera; the person stays crisp while foliage and reflections dissolve into natural dusk bokeh during the continuous 5.4-second shot.",
        "panels": [
          {
            "label": "Depth of field",
            "type": "video",
            "src": "assets/results/source-video-33-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-33-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-33"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-33-generated.mp4"
          }
        ]
      },
      {
        "title": "Playing the cello",
        "label": "Depth of field",
        "tokens": 61470,
        "denseTokens": 75600,
        "prompt": "The video features a close-up of a person's hands as they play a cello. The cello has a rich brown finish, and the bow is being drawn across the strings. The player's fingers are positioned on the fingerboard, and the bow is moving back and forth, creating a rhythmic sound. The person is wearing a white sleeveless top and a striped skirt. The background is blurred, but it appears to be a room with neutral-colored walls.",
        "panels": [
          {
            "label": "Depth of field",
            "type": "video",
            "src": "assets/results/source-video-36-cue.mp4?v=nogrid-1"
          },
          {
            "label": "LoT layout",
            "type": "video",
            "src": "assets/results/source-video-36-cue.mp4?v=nogrid-1",
            "layoutKey": "source-video-36"
          },
          {
            "label": "LoT-Wan2.1-14B",
            "type": "video",
            "src": "assets/results/source-video-36-generated.mp4"
          }
        ]
      }
    ],
    "groupBySource": true,
    "source": "supplementary/#video-results"
  },
  {
    "id": "source-image",
    "title": "Layout-adaptive image generation from different sources",
    "intro": "Different scene cues translate into spatial token layouts, concentrating fine detail where it matters and reducing tokens elsewhere.",
    "examples": [
      {
        "title": "A painted bunting",
        "label": "Semantic masks",
        "tokens": 2059,
        "denseTokens": 4096,
        "prompt": "A vibrant painted bunting perched on a branch, showcasing its striking blue head, red breast, and green back with intricate feather details and a sharp beak. Bright and lively. Even. Illustration. Side profile, centered. Arrange the elements in a balanced composition with a clear visual hierarchy and deliberate foreground-to-background depth. Use controlled directional illumination, coherent color relationships, precise surface texture, and clean edge detail. Render the scene as cohesive editorial illustration with consistent materials, scale, and visual language.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-generated.webp"
          }
        ]
      },
      {
        "title": "Jupiter",
        "label": "Bounding boxes",
        "tokens": 2004,
        "denseTokens": 3456,
        "prompt": "A detailed view of Jupiter, showcasing its iconic Great Red Spot and swirling cloud patterns against the backdrop of the starry cosmos. Frame the subject at eye level in a clean rule-of-thirds composition with clear spatial separation and an uncluttered visual hierarchy. Use soft side light with gentle falloff, restrained natural color, realistic reflections, and faithful material textures. Render it as photorealistic editorial photography through a 50mm lens at f/5.6, with crisp detail and physically grounded scale.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-generated.webp"
          }
        ]
      },
      {
        "title": "Espresso on a wooden counter",
        "label": "Texture variance",
        "tokens": 723,
        "denseTokens": 3456,
        "prompt": "A clear glass filled with dark espresso coffee sits on a wooden coaster, accompanied by a silver spoon and scattered coffee grounds. In the background, there is another glass of coffee and a jar, with a bowl of marshmallows partially visible. Frame the subject at eye level in a clean rule-of-thirds composition with clear spatial separation and an uncluttered visual hierarchy. Use soft side light with gentle falloff, restrained natural color, realistic reflections, and faithful material textures. Render it as photorealistic editorial photography through a 50mm lens at f/5.6, with crisp detail and physically grounded scale.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "image",
            "src": "assets/results/source-image-vrs-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-vrs-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-vrs-generated.webp"
          }
        ]
      },
      {
        "title": "A cat in shallow focus",
        "label": "Depth of field",
        "tokens": 3388,
        "denseTokens": 4096,
        "prompt": "Main subject is the primary subject on the focal plane in tack-sharp focus. A fluffy, gray and white cat with large, expressive green eyes sits on a stone pavement, gazing upward with a curious expression. The background features a blurred green wall. Compose the scene so the focused region is visually dominant, with clear foreground and background layers. Use soft directional light with realistic falloff, natural color, and faithful material texture at the focal plane. Render it as photorealistic shallow-depth-of-field photography through an 85mm lens at f/2, with natural circular bokeh and smooth optical defocus as distance from the focal plane increases.",
        "panels": [
          {
            "label": "Depth of field",
            "type": "image",
            "src": "assets/results/source-image-dof-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-dof-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-dof-generated.webp"
          }
        ]
      },
      {
        "title": "Ancient church ruins",
        "label": "Semantic masks",
        "tokens": 1518,
        "denseTokens": 4032,
        "prompt": "Ancient stone church ruins with a tall, pointed tower and arched windows, set against a vibrant blue sky with scattered clouds, surrounded by a grassy field with a few trees and distant hills in the background. Compose the view with leading lines and distinct foreground, middle-ground, and background layers that establish a clear sense of place. Use soft directional daylight, realistic atmospheric falloff, balanced natural color, and faithful surface textures. Render it as environmental editorial photography through a 35mm lens at f/8, with crisp spatial detail and physically grounded depth.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-1-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-1-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-1-generated.webp"
          }
        ]
      },
      {
        "title": "An ice climber",
        "label": "Semantic masks",
        "tokens": 1428,
        "denseTokens": 3840,
        "prompt": "A climber in a red jacket and black pants scales a steep, icy cliff face using ice axes and a rope in a harsh, cold environment dominated by snow and ice. The climber is determined and focused on the challenging ascent. Frame the subject at eye level in a clean rule-of-thirds composition with clear spatial separation and an uncluttered visual hierarchy. Use soft side light with gentle falloff, restrained natural color, realistic reflections, and faithful material textures. Render it as photorealistic editorial photography through a 50mm lens at f/5.6, with crisp detail and physically grounded scale.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-3-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-3-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-3-generated.webp"
          }
        ]
      },
      {
        "title": "A bite-sized snack",
        "label": "Bounding boxes",
        "tokens": 3454,
        "denseTokens": 4096,
        "prompt": "A hand holds a bite-sized, golden-brown fried food with a creamy, cheesy interior featuring visible zucchini pieces. The food is partially dipped in a white sauce with herbs, indicating a savory dish. Compose the view with leading lines and distinct foreground, middle-ground, and background layers that establish a clear sense of place. Use soft directional daylight, realistic atmospheric falloff, balanced natural color, and faithful surface textures. Render it as environmental editorial photography through a 35mm lens at f/8, with crisp spatial detail and physically grounded depth.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-2-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-2-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-2-generated.webp"
          }
        ]
      },
      {
        "title": "An ice cliff",
        "label": "Bounding boxes",
        "tokens": 2856,
        "denseTokens": 4032,
        "prompt": "Ice cliff with crevices and icicles against a blue sky. Compose the view with leading lines and distinct foreground, middle-ground, and background layers that establish a clear sense of place. Use soft directional daylight, realistic atmospheric falloff, balanced natural color, and faithful surface textures. Render it as environmental editorial photography through a 35mm lens at f/8, with crisp spatial detail and physically grounded depth.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-3-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-3-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-3-generated.webp"
          }
        ]
      },
      {
        "title": "Pumpkin and sage risotto",
        "label": "Texture variance",
        "tokens": 2080,
        "denseTokens": 4096,
        "prompt": "A plate of pumpkin and sage risotto garnished with sage leaves and grated Parmesan cheese, served with a glass of white wine on a textured gray tablecloth. Frame the subject at eye level in a clean rule-of-thirds composition with clear spatial separation and an uncluttered visual hierarchy. Use soft side light with gentle falloff, restrained natural color, realistic reflections, and faithful material textures. Render it as photorealistic editorial photography through a 50mm lens at f/5.6, with crisp detail and physically grounded scale.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "image",
            "src": "assets/results/source-image-vrs-1-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-vrs-1-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-vrs-1-generated.webp"
          }
        ]
      },
      {
        "title": "A resting dog",
        "label": "Texture variance",
        "tokens": 1809,
        "denseTokens": 3456,
        "prompt": "A small, fluffy dog with a mix of brown and black fur lies on a white surface, its head resting on its paw, gazing directly at the camera with a slight air of sadness. Next to it is a shiny metal bowl containing food, indicating mealtime. The dog's fur is slightly tousled, and its eyes are large and expressive, projecting a sense of longing or anticipation. Compose the scene at eye level with a clear primary subject, balanced rule-of-thirds framing, and layered foreground and background separation. Use soft directional daylight with realistic falloff, restrained natural color, and faithful skin, fabric, and environmental textures. Render it as candid environmental documentary photography through a 50mm lens at f/4, preserving physically grounded scale and quiet observational realism.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "image",
            "src": "assets/results/source-image-vrs-3-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-vrs-3-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-vrs-3-generated.webp"
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
      },
      {
        "title": "A bouquet in focus",
        "label": "Depth of field",
        "tokens": 2556,
        "denseTokens": 3072,
        "prompt": "Main subject is the primary subject on the focal plane in tack-sharp focus. A vibrant arrangement of pink roses, delicate orange blooms, and white baby's breath, accented with pale leaves and feathery grasses. The background features large windows allowing soft light to illuminate the floral display. Compose the scene so the focused region is visually dominant, with clear foreground and background layers. Use soft directional light with realistic falloff, natural color, and faithful material texture at the focal plane. Render it as photorealistic shallow-depth-of-field photography through an 85mm lens at f/2, with natural circular bokeh and smooth optical defocus as distance from the focal plane increases.",
        "panels": [
          {
            "label": "Depth of field",
            "type": "image",
            "src": "assets/results/source-image-dof-3-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-dof-3-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-dof-3-generated.webp"
          }
        ]
      },
      {
        "title": "A painted portrait",
        "label": "Semantic masks",
        "tokens": 3204,
        "denseTokens": 4032,
        "prompt": "A digital painting of a person with dark hair and glasses, wearing a white shirt, against a plain background. The person has a serious expression and is looking directly at the viewer. Even, neutral. Serious. Digital painting. Digital art. Arrange the elements in a balanced composition with a clear visual hierarchy and deliberate foreground-to-background depth. Use controlled directional illumination, coherent color relationships, precise surface texture, and clean edge detail. Render the scene as editorial painting with consistent materials, scale, and visual language.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-4-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-4-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-4-generated.webp"
          }
        ]
      },
      {
        "title": "An acoustic guitar",
        "label": "Semantic masks",
        "tokens": 2139,
        "denseTokens": 3840,
        "prompt": "A close-up view of a high-quality acoustic guitar, showcasing its rich, dark wood grain and glossy finish. The image highlights the intricate wood patterns on the body and the headstock with its six tuning pegs. Soft, even lighting. Frame the subject at eye level in a clean rule-of-thirds composition with clear spatial separation and an uncluttered visual hierarchy. Use soft side light with gentle falloff, restrained natural color, realistic reflections, and faithful material textures. Render it as photorealistic editorial photography through a 50mm lens at f/5.6, with crisp detail and physically grounded scale.",
        "panels": [
          {
            "label": "Semantic masks",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-8-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-8-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_mask-8-generated.webp"
          }
        ]
      },
      {
        "title": "A snow castle",
        "label": "Bounding boxes",
        "tokens": 2793,
        "denseTokens": 4032,
        "prompt": "A large, intricately carved snow sculpture resembling a grand castle with multiple towers and spires, set against a clear blue sky with people walking around it in a snowy landscape. Arrange the elements in a balanced composition with a clear visual hierarchy and deliberate foreground-to-background depth. Use controlled directional illumination, coherent color relationships, precise surface texture, and clean edge detail. Render the scene as editorial sculpture photography with consistent materials, scale, and visual language.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-4-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-4-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-4-generated.webp"
          }
        ]
      },
      {
        "title": "A painted still life",
        "label": "Bounding boxes",
        "tokens": 2676,
        "denseTokens": 4032,
        "prompt": "Golden bucket, purple cloth, copper teapot, amber bottle, seashells, wheat stalks, still life painting. Close-up, centered, still life arrangement. Serene, contemplative. Realistic. Soft, even lighting with subtle shadows. Arrange the elements in a balanced composition with a clear visual hierarchy and deliberate foreground-to-background depth. Use controlled directional illumination, coherent color relationships, precise surface texture, and clean edge detail. Render the scene as editorial painting with consistent materials, scale, and visual language.",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-6-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-6-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-sam3_box-6-generated.webp"
          }
        ]
      },
      {
        "title": "Painting watercolor flowers",
        "label": "Texture variance",
        "tokens": 2103,
        "denseTokens": 4096,
        "prompt": "A hand holding a paintbrush is applying watercolor to a flower illustration on a piece of paper. The palette contains various colors, and the brush is in the process of adding blue hues to the petals. The artwork is vibrant and expressive, capturing the essence of a bold flower. Close-up of the painting process. Watercolor paints, paintbrush, paper, palette. Watercolor. Creative and focused. Natural light. Arrange the elements in a balanced composition with a clear visual hierarchy and deliberate foreground-to-background depth. Use controlled directional illumination, coherent color relationships, precise surface texture, and clean edge detail. Render the scene as editorial painting with consistent materials, scale, and visual language.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "image",
            "src": "assets/results/source-image-vrs-4-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-vrs-4-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-vrs-4-generated.webp"
          }
        ]
      },
      {
        "title": "Pena National Palace",
        "label": "Texture variance",
        "tokens": 2586,
        "denseTokens": 3840,
        "prompt": "A view of the Pena National Palace in Sintra, Portugal, showcasing its iconic yellow and red towers, ornate architecture, and lush greenery surrounding the historic site under a clear blue sky. Compose the view with leading lines and distinct foreground, middle-ground, and background layers that establish a clear sense of place. Use soft directional daylight, realistic atmospheric falloff, balanced natural color, and faithful surface textures. Render it as environmental editorial photography through a 35mm lens at f/8, with crisp spatial detail and physically grounded depth.",
        "panels": [
          {
            "label": "Texture variance",
            "type": "image",
            "src": "assets/results/source-image-vrs-11-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-vrs-11-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-vrs-11-generated.webp"
          }
        ]
      },
      {
        "title": "A sunflower in focus",
        "label": "Depth of field",
        "tokens": 2178,
        "denseTokens": 3072,
        "prompt": "Main subject is the primary subject on the focal plane in tack-sharp focus. A vibrant sunflower features large yellow petals and a brown center filled with seeds. A honeybee hovers near the flower, its striped body in focus against the green leaves. Soft, blurred background highlights the brightness of the sunflower. Compose the scene so the focused region is visually dominant, with clear foreground and background layers. Use soft directional light with realistic falloff, natural color, and faithful material texture at the focal plane. Render it as photorealistic shallow-depth-of-field photography through an 85mm lens at f/2, with natural circular bokeh and smooth optical defocus as distance from the focal plane increases.",
        "panels": [
          {
            "label": "Depth of field",
            "type": "image",
            "src": "assets/results/source-image-dof-5-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-dof-5-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-dof-5-generated.webp"
          }
        ]
      },
      {
        "title": "A bird on a branch",
        "label": "Depth of field",
        "tokens": 1003,
        "denseTokens": 4096,
        "prompt": "Main subject is the primary subject on the focal plane in tack-sharp focus. A small bird perched on a thin branch, featuring a dark head, light gray body, and striking yellow underparts. Surrounding it are bare branches against a muted background, suggesting a wintry or early spring environment. Compose the scene so the focused region is visually dominant, with clear foreground and background layers. Use soft directional light with realistic falloff, natural color, and faithful material texture at the focal plane. Render it as photorealistic shallow-depth-of-field photography through an 85mm lens at f/2, with natural circular bokeh and smooth optical defocus as distance from the focal plane increases.",
        "panels": [
          {
            "label": "Depth of field",
            "type": "image",
            "src": "assets/results/source-image-dof-15-cue.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/source-image-dof-15-grid.svg"
          },
          {
            "label": "LoT-Flux.2-9B",
            "type": "image",
            "src": "assets/results/source-image-dof-15-generated.webp"
          }
        ]
      }
    ],
    "groupBySource": true,
    "source": "supplementary/#image-results"
  },
  {
    "id": "typography-results",
    "title": "Typography with spatially varying detail",
    "intro": "Token layouts specify where letters need intricate structure and where simpler regions can use fewer tokens. Compare LoT generation with the full-resolution baseline.",
    "examples": [
      {
        "title": "Flowering letters",
        "label": "Progressive detail",
        "tokens": 4120,
        "denseTokens": 15360,
        "prompt": "Photorealistic botanical typography, exactly five rows of L O T. The BOTTOM FIFTH ROW is densely covered in blooming white jasmine flowers: dozens of clearly visible blossoms on EACH letter, distinct curved white petals and pale-yellow centers, interwoven with tiny glossy green leaves and fine woody vines. Flowers dominate this bottom row, covering roughly half of each letter. Small flowering branches extend beyond the edges and cast soft natural shadows onto the warm off-white background. Real living flowers with photographic detail.\nTall portrait composition, straight-on camera, five evenly spaced rows, three separate bold letters L O T per row. Equal letter sizes, aligned columns, generous gaps. One continuous physical scene under soft daylight on a pale ivory surface. Natural materials, realistic leaf veins, petal translucency and contact shadows. Recognizable letter shapes with occasional organic growth crossing their edges, rather than sharply clipped foliage.\nFrom TOP to BOTTOM:\n1. Uniform solid sage-green matte painted LOT, smooth undecorated surfaces.\n2. Green LOT with a few large widely spaced cream painted polka dots.\n3. LOT with broad irregular moss-green and lime patches of real variegated leaf texture; occasional leaf tips overlap the edges.\n4. LOT with sparse winding woody vines and medium-sized green leaves, visible green space between stems, no open flowers. A few stems trail past the edges.\n5. LOT overflowing with dense miniature WHITE JASMINE BLOSSOMS, many small flowers across all three letters, intricate fine vines and tiny leaves. Clearly more numerous, smaller details than row four. Flowering tendrils curl into the surrounding space while letters remain separate and legible.\nRealistic macro photography, natural greens and white flowers, neutral pale ivory background. Five rows only, no extra text, no illustration, no cartoon or gold filigree.\n",
        "panels": [
          {
            "label": "LoT layout",
            "src": "assets/results/type-0-grid.png",
            "type": "image"
          },
          {
            "label": "LoT-Flux.2-14B",
            "src": "assets/results/type-0-ours.webp",
            "type": "image"
          },
          {
            "label": "Full-resolution Flux.2-14B",
            "src": "assets/results/type-0-dense.webp",
            "type": "image"
          }
        ]
      },
      {
        "title": "Candy",
        "label": "Spirals",
        "tokens": 6313,
        "denseTokens": 16384,
        "prompt": "Photorealistic overhead studio photograph, square composition. A single clockwise spiral makes three close turns winding inward to a small empty center, filling most of the image. At the outer entrance near twelve oclock, exactly three large uppercase letters spell \"LOT\", following the curve. After those three letters, the entire remaining spiral consists of objects, not text. The objects decrease gradually in size toward the center. Clearly separated individual objects, narrow clean gaps between spiral turns, precise flowing spiral composition. The LOT letters are thick sculpted candy in coral pink, lemon yellow and mint green. The spiral consists of real confectionery: glossy jelly beans, translucent gummy bears, striped boiled sweets, pastel candy-coated chocolates, small sugar-dusted gumdrops and tiny sugar pearls. Cheerful coral, lavender, lemon and mint colors. Larger candies on the outside, increasingly tiny sweets inside. Plain pale cream background. Appetizing macro food photography, visible sugar crystals, translucent gelatin and shiny candy shells. Soft natural daylight, delicate contact shadows on the same surface, realistic small-scale materials and fine surface texture. Only the word \"LOT\" appears once. No other letters, words, labels, lettering, borders or grid lines. Objects continue all the way into the inner turn.",
        "panels": [
          {
            "label": "LoT layout",
            "src": "assets/results/type-36-grid.png",
            "type": "image"
          },
          {
            "label": "LoT-Flux.2-14B",
            "src": "assets/results/type-36-ours.webp",
            "type": "image"
          },
          {
            "label": "Full-resolution Flux.2-14B",
            "src": "assets/results/type-36-dense.webp",
            "type": "image"
          }
        ]
      },
      {
        "title": "Botanical",
        "label": "Hilbert curves",
        "tokens": 7111,
        "denseTokens": 16384,
        "prompt": "Photorealistic overhead studio photograph, square composition. Objects form one continuous Hilbert curve: a square-filling winding path of horizontal and vertical segments with repeated right-angle U turns, like a geometric maze, no crossings. Clear narrow empty lanes separate adjacent runs. At BOTH endpoints are large uppercase LOT letters, much larger than the objects. At upper left, L is above O, and T is immediately right of O. At upper right, L is left of O, and T is above O. All letters are upright and individually separated. Between these two groups, small objects follow the entire winding Hilbert path at roughly uniform scale. The LOT letters are made of weathered wood wrapped in ivy and small white flowers. The winding path consists entirely of individual clusters of real flowers, green leaves, berries, curling tendrils and small moss-covered twigs. Mix blossoms, tiny white flowers and delicate leaves along the path. Rich green foliage with white, blush pink and soft yellow petals. Plain warm ivory background. Real botanical specimens, visible leaf veins, fine stems and delicate petals. Soft natural daylight, delicate contact shadows on the same surface, realistic materials and fine surface texture. Exactly two groups of LOT letters, one at each endpoint. No other text, borders or grid lines. The objects fill the path, with clean background visible between neighboring segments.",
        "panels": [
          {
            "label": "LoT layout",
            "src": "assets/results/type-40-grid.png",
            "type": "image"
          },
          {
            "label": "LoT-Flux.2-14B",
            "src": "assets/results/type-40-ours.webp",
            "type": "image"
          },
          {
            "label": "Full-resolution Flux.2-14B",
            "src": "assets/results/type-40-dense.webp",
            "type": "image"
          }
        ]
      },
      {
        "title": "Wandering Ribbon · Botanical",
        "label": "Freeform curves",
        "tokens": 7552,
        "denseTokens": 16384,
        "prompt": "Photorealistic overhead studio photograph, square composition. A long, densely packed winding ribbon sweeps horizontally back and forth across the square in five broad irregular folds. Smooth rounded hairpin bends, slightly sloping runs, close parallel paths separated by narrow clean background gaps. At the upper-left entrance, three large upright separate letters spell LOT horizontally. At the lower-right endpoint, three more large upright separate letters spell LOT horizontally. These six letters are much larger than the small objects between them. The LOT letters are made of weathered wood wrapped in ivy and small white flowers. The winding path consists entirely of individual clusters of real flowers, green leaves, berries, curling tendrils and small moss-covered twigs. Mix blossoms, tiny white flowers and delicate leaves along the path. Rich green foliage with white, blush pink and soft yellow petals. Plain warm ivory background. Real botanical specimens, visible leaf veins, fine stems and delicate petals. Soft natural daylight, delicate contact shadows on the same surface, realistic materials and fine surface textures. Exactly two groups spelling LOT, one at each endpoint. No other text, borders or grid lines. Dense composition with objects occupying the entire winding path.",
        "panels": [
          {
            "label": "LoT layout",
            "src": "assets/results/type-63-grid.png",
            "type": "image"
          },
          {
            "label": "LoT-Flux.2-14B",
            "src": "assets/results/type-63-ours.webp",
            "type": "image"
          },
          {
            "label": "Full-resolution Flux.2-14B",
            "src": "assets/results/type-63-dense.webp",
            "type": "image"
          }
        ]
      },
      {
        "title": "Cosmic materials",
        "label": "LOT compositions",
        "tokens": 3427,
        "denseTokens": 16384,
        "prompt": "Photorealistic overhead macro photograph of a futuristic material artwork spelling LOT on a uniform matte midnight navy-blue surface. Square composition, dramatically different materials in each of the three large separated letters. Staggered typography: tall angular L on the left extending to the lower left, large circular spiral O in the middle, T on the right with a wide thin horizontal crossbar and a narrow serpentine stem. Deep blue background remains clearly visible between every neighboring curve. The objects form thin continuous paths, never solid filled letter blocks.\nLEFT L: a single connected angular Hilbert labyrinth built from slender polished copper pipes, tiny brass elbows, machined titanium connectors, miniature exposed gears and small teal circuit lights. Precise intricate mechanical craftsmanship. Copper tubes follow every little right-angle turn, preserving the narrow blue maze gaps. Warm metallic copper and silver, no candy.\nCENTER O: a single two-turn spiral of translucent iridescent glass spheres, glowing blue and violet glass beads and tiny realistic planet-like mineral orbs, arranged closely along the spiral. Deep cobalt, cyan and violet glass with subtle internal light, delicate reflections, small silver spacers. A clearly open center and clean dark-blue gaps between the turns. The spiral is made of physical glass objects resting on the surface, no drawn orbit lines.\nRIGHT T: one continuous serpentine trail of small real amethyst crystals, smoky quartz shards, clear faceted crystals and tiny silver mineral nuggets. The trail runs back and forth across the broad thin top bar, then in short rounded horizontal folds down the narrow centered stem. Violet crystal clusters and sharp transparent facets distributed throughout both the crossbar and the entire stem. Clear navy gaps between runs.\nMuseum-quality physical assemblage, fine detailed textures, controlled soft side lighting, gentle rim highlights, believable contact shadows. Restrained jewel colors against matte midnight blue. Exactly one L, one spiral O, one T. No extra lettering, no labels, no flowers, no plants, no food, no houses, no borders, no visible grid. Maintain thin separated paths throughout all three letters.",
        "panels": [
          {
            "label": "LoT layout",
            "src": "assets/results/type-22-grid.png",
            "type": "image"
          },
          {
            "label": "LoT-Flux.2-14B",
            "src": "assets/results/type-22-ours.webp",
            "type": "image"
          },
          {
            "label": "Full-resolution Flux.2-14B",
            "src": "assets/results/type-22-dense.webp",
            "type": "image"
          }
        ]
      }
    ],
    "source": "supplementary/#typography"
  },
  {
    "id": "bounding-box-results",
    "title": "Bounding box derived layouts",
    "intro": "Labeled bounding boxes describe the scene composition and guide spatial token allocation. The resulting LoT layout assigns finer tokens to detailed objects and coarser tokens to simpler regions.",
    "examples": [
      {
        "title": "Living Room",
        "label": "Living Room",
        "tokens": 2646,
        "denseTokens": 6144,
        "prompt": "Photorealistic architectural photograph of a sunlit modern living room, wide 3:2 composition, straight-on eye-level view. A cream linen three-seater sofa is centered against a plain warm-white plaster wall, occupying the middle-lower part of the image. Low rolled arms, sage-green pillows and subtle fabric texture. A narrow floor-to-ceiling walnut bookshelf stands at the far left, filled with hardcover books, a brass lamp and ceramics. A small trailing pothos spills from one shelf. A tall fiddle-leaf fig in a terracotta planter stands at the far right, with many distinct glossy green leaves. A low walnut coffee table with a rounded rectangular top occupies the lower-center foreground, in front of the sofa; a small stack of books and an off-white ceramic vase with dried pampas grass sit on top. Generous uncluttered wall space above the sofa. Pale oak floor and a simple cream wool rug beneath the table. Soft daylight from an unseen window on the left, realistic contact shadows, natural wood grain, restrained cream, walnut and sage palette. Balanced symmetrical framing, realistic furniture proportions, everything sharply in focus. No people, labels or graphic overlays.\n",
        "panels": [
          {
            "label": "Bounding boxes",
            "src": "assets/results/bbox-0-boxes.webp",
            "type": "image"
          },
          {
            "label": "LoT layout",
            "src": "assets/results/bbox-0-layout.png",
            "type": "image"
          },
          {
            "label": "LoT-Flux.2-14B",
            "src": "assets/results/bbox-0-generated.webp",
            "type": "image"
          }
        ]
      },
      {
        "title": "Reading Corner",
        "label": "Reading Corner",
        "tokens": 2454,
        "denseTokens": 6144,
        "prompt": "Photorealistic architectural photograph of a sunlit reading corner, wide 3:2 eye-level composition. A tall oak bookshelf fills the left side, with hardcover books, a ceramic vase and a brass clock. A worn cognac leather armchair sits on the right, with rolled arms, creased leather and a cream wool throw. Between them, a separate small round walnut side table holds a terracotta pot with slender green stems and delicate white flowers. The flowers rise prominently above the table. An open hardcover book with fanned pages rests on the chair's right armrest. Keep a visible gap between the side table and chair. Pale plaster wall with generous empty space above the furniture, oak floor across the bottom, a jute rug edge at lower left. Soft daylight from the right, realistic contact shadows, restrained natural colors, visible material texture. No people or graphic overlays.\n",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "image",
            "src": "assets/results/bbox-reading-corner-boxes.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/bbox-reading-corner-layout.png"
          },
          {
            "label": "LoT-Flux.2-14B",
            "type": "image",
            "src": "assets/results/bbox-reading-corner-generated.webp"
          }
        ]
      },
      {
        "title": "Bedroom",
        "label": "Bedroom",
        "tokens": 2046,
        "denseTokens": 6144,
        "prompt": "Photorealistic architectural photograph of a tranquil bedroom in a wide 3:2 composition. A low bed sits slightly left of center against a pale plaster wall, with rumpled oatmeal-white linen, two pillows and a duvet folded back at its foot. On the far left, a carved walnut bedside cabinet supports a cream mug, a closed navy book and a small framed botanical print, forming one compact group. A tall fiddle-leaf fig fills the right side, with broad glossy leaves and a terracotta pot. A sheer-curtained window is visible behind the plant in the upper right. Keep the bed and bedside cabinet visually distinct. Generous plain wall space above the bed. Oak floor and a beige jute rug across the foreground. Soft morning daylight from the right, natural contact shadows, realistic linen folds, carved wood and leaf veins. No people or graphic overlays.\n",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "image",
            "src": "assets/results/bbox-bedroom-boxes.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/bbox-bedroom-layout.png"
          },
          {
            "label": "LoT-Flux.2-14B",
            "type": "image",
            "src": "assets/results/bbox-bedroom-generated.webp"
          }
        ]
      },
      {
        "title": "Coastal",
        "label": "Coastal",
        "tokens": 1962,
        "denseTokens": 6144,
        "prompt": "Photorealistic coastal landscape in a wide 3:2 composition. Broad clear pale-blue sky occupies roughly the upper two-thirds, above a calm sea and sandy beach along the bottom. A weathered blue-and-white wooden fishing boat rests on the sand in the lower left, seen in three-quarter view, with peeling paint, rusted fittings, a small cabin and a slender mast rising into the sky. A wooden oar leans against its hull. A tangled heap of hemp ropes and draped off-white fishing net lies beside and partly in front of the boat, with clearly visible frayed fibers and knotted mesh. Two small seagulls glide on the right just above the horizon, separated from the boat. A piece of driftwood rests at the lower-right edge. A faint distant headland lies on the far-right horizon. Quiet morning daylight from the right, natural soft shadows, gentle sea ripples and damp sand, realistic materials. No people, text or graphic overlays.\n",
        "panels": [
          {
            "label": "Bounding boxes",
            "type": "image",
            "src": "assets/results/bbox-coastal-boxes.webp"
          },
          {
            "label": "LoT layout",
            "type": "image",
            "src": "assets/results/bbox-coastal-layout.png"
          },
          {
            "label": "LoT-Flux.2-14B",
            "type": "image",
            "src": "assets/results/bbox-coastal-generated.webp"
          }
        ]
      },
      {
        "title": "Still Life",
        "label": "Still Life",
        "tokens": 1953,
        "denseTokens": 6144,
        "prompt": "Photorealistic natural-light still life, wide 3:2 composition. On the left, a chalky off-white hand-thrown ceramic vase holds a loose tall bouquet of pale pink cosmos, white yarrow, lavender, dried wheat and trailing eucalyptus. The bouquet fills the upper-left region, with delicate distinct petals and leaves, and the vase sits below it on the table. On the right, a shallow cream stoneware bowl holds whole purple figs, halved figs exposing magenta interiors, and cut blood oranges showing crimson segments. A separate folded oatmeal linen cloth lies in the lower center, with clear exposed tabletop between it and both the vase and bowl. One small fallen pink petal rests on the cloth. Worn oak tabletop fills the lower portion, plain muted plaster backdrop above. Soft light from upper left, realistic ceramic texture, fruit flesh, linen folds and contact shadows, restrained natural colors. No people, labels or graphic overlays.\n",
        "panels": [
          {
            "label": "Bounding boxes",
            "src": "assets/results/bbox-4-boxes.webp",
            "type": "image"
          },
          {
            "label": "LoT layout",
            "src": "assets/results/bbox-4-layout.png",
            "type": "image"
          },
          {
            "label": "LoT-Flux.2-14B",
            "src": "assets/results/bbox-4-generated.webp",
            "type": "image"
          }
        ]
      }
    ],
    "source": "supplementary/#bbox-conditioning"
  }
];
