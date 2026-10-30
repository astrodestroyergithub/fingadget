-- ============================================================================
-- FINGADGET PLATFORM - NEONDB POSTGRESQL SCHEMA, VIEWS, TRIGGERS & SEED SCRIPT
-- All database objects strictly use the 'fngdgt_' prefix to guarantee zero
-- collision with pre-existing tables, views, functions, or variables.
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- 1. CLEANUP OF ALL PRE-EXISTING 'fngdgt_' DATABASE OBJECTS
-- ----------------------------------------------------------------------------
DROP VIEW IF EXISTS fngdgt_vw_recent_audit_trail CASCADE;
DROP VIEW IF EXISTS fngdgt_vw_era_summary CASCADE;
DROP VIEW IF EXISTS fngdgt_vw_published_feed CASCADE;

DROP TRIGGER IF EXISTS fngdgt_trg_blog_posts_updated ON fngdgt_blog_posts CASCADE;
DROP TRIGGER IF EXISTS fngdgt_trg_site_settings_updated ON fngdgt_site_settings CASCADE;
DROP TRIGGER IF EXISTS fngdgt_trg_contact_details_updated ON fngdgt_contact_details CASCADE;

DROP FUNCTION IF EXISTS fngdgt_fn_touch_updated_at() CASCADE;

DROP TABLE IF EXISTS fngdgt_audit_logs CASCADE;
DROP TABLE IF EXISTS fngdgt_comments CASCADE;
DROP TABLE IF EXISTS fngdgt_quick_reads CASCADE;
DROP TABLE IF EXISTS fngdgt_blog_posts CASCADE;
DROP TABLE IF EXISTS fngdgt_contact_details CASCADE;
DROP TABLE IF EXISTS fngdgt_site_settings CASCADE;
DROP TABLE IF EXISTS fngdgt_tech_eras CASCADE;

-- ----------------------------------------------------------------------------
-- 2. UTILITY TRIGGER FUNCTION FOR AUTOMATIC TIMESTAMP MANAGEMENT
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fngdgt_fn_touch_updated_at()
RETURNS TRIGGER AS $$
DECLARE
    fngdgt_v_now TIMESTAMPTZ := CURRENT_TIMESTAMP;
BEGIN
    NEW.fngdgt_updated_at := fngdgt_v_now;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- 3. TABLE: fngdgt_tech_eras (Technology Eras, Banners & Dynamic Themes)
