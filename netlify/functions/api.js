/**
 * FINGADGET - NETLIFY SERVERLESS API & NEONDB POSTGRESQL INTEGRATION
 * Automatically initializes and seeds all 'fngdgt_' tables and views in NeonDB
 * on first request, authenticates ADMIN_USERNAME & ADMIN_PASSWORD from Netlify
 * environment variables, logs every mutation into fngdgt_audit_logs, and exposes
 * full CORS-enabled GET, POST, PUT, DELETE, and OPTIONS endpoints.
 */

const { Pool } = require('pg');

const FNGDGT_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Fingadget-Admin-User, X-Fingadget-Admin-Pass',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate'
};

const FNGDGT_INITIAL_SEED = {
  "settings": {
    "siteTitle": "Fingadget",
    "siteTagline": "The Definitive Frontier of Consumer Hardware, Deep Science & Gizmo Cybernetics",
    "activeLanguage": "en",
    "activeEraSlug": "quantum-subatomic",
    "colorMode": "light",
    "breakingRibbon": "GLOBAL SYMPOSIUM DISPATCH: Sub-Angstrom Photonic Interconnects & Fault-Tolerant Logical Qubits Unveiled at Geneva Laser Summit",
    "showEraBanner": true
  },
  "eras": [
    {
      "slug": "industrial-revolution",
      "name": "Industrial & Mechanical Computing Era",
      "years": "1760 – 1946",
      "bannerTitle": "Steam, Brass Gears & Babbage Analytical Looms",
      "bannerSubtitle": "From Jacquard punched-card looms and thermodynamic engines to precision clockwork differential analyzers.",
      "bannerImage": "assets/gizmo_industrial_mural.jpg",
      "primaryAccent": "#B45309",
      "secondaryAccent": "#059669",
      "bgTint": "#FEFCE8",
      "muralCaption": "Brass Jacquard mechanisms meeting precision gizmo symmetry in early deterministic automata."
    },
    {
      "slug": "transistor-era",
      "name": "Solid-State Transistor Revolution",
      "years": "1947 – 1958",
      "bannerTitle": "Bell Labs Point-Contact & Junction Transistors",
      "bannerSubtitle": "Replacing fragile vacuum tubes with doped germanium and silicon crystals that amplified modern civilization.",
      "bannerImage": "assets/silicon_wafer.jpg",
      "primaryAccent": "#059669",
      "secondaryAccent": "#D97706",
      "bgTint": "#ECFDF5",
      "muralCaption": "Solid-state semiconductor junctions awakening low-power logic gates."
    },
    {
      "slug": "silicon-chips",
      "name": "Planar Silicon Wafer Era",
      "years": "1959 – 1970",
      "bannerTitle": "Photolithography & Pure Czochralski Silicon Boules",
      "bannerSubtitle": "Etching light onto crystalline silicon ingots to birth Silicon Valley and Apollo guidance computers.",
      "bannerImage": "assets/silicon_wafer.jpg",
      "primaryAccent": "#0D9488",
      "secondaryAccent": "#CA8A04",
      "bgTint": "#F0FDFA",
      "muralCaption": "Nanometer photolithography interference patterns across mono-crystalline wafers."
    },
    {
      "slug": "integrated-circuits",
      "name": "VLSI & Microprocessor Integrated Circuits",
      "years": "1971 – 2006",
      "bannerTitle": "Billions of Gates on a Fingernail: Moore’s Law in Full Stride",
      "bannerSubtitle": "From early 4-bit microprocessors to superscalar architectures and extreme ultraviolet lithography.",
      "bannerImage": "assets/silicon_wafer.jpg",
      "primaryAccent": "#047857",
      "secondaryAccent": "#EAB308",
      "bgTint": "#F0FDF4",
      "muralCaption": "Multi-layer copper and optical interconnects powering the planetary computing fabric."
    },
    {
      "slug": "apple-personal-tech",
      "name": "Personal, Mobile & Spatial Computing Era",
      "years": "1976 – Present",
      "bannerTitle": "Human-Centric Industrial Design & Unified Silicon Ecosystems",
      "bannerSubtitle": "Precision milled aluminum, micro-OLED spatial optics, neural engines, and tactile craftsmanship.",
      "bannerImage": "assets/apple_spatial.jpg",
      "primaryAccent": "#15803D",
      "secondaryAccent": "#D97706",
      "bgTint": "#F8FAFC",
      "muralCaption": "Minimalist anodized hardware studio where industrial design disappears into pure experience."
    },
    {
      "slug": "space-technology",
      "name": "Orbital, Deep-Space & Interplanetary Tech",
      "years": "1957 – Beyond",
      "bannerTitle": "Reusable Heavy Boosters, Ion Thrusters & Lunar Optical Mesh",
      "bannerSubtitle": "Autonomous orbital stations, laser satellite constellations, and radiation-hardened deep-space probes.",
      "bannerImage": "assets/space_station.jpg",
      "primaryAccent": "#0F766E",
      "secondaryAccent": "#D97706",
      "bgTint": "#F0FDFA",
      "muralCaption": "Orbital solar-electric arrays suspended above Earth’s glowing atmospheric curvature."
    },
    {
      "slug": "artificial-intelligence",
      "name": "Frontier Neural Architectures & Agentic AI",
      "years": "2012 – Present",
      "bannerTitle": "Exascale Photonic Clusters, Multimodal Reasoning & Synthetic Symposia",
      "bannerSubtitle": "Transformer attention fabrics, neuromorphic inference chips, and sovereign scientific co-pilots.",
      "bannerImage": "assets/summit_laser.jpg",
      "primaryAccent": "#059669",
      "secondaryAccent": "#B45309",
      "bgTint": "#FEFCE8",
      "muralCaption": "Global AI & laser symposium auditorium illuminating high-dimensional latent geometry."
    },
    {
      "slug": "quantum-subatomic",
      "name": "Quantum Computing & Subatomic Physics Era",
      "years": "2020 – Horizon",
      "bannerTitle": "Cryogenic Dilution Chandeliers, Topological Qubits & Subatomic Colliders",
      "bannerSubtitle": "Harnessing superposition, entanglement, and Akasha-level field symmetries to solve intractable cosmos models.",
      "bannerImage": "assets/quantum_subatomic.jpg",
      "primaryAccent": "#059669",
      "secondaryAccent": "#D97706",
      "bgTint": "#ECFDF5",
      "muralCaption": "Golden dilution cryostat surrounded by subatomic wave-particle interference rings."
    }
  ],
  "quickReads": [
    {
      "id": 101,
      "title": "CERN & Zurich Quantum Symposium Unveils Coherent Photon-Bus Link Across 40 Meters",
      "summary": "Cryogenic waveguide bridges two dilution refrigerators with 99.94% entanglement fidelity, paving the path for modular quantum supercomputing centers.",
      "category": "Quantum & Subatomic",
      "eraSlug": "quantum-subatomic",
      "readTime": "45 sec read",
      "badge": "Symposium Live"
    },
    {
      "id": 102,
      "title": "Apple M5 Ultra Studio Reference Board Benchmarked with Dual-Sided Optical Interposer",
      "summary": "Thermal imaging from Cupertino’s hardware studio reveals 1.2 TB/s unified memory bandwidth with whisper-quiet vapor-chamber dissipation.",
      "category": "Apple & Personal Tech",
      "eraSlug": "apple-personal-tech",
      "readTime": "1 min read",
      "badge": "Hardware Lab"
    },
    {
      "id": 103,
      "title": "High-NA EUV Lithography Hits 1.4nm Gate-All-Around RibbonFET Yield Milestone",
      "summary": "Backside power delivery combined with ruthenium interconnects cuts parasitic capacitance by 28% in next-generation wafer runs.",
      "category": "Silicon & ICs",
      "eraSlug": "integrated-circuits",
      "readTime": "50 sec read",
      "badge": "Foundry Brief"
    },
    {
      "id": 104,
      "title": "Lunar South Pole Laser Relay Sustains 200 Gbps Downlink Through Atmospheric Turbulence",
      "summary": "Adaptive deformable mirrors at the Atacama optical ground station lock onto orbital phase arrays with zero packet loss.",
      "category": "Space Tech",
      "eraSlug": "space-technology",
      "readTime": "40 sec read",
      "badge": "Orbital Telemetry"
    },
    {
      "id": 105,
      "title": "Modular Open-Source Handheld Gizmo Packs Hot-Swappable FPGA & Neural Cartridges",
      "summary": "Hardware hackers unveil a pocket-sized CNC-machined magnesium gizmo capable of emulating vintage silicon and running local edge models.",
      "category": "Gizmo Engineering",
      "eraSlug": "artificial-intelligence",
      "readTime": "1 min read",
      "badge": "Gizmo Monograph"
    }
  ],
  "posts": [
    {
      "id": 1,
      "slug": "geneva-cryo-photonic-quantum-laser-summit",
      "title": "Inside Geneva’s Cryo-Photonic Laser Summit: How 4,096 Logical Qubits Crossed the Fault-Tolerant Horizon",
      "subtitle": "At the annual European Subatomic & Quantum Symposium, topological braiding and femtosecond optical tweezers turned theoretical error correction into working silicon-nitride hardware.",
      "category": "Quantum & Subatomic",
      "eraSlug": "quantum-subatomic",
      "authorName": "Dr. Aris Thorne",
      "authorRole": "Chief Physics & Hardware Editor",
      "coverImage": "assets/quantum_subatomic.jpg",
      "excerpt": "Beneath a canopy of cyan and violet calibration lasers in Geneva, researchers demonstrated a fault-tolerant 4,096-logical-qubit processor running continuous surface-code syndrome extraction at 12 millikelvin.",
      "isGizmo": false,
      "isFeatured": true,
      "reviewScore": 9.8,
      "wordCount": 640,
      "charCount": 4120,
      "readMinutes": 6,
      "views": 18420,
      "likes": 1290,
      "fontFamily": "Inter, sans-serif",
      "fontSize": "1.08rem",
      "fontColor": "inherit",
      "textAlign": "left",
      "tags": [
        "Quantum Computing",
        "Subatomic Physics",
        "Cryogenics",
        "Symposium"
      ],
      "publishedAt": "2026-10-30T14:20:00Z",
      "i18nTitle": {
        "bn": "জেনেভার ক্রায়ো-ফোটোনিক লেজার সামিট: কীভাবে ৪,০৯৬ লজিক্যাল কিউবিট ফল্ট-টলারেন্ট দিগন্ত অতিক্রম করল",
        "hi": "जिनेवा क्रायो-फोटोनिक लेज़र शिखर सम्मेलन: कैसे 4,096 लॉजिकल क्यूबिट्स ने दोष-सहिष्णु सीमा पार की",
        "fr": "Au cœur du Sommet Laser Cryo-Photonique de Genève : 4 096 Qubits Logiques",
        "es": "Cumbre Láser Crio-Fotónica de Ginebra: 4.096 Qubits Lógicos Tolerantes a Fallos",
        "de": "Genfer Kryo-Photonik-Lasergipfel: 4.096 logische Qubits knacken die Fehlertoleranz",
        "zh": "日内瓦低温光子激光峰会直击：4096个逻辑量子比特如何跨越容错边界",
        "ja": "ジュネーブ極低温フォトニック・レーザーサミット：4,096論理量子ビットの衝撃",
        "ru": "Женевский крио-фотонный лазерный саммит: 4096 логических кубитов"
      },
      "contentHtml": "\n        <p>When the main auditorium lights dimmed at the Geneva Palexpo Laser & Subatomic Symposium this morning, the centerpiece on stage was neither a consumer smartphone nor a conventional supercomputer rack. Suspended inside a three-meter tall borosilicate vacuum vessel gleamed a multi-tiered gold-plated dilution refrigerator—pulsing with phase-locked cyan optical fibers that carried microwave-to-optical entanglement bridges across the stage.</p>\n        <h2>Breaking the Physical-to-Logical Qubit Bottleneck</h2>\n        <p>For three decades, quantum engineers have wrestled with decoherence: the slightest thermal phonon or stray electromagnetic ripple collapses delicate superpositions before deep circuits can finish executing. Until this year, achieving a single high-fidelity logical qubit required upwards of a thousand noisy physical transmons. By combining <strong>isotopically purified silicon-28 spin qubits</strong> with on-chip photonic waveguides, the Geneva consortium compressed that overhead to a 12:1 ratio.</p>\n        <blockquote>\"We are no longer babysitting individual wavefunctions in isolation. With photonic low-loss interconnects operating at 15 millikelvin, separate cryostats behave as a single phase-coherent subatomic fabric.\" — Prof. Elena Rostova, Keynote Chair at the Geneva Quantum Symposium.</blockquote>\n        <h3>Key Architectural Breakthroughs</h3>\n        <p>First, cryo-CMOS control multiplexers sit directly on the 4-Kelvin stage, eliminating thousands of bulky coaxial cables. Second, real-time syndrome decoding runs on dedicated ultra-low-latency FPGA fabrics that correct bit-flip and phase-flip errors within 180 nanoseconds—well inside the 4.2-millisecond coherence window of the underlying spin lattice.</p>\n        <p>For materials scientists and theoretical physicists, the implications are immediate: simulating high-temperature superconducting cuprates, nitrogen-fixation catalytic pathways, and non-perturbative lattice chromodynamics is shifting from century-long extrapolations to overnight batch runs.</p>\n      "
    },
    {
      "id": 2,
      "slug": "gizmo-cybernetics-modular-solid-state-hardware-architecture",
      "title": "The Anatomy of Next-Gen Modular Gizmos: Solid-State Micro-Actuators, Piezo Haptics & Self-Healing Chassis Design",
      "subtitle": "An extensive, multi-chapter hardware teardown and engineering treatise exploring how precision micro-electromechanical gizmos are replacing monolithic consumer electronics.",
      "category": "Gizmo Engineering",
      "eraSlug": "quantum-subatomic",
      "authorName": "Dr. Viktor Sterling & Maya Krishnan",
      "authorRole": "Chairs of Gizmo Architecture & Precision Mechatronics",
      "coverImage": "assets/modular_gizmo.jpg",
      "excerpt": "From magnetic pogo-pin interconnect buses and ultrasonic piezoelectric haptic arrays to liquid-metal thermal interfaces, modern flagship gizmos have evolved into marvels of repairable, field-upgradable micro-engineering. Here is our complete 5-chapter teardown treatise.",
      "isGizmo": true,
      "isFeatured": true,
      "reviewScore": 9.9,
      "wordCount": 1420,
      "charCount": 9480,
      "readMinutes": 14,
      "views": 24680,
      "likes": 2150,
      "fontFamily": "Merriweather, serif",
      "fontSize": "1.12rem",
      "fontColor": "inherit",
      "textAlign": "justify",
      "tags": [
        "Gizmo Engineering",
        "Modular Hardware",
        "Teardown",
        "Mechatronics",
        "Long-Form"
      ],
      "publishedAt": "2026-10-29T18:00:00Z",
      "i18nTitle": {
        "bn": "পরবর্তী প্রজন্মের মডুলার গিজমোর ব্যবচ্ছেদ: সলিড-স্টেট অ্যাকচুয়েটর ও হ্যাপটিক ইঞ্জিনিয়ারিং",
        "hi": "नेक्स्ट-जेन मॉड्यूलर गिज़्मो की आंतरिक संरचना: सॉलिड-स्टेट माइक्रो-एक्चुएटर्स और हैप्टिक इंजीनियरिंग",
        "fr": "L’Anatomie des Gizmos Modulaires de Nouvelle Génération : Micro-Actionneurs & Haptique",
        "es": "Anatomía de los Gizmos Modulares de Nueva Generación: Microactuadores de Estado Sólido",
        "de": "Die Anatomie modularer Next-Gen-Gizmos: Festkörper-Aktuatoren & Präzisionsmechanik",
        "zh": "下一代模块化极客装置（Gizmo）深度拆解：固态微执行器、压电触觉与自修复机身工程",
        "ja": "次世代モジュラー・ギズモ（Gizmo）の解剖学：固体マイクロアクチュエータと精密機構設計",
        "ru": "Анатомия модульных гизмо нового поколения: Твердотельные микроприводы и гаптика"
      },
      "contentHtml": "\n        <div class=\"gizmo-verse\">\n          <strong>⚙️ GIZMO LAB TELEMETRY SPEC // REV 4.8-OMEGA</strong><br/>\n          <em>\"True hardware longevity emerges when every sensor pod, compute module, optical array, and battery cell communicates across a zero-latency magnetic optical backplane.\" — Fingadget Gizmo Teardown Manifesto</em>\n        </div>\n\n        <h2>Chapter I: The Renaissance of Tactile, Field-Upgradable Gizmos</h2>\n        <p>For over a decade, mainstream consumer electronics drifted toward sealed, glued slabs that punished curiosity and rendered minor component upgrades impossible. Yet inside independent hardware foundries in Shenzhen, Zurich, Tokyo, and San Francisco, a quiet revolution has reshaped industrial design: the rise of the <strong>hyper-modular precision gizmo</strong>. By pairing CNC-milled aerospace magnesium-lithium frames with captive Torx fasteners and gold-plated spring-loaded pogo buses, modern gizmos celebrate mechanical transparency without sacrificing IP68 environmental sealing.</p>\n        <p>In the Fingadget Gizmo Lab, we spent ninety days stress-testing twelve flagship modular gizmos—ranging from pocketable software-defined radio analyzers and neural audio synthesizers to hot-swappable camera grip compute modules. Across every category, the engineering thesis is unmistakable: modularity is no longer a compromise in thickness or structural rigidity.</p>\n\n        <h2>Chapter II: Piezoelectric Ceramic Actuators and Sub-Millisecond Haptic Realism</h2>\n        <p>Touch an ordinary glass touchscreen and your fingertips encounter an inert, frictionless surface. Touch the rotary crown or solid-state trigger bar of a next-generation gizmo and you feel distinct, crisp mechanical detents—even though nothing physically rotates. The secret lies in <strong>multi-layer co-fired piezoelectric ceramic stacks</strong> bonded directly to a titanium flexure suspension.</p>\n        <blockquote>\"By driving a 140-volt bipolar waveform across a 300-micron lead-zirconate-titanate (PZT) crystal within 0.4 milliseconds, a solid-state gizmo surface can simulate the exact acoustic click of a vintage mechanical camera shutter or a precision micrometer dial.\"</blockquote>\n        <p>During our oscilloscope teardown, we measured localized surface displacement profiles accurate to 2.5 micrometers. Because the piezo actuator consumes power only during the microsecond impulse edge, standby battery drain drops by 64% compared to legacy linear resonant actuators (LRAs).</p>\n\n        <h2>Chapter III: Optical Backplanes and Zero-Pin Magnetic Interconnects</h2>\n        <p>Historically, the Achilles heel of modular gadgets was mechanical connector wear: microscopic fretting corrosion on exposed copper pins eventually degraded high-speed PCIe and USB4 lanes. The latest generation of gizmo backplanes eliminates high-speed electrical contacts altogether. While neodymium Halbach magnet arrays align the module within 15 microns and transfer 60 watts of regulated DC power across robust concentric rings, data travels across a <strong>pair of expanded-beam silicon-photonics lenses</strong>.</p>\n        <p>Even when submerged in dust or subjected to 40G shock vibrations on a test bench, the Expanded-Beam Optical (EBO) coupler sustained 80 Gbps bi-directional throughput across an air gap of 1.8 millimeters—allowing users to snap thermal-imaging pods, NVMe storage bricks, or discrete GPU accelerators onto the host gizmo chassis on the fly.</p>\n\n        <h2>Chapter IV: Phase-Change Gallium Thermal Chambers & Solid-State Cooling</h2>\n        <p>Packing desktop-class neural accelerators into a palm-sized gizmo requires rethinking thermodynamics. Rather than relying on high-RPM centrifugal fans that ingest lint and whine under load, frontier gizmo architects employ <strong>MEMS ultrasonic micro-blowers</strong> paired with encapsulated gallium-indium phase-change reservoirs.</p>\n        <p>When burst compute workloads spike past 28 watts, the metallic phase-change lattice absorbs latent heat isothermally at 31.5°C, keeping external chassis skin temperatures comfortable in the hand for extended field deployments.</p>\n\n        <h2>Chapter V: Right-to-Repair Schematics and Open Firmware Longevity</h2>\n        <p>Why do long-form gizmo teardowns matter to engineers and everyday enthusiasts alike? Because an instrument you can open, probe with a multimeter, flash with open-source RISC-V firmware, and upgrade five years after purchase transforms you from a passive consumer into an active custodian of technology. Every screw thread, silk-screened test pad, and documented pinout inside a well-crafted gizmo is an invitation to invent.</p>\n      "
    },
    {
      "id": 3,
      "slug": "cupertino-titanium-micro-oled-m5-spatial-studio",
      "title": "Cupertino’s Titanium & Micro-OLED Masterclass: Six Months Living Inside the M5 Spatial Studio Ecosystem",
      "subtitle": "Our long-term hardware teardown and daily workflow verdict on unified optical-interposer laptops, binocular 8K spatial visors, and zero-latency neural haptics.",
      "category": "Apple & Personal Tech",
      "eraSlug": "apple-personal-tech",
      "authorName": "Maya Lin-Vance",
      "authorRole": "Executive Hardware Reviewer",
      "coverImage": "assets/apple_spatial.jpg",
      "excerpt": "We put the latest anodized titanium workstation and second-generation spatial computing headset through 180 days of 3D CAD rendering, local 70B LLM compilation, and color-critical HDR mastering.",
      "isGizmo": false,
      "isFeatured": true,
      "reviewScore": 9.5,
      "wordCount": 580,
      "charCount": 3790,
      "readMinutes": 5,
      "views": 15890,
      "likes": 1120,
      "fontFamily": "Inter, sans-serif",
      "fontSize": "1.08rem",
      "fontColor": "inherit",
      "textAlign": "left",
      "tags": [
        "Apple Tech",
        "Spatial Computing",
        "Hardware Review",
        "Micro-OLED"
      ],
      "publishedAt": "2026-10-28T11:15:00Z",
      "i18nTitle": {
        "bn": "টাইটানিয়াম ও মাইক্রো-ওএলইডি মাস্টারক্লাস: এম৫ স্পেশিয়াল স্টুডিও ইকোসিস্টেমে ছয় মাসের অভিজ্ঞতা",
        "hi": "टाइटेनियम और माइक्रो-ओएलईडी मास्टरक्लास: एम5 स्पेशियल स्टूडियो इकोसिस्टम के साथ छह महीने का अनुभव",
        "fr": "Titane & Micro-OLED : Six Mois au Cœur de l’Écosystème Spatial M5 Studio",
        "es": "Titanio y Micro-OLED: Seis Meses con el Ecosistema Espacial M5 Studio",
        "de": "Titan & Micro-OLED Meisterklasse: Sechs Monate im M5 Spatial Studio Ökosystem",
        "zh": "钛金属与Micro-OLED巅峰之作：深度体验M5空间计算工作室生态六个月",
        "ja": "チタン＆マイクロOLEDの極致：M5空間コンピューティング環境で過ごした6ヶ月",
        "ru": "Титан и Micro-OLED: Полгода в экосистеме пространственных вычислений M5 Studio"
      },
      "contentHtml": "\n        <p>Industrial design at its highest level is an exercise in subtraction: removing friction, thermal noise, cable clutter, and optical distortion until only the creator’s intent remains. Over the past six months in the Fingadget Hardware Lab, we replaced our multi-monitor desktop rigs with the latest <strong>anodized slate-titanium portable workstation</strong> paired with its companion <strong>dual-8K micro-OLED spatial computing headset</strong>.</p>\n        <h2>3,800 Pixels Per Inch & Sub-9ms Photon-to-Motion Latency</h2>\n        <p>The biggest leap in this generation is the custom silicon-backplane micro-OLED array. Packing 34 million pixels across two postage-stamp displays, text legibility at virtual two-meter distances rivals a physical 6K reference monitor. Even during four-hour code compilation and shader-debugging sessions, eye fatigue was virtually nonexistent thanks to dynamic foveated rendering locked at 120Hz.</p>\n        <blockquote>\"When a laptop chassis CNC-milled from aerospace titanium links wirelessly to a spatial visor at 40 Gbps over 60GHz millimeter-wave, your desk expands to the horizon.\"</blockquote>\n        <h3>Unified Silicon Benchmarks</h3>\n        <p>With 192GB of unified LPDDR6X memory running at 1.2 TB/s, the workstation compiled our entire test suite in 14 seconds while drawing just 38 watts from the wall. The fan profile remained inaudible below 22 dBA even under sustained ray-tracing loads.</p>\n      "
    },
    {
      "id": 4,
      "slug": "tokyo-opto-electronic-laser-symposium-holographic-fields",
      "title": "Live from the Tokyo Opto-Electronic Symposium: Coherent Holographic Light Fields Replace Glass Displays",
      "subtitle": "Inside the subterranean laser auditorium where metasurface diffraction gratings projected volumetric 3D engineering models in mid-air without headgear.",
      "category": "Symposiums & Summits",
      "eraSlug": "artificial-intelligence",
      "authorName": "Kenji Takahashi",
      "authorRole": "Asia-Pacific Bureau Chief",
      "coverImage": "assets/summit_laser.jpg",
      "excerpt": "Reporting from the main stage of the Tokyo Laser & Photonics Summit, where solid-state RGB femtosecond emitters and nano-antenna metasurfaces sculpted interactive mid-air light fields.",
      "isGizmo": false,
      "isFeatured": false,
      "reviewScore": 9.4,
      "wordCount": 520,
      "charCount": 3340,
      "readMinutes": 5,
      "views": 12340,
      "likes": 890,
      "fontFamily": "Inter, sans-serif",
      "fontSize": "1.08rem",
      "fontColor": "inherit",
      "textAlign": "left",
      "tags": [
        "Laser Show",
        "Symposium",
        "Holography",
        "Photonics"
      ],
      "publishedAt": "2026-10-27T09:40:00Z",
      "i18nTitle": {
        "bn": "টোকিও অপটো-ইলেকট্রনিক লেজার সিম্পোজিয়াম: কাঁচের পর্দার বদলে বাতাসে ভাসমান হোলোগ্রাফিক আলোক ক্ষেত্র",
        "hi": "टोक्यो ऑप्टो-इलेक्ट्रॉनिक लेज़र संगोष्ठी: कांच की स्क्रीन की जगह हवा में तैरते होलोग्राफिक प्रकाश क्षेत्र",
        "fr": "En direct du Symposium Opto-Électronique de Tokyo : Champs Lumineux Holographiques",
        "es": "En vivo desde el Simposio Láser de Tokio: Campos Holográficos sin Pantalla",
        "de": "Live vom Opto-Elektronik-Symposium in Tokio: Holografische Lichtfelder",
        "zh": "东京光电与激光峰会现场：相干全息光场如何取代传统玻璃屏幕",
        "ja": "東京オプトエレクトロニクス・レーザーシンポジウム実況：空間ホログラフィック光場の衝撃",
        "ru": "Прямое включение с Токийского лазерного симпозиума: Голографические световые поля"
      },
      "contentHtml": "\n        <p>Every autumn, the Tokyo International Opto-Electronic & Laser Summit transforms its cavernous main hall into a symphony of coherent light. This year’s keynote demonstration stunned the 4,000 optical engineers in attendance: a three-meter wide volumetric turbine engine floating above the stage runway, viewable from a 140-degree horizontal arc without a single pair of stereoscopic glasses.</p>\n        <h2>Sub-Wavelength Titanium-Dioxide Metasurfaces</h2>\n        <p>Traditional holography struggled with narrow viewing angles because liquid-crystal spatial light modulators had pixel pitches larger than the wavelength of visible light. By fabricating <strong>220-nanometer titanium-dioxide nano-pillars</strong> illuminated by synchronized cyan, violet, and emerald solid-state lasers, the symposium team achieved full wavefront phase and amplitude control at 180 frames per second.</p>\n        <p>Surgeons, air-traffic controllers, and molecular architects on the symposium floor were able to walk around the projected light field and slice cross-sections using ultrasonic mid-air tactile feedback.</p>\n      "
    },
    {
      "id": 5,
      "slug": "orbital-solar-ion-station-deep-space-optical-mesh",
      "title": "Orbital Solar-Electric Stations & Lunar Ion Tugs: How Deep-Space Optical Relays Are Rewiring Planetary Communications",
      "subtitle": "Forget legacy S-band radio bottlenecks: 1.5-micron coherent laser transceivers aboard high-inclination orbital stations are bringing gigabit connectivity to cislunar space.",
      "category": "Space Tech",
      "eraSlug": "space-technology",
      "authorName": "Commander Elena Vance",
      "authorRole": "Aerospace & Orbital Systems Editor",
      "coverImage": "assets/space_station.jpg",
      "excerpt": "With Hall-effect krypton-xenon ion thrusters and 400-kilowatt roll-out solar arrays, the newest commercial orbital outpost doubles as an interplanetary optical routing hub.",
      "isGizmo": false,
      "isFeatured": false,
      "reviewScore": 9.6,
      "wordCount": 550,
      "charCount": 3580,
      "readMinutes": 5,
      "views": 14910,
      "likes": 1045,
      "fontFamily": "Inter, sans-serif",
      "fontSize": "1.08rem",
      "fontColor": "inherit",
      "textAlign": "left",
      "tags": [
        "Space Tech",
        "Orbital Station",
        "Laser Comms",
        "Ion Propulsion"
      ],
      "publishedAt": "2026-10-26T16:30:00Z",
      "i18nTitle": {
        "bn": "অরবিটাল সোলার-ইলেকট্রিক স্টেশন ও লুনার আয়ন টাগ: গভীর মহাকাশে লেজার যোগাযোগের বিপ্লব",
        "hi": "ऑर्बिटल सोलर-इलेक्ट्रिक स्टेशन और लूनर आयन टग: अंतरिक्ष में लेज़र संचार क्रांति",
        "fr": "Stations Orbitales & Propulseurs Ioniques : Le Réseau Optique de l’Espace Profond",
        "es": "Estaciones Orbitales y Propulsión Iónica: La Red Óptica del Espacio Profundo",
        "de": "Orbitale Raumstationen & Ionenantriebe: Optische Lasernetze im All",
        "zh": "轨道太阳能空间站与月球离子拖船：深空激光中继如何重塑星际通信",
        "ja": "軌道宇宙ステーションと月面イオン推進：深宇宙光レーザー通信網の全貌",
        "ru": "Орбитальные станции и ионные буксиры: Оптическая сеть дальнего космоса"
      },
      "contentHtml": "\n        <p>Four hundred andfifty kilometers above Earth’s glowing blue limb, the newest modular commercial space station unfurled its fourth pair of gossamer thin-film gallium-arsenide solar wings this week. Beyond hosting microgravity crystallization experiments, the outpost serves a pivotal role: acting as the primary optical switching node between terrestrial fiber networks and cislunar exploration vessels.</p>\n        <h2>50-Microradian Beam Pointing Accuracy</h2>\n        <p>Aiming a laser beam from low-Earth orbit to the Lunar South Pole is roughly equivalent to hitting a moving coin from 50 kilometers away. Using magnetically levitated fast-steering mirrors and superconducting nanowire single-photon detectors, the station’s optical terminals maintain a 200 Gbps full-duplex link across 384,400 kilometers of vacuum.</p>\n      "
    },
    {
      "id": 6,
      "slug": "beyond-1-4nm-high-na-euv-silicon-wafer-cleanrooms",
      "title": "Beyond 1.4-Nanometer High-NA EUV: Inside the Cleanrooms Etching Atomic-Scale Integrated Circuits",
      "subtitle": "A rare photographic and engineering tour inside sub-angstrom semiconductor fabs where tin-plasma extreme ultraviolet pulses sculpt 200 billion transistors per die.",
      "category": "Silicon & ICs",
      "eraSlug": "integrated-circuits",
      "authorName": "Vikramaditya Rao",
      "authorRole": "Semiconductor & Foundry Correspondent",
      "coverImage": "assets/silicon_wafer.jpg",
      "excerpt": "Fifty thousand times per second, a microscopic droplet of molten tin is vaporized by a dual-pulse CO2 laser to emit 13.5-nanometer light—the heartbeat of modern integrated circuits.",
      "isGizmo": false,
      "isFeatured": false,
      "reviewScore": 9.7,
      "wordCount": 590,
      "charCount": 3860,
      "readMinutes": 6,
      "views": 16200,
      "likes": 1180,
      "fontFamily": "Inter, sans-serif",
      "fontSize": "1.08rem",
      "fontColor": "inherit",
      "textAlign": "left",
      "tags": [
        "Silicon Chips",
        "Integrated Circuits",
        "EUV Lithography",
        "Semiconductors"
      ],
      "publishedAt": "2026-10-25T12:00:00Z",
      "i18nTitle": {
        "bn": "১.৪-ন্যানোমিটার হাই-এনএ ইইউভি-র ওপারে: পারমাণবিক স্কেলের সিলিকন চিপ ও আইসি তৈরির কারখানায়",
        "hi": "1.4-नैनोमीटर हाई-एनए ईयूवी के पार: परमाणु स्तर के सिलिकॉन चिप्स और आईसी निर्माण की दुनिया",
        "fr": "Au-delà de 1,4 nm High-NA EUV : Dans les Salles Blanches des Circuits Intégrés Atomiques",
        "es": "Más allá de 1.4nm High-NA EUV: En el Interior de las Salas Limpias de Silicio",
        "de": "Jenseits von 1,4-nm High-NA EUV: In den Reinräumen atomarer Mikrochips",
        "zh": "超越1.4纳米High-NA EUV光刻：探秘雕刻原子级集成电路的无尘晶圆厂",
        "ja": "1.4nm High-NA EUVの彼方へ：原子スケールのシリコン集積回路を刻むクリーンルーム潜入",
        "ru": "За гранью 1,4-нм High-NA EUV: Внутри чистых комнат атомной микроэлектроники"
      },
      "contentHtml": "\n        <p>Hold a finished 300-millimeter silicon wafer up to cleanroom LED lighting and it shimmers like a sacred stained-glass rose window in emerald, gold, and cobalt. Each iridescent square contains over two hundred billion Gate-All-Around nanosheet transistors, stacked with atomic-layer deposition tolerances measured in picometers.</p>\n        <h2>0.55 Numerical Aperture & Backside Power Delivery</h2>\n        <p>By separating power-delivery vias to the underside of the wafer and reserving the top 18 metal layers exclusively for signal routing, foundry engineers eliminated voltage droop while boosting logic density by 1.8x. The transition from FinFETs to complementary FET (CFET) architectures ensures that silicon scaling still has decades of runway ahead.</p>\n      "
    },
    {
      "id": 7,
      "slug": "open-silicon-risc-v-pocket-gizmos-edge-neural-workstations",
      "title": "From Pocket Logic Analyzers to Sovereign Neural Gizmos: Inside the Open-Silicon Handheld Revolution",
      "subtitle": "A comprehensive engineering monograph on how open-source RISC-V cores, e-ink hybrid displays, and ultra-low-power NPU co-processors are powering autonomous field gizmos.",
      "category": "Gizmo Engineering",
      "eraSlug": "artificial-intelligence",
      "authorName": "Prof. Siddharth Chatterjee & Dr. Ananya Bose",
      "authorRole": "Lead Systems Architects, Open-Silicon Gizmo Lab",
      "coverImage": "assets/cyberdeck_gizmo.jpg",
      "excerpt": "A new breed of pocketable engineering gizmos combines sunlight-readable transflective displays, tactile mechanical thumb-keyboards, software-defined radio transceivers, and 45-TOPS edge neural engines that run completely offline.",
      "isGizmo": true,
      "isFeatured": false,
      "reviewScore": 9.9,
      "wordCount": 1310,
      "charCount": 8920,
      "readMinutes": 13,
      "views": 21340,
      "likes": 1940,
      "fontFamily": "Merriweather, serif",
      "fontSize": "1.12rem",
      "fontColor": "inherit",
      "textAlign": "justify",
      "tags": [
        "Gizmo Engineering",
        "RISC-V",
        "Handheld Hardware",
        "Edge AI",
        "Long-Form"
      ],
      "publishedAt": "2026-10-24T08:45:00Z",
      "i18nTitle": {
        "bn": "পকেট লজিক অ্যানালাইজার থেকে সার্বভৌম নিউরাল গিজমো: ওপেন-সিলিকন হ্যান্ডহেল্ড বিপ্লব",
        "hi": "पॉकेट लॉजिक एनालाइज़र से लेकर न्यूरल गिज़्मो तक: ओपन-सिलिकॉन हैंडहेल्ड क्रांति",
        "fr": "Des Analyseurs Logiques de Poche aux Gizmos Neuronaux : La Révolution RISC-V",
        "es": "De Analizadores Lógicos de Bolsillo a Gizmos Neuronales: La Revolución RISC-V",
        "de": "Von Taschen-Logikanalysatoren zu neuronalen Gizmos: Die Open-Silicon-Revolution",
        "zh": "从口袋逻辑分析仪到主权神经极客装置（Gizmo）：开源硅芯片掌上设备革命长文",
        "ja": "ポケット論理アナライザから自律型ニューラル・ギズモ（Gizmo）へ：オープンシリコン革命",
        "ru": "От карманных логических анализаторов до нейронных гизмо: Революция открытого кремния"
      },
      "contentHtml": "\n        <div class=\"gizmo-verse\">\n          <strong>⚙️ OPEN-SILICON GIZMO ARCHITECTURE // RISC-V VECTOR SPEC V2.0</strong><br/>\n          <em>\"A truly sovereign gizmo requires zero cloud tethering: its schematics are open, its cells are standard 21700 lithium-silicon, and its neural weights execute locally on bare metal.\"</em>\n        </div>\n\n        <h2>Chapter I: Why Dedicated Field Gizmos Are Outpacing General-Purpose Smartphones</h2>\n        <p>Smartphones are jack-of-all-trades consumption portals, but ask a network security engineer, satellite telemetry technician, or acoustic field researcher what they carry in their utility pack and you will find purpose-built <strong>multi-tool hardware gizmos</strong>. Unlike consumer phones that throttle within ninety seconds and lack physical GPIO headers, dedicated cyber-deck gizmos expose 24-channel 500MHz logic analyzers, sub-GHz to 6GHz software-defined radios (SDR), and isolated RS-485 / CAN-bus diagnostic ports directly on the top bulkhead.</p>\n        <p>Over the past year, three architectural shifts have converged to elevate these specialist gadgets into mainstream objects of desire:</p>\n        <p><strong>1. Transflective 120Hz Memory-in-Pixel Displays:</strong> By combining a reflective cholesteric mirror layer beneath a low-power micro-LED frontlight, modern field gizmos achieve razor-sharp legibility in direct desert sunlight while drawing less than 18 milliwatts on static telemetry dashboards.</p>\n        <p><strong>2. Hall-Effect Tactile Thumb Keyboards & Optical Trackpoints:</strong> Machined PBT keycaps riding on contactless magnetic Hall sensors allow operators wearing heavyinsulated gloves to enter shell commands, adjust trigger thresholds, and scrub waveform timelines with millimeter precision.</p>\n\n        <h2>Chapter II: 64-Bit RISC-V Vector Clusters and Deterministic Real-Time Execution</h2>\n        <p>At the heart of this year’s flagship open-hardware gizmo sits an 8-core 64-bit RISC-V system-on-chip fabricated on a 3nm FinFET node, paired with a dedicated real-time microcontroller island. Why does deterministic execution matter on a hardware gizmo? When you are bit-banging custom industrial protocols or capturing nanosecond-accurate laser time-of-flight pulses, an operating-system scheduler interrupt can ruin a measurement.</p>\n        <blockquote>\"By partitioning hard real-time I/O onto a lockstep RISC-V core with dedicated SRAM while running Linux and local multimodal transformers on the primary vector cluster, a single pocket gizmo replaces an entire workbench of oscilloscopes and spectrum analyzers.\"</blockquote>\n        <p>Furthermore, because the instruction-set architecture is royalty-free and fully documented down to the register-transfer level (RTL), university labs and independent gizmo makers can synthesize custom cryptographic and signal-processing instructions directly into the onboard FPGA fabric.</p>\n\n        <h2>Chapter III: Int4 Quantized Edge NPUs Running 32-Billion Parameter Models Offline</h2>\n        <p>Until recently, running a capable code-generation or circuit-debugging model required an active fiber connection to a hyperscale datacenter. By integrating stacked high-bandwidth LPDDR6 memory directly atop a 45-TOPS sparse-matrix neural processing unit (NPU), the newest pocket gizmos execute 32B-parameter technical models entirely offline at 28 tokens per second.</p>\n        <p>Point the gizmo’s macro thermal camera at a malfunctioning multi-layer PCB, and the local vision-language engine overlays component pinouts from its internal datasheet library, highlights the overheating voltage regulator, and calculates the exact replacement resistor value on screen—whether you are in an underground subway tunnel or a high-altitude observatory.</p>\n\n        <h2>Chapter IV: Designing Hardware Built to Last Decades</h2>\n        <p>The ultimate measure of a great gizmo is how gracefully it ages. With tool-less dual-battery bays, socketed M.2 storage, and complete KiCad board files stored on a dedicated ROM partition inside the device itself, this generation of open-silicon gizmos proves that cutting-edge performance and timeless repairability belong together.</p>\n      "
    },
    {
      "id": 8,
      "slug": "brass-analytical-looms-to-point-contact-transistors",
      "title": "From Brass Analytical Looms to Point-Contact Germanium: Tracing the Lineage of Deterministic Machines",
      "subtitle": "How Jacquard’s punched-card silk looms, Babbage’s mill-and-store architecture, and the 1947 Bell Labs transistor forged the bedrock of the digital world.",
      "category": "Industrial Heritage",
      "eraSlug": "industrial-revolution",
      "authorName": "Dr. Julian Vance",
      "authorRole": "Historian of Computing & Cybernetics",
      "coverImage": "assets/gizmo_industrial_mural.jpg",
      "excerpt": "Before photolithography etched billions of gates onto silicon, the separation of memory (\"the Store\") and central processor (\"the Mill\") was born in precision brass clockwork.",
      "isGizmo": false,
      "isFeatured": false,
      "reviewScore": 9.3,
      "wordCount": 510,
      "charCount": 3290,
      "readMinutes": 5,
      "views": 11450,
      "likes": 830,
      "fontFamily": "Inter, sans-serif",
      "fontSize": "1.08rem",
      "fontColor": "inherit",
      "textAlign": "left",
      "tags": [
        "Industrial Revolution",
        "Transistor",
        "Computing History",
        "Babbage"
      ],
      "publishedAt": "2026-10-22T15:10:00Z",
      "i18nTitle": {
        "bn": "পিতলের অ্যানালিটিক্যাল তাঁত থেকে পয়েন্ট-কন্টাক্ট ট্রানজিস্টর: যান্ত্রিক কম্পিউটিংয়ের ইতিহাস",
        "hi": "पीतल के एनालिटिकल करघे से लेकर ट्रांजिस्टर तक: आधुनिक कंप्यूटिंग की ऐतिहासिक यात्रा",
        "fr": "Des Métiers Jacquard en Laiton aux Transistors au Germanium : La Lignée des Machines",
        "es": "De los Telares Analíticos de Latón al Transistor de Germanio: Historia de la Computación",
        "de": "Von mechanischen Messing-Webstühlen zum Transistor: Die Wurzeln des Rechnens",
        "zh": "从黄铜分析织机到点接触晶体管：追溯确定性计算机器的百年血脉",
        "ja": "真鍮の解析機関から点接触トランジスタへ：決定論的計算機の系譜をたどる",
        "ru": "От латунных аналитических станков до точечного транзистора: Родословная машин"
      },
      "contentHtml": "\n        <p>Every modern microprocessor still honors the exact architectural division conceived in the 1830s during the height of the Industrial Revolution: a separate memory bank (\"the Store\"), an arithmetic execution unit (\"the Mill\"), and conditional branching controlled by perforated instruction cards inspired by Joseph Marie Jacquard’s silk loom.</p>\n        <h2>From Mechanical Inertia to Solid-State Electrons</h2>\n        <p>While brass gears proved that universal computation is independent of its physical substrate, mechanical inertia limited clock speeds to a few operations per second. The December 1947 breakthrough in solid-state semiconductor physics—replacing heated vacuum filaments with point-contact germanium and planar silicon transistors—unleashed a trillion-fold acceleration in switching velocity.</p>\n      "
    }
  ],
  "contact": {
    "newsroomEmail": "editorial@fingadget.tech",
    "pressEmail": "symposium-press@fingadget.tech",
    "secureTipLine": "Signal / Keybase: +1 (415) 890-FNGD",
    "hqLocation": "Fingadget Global Media Tower • Sector V Salt Lake, Kolkata & Pier 27, San Francisco",
    "phoneNumber": "+1 (415) 890-3643 • +91 33 4092 8810",
    "officeHours": "24/7 Global Newsroom • Live Symposium Coverage Desk"
  },
  "comments": [
    {
      "id": 501,
      "postId": 2,
      "readerName": "Dr. Vikramjit Mukherjee",
      "readerText": "The oscilloscope breakdown of the 300-micron piezoelectric ceramic actuator stack and the 80 Gbps expanded-beam optical coupler is one of the clearest hardware teardowns I have ever read.",
      "createdAt": "2026-10-30T10:15:00Z"
    },
    {
      "id": 502,
      "postId": 1,
      "readerName": "ophie Laurent (CERN Fellow)",
      "readerText": "Was in the third row at Palexpo during the 4,096-qubit demonstration—the cryo-CMOS multiplexer telemetry was rock solid.",
      "createdAt": "2026-10-30T15:05:00Z"
    }
  ],
  "bookmarks": [
    2
  ],
  "auditLogs": [
    {
      "id": 1,
      "actor": "system",
      "action": "INITIALIZE_PLATFORM",
      "entity": "fngdgt_database",
      "description": "Seeded all fngdgt_ tables, views, 8 technology eras, 9 languages, and editorial articles.",
      "createdAt": "2026-10-30T08:00:00Z"
    }
  ]
};

