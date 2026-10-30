-- ============================================================================
-- FINGADGET PLATFORM - COMPLETE NEONDB POSTGRESQL SCHEMA, VIEWS & SEED SCRIPT
-- All database objects strictly use the 'fngdgt_' prefix to guarantee zero
-- collision with pre-existing tables, views, functions, or variables.
-- Includes full cleanup of pre-existing 'fngdgt_' objects and seeds all 8
-- technology eras, 8 full blog posts, 5 quick-reads, settings, and contacts.
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
    fngdgt_era_mural_caption VARCHAR(240) NOT NULL DEFAULT '',
    fngdgt_era_is_active BOOLEAN NOT NULL DEFAULT FALSE,
    fngdgt_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 4. TABLE: fngdgt_site_settings (Global Platform State, Language & Theme)
-- ----------------------------------------------------------------------------
CREATE TABLE fngdgt_site_settings (
    fngdgt_setting_id INTEGER PRIMARY KEY DEFAULT 1 CHECK (fngdgt_setting_id = 1),
    fngdgt_site_title VARCHAR(120) NOT NULL DEFAULT 'Fingadget',
    fngdgt_site_tagline VARCHAR(240) NOT NULL DEFAULT 'The Definitive Frontier of Consumer Hardware, Deep Science & Gizmo Engineering',
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
    fngdgt_reader_text TEXT NOT NULL,
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
-- 11. SEED ALL 8 TECHNOLOGY ERAS
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_tech_eras (
    fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years,
    fngdgt_era_banner_title, fngdgt_era_banner_subtitle,
    fngdgt_era_banner_image, fngdgt_era_primary_accent, fngdgt_era_secondary_accent,
    fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
) VALUES (
    'industrial-revolution', 'Industrial & Mechanical Computing Era', '1760 – 1946',
    'Steam, Brass Gears & Babbage Analytical Looms', 'From Jacquard punched-card looms and thermodynamic engines to precision clockwork differential analyzers.',
    'assets/gizmo_industrial_mural.jpg', '#B45309', '#059669',
    '#FEFCE8', 'Brass Jacquard mechanisms meeting precision gizmo symmetry in early deterministic automata.', FALSE
);
INSERT INTO fngdgt_tech_eras (
    fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years,
    fngdgt_era_banner_title, fngdgt_era_banner_subtitle,
    fngdgt_era_banner_image, fngdgt_era_primary_accent, fngdgt_era_secondary_accent,
    fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
) VALUES (
    'transistor-era', 'Solid-State Transistor Revolution', '1947 – 1958',
    'Bell Labs Point-Contact & Junction Transistors', 'Replacing fragile vacuum tubes with doped germanium and silicon crystals that amplified modern civilization.',
    'assets/silicon_wafer.jpg', '#059669', '#D97706',
    '#ECFDF5', 'Solid-state semiconductor junctions awakening low-power logic gates.', FALSE
);
INSERT INTO fngdgt_tech_eras (
    fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years,
    fngdgt_era_banner_title, fngdgt_era_banner_subtitle,
    fngdgt_era_banner_image, fngdgt_era_primary_accent, fngdgt_era_secondary_accent,
    fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
) VALUES (
    'silicon-chips', 'Planar Silicon Wafer Era', '1959 – 1970',
    'Photolithography & Pure Czochralski Silicon Boules', 'Etching light onto crystalline silicon ingots to birth Silicon Valley and Apollo guidance computers.',
    'assets/silicon_wafer.jpg', '#0D9488', '#CA8A04',
    '#F0FDFA', 'Nanometer photolithography interference patterns across mono-crystalline wafers.', FALSE
);
INSERT INTO fngdgt_tech_eras (
    fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years,
    fngdgt_era_banner_title, fngdgt_era_banner_subtitle,
    fngdgt_era_banner_image, fngdgt_era_primary_accent, fngdgt_era_secondary_accent,
    fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
) VALUES (
    'integrated-circuits', 'VLSI & Microprocessor Integrated Circuits', '1971 – 2006',
    'Billions of Gates on a Fingernail: Moore’s Law in Full Stride', 'From early 4-bit microprocessors to superscalar architectures and extreme ultraviolet lithography.',
    'assets/silicon_wafer.jpg', '#047857', '#EAB308',
    '#F0FDF4', 'Multi-layer copper and optical interconnects powering the planetary computing fabric.', FALSE
);
INSERT INTO fngdgt_tech_eras (
    fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years,
    fngdgt_era_banner_title, fngdgt_era_banner_subtitle,
    fngdgt_era_banner_image, fngdgt_era_primary_accent, fngdgt_era_secondary_accent,
    fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
) VALUES (
    'apple-personal-tech', 'Personal, Mobile & Spatial Computing Era', '1976 – Present',
    'Human-Centric Industrial Design & Unified Silicon Ecosystems', 'Precision milled aluminum, micro-OLED spatial optics, neural engines, and tactile craftsmanship.',
    'assets/apple_spatial.jpg', '#15803D', '#D97706',
    '#F8FAFC', 'Minimalist anodized hardware studio where industrial design disappears into pure experience.', FALSE
);
INSERT INTO fngdgt_tech_eras (
    fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years,
    fngdgt_era_banner_title, fngdgt_era_banner_subtitle,
    fngdgt_era_banner_image, fngdgt_era_primary_accent, fngdgt_era_secondary_accent,
    fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
) VALUES (
    'space-technology', 'Orbital, Deep-Space & Interplanetary Tech', '1957 – Beyond',
    'Reusable Heavy Boosters, Ion Thrusters & Lunar Optical Mesh', 'Autonomous orbital stations, laser satellite constellations, and radiation-hardened deep-space probes.',
    'assets/space_station.jpg', '#0F766E', '#D97706',
    '#F0FDFA', 'Orbital solar-electric arrays suspended above Earth’s glowing atmospheric curvature.', FALSE
);
INSERT INTO fngdgt_tech_eras (
    fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years,
    fngdgt_era_banner_title, fngdgt_era_banner_subtitle,
    fngdgt_era_banner_image, fngdgt_era_primary_accent, fngdgt_era_secondary_accent,
    fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
) VALUES (
    'artificial-intelligence', 'Frontier Neural Architectures & Agentic AI', '2012 – Present',
    'Exascale Photonic Clusters, Multimodal Reasoning & Synthetic Symposia', 'Transformer attention fabrics, neuromorphic inference chips, and sovereign scientific co-pilots.',
    'assets/summit_laser.jpg', '#059669', '#B45309',
    '#FEFCE8', 'Global AI & laser symposium auditorium illuminating high-dimensional latent geometry.', FALSE
);
INSERT INTO fngdgt_tech_eras (
    fngdgt_era_slug, fngdgt_era_name, fngdgt_era_years,
    fngdgt_era_banner_title, fngdgt_era_banner_subtitle,
    fngdgt_era_banner_image, fngdgt_era_primary_accent, fngdgt_era_secondary_accent,
    fngdgt_era_bg_tint, fngdgt_era_mural_caption, fngdgt_era_is_active
) VALUES (
    'quantum-subatomic', 'Quantum Computing & Subatomic Physics Era', '2020 – Horizon',
    'Cryogenic Dilution Chandeliers, Topological Qubits & Subatomic Colliders', 'Harnessing superposition, entanglement, and Akasha-level field symmetries to solve intractable cosmos models.',
    'assets/quantum_subatomic.jpg', '#059669', '#D97706',
    '#ECFDF5', 'Golden dilution cryostat surrounded by subatomic wave-particle interference rings.', TRUE
);

-- ----------------------------------------------------------------------------
-- 12. SEED GLOBAL SITE SETTINGS & CONTACT DETAILS
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_site_settings (
    fngdgt_setting_id, fngdgt_site_title, fngdgt_site_tagline,
    fngdgt_active_language, fngdgt_active_era_slug, fngdgt_color_mode,
    fngdgt_breaking_ribbon, fngdgt_show_era_banner
) VALUES (
    1, 'Fingadget', 'The Definitive Frontier of Consumer Hardware, Deep Science & Gizmo Cybernetics',
    'en', 'quantum-subatomic', 'light',
    'GLOBAL SYMPOSIUM DISPATCH: Sub-Angstrom Photonic Interconnects & Fault-Tolerant Logical Qubits Unveiled at Geneva Laser Summit', TRUE
);

INSERT INTO fngdgt_contact_details (
    fngdgt_contact_id, fngdgt_newsroom_email, fngdgt_press_email,
    fngdgt_secure_tip_line, fngdgt_hq_location, fngdgt_phone_number, fngdgt_office_hours
) VALUES (
    1, 'editorial@fingadget.tech', 'symposium-press@fingadget.tech',
    'Signal / Keybase: +1 (415) 890-FNGD', 'Fingadget Global Media Tower • Sector V Salt Lake, Kolkata & Pier 27, San Francisco', '+1 (415) 890-3643 • +91 33 4092 8810', '24/7 Global Newsroom • Live Symposium Coverage Desk'
);

-- ----------------------------------------------------------------------------
-- 13. SEED ALL 5 QUICK READS
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_quick_reads (
    fngdgt_qr_id, fngdgt_qr_title, fngdgt_qr_summary, fngdgt_qr_category,
    fngdgt_qr_era_slug, fngdgt_qr_read_time, fngdgt_qr_badge
) VALUES (
    101, 'CERN & Zurich Quantum Symposium Unveils Coherent Photon-Bus Link Across 40 Meters', 'Cryogenic waveguide bridges two dilution refrigerators with 99.94% entanglement fidelity, paving the path for modular quantum supercomputing centers.', 'Quantum & Subatomic',
    'quantum-subatomic', '45 sec read', 'Symposium Live'
);
INSERT INTO fngdgt_quick_reads (
    fngdgt_qr_id, fngdgt_qr_title, fngdgt_qr_summary, fngdgt_qr_category,
    fngdgt_qr_era_slug, fngdgt_qr_read_time, fngdgt_qr_badge
) VALUES (
    102, 'Apple M5 Ultra Studio Reference Board Benchmarked with Dual-Sided Optical Interposer', 'Thermal imaging from Cupertino’s hardware studio reveals 1.2 TB/s unified memory bandwidth with whisper-quiet vapor-chamber dissipation.', 'Apple & Personal Tech',
    'apple-personal-tech', '1 min read', 'Hardware Lab'
);
INSERT INTO fngdgt_quick_reads (
    fngdgt_qr_id, fngdgt_qr_title, fngdgt_qr_summary, fngdgt_qr_category,
    fngdgt_qr_era_slug, fngdgt_qr_read_time, fngdgt_qr_badge
) VALUES (
    103, 'High-NA EUV Lithography Hits 1.4nm Gate-All-Around RibbonFET Yield Milestone', 'Backside power delivery combined with ruthenium interconnects cuts parasitic capacitance by 28% in next-generation wafer runs.', 'Silicon & ICs',
    'integrated-circuits', '50 sec read', 'Foundry Brief'
);
INSERT INTO fngdgt_quick_reads (
    fngdgt_qr_id, fngdgt_qr_title, fngdgt_qr_summary, fngdgt_qr_category,
    fngdgt_qr_era_slug, fngdgt_qr_read_time, fngdgt_qr_badge
) VALUES (
    104, 'Lunar South Pole Laser Relay Sustains 200 Gbps Downlink Through Atmospheric Turbulence', 'Adaptive deformable mirrors at the Atacama optical ground station lock onto orbital phase arrays with zero packet loss.', 'Space Tech',
    'space-technology', '40 sec read', 'Orbital Telemetry'
);
INSERT INTO fngdgt_quick_reads (
    fngdgt_qr_id, fngdgt_qr_title, fngdgt_qr_summary, fngdgt_qr_category,
    fngdgt_qr_era_slug, fngdgt_qr_read_time, fngdgt_qr_badge
) VALUES (
    105, 'Modular Open-Source Handheld Gizmo Packs Hot-Swappable FPGA & Neural Cartridges', 'Hardware hackers unveil a pocket-sized CNC-machined magnesium gizmo capable of emulating vintage silicon and running local edge models.', 'Gizmo Engineering',
    'artificial-intelligence', '1 min read', 'Gizmo Monograph'
);

-- ----------------------------------------------------------------------------
-- 14. SEED ALL 8 PRE-EXISTING BLOG POSTS (INCLUDING LONG-FORM GIZMO POSTS)
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_blog_posts (
    fngdgt_post_id, fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
    fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
    fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
    fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
    fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
    fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
    fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
    fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title, fngdgt_published_at
) VALUES (
    1, 'geneva-cryo-photonic-quantum-laser-summit', 'Inside Geneva’s Cryo-Photonic Laser Summit: How 4,096 Logical Qubits Crossed the Fault-Tolerant Horizon', 'At the annual European Subatomic & Quantum Symposium, topological braiding and femtosecond optical tweezers turned theoretical error correction into working silicon-nitride hardware.',
    'Quantum & Subatomic', 'quantum-subatomic', 'Dr. Aris Thorne',
    'Chief Physics & Hardware Editor', 'assets/quantum_subatomic.jpg', 'Beneath a canopy of cyan and violet calibration lasers in Geneva, researchers demonstrated a fault-tolerant 4,096-logical-qubit processor running continuous surface-code syndrome extraction at 12 millikelvin.',
    '
        <p>When the main auditorium lights dimmed at the Geneva Palexpo Laser & Subatomic Symposium this morning, the centerpiece on stage was neither a consumer smartphone nor a conventional supercomputer rack. Suspended inside a three-meter tall borosilicate vacuum vessel gleamed a multi-tiered gold-plated dilution refrigerator—pulsing with phase-locked cyan optical fibers that carried microwave-to-optical entanglement bridges across the stage.</p>
        <h2>Breaking the Physical-to-Logical Qubit Bottleneck</h2>
        <p>For three decades, quantum engineers have wrestled with decoherence: the slightest thermal phonon or stray electromagnetic ripple collapses delicate superpositions before deep circuits can finish executing. Until this year, achieving a single high-fidelity logical qubit required upwards of a thousand noisy physical transmons. By combining <strong>isotopically purified silicon-28 spin qubits</strong> with on-chip photonic waveguides, the Geneva consortium compressed that overhead to a 12:1 ratio.</p>
        <blockquote>"We are no longer babysitting individual wavefunctions in isolation. With photonic low-loss interconnects operating at 15 millikelvin, separate cryostats behave as a single phase-coherent subatomic fabric." — Prof. Elena Rostova, Keynote Chair at the Geneva Quantum Symposium.</blockquote>
        <h3>Key Architectural Breakthroughs</h3>
        <p>First, cryo-CMOS control multiplexers sit directly on the 4-Kelvin stage, eliminating thousands of bulky coaxial cables. Second, real-time syndrome decoding runs on dedicated ultra-low-latency FPGA fabrics that correct bit-flip and phase-flip errors within 180 nanoseconds—well inside the 4.2-millisecond coherence window of the underlying spin lattice.</p>
        <p>For materials scientists and theoretical physicists, the implications are immediate: simulating high-temperature superconducting cuprates, nitrogen-fixation catalytic pathways, and non-perturbative lattice chromodynamics is shifting from century-long extrapolations to overnight batch runs.</p>
      ', FALSE, TRUE,
    9.8, 640, 4120,
    6, 18420, 1290,
    'Inter, sans-serif', '1.08rem', 'inherit',
    'left', ARRAY['Quantum Computing', 'Subatomic Physics', 'Cryogenics', 'Symposium']::TEXT[], '{"bn": "জেনেভার ক্রায়ো-ফোটোনিক লেজার সামিট: কীভাবে ৪,০৯৬ লজিক্যাল কিউবিট ফল্ট-টলারেন্ট দিগন্ত অতিক্রম করল", "hi": "जिनेवा क्रायो-फोटोनिक लेज़र शिखर सम्मेलन: कैसे 4,096 लॉजिकल क्यूबिट्स ने दोष-सहिष्णु सीमा पार की", "fr": "Au cœur du Sommet Laser Cryo-Photonique de Genève : 4 096 Qubits Logiques", "es": "Cumbre Láser Crio-Fotónica de Ginebra: 4.096 Qubits Lógicos Tolerantes a Fallos", "de": "Genfer Kryo-Photonik-Lasergipfel: 4.096 logische Qubits knacken die Fehlertoleranz", "zh": "日内瓦低温光子激光峰会直击：4096个逻辑量子比特如何跨越容错边界", "ja": "ジュネーブ極低温フォトニック・レーザーサミット：4,096論理量子ビットの衝撃", "ru": "Женевский крио-фотонный лазерный саммит: 4096 логических кубитов"}'::JSONB, '2026-10-30T14:20:00Z'
);
INSERT INTO fngdgt_blog_posts (
    fngdgt_post_id, fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
    fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
    fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
    fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
    fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
    fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
    fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
    fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title, fngdgt_published_at
) VALUES (
    2, 'gizmo-cybernetics-modular-solid-state-hardware-architecture', 'The Anatomy of Next-Gen Modular Gizmos: Solid-State Micro-Actuators, Piezo Haptics & Self-Healing Chassis Design', 'An extensive, multi-chapter hardware teardown and engineering treatise exploring how precision micro-electromechanical gizmos are replacing monolithic consumer electronics.',
    'Gizmo Engineering', 'quantum-subatomic', 'Dr. Viktor Sterling & Maya Krishnan',
    'Chairs of Gizmo Architecture & Precision Mechatronics', 'assets/modular_gizmo.jpg', 'From magnetic pogo-pin interconnect buses and ultrasonic piezoelectric haptic arrays to liquid-metal thermal interfaces, modern flagship gizmos have evolved into marvels of repairable, field-upgradable micro-engineering. Here is our complete 5-chapter teardown treatise.',
    '
        <div class="gizmo-verse">
          <strong>⚙️ GIZMO LAB TELEMETRY SPEC // REV 4.8-OMEGA</strong><br/>
          <em>"True hardware longevity emerges when every sensor pod, compute module, optical array, and battery cell communicates across a zero-latency magnetic optical backplane." — Fingadget Gizmo Teardown Manifesto</em>
        </div>

        <h2>Chapter I: The Renaissance of Tactile, Field-Upgradable Gizmos</h2>
        <p>For over a decade, mainstream consumer electronics drifted toward sealed, glued slabs that punished curiosity and rendered minor component upgrades impossible. Yet inside independent hardware foundries in Shenzhen, Zurich, Tokyo, and San Francisco, a quiet revolution has reshaped industrial design: the rise of the <strong>hyper-modular precision gizmo</strong>. By pairing CNC-milled aerospace magnesium-lithium frames with captive Torx fasteners and gold-plated spring-loaded pogo buses, modern gizmos celebrate mechanical transparency without sacrificing IP68 environmental sealing.</p>
        <p>In the Fingadget Gizmo Lab, we spent ninety days stress-testing twelve flagship modular gizmos—ranging from pocketable software-defined radio analyzers and neural audio synthesizers to hot-swappable camera grip compute modules. Across every category, the engineering thesis is unmistakable: modularity is no longer a compromise in thickness or structural rigidity.</p>

        <h2>Chapter II: Piezoelectric Ceramic Actuators and Sub-Millisecond Haptic Realism</h2>
        <p>Touch an ordinary glass touchscreen and your fingertips encounter an inert, frictionless surface. Touch the rotary crown or solid-state trigger bar of a next-generation gizmo and you feel distinct, crisp mechanical detents—even though nothing physically rotates. The secret lies in <strong>multi-layer co-fired piezoelectric ceramic stacks</strong> bonded directly to a titanium flexure suspension.</p>
        <blockquote>"By driving a 140-volt bipolar waveform across a 300-micron lead-zirconate-titanate (PZT) crystal within 0.4 milliseconds, a solid-state gizmo surface can simulate the exact acoustic click of a vintage mechanical camera shutter or a precision micrometer dial."</blockquote>
        <p>During our oscilloscope teardown, we measured localized surface displacement profiles accurate to 2.5 micrometers. Because the piezo actuator consumes power only during the microsecond impulse edge, standby battery drain drops by 64% compared to legacy linear resonant actuators (LRAs).</p>

        <h2>Chapter III: Optical Backplanes and Zero-Pin Magnetic Interconnects</h2>
        <p>Historically, the Achilles heel of modular gadgets was mechanical connector wear: microscopic fretting corrosion on exposed copper pins eventually degraded high-speed PCIe and USB4 lanes. The latest generation of gizmo backplanes eliminates high-speed electrical contacts altogether. While neodymium Halbach magnet arrays align the module within 15 microns and transfer 60 watts of regulated DC power across robust concentric rings, data travels across a <strong>pair of expanded-beam silicon-photonics lenses</strong>.</p>
        <p>Even when submerged in dust or subjected to 40G shock vibrations on a test bench, the Expanded-Beam Optical (EBO) coupler sustained 80 Gbps bi-directional throughput across an air gap of 1.8 millimeters—allowing users to snap thermal-imaging pods, NVMe storage bricks, or discrete GPU accelerators onto the host gizmo chassis on the fly.</p>

        <h2>Chapter IV: Phase-Change Gallium Thermal Chambers & Solid-State Cooling</h2>
        <p>Packing desktop-class neural accelerators into a palm-sized gizmo requires rethinking thermodynamics. Rather than relying on high-RPM centrifugal fans that ingest lint and whine under load, frontier gizmo architects employ <strong>MEMS ultrasonic micro-blowers</strong> paired with encapsulated gallium-indium phase-change reservoirs.</p>
        <p>When burst compute workloads spike past 28 watts, the metallic phase-change lattice absorbs latent heat isothermally at 31.5°C, keeping external chassis skin temperatures comfortable in the hand for extended field deployments.</p>

        <h2>Chapter V: Right-to-Repair Schematics and Open Firmware Longevity</h2>
        <p>Why do long-form gizmo teardowns matter to engineers and everyday enthusiasts alike? Because an instrument you can open, probe with a multimeter, flash with open-source RISC-V firmware, and upgrade five years after purchase transforms you from a passive consumer into an active custodian of technology. Every screw thread, silk-screened test pad, and documented pinout inside a well-crafted gizmo is an invitation to invent.</p>
      ', TRUE, TRUE,
    9.9, 1420, 9480,
    14, 24680, 2150,
    'Merriweather, serif', '1.12rem', 'inherit',
    'justify', ARRAY['Gizmo Engineering', 'Modular Hardware', 'Teardown', 'Mechatronics', 'Long-Form']::TEXT[], '{"bn": "পরবর্তী প্রজন্মের মডুলার গিজমোর ব্যবচ্ছেদ: সলিড-স্টেট অ্যাকচুয়েটর ও হ্যাপটিক ইঞ্জিনিয়ারিং", "hi": "नेक्स्ट-जेन मॉड्यूलर गिज़्मो की आंतरिक संरचना: सॉलिड-स्टेट माइक्रो-एक्चुएटर्स और हैप्टिक इंजीनियरिंग", "fr": "L’Anatomie des Gizmos Modulaires de Nouvelle Génération : Micro-Actionneurs & Haptique", "es": "Anatomía de los Gizmos Modulares de Nueva Generación: Microactuadores de Estado Sólido", "de": "Die Anatomie modularer Next-Gen-Gizmos: Festkörper-Aktuatoren & Präzisionsmechanik", "zh": "下一代模块化极客装置（Gizmo）深度拆解：固态微执行器、压电触觉与自修复机身工程", "ja": "次世代モジュラー・ギズモ（Gizmo）の解剖学：固体マイクロアクチュエータと精密機構設計", "ru": "Анатомия модульных гизмо нового поколения: Твердотельные микроприводы и гаптика"}'::JSONB, '2026-10-29T18:00:00Z'
);
INSERT INTO fngdgt_blog_posts (
    fngdgt_post_id, fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
    fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
    fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
    fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
    fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
    fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
    fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
    fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title, fngdgt_published_at
) VALUES (
    3, 'cupertino-titanium-micro-oled-m5-spatial-studio', 'Cupertino’s Titanium & Micro-OLED Masterclass: Six Months Living Inside the M5 Spatial Studio Ecosystem', 'Our long-term hardware teardown and daily workflow verdict on unified optical-interposer laptops, binocular 8K spatial visors, and zero-latency neural haptics.',
    'Apple & Personal Tech', 'apple-personal-tech', 'Maya Lin-Vance',
    'Executive Hardware Reviewer', 'assets/apple_spatial.jpg', 'We put the latest anodized titanium workstation and second-generation spatial computing headset through 180 days of 3D CAD rendering, local 70B LLM compilation, and color-critical HDR mastering.',
    '
        <p>Industrial design at its highest level is an exercise in subtraction: removing friction, thermal noise, cable clutter, and optical distortion until only the creator’s intent remains. Over the past six months in the Fingadget Hardware Lab, we replaced our multi-monitor desktop rigs with the latest <strong>anodized slate-titanium portable workstation</strong> paired with its companion <strong>dual-8K micro-OLED spatial computing headset</strong>.</p>
        <h2>3,800 Pixels Per Inch & Sub-9ms Photon-to-Motion Latency</h2>
        <p>The biggest leap in this generation is the custom silicon-backplane micro-OLED array. Packing 34 million pixels across two postage-stamp displays, text legibility at virtual two-meter distances rivals a physical 6K reference monitor. Even during four-hour code compilation and shader-debugging sessions, eye fatigue was virtually nonexistent thanks to dynamic foveated rendering locked at 120Hz.</p>
        <blockquote>"When a laptop chassis CNC-milled from aerospace titanium links wirelessly to a spatial visor at 40 Gbps over 60GHz millimeter-wave, your desk expands to the horizon."</blockquote>
        <h3>Unified Silicon Benchmarks</h3>
        <p>With 192GB of unified LPDDR6X memory running at 1.2 TB/s, the workstation compiled our entire test suite in 14 seconds while drawing just 38 watts from the wall. The fan profile remained inaudible below 22 dBA even under sustained ray-tracing loads.</p>
      ', FALSE, TRUE,
    9.5, 580, 3790,
    5, 15890, 1120,
    'Inter, sans-serif', '1.08rem', 'inherit',
    'left', ARRAY['Apple Tech', 'Spatial Computing', 'Hardware Review', 'Micro-OLED']::TEXT[], '{"bn": "টাইটানিয়াম ও মাইক্রো-ওএলইডি মাস্টারক্লাস: এম৫ স্পেশিয়াল স্টুডিও ইকোসিস্টেমে ছয় মাসের অভিজ্ঞতা", "hi": "टाइटेनियम और माइक्रो-ओएलईडी मास्टरक्लास: एम5 स्पेशियल स्टूडियो इकोसिस्टम के साथ छह महीने का अनुभव", "fr": "Titane & Micro-OLED : Six Mois au Cœur de l’Écosystème Spatial M5 Studio", "es": "Titanio y Micro-OLED: Seis Meses con el Ecosistema Espacial M5 Studio", "de": "Titan & Micro-OLED Meisterklasse: Sechs Monate im M5 Spatial Studio Ökosystem", "zh": "钛金属与Micro-OLED巅峰之作：深度体验M5空间计算工作室生态六个月", "ja": "チタン＆マイクロOLEDの極致：M5空間コンピューティング環境で過ごした6ヶ月", "ru": "Титан и Micro-OLED: Полгода в экосистеме пространственных вычислений M5 Studio"}'::JSONB, '2026-10-28T11:15:00Z'
);
INSERT INTO fngdgt_blog_posts (
    fngdgt_post_id, fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
    fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
    fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
    fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
    fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
    fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
    fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
    fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title, fngdgt_published_at
) VALUES (
    4, 'tokyo-opto-electronic-laser-symposium-holographic-fields', 'Live from the Tokyo Opto-Electronic Symposium: Coherent Holographic Light Fields Replace Glass Displays', 'Inside the subterranean laser auditorium where metasurface diffraction gratings projected volumetric 3D engineering models in mid-air without headgear.',
    'Symposiums & Summits', 'artificial-intelligence', 'Kenji Takahashi',
    'Asia-Pacific Bureau Chief', 'assets/summit_laser.jpg', 'Reporting from the main stage of the Tokyo Laser & Photonics Summit, where solid-state RGB femtosecond emitters and nano-antenna metasurfaces sculpted interactive mid-air light fields.',
    '
        <p>Every autumn, the Tokyo International Opto-Electronic & Laser Summit transforms its cavernous main hall into a symphony of coherent light. This year’s keynote demonstration stunned the 4,000 optical engineers in attendance: a three-meter wide volumetric turbine engine floating above the stage runway, viewable from a 140-degree horizontal arc without a single pair of stereoscopic glasses.</p>
        <h2>Sub-Wavelength Titanium-Dioxide Metasurfaces</h2>
        <p>Traditional holography struggled with narrow viewing angles because liquid-crystal spatial light modulators had pixel pitches larger than the wavelength of visible light. By fabricating <strong>220-nanometer titanium-dioxide nano-pillars</strong> illuminated by synchronized cyan, violet, and emerald solid-state lasers, the symposium team achieved full wavefront phase and amplitude control at 180 frames per second.</p>
        <p>Surgeons, air-traffic controllers, and molecular architects on the symposium floor were able to walk around the projected light field and slice cross-sections using ultrasonic mid-air tactile feedback.</p>
      ', FALSE, FALSE,
    9.4, 520, 3340,
    5, 12340, 890,
    'Inter, sans-serif', '1.08rem', 'inherit',
    'left', ARRAY['Laser Show', 'Symposium', 'Holography', 'Photonics']::TEXT[], '{"bn": "টোকিও অপটো-ইলেকট্রনিক লেজার সিম্পোজিয়াম: কাঁচের পর্দার বদলে বাতাসে ভাসমান হোলোগ্রাফিক আলোক ক্ষেত্র", "hi": "टोक्यो ऑप्टो-इलेक्ट्रॉनिक लेज़र संगोष्ठी: कांच की स्क्रीन की जगह हवा में तैरते होलोग्राफिक प्रकाश क्षेत्र", "fr": "En direct du Symposium Opto-Électronique de Tokyo : Champs Lumineux Holographiques", "es": "En vivo desde el Simposio Láser de Tokio: Campos Holográficos sin Pantalla", "de": "Live vom Opto-Elektronik-Symposium in Tokio: Holografische Lichtfelder", "zh": "东京光电与激光峰会现场：相干全息光场如何取代传统玻璃屏幕", "ja": "東京オプトエレクトロニクス・レーザーシンポジウム実況：空間ホログラフィック光場の衝撃", "ru": "Прямое включение с Токийского лазерного симпозиума: Голографические световые поля"}'::JSONB, '2026-10-27T09:40:00Z'
);
INSERT INTO fngdgt_blog_posts (
    fngdgt_post_id, fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
    fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
    fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
    fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
    fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
    fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
    fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
    fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title, fngdgt_published_at
) VALUES (
    5, 'orbital-solar-ion-station-deep-space-optical-mesh', 'Orbital Solar-Electric Stations & Lunar Ion Tugs: How Deep-Space Optical Relays Are Rewiring Planetary Communications', 'Forget legacy S-band radio bottlenecks: 1.5-micron coherent laser transceivers aboard high-inclination orbital stations are bringing gigabit connectivity to cislunar space.',
    'Space Tech', 'space-technology', 'Commander Elena Vance',
    'Aerospace & Orbital Systems Editor', 'assets/space_station.jpg', 'With Hall-effect krypton-xenon ion thrusters and 400-kilowatt roll-out solar arrays, the newest commercial orbital outpost doubles as an interplanetary optical routing hub.',
    '
        <p>Four hundred andfifty kilometers above Earth’s glowing blue limb, the newest modular commercial space station unfurled its fourth pair of gossamer thin-film gallium-arsenide solar wings this week. Beyond hosting microgravity crystallization experiments, the outpost serves a pivotal role: acting as the primary optical switching node between terrestrial fiber networks and cislunar exploration vessels.</p>
        <h2>50-Microradian Beam Pointing Accuracy</h2>
        <p>Aiming a laser beam from low-Earth orbit to the Lunar South Pole is roughly equivalent to hitting a moving coin from 50 kilometers away. Using magnetically levitated fast-steering mirrors and superconducting nanowire single-photon detectors, the station’s optical terminals maintain a 200 Gbps full-duplex link across 384,400 kilometers of vacuum.</p>
      ', FALSE, FALSE,
    9.6, 550, 3580,
    5, 14910, 1045,
    'Inter, sans-serif', '1.08rem', 'inherit',
    'left', ARRAY['Space Tech', 'Orbital Station', 'Laser Comms', 'Ion Propulsion']::TEXT[], '{"bn": "অরবিটাল সোলার-ইলেকট্রিক স্টেশন ও লুনার আয়ন টাগ: গভীর মহাকাশে লেজার যোগাযোগের বিপ্লব", "hi": "ऑर्बिटल सोलर-इलेक्ट्रिक स्टेशन और लूनर आयन टग: अंतरिक्ष में लेज़र संचार क्रांति", "fr": "Stations Orbitales & Propulseurs Ioniques : Le Réseau Optique de l’Espace Profond", "es": "Estaciones Orbitales y Propulsión Iónica: La Red Óptica del Espacio Profundo", "de": "Orbitale Raumstationen & Ionenantriebe: Optische Lasernetze im All", "zh": "轨道太阳能空间站与月球离子拖船：深空激光中继如何重塑星际通信", "ja": "軌道宇宙ステーションと月面イオン推進：深宇宙光レーザー通信網の全貌", "ru": "Орбитальные станции и ионные буксиры: Оптическая сеть дальнего космоса"}'::JSONB, '2026-10-26T16:30:00Z'
);
INSERT INTO fngdgt_blog_posts (
    fngdgt_post_id, fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
    fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
    fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
    fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
    fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
    fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
    fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
    fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title, fngdgt_published_at
) VALUES (
    6, 'beyond-1-4nm-high-na-euv-silicon-wafer-cleanrooms', 'Beyond 1.4-Nanometer High-NA EUV: Inside the Cleanrooms Etching Atomic-Scale Integrated Circuits', 'A rare photographic and engineering tour inside sub-angstrom semiconductor fabs where tin-plasma extreme ultraviolet pulses sculpt 200 billion transistors per die.',
    'Silicon & ICs', 'integrated-circuits', 'Vikramaditya Rao',
    'Semiconductor & Foundry Correspondent', 'assets/silicon_wafer.jpg', 'Fifty thousand times per second, a microscopic droplet of molten tin is vaporized by a dual-pulse CO2 laser to emit 13.5-nanometer light—the heartbeat of modern integrated circuits.',
    '
        <p>Hold a finished 300-millimeter silicon wafer up to cleanroom LED lighting and it shimmers like a sacred stained-glass rose window in emerald, gold, and cobalt. Each iridescent square contains over two hundred billion Gate-All-Around nanosheet transistors, stacked with atomic-layer deposition tolerances measured in picometers.</p>
        <h2>0.55 Numerical Aperture & Backside Power Delivery</h2>
        <p>By separating power-delivery vias to the underside of the wafer and reserving the top 18 metal layers exclusively for signal routing, foundry engineers eliminated voltage droop while boosting logic density by 1.8x. The transition from FinFETs to complementary FET (CFET) architectures ensures that silicon scaling still has decades of runway ahead.</p>
      ', FALSE, FALSE,
    9.7, 590, 3860,
    6, 16200, 1180,
    'Inter, sans-serif', '1.08rem', 'inherit',
    'left', ARRAY['Silicon Chips', 'Integrated Circuits', 'EUV Lithography', 'Semiconductors']::TEXT[], '{"bn": "১.৪-ন্যানোমিটার হাই-এনএ ইইউভি-র ওপারে: পারমাণবিক স্কেলের সিলিকন চিপ ও আইসি তৈরির কারখানায়", "hi": "1.4-नैनोमीटर हाई-एनए ईयूवी के पार: परमाणु स्तर के सिलिकॉन चिप्स और आईसी निर्माण की दुनिया", "fr": "Au-delà de 1,4 nm High-NA EUV : Dans les Salles Blanches des Circuits Intégrés Atomiques", "es": "Más allá de 1.4nm High-NA EUV: En el Interior de las Salas Limpias de Silicio", "de": "Jenseits von 1,4-nm High-NA EUV: In den Reinräumen atomarer Mikrochips", "zh": "超越1.4纳米High-NA EUV光刻：探秘雕刻原子级集成电路的无尘晶圆厂", "ja": "1.4nm High-NA EUVの彼方へ：原子スケールのシリコン集積回路を刻むクリーンルーム潜入", "ru": "За гранью 1,4-нм High-NA EUV: Внутри чистых комнат атомной микроэлектроники"}'::JSONB, '2026-10-25T12:00:00Z'
);
INSERT INTO fngdgt_blog_posts (
    fngdgt_post_id, fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
    fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
    fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
    fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
    fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
    fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
    fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
    fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title, fngdgt_published_at
) VALUES (
    7, 'open-silicon-risc-v-pocket-gizmos-edge-neural-workstations', 'From Pocket Logic Analyzers to Sovereign Neural Gizmos: Inside the Open-Silicon Handheld Revolution', 'A comprehensive engineering monograph on how open-source RISC-V cores, e-ink hybrid displays, and ultra-low-power NPU co-processors are powering autonomous field gizmos.',
    'Gizmo Engineering', 'artificial-intelligence', 'Prof. Siddharth Chatterjee & Dr. Ananya Bose',
    'Lead Systems Architects, Open-Silicon Gizmo Lab', 'assets/cyberdeck_gizmo.jpg', 'A new breed of pocketable engineering gizmos combines sunlight-readable transflective displays, tactile mechanical thumb-keyboards, software-defined radio transceivers, and 45-TOPS edge neural engines that run completely offline.',
    '
        <div class="gizmo-verse">
          <strong>⚙️ OPEN-SILICON GIZMO ARCHITECTURE // RISC-V VECTOR SPEC V2.0</strong><br/>
          <em>"A truly sovereign gizmo requires zero cloud tethering: its schematics are open, its cells are standard 21700 lithium-silicon, and its neural weights execute locally on bare metal."</em>
        </div>

        <h2>Chapter I: Why Dedicated Field Gizmos Are Outpacing General-Purpose Smartphones</h2>
        <p>Smartphones are jack-of-all-trades consumption portals, but ask a network security engineer, satellite telemetry technician, or acoustic field researcher what they carry in their utility pack and you will find purpose-built <strong>multi-tool hardware gizmos</strong>. Unlike consumer phones that throttle within ninety seconds and lack physical GPIO headers, dedicated cyber-deck gizmos expose 24-channel 500MHz logic analyzers, sub-GHz to 6GHz software-defined radios (SDR), and isolated RS-485 / CAN-bus diagnostic ports directly on the top bulkhead.</p>
        <p>Over the past year, three architectural shifts have converged to elevate these specialist gadgets into mainstream objects of desire:</p>
        <p><strong>1. Transflective 120Hz Memory-in-Pixel Displays:</strong> By combining a reflective cholesteric mirror layer beneath a low-power micro-LED frontlight, modern field gizmos achieve razor-sharp legibility in direct desert sunlight while drawing less than 18 milliwatts on static telemetry dashboards.</p>
        <p><strong>2. Hall-Effect Tactile Thumb Keyboards & Optical Trackpoints:</strong> Machined PBT keycaps riding on contactless magnetic Hall sensors allow operators wearing heavyinsulated gloves to enter shell commands, adjust trigger thresholds, and scrub waveform timelines with millimeter precision.</p>

        <h2>Chapter II: 64-Bit RISC-V Vector Clusters and Deterministic Real-Time Execution</h2>
        <p>At the heart of this year’s flagship open-hardware gizmo sits an 8-core 64-bit RISC-V system-on-chip fabricated on a 3nm FinFET node, paired with a dedicated real-time microcontroller island. Why does deterministic execution matter on a hardware gizmo? When you are bit-banging custom industrial protocols or capturing nanosecond-accurate laser time-of-flight pulses, an operating-system scheduler interrupt can ruin a measurement.</p>
        <blockquote>"By partitioning hard real-time I/O onto a lockstep RISC-V core with dedicated SRAM while running Linux and local multimodal transformers on the primary vector cluster, a single pocket gizmo replaces an entire workbench of oscilloscopes and spectrum analyzers."</blockquote>
        <p>Furthermore, because the instruction-set architecture is royalty-free and fully documented down to the register-transfer level (RTL), university labs and independent gizmo makers can synthesize custom cryptographic and signal-processing instructions directly into the onboard FPGA fabric.</p>

        <h2>Chapter III: Int4 Quantized Edge NPUs Running 32-Billion Parameter Models Offline</h2>
        <p>Until recently, running a capable code-generation or circuit-debugging model required an active fiber connection to a hyperscale datacenter. By integrating stacked high-bandwidth LPDDR6 memory directly atop a 45-TOPS sparse-matrix neural processing unit (NPU), the newest pocket gizmos execute 32B-parameter technical models entirely offline at 28 tokens per second.</p>
        <p>Point the gizmo’s macro thermal camera at a malfunctioning multi-layer PCB, and the local vision-language engine overlays component pinouts from its internal datasheet library, highlights the overheating voltage regulator, and calculates the exact replacement resistor value on screen—whether you are in an underground subway tunnel or a high-altitude observatory.</p>

        <h2>Chapter IV: Designing Hardware Built to Last Decades</h2>
        <p>The ultimate measure of a great gizmo is how gracefully it ages. With tool-less dual-battery bays, socketed M.2 storage, and complete KiCad board files stored on a dedicated ROM partition inside the device itself, this generation of open-silicon gizmos proves that cutting-edge performance and timeless repairability belong together.</p>
      ', TRUE, FALSE,
    9.9, 1310, 8920,
    13, 21340, 1940,
    'Merriweather, serif', '1.12rem', 'inherit',
    'justify', ARRAY['Gizmo Engineering', 'RISC-V', 'Handheld Hardware', 'Edge AI', 'Long-Form']::TEXT[], '{"bn": "পকেট লজিক অ্যানালাইজার থেকে সার্বভৌম নিউরাল গিজমো: ওপেন-সিলিকন হ্যান্ডহেল্ড বিপ্লব", "hi": "पॉकेट लॉजिक एनालाइज़र से लेकर न्यूरल गिज़्मो तक: ओपन-सिलिकॉन हैंडहेल्ड क्रांति", "fr": "Des Analyseurs Logiques de Poche aux Gizmos Neuronaux : La Révolution RISC-V", "es": "De Analizadores Lógicos de Bolsillo a Gizmos Neuronales: La Revolución RISC-V", "de": "Von Taschen-Logikanalysatoren zu neuronalen Gizmos: Die Open-Silicon-Revolution", "zh": "从口袋逻辑分析仪到主权神经极客装置（Gizmo）：开源硅芯片掌上设备革命长文", "ja": "ポケット論理アナライザから自律型ニューラル・ギズモ（Gizmo）へ：オープンシリコン革命", "ru": "От карманных логических анализаторов до нейронных гизмо: Революция открытого кремния"}'::JSONB, '2026-10-24T08:45:00Z'
);
INSERT INTO fngdgt_blog_posts (
    fngdgt_post_id, fngdgt_post_slug, fngdgt_post_title, fngdgt_post_subtitle,
    fngdgt_post_category, fngdgt_post_era_slug, fngdgt_post_author_name,
    fngdgt_post_author_role, fngdgt_post_cover_image, fngdgt_post_excerpt,
    fngdgt_post_content_html, fngdgt_post_is_gizmo, fngdgt_post_is_featured,
    fngdgt_post_review_score, fngdgt_post_word_count, fngdgt_post_char_count,
    fngdgt_post_read_minutes, fngdgt_post_views, fngdgt_post_likes,
    fngdgt_post_font_family, fngdgt_post_font_size, fngdgt_post_font_color,
    fngdgt_post_text_align, fngdgt_post_tags, fngdgt_post_i18n_title, fngdgt_published_at
) VALUES (
    8, 'brass-analytical-looms-to-point-contact-transistors', 'From Brass Analytical Looms to Point-Contact Germanium: Tracing the Lineage of Deterministic Machines', 'How Jacquard’s punched-card silk looms, Babbage’s mill-and-store architecture, and the 1947 Bell Labs transistor forged the bedrock of the digital world.',
    'Industrial Heritage', 'industrial-revolution', 'Dr. Julian Vance',
    'Historian of Computing & Cybernetics', 'assets/gizmo_industrial_mural.jpg', 'Before photolithography etched billions of gates onto silicon, the separation of memory ("the Store") and central processor ("the Mill") was born in precision brass clockwork.',
    '
        <p>Every modern microprocessor still honors the exact architectural division conceived in the 1830s during the height of the Industrial Revolution: a separate memory bank ("the Store"), an arithmetic execution unit ("the Mill"), and conditional branching controlled by perforated instruction cards inspired by Joseph Marie Jacquard’s silk loom.</p>
        <h2>From Mechanical Inertia to Solid-State Electrons</h2>
        <p>While brass gears proved that universal computation is independent of its physical substrate, mechanical inertia limited clock speeds to a few operations per second. The December 1947 breakthrough in solid-state semiconductor physics—replacing heated vacuum filaments with point-contact germanium and planar silicon transistors—unleashed a trillion-fold acceleration in switching velocity.</p>
      ', FALSE, FALSE,
    9.3, 510, 3290,
    5, 11450, 830,
    'Inter, sans-serif', '1.08rem', 'inherit',
    'left', ARRAY['Industrial Revolution', 'Transistor', 'Computing History', 'Babbage']::TEXT[], '{"bn": "পিতলের অ্যানালিটিক্যাল তাঁত থেকে পয়েন্ট-কন্টাক্ট ট্রানজিস্টর: যান্ত্রিক কম্পিউটিংয়ের ইতিহাস", "hi": "पीतल के एनालिटिकल करघे से लेकर ट्रांजिस्टर तक: आधुनिक कंप्यूटिंग की ऐतिहासिक यात्रा", "fr": "Des Métiers Jacquard en Laiton aux Transistors au Germanium : La Lignée des Machines", "es": "De los Telares Analíticos de Latón al Transistor de Germanio: Historia de la Computación", "de": "Von mechanischen Messing-Webstühlen zum Transistor: Die Wurzeln des Rechnens", "zh": "从黄铜分析织机到点接触晶体管：追溯确定性计算机器的百年血脉", "ja": "真鍮の解析機関から点接触トランジスタへ：決定論的計算機の系譜をたどる", "ru": "От латунных аналитических станков до точечного транзистора: Родословная машин"}'::JSONB, '2026-10-22T15:10:00Z'
);

-- ----------------------------------------------------------------------------
-- 15. SEED COMMENTS, AUDIT LOGS & SYNCHRONIZE SERIAL SEQUENCES
-- ----------------------------------------------------------------------------
INSERT INTO fngdgt_comments (
    fngdgt_comment_id, fngdgt_post_id, fngdgt_reader_name, fngdgt_reader_text, fngdgt_created_at
) VALUES (
    501, 2, 'Dr. Vikramjit Mukherjee', 'The oscilloscope breakdown of the 300-micron piezoelectric ceramic actuator stack and the 80 Gbps expanded-beam optical coupler is one of the clearest hardware teardowns I have ever read.', '2026-10-30T10:15:00Z'
);
INSERT INTO fngdgt_comments (
    fngdgt_comment_id, fngdgt_post_id, fngdgt_reader_name, fngdgt_reader_text, fngdgt_created_at
) VALUES (
    502, 1, 'ophie Laurent (CERN Fellow)', 'Was in the third row at Palexpo during the 4,096-qubit demonstration—the cryo-CMOS multiplexer telemetry was rock solid.', '2026-10-30T15:05:00Z'
);

INSERT INTO fngdgt_audit_logs (
    fngdgt_log_actor, fngdgt_log_action, fngdgt_log_entity, fngdgt_log_description
) VALUES (
    'system', 'SCHEMA_AND_SEED_INIT', 'fngdgt_database', 'Initialized all fngdgt_ tables, views, triggers, 8 technology eras, 5 quick-reads, and all 8 editorial & gizmo blog posts.'
);

SELECT setval(pg_get_serial_sequence('fngdgt_tech_eras', 'fngdgt_era_id'), COALESCE((SELECT MAX(fngdgt_era_id) FROM fngdgt_tech_eras), 1));
SELECT setval(pg_get_serial_sequence('fngdgt_blog_posts', 'fngdgt_post_id'), COALESCE((SELECT MAX(fngdgt_post_id) FROM fngdgt_blog_posts), 1));
SELECT setval(pg_get_serial_sequence('fngdgt_quick_reads', 'fngdgt_qr_id'), COALESCE((SELECT MAX(fngdgt_qr_id) FROM fngdgt_quick_reads), 1));
SELECT setval(pg_get_serial_sequence('fngdgt_comments', 'fngdgt_comment_id'), COALESCE((SELECT MAX(fngdgt_comment_id) FROM fngdgt_comments), 1));
SELECT setval(pg_get_serial_sequence('fngdgt_audit_logs', 'fngdgt_log_id'), COALESCE((SELECT MAX(fngdgt_log_id) FROM fngdgt_audit_logs), 1));

COMMIT;