-- ----------------------------------------------------------------------------
CREATE TABLE fngdgt_tech_eras (
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
    fngdgt_era_mural_caption VARCHAR(240) NOT NULL,
    fngdgt_era_is_active BOOLEAN NOT NULL DEFAULT FALSE,
    fngdgt_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 4. TABLE: fngdgt_site_settings (Global Platform State, Language & Theme)
-- ----------------------------------------------------------------------------
CREATE TABLE fngdgt_site_settings (
    fngdgt_setting_id INTEGER PRIMARY KEY DEFAULT 1 CHECK (fngdgt_setting_id = 1),
    fngdgt_site_title VARCHAR(120) NOT NULL DEFAULT 'Fingadget',
    fngdgt_site_tagline VARCHAR(240) NOT NULL DEFAULT 'The Definitive Frontier of Consumer Hardware, Deep Science & Gizmo Cybernetics',
    fngdgt_active_language VARCHAR(16) NOT NULL DEFAULT 'en',
    fngdgt_active_era_slug VARCHAR(64) NOT NULL DEFAULT 'quantum-subatomic',
    fngdgt_color_mode VARCHAR(16) NOT NULL DEFAULT 'light',
    fngdgt_breaking_ribbon TEXT NOT NULL DEFAULT 'GLOBAL SYMPOSIUM DISPATCH: Sub-Angstrom Photonic Interconnects & Fault-Tolerant Logical Qubits Unveiled at Geneva Laser Summit',
    fngdgt_show_era_banner BOOLEAN NOT NULL DEFAULT TRUE,
    fngdgt_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER fngdgt_trg_site_settings_updated
BEFORE UPDATE ON fngdgt_site_settings
FOR EACH ROW EXECUTE FUNCTION fngdgt_fn_touch_updated_at();

-- ----------------------------------------------------------------------------
-- 5. TABLE: fngdgt_blog_posts (Full Editorial & Long-Form Gizmo Posts)
-- ----------------------------------------------------------------------------
CREATE TABLE fngdgt_blog_posts (
    fngdgt_post_id SERIAL PRIMARY KEY,
    fngdgt_post_slug VARCHAR(180) UNIQUE NOT NULL,
    fngdgt_post_title VARCHAR(280) NOT NULL,
    fngdgt_post_subtitle TEXT NOT NULL,
    fngdgt_post_category VARCHAR(64) NOT NULL,
    fngdgt_post_era_slug VARCHAR(64) NOT NULL REFERENCES fngdgt_tech_eras(fngdgt_era_slug) ON UPDATE CASCADE,
    fngdgt_post_author_name VARCHAR(120) NOT NULL,
    fngdgt_post_author_role VARCHAR(120) NOT NULL,
    fngdgt_post_cover_image TEXT NOT NULL,
    fngdgt_post_image_caption VARCHAR(255) NOT NULL DEFAULT '',
    fngdgt_post_excerpt TEXT NOT NULL,
    fngdgt_post_content_html TEXT NOT NULL,
    fngdgt_post_is_gizmo BOOLEAN NOT NULL DEFAULT FALSE,
    fngdgt_post_is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    fngdgt_post_review_score NUMERIC(3,1) DEFAULT NULL,
    fngdgt_post_word_count INTEGER NOT NULL DEFAULT 0,
    fngdgt_post_char_count INTEGER NOT NULL DEFAULT 0,
    fngdgt_post_read_minutes INTEGER NOT NULL DEFAULT 5,
    fngdgt_post_views INTEGER NOT NULL DEFAULT 100,
    fngdgt_post_likes INTEGER NOT NULL DEFAULT 10,
    fngdgt_post_font_family VARCHAR(80) NOT NULL DEFAULT 'Inter, sans-serif',
    fngdgt_post_font_size VARCHAR(24) NOT NULL DEFAULT '1.08rem',
    fngdgt_post_font_color VARCHAR(32) NOT NULL DEFAULT 'inherit',
    fngdgt_post_text_align VARCHAR(24) NOT NULL DEFAULT 'left',
    fngdgt_post_tags TEXT[] NOT NULL DEFAULT '{}',
    fngdgt_published_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fngdgt_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX fngdgt_idx_posts_category ON fngdgt_blog_posts(fngdgt_post_category);
CREATE INDEX fngdgt_idx_posts_era ON fngdgt_blog_posts(fngdgt_post_era_slug);
CREATE INDEX fngdgt_idx_posts_published ON fngdgt_blog_posts(fngdgt_published_at DESC);

CREATE TRIGGER fngdgt_trg_blog_posts_updated
BEFORE UPDATE ON fngdgt_blog_posts
FOR EACH ROW EXECUTE FUNCTION fngdgt_fn_touch_updated_at();

-- ----------------------------------------------------------------------------
-- 6. TABLE: fngdgt_quick_reads (Bite-Sized Symposium & Lab Dispatches)
-- ----------------------------------------------------------------------------
CREATE TABLE fngdgt_quick_reads (
    fngdgt_qr_id SERIAL PRIMARY KEY,
    fngdgt_qr_title VARCHAR(220) NOT NULL,
    fngdgt_qr_summary TEXT NOT NULL,
    fngdgt_qr_category VARCHAR(64) NOT NULL,
    fngdgt_qr_era_slug VARCHAR(64) NOT NULL,
    fngdgt_qr_read_time VARCHAR(32) NOT NULL DEFAULT '45 sec read',
    fngdgt_qr_badge VARCHAR(64) NOT NULL DEFAULT 'Lab Dispatch',
    fngdgt_qr_published_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 7. TABLE: fngdgt_contact_details (Newsroom & Symposium Desk Contact Info)
-- ----------------------------------------------------------------------------
CREATE TABLE fngdgt_contact_details (
    fngdgt_contact_id INTEGER PRIMARY KEY DEFAULT 1 CHECK (fngdgt_contact_id = 1),
    fngdgt_newsroom_email VARCHAR(160) NOT NULL,
    fngdgt_press_email VARCHAR(160) NOT NULL,
    fngdgt_secure_tip_line VARCHAR(160) NOT NULL,
    fngdgt_hq_location VARCHAR(240) NOT NULL,
    fngdgt_phone_number VARCHAR(64) NOT NULL,
    fngdgt_office_hours VARCHAR(160) NOT NULL,
    fngdgt_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER fngdgt_trg_contact_details_updated
BEFORE UPDATE ON fngdgt_contact_details
FOR EACH ROW EXECUTE FUNCTION fngdgt_fn_touch_updated_at();

-- ----------------------------------------------------------------------------
-- 8. TABLE: fngdgt_comments (Reader Discussions on Articles)
-- ----------------------------------------------------------------------------
CREATE TABLE fngdgt_comments (
    fngdgt_comment_id SERIAL PRIMARY KEY,
    fngdgt_post_id INTEGER NOT NULL REFERENCES fngdgt_blog_posts(fngdgt_post_id) ON DELETE CASCADE,
    fngdgt_reader_name VARCHAR(120) NOT NULL,
    fngdgt_reader_Text TEXT NOT NULL,
    fngdgt_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 9. TABLE: fngdgt_audit_logs (Persistent Admin & System Change History)
-- ----------------------------------------------------------------------------
CREATE TABLE fngdgt_audit_logs (
    fngdgt_log_id SERIAL PRIMARY KEY,
    fngdgt_log_actor VARCHAR(80) NOT NULL DEFAULT 'admin',
    fngdgt_log_action VARCHAR(80) NOT NULL,
    fngdgt_log_entity VARCHAR(80) NOT NULL,
    fngdgt_log_description TEXT NOT NULL,
    fngdgt_log_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 10. VIEWS (Prefixed with fngdgt_vw_)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW fngdgt_vw_published_feed AS
SELECT
    p.fngdgt_post_id,
    p.fngdgt_post_slug,
    p.fngdgt_post_title,
    p.fngdgt_post_subtitle,
    p.fngdgt_post_category,
    p.fngdgt_post_era_slug,
    e.fngdgt_era_name,
    e.fngdgt_era_years,
    e.fngdgt_era_primary_accent,
    p.fngdgt_post_author_name,
    p.fngdgt_post_author_role,
    p.fngdgt_post_cover_image,
    p.fngdgt_post_excerpt,
    p.fngdgt_post_is_gizmo,
    p.fngdgt_post_is_featured,
    p.fngdgt_post_review_score,
    p.fngdgt_post_word_count,
    p.fngdgt_post_char_count,
    p.fngdgt_post_read_minutes,
    p.fngdgt_post_views,
    p.fngdgt_post_likes,
    p.fngdgt_published_at
FROM fngdgt_blog_posts p
LEFT JOIN fngdgt_tech_eras e ON p.fngdgt_post_era_slug = e.fngdgt_era_slug
ORDER BY p.fngdgt_published_at DESC;

CREATE OR REPLACE VIEW fngdgt_vw_era_summary AS
SELECT
    e.fngdgt_era_slug,
    e.fngdgt_era_name,
    e.fngdgt_era_years,
    e.fngdgt_era_is_active,
    COUNT(p.fngdgt_post_id) AS fngdgt_total_posts,
    COALESCE(SUM(p.fngdgt_post_views), 0) AS fngdgt_total_views
FROM fngdgt_tech_eras e
LEFT JOIN fngdgt_blog_posts p ON e.fngdgt_era_slug = p.fngdgt_post_era_slug
GROUP BY e.fngdgt_era_id, e.fngdgt_era_slug, e.fngdgt_era_name, e.fngdgt_era_years, e.fngdgt_era_is_active
ORDER BY e.fngdgt_era_id ASC;

CREATE OR REPLACE VIEW fngdgt_vw_recent_audit_trail AS
SELECT
    fngdgt_log_id,
    fngdgt_log_actor,
    fngdgt_log_action,
    fngdgt_log_entity,
    fngdgt_log_description,
    fngdgt_log_created_at
FROM fngdgt_audit_logs
ORDER BY fngdgt_log_created_at DESC
LIMIT 100;

-- ----------------------------------------------------------------------------
-- 11. SEED INITIAL DATA FOR ALL 8 TECHNOLOGY ERAS
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_tech_eras (
    fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years,
    fngdgt_era_banner_title, fngdgt_era_banner_subtitle,
    fngdgt_era_banner_image, fngdgt_era_primary_accent, fngdgt_era_secondary_accent,
    fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
) VALUES
(
    'industrial-revolution',
    'Industrial & Mechanical Computing Era',
    '1760 – 1946',
    'Steam, Brass Gears & Babbage Analytical Looms',
    'From Jacquard punched-card looms and thermodynamic engines to precision clockwork differential analyzers.',
    'assets/gizmo_industrial_mural.jpg',
    '#D97706', '#F59E0B', '#1C140D',
    'Brass Jacquard mechanisms meeting precision gizmo symmetry in early deterministic automata.',
    FALSE
),
(
    'transistor-era',
    'Solid-State Transistor Revolution',
    '1947 – 1958',
    'Bell Labs Point-Contact & Junction Transistors',
    'Replacing fragile vacuum tubes with doped germanium and silicon crystals that amplified modern civilization.',
    'assets/silicon_wafer.jpg',
    '#10B981', '#34D399', '#091914',
    'Solid-state semiconductor junctions awakening low-power logic gates.',
    FALSE
),
(
    'silicon-chips',
    'Planar Silicon Wafer Era',
    '1959 – 1970',
    'Photolithography & Pure Czochralski Silicon Boules',
    'Etching light onto crystalline silicon ingots to birth Silicon Valley and space-grade guidance computers.',
    'assets/silicon_wafer.jpg',
    '#06B6D4', '#22D3EE', '#07171E',
    'Nanometer photolithography interference patterns across mono-crystalline wafers.',
    FALSE
),
(
    'integrated-circuits',
    'VLSI & Microprocessor Integrated Circuits',
    '1971 – 2006',
    'Billions of Gates on a fingernail: Moore''s Law in Full Stride',
    'From the 4004 microprocessor to multi-core superscalar architectures and high-NA EUV lithography.',
    'assets/silicon_wafer.jpg',
    '#3B82F6', '#60A5FA', '#0A1324',
    'Multi-layer copper and optical interconnects powering global computing fabric.',
    FALSE
),
(
    'apple-personal-tech',
    'Personal, Mobile & Spatial Computing Era',
    '1976 – Present',
    'Human-Centric Industrial Design & Unified Silicon Ecosystems',
    'Precision milled aluminum, Retina micro-OLED optics, neural engines, and spatial computing interfaces.',
    'assets/apple_spatial.jpg',
    '#A855F7', '#C084FC', '#150D24',
    'Minimalist anodized hardware studio where industrial design disappears into pure experience.',
    FALSE
),
(
    'space-technology',
    'Orbital, Deep-Space & Interplanetary Tech',
    '1957 – Beyond',
    'Reusable Heavy Boosters, Ion Thrusters & Lunar Optical Mesh',
    'Autonomous orbital stations, laser satellite constellations, and radiation-hardened deep-space probes.',
    'assets/space_station.jpg',
    '#38BDF8', '#818CF8', '#071021',
    'Orbital solar-electric arrays suspended above Earth''s atmospheric horizon.',
    FALSE
),
(
    'artificial-intelligence',
    'Frontier Neural Architectures & Agentic AI',
    '2012 – Present',
    'Exascale Photonic Clusters, Multimodal Reasoning & Synthetic Symposia',
    'Transformer attention fabrics, neuromorphic inference chips, and sovereign scientific co-pilots.',
    'assets/summit_laser.jpg',
    '#EC4899', '#F472B6', '#1F0B18',
    'Global AI & laser symposium auditorium illuminating high-dimensional latent geometry.',
    FALSE
),
(
    'quantum-subatomic',
    'Quantum Computing & Subatomic Physics Era',
    '2020 – Horizon',
    'Cryogenic Dilution Chandeliers, Topological Qubits & Subatomic Colliders',
    'Harnessing superposition, entanglement, and Akasha-level field symmetries to solve intractable cosmos models.',
    'assets/quantum_subatomic.jpg',
    '#059669', '#D97706', '#ECFDF5',
    'Golden dilution cryostat surrounded by subatomic wave-particle interference rings.',
    TRUE
);

-- ----------------------------------------------------------------------------
-- 12. SEED GLOBAL SITE SETTINGS & CONTACT DETAILS
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_site_settings (
    fngdgt_setting_id, fngdgt_site_title, fngdgt_site_tagline,
    fngdgt_active_language, fngdgt_active_era_slug, fngdgt_color_mode,
    fngdgt_breaking_ribbon, fngdgt_show_era_banner
) VALUES (
    1,
    'Fingadget',
    'The Definitive Frontier of Consumer Hardware, Deep Science & Gizmo Cybernetics',
    'en',
    'quantum-subatomic',
    'light',
    'GLOBAL SYMPOSIUM DISPATCH: Sub-Angstrom Photonic Interconnects & Fault-Tolerant Logical Qubits Unveiled at Geneva Laser Summit',
    TRUE
);

INSERT INTO fngdgt_contact_details (
    fngdgt_contact_id, fngdgt_newsroom_email, fngdgt_press_email,
    fngdgt_secure_tip_line, fngdgt_hq_location, fngdgt_phone_number, fngdgt_office_hours
) VALUES (
    1,
    'editorial@fingadget.tech',
    'symposium-press@fingadget.tech',
    'Signal / Keybase: +1 (415) 890-FNGD',
    'Fingadget Global Media Tower, Sector V Salt Lake & San Francisco Pier 27',
    '+1 (415) 890-3643 / +91 33 4092 8810',
    '24/7 Global Newsroom • Live Symposium Coverage Desk'
);

-- ----------------------------------------------------------------------------
-- 13. SEED QUICK READS
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_quick_reads (
    fngdgt_qr_title, fngdgt_qr_summary, fngdgt_qr_category,
    fngdgt_qr_era_slug, fngdgt_qr_read_time, fngdgt_qr_badge
) VALUES
(
    'CERN & Zurich Quantum Symposium Unveils Coherent Photon-Bus Link Across 40 Meters',
    'Cryogenic waveguide bridges two dilution refrigerators with 99.94% entanglement fidelity, paving the path for modular quantum datacenters.',
    'Quantum & Subatomic',
    'quantum-subatomic',
    '45 sec read',
    'Symposium Live'
),
(
    'Apple M5 Ultra Studio Reference Board Benchmarked with Dual-Sided Optical Interposer',
    'Leaked thermal imaging from Cupertino''s hardware lab reveals 1.2 TB/s unified memory bandwidth with silent vapor-chamber cooling.',
    'Apple & Personal Tech',
    'apple-personal-tech',
    '1 min read',
    'Hardware Lab'
),
(
    'High-NA EUV Lithography Hits 1.4nm Gate-All-Around RibbonFET Yield Milestone',
    'Backside power delivery combined with ruthenium interconnects cuts parasitic capacitance by 28% in next-gen wafer runs.',
    'Silicon & ICs',
    'integrated-circuits',
    '50 sec read',
    'Foundry Brief'
),
(
    'Lunar South Pole Laser Relay Sustains 200 Gbps Downlink Through Atmospheric Turbulence',
    'Adaptive deformable mirrors at the Atacama optical ground station lock onto orbital phase arrays without packet drops.',
    'Space Tech',
    'space-technology',
    '40 sec read',
    'Orbital Telemetry'
),
(
    'Modular Open-Source Handheld Gizmo Packs Hot-Swappable FPGA & Neural Cartridges',
    'Hardware hackers unveil a pocket-sized CNC-machined magnesium gizmo capable of emulating vintage silicon and running local edge models.',
    'Gizmo Engineering',
    'artificial-intelligence',
    '1 min read',
    'Gizmo Monograph'
);

-- ----------------------------------------------------------------------------
-- 14. SEED INITIAL AUDIT LOG
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_audit_logs (
    fngdgt_log_actor, fngdgt_log_action, fngdgt_log_entity, fngdgt_log_description
) VALUES
('system', 'SCHEMA_INIT', 'fngdgt_database', 'Initialized all fngdgt_ tables, views, triggers, 8 technology eras, and editorial seed data.');


-- ----------------------------------------------------------------------------
-- 15. SEED FULL EDITORIAL & LONG-FORM GIZMO BLOG POSTS
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_blog_posts (
    fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
    fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
    fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
    fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
    fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
    fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
    fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_text_align,
    fngdgt_post_tags
) VALUES
(
    'geneva-cryo-photonic-quantum-laser-summit',
    'Inside Geneva''s Cryo-Photonic Laser Summit: How 4,096 Logical Qubits Crossed the Fault-Tolerant Horizon',
    'At the annual European Subatomic & Quantum Symposium, topological braiding and femtosecond optical tweezers turned theoretical error correction into working silicon-nitride hardware.',
    'Quantum & Subatomic',
    'quantum-subatomic',
    'Dr. Aris Thorne',
    'Chief Physics & Hardware Editor',
    'assets/quantum_subatomic.jpg',
    'Beneath a canopy of cyan and violet calibration lasers in Geneva, researchers demonstrated a fault-tolerant 4,096-logical-qubit processor running continuous surface-code syndrome extraction at 12 millikelvin.',
    '<p>When the main auditorium lights dimmed at the Geneva Palexpo Laser & Subatomic Symposium this morning, the centerpiece on stage was a three-meter tall dilution refrigerator pulsing with phase-locked cyan optical fibers.</p><h2>Breaking the Physical-to-Logical Qubit Bottleneck</h2><p>By combining isotopically purified silicon-28 spin qubits with on-chip photonic waveguides, the Geneva consortium compressed physical-to-logical overhead to a 12:1 ratio with 180ns real-time syndrome decoding.</p>',
    FALSE, TRUE, 9.8, 640, 4120, 6, 18420, 1290,
    'Inter, sans-serif', '1.08rem', 'left',
    ARRAY['Quantum Computing', 'Subatomic Physics', 'Cryogenics', 'Symposium']
),
(
    'gizmo-cybernetics-modular-solid-state-hardware-architecture',
    'The Anatomy of Next-Gen Modular Gizmos: Solid-State Micro-Actuators, Piezo Haptics & Self-Healing Chassis Design',
    'An extensive, multi-chapter hardware teardown and engineering treatise exploring how precision micro-electromechanical gizmos are replacing monolithic consumer electronics.',
    'Gizmo Engineering',
    'quantum-subatomic',
    'Dr. Viktor Sterling & Maya Krishnan',
    'Chairs of Gizmo Architecture & Precision Mechatronics',
    'assets/gizmo_industrial_mural.jpg',
    'From magnetic pogo-pin interconnect buses and ultrasonic piezoelectric haptic arrays to liquid-metal thermal interfaces, modern flagship gizmos have evolved into marvels of repairable, field-upgradable micro-engineering.',
    '<div class="gizmo-verse"><strong>⚙️ GIZMO LAB TELEMETRY SPEC // REV 4.8-OMEGA</strong></div><h2>Chapter I: The Renaissance of Tactile, Field-Upgradable Gizmos</h2><p>By pairing CNC-milled aerospace magnesium-lithium frames with captive Torx fasteners and gold-plated pogo buses, modern gizmos celebrate mechanical transparency without sacrificing IP68 sealing.</p><h2>Chapter II: Piezoelectric Ceramic Actuators</h2><p>Multi-layer co-fired piezoelectric ceramic stacks bonded to a titanium flexure suspension simulate crisp mechanical detents within 0.4 milliseconds.</p><h2>Chapter III: Optical Backplanes & Solid-State Cooling</h2><p>Expanded-Beam Optical couplers sustain 80 Gbps bi-directional throughput across a 1.8mm air gap while MEMS ultrasonic micro-blowers regulate thermal loads.</p>',
    TRUE, TRUE, 9.9, 1420, 9480, 14, 24680, 2150,
    'Merriweather, serif', '1.12rem', 'justify',
    ARRAY['Gizmo Engineering', 'Modular Hardware', 'Teardown', 'Mechatronics', 'Long-Form']
),
(
    'cupertino-titanium-micro-oled-m5-spatial-studio',
    'Cupertino''s Titanium & Micro-OLED Masterclass: Six Months Living Inside the M5 Spatial Studio Ecosystem',
    'Our long-term hardware teardown and daily workflow verdict on unified optical-interposer laptops, binocular 8K spatial visors, and zero-latency neural haptics.',
    'Apple & Personal Tech',
    'apple-personal-tech',
    'Maya Lin-Vance',
    'Executive Hardware Reviewer',
    'assets/apple_spatial.jpg',
    'We put the latest anodized titanium workstation and second-generation spatial computing headset through 180 days of 3D CAD rendering, local 70B LLM compilation, and color-critical HDR mastering.',
    '<p>Over the past six months in the Fingadget Hardware Lab, we replaced our multi-monitor desktop rigs with the anodized slate-titanium portable workstation paired with its dual-8K micro-OLED spatial visor.</p>',
    FALSE, TRUE, 9.5, 580, 3790, 5, 15890, 1120,
    'Inter, sans-serif', '1.08rem', 'left',
    ARRAY['Apple Tech', 'Spatial Computing', 'Hardware Review', 'Micro-OLED']
),
(
    'open-silicon-risc-v-pocket-gizmos-edge-neural-workstations',
    'From Pocket Logic Analyzers to Sovereign Neural Gizmos: Inside the Open-Silicon Handheld Revolution',
    'A comprehensive engineering monograph on how open-source RISC-V cores, e-ink hybrid displays, and ultra-low-power NPU co-processors are powering autonomous field gizmos.',
    'Gizmo Engineering',
    'artificial-intelligence',
    'Prof. Siddharth Chatterjee & Dr. Ananya Bose',
    'Lead Systems Architects, Open-Silicon Gizmo Lab',
    'assets/gizmo_industrial_mural.jpg',
    'A new breed of pocketable engineering gizmos combines sunlight-readable transflective displays, tactile mechanical thumb-keyboards, software-defined radio transceivers, and 45-TOPS edge neural engines that run completely offline.',
    '<div class="gizmo-verse"><strong>⚙️ OPEN-SILICON GIZMO ARCHITECTURE // RISC-V VECTOR SPEC V2.0</strong></div><h2>Chapter I: Why Dedicated Field Gizmos Are Outpacing Smartphones</h2><p>Dedicated cyber-deck gizmos expose 24-channel 500MHz logic analyzers, sub-GHz to 6GHz software-defined radios, and isolated RS-485 diagnostic ports on the top bulkhead.</p><h2>Chapter II: 64-Bit RISC-V Vector Clusters & Edge NPUs</h2><p>Integrating stacked LPDDR6 memory atop a 45-TOPS sparse-matrix NPU allows pocket gizmos to execute 32B technical models completely offline.</p>',
    TRUE, FALSE, 9.9, 1310, 8920, 13, 21340, 1940,
    'Merriweather, serif', '1.12rem', 'justify',
    ARRAY['Gizmo Engineering', 'RISC-V', 'Handheld Hardware', 'Edge AI', 'Long-Form']
);

COMMIT;