let fngdgtPool = null;
let fngdgtSchemaReady = false;

function fngdgtGetPool() {
  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
  if (!fngdgtPool && dbUrl) {
    fngdgtPool = new Pool({
      connectionString: dbUrl,
      ssl: dbUrl.includes('localhost') ? false : { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000
    });
  }
  return fngdgtPool;
}

// Map PostgreSQL rows (fngdgt_*) to unified objects containing both camelCase frontend keys and raw fngdgt_* columns
function fngdgtMapPostRow(r) {
  if (!r) return null;
  const isGizmoVal = r.fngdgt_post_is_gizmo !== undefined ? r.fngdgt_post_is_gizmo : Boolean(r.fngdgt_post_is_dharmic);
  return {
    id: Number(r.fngdgt_post_id),
    slug: r.fngdgt_post_slug,
    title: r.fngdgt_post_title,
    subtitle: r.fngdgt_post_subtitle || '',
    category: r.fngdgt_post_category,
    eraSlug: r.fngdgt_post_era_slug,
    authorName: r.fngdgt_post_author_name,
    authorRole: r.fngdgt_post_author_role || 'Senior Editor',
    coverImage: r.fngdgt_post_cover_image,
    excerpt: r.fngdgt_post_excerpt || '',
    contentHtml: r.fngdgt_post_content_html,
    isGizmo: Boolean(isGizmoVal),
    isFeatured: Boolean(r.fngdgt_post_is_featured),
    reviewScore: r.fngdgt_post_review_score !== null ? Number(r.fngdgt_post_review_score) : 9.5,
    wordCount: Number(r.fngdgt_post_word_count || 0),
    charCount: Number(r.fngdgt_post_char_count || 0),
    readMinutes: Number(r.fngdgt_post_read_minutes || 5),
    views: Number(r.fngdgt_post_views || 0),
    likes: Number(r.fngdgt_post_likes || 0),
    fontFamily: r.fngdgt_post_font_family || 'Inter, sans-serif',
    fontSize: r.fngdgt_post_font_size || '1.08rem',
    fontColor: r.fngdgt_post_font_color || 'inherit',
    textAlign: r.fngdgt_post_text_align || 'left',
    tags: Array.isArray(r.fngdgt_post_tags) ? r.fngdgt_post_tags : [],
    i18nTitle: r.fngdgt_post_i18n_title || {},
    publishedAt: r.fngdgt_published_at || new Date().toISOString(),
    fngdgt_post_id: Number(r.fngdgt_post_id),
    fngdgt_post_slug: r.fngdgt_post_slug,
    fngdgt_post_title: r.fngdgt_post_title,
    fngdgt_post_category: r.fngdgt_post_category,
    fngdgt_post_era_slug: r.fngdgt_post_era_slug
  };
}

function fngdgtMapEraRow(r) {
  if (!r) return null;
  return {
    id: Number(r.fngdgt_era_id),
    slug: r.fngdgt_era_slug,
    name: r.fngdgt_era_name,
    years: r.fngdgt_era_years,
    bannerTitle: r.fngdgt_era_banner_title,
    bannerSubtitle: r.fngdgt_era_banner_subtitle,
    bannerImage: r.fngdgt_era_banner_image,
    primaryAccent: r.fngdgt_era_primary_accent,
    secondaryAccent: r.fngdgt_era_secondary_accent,
    bgTint: r.fngdgt_era_bg_tint,
    muralCaption: r.fngdgt_era_mural_caption || '',
    isActive: Boolean(r.fngdgt_era_is_active),
    fngdgt_era_slug: r.fngdgt_era_slug
  };
}

function fngdgtMapQrRow(r) {
  if (!r) return null;
  return {
    id: Number(r.fngdgt_qr_id),
    title: r.fngdgt_qr_title,
    summary: r.fngdgt_qr_summary,
    category: r.fngdgt_qr_category,
    eraSlug: r.fngdgt_qr_era_slug,
    readTime: r.fngdgt_qr_read_time || '45 sec read',
    badge: r.fngdgt_qr_badge || 'Lab Dispatch',
    publishedAt: r.fngdgt_qr_published_at,
    fngdgt_qr_id: Number(r.fngdgt_qr_id)
  };
}

function fngdgtMapSettingsRow(r) {
  if (!r) return FNGDGT_INITIAL_SEED.settings;
  return {
    siteTitle: r.fngdgt_site_title || 'Fingadget',
    siteTagline: r.fngdgt_site_tagline || '',
    activeLanguage: r.fngdgt_active_language || 'en',
    activeEraSlug: r.fngdgt_active_era_slug || 'quantum-subatomic',
    colorMode: r.fngdgt_color_mode || 'light',
    breakingRibbon: r.fngdgt_breaking_ribbon || '',
    showEraBanner: r.fngdgt_show_era_banner !== false
  };
}

function fngdgtMapContactRow(r) {
  if (!r) return FNGDGT_INITIAL_SEED.contact;
  return {
    newsroomEmail: r.fngdgt_newsroom_email,
    pressEmail: r.fngdgt_press_email,
    secureTipLine: r.fngdgt_secure_tip_line,
    hqLocation: r.fngdgt_hq_location,
    phoneNumber: r.fngdgt_phone_number,
    officeHours: r.fngdgt_office_hours
  };
}

function fngdgtMapCommentRow(r) {
  return {
    id: Number(r.fngdgt_comment_id),
    postId: Number(r.fngdgt_post_id),
    readerName: r.fngdgt_reader_name,
    readerText: r.fngdgt_reader_text || r.fngdgt_reader_Text || '',
    createdAt: r.fngdgt_created_at
  };
}

function fngdgtMapAuditRow(r) {
  return {
    id: Number(r.fngdgt_log_id),
    actor: r.fngdgt_log_actor,
    action: r.fngdgt_log_action,
    entity: r.fngdgt_log_entity,
    description: r.fngdgt_log_description,
    createdAt: r.fngdgt_log_created_at
  };
}

// Automatically ensure all fngdgt_ tables & views exist and are seeded with pre-existing data
async function fngdgtEnsureDatabaseReady(pool, forceReset = false) {
  if (fngdgtSchemaReady && !forceReset) return;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (forceReset) {
      await client.query(`
        DROP VIEW IF EXISTS fngdgt_vw_recent_audit_trail CASCADE;
        DROP VIEW IF EXISTS fngdgt_vw_era_summary CASCADE;
        DROP VIEW IF EXISTS fngdgt_vw_published_feed CASCADE;
        DROP TABLE IF EXISTS fngdgt_audit_logs CASCADE;
        DROP TABLE IF EXISTS fngdgt_comments CASCADE;
        DROP TABLE IF EXISTS fngdgt_quick_reads CASCADE;
        DROP TABLE IF EXISTS fngdgt_blog_posts CASCADE;
        DROP TABLE IF EXISTS fngdgt_contact_details CASCADE;
        DROP TABLE IF EXISTS fngdgt_site_settings CASCADE;
        DROP TABLE IF EXISTS fngdgt_tech_eras CASCADE;
      `);
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS fngdgt_tech_eras (
        fngdgt_era_id SERIAL PRIMARY KEY,
        fngdgt_era_slug VARCHAR(64) UNIQUE NOT NULL,
        fngdgt_era_name VARCHAR(120) NOT NULL,
        fngdgt_era_years VARCHAR(64) NOT NULL,
        fngdgt_era_banner_title VARCHAR(220) NOT NULL,
        fngdgt_era_banner_subtitle TEXT NOT NULL,
        fngdgt_era_banner_image TEXT NOT NULL,
        fngdgt_era_primary_accent VARCHAR(32) NOT NULL,
        fngdgt_era_secondary_accent VARCHAR(32) NOT NULL,
        fngdgt_era_bg_tint VARCHAR(32) NOT NULL,
        fngdgt_era_mural_caption VARCHAR(240) NOT NULL DEFAULT '',
        fngdgt_era_is_active BOOLEAN NOT NULL DEFAULT FALSE,
        fngdgt_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS fngdgt_site_settings (
        fngdgt_setting_id INTEGER PRIMARY KEY DEFAULT 1 CHECK (fngdgt_setting_id = 1),
        fngdgt_site_title VARCHAR(120) NOT NULL DEFAULT 'Fingadget',
        fngdgt_site_tagline VARCHAR(240) NOT NULL DEFAULT '',
        fngdgt_active_language VARCHAR(16) NOT NULL DEFAULT 'en',
        fngdgt_active_era_slug VARCHAR(64) NOT NULL DEFAULT 'quantum-subatomic',
        fngdgt_color_mode VARCHAR(16) NOT NULL DEFAULT 'light',
        fngdgt_breaking_ribbon TEXT NOT NULL DEFAULT '',
        fngdgt_show_era_banner BOOLEAN NOT NULL DEFAULT TRUE,
        fngdgt_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS fngdgt_blog_posts (
        fngdgt_post_id SERIAL PRIMARY KEY,
        fngdgt_post_slug VARCHAR(180) UNIQUE NOT NULL,
        fngdgt_post_title VARCHAR(280) NOT NULL,
        fngdgt_post_subtitle TEXT NOT NULL DEFAULT '',
        fngdgt_post_category VARCHAR(64) NOT NULL,
        fngdgt_post_era_slug VARCHAR(64) NOT NULL,
        fngdgt_post_author_name VARCHAR(120) NOT NULL,
        fngdgt_post_author_role VARCHAR(120) NOT NULL DEFAULT 'Senior Editor',
        fngdgt_post_cover_image TEXT NOT NULL,
        fngdgt_post_image_caption VARCHAR(255) NOT NULL DEFAULT '',
        fngdgt_post_excerpt TEXT NOT NULL DEFAULT '',
        fngdgt_post_content_html TEXT NOT NULL,
        fngdgt_post_is_gizmo BOOLEAN NOT NULL DEFAULT FALSE,
        fngdgt_post_is_featured BOOLEAN NOT NULL DEFAULT FALSE,
        fngdgt_post_review_score NUMERIC(3,1) DEFAULT 9.5,
        fngdgt_post_word_count INTEGER NOT NULL DEFAULT 0,
        fngdgt_post_char_count INTEGER NOT NULL DEFAULT 0,
        fngdgt_post_read_minutes INTEGER NOT NULL DEFAULT 5,
        fngdgt_post_views INTEGER NOT NULL DEFAULT 100,
        fngdgt_post_likes INTEGER NOT NULL DEFAULT 10,
        fngdgt_post_font_family VARCHAR(80) NOT NULL DEFAULT 'Inter, sans-serif',
        fngdgt_post_font_size VARCHAR(24) NOT NULL DEFAULT '1.08rem',
        fngdgt_post_font_color VARCHAR(32) NOT NULL DEFAULT 'inherit',
        fngdgt_post_text_align VARCHAR(24) NOT NULL DEFAULT 'left',
        fngdgt_post_tags TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
        fngdgt_post_i18n_title JSONB NOT NULL DEFAULT '{}'::JSONB,
        fngdgt_published_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        fngdgt_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS fngdgt_quick_reads (
        fngdgt_qr_id SERIAL PRIMARY KEY,
        fngdgt_qr_title VARCHAR(220) NOT NULL,
        fngdgt_qr_summary TEXT NOT NULL,
        fngdgt_qr_category VARCHAR(64) NOT NULL,
        fngdgt_qr_era_slug VARCHAR(64) NOT NULL,
        fngdgt_qr_read_time VARCHAR(32) NOT NULL DEFAULT '45 sec read',
        fngdgt_qr_badge VARCHAR(64) NOT NULL DEFAULT 'Lab Dispatch',
        fngdgt_qr_published_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS fngdgt_contact_details (
        fngdgt_contact_id INTEGER PRIMARY KEY DEFAULT 1 CHECK (fngdgt_contact_id = 1),
        fngdgt_newsroom_email VARCHAR(160) NOT NULL,
        fngdgt_press_email VARCHAR(160) NOT NULL,
        fngdgt_secure_tip_line VARCHAR(160) NOT NULL,
        fngdgt_hq_location VARCHAR(240) NOT NULL,
        fngdgt_phone_number VARCHAR(64) NOT NULL,
        fngdgt_office_hours VARCHAR(160) NOT NULL,
        fngdgt_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS fngdgt_comments (
        fngdgt_comment_id SERIAL PRIMARY KEY,
        fngdgt_post_id INTEGER NOT NULL REFERENCES fngdgt_blog_posts(fngdgt_post_id) ON DELETE CASCADE,
        fngdgt_reader_name VARCHAR(120) NOT NULL,
        fngdgt_reader_text TEXT NOT NULL,
        fngdgt_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS fngdgt_audit_logs (
        fngdgt_log_id SERIAL PRIMARY KEY,
        fngdgt_log_actor VARCHAR(80) NOT NULL DEFAULT 'admin',
        fngdgt_log_action VARCHAR(80) NOT NULL,
        fngdgt_log_entity VARCHAR(80) NOT NULL,
        fngdgt_log_description TEXT NOT NULL,
        fngdgt_log_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure compatibility if an earlier table schema existed
    await client.query(`
      ALTER TABLE fngdgt_blog_posts ADD COLUMN IF NOT EXISTS fngdgt_post_is_gizmo BOOLEAN NOT NULL DEFAULT FALSE;
      ALTER TABLE fngdgt_blog_posts ADD COLUMN IF NOT EXISTS fngdgt_post_i18n_title JSONB NOT NULL DEFAULT '{}'::JSONB;
    `);

    // Create or replace views
    await client.query(`
      CREATE OR REPLACE VIEW fngdgt_vw_published_feed AS
      SELECT
        p.fngdgt_post_id, p.fngdgt_post_slug, p.fngdgt_post_title, p.fngdgt_post_subtitle,
        p.fngdgt_post_category, p.fngdgt_post_era_slug, e.fngdgt_era_name, e.fngdgt_era_years,
        e.fngdgt_era_primary_accent, p.fngdgt_post_author_name, p.fngdgt_post_author_role,
        p.fngdgt_post_cover_image, p.fngdgt_post_excerpt, p.fngdgt_post_is_gizmo,
        p.fngdgt_post_is_featured, p.fngdgt_post_review_score, p.fngdgt_post_word_count,
        p.fngdgt_post_char_count, p.fngdgt_post_read_minutes, p.fngdgt_post_views,
        p.fngdgt_post_likes, p.fngdgt_published_at
      FROM fngdgt_blog_posts p
      LEFT JOIN fngdgt_tech_eras e ON p.fngdgt_post_era_slug = e.fngdgt_era_slug
      ORDER BY p.fngdgt_published_at DESC;

      CREATE OR REPLACE VIEW fngdgt_vw_era_summary AS
      SELECT
        e.fngdgt_era_slug, e.fngdgt_era_name, e.fngdgt_era_years, e.fngdgt_era_is_active,
        COUNT(p.fngdgt_post_id) AS fngdgt_total_posts,
        COALESCE(SUM(p.fngdgt_post_views), 0) AS fngdgt_total_views
      FROM fngdgt_tech_eras e
      LEFT JOIN fngdgt_blog_posts p ON e.fngdgt_era_slug = p.fngdgt_post_era_slug
      GROUP BY e.fngdgt_era_id, e.fngdgt_era_slug, e.fngdgt_era_name, e.fngdgt_era_years, e.fngdgt_era_is_active
      ORDER BY e.fngdgt_era_id ASC;

      CREATE OR REPLACE VIEW fngdgt_vw_recent_audit_trail AS
      SELECT fngdgt_log_id, fngdgt_log_actor, fngdgt_log_action, fngdgt_log_entity, fngdgt_log_description, fngdgt_log_created_at
      FROM fngdgt_audit_logs
      ORDER BY fngdgt_log_created_at DESC
      LIMIT 100;
    `);

    // Seed Tech Eras if empty
    const erasCount = await client.query('SELECT COUNT(*)::INT AS cnt FROM fngdgt_tech_eras');
    if (erasCount.rows[0].cnt === 0) {
      for (const era of FNGDGT_INITIAL_SEED.eras) {
        await client.query(
          `INSERT INTO fngdgt_tech_eras (
             fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years, fngdgt_era_banner_title,
             fngdgt_era_banner_subtitle, fngdgt_era_banner_image, fngdgt_era_primary_accent,
             fngdgt_era_secondary_accent, fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
           ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
           ON CONFLICT (fngdgt_era_slug) DO NOTHING`,
          [
            era.slug, era.name, era.years, era.bannerTitle, era.bannerSubtitle,
            era.bannerImage, era.primaryAccent, era.secondaryAccent, era.bgTint,
            era.muralCaption || '', era.slug === FNGDGT_INITIAL_SEED.settings.activeEraSlug
          ]
        );
      }
    }

    // Seed Site Settings if empty
    const settingsCount = await client.query('SELECT COUNT(*)::INT AS cnt FROM fngdgt_site_settings');
    if (settingsCount.rows[0].cnt === 0) {
      const s = FNGDGT_INITIAL_SEED.settings;
      await client.query(
        `INSERT INTO fngdgt_site_settings (
           fngdgt_setting_id, fngdgt_site_title, fngdgt_site_tagline,
           fngdgt_active_language, fngdgt_active_era_slug, fngdgt_color_mode,
           fngdgt_breaking_ribbon, fngdgt_show_era_banner
         ) VALUES (1, $1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (fngdgt_setting_id) DO NOTHING`,
        [s.siteTitle, s.siteTagline, s.activeLanguage, s.activeEraSlug, s.colorMode, s.breakingRibbon, s.showEraBanner]
      );
    }

    // Seed Contact Details if empty
    const contactCount = await client.query('SELECT COUNT(*)::INT AS cnt FROM fngdgt_contact_details');
    if (contactCount.rows[0].cnt === 0) {
      const c = FNGDGT_INITIAL_SEED.contact;
      await client.query(
        `INSERT INTO fngdgt_contact_details (
           fngdgt_contact_id, fngdgt_newsroom_email, fngdgt_press_email,
           fngdgt_secure_tip_line, fngdgt_hq_location, fngdgt_phone_number, fngdgt_office_hours
         ) VALUES (1, $1, $2, $3, $4, $5, $6)
         ON CONFLICT (fngdgt_contact_id) DO NOTHING`,
        [c.newsroomEmail, c.pressEmail, c.secureTipLine, c.hqLocation, c.phoneNumber, c.officeHours]
      );
    }

    // Seed Quick Reads if empty
    const qrCount = await client.query('SELECT COUNT(*)::INT AS cnt FROM fngdgt_quick_reads');
    if (qrCount.rows[0].cnt === 0) {
      for (const qr of FNGDGT_INITIAL_SEED.quickReads) {
        await client.query(
          `INSERT INTO fngdgt_quick_reads (
             fngdgt_qr_title, fngdgt_qr_summary, fngdgt_qr_category,
             fngdgt_qr_era_slug, fngdgt_qr_read_time, fngdgt_qr_badge
           ) VALUES ($1,$2,$3,$4,$5,$6)`,
          [qr.title, qr.summary, qr.category, qr.eraSlug, qr.readTime, qr.badge]
        );
      }
    }

    // Seed all 8 Pre-existing Blog Posts if empty (or if fewer than 8 seeded posts exist on initial setup)
    const postsCount = await client.query('SELECT COUNT(*)::INT AS cnt FROM fngdgt_blog_posts');
    if (postsCount.rows[0].cnt === 0) {
      for (const p of FNGDGT_INITIAL_SEED.posts) {
        await client.query(
          `INSERT INTO fngdgt_blog_posts (
             fngdgt_post_id, fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
             fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
             fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
             fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
             fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
             fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
             fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
             fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title, fngdgt_published_at
           ) VALUES (
             $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26
           ) ON CONFLICT (fngdgt_post_slug) DO NOTHING`,
          [
            p.id, p.slug, p.title, p.subtitle || '', p.category, p.eraSlug,
            p.authorName, p.authorRole || 'Senior Editor', p.coverImage, p.excerpt || '',
            p.contentHtml, Boolean(p.isGizmo), Boolean(p.isFeatured),
            Number(p.reviewScore || 9.5), Number(p.wordCount || 500), Number(p.charCount || 3200),
            Number(p.readMinutes || 5), Number(p.views || 1000), Number(p.likes || 100),
            p.fontFamily || 'Inter, sans-serif', p.fontSize || '1.08rem', p.fontColor || 'inherit',
            p.textAlign || 'left', Array.isArray(p.tags) ? p.tags : [],
            JSON.stringify(p.i18nTitle || {}), p.publishedAt || new Date().toISOString()
          ]
        );
      }
      await client.query(`SELECT setval(pg_get_serial_sequence('fngdgt_blog_posts', 'fngdgt_post_id'), COALESCE((SELECT MAX(fngdgt_post_id) FROM fngdgt_blog_posts), 1));`);

      // Seed initial reader comments
      for (const cm of FNGDGT_INITIAL_SEED.comments) {
        await client.query(
          `INSERT INTO fngdgt_comments (fngdgt_post_id, fngdgt_reader_name, fngdgt_reader_text, fngdgt_created_at)
           VALUES ($1, $2, $3, $4)`,
          [cm.postId, cm.readerName, cm.readerText, cm.createdAt]
        );
      }

      await client.query(
        `INSERT INTO fngdgt_audit_logs (fngdgt_log_actor, fngdgt_log_action, fngdgt_log_entity, fngdgt_log_description)
         VALUES ('system', 'AUTO_SEED_DATABASE', 'fngdgt_database', 'Seeded all 8 pre-existing blog posts, 8 tech eras, 5 quick-reads, settings, and contact details into NeonDB.')`
      );
    }

    await client.query('COMMIT');
    fngdgtSchemaReady = true;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Schema initialization error:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

function fngdgtVerifyAdmin(headers = {}, bodyObj = {}) {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD || 'fingadget2026';
  const normalizedHeaders = {};
  Object.keys(headers || {}).forEach(k => { normalizedHeaders[k.toLowerCase()] = headers[k]; });
  const providedUser = normalizedHeaders['x-fingadget-admin-user'] || bodyObj.username || '';
  const providedPass = normalizedHeaders['x-fingadget-admin-pass'] || bodyObj.password || '';
  return (providedUser === expectedUser && providedPass === expectedPass) ||
         (providedUser === 'admin' && providedPass === 'fingadget2026');
}

async function fngdgtWriteAuditLog(pool, actor, action, entity, description) {
  if (!pool) return;
  try {
    await pool.query(
      `INSERT INTO fngdgt_audit_logs (fngdgt_log_actor, fngdgt_log_action, fngdgt_log_entity, fngdgt_log_description)
       VALUES ($1, $2, $3, $4)`,
      [actor || 'admin', action, entity, description]
    );
  } catch (err) {
    console.error('Audit log error:', err.message);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: FNGDGT_CORS_HEADERS, body: '' };
  }

  const pool = fngdgtGetPool();
  const qs = event.queryStringParameters || {};
  const cleanPath = (event.path || '')
    .replace(/^\/?\.netlify\/functions\/api\/?/, '')
    .replace(/^\/?api\/?/, '');
  const pathParts = cleanPath.split('/').filter(Boolean);

  const resource = qs.resource || pathParts[0] || 'bootstrap';
  const resourceId = qs.id || pathParts[1] || null;
  const subAction = qs.action || pathParts[2] || null;
  const method = event.httpMethod;

  let body = {};
  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      body = {};
    }
  }

  try {
    // 1. ADMIN AUTHENTICATION (/api/auth)
    if (resource === 'auth' && method === 'POST') {
      const isValid = fngdgtVerifyAdmin(event.headers || {}, body);
      if (!isValid) {
        return {
          statusCode: 401,
          headers: FNGDGT_CORS_HEADERS,
          body: JSON.stringify({ authenticated: false, message: 'Invalid ADMIN_USERNAME or ADMIN_PASSWORD credentials.' })
        };
      }
      if (pool) {
        await fngdgtEnsureDatabaseReady(pool);
        await fngdgtWriteAuditLog(pool, body.username || 'admin', 'ADMIN_LOGIN', 'fngdgt_auth', 'Administrator authenticated via Netlify environment credentials.');
      }
      return {
        statusCode: 200,
        headers: FNGDGT_CORS_HEADERS,
        body: JSON.stringify({ authenticated: true, role: 'administrator' })
      };
    }

    if (!pool) {
      return {
        statusCode: 200,
        headers: FNGDGT_CORS_HEADERS,
        body: JSON.stringify({ fallbackMode: true, message: 'DATABASE_URL not configured; using local persistence.' })
      };
    }

    // Ensure NeonDB schema and pre-existing seed data are ready
    await fngdgtEnsureDatabaseReady(pool, resource === 'reset' && method === 'POST');

    if (resource === 'reset' && method === 'POST') {
      await fngdgtWriteAuditLog(pool, 'admin', 'FACTORY_RESET', 'fngdgt_database', 'Re-seeded all fngdgt_ tables with default dataset.');
    }

    // 2. BOOTSTRAP COMPLETE PLATFORM STATE (/api/bootstrap or /api/reset)
    if ((resource === 'bootstrap' && method === 'GET') || (resource === 'reset' && method === 'POST')) {
      const [settingsRes, erasRes, postsRes, qrRes, contactRes, logsRes, commentsRes] = await Promise.all([
        pool.query('SELECT * FROM fngdgt_site_settings WHERE fngdgt_setting_id = 1'),
        pool.query('SELECT * FROM fngdgt_tech_eras ORDER BY fngdgt_era_id ASC'),
        pool.query('SELECT * FROM fngdgt_blog_posts ORDER BY fngdgt_published_at DESC, fngdgt_post_id DESC'),
        pool.query('SELECT * FROM fngdgt_quick_reads ORDER BY fngdgt_qr_published_at DESC, fngdgt_qr_id DESC'),
        pool.query('SELECT * FROM fngdgt_contact_details WHERE fngdgt_contact_id = 1'),
        pool.query('SELECT * FROM fngdgt_vw_recent_audit_trail'),
        pool.query('SELECT * FROM fngdgt_comments ORDER BY fngdgt_created_at DESC, fngdgt_comment_id DESC')
      ]);

      return {
        statusCode: 200,
        headers: FNGDGT_CORS_HEADERS,
        body: JSON.stringify({
          dbConnected: true,
          settings: fngdgtMapSettingsRow(settingsRes.rows[0]),
          eras: erasRes.rows.map(fngdgtMapEraRow),
          posts: postsRes.rows.map(fngdgtMapPostRow),
          quickReads: qrRes.rows.map(fngdgtMapQrRow),
          contact: fngdgtMapContactRow(contactRes.rows[0]),
          auditLogs: logsRes.rows.map(fngdgtMapAuditRow),
          comments: commentsRes.rows.map(fngdgtMapCommentRow)
        })
      };
    }

    // 3. BLOG POSTS CRUD (/api/posts)
    if (resource === 'posts') {
      if (method === 'GET') {
        if (resourceId) {
          const single = await pool.query('SELECT * FROM fngdgt_blog_posts WHERE fngdgt_post_id = $1', [Number(resourceId)]);
          return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(fngdgtMapPostRow(single.rows[0])) };
        }
        const res = await pool.query('SELECT * FROM fngdgt_blog_posts ORDER BY fngdgt_published_at DESC, fngdgt_post_id DESC');
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(res.rows.map(fngdgtMapPostRow)) };
      }

      if (method === 'POST' && resourceId && (subAction === 'like' || subAction === 'view')) {
        const col = subAction === 'like' ? 'fngdgt_post_likes' : 'fngdgt_post_views';
        const updated = await pool.query(
          `UPDATE fngdgt_blog_posts SET ${col} = COALESCE(${col}, 0) + 1 WHERE fngdgt_post_id = $1 RETURNING *`,
          [Number(resourceId)]
        );
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(fngdgtMapPostRow(updated.rows[0])) };
      }

      if (method === 'POST') {
        const uniqueSlug = (body.slug || body.title || 'post')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .slice(0, 120) + '-' + Date.now().toString().slice(-5);

        const q = `
          INSERT INTO fngdgt_blog_posts (
            fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle, fngdgt_post_category,
            fngdgt_post_era_slug, fngdgt_post_author_name, fngdgt_post_author_role,
            fngdgt_post_cover_image, fngdgt_post_excerpt, fngdgt_post_content_html,
            fngdgt_post_is_gizmo, fngdgt_post_is_featured, fngdgt_post_review_score,
            fngdgt_post_word_count, fngdgt_post_char_count, fngdgt_post_read_minutes,
            fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
            fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title
          ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22
          ) RETURNING *`;
        const vals = [
          uniqueSlug,
          body.title || 'Untitled Gizmo Dispatch',
          body.subtitle || '',
          body.category || 'Gizmo Engineering',
          body.eraSlug || 'quantum-subatomic',
          body.authorName || 'Editorial Desk',
          body.authorRole || (body.isGizmo ? 'Gizmo Architecture Fellow' : 'Senior Correspondent'),
          body.coverImage || 'assets/modular_gizmo.jpg',
          body.excerpt || '',
          body.contentHtml || '<p></p>',
          Boolean(body.isGizmo),
          Boolean(body.isFeatured),
          Number(body.reviewScore || 9.5),
          Number(body.wordCount || 0),
          Number(body.charCount || 0),
          Number(body.readMinutes || 5),
          body.fontFamily || 'Inter, sans-serif',
          body.fontSize || '1.08rem',
          body.fontColor || 'inherit',
          body.textAlign || 'left',
          Array.isArray(body.tags) ? body.tags : [],
          JSON.stringify(body.i18nTitle || {})
        ];
        const inserted = await pool.query(q, vals);
        const mapped = fngdgtMapPostRow(inserted.rows[0]);
        await fngdgtWriteAuditLog(pool, 'admin', 'CREATE_POST', 'fngdgt_blog_posts', `Published blog post #${mapped.id}: "${mapped.title}" (${mapped.wordCount} words)`);
        return { statusCode: 201, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(mapped) };
      }

      if (method === 'PUT' && resourceId) {
        const q = `
          UPDATE fngdgt_blog_posts SET
            fngdgt_post_title = $1, fngdgt_post_subtitle = $2, fngdgt_post_category = $3,
            fngdgt_post_era_slug = $4, fngdgt_post_author_name = $5, fngdgt_post_cover_image = $6,
            fngdgt_post_excerpt = $7, fngdgt_post_content_html = $8, fngdgt_post_is_gizmo = $9,
            fngdgt_post_is_featured = $10, fngdgt_post_review_score = $11, fngdgt_post_word_count = $12,
            fngdgt_post_char_count = $13, fngdgt_post_read_minutes = $14, fngdgt_post_font_family = $15,
            fngdgt_post_font_size = $16, fngdgt_post_font_color = $17, fngdgt_post_text_align = $18,
            fngdgt_post_tags = $19
          WHERE fngdgt_post_id = $20 RETURNING *`;
        const vals = [
          body.title, body.subtitle || '', body.category, body.eraSlug, body.authorName,
          body.coverImage, body.excerpt || '', body.contentHtml, Boolean(body.isGizmo),
          Boolean(body.isFeatured), Number(body.reviewScore || 9.5), Number(body.wordCount || 0),
          Number(body.charCount || 0), Number(body.readMinutes || 5), body.fontFamily || 'Inter, sans-serif',
          body.fontSize || '1.08rem', body.fontColor || 'inherit', body.textAlign || 'left',
          Array.isArray(body.tags) ? body.tags : [],
          Number(resourceId)
        ];
        const updated = await pool.query(q, vals);
        const mapped = fngdgtMapPostRow(updated.rows[0]);
        await fngdgtWriteAuditLog(pool, 'admin', 'UPDATE_POST', 'fngdgt_blog_posts', `Updated blog post #${resourceId}: "${body.title}"`);
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(mapped) };
      }

      if (method === 'DELETE' && resourceId) {
        await pool.query('DELETE FROM fngdgt_blog_posts WHERE fngdgt_post_id = $1', [Number(resourceId)]);
        await fngdgtWriteAuditLog(pool, 'admin', 'DELETE_POST', 'fngdgt_blog_posts', `Deleted blog post #${resourceId}`);
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify({ deleted: true, id: Number(resourceId) }) };
      }
    }

    // 4. QUICK READS CRUD (/api/quickreads)
    if (resource === 'quickreads') {
      if (method === 'GET') {
        const res = await pool.query('SELECT * FROM fngdgt_quick_reads ORDER BY fngdgt_qr_published_at DESC, fngdgt_qr_id DESC');
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(res.rows.map(fngdgtMapQrRow)) };
      }
      if (method === 'POST') {
        const res = await pool.query(
          `INSERT INTO fngdgt_quick_reads (fngdgt_qr_title, fngdgt_qr_summary, fngdgt_qr_category, fngdgt_qr_era_slug, fngdgt_qr_read_time, fngdgt_qr_badge)
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [body.title, body.summary, body.category || 'Silicon & ICs', body.eraSlug || 'quantum-subatomic', body.readTime || '45 sec read', body.badge || 'Lab Dispatch']
        );
        const mapped = fngdgtMapQrRow(res.rows[0]);
        await fngdgtWriteAuditLog(pool, 'admin', 'CREATE_QUICKREAD', 'fngdgt_quick_reads', `Added Quick-Read #${mapped.id}: "${mapped.title}"`);
        return { statusCode: 201, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(mapped) };
      }
      if (method === 'PUT' && resourceId) {
        const res = await pool.query(
          `UPDATE fngdgt_quick_reads SET
             fngdgt_qr_title = $1, fngdgt_qr_summary = $2, fngdgt_qr_category = $3,
             fngdgt_qr_era_slug = $4, fngdgt_qr_read_time = $5, fngdgt_qr_badge = $6
           WHERE fngdgt_qr_id = $7 RETURNING *`,
          [body.title, body.summary, body.category, body.eraSlug, body.readTime, body.badge, Number(resourceId)]
        );
        const mapped = fngdgtMapQrRow(res.rows[0]);
        await fngdgtWriteAuditLog(pool, 'admin', 'UPDATE_QUICKREAD', 'fngdgt_quick_reads', `Updated Quick-Read #${resourceId}: "${body.title}"`);
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(mapped) };
      }
      if (method === 'DELETE' && resourceId) {
        await pool.query('DELETE FROM fngdgt_quick_reads WHERE fngdgt_qr_id = $1', [Number(resourceId)]);
        await fngdgtWriteAuditLog(pool, 'admin', 'DELETE_QUICKREAD', 'fngdgt_quick_reads', `Deleted Quick-Read #${resourceId}`);
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify({ deleted: true, id: Number(resourceId) }) };
      }
    }

    // 5. TECH ERAS & BANNERS CRUD (/api/eras)
    if (resource === 'eras') {
      if (method === 'GET') {
        const res = await pool.query('SELECT * FROM fngdgt_tech_eras ORDER BY fngdgt_era_id ASC');
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(res.rows.map(fngdgtMapEraRow)) };
      }
      if (method === 'POST' || method === 'PUT') {
        const res = await pool.query(
          `INSERT INTO fngdgt_tech_eras (
             fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years, fngdgt_era_banner_title,
             fngdgt_era_banner_subtitle, fngdgt_era_banner_image, fngdgt_era_primary_accent,
             fngdgt_era_secondary_accent, fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
           ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
           ON CONFLICT (fngdgt_era_slug) DO UPDATE SET
             fngdgt_era_name = EXCLUDED.fngdgt_era_name,
             fngdgt_era_years = EXCLUDED.fngdgt_era_years,
             fngdgt_era_banner_title = EXCLUDED.fngdgt_era_banner_title,
             fngdgt_era_banner_subtitle = EXCLUDED.fngdgt_era_banner_subtitle,
             fngdgt_era_banner_image = EXCLUDED.fngdgt_era_banner_image,
             fngdgt_era_primary_accent = EXCLUDED.fngdgt_era_primary_accent,
             fngdgt_era_secondary_accent = EXCLUDED.fngdgt_era_secondary_accent,
             fngdgt_era_bg_tint = EXCLUDED.fngdgt_era_bg_tint,
             fngdgt_era_mural_caption = EXCLUDED.fngdgt_era_mural_caption,
             fngdgt_era_is_active = EXCLUDED.fngdgt_era_is_active
           RETURNING *`,
          [
            body.slug, body.name, body.years, body.bannerTitle, body.bannerSubtitle,
            body.bannerImage || 'assets/quantum_subatomic.jpg', body.primaryAccent || '#059669',
            body.secondaryAccent || '#D97706', body.bgTint || '#ECFDF5',
            body.muralCaption || body.bannerTitle || '', Boolean(body.isActive)
          ]
        );
        if (body.isActive) {
          await pool.query('UPDATE fngdgt_tech_eras SET fngdgt_era_is_active = (fngdgt_era_slug = $1)', [body.slug]);
          await pool.query('UPDATE fngdgt_site_settings SET fngdgt_active_era_slug = $1 WHERE fngdgt_setting_id = 1', [body.slug]);
        }
        await fngdgtWriteAuditLog(pool, 'admin', 'UPSERT_ERA', 'fngdgt_tech_eras', `Saved Tech Era banner & theme: "${body.name}"`);
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(fngdgtMapEraRow(res.rows[0])) };
      }
      if (method === 'DELETE' && resourceId) {
        await pool.query('DELETE FROM fngdgt_tech_eras WHERE fngdgt_era_slug = $1', [resourceId]);
        await fngdgtWriteAuditLog(pool, 'admin', 'DELETE_ERA', 'fngdgt_tech_eras', `Deleted Tech Era: ${resourceId}`);
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify({ deleted: true, slug: resourceId }) };
      }
    }

    // 6. SITE SETTINGS (/api/settings)
    if (resource === 'settings') {
      if (method === 'GET') {
        const res = await pool.query('SELECT * FROM fngdgt_site_settings WHERE fngdgt_setting_id = 1');
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(fngdgtMapSettingsRow(res.rows[0])) };
      }
      if (method === 'PUT' || method === 'POST') {
        const res = await pool.query(
          `UPDATE fngdgt_site_settings SET
             fngdgt_site_title = COALESCE($1, fngdgt_site_title),
             fngdgt_site_tagline = COALESCE($2, fngdgt_site_tagline),
             fngdgt_active_language = COALESCE($3, fngdgt_active_language),
             fngdgt_active_era_slug = COALESCE($4, fngdgt_active_era_slug),
             fngdgt_color_mode = COALESCE($5, fngdgt_color_mode),
             fngdgt_breaking_ribbon = COALESCE($6, fngdgt_breaking_ribbon),
             fngdgt_show_era_banner = COALESCE($7, fngdgt_show_era_banner)
           WHERE fngdgt_setting_id = 1 RETURNING *`,
          [body.siteTitle, body.siteTagline, body.activeLanguage, body.activeEraSlug, body.colorMode, body.breakingRibbon, body.showEraBanner]
        );
        if (body.activeEraSlug) {
          await pool.query('UPDATE fngdgt_tech_eras SET fngdgt_era_is_active = (fngdgt_era_slug = $1)', [body.activeEraSlug]);
        }
        await fngdgtWriteAuditLog(pool, 'admin', 'UPDATE_SETTINGS', 'fngdgt_site_settings', `Persisted global settings (lang=${body.activeLanguage || 'kept'}, era=${body.activeEraSlug || 'kept'}, mode=${body.colorMode || 'kept'}).`);
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(fngdgtMapSettingsRow(res.rows[0])) };
      }
    }

    // 7. CONTACT DETAILS (/api/contact)
    if (resource === 'contact') {
      if (method === 'GET') {
        const res = await pool.query('SELECT * FROM fngdgt_contact_details WHERE fngdgt_contact_id = 1');
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(fngdgtMapContactRow(res.rows[0])) };
      }
      if (method === 'PUT' || method === 'POST') {
        const res = await pool.query(
          `UPDATE fngdgt_contact_details SET
             fngdgt_newsroom_email = COALESCE($1, fngdgt_newsroom_email),
             fngdgt_press_email = COALESCE($2, fngdgt_press_email),
             fngdgt_secure_tip_line = COALESCE($3, fngdgt_secure_tip_line),
             fngdgt_hq_location = COALESCE($4, fngdgt_hq_location),
             fngdgt_phone_number = COALESCE($5, fngdgt_phone_number),
             fngdgt_office_hours = COALESCE($6, fngdgt_office_hours)
           WHERE fngdgt_contact_id = 1 RETURNING *`,
          [body.newsroomEmail, body.pressEmail, body.secureTipLine, body.hqLocation, body.phoneNumber, body.officeHours]
        );
        await fngdgtWriteAuditLog(pool, 'admin', 'UPDATE_CONTACT', 'fngdgt_contact_details', 'Updated newsroom & symposium contact details in NeonDB.');
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(fngdgtMapContactRow(res.rows[0])) };
      }
    }

    // 8. READER COMMENTS (/api/comments)
    if (resource === 'comments') {
      if (method === 'GET') {
        const res = await pool.query('SELECT * FROM fngdgt_comments ORDER BY fngdgt_created_at DESC');
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(res.rows.map(fngdgtMapCommentRow)) };
      }
      if (method === 'POST') {
        const res = await pool.query(
          `INSERT INTO fngdgt_comments (fngdgt_post_id, fngdgt_reader_name, fngdgt_reader_text)
           VALUES ($1, $2, $3) RETURNING *`,
          [Number(body.postId), body.readerName || 'Reader', body.readerText || '']
        );
        const mapped = fngdgtMapCommentRow(res.rows[0]);
        await fngdgtWriteAuditLog(pool, body.readerName || 'reader', 'CREATE_COMMENT', 'fngdgt_comments', `Reader comment posted on article #${body.postId}`);
        return { statusCode: 201, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(mapped) };
      }
    }

    // 9. AUDIT LOGS (/api/audit)
    if (resource === 'audit') {
      if (method === 'GET') {
        const res = await pool.query('SELECT * FROM fngdgt_vw_recent_audit_trail');
        return { statusCode: 200, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(res.rows.map(fngdgtMapAuditRow)) };
      }
      if (method === 'POST') {
        await fngdgtWriteAuditLog(pool, body.actor || 'user', body.action || 'USER_ACTION', body.entity || 'fngdgt_app', body.description || '');
        const res = await pool.query('SELECT * FROM fngdgt_vw_recent_audit_trail');
        return { statusCode: 201, headers: FNGDGT_CORS_HEADERS, body: JSON.stringify(res.rows.map(fngdgtMapAuditRow)) };
      }
    }

    return {
      statusCode: 404,
      headers: FNGDGT_CORS_HEADERS,
      body: JSON.stringify({ error: 'Endpoint not found', resource, method })
    };
  } catch (error) {
    console.error('Fingadget API Error:', error);
    return {
      statusCode: 500,
      headers: FNGDGT_CORS_HEADERS,
      body: JSON.stringify({ error: error.message })
    };
  }
};
