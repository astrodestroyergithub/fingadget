/**
 * FINGADGET - CORE APPLICATION ENGINE (app.js)
 * Complete Editorial Feed, 9-Language Translation Utility, 8-Era Dynamic Theme Engine,
 * Long-Form Gizmo Reader, Rich-Text Post Editor, Persistent State & Admin Suite.
 */

const FNGDGT_STORAGE_KEY = 'fngdgt_persistent_state_v4_gizmo';

// 1. MULTI-LANGUAGE TRANSLATION ENGINE (EN, BN, HI, FR, ES, DE, ZH, JA, RU)
const FNGDGT_TRANSLATIONS = {
  en: {
    langName: 'English',
    navFeed: 'Editorial Feed',
    navQuickReads: 'Quick Dispatches',
    navEras: 'Tech Eras',
    navGizmo: 'Gizmo Long-Form',
    navMurals: 'Visual Murals',
    navContact: 'Newsroom Desk',
    navBookmarks: 'Saved',
    navAdmin: 'Editorial Desk',
    heroBadge: 'FEATURED COVER STORY',
    readFullStory: 'Read Full Story',
    bookmarkStory: 'Save Story',
    bookmarked: 'Saved',
    quickReadsTitle: 'Pulse Dispatches & Quick Reads',
    quickReadsSub: 'Rapid synthesis from global hardware labs, particle colliders, and symposium stages.',
    feedHeading: 'The Common Techie Feed',
    feedSub: 'Filter, sort, categorize, and explore deep hardware reviews, laser symposium coverage, and Gizmo cybernetics.',
    searchPlaceholder: 'Search stories, hardware, quantum physics, or Gizmo essays...',
    filterAllCategories: 'All Categories',
    filterAllEras: 'All Tech Eras',
    filterAllFormats: 'All Formats',
    formatStandard: 'Standard Features',
    formatGizmo: 'Gizmo Long-Form',
    formatTopRated: 'Top Rated (9.2+)',
    formatBookmarked: 'Saved Bookmarks',
    sortLatest: 'Sort: Latest First',
    sortPopular: 'Sort: Most Read',
    sortRating: 'Sort: Highest Score',
    sortLongest: 'Sort: Deepest Reads',
    sortShortest: 'Sort: Quickest Reads',
    perPageLabel: 'Per page:',
    eraExplorerTitle: 'Chronicle of Technology Eras',
    eraExplorerSub: 'Select any historical or frontier era to preview its visual banner and shift the platform aesthetic.',
    activateEraBtn: 'Apply Era Theme',
    activeEraBadge: 'Active Theme',
    muralGalleryTitle: 'Captivating High-Definition Murals & Visuals',
    muralGallerySub: 'Architectural photography and scientific visualizations from global summits, orbital stations, and subatomic labs.',
    contactHeading: 'Global Newsroom & Symposium Desk',
    contactSub: 'Reach our hardware testing laboratories, symposium correspondents, and editorial leadership.',
    wordsLabel: 'words',
    minReadLabel: 'min read',
    viewsLabel: 'reads',
    gizmoBadge: 'Gizmo Treatise',
    featuredBadge: 'Editor Pick',
    noResults: 'No stories match your current filters. Try clearing your search or switching categories.',
    resetFilters: 'Reset All Filters',
    prevPage: 'Previous',
    nextPage: 'Next',
    readerListen: 'Listen to Article',
    readerStopListen: 'Stop Audio',
    readerComments: 'Reader Discussions',
    postCommentBtn: 'Publish Comment',
    footerRights: 'Fingadget Global Media. Crafted for technologists, scientists, and contemplative thinkers.'
  },
  bn: {
    langName: 'বাংলা (Bengali)',
    navFeed: 'প্রধান ফিড',
    navQuickReads: 'সংক্ষিপ্ত সংবাদ',
    navEras: 'প্রযুক্তির যুগ',
    navGizmo: 'গিজমো দীর্ঘ প্রবন্ধ',
    navMurals: 'এইচডি ম্যুরাল',
    navContact: 'যোগাযোগ ডেস্ক',
    navBookmarks: 'সংরক্ষিত',
    navAdmin: 'সম্পাদকীয় ডেস্ক',
    heroBadge: 'প্রধান প্রচ্ছদ প্রতিবেদন',
    readFullStory: 'সম্পূর্ণ প্রবন্ধ পড়ুন',
    bookmarkStory: 'সংরক্ষণ করুন',
    bookmarked: 'সংরক্ষিত হয়েছে',
    quickReadsTitle: 'দ্রুত প্রযুক্তি বার্তা ও কুইক-রিডস',
    quickReadsSub: 'বিশ্বব্যাপী হার্ডওয়্যার ল্যাব, মহাকাশ গবেষণা এবং সম্মেলন মঞ্চ থেকে তাৎক্ষণিক আপডেট।',
    feedHeading: 'প্রযুক্তিপ্রেমীদের সর্বজনীন ফিড',
    feedSub: 'ফিল্টার, সর্টিং এবং ক্যাটাগরি ব্যবহার করে হার্ডওয়্যার রিভিউ, কোয়ান্টাম বিজ্ঞান এবং গিজমো ইঞ্জিনিয়ারিং পড়ুন।',
    searchPlaceholder: 'প্রবন্ধ, হার্ডওয়্যার, কোয়ান্টাম বা গিজমো রিভিউ খুঁজুন...',
    filterAllCategories: 'সব বিভাগ',
    filterAllEras: 'সব প্রযুক্তি যুগ',
    filterAllFormats: 'সব ফরম্যাট',
    formatStandard: 'নিয়মিত প্রতিবেদন',
    formatGizmo: 'গিজমো দীর্ঘ প্রবন্ধ',
    formatTopRated: 'সেরা রেটিং (৯.২+)',
    formatBookmarked: 'সংরক্ষিত প্রবন্ধ',
    sortLatest: 'সাজান: সাম্প্রতিক প্রথম',
    sortPopular: 'সাজান: সর্বাধিক পঠিত',
    sortRating: 'সাজান: সর্বোচ্চ স্কোর',
    sortLongest: 'সাজান: দীর্ঘতম প্রবন্ধ',
    sortShortest: 'সাজান: সংক্ষিপ্ত প্রবন্ধ',
    perPageLabel: 'প্রতি পৃষ্ঠায়:',
    eraExplorerTitle: 'প্রযুক্তি যুগের কালানুক্রমিক যাত্রা',
    eraExplorerSub: 'যেকোনো প্রযুক্তি যুগ নির্বাচন করে ব্যানার এবং সম্পূর্ণ ওয়েবসাইটের থিম পরিবর্তন করুন।',
    activateEraBtn: 'যুগের থিম প্রয়োগ করুন',
    activeEraBadge: 'সক্রিয় থিম',
    muralGalleryTitle: 'মনোমুগ্ধকর এইচডি ম্যুরাল ও শিল্পকর্ম',
    muralGallerySub: 'লেজার শো, মহাকাশ স্টেশন, সিলিকন চিপ এবং উপপারমাণবিক কণার উচ্চ-রেজোলিউশন দৃশ্য।',
    contactHeading: 'গ্লোবাল নিউজরুম ও সিম্পোজিয়াম ডেস্ক',
    contactSub: 'আমাদের হার্ডওয়্যার ল্যাব এবং সম্পাদকীয় দলের সাথে সরাসরি যোগাযোগ করুন।',
    wordsLabel: 'শব্দ',
    minReadLabel: 'মিনিট পাঠ',
    viewsLabel: 'বার পঠিত',
    gizmoBadge: 'গিজমো প্রবন্ধ',
    featuredBadge: 'সেরা নির্বাচন',
    noResults: 'আপনার ফিল্টারের সাথে কোনো প্রবন্ধ মেলেনি। অনুগ্রহ করে ফিল্টার রিসেট করুন।',
    resetFilters: 'ফিল্টার রিসেট করুন',
    prevPage: 'পূর্ববর্তী',
    nextPage: 'পরবর্তী',
    readerListen: 'অডিও শুনুন',
    readerStopListen: 'অডিও থামান',
    readerComments: 'পাঠকের মতামত',
    postCommentBtn: 'মতামত প্রকাশ করুন',
    footerRights: 'ফিনগ্যাজেট গ্লোবাল মিডিয়া। প্রযুক্তিপ্রেমী, বিজ্ঞানী এবং মননশীল পাঠকদের জন্য নির্মিত।'
  },
  hi: {
    langName: 'हिन्दी (Hindi)',
    navFeed: 'मुख्य फ़ीड',
    navQuickReads: 'त्वरित समाचार',
    navEras: 'प्रौद्योगिकी युग',
    navGizmo: 'गिज़्मो दीर्घ लेख',
    navMurals: 'एचडी भित्तिचित्र',
    navContact: 'न्यूज़रूम संपर्क',
    navBookmarks: 'सहेजे गए',
    navAdmin: 'संपादकीय डेस्क',
    heroBadge: 'प्रमुख आवरण कथा',
    readFullStory: 'पूरा लेख पढ़ें',
    bookmarkStory: 'सहेजें',
    bookmarked: 'सहेजा गया',
    quickReadsTitle: 'त्वरित तकनीकी डिस्पैच और क्विक-रीड्स',
    quickReadsSub: 'वैश्विक हार्डवेयर प्रयोगशालाओं, अंतरिक्ष स्टेशनों और लेज़र सम्मेलनों से ताज़ा अपडेट।',
    feedHeading: 'टेक प्रेमियों के लिए साझा फ़ीड',
    feedSub: 'फ़िल्टर, श्रेणी और क्रमबद्धता के साथ हार्डवेयर समीक्षा, क्वांटम भौतिकी और गिज़्मो इंजीनियरिंग पढ़ें।',
    searchPlaceholder: 'लेख, एप्पल टेक, क्वांटम या गिज़्मो लेख खोजें...',
    filterAllCategories: 'सभी श्रेणियाँ',
    filterAllEras: 'सभी तकनीकी युग',
    filterAllFormats: 'सभी प्रारूप',
    formatStandard: 'मानक लेख',
    formatGizmo: 'गिज़्मो दीर्घ लेख',
    formatTopRated: 'शीर्ष रेटेड (9.2+)',
    formatBookmarked: 'सहेजे गए लेख',
    sortLatest: 'क्रम: नवीनतम पहले',
    sortPopular: 'क्रम: सर्वाधिक पढ़े गए',
    sortRating: 'क्रम: उच्चतम स्कोर',
    sortLongest: 'क्रम: विस्तृत लेख',
    sortShortest: 'क्रम: संक्षिप्त लेख',
    perPageLabel: 'प्रति पृष्ठ:',
    eraExplorerTitle: 'प्रौद्योगिकी युगों की यात्रा',
    eraExplorerSub: 'किसी भी तकनीकी युग को चुनें और वेबसाइट का बैनर व थीम तुरंत बदलें।',
    activateEraBtn: 'युग थीम लागू करें',
    activeEraBadge: 'सक्रिय थीम',
    muralGalleryTitle: 'आकर्षक एचडी भित्तिचित्र और दृश्य कला',
    muralGallerySub: 'तकनीकी सम्मेलनों, लेज़र शो, अंतरिक्ष प्रौद्योगिकी और उप-परमाणु कणों के दृश्य।',
    contactHeading: 'वैश्विक न्यूज़रूम और संगोष्ठी डेस्क',
    contactSub: 'हमारे संपादकीय कार्यालय और हार्डवेयर परीक्षण प्रयोगशालाओं से संपर्क करें।',
    wordsLabel: 'शब्द',
    minReadLabel: 'मिनट पठन',
    viewsLabel: 'पाठक',
    gizmoBadge: 'गिज़्मो विशेष',
    featuredBadge: 'संपादक की पसंद',
    noResults: 'चयनित फ़िल्टर से कोई लेख नहीं मिला। कृपया फ़िल्टर रीसेट करें।',
    resetFilters: 'फ़िल्टर रीसेट करें',
    prevPage: 'पिछला',
    nextPage: 'अगला',
    readerListen: 'लेख सुनें',
    readerStopListen: 'ऑडियो रोकें',
    readerComments: 'पाठक चर्चा',
    postCommentBtn: 'टिप्पणी साझा करें',
    footerRights: 'फिनगैजेट ग्लोबल मीडिया। इंजीनियरों, वैज्ञानिकों और दार्शनिक पाठकों के लिए समर्पित।'
  },
  fr: {
    langName: 'Français (French)',
    navFeed: 'Fil Éditorial',
    navQuickReads: 'Lectures Rapides',
    navEras: 'Ères Tech',
    navGizmo: 'Dossiers Gizmo',
    navMurals: 'Fresques HD',
    navContact: 'Rédaction',
    navBookmarks: 'Favoris',
    navAdmin: 'Bureau Éditorial',
    heroBadge: 'DOSSIER DE COUVERTURE',
    readFullStory: 'Lire l’Article Complet',
    bookmarkStory: 'Sauvegarder',
    bookmarked: 'Enregistré',
    quickReadsTitle: 'Dépêches & Lectures Rapides',
    quickReadsSub: 'Synthèses instantanées des laboratoires matériels, sommets laser et stations orbitales.',
    feedHeading: 'Le Fil Commun des Technophiles',
    feedSub: 'Filtrez, triez et explorez nos tests matériels, la physique subatomique et les dossiers gizmo.',
    searchPlaceholder: 'Rechercher un article, processeur, quantique ou essai...',
    filterAllCategories: 'Toutes les Catégories',
    filterAllEras: 'Toutes les Ères',
    filterAllFormats: 'Tous les Formats',
    formatStandard: 'Articles Standards',
    formatGizmo: 'Longs Formats Gizmo',
    formatTopRated: 'Mieux Notés (9.2+)',
    formatBookmarked: 'Articles Sauvegardés',
    sortLatest: 'Tri : Plus Récents',
    sortPopular: 'Tri : Plus Lus',
    sortRating: 'Tri : Meilleure Note',
    sortLongest: 'Tri : Plus Longs',
    sortShortest: 'Tri : Plus Courts',
    perPageLabel: 'Par page :',
    eraExplorerTitle: 'Chronique des Ères Technologiques',
    eraExplorerSub: 'Explorez chaque époque technologique et appliquez sa palette visuelle au site.',
    activateEraBtn: 'Activer ce Thème',
    activeEraBadge: 'Thème Actif',
    muralGalleryTitle: 'Fresques HD & Galeries Scientifiques',
    muralGallerySub: 'Photographies haute définition de sommets technologiques, puces silicium et cosmos.',
    contactHeading: 'Rédaction Mondiale & Bureau de Presse',
    contactSub: 'Contactez nos laboratoires de test et nos correspondants internationaux.',
    wordsLabel: 'mots',
    minReadLabel: 'min de lecture',
    viewsLabel: 'lectures',
    gizmoBadge: 'Dossier Gizmo',
    featuredBadge: 'Choix Éditorial',
    noResults: 'Aucun article ne correspond à vos filtres actuels.',
    resetFilters: 'Réinitialiser',
    prevPage: 'Précédent',
    nextPage: 'Suivant',
    readerListen: 'Écouter',
    readerStopListen: 'Arrêter',
    readerComments: 'Commentaires des Lecteurs',
    postCommentBtn: 'Publier',
    footerRights: 'Fingadget Média Global. Conçu pour les passionnés de technologie et de science.'
  },
  es: {
    langName: 'Español (Spanish)',
    navFeed: 'Feed Editorial',
    navQuickReads: 'Lecturas Rápidas',
    navEras: 'Eras Tech',
    navGizmo: 'Ensayos Gizmo',
    navMurals: 'Murales HD',
    navContact: 'Redacción',
    navBookmarks: 'Guardados',
    navAdmin: 'Panel Editorial',
    heroBadge: 'REPORTAJE PRINCIPAL',
    readFullStory: 'Leer Artículo Completo',
    bookmarkStory: 'Guardar',
    bookmarked: 'Guardado',
    quickReadsTitle: 'Despachos y Lecturas Rápidas',
    quickReadsSub: 'Resumen instantáneo de cumbres láser, laboratorios de silicio y tecnología espacial.',
    feedHeading: 'El Feed Común para Tecnólogos',
    feedSub: 'Filtra, ordena y explora reseñas de hardware, física subatómica y ingeniería gizmo.',
    searchPlaceholder: 'Buscar reseñas, espacio, cuántica o ensayos gizmo...',
    filterAllCategories: 'Todas las Categorías',
    filterAllEras: 'Todas las Eras',
    filterAllFormats: 'Todos los Formatos',
    formatStandard: 'Artículos Estándar',
    formatGizmo: 'Largo Formato Gizmo',
    formatTopRated: 'Mejor Valorados (9.2+)',
    formatBookmarked: 'Guardados',
    sortLatest: 'Orden: Más Recientes',
    sortPopular: 'Orden: Más Leídos',
    sortRating: 'Orden: Mayor Puntuación',
    sortLongest: 'Orden: Más Extensos',
    sortShortest: 'Orden: Más Breves',
    perPageLabel: 'Por página:',
    eraExplorerTitle: 'Crónica de las Eras Tecnológicas',
    eraExplorerSub: 'Selecciona una era histórica o futura para transformar el tema visual de la plataforma.',
    activateEraBtn: 'Aplicar Tema de Era',
    activeEraBadge: 'Tema Activo',
    muralGalleryTitle: 'Murales Cautivadores en Alta Definición',
    muralGallerySub: 'Visualizaciones de conferencias tecnológicas, obleas de silicio y partículas subatómicas.',
    contactHeading: 'Redacción Global y Oficina de Simposios',
    contactSub: 'Comunícate con nuestros laboratorios de pruebas y corresponsales.',
    wordsLabel: 'palabras',
    minReadLabel: 'min de lectura',
    viewsLabel: 'lecturas',
    gizmoBadge: 'Especial Gizmo',
    featuredBadge: 'Destacado',
    noResults: 'No se encontraron artículos con los filtros seleccionados.',
    resetFilters: 'Restablecer Filtros',
    prevPage: 'Anterior',
    nextPage: 'Siguiente',
    readerListen: 'Escuchar Artículo',
    readerStopListen: 'Detener Audio',
    readerComments: 'Comentarios de Lectores',
    postCommentBtn: 'Publicar Comentario',
    footerRights: 'Fingadget Global Media. Periodismo de frontera para tecnólogos y pensadores.'
  },
  de: {
    langName: 'Deutsch (German)',
    navFeed: 'Redaktions-Feed',
    navQuickReads: 'Kurzberichte',
    navEras: 'Tech-Epochen',
    navGizmo: 'Gizmo-Langform',
    navMurals: 'HD-Wandbilder',
    navContact: 'Redaktion',
    navBookmarks: 'Gespeichert',
    navAdmin: 'Redaktionsbüro',
    heroBadge: 'TITELGESCHICHTE',
    readFullStory: 'Vollständigen Artikel lesen',
    bookmarkStory: 'Merken',
    bookmarked: 'Gemerkt',
    quickReadsTitle: 'Kompakt-Dispatches & Quick-Reads',
    quickReadsSub: 'Schnelle Einblicke aus Halbleiterlaboren, Weltraummissionen und Lasersymposien.',
    feedHeading: 'Der gemeinsame Feed für Technik-Pioniere',
    feedSub: 'Filtern, sortieren und entdecken Sie Hardware-Tests, Quantenphysik und Gizmo-Technik.',
    searchPlaceholder: 'Artikel, Chips, Quantenphysik oder Essays durchsuchen...',
    filterAllCategories: 'Alle Kategorien',
    filterAllEras: 'Alle Tech-Epochen',
    filterAllFormats: 'Alle Formate',
    formatStandard: 'Standard-Artikel',
    formatGizmo: 'Gizmo-Langform',
    formatTopRated: 'Bestbewertet (9.2+)',
    formatBookmarked: 'Gespeicherte Artikel',
    sortLatest: 'Sortierung: Neueste zuerst',
    sortPopular: 'Sortierung: Meistgelesen',
    sortRating: 'Sortierung: Beste Wertung',
    sortLongest: 'Sortierung: Längste Artikel',
    sortShortest: 'Sortierung: Kürzeste Artikel',
    perPageLabel: 'Pro Seite:',
    eraExplorerTitle: 'Chronik der Technologie-Epochen',
    eraExplorerSub: 'Wählen Sie eine Epoche, um Banner und Farbschema der gesamten Plattform anzupassen.',
    activateEraBtn: 'Epochen-Design aktivieren',
    activeEraBadge: 'Aktives Design',
    muralGalleryTitle: 'Faszinierende HD-Wandbilder & Grafiken',
    muralGallerySub: 'Hochauflösende Aufnahmen von Konferenzen, Silizium-Wafern und subatomaren Teilchen.',
    contactHeading: 'Globale Redaktion & Symposium-Büro',
    contactSub: 'Direkter Draht zu unseren Testlaboren und Fachredakteuren.',
    wordsLabel: 'Wörter',
    minReadLabel: 'Min. Lesezeit',
    viewsLabel: 'Aufrufe',
    gizmoBadge: 'Gizmo-Dossier',
    featuredBadge: 'Empfehlung',
    noResults: 'Keine passenden Artikel für diese Filter gefunden.',
    resetFilters: 'Filter zurücksetzen',
    prevPage: 'Zurück',
    nextPage: 'Weiter',
    readerListen: 'Vorlesen',
    readerStopListen: 'Stopp',
    readerComments: 'Leserdiskussion',
    postCommentBtn: 'Kommentar senden',
    footerRights: 'Fingadget Global Media. Entwickelt für Technologen, Forscher und Vordenker.'
  },
  zh: {
    langName: '中文 (Chinese)',
    navFeed: '科技资讯流',
    navQuickReads: '极速快讯',
    navEras: '科技纪元',
    navGizmo: '极客装备长文',
    navMurals: '高清壁画',
    navContact: '编辑部联络',
    navBookmarks: '收藏夹',
    navAdmin: '总编控制台',
    heroBadge: '封面深度报道',
    readFullStory: '阅读完整文章',
    bookmarkStory: '收藏文章',
    bookmarked: '已收藏',
    quickReadsTitle: '前沿实验室快讯与速读',
    quickReadsSub: '来自全球科技峰会、激光秀、量子实验室与轨道空间站的即时简报。',
    feedHeading: '极客与科学家共享资讯流',
    feedSub: '通过多维筛选、分类、排序与分页，探索深度硬件评测、亚原子物理与极客装备（Gizmo）深度长文。',
    searchPlaceholder: '搜索文章、苹果科技、量子芯片或极客装备（Gizmo）...',
    filterAllCategories: '全部分类',
    filterAllEras: '全部科技纪元',
    filterAllFormats: '全部篇幅格式',
    formatStandard: '标准深度报道',
    formatGizmo: '极客装备长卷',
    formatTopRated: '高分精选 (9.2+)',
    formatBookmarked: '已收藏文章',
    sortLatest: '排序：最新发布',
    sortPopular: '排序：最多阅读',
    sortRating: '排序：最高评分',
    sortLongest: '排序：超长深度',
    sortShortest: '排序：精悍短篇',
    perPageLabel: '每页显示：',
    eraExplorerTitle: '人类科技纪元横幅与主题长廊',
    eraExplorerSub: '切换不同科技纪元（工业革命、晶体管、集成电路、太空、AI、量子计算），实时焕新全站主题。',
    activateEraBtn: '应用该纪元主题',
    activeEraBadge: '当前激活主题',
    muralGalleryTitle: '沉浸式高清科技壁画与微观艺术',
    muralGallerySub: '展现激光峰会、硅晶圆光刻、轨道空间站与亚原子粒子轨迹的高清视觉艺术。',
    contactHeading: '全球新闻编辑室与峰会联络处',
    contactSub: '联系我们的硬件评测实验室、驻会记者与总编团队。',
    wordsLabel: '字',
    minReadLabel: '分钟阅读',
    viewsLabel: '次阅读',
    gizmoBadge: 'Gizmo 深度长文',
    featuredBadge: '主编精选',
    noResults: '未找到符合当前筛选条件的文章，请重置筛选器。',
    resetFilters: '重置全部筛选',
    prevPage: '上一页',
    nextPage: '下一页',
    readerListen: '语音朗读',
    readerStopListen: '停止朗读',
    readerComments: '读者评论区',
    postCommentBtn: '发表评论',
    footerRights: 'Fingadget 全球科技媒体 · 献给极客、科学家与深邃思考者。'
  },
  ja: {
    langName: '日本語 (Japanese)',
    navFeed: '総合フィード',
    navQuickReads: 'クイック速報',
    navEras: 'テクノロジー時代',
    navGizmo: 'ギズモ長編特集',
    navMurals: 'HDミューラル',
    navContact: '編集部連絡先',
    navBookmarks: '保存済み',
    navAdmin: '編集デスク',
    heroBadge: '特集カバーストーリー',
    readFullStory: '記事全文を読む',
    bookmarkStory: '保存する',
    bookmarked: '保存済み',
    quickReadsTitle: 'ラボ速報＆クイックリード',
    quickReadsSub: '世界の技術サミット、レーザーシンポジウム、宇宙軌道ステーションからの最新ブリーフィング。',
    feedHeading: 'テクノロジー愛好家のための共通フィード',
    feedSub: 'フィルタリング、並べ替え、カテゴリ分け、ページネーションで深層記事やギズモ（Gizmo）深層解説を探索。',
    searchPlaceholder: '記事、ハードウェア、量子力学、ギズモ特集を検索...',
    filterAllCategories: 'すべてのカテゴリ',
    filterAllEras: 'すべての技術時代',
    filterAllFormats: 'すべての形式',
    formatStandard: '通常特集記事',
    formatGizmo: 'ギズモ長編特集',
    formatTopRated: '高評価 (9.2+)',
    formatBookmarked: '保存した記事',
    sortLatest: '並び順：最新順',
    sortPopular: '並び順：閲覧数順',
    sortRating: '並び順：高スコア順',
    sortLongest: '並び順：長編順',
    sortShortest: '並び順：短編順',
    perPageLabel: '表示件数：',
    eraExplorerTitle: 'テクノロジー時代のクロニクル',
    eraExplorerSub: '産業革命からトランジスタ、半導体、宇宙、AI、量子時代まで、サイト全体のテーマを切り替え。',
    activateEraBtn: 'この時代テーマを適用',
    activeEraBadge: '適用中テーマ',
    muralGalleryTitle: '高精細ミューラル＆サイエンスアート',
    muralGallerySub: 'レーザーショー、シリコンウェハー、素粒子衝突、空間コンピューティングのHDビジュアル。',
    contactHeading: 'グローバル編集部＆シンポジウム窓口',
    contactSub: 'ハードウェア検証ラボや取材デスクへのお問い合わせはこちら。',
    wordsLabel: '語',
    minReadLabel: '分で読了',
    viewsLabel: '閲覧',
    gizmoBadge: 'ギズモ深層特集',
    featuredBadge: '編集部推薦',
    noResults: '条件に一致する記事が見つかりませんでした。',
    resetFilters: 'フィルタをリセット',
    prevPage: '前へ',
    nextPage: '次へ',
    readerListen: '音声で聴く',
    readerStopListen: '停止',
    readerComments: '読者ディスカッション',
    postCommentBtn: 'コメントを投稿',
    footerRights: 'Fingadget Global Media. 技術者、科学者、思索者のための次世代メディア。'
  },
  ru: {
    langName: 'Русский (Russian)',
    navFeed: 'Лента Статей',
    navQuickReads: 'Быстрые Сводки',
    navEras: 'Эпохи Технологий',
    navGizmo: 'Гизмо-Лонгриды',
    navMurals: 'HD-Фрески',
    navContact: 'Редакция',
    navBookmarks: 'Закладки',
    navAdmin: 'Пульт Редакции',
    heroBadge: 'ГЛАВНАЯ ТЕМА НОМЕРА',
    readFullStory: 'Читать Полностью',
    bookmarkStory: 'В закладки',
    bookmarked: 'Сохранено',
    quickReadsTitle: 'Молнии и Быстрые Чтения',
    quickReadsSub: 'Оперативные сводки из квантовых лабораторий, космодромов и лазерных симпозиумов.',
    feedHeading: 'Единая Лента для Технологов и Исследователей',
    feedSub: 'Фильтруйте, сортируйте и изучайте обзоры оборудования, субатомную физику и инженерию гизмо.',
    searchPlaceholder: 'Поиск по статьям, чипам, космосу или инженерии гизмо...',
    filterAllCategories: 'Все Категории',
    filterAllEras: 'Все Эпохи',
    filterAllFormats: 'Все Форматы',
    formatStandard: 'Стандартные Обзоры',
    formatGizmo: 'Гизмо-Лонгриды',
    formatTopRated: 'Высший Рейтинг (9.2+)',
    formatBookmarked: 'Избранные Статьи',
    sortLatest: 'Сортировка: Новые',
    sortPopular: 'Сортировка: Популярные',
    sortRating: 'Сортировка: По Оценке',
    sortLongest: 'Сортировка: Лонгриды',
    sortShortest: 'Сортировка: Короткие',
    perPageLabel: 'На странице:',
    eraExplorerTitle: 'Летопись Технологических Эпох',
    eraExplorerSub: 'Выберите любую эпоху от паровых машин до квантовых компьютеров для смены оформления сайта.',
    activateEraBtn: 'Применить Тему Эпохи',
    activeEraBadge: 'Активная Тема',
    muralGalleryTitle: 'Захватывающие HD-Панно и Научная Графика',
    muralGallerySub: 'Лазерные саммиты, кремниевые пластины, орбитальные станции и субатомные треки.',
    contactHeading: 'Глобальная Редакция и Пресс-Центр',
    contactSub: 'Свяжитесь с нашей тестовой лабораторией и корреспондентами на симпозиумах.',
    wordsLabel: 'слов',
    minReadLabel: 'мин чтения',
    viewsLabel: 'просмотров',
    gizmoBadge: 'Гизмо-Обзор',
    featuredBadge: 'Выбор Редакции',
    noResults: 'По вашим фильтрам ничего не найдено. Сбросьте параметры поиска.',
    resetFilters: 'Сбросить Фильтры',
    prevPage: 'Назад',
    nextPage: 'Вперёд',
    readerListen: 'Озвучить Статью',
    readerStopListen: 'Остановить',
    readerComments: 'Обсуждение Читателей',
    postCommentBtn: 'Опубликовать',
    footerRights: 'Fingadget Global Media. Журналистика будущего для инженеров и мыслителей.'
  }
};

// Category translation map across all 9 languages
const FNGDGT_CATEGORY_I18N = {
  'Quantum & Subatomic': {
    en: 'Quantum & Subatomic', bn: 'কোয়ান্টাম ও উপপারমাণবিক', hi: 'क्वांटम और उप-परमाणु',
    fr: 'Quantique & Subatomique', es: 'Cuántica y Subatómica', de: 'Quanten & Subatomar',
    zh: '量子与亚原子物理', ja: '量子・素粒子科学', ru: 'Кванты и Субатомика'
  },
  'Gizmo Engineering': {
    en: 'Gizmo Engineering', bn: 'গিজমো ইঞ্জিনিয়ারিং', hi: 'गिज़्मो इंजीनियरिंग',
    fr: 'Ingénierie Gizmo', es: 'Ingeniería Gizmo', de: 'Gizmo-Engineering',
    zh: '极客装备（Gizmo）与控制论', ja: 'ギズモ工学・ハードウェア', ru: 'Инженерия Гизмо'
  },
  'Apple & Personal Tech': {
    en: 'Apple & Personal Tech', bn: 'অ্যাপল ও পার্সোনাল টেক', hi: 'एप्पल और पर्सनल टेक',
    fr: 'Apple & Tech Personnelle', es: 'Apple y Tecnología Personal', de: 'Apple & Personal Tech',
    zh: '苹果与空间计算硬件', ja: 'Apple・パーソナル技術', ru: 'Apple и Личные Гаджеты'
  },
  'Symposiums & Summits': {
    en: 'Symposiums & Summits', bn: 'সম্মেলন ও লেজার সামিট', hi: 'संगोष्ठी और लेज़र शिखर सम्मेलन',
    fr: 'Symposiums & Sommets', es: 'Simposios y Cumbres', de: 'Symposien & Gipfel',
    zh: '全球峰会与激光盛典', ja: 'シンポジウム・サミット', ru: 'Симпозиумы и Саммиты'
  },
  'Space Tech': {
    en: 'Space Tech', bn: 'মহাকাশ প্রযুক্তি', hi: 'अंतरिक्ष प्रौद्योगिकी',
    fr: 'Technologie Spatiale', es: 'Tecnología Espacial', de: 'Raumfahrttechnik',
    zh: '深空与轨道科技', ja: '宇宙・軌道テクノロジー', ru: 'Космические Технологии'
  },
  'Silicon & ICs': {
    en: 'Silicon & ICs', bn: 'সিলিকন চিপস ও আইসি', hi: 'सिलिकॉन चिप्स और आईसी',
    fr: 'Silicium & Circuits Intégrés', es: 'Silicio y Circuitos Integrados', de: 'Silizium & ICs',
    zh: '硅晶圆与集成电路', ja: 'シリコン・集積回路', ru: 'Кремний и Микросхемы'
  },
  'AI & Neural Systems': {
    en: 'AI & Neural Systems', bn: 'কৃত্রিম বুদ্ধিমত্তা ও নিউরাল', hi: 'एआई और न्यूरल सिस्टम',
    fr: 'IA & Systèmes Neuronaux', es: 'IA y Sistemas Neuronales', de: 'KI & Neuronale Systeme',
    zh: '人工智能与神经架构', ja: 'AI・ニューラル構造', ru: 'ИИ и Нейросети'
  },
  'Industrial Heritage': {
    en: 'Industrial Heritage', bn: 'শিল্প বিপ্লব ও যান্ত্রিক যুগ', hi: 'औद्योगिक क्रांति विरासत',
    fr: 'Héritage Industriel', es: 'Herencia Industrial', de: 'Industrielles Erbe',
    zh: '工业革命与机械先驱', ja: '産業革命・機械遺産', ru: 'Индустриальное Наследие'
  }
};

// 2. INITIAL SEED STATE (Mirrors NeonDB fngdgt_ Tables)
const FNGDGT_DEFAULT_STATE = {
  settings: {
    siteTitle: 'Fingadget',
    siteTagline: 'The Definitive Frontier of Consumer Hardware, Deep Science & Gizmo Cybernetics',
    activeLanguage: 'en',
    activeEraSlug: 'quantum-subatomic',
    colorMode: 'light',
    breakingRibbon: 'GLOBAL SYMPOSIUM DISPATCH: Sub-Angstrom Photonic Interconnects & Fault-Tolerant Logical Qubits Unveiled at Geneva Laser Summit',
    showEraBanner: true
  },
  eras: [
    {
      slug: 'industrial-revolution',
      name: 'Industrial & Mechanical Computing Era',
      years: '1760 – 1946',
      bannerTitle: 'Steam, Brass Gears & Babbage Analytical Looms',
      bannerSubtitle: 'From Jacquard punched-card looms and thermodynamic engines to precision clockwork differential analyzers.',
      bannerImage: 'assets/gizmo_industrial_mural.jpg',
      primaryAccent: '#B45309',
      secondaryAccent: '#059669',
      bgTint: '#FEFCE8',
      muralCaption: 'Brass Jacquard mechanisms meeting precision gizmo symmetry in early deterministic automata.'
    },
    {
      slug: 'transistor-era',
      name: 'Solid-State Transistor Revolution',
      years: '1947 – 1958',
      bannerTitle: 'Bell Labs Point-Contact & Junction Transistors',
      bannerSubtitle: 'Replacing fragile vacuum tubes with doped germanium and silicon crystals that amplified modern civilization.',
      bannerImage: 'assets/silicon_wafer.jpg',
      primaryAccent: '#059669',
      secondaryAccent: '#D97706',
      bgTint: '#ECFDF5',
      muralCaption: 'Solid-state semiconductor junctions awakening low-power logic gates.'
    },
    {
      slug: 'silicon-chips',
      name: 'Planar Silicon Wafer Era',
      years: '1959 – 1970',
      bannerTitle: 'Photolithography & Pure Czochralski Silicon Boules',
      bannerSubtitle: 'Etching light onto crystalline silicon ingots to birth Silicon Valley and Apollo guidance computers.',
      bannerImage: 'assets/silicon_wafer.jpg',
      primaryAccent: '#0D9488',
      secondaryAccent: '#CA8A04',
      bgTint: '#F0FDFA',
      muralCaption: 'Nanometer photolithography interference patterns across mono-crystalline wafers.'
    },
    {
      slug: 'integrated-circuits',
      name: 'VLSI & Microprocessor Integrated Circuits',
      years: '1971 – 2006',
      bannerTitle: 'Billions of Gates on a Fingernail: Moore’s Law in Full Stride',
      bannerSubtitle: 'From early 4-bit microprocessors to superscalar architectures and extreme ultraviolet lithography.',
      bannerImage: 'assets/silicon_wafer.jpg',
      primaryAccent: '#047857',
      secondaryAccent: '#EAB308',
      bgTint: '#F0FDF4',
      muralCaption: 'Multi-layer copper and optical interconnects powering the planetary computing fabric.'
    },
    {
      slug: 'apple-personal-tech',
      name: 'Personal, Mobile & Spatial Computing Era',
      years: '1976 – Present',
      bannerTitle: 'Human-Centric Industrial Design & Unified Silicon Ecosystems',
      bannerSubtitle: 'Precision milled aluminum, micro-OLED spatial optics, neural engines, and tactile craftsmanship.',
      bannerImage: 'assets/apple_spatial.jpg',
      primaryAccent: '#15803D',
      secondaryAccent: '#D97706',
      bgTint: '#F8FAFC',
      muralCaption: 'Minimalist anodized hardware studio where industrial design disappears into pure experience.'
    },
    {
      slug: 'space-technology',
      name: 'Orbital, Deep-Space & Interplanetary Tech',
      years: '1957 – Beyond',
      bannerTitle: 'Reusable Heavy Boosters, Ion Thrusters & Lunar Optical Mesh',
      bannerSubtitle: 'Autonomous orbital stations, laser satellite constellations, and radiation-hardened deep-space probes.',
      bannerImage: 'assets/space_station.jpg',
      primaryAccent: '#0F766E',
      secondaryAccent: '#D97706',
      bgTint: '#F0FDFA',
      muralCaption: 'Orbital solar-electric arrays suspended above Earth’s glowing atmospheric curvature.'
    },
    {
      slug: 'artificial-intelligence',
      name: 'Frontier Neural Architectures & Agentic AI',
      years: '2012 – Present',
      bannerTitle: 'Exascale Photonic Clusters, Multimodal Reasoning & Synthetic Symposia',
      bannerSubtitle: 'Transformer attention fabrics, neuromorphic inference chips, and sovereign scientific co-pilots.',
      bannerImage: 'assets/summit_laser.jpg',
      primaryAccent: '#059669',
      secondaryAccent: '#B45309',
      bgTint: '#FEFCE8',
      muralCaption: 'Global AI & laser symposium auditorium illuminating high-dimensional latent geometry.'
    },
    {
      slug: 'quantum-subatomic',
      name: 'Quantum Computing & Subatomic Physics Era',
      years: '2020 – Horizon',
      bannerTitle: 'Cryogenic Dilution Chandeliers, Topological Qubits & Subatomic Colliders',
      bannerSubtitle: 'Harnessing superposition, entanglement, and Akasha-level field symmetries to solve intractable cosmos models.',
      bannerImage: 'assets/quantum_subatomic.jpg',
      primaryAccent: '#059669',
      secondaryAccent: '#D97706',
      bgTint: '#ECFDF5',
      muralCaption: 'Golden dilution cryostat surrounded by subatomic wave-particle interference rings.'
    }
  ],
  quickReads: [
    {
      id: 101,
      title: 'CERN & Zurich Quantum Symposium Unveils Coherent Photon-Bus Link Across 40 Meters',
      summary: 'Cryogenic waveguide bridges two dilution refrigerators with 99.94% entanglement fidelity, paving the path for modular quantum supercomputing centers.',
      category: 'Quantum & Subatomic',
      eraSlug: 'quantum-subatomic',
      readTime: '45 sec read',
      badge: 'Symposium Live'
    },
    {
      id: 102,
      title: 'Apple M5 Ultra Studio Reference Board Benchmarked with Dual-Sided Optical Interposer',
      summary: 'Thermal imaging from Cupertino’s hardware studio reveals 1.2 TB/s unified memory bandwidth with whisper-quiet vapor-chamber dissipation.',
      category: 'Apple & Personal Tech',
      eraSlug: 'apple-personal-tech',
      readTime: '1 min read',
      badge: 'Hardware Lab'
    },
    {
      id: 103,
      title: 'High-NA EUV Lithography Hits 1.4nm Gate-All-Around RibbonFET Yield Milestone',
      summary: 'Backside power delivery combined with ruthenium interconnects cuts parasitic capacitance by 28% in next-generation wafer runs.',
      category: 'Silicon & ICs',
      eraSlug: 'integrated-circuits',
      readTime: '50 sec read',
      badge: 'Foundry Brief'
    },
    {
      id: 104,
      title: 'Lunar South Pole Laser Relay Sustains 200 Gbps Downlink Through Atmospheric Turbulence',
      summary: 'Adaptive deformable mirrors at the Atacama optical ground station lock onto orbital phase arrays with zero packet loss.',
      category: 'Space Tech',
      eraSlug: 'space-technology',
      readTime: '40 sec read',
      badge: 'Orbital Telemetry'
    },
    {
      id: 105,
      title: 'Modular Open-Source Handheld Gizmo Packs Hot-Swappable FPGA & Neural Cartridges',
      summary: 'Hardware hackers unveil a pocket-sized CNC-machined magnesium gizmo capable of emulating vintage silicon and running local edge models.',
      category: 'Gizmo Engineering',
      eraSlug: 'artificial-intelligence',
      readTime: '1 min read',
      badge: 'Gizmo Monograph'
    }
  ],
  posts: [
    {
      id: 1,
      slug: 'geneva-cryo-photonic-quantum-laser-summit',
      title: 'Inside Geneva’s Cryo-Photonic Laser Summit: How 4,096 Logical Qubits Crossed the Fault-Tolerant Horizon',
      subtitle: 'At the annual European Subatomic & Quantum Symposium, topological braiding and femtosecond optical tweezers turned theoretical error correction into working silicon-nitride hardware.',
      category: 'Quantum & Subatomic',
      eraSlug: 'quantum-subatomic',
      authorName: 'Dr. Aris Thorne',
      authorRole: 'Chief Physics & Hardware Editor',
      coverImage: 'assets/quantum_subatomic.jpg',
      excerpt: 'Beneath a canopy of cyan and violet calibration lasers in Geneva, researchers demonstrated a fault-tolerant 4,096-logical-qubit processor running continuous surface-code syndrome extraction at 12 millikelvin.',
      isGizmo: false,
      isFeatured: true,
      reviewScore: 9.8,
      wordCount: 640,
      charCount: 4120,
      readMinutes: 6,
      views: 18420,
      likes: 1290,
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.08rem',
      fontColor: 'inherit',
      textAlign: 'left',
      tags: ['Quantum Computing', 'Subatomic Physics', 'Cryogenics', 'Symposium'],
      publishedAt: '2026-10-30T14:20:00Z',
      i18nTitle: {
        bn: 'জেনেভার ক্রায়ো-ফোটোনিক লেজার সামিট: কীভাবে ৪,০৯৬ লজিক্যাল কিউবিট ফল্ট-টলারেন্ট দিগন্ত অতিক্রম করল',
        hi: 'जिनेवा क्रायो-फोटोनिक लेज़र शिखर सम्मेलन: कैसे 4,096 लॉजिकल क्यूबिट्स ने दोष-सहिष्णु सीमा पार की',
        fr: 'Au cœur du Sommet Laser Cryo-Photonique de Genève : 4 096 Qubits Logiques',
        es: 'Cumbre Láser Crio-Fotónica de Ginebra: 4.096 Qubits Lógicos Tolerantes a Fallos',
        de: 'Genfer Kryo-Photonik-Lasergipfel: 4.096 logische Qubits knacken die Fehlertoleranz',
        zh: '日内瓦低温光子激光峰会直击：4096个逻辑量子比特如何跨越容错边界',
        ja: 'ジュネーブ極低温フォトニック・レーザーサミット：4,096論理量子ビットの衝撃',
        ru: 'Женевский крио-фотонный лазерный саммит: 4096 логических кубитов'
      },
      contentHtml: `
        <p>When the main auditorium lights dimmed at the Geneva Palexpo Laser & Subatomic Symposium this morning, the centerpiece on stage was neither a consumer smartphone nor a conventional supercomputer rack. Suspended inside a three-meter tall borosilicate vacuum vessel gleamed a multi-tiered gold-plated dilution refrigerator—pulsing with phase-locked cyan optical fibers that carried microwave-to-optical entanglement bridges across the stage.</p>
        <h2>Breaking the Physical-to-Logical Qubit Bottleneck</h2>
        <p>For three decades, quantum engineers have wrestled with decoherence: the slightest thermal phonon or stray electromagnetic ripple collapses delicate superpositions before deep circuits can finish executing. Until this year, achieving a single high-fidelity logical qubit required upwards of a thousand noisy physical transmons. By combining <strong>isotopically purified silicon-28 spin qubits</strong> with on-chip photonic waveguides, the Geneva consortium compressed that overhead to a 12:1 ratio.</p>
        <blockquote>"We are no longer babysitting individual wavefunctions in isolation. With photonic low-loss interconnects operating at 15 millikelvin, separate cryostats behave as a single phase-coherent subatomic fabric." — Prof. Elena Rostova, Keynote Chair at the Geneva Quantum Symposium.</blockquote>
        <h3>Key Architectural Breakthroughs</h3>
        <p>First, cryo-CMOS control multiplexers sit directly on the 4-Kelvin stage, eliminating thousands of bulky coaxial cables. Second, real-time syndrome decoding runs on dedicated ultra-low-latency FPGA fabrics that correct bit-flip and phase-flip errors within 180 nanoseconds—well inside the 4.2-millisecond coherence window of the underlying spin lattice.</p>
        <p>For materials scientists and theoretical physicists, the implications are immediate: simulating high-temperature superconducting cuprates, nitrogen-fixation catalytic pathways, and non-perturbative lattice chromodynamics is shifting from century-long extrapolations to overnight batch runs.</p>
      `
    },
    {
      id: 2,
      slug: 'gizmo-cybernetics-modular-solid-state-hardware-architecture',
      title: 'The Anatomy of Next-Gen Modular Gizmos: Solid-State Micro-Actuators, Piezo Haptics & Self-Healing Chassis Design',
      subtitle: 'An extensive, multi-chapter hardware teardown and engineering treatise exploring how precision micro-electromechanical gizmos are replacing monolithic consumer electronics.',
      category: 'Gizmo Engineering',
      eraSlug: 'quantum-subatomic',
      authorName: 'Dr. Viktor Sterling & Maya Krishnan',
      authorRole: 'Chairs of Gizmo Architecture & Precision Mechatronics',
      coverImage: 'assets/gizmo_industrial_mural.jpg',
      excerpt: 'From magnetic pogo-pin interconnect buses and ultrasonic piezoelectric haptic arrays to liquid-metal thermal interfaces, modern flagship gizmos have evolved into marvels of repairable, field-upgradable micro-engineering. Here is our complete 5-chapter teardown treatise.',
      isGizmo: true,
      isFeatured: true,
      reviewScore: 9.9,
      wordCount: 1420,
      charCount: 9480,
      readMinutes: 14,
      views: 24680,
      likes: 2150,
      fontFamily: 'Merriweather, serif',
      fontSize: '1.12rem',
      fontColor: 'inherit',
      textAlign: 'justify',
      tags: ['Gizmo Engineering', 'Modular Hardware', 'Teardown', 'Mechatronics', 'Long-Form'],
      publishedAt: '2026-10-29T18:00:00Z',
      i18nTitle: {
        bn: 'পরবর্তী প্রজন্মের মডুলার গিজমোর ব্যবচ্ছেদ: সলিড-স্টেট অ্যাকচুয়েটর ও হ্যাপটিক ইঞ্জিনিয়ারিং',
        hi: 'नेक्स्ट-जेन मॉड्यूलर गिज़्मो की आंतरिक संरचना: सॉलिड-स्टेट माइक्रो-एक्चुएटर्स और हैप्टिक इंजीनियरिंग',
        fr: 'L’Anatomie des Gizmos Modulaires de Nouvelle Génération : Micro-Actionneurs & Haptique',
        es: 'Anatomía de los Gizmos Modulares de Nueva Generación: Microactuadores de Estado Sólido',
        de: 'Die Anatomie modularer Next-Gen-Gizmos: Festkörper-Aktuatoren & Präzisionsmechanik',
        zh: '下一代模块化极客装置（Gizmo）深度拆解：固态微执行器、压电触觉与自修复机身工程',
        ja: '次世代モジュラー・ギズモ（Gizmo）の解剖学：固体マイクロアクチュエータと精密機構設計',
        ru: 'Анатомия модульных гизмо нового поколения: Твердотельные микроприводы и гаптика'
      },
      contentHtml: `
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
      `
    },
    {
      id: 3,
      slug: 'cupertino-titanium-micro-oled-m5-spatial-studio',
      title: 'Cupertino’s Titanium & Micro-OLED Masterclass: Six Months Living Inside the M5 Spatial Studio Ecosystem',
      subtitle: 'Our long-term hardware teardown and daily workflow verdict on unified optical-interposer laptops, binocular 8K spatial visors, and zero-latency neural haptics.',
      category: 'Apple & Personal Tech',
      eraSlug: 'apple-personal-tech',
      authorName: 'Maya Lin-Vance',
      authorRole: 'Executive Hardware Reviewer',
      coverImage: 'assets/apple_spatial.jpg',
      excerpt: 'We put the latest anodized titanium workstation and second-generation spatial computing headset through 180 days of 3D CAD rendering, local 70B LLM compilation, and color-critical HDR mastering.',
      isGizmo: false,
      isFeatured: true,
      reviewScore: 9.5,
      wordCount: 580,
      charCount: 3790,
      readMinutes: 5,
      views: 15890,
      likes: 1120,
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.08rem',
      fontColor: 'inherit',
      textAlign: 'left',
      tags: ['Apple Tech', 'Spatial Computing', 'Hardware Review', 'Micro-OLED'],
      publishedAt: '2026-10-28T11:15:00Z',
      i18nTitle: {
        bn: 'টাইটানিয়াম ও মাইক্রো-ওএলইডি মাস্টারক্লাস: এম৫ স্পেশিয়াল স্টুডিও ইকোসিস্টেমে ছয় মাসের অভিজ্ঞতা',
        hi: 'टाइटेनियम और माइक्रो-ओएलईडी मास्टरक्लास: एम5 स्पेशियल स्टूडियो इकोसिस्टम के साथ छह महीने का अनुभव',
        fr: 'Titane & Micro-OLED : Six Mois au Cœur de l’Écosystème Spatial M5 Studio',
        es: 'Titanio y Micro-OLED: Seis Meses con el Ecosistema Espacial M5 Studio',
        de: 'Titan & Micro-OLED Meisterklasse: Sechs Monate im M5 Spatial Studio Ökosystem',
        zh: '钛金属与Micro-OLED巅峰之作：深度体验M5空间计算工作室生态六个月',
        ja: 'チタン＆マイクロOLEDの極致：M5空間コンピューティング環境で過ごした6ヶ月',
        ru: 'Титан и Micro-OLED: Полгода в экосистеме пространственных вычислений M5 Studio'
      },
      contentHtml: `
        <p>Industrial design at its highest level is an exercise in subtraction: removing friction, thermal noise, cable clutter, and optical distortion until only the creator’s intent remains. Over the past six months in the Fingadget Hardware Lab, we replaced our multi-monitor desktop rigs with the latest <strong>anodized slate-titanium portable workstation</strong> paired with its companion <strong>dual-8K micro-OLED spatial computing headset</strong>.</p>
        <h2>3,800 Pixels Per Inch & Sub-9ms Photon-to-Motion Latency</h2>
        <p>The biggest leap in this generation is the custom silicon-backplane micro-OLED array. Packing 34 million pixels across two postage-stamp displays, text legibility at virtual two-meter distances rivals a physical 6K reference monitor. Even during four-hour code compilation and shader-debugging sessions, eye fatigue was virtually nonexistent thanks to dynamic foveated rendering locked at 120Hz.</p>
        <blockquote>"When a laptop chassis CNC-milled from aerospace titanium links wirelessly to a spatial visor at 40 Gbps over 60GHz millimeter-wave, your desk expands to the horizon."</blockquote>
        <h3>Unified Silicon Benchmarks</h3>
        <p>With 192GB of unified LPDDR6X memory running at 1.2 TB/s, the workstation compiled our entire test suite in 14 seconds while drawing just 38 watts from the wall. The fan profile remained inaudible below 22 dBA even under sustained ray-tracing loads.</p>
      `
    },
    {
      id: 4,
      slug: 'tokyo-opto-electronic-laser-symposium-holographic-fields',
      title: 'Live from the Tokyo Opto-Electronic Symposium: Coherent Holographic Light Fields Replace Glass Displays',
      subtitle: 'Inside the subterranean laser auditorium where metasurface diffraction gratings projected volumetric 3D engineering models in mid-air without headgear.',
      category: 'Symposiums & Summits',
      eraSlug: 'artificial-intelligence',
      authorName: 'Kenji Takahashi',
      authorRole: 'Asia-Pacific Bureau Chief',
      coverImage: 'assets/summit_laser.jpg',
      excerpt: 'Reporting from the main stage of the Tokyo Laser & Photonics Summit, where solid-state RGB femtosecond emitters and nano-antenna metasurfaces sculpted interactive mid-air light fields.',
      isGizmo: false,
      isFeatured: false,
      reviewScore: 9.4,
      wordCount: 520,
      charCount: 3340,
      readMinutes: 5,
      views: 12340,
      likes: 890,
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.08rem',
      fontColor: 'inherit',
      textAlign: 'left',
      tags: ['Laser Show', 'Symposium', 'Holography', 'Photonics'],
      publishedAt: '2026-10-27T09:40:00Z',
      i18nTitle: {
        bn: 'টোকিও অপটো-ইলেকট্রনিক লেজার সিম্পোজিয়াম: কাঁচের পর্দার বদলে বাতাসে ভাসমান হোলোগ্রাফিক আলোক ক্ষেত্র',
        hi: 'टोक्यो ऑप्टो-इलेक्ट्रॉनिक लेज़र संगोष्ठी: कांच की स्क्रीन की जगह हवा में तैरते होलोग्राफिक प्रकाश क्षेत्र',
        fr: 'En direct du Symposium Opto-Électronique de Tokyo : Champs Lumineux Holographiques',
        es: 'En vivo desde el Simposio Láser de Tokio: Campos Holográficos sin Pantalla',
        de: 'Live vom Opto-Elektronik-Symposium in Tokio: Holografische Lichtfelder',
        zh: '东京光电与激光峰会现场：相干全息光场如何取代传统玻璃屏幕',
        ja: '東京オプトエレクトロニクス・レーザーシンポジウム実況：空間ホログラフィック光場の衝撃',
        ru: 'Прямое включение с Токийского лазерного симпозиума: Голографические световые поля'
      },
      contentHtml: `
        <p>Every autumn, the Tokyo International Opto-Electronic & Laser Summit transforms its cavernous main hall into a symphony of coherent light. This year’s keynote demonstration stunned the 4,000 optical engineers in attendance: a three-meter wide volumetric turbine engine floating above the stage runway, viewable from a 140-degree horizontal arc without a single pair of stereoscopic glasses.</p>
        <h2>Sub-Wavelength Titanium-Dioxide Metasurfaces</h2>
        <p>Traditional holography struggled with narrow viewing angles because liquid-crystal spatial light modulators had pixel pitches larger than the wavelength of visible light. By fabricating <strong>220-nanometer titanium-dioxide nano-pillars</strong> illuminated by synchronized cyan, violet, and emerald solid-state lasers, the symposium team achieved full wavefront phase and amplitude control at 180 frames per second.</p>
        <p>Surgeons, air-traffic controllers, and molecular architects on the symposium floor were able to walk around the projected light field and slice cross-sections using ultrasonic mid-air tactile feedback.</p>
      `
    },
    {
      id: 5,
      slug: 'orbital-solar-ion-station-deep-space-optical-mesh',
      title: 'Orbital Solar-Electric Stations & Lunar Ion Tugs: How Deep-Space Optical Relays Are Rewiring Planetary Communications',
      subtitle: 'Forget legacy S-band radio bottlenecks: 1.5-micron coherent laser transceivers aboard high-inclination orbital stations are bringing gigabit connectivity to cislunar space.',
      category: 'Space Tech',
      eraSlug: 'space-technology',
      authorName: 'Commander Elena Vance',
      authorRole: 'Aerospace & Orbital Systems Editor',
      coverImage: 'assets/space_station.jpg',
      excerpt: 'With Hall-effect krypton-xenon ion thrusters and 400-kilowatt roll-out solar arrays, the newest commercial orbital outpost doubles as an interplanetary optical routing hub.',
      isGizmo: false,
      isFeatured: false,
      reviewScore: 9.6,
      wordCount: 550,
      charCount: 3580,
      readMinutes: 5,
      views: 14910,
      likes: 1045,
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.08rem',
      fontColor: 'inherit',
      textAlign: 'left',
      tags: ['Space Tech', 'Orbital Station', 'Laser Comms', 'Ion Propulsion'],
      publishedAt: '2026-10-26T16:30:00Z',
      i18nTitle: {
        bn: 'অরবিটাল সোলার-ইলেকট্রিক স্টেশন ও লুনার আয়ন টাগ: গভীর মহাকাশে লেজার যোগাযোগের বিপ্লব',
        hi: 'ऑर्बिटल सोलर-इलेक्ट्रिक स्टेशन और लूनर आयन टग: अंतरिक्ष में लेज़र संचार क्रांति',
        fr: 'Stations Orbitales & Propulseurs Ioniques : Le Réseau Optique de l’Espace Profond',
        es: 'Estaciones Orbitales y Propulsión Iónica: La Red Óptica del Espacio Profundo',
        de: 'Orbitale Raumstationen & Ionenantriebe: Optische Lasernetze im All',
        zh: '轨道太阳能空间站与月球离子拖船：深空激光中继如何重塑星际通信',
        ja: '軌道宇宙ステーションと月面イオン推進：深宇宙光レーザー通信網の全貌',
        ru: 'Орбитальные станции и ионные буксиры: Оптическая сеть дальнего космоса'
      },
      contentHtml: `
        <p>Four hundred andfifty kilometers above Earth’s glowing blue limb, the newest modular commercial space station unfurled its fourth pair of gossamer thin-film gallium-arsenide solar wings this week. Beyond hosting microgravity crystallization experiments, the outpost serves a pivotal role: acting as the primary optical switching node between terrestrial fiber networks and cislunar exploration vessels.</p>
        <h2>50-Microradian Beam Pointing Accuracy</h2>
        <p>Aiming a laser beam from low-Earth orbit to the Lunar South Pole is roughly equivalent to hitting a moving coin from 50 kilometers away. Using magnetically levitated fast-steering mirrors and superconducting nanowire single-photon detectors, the station’s optical terminals maintain a 200 Gbps full-duplex link across 384,400 kilometers of vacuum.</p>
      `
    },
    {
      id: 6,
      slug: 'beyond-1-4nm-high-na-euv-silicon-wafer-cleanrooms',
      title: 'Beyond 1.4-Nanometer High-NA EUV: Inside the Cleanrooms Etching Atomic-Scale Integrated Circuits',
      subtitle: 'A rare photographic and engineering tour inside sub-angstrom semiconductor fabs where tin-plasma extreme ultraviolet pulses sculpt 200 billion transistors per die.',
      category: 'Silicon & ICs',
      eraSlug: 'integrated-circuits',
      authorName: 'Vikramaditya Rao',
      authorRole: 'Semiconductor & Foundry Correspondent',
      coverImage: 'assets/silicon_wafer.jpg',
      excerpt: 'Fifty thousand times per second, a microscopic droplet of molten tin is vaporized by a dual-pulse CO2 laser to emit 13.5-nanometer light—the heartbeat of modern integrated circuits.',
      isGizmo: false,
      isFeatured: false,
      reviewScore: 9.7,
      wordCount: 590,
      charCount: 3860,
      readMinutes: 6,
      views: 16200,
      likes: 1180,
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.08rem',
      fontColor: 'inherit',
      textAlign: 'left',
      tags: ['Silicon Chips', 'Integrated Circuits', 'EUV Lithography', 'Semiconductors'],
      publishedAt: '2026-10-25T12:00:00Z',
      i18nTitle: {
        bn: '১.৪-ন্যানোমিটার হাই-এনএ ইইউভি-র ওপারে: পারমাণবিক স্কেলের সিলিকন চিপ ও আইসি তৈরির কারখানায়',
        hi: '1.4-नैनोमीटर हाई-एनए ईयूवी के पार: परमाणु स्तर के सिलिकॉन चिप्स और आईसी निर्माण की दुनिया',
        fr: 'Au-delà de 1,4 nm High-NA EUV : Dans les Salles Blanches des Circuits Intégrés Atomiques',
        es: 'Más allá de 1.4nm High-NA EUV: En el Interior de las Salas Limpias de Silicio',
        de: 'Jenseits von 1,4-nm High-NA EUV: In den Reinräumen atomarer Mikrochips',
        zh: '超越1.4纳米High-NA EUV光刻：探秘雕刻原子级集成电路的无尘晶圆厂',
        ja: '1.4nm High-NA EUVの彼方へ：原子スケールのシリコン集積回路を刻むクリーンルーム潜入',
        ru: 'За гранью 1,4-нм High-NA EUV: Внутри чистых комнат атомной микроэлектроники'
      },
      contentHtml: `
        <p>Hold a finished 300-millimeter silicon wafer up to cleanroom LED lighting and it shimmers like a sacred stained-glass rose window in emerald, gold, and cobalt. Each iridescent square contains over two hundred billion Gate-All-Around nanosheet transistors, stacked with atomic-layer deposition tolerances measured in picometers.</p>
        <h2>0.55 Numerical Aperture & Backside Power Delivery</h2>
        <p>By separating power-delivery vias to the underside of the wafer and reserving the top 18 metal layers exclusively for signal routing, foundry engineers eliminated voltage droop while boosting logic density by 1.8x. The transition from FinFETs to complementary FET (CFET) architectures ensures that silicon scaling still has decades of runway ahead.</p>
      `
    },
    {
      id: 7,
      slug: 'open-silicon-risc-v-pocket-gizmos-edge-neural-workstations',
      title: 'From Pocket Logic Analyzers to Sovereign Neural Gizmos: Inside the Open-Silicon Handheld Revolution',
      subtitle: 'A comprehensive engineering monograph on how open-source RISC-V cores, e-ink hybrid displays, and ultra-low-power NPU co-processors are powering autonomous field gizmos.',
      category: 'Gizmo Engineering',
      eraSlug: 'artificial-intelligence',
      authorName: 'Prof. Siddharth Chatterjee & Dr. Ananya Bose',
      authorRole: 'Lead Systems Architects, Open-Silicon Gizmo Lab',
      coverImage: 'assets/gizmo_industrial_mural.jpg',
      excerpt: 'A new breed of pocketable engineering gizmos combines sunlight-readable transflective displays, tactile mechanical thumb-keyboards, software-defined radio transceivers, and 45-TOPS edge neural engines that run completely offline.',
      isGizmo: true,
      isFeatured: false,
      reviewScore: 9.9,
      wordCount: 1310,
      charCount: 8920,
      readMinutes: 13,
      views: 21340,
      likes: 1940,
      fontFamily: 'Merriweather, serif',
      fontSize: '1.12rem',
      fontColor: 'inherit',
      textAlign: 'justify',
      tags: ['Gizmo Engineering', 'RISC-V', 'Handheld Hardware', 'Edge AI', 'Long-Form'],
      publishedAt: '2026-10-24T08:45:00Z',
      i18nTitle: {
        bn: 'পকেট লজিক অ্যানালাইজার থেকে সার্বভৌম নিউরাল গিজমো: ওপেন-সিলিকন হ্যান্ডহেল্ড বিপ্লব',
        hi: 'पॉकेट लॉजिक एनालाइज़र से लेकर न्यूरल गिज़्मो तक: ओपन-सिलिकॉन हैंडहेल्ड क्रांति',
        fr: 'Des Analyseurs Logiques de Poche aux Gizmos Neuronaux : La Révolution RISC-V',
        es: 'De Analizadores Lógicos de Bolsillo a Gizmos Neuronales: La Revolución RISC-V',
        de: 'Von Taschen-Logikanalysatoren zu neuronalen Gizmos: Die Open-Silicon-Revolution',
        zh: '从口袋逻辑分析仪到主权神经极客装置（Gizmo）：开源硅芯片掌上设备革命长文',
        ja: 'ポケット論理アナライザから自律型ニューラル・ギズモ（Gizmo）へ：オープンシリコン革命',
        ru: 'От карманных логических анализаторов до нейронных гизмо: Революция открытого кремния'
      },
      contentHtml: `
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
      `
    },
    {
      id: 8,
      slug: 'brass-analytical-looms-to-point-contact-transistors',
      title: 'From Brass Analytical Looms to Point-Contact Germanium: Tracing the Lineage of Deterministic Machines',
      subtitle: 'How Jacquard’s punched-card silk looms, Babbage’s mill-and-store architecture, and the 1947 Bell Labs transistor forged the bedrock of the digital world.',
      category: 'Industrial Heritage',
      eraSlug: 'industrial-revolution',
      authorName: 'Dr. Julian Vance',
      authorRole: 'Historian of Computing & Cybernetics',
      coverImage: 'assets/gizmo_industrial_mural.jpg',
      excerpt: 'Before photolithography etched billions of gates onto silicon, the separation of memory ("the Store") and central processor ("the Mill") was born in precision brass clockwork.',
      isGizmo: false,
      isFeatured: false,
      reviewScore: 9.3,
      wordCount: 510,
      charCount: 3290,
      readMinutes: 5,
      views: 11450,
      likes: 830,
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.08rem',
      fontColor: 'inherit',
      textAlign: 'left',
      tags: ['Industrial Revolution', 'Transistor', 'Computing History', 'Babbage'],
      publishedAt: '2026-10-22T15:10:00Z',
      i18nTitle: {
        bn: 'পিতলের অ্যানালিটিক্যাল তাঁত থেকে পয়েন্ট-কন্টাক্ট ট্রানজিস্টর: যান্ত্রিক কম্পিউটিংয়ের ইতিহাস',
        hi: 'पीतल के एनालिटिकल करघे से लेकर ट्रांजिस्टर तक: आधुनिक कंप्यूटिंग की ऐतिहासिक यात्रा',
        fr: 'Des Métiers Jacquard en Laiton aux Transistors au Germanium : La Lignée des Machines',
        es: 'De los Telares Analíticos de Latón al Transistor de Germanio: Historia de la Computación',
        de: 'Von mechanischen Messing-Webstühlen zum Transistor: Die Wurzeln des Rechnens',
        zh: '从黄铜分析织机到点接触晶体管：追溯确定性计算机器的百年血脉',
        ja: '真鍮の解析機関から点接触トランジスタへ：決定論的計算機の系譜をたどる',
        ru: 'От латунных аналитических станков до точечного транзистора: Родословная машин'
      },
      contentHtml: `
        <p>Every modern microprocessor still honors the exact architectural division conceived in the 1830s during the height of the Industrial Revolution: a separate memory bank ("the Store"), an arithmetic execution unit ("the Mill"), and conditional branching controlled by perforated instruction cards inspired by Joseph Marie Jacquard’s silk loom.</p>
        <h2>From Mechanical Inertia to Solid-State Electrons</h2>
        <p>While brass gears proved that universal computation is independent of its physical substrate, mechanical inertia limited clock speeds to a few operations per second. The December 1947 breakthrough in solid-state semiconductor physics—replacing heated vacuum filaments with point-contact germanium and planar silicon transistors—unleashed a trillion-fold acceleration in switching velocity.</p>
      `
    }
  ],
  contact: {
    newsroomEmail: 'editorial@fingadget.tech',
    pressEmail: 'symposium-press@fingadget.tech',
    secureTipLine: 'Signal / Keybase: +1 (415) 890-FNGD',
    hqLocation: 'Fingadget Global Media Tower • Sector V Salt Lake, Kolkata & Pier 27, San Francisco',
    phoneNumber: '+1 (415) 890-3643 • +91 33 4092 8810',
    officeHours: '24/7 Global Newsroom • Live Symposium Coverage Desk'
  },
  comments: [
    {
      id: 501,
      postId: 2,
      readerName: 'Dr. Vikramjit Mukherjee',
      readerText: 'The oscilloscope breakdown of the 300-micron piezoelectric ceramic actuator stack and the 80 Gbps expanded-beam optical coupler is one of the clearest hardware teardowns I have ever read.',
      createdAt: '2026-10-30T10:15:00Z'
    },
    {
      id: 502,
      postId: 1,
      readerName: 'ophie Laurent (CERN Fellow)',
      readerText: 'Was in the third row at Palexpo during the 4,096-qubit demonstration—the cryo-CMOS multiplexer telemetry was rock solid.',
      createdAt: '2026-10-30T15:05:00Z'
    }
  ],
  bookmarks: [2],
  auditLogs: [
    {
      id: 1,
      actor: 'system',
      action: 'INITIALIZE_PLATFORM',
      entity: 'fngdgt_database',
      description: 'Seeded all fngdgt_ tables, views, 8 technology eras, 9 languages, and editorial articles.',
      createdAt: '2026-10-30T08:00:00Z'
    }
  ]
};

// 3. RUNTIME APPLICATION STATE
let fngdgtState = null;
let fngdgtRuntime = {
  searchQuery: '',
  selectedCategory: 'ALL',
  selectedEra: 'ALL',
  selectedFormat: 'ALL',
  sortBy: 'latest',
  viewMode: 'grid',
  itemsPerPage: 4,
  currentPage: 1,
  activePostId: null,
  isSpeaking: false,
  readerFontScale: 100,
  isAdminLoggedIn: false,
  activeAdminTab: 'posts',
  editingPostId: null
};

// Safe LocalStorage Load & Save
function fngdgtLoadState() {
  try {
    const raw = localStorage.getItem(FNGDGT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.settings && Array.isArray(parsed.posts) && Array.isArray(parsed.eras)) {
        fngdgtState = parsed;
        return;
      }
    }
  } catch (err) {
    console.warn('Local storage fallback used.');
  }
  fngdgtState = JSON.parse(JSON.stringify(FNGDGT_DEFAULT_STATE));
  fngdgtSaveState();
}

function fngdgtSaveState() {
  try {
    localStorage.setItem(FNGDGT_STORAGE_KEY, JSON.stringify(fngdgtState));
  } catch (err) {
    console.warn('Could not persist to localStorage.');
  }
}

// Sync with Netlify Serverless Function + NeonDB when hosted on Netlify
async function fngdgtSyncWithBackend(resourcePath, method = 'GET', payload = null, customHeaders = {}) {
  try {
    const apiBase = window.location.origin && window.location.origin.startsWith('http')
      ? window.location.origin + '/api/' + resourcePath
      : null;
    if (!apiBase) return null;
    const opts = {
      method,
      headers: Object.assign({ 'Content-Type': 'application/json' }, customHeaders)
    };
    if (payload && method !== 'GET') {
      opts.body = JSON.stringify(payload);
    }
    const resp = await fetch(apiBase, opts);
    if (!resp.ok) return null;
    return await resp.json();
  } catch (e) {
    return null;
  }
}

// Log every Admin or User state change into persistent fngdgt_audit_logs
function fngdgtRecordAudit(actor, action, entity, description) {
  const entry = {
    id: Date.now(),
    actor: actor || 'admin',
    action,
    entity,
    description,
    createdAt: new Date().toISOString()
  };
  fngdgtState.auditLogs.unshift(entry);
  if (fngdgtState.auditLogs.length > 100) {
    fngdgtState.auditLogs.pop();
  }
  fngdgtSaveState();
  if (fngdgtRuntime.isAdminLoggedIn) {
    fngdgtRenderAdminAuditLogs();
  }
}

// Translation Helper
function fngdgtT(key) {
  const lang = (fngdgtState && fngdgtState.settings && fngdgtState.settings.activeLanguage) || 'en';
  const dict = FNGDGT_TRANSLATIONS[lang] || FNGDGT_TRANSLATIONS.en;
  return dict[key] || FNGDGT_TRANSLATIONS.en[key] || key;
}

function fngdgtTranslateCategory(cat) {
  const lang = (fngdgtState && fngdgtState.settings && fngdgtState.settings.activeLanguage) || 'en';
  if (FNGDGT_CATEGORY_I18N[cat] && FNGDGT_CATEGORY_I18N[cat][lang]) {
    return FNGDGT_CATEGORY_I18N[cat][lang];
  }
  return cat;
}

function fngdgtGetLocalizedPostTitle(post) {
  const lang = (fngdgtState && fngdgtState.settings && fngdgtState.settings.activeLanguage) || 'en';
  if (lang !== 'en' && post.i18nTitle && post.i18nTitle[lang]) {
    return post.i18nTitle[lang];
  }
  return post.title;
}

// Toast Notification Utility (Sandbox-safe, replaces alert())
function fngdgtShowToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  const borderClass = type === 'success' ? 'border-emerald-400/60' : type === 'warning' ? 'border-amber-400/60' : 'border-cyan-400/60';
  toast.className = `surface-card ${borderClass} border px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium transition-all duration-300 max-w-md`;
  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full era-accent-bg shrink-0"></span>
    <span class="flex-1">${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, 3400);
}

// 4. APPLY DYNAMIC ERA THEME, COLOR MODE & AMBIENT MURAL
function fngdgtApplyThemeAndEra() {
  const settings = fngdgtState.settings;
  const activeEra = fngdgtState.eras.find(e => e.slug === settings.activeEraSlug) || fngdgtState.eras[0];

  const root = document.documentElement;
  if (activeEra) {
    root.style.setProperty('--era-primary', activeEra.primaryAccent || '#00F2FE');
    root.style.setProperty('--era-secondary', activeEra.secondaryAccent || '#8B5CF6');
    root.style.setProperty('--era-bg-tint', activeEra.bgTint || '#070B19');
  }

  if (settings.colorMode === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  const ambientMural = document.getElementById('ambientMuralLayer');
  if (ambientMural && activeEra) {
    ambientMural.style.backgroundImage = `url("${activeEra.bannerImage}")`;
  }

  // Update Header Brand & Breaking Ribbon
  const brandTitleEl = document.getElementById('siteBrandTitle');
  if (brandTitleEl) brandTitleEl.textContent = settings.siteTitle || 'Fingadget';

  const taglineEl = document.getElementById('siteBrandTagline');
  if (taglineEl) taglineEl.textContent = settings.siteTagline || '';

  const ribbonTextEl = document.getElementById('breakingRibbonText');
  if (ribbonTextEl) ribbonTextEl.textContent = settings.breakingRibbon || '';

  const langSelect = document.getElementById('headerLanguageSelect');
  if (langSelect) langSelect.value = settings.activeLanguage || 'en';

  const adminLangSelect = document.getElementById('adminGlobalLangSelect');
  if (adminLangSelect) adminLangSelect.value = settings.activeLanguage || 'en';

  // Render Era Banner
  const eraBannerSection = document.getElementById('eraBannerSection');
  if (eraBannerSection && activeEra) {
    eraBannerSection.style.display = settings.showEraBanner ? 'block' : 'none';
    const eraImg = document.getElementById('activeEraBannerImg');
    if (eraImg) eraImg.src = activeEra.bannerImage;
    const eraPeriod = document.getElementById('activeEraYearsBadge');
    if (eraPeriod) eraPeriod.textContent = `${activeEra.name} (${activeEra.years})`;
    const eraTitle = document.getElementById('activeEraBannerTitle');
    if (eraTitle) eraTitle.textContent = activeEra.bannerTitle;
    const eraSub = document.getElementById('activeEraBannerSubtitle');
    if (eraSub) eraSub.textContent = activeEra.bannerSubtitle;
    const eraCaption = document.getElementById('activeEraMuralCaption');
    if (eraCaption) eraCaption.textContent = activeEra.muralCaption || '';
  }
}

// 5. APPLY STATIC UI TRANSLATIONS
function fngdgtApplyTranslationsToDOM() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = fngdgtT(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', fngdgtT(key));
  });
  const bookmarkCountEl = document.getElementById('headerBookmarkCount');
  if (bookmarkCountEl) {
    bookmarkCountEl.textContent = String(fngdgtState.bookmarks.length);
  }
}

// 6. RENDER HERO BENTO GRID (Top Featured Articles)
function fngdgtRenderHeroBento() {
  const container = document.getElementById('heroBentoContainer');
  if (!container) return;

  const featuredPosts = fngdgtState.posts.filter(p => p.isFeatured);
  const leadPost = featuredPosts[0] || fngdgtState.posts[0];
  const sidePosts = featuredPosts.slice(1, 3).concat(fngdgtState.posts.filter(p => p.id !== (leadPost && leadPost.id))).slice(0, 2);

  if (!leadPost) {
    container.innerHTML = '';
    return;
  }

  const isLeadSaved = fngdgtState.bookmarks.includes(leadPost.id);

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <!-- Lead Cover Story (7 cols) -->
      <article class="lg:col-span-7 surface-card era-border-glow overflow-hidden flex flex-col justify-between group relative">
        <div class="relative h-64 sm:h-80 overflow-hidden">
          <img src="${leadPost.coverImage}" alt="${fngdgtGetLocalizedPostTitle(leadPost)}" class="w-full h-full object-cover max-w-full transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"></div>
          <div class="absolute top-4 left-4 flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider era-accent-bg shadow">${fngdgtT('heroBadge')}</span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/85 text-emerald-700 border border-emerald-500/35">${fngdgtTranslateCategory(leadPost.category)}</span>
            ${leadPost.isGizmo ? `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-800 border border-amber-400/40">${fngdgtT('gizmoBadge')}</span>` : ''}
          </div>
          ${leadPost.reviewScore ? `
          <div class="absolute top-4 right-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm border border-amber-500/45 flex flex-col items-center justify-center">
            <span class="text-xs font-extrabold text-emerald-700">${leadPost.reviewScore}</span>
            <span class="text-[9px] uppercase tracking-tighter text-slate-600">SCORE</span>
          </div>` : ''}
        </div>

        <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight mb-3 cursor-pointer hover:text-emerald-700 transition-colors" onclick="fngdgtOpenArticleModal(${leadPost.id})">
              ${fngdgtGetLocalizedPostTitle(leadPost)}
            </h1>
            <p class="text-sm sm:text-base text-slate-700 line-clamp-3 mb-5">${leadPost.subtitle || leadPost.excerpt}</p>
          </div>

          <div class="pt-4 border-t border-emerald-900/15 flex flex-wrap items-center justify-between gap-4">
            <div class="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
              <span class="font-semibold text-slate-800">${leadPost.authorName}</span>
              <span>•</span>
              <span>${leadPost.readMinutes} ${fngdgtT('minReadLabel')}</span>
              <span>•</span>
              <span>${leadPost.wordCount} ${fngdgtT('wordsLabel')}</span>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="fngdgtToggleBookmark(${leadPost.id})" class="px-3.5 py-2 rounded-lg text-xs font-semibold border border-emerald-700/25 hover:border-emerald-600 transition-colors">
                ${isLeadSaved ? '★ ' + fngdgtT('bookmarked') : '☆ ' + fngdgtT('bookmarkStory')}
              </button>
              <button type="button" onclick="fngdgtOpenArticleModal(${leadPost.id})" class="px-4 py-2 rounded-lg text-xs font-bold era-accent-bg hover:opacity-95 transition-opacity">
                ${fngdgtT('readFullStory')} →
              </button>
            </div>
          </div>
        </div>
      </article>

      <!-- Secondary Featured Stack (5 cols) -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        ${sidePosts.map(post => `
          <article class="surface-card era-border-glow overflow-hidden flex-1 flex flex-col sm:flex-row lg:flex-col xl:flex-row group">
            <div class="sm:w-48 lg:w-full xl:w-48 h-48 sm:h-auto lg:h-44 xl:h-auto relative shrink-0 overflow-hidden">
              <img src="${post.coverImage}" alt="${fngdgtGetLocalizedPostTitle(post)}" class="w-full h-full object-cover max-w-full transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute top-3 left-3 flex gap-1.5">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-sm shadow-sm text-emerald-700 border border-emerald-500/35">${fngdgtTranslateCategory(post.category)}</span>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-2 mb-1.5">
                  ${post.isGizmo ? `<span class="text-[11px] font-bold uppercase tracking-wider text-amber-700">✦ ${fngdgtT('gizmoBadge')}</span>` : `<span class="text-[11px] font-semibold uppercase tracking-wider text-slate-600">${post.authorName}</span>`}
                </div>
                <h2 class="text-base sm:text-lg font-bold leading-snug mb-2 cursor-pointer hover:text-emerald-700 transition-colors" onclick="fngdgtOpenArticleModal(${post.id})">
                  ${fngdgtGetLocalizedPostTitle(post)}
                </h2>
                <p class="text-xs text-slate-600 line-clamp-2 mb-3">${post.excerpt}</p>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-emerald-900/15 text-xs text-slate-600">
                <span>${post.readMinutes} ${fngdgtT('minReadLabel')} • ${post.wordCount} ${fngdgtT('wordsLabel')}</span>
                <button type="button" onclick="fngdgtOpenArticleModal(${post.id})" class="font-bold text-emerald-700 hover:underline">
                  ${fngdgtT('readFullStory')} →
                </button>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}

// 7. RENDER QUICK-READS DISPATCH STRIP
function fngdgtRenderQuickReads() {
  const container = document.getElementById('quickReadsGrid');
  if (!container) return;

  container.innerHTML = fngdgtState.quickReads.map(qr => `
    <div class="surface-card era-border-glow p-5 flex flex-col justify-between relative overflow-hidden">
      <!-- Subtle decorative SVG clip-art corner -->
      <svg class="w-16 h-16 absolute -right-3 -bottom-3 opacity-10 pointer-events-none" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="32" cy="32" r="14" stroke="currentColor" stroke-width="2"/>
      </svg>
      <div>
        <div class="flex items-center justify-between gap-2 mb-2.5">
          <span class="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-700 border border-emerald-500/30">${qr.badge || 'Dispatch'}</span>
          <span class="text-[11px] text-slate-600 font-medium">⚡ ${qr.readTime}</span>
        </div>
        <h3 class="text-sm sm:text-base font-bold leading-snug mb-2">${qr.title}</h3>
        <p class="text-xs text-slate-600 leading-relaxed">${qr.summary}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-emerald-900/15 flex items-center justify-between text-[11px] text-slate-600">
        <span>${fngdgtTranslateCategory(qr.category)}</span>
        <button type="button" onclick="fngdgtFilterByEra('${qr.eraSlug}')" class="text-emerald-700 hover:underline font-semibold">
          Explore Era →
        </button>
      </div>
    </div>
  `).join('');
}

// 8. POPULATE FILTER DROPDOWNS & CATEGORY PILLS
function fngdgtRenderFeedControls() {
  const categories = ['ALL', ...Array.from(new Set(fngdgtState.posts.map(p => p.category)))];
  const pillsContainer = document.getElementById('categoryPillsContainer');
  if (pillsContainer) {
    pillsContainer.innerHTML = categories.map(cat => {
      const active = fngdgtRuntime.selectedCategory === cat;
      const label = cat === 'ALL' ? fngdgtT('filterAllCategories') : fngdgtTranslateCategory(cat);
      return `
        <button type="button" onclick="fngdgtSelectCategory('${cat.replace(/'/g, "\\'")}')"
          class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            active
              ? 'era-accent-bg font-bold shadow-md'
              : 'surface-card text-slate-700 hover:border-emerald-500/50'
          }">
          ${label}
        </button>
      `;
    }).join('');
  }

  const eraSelect = document.getElementById('feedEraFilterSelect');
  if (eraSelect) {
    const currentVal = fngdgtRuntime.selectedEra;
    eraSelect.innerHTML = `
      <option value="ALL">${fngdgtT('filterAllEras')}</option>
      ${fngdgtState.eras.map(e => `<option value="${e.slug}">${e.name} (${e.years})</option>`).join('')}
    `;
    eraSelect.value = currentVal;
  }
}

// 9. FILTER, SORT & PAGINATE MAIN BLOG FEED
function fngdgtGetFilteredAndSortedPosts() {
  const q = (fngdgtRuntime.searchQuery || '').trim().toLowerCase();
  let list = fngdgtState.posts.filter(post => {
    if (fngdgtRuntime.selectedCategory !== 'ALL' && post.category !== fngdgtRuntime.selectedCategory) {
      return false;
    }
    if (fngdgtRuntime.selectedEra !== 'ALL' && post.eraSlug !== fngdgtRuntime.selectedEra) {
      return false;
    }
    if (fngdgtRuntime.selectedFormat === 'gizmo' && !post.isGizmo) {
      return false;
    }
    if (fngdgtRuntime.selectedFormat === 'standard' && post.isGizmo) {
      return false;
    }
    if (fngdgtRuntime.selectedFormat === 'toprated' && Number(post.reviewScore || 0) < 9.2) {
      return false;
    }
    if (fngdgtRuntime.selectedFormat === 'bookmarked' && !fngdgtState.bookmarks.includes(post.id)) {
      return false;
    }
    if (q) {
      const haystack = [
        post.title,
        fngdgtGetLocalizedPostTitle(post),
        post.subtitle,
        post.excerpt,
        post.category,
        post.authorName,
        ...(post.tags || [])
      ].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const sortMode = fngdgtRuntime.sortBy;
  list.sort((a, b) => {
    if (sortMode === 'popular') return (b.views || 0) - (a.views || 0);
    if (sortMode === 'rating') return (b.reviewScore || 0) - (a.reviewScore || 0);
    if (sortMode === 'longest') return (b.wordCount || 0) - (a.wordCount || 0);
    if (sortMode === 'shortest') return (a.wordCount || 0) - (b.wordCount || 0);
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return list;
}

function fngdgtRenderBlogFeed() {
  const feedContainer = document.getElementById('mainBlogFeedContainer');
  const paginationContainer = document.getElementById('feedPaginationContainer');
  const countBadge = document.getElementById('feedResultsCountBadge');
  if (!feedContainer || !paginationContainer) return;

  const filtered = fngdgtGetFilteredAndSortedPosts();
  const totalItems = filtered.length;
  const perPage = Number(fngdgtRuntime.itemsPerPage) || 4;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  if (fngdgtRuntime.currentPage > totalPages) {
    fngdgtRuntime.currentPage = totalPages;
  }

  const startIdx = (fngdgtRuntime.currentPage - 1) * perPage;
  const pageItems = filtered.slice(startIdx, startIdx + perPage);

  if (countBadge) {
    countBadge.textContent = `${totalItems} ${totalItems === 1 ? 'Story' : 'Stories'}`;
  }

  if (pageItems.length === 0) {
    feedContainer.className = 'grid grid-cols-1 gap-6';
    feedContainer.innerHTML = `
      <div class="surface-card p-10 text-center">
        <p class="text-base text-slate-700 mb-4">${fngdgtT('noResults')}</p>
        <button type="button" onclick="fngdgtResetAllFilters()" class="px-5 py-2.5 rounded-xl text-xs font-bold era-accent-bg">
          ${fngdgtT('resetFilters')}
        </button>
      </div>
    `;
    paginationContainer.innerHTML = '';
    return;
  }

  const isList = fngdgtRuntime.viewMode === 'list';
  feedContainer.className = isList
    ? 'flex flex-col gap-5'
    : 'grid grid-cols-1 md:grid-cols-2 gap-6';

  feedContainer.innerHTML = pageItems.map(post => {
    const isSaved = fngdgtState.bookmarks.includes(post.id);
    const eraObj = fngdgtState.eras.find(e => e.slug === post.eraSlug);
    const eraLabel = eraObj ? eraObj.name : post.eraSlug;

    return `
      <article class="surface-card era-border-glow overflow-hidden flex ${isList ? 'flex-col md:flex-row' : 'flex-col'} justify-between group">
        <div class="${isList ? 'md:w-72 h-52 md:h-auto' : 'h-56'} relative overflow-hidden shrink-0">
          <img src="${post.coverImage}" alt="${fngdgtGetLocalizedPostTitle(post)}" class="w-full h-full object-cover max-w-full transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-sm shadow-sm text-emerald-700 border border-emerald-500/35">${fngdgtTranslateCategory(post.category)}</span>
            ${post.isGizmo ? `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-800 border border-amber-400/40">✦ ${fngdgtT('gizmoBadge')}</span>` : ''}
          </div>
          ${post.reviewScore ? `
            <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-white/90 backdrop-blur-sm shadow-sm text-emerald-700 border border-amber-500/45">
              ★ ${post.reviewScore}
            </span>
          ` : ''}
        </div>

        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 text-xs text-slate-600 mb-2">
              <span class="font-medium text-emerald-700">${eraLabel}</span>
              <span>${post.readMinutes} ${fngdgtT('minReadLabel')} • ${post.wordCount} ${fngdgtT('wordsLabel')}</span>
            </div>
            <h3 class="text-lg sm:text-xl font-bold leading-snug mb-2.5 cursor-pointer hover:text-emerald-700 transition-colors" onclick="fngdgtOpenArticleModal(${post.id})">
              ${fngdgtGetLocalizedPostTitle(post)}
            </h3>
            <p class="text-sm text-slate-700 line-clamp-3 mb-4">${post.excerpt}</p>
          </div>

          <div>
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${(post.tags || []).slice(0, 4).map(t => `<span class="px-2 py-0.5 rounded text-[11px] bg-emerald-50/80 text-slate-700">#${t}</span>`).join('')}
            </div>

            <div class="pt-3 border-t border-emerald-900/15 flex items-center justify-between gap-2">
              <div class="text-xs text-slate-600">
                <span class="font-semibold text-slate-800">${post.authorName}</span>
                <span class="ml-2">👁 ${post.views.toLocaleString()}</span>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="fngdgtLikePost(${post.id})" class="px-2.5 py-1.5 rounded-lg text-xs border border-emerald-700/25 hover:border-pink-400 text-slate-700 transition-colors">
                  ♥ ${post.likes || 0}
                </button>
                <button type="button" onclick="fngdgtToggleBookmark(${post.id})" class="px-2.5 py-1.5 rounded-lg text-xs border border-emerald-700/25 hover:border-emerald-600 text-slate-700 transition-colors">
                  ${isSaved ? '★' : '☆'}
                </button>
                <button type="button" onclick="fngdgtOpenArticleModal(${post.id})" class="px-3.5 py-1.5 rounded-lg text-xs font-bold era-accent-bg">
                  ${fngdgtT('readFullStory')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Render Pagination Controls
  let pageButtons = '';
  for (let p = 1; p <= totalPages; p++) {
    const active = p === fngdgtRuntime.currentPage;
    pageButtons += `
      <button type="button" onclick="fngdgtGoToPage(${p})"
        class="w-9 h-9 rounded-lg text-xs font-bold transition-all ${
          active ? 'era-accent-bg shadow-md' : 'surface-card text-slate-700 hover:border-emerald-600'
        }">
        ${p}
      </button>
    `;
  }

  paginationContainer.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-4 w-full">
      <div class="text-xs text-slate-600">
        Showing <span class="font-bold text-slate-800">${startIdx + 1}–${Math.min(startIdx + perPage, totalItems)}</span> of <span class="font-bold text-slate-800">${totalItems}</span> stories
      </div>
      <div class="flex items-center gap-2">
        <button type="button" onclick="fngdgtGoToPage(${fngdgtRuntime.currentPage - 1})"
          ${fngdgtRuntime.currentPage <= 1 ? 'disabled' : ''}
          class="px-3.5 py-2 rounded-lg text-xs font-semibold surface-card disabled:opacity-40 hover:border-emerald-600">
          ← ${fngdgtT('prevPage')}
        </button>
        <div class="flex items-center gap-1.5">${pageButtons}</div>
        <button type="button" onclick="fngdgtGoToPage(${fngdgtRuntime.currentPage + 1})"
          ${fngdgtRuntime.currentPage >= totalPages ? 'disabled' : ''}
          class="px-3.5 py-2 rounded-lg text-xs font-semibold surface-card disabled:opacity-40 hover:border-emerald-600">
          ${fngdgtT('nextPage')} →
        </button>
      </div>
    </div>
  `;
}

// 10. RENDER TECH ERA EXPLORER CARDS
function fngdgtRenderEraExplorer() {
  const container = document.getElementById('eraExplorerGrid');
  if (!container) return;

  const activeSlug = fngdgtState.settings.activeEraSlug;

  container.innerHTML = fngdgtState.eras.map(era => {
    const isCurrent = era.slug === activeSlug;
    return `
      <div class="surface-card era-border-glow overflow-hidden flex flex-col justify-between ${isCurrent ? 'ring-2 ring-emerald-500' : ''}">
        <div class="h-36 relative overflow-hidden">
          <img src="${era.bannerImage}" alt="${era.name}" class="w-full h-full object-cover max-w-full" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-sm shadow-sm text-slate-800 border border-emerald-700/25">
            ${era.years}
          </span>
          <span class="w-4 h-4 rounded-full absolute top-3 right-3 border border-white/50" style="background:${era.primaryAccent}"></span>
        </div>
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-sm font-bold mb-1">${era.name}</h3>
            <p class="text-xs text-slate-600 line-clamp-2 mb-3">${era.bannerTitle}</p>
          </div>
          <div class="flex items-center gap-2 pt-2 border-t border-emerald-900/15">
            <button type="button" onclick="fngdgtActivateEraTheme('${era.slug}')"
              class="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                isCurrent ? 'era-accent-bg' : 'border border-emerald-700/25 hover:border-emerald-600 text-slate-800'
              }">
              ${isCurrent ? '✓ ' + fngdgtT('activeEraBadge') : fngdgtT('activateEraBtn')}
            </button>
            <button type="button" onclick="fngdgtFilterByEra('${era.slug}')"
              class="py-1.5 px-2.5 rounded-lg text-xs border border-emerald-700/25 hover:border-emerald-600 text-slate-700" title="Filter feed by this era">
              Stories
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 11. RENDER CAPTIVATING HD MURALS & SVG CLIP-ART GALLERY
function fngdgtRenderMuralsGallery() {
  const container = document.getElementById('muralsShowcaseGrid');
  if (!container) return;

  const murals = [
    {
      title: 'Geneva & Tokyo Laser Symposium Auditorium',
      category: 'Tech Conferences & Laser Shows',
      image: 'assets/summit_laser.jpg',
      desc: 'Coherent cyan and violet laser arrays illuminating volumetric holographic stages at global technology summits.'
    },
    {
      title: 'Anodized Titanium & Spatial Optics Studio',
      category: 'Apple & Personal Computing Craft',
      image: 'assets/apple_spatial.jpg',
      desc: 'Precision-milled aluminum workstation and micro-OLED binocular spatial visor in a minimalist slate studio.'
    },
    {
      title: 'Orbital Solar-Electric Station & Ion Horizon',
      category: 'Deep Space & Orbital Engineering',
      image: 'assets/space_station.jpg',
      desc: 'Next-generation orbital research outpost with solar-electric propulsion arrays suspended above Earth’s limb.'
    },
    {
      title: 'Cryogenic Quantum Chandelier & Subatomic Trails',
      category: 'Subatomic Particles & Quantum Physics',
      image: 'assets/quantum_subatomic.jpg',
      desc: 'Golden dilution refrigerator core surrounded by wave-particle interference rings and collider trajectories.'
    },
    {
      title: 'Sub-Angstrom Photolithography Silicon Wafer',
      category: 'Silicon Chips & Integrated Circuits',
      image: 'assets/silicon_wafer.jpg',
      desc: 'Extreme macro view of iridescent nano-interconnect pathways etched onto mono-crystalline silicon.'
    },
    {
      title: 'Yantra Mandala & Brass Clockwork Automaton',
      category: 'Gizmo Cybernetics & Industrial Heritage',
      image: 'assets/gizmo_industrial_mural.jpg',
      desc: 'Museum mural uniting Babbage-era brass differential gears with precision gizmo geometric symmetry and fiber optics.'
    }
  ];

  container.innerHTML = murals.map((m, idx) => `
    <div class="surface-card era-border-glow overflow-hidden group flex flex-col">
      <div class="h-52 relative overflow-hidden">
        <img src="${m.image}" alt="${m.title}" class="w-full h-full object-cover max-w-full transition-transform duration-700 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        <span class="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 backdrop-blur-sm shadow-sm text-emerald-700 border border-emerald-500/35">
          ${m.category}
        </span>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-sm font-bold mb-1">${m.title}</h3>
          <p class="text-xs text-slate-600">${m.desc}</p>
        </div>
        <div class="mt-3 pt-2.5 border-t border-emerald-900/15 flex items-center justify-between text-[11px] text-slate-600">
          <span>Ultra-HD Editorial Plate #0${idx + 1}</span>
          <button type="button" onclick="fngdgtSetAmbientMural('${m.image}', '${m.title.replace(/'/g, "\\'")}')" class="text-emerald-700 hover:underline font-semibold">
            Set as Subtle Backdrop
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// 12. RENDER NEWSROOM CONTACT SECTION
function fngdgtRenderContactSection() {
  const container = document.getElementById('contactDetailsContainer');
  if (!container) return;
  const c = fngdgtState.contact;
  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="surface-card p-5 era-border-glow">
        <div class="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Editorial & Hardware Lab</div>
        <div class="text-sm font-bold text-slate-900 break-all mb-1">${c.newsroomEmail}</div>
        <div class="text-xs text-slate-600">Press & Embargoes: ${c.pressEmail}</div>
      </div>
      <div class="surface-card p-5 era-border-glow">
        <div class="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Global Bureaus & Bureaus HQ</div>
        <div class="text-sm font-semibold text-slate-900 mb-1">${c.hqLocation}</div>
        <div class="text-xs text-slate-600">${c.officeHours}</div>
      </div>
      <div class="surface-card p-5 era-border-glow">
        <div class="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Symposium Desk & Tip Line</div>
        <div class="text-sm font-semibold text-slate-900 mb-1">${c.phoneNumber}</div>
        <div class="text-xs text-slate-600">${c.secureTipLine}</div>
      </div>
    </div>
  `;
}

// 13. ARTICLE READER MODAL (Supports Long-Form Gizmo Typography, Audio TTS, Font Scaling & Comments)
function fngdgtOpenArticleModal(postId) {
  const post = fngdgtState.posts.find(p => p.id === Number(postId));
  if (!post) return;

  fngdgtRuntime.activePostId = post.id;
  post.views = (post.views || 0) + 1;
  fngdgtSaveState();

  const modal = document.getElementById('articleReaderModal');
  const contentBox = document.getElementById('articleReaderBody');
  if (!modal || !contentBox) return;

  const eraObj = fngdgtState.eras.find(e => e.slug === post.eraSlug);
  const isSaved = fngdgtState.bookmarks.includes(post.id);

  contentBox.innerHTML = `
    <div class="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6">
      <img src="${post.coverImage}" alt="${fngdgtGetLocalizedPostTitle(post)}" class="w-full h-full object-cover max-w-full" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      <div class="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-bold era-accent-bg">${fngdgtTranslateCategory(post.category)}</span>
          ${post.isGizmo ? `<span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/25 text-amber-800 border border-amber-400/40">✦ ${fngdgtT('gizmoBadge')}</span>` : ''}
          ${eraObj ? `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-800">${eraObj.name}</span>` : ''}
        </div>
        ${post.reviewScore ? `<span class="px-3 py-1 rounded-xl text-sm font-extrabold bg-white/90 backdrop-blur-sm shadow-sm text-emerald-700 border border-amber-500/45">Score: ${post.reviewScore} / 10</span>` : ''}
      </div>
    </div>

    <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3">
      ${fngdgtGetLocalizedPostTitle(post)}
    </h1>
    <p class="text-base sm:text-lg text-slate-700 mb-5">${post.subtitle || post.excerpt}</p>

    <!-- Reader Metadata & Utility Toolbar -->
    <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-900/15 flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="text-xs text-slate-700">
        <div class="font-bold text-slate-900">${post.authorName} — <span class="text-emerald-700 font-normal">${post.authorRole || 'Editorial Desk'}</span></div>
        <div class="text-slate-600 mt-0.5">${post.wordCount} ${fngdgtT('wordsLabel')} • ${post.charCount} chars • ${post.readMinutes} ${fngdgtT('minReadLabel')} • ${post.views.toLocaleString()} ${fngdgtT('viewsLabel')}</div>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button type="button" onclick="fngdgtAdjustReaderFont(-8)" class="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-emerald-700/25 hover:border-emerald-600">A-</button>
        <button type="button" onclick="fngdgtAdjustReaderFont(8)" class="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-emerald-700/25 hover:border-emerald-600">A+</button>
        <button type="button" id="readerTtsBtn" onclick="fngdgtToggleArticleSpeech()" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-700/25 hover:border-emerald-600">
          🔊 ${fngdgtT('readerListen')}
        </button>
        <button type="button" onclick="fngdgtToggleBookmark(${post.id}); fngdgtOpenArticleModal(${post.id});" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-700/25 hover:border-emerald-600">
          ${isSaved ? '★ ' + fngdgtT('bookmarked') : '☆ ' + fngdgtT('bookmarkStory')}
        </button>
      </div>
    </div>

    <!-- ArticleFormatted Body -->
    <div id="readerFormattedProse" class="editorial-prose mb-8"
      style="font-family:${post.fontFamily || 'Inter, sans-serif'}; font-size:${post.fontSize || '1.08rem'}; color:${post.fontColor || 'inherit'}; text-align:${post.textAlign || 'left'};">
      ${post.contentHtml}
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 pb-6 mb-6 border-b border-emerald-900/15">
      ${(post.tags || []).map(tag => `<span class="px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700">#${tag}</span>`).join('')}
    </div>

    <!-- Reader Comments Section -->
    <div>
      <h3 class="text-lg font-bold mb-4">${fngdgtT('readerComments')}</h3>
      <div id="articleCommentsList" class="space-y-3 mb-5"></div>
      <form onsubmit="fngdgtSubmitReaderComment(event)" class="surface-card p-4 space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" id="commentReaderName" required placeholder="Your Name / Handle" class="w-full px-3.5 py-2 rounded-lg bg-white border border-emerald-700/25 text-sm text-slate-900" />
          <input type="text" id="commentReaderBody" required placeholder="Share your technical or philosophical perspective..." class="w-full px-3.5 py-2 rounded-lg bg-white border border-emerald-700/25 text-sm text-slate-900" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 rounded-lg text-xs font-bold era-accent-bg">${fngdgtT('postCommentBtn')}</button>
        </div>
      </form>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  fngdgtRenderArticleComments(post.id);
  fngdgtRenderBlogFeed();
}

function fngdgtCloseArticleModal() {
  if (window.speechSynthesis && fngdgtRuntime.isSpeaking) {
    window.speechSynthesis.cancel();
    fngdgtRuntime.isSpeaking = false;
  }
  const modal = document.getElementById('articleReaderModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function fngdgtAdjustReaderFont(delta) {
  fngdgtRuntime.readerFontScale = Math.min(145, Math.max(80, fngdgtRuntime.readerFontScale + delta));
  const prose = document.getElementById('readerFormattedProse');
  if (prose) {
    prose.style.fontSize = `${(fngdgtRuntime.readerFontScale / 100) * 1.08}rem`;
  }
}

function fngdgtToggleArticleSpeech() {
  if (!('speechSynthesis' in window)) {
    fngdgtShowToast('Speech synthesis is not supported in this browser.', 'warning');
    return;
  }
  const btn = document.getElementById('readerTtsBtn');
  if (fngdgtRuntime.isSpeaking) {
    window.speechSynthesis.cancel();
    fngdgtRuntime.isSpeaking = false;
    if (btn) btn.innerHTML = `🔊 ${fngdgtT('readerListen')}`;
    return;
  }
  const prose = document.getElementById('readerFormattedProse');
  if (!prose) return;
  const utterance = new SpeechSynthesisUtterance(prose.innerText.slice(0, 4000));
  utterance.onend = () => {
    fngdgtRuntime.isSpeaking = false;
    if (btn) btn.innerHTML = `🔊 ${fngdgtT('readerListen')}`;
  };
  window.speechSynthesis.speak(utterance);
  fngdgtRuntime.isSpeaking = true;
  if (btn) btn.innerHTML = `⏹ ${fngdgtT('readerStopListen')}`;
}

function fngdgtRenderArticleComments(postId) {
  const listEl = document.getElementById('articleCommentsList');
  if (!listEl) return;
  const items = fngdgtState.comments.filter(c => Number(c.postId) === Number(postId));
  if (items.length === 0) {
    listEl.innerHTML = `<p class="text-xs text-slate-600 italic">Be the first reader to start a discussion on this dispatch.</p>`;
    return;
  }
  listEl.innerHTML = items.map(c => `
    <div class="p-3.5 rounded-xl bg-white/90 border border-emerald-900/15">
      <div class="flex items-center justify-between text-xs mb-1">
        <span class="font-bold text-emerald-700">${c.readerName}</span>
        <span class="text-slate-500">${new Date(c.createdAt).toLocaleDateString()}</span>
      </div>
      <p class="text-xs sm:text-sm text-slate-800">${c.readerText}</p>
    </div>
  `).join('');
}

function fngdgtSubmitReaderComment(e) {
  e.preventDefault();
  const nameInput = document.getElementById('commentReaderName');
  const bodyInput = document.getElementById('commentReaderBody');
  if (!nameInput || !bodyInput || !fngdgtRuntime.activePostId) return;

  const newComment = {
    id: Date.now(),
    postId: fngdgtRuntime.activePostId,
    readerName: nameInput.value.trim(),
    readerText: bodyInput.value.trim(),
    createdAt: new Date().toISOString()
  };
  fngdgtState.comments.unshift(newComment);
  fngdgtRecordAudit('reader', 'ADD_COMMENT', 'fngdgt_comments', `Comment added by ${newComment.readerName} on Post #${newComment.postId}`);
  nameInput.value = '';
  bodyInput.value = '';
  fngdgtRenderArticleComments(fngdgtRuntime.activePostId);
  fngdgtShowToast('Your comment has been published and saved.', 'success');
}

// 14. INTERACTIVE FEED ACTIONS
function fngdgtSelectCategory(category) {
  fngdgtRuntime.selectedCategory = category;
  fngdgtRuntime.currentPage = 1;
  fngdgtRenderFeedControls();
  fngdgtRenderBlogFeed();
}

function fngdgtFilterByEra(eraSlug) {
  fngdgtRuntime.selectedEra = eraSlug;
  fngdgtRuntime.currentPage = 1;
  fngdgtRenderFeedControls();
  fngdgtRenderBlogFeed();
  const feedEl = document.getElementById('feedSectionAnchor');
  if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth' });
}

function fngdgtFilterGizmoOnly() {
  fngdgtRuntime.selectedFormat = 'gizmo';
  fngdgtRuntime.currentPage = 1;
  const formatSelect = document.getElementById('feedFormatFilterSelect');
  if (formatSelect) formatSelect.value = 'gizmo';
  fngdgtRenderBlogFeed();
  const feedEl = document.getElementById('feedSectionAnchor');
  if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth' });
}

function fngdgtFilterBookmarksOnly() {
  fngdgtRuntime.selectedFormat = 'bookmarked';
  fngdgtRuntime.currentPage = 1;
  const formatSelect = document.getElementById('feedFormatFilterSelect');
  if (formatSelect) formatSelect.value = 'bookmarked';
  fngdgtRenderBlogFeed();
  const feedEl = document.getElementById('feedSectionAnchor');
  if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth' });
}

function fngdgtResetAllFilters() {
  fngdgtRuntime.searchQuery = '';
  fngdgtRuntime.selectedCategory = 'ALL';
  fngdgtRuntime.selectedEra = 'ALL';
  fngdgtRuntime.selectedFormat = 'ALL';
  fngdgtRuntime.sortBy = 'latest';
  fngdgtRuntime.currentPage = 1;

  const searchInput = document.getElementById('feedSearchInput');
  if (searchInput) searchInput.value = '';
  const formatSelect = document.getElementById('feedFormatFilterSelect');
  if (formatSelect) formatSelect.value = 'ALL';
  const sortSelect = document.getElementById('feedSortSelect');
  if (sortSelect) sortSelect.value = 'latest';

  fngdgtRenderFeedControls();
  fngdgtRenderBlogFeed();
}

function fngdgtGoToPage(pageNum) {
  fngdgtRuntime.currentPage = Math.max(1, Number(pageNum));
  fngdgtRenderBlogFeed();
}

function fngdgtToggleBookmark(postId) {
  const id = Number(postId);
  const idx = fngdgtState.bookmarks.indexOf(id);
  if (idx >= 0) {
    fngdgtState.bookmarks.splice(idx, 1);
    fngdgtShowToast('Removed from your saved reading list.', 'info');
  } else {
    fngdgtState.bookmarks.push(id);
    fngdgtShowToast('Saved to your personal reading list.', 'success');
  }
  fngdgtSaveState();
  fngdgtApplyTranslationsToDOM();
  fngdgtRenderHeroBento();
  fngdgtRenderBlogFeed();
}

function fngdgtLikePost(postId) {
  const post = fngdgtState.posts.find(p => p.id === Number(postId));
  if (!post) return;
  post.likes = (post.likes || 0) + 1;
  fngdgtSaveState();
  fngdgtRenderBlogFeed();
  fngdgtShowToast(`Appreciated "${post.title.slice(0, 42)}..."`, 'success');
}

function fngdgtActivateEraTheme(eraSlug) {
  const era = fngdgtState.eras.find(e => e.slug === eraSlug);
  if (!era) return;
  fngdgtState.settings.activeEraSlug = eraSlug;
  fngdgtRecordAudit('user', 'CHANGE_ERA_THEME', 'fngdgt_site_settings', `Switched active website theme & banner to: ${era.name}`);
  fngdgtSyncWithBackend('settings', 'PUT', { activeEraSlug: eraSlug });
  fngdgtApplyThemeAndEra();
  fngdgtRenderEraExplorer();
  fngdgtShowToast(`Activated "${era.name}" visual theme & banner.`, 'success');
}

function fngdgtSetAmbientMural(imagePath, title) {
  const ambientMural = document.getElementById('ambientMuralLayer');
  if (ambientMural) {
    ambientMural.style.backgroundImage = `url("${imagePath}")`;
  }
  fngdgtRecordAudit('user', 'SET_MURAL_BACKDROP', 'fngdgt_site_settings', `Set HD backdrop mural to: ${title}`);
  fngdgtShowToast(`Applied "${title}" as subtle HD background mural.`, 'success');
}

function fngdgtChangeGlobalLanguage(langCode) {
  if (!FNGDGT_TRANSLATIONS[langCode]) return;
  fngdgtState.settings.activeLanguage = langCode;
  fngdgtRecordAudit('admin', 'CHANGE_LANGUAGE', 'fngdgt_site_settings', `Translated entire platform into ${FNGDGT_TRANSLATIONS[langCode].langName}`);
  fngdgtSyncWithBackend('settings', 'PUT', { activeLanguage: langCode });
  fngdgtRefreshEntireUI();
  fngdgtShowToast(`Language switched to ${FNGDGT_TRANSLATIONS[langCode].langName}.`, 'success');
}

function fngdgtToggleColorMode() {
  fngdgtState.settings.colorMode = fngdgtState.settings.colorMode === 'dark' ? 'light' : 'dark';
  fngdgtRecordAudit('user', 'TOGGLE_COLOR_MODE', 'fngdgt_site_settings', `Switched appearance to ${fngdgtState.settings.colorMode} mode`);
  fngdgtApplyThemeAndEra();
}

// 15. ADMIN AUTHENTICATION & MANAGEMENT SUITE
function fngdgtOpenAdminModal() {
  const modal = document.getElementById('adminPortalModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  fngdgtRenderAdminView();
}

function fngdgtCloseAdminModal() {
  const modal = document.getElementById('adminPortalModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

async function fngdgtHandleAdminLogin(e) {
  e.preventDefault();
  const userEl = document.getElementById('adminLoginUsername');
  const passEl = document.getElementById('adminLoginPassword');
  if (!userEl || !passEl) return;

  const username = userEl.value.trim();
  const password = passEl.value.trim();

  // Verify against Netlify serverless endpoint (/api/auth) which checks process.env.ADMIN_USERNAME & ADMIN_PASSWORD
  const remoteAuth = await fngdgtSyncWithBackend('auth', 'POST', { username, password });
  const localValid = (username === 'admin' && password === 'fingadget2026');

  if ((remoteAuth && remoteAuth.authenticated) || localValid) {
    fngdgtRuntime.isAdminLoggedIn = true;
    fngdgtRecordAudit(username, 'ADMIN_LOGIN', 'fngdgt_auth', 'Administrator authenticated via ADMIN_USERNAME & ADMIN_PASSWORD.');
    fngdgtRenderAdminView();
    fngdgtShowToast('Welcome to the Fingadget Editorial & Backend Control Suite.', 'success');
  } else {
    fngdgtShowToast('Invalid ADMIN_USERNAME or ADMIN_PASSWORD credentials.', 'warning');
  }
}

function fngdgtAdminLogout() {
  fngdgtRuntime.isAdminLoggedIn = false;
  fngdgtRecordAudit('admin', 'ADMIN_LOGOUT', 'fngdgt_auth', 'Administrator signed out of Editorial Desk.');
  fngdgtRenderAdminView();
  fngdgtShowToast('Signed out of Editorial Desk.', 'info');
}

function fngdgtSwitchAdminTab(tabName) {
  fngdgtRuntime.activeAdminTab = tabName;
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-admin-tab') === tabName;
    btn.className = `admin-tab-btn px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
      isTarget ? 'era-accent-bg shadow' : 'bg-emerald-50/80 text-slate-700 hover:bg-emerald-100'
    }`;
  });
  document.querySelectorAll('.admin-tab-panel').forEach(panel => {
    panel.classList.toggle('hidden', panel.id !== `adminTab_${tabName}`);
  });
}

function fngdgtRenderAdminView() {
  const loginBox = document.getElementById('adminLoginGate');
  const dashboardBox = document.getElementById('adminDashboardSuite');
  if (!loginBox || !dashboardBox) return;

  if (!fngdgtRuntime.isAdminLoggedIn) {
    loginBox.classList.remove('hidden');
    dashboardBox.classList.add('hidden');
    return;
  }

  loginBox.classList.add('hidden');
  dashboardBox.classList.remove('hidden');

  fngdgtSwitchAdminTab(fngdgtRuntime.activeAdminTab || 'posts');
  fngdgtPopulateAdminSelects();
  fngdgtRenderAdminPostsList();
  fngdgtRenderAdminQuickReadsList();
  fngdgtRenderAdminErasList();
  fngdgtPopulateAdminSettingsForm();
  fngdgtRenderAdminAuditLogs();
  fngdgtUpdateEditorMetrics();
}

function fngdgtPopulateAdminSelects() {
  const eraSelect = document.getElementById('adminPostEraSelect');
  const qrEraSelect = document.getElementById('adminQrEraSelect');
  if (eraSelect) {
    eraSelect.innerHTML = fngdgtState.eras.map(e => `<option value="${e.slug}">${e.name}</option>`).join('');
  }
  if (qrEraSelect) {
    qrEraSelect.innerHTML = fngdgtState.eras.map(e => `<option value="${e.slug}">${e.name}</option>`).join('');
  }
}

// Rich-Text Editor Formatting Commands (Font, Size, Color, Bold, Italic, Underline, Justify, Quotes, Word/Char Count)
function fngdgtFormatEditor(cmd, val = null) {
  const canvas = document.getElementById('adminEditorCanvas');
  if (!canvas) return;
  canvas.focus();
  document.execCommand(cmd, false, val);
  fngdgtUpdateEditorMetrics();
}

function fngdgtApplyEditorWrapperStyle() {
  const canvas = document.getElementById('adminEditorCanvas');
  if (!canvas) return;
  const fontFam = document.getElementById('adminEditorFontFamily').value;
  const fontSize = document.getElementById('adminEditorFontSize').value;
  const fontColor = document.getElementById('adminEditorFontColor').value;
  const textAlign = document.getElementById('adminEditorTextAlign').value;

  canvas.style.fontFamily = fontFam;
  canvas.style.fontSize = fontSize;
  canvas.style.color = fontColor;
  canvas.style.textAlign = textAlign;
  fngdgtUpdateEditorMetrics();
}

function fngdgtInsertGizmoBlockquote() {
  const canvas = document.getElementById('adminEditorCanvas');
  if (!canvas) return;
  const snippet = `
    <div class="gizmo-verse">
      <strong>⚙️ GIZMO TELEMETRY BENCHMARK // HARDWARE LAB SPEC V4.2</strong><br/>
      <em>"Precision engineering leaves nothing to guesswork: every micro-volt, thermal gradient, and optical path is verified on the bench." — Fingadget Gizmo Lab</em>
    </div>
    <h2>Section Heading: Gizmo Architecture & Hardware Teardown</h2>
    <p>Continue composing your long-form Gizmo and technological treatise here...</p>
  `;
  canvas.innerHTML += snippet;
  fngdgtUpdateEditorMetrics();
}

function fngdgtUpdateEditorMetrics() {
  const canvas = document.getElementById('adminEditorCanvas');
  if (!canvas) return;
  const plain = (canvas.innerText || '').trim();
  const charCount = plain.length;
  const words = plain ? plain.split(/\s+/).filter(Boolean).length : 0;
  const readMins = Math.max(1, Math.ceil(words / 180));

  const wordsEl = document.getElementById('editorLiveWordCount');
  const charsEl = document.getElementById('editorLiveCharCount');
  const minsEl = document.getElementById('editorLiveReadTime');
  if (wordsEl) wordsEl.textContent = String(words);
  if (charsEl) charsEl.textContent = String(charCount);
  if (minsEl) minsEl.textContent = `${readMins} min`;
}

function fngdgtSaveAdminPost(e) {
  e.preventDefault();
  const title = document.getElementById('adminPostTitle').value.trim();
  const subtitle = document.getElementById('adminPostSubtitle').value.trim();
  const category = document.getElementById('adminPostCategory').value;
  const eraSlug = document.getElementById('adminPostEraSelect').value;
  const authorName = document.getElementById('adminPostAuthor').value.trim() || 'Editorial Desk';
  const coverImage = document.getElementById('adminPostCoverImage').value;
  const reviewScore = parseFloat(document.getElementById('adminPostScore').value) || 9.3;
  const isGizmo = document.getElementById('adminPostIsGizmo').checked;
  const isFeatured = document.getElementById('adminPostIsFeatured').checked;
  const tagsRaw = document.getElementById('adminPostTags').value;

  const fontFamily = document.getElementById('adminEditorFontFamily').value;
  const fontSize = document.getElementById('adminEditorFontSize').value;
  const fontColor = document.getElementById('adminEditorFontColor').value;
  const textAlign = document.getElementById('adminEditorTextAlign').value;

  const canvas = document.getElementById('adminEditorCanvas');
  const contentHtml = canvas.innerHTML.trim();
  const plainText = (canvas.innerText || '').trim();
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const charCount = plainText.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 180));
  const excerpt = plainText.slice(0, 220) + (plainText.length > 220 ? '...' : '');
  const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

  if (fngdgtRuntime.editingPostId) {
    const existing = fngdgtState.posts.find(p => p.id === fngdgtRuntime.editingPostId);
    if (existing) {
      Object.assign(existing, {
        title, subtitle, category, eraSlug, authorName, coverImage,
        reviewScore, isGizmo, isFeatured, contentHtml, excerpt,
        wordCount, charCount, readMinutes, fontFamily, fontSize, fontColor, textAlign, tags
      });
      fngdgtRecordAudit('admin', 'UPDATE_POST', 'fngdgt_blog_posts', `Updated blog post #${existing.id}: "${title}" (${wordCount} words)`);
      fngdgtSyncWithBackend(`posts/${existing.id}`, 'PUT', existing);
      fngdgtShowToast(`Updated article "${title}".`, 'success');
    }
  } else {
    const newPost = {
      id: Date.now(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80),
      title, subtitle, category, eraSlug, authorName,
      authorRole: isGizmo ? 'Gizmo Cybernetics Fellow' : 'Senior Correspondent',
      coverImage, excerpt, contentHtml, isGizmo, isFeatured, reviewScore,
      wordCount, charCount, readMinutes,
      views: 1, likes: 1,
      fontFamily, fontSize, fontColor, textAlign, tags,
      publishedAt: new Date().toISOString()
    };
    fngdgtState.posts.unshift(newPost);
    fngdgtRecordAudit('admin', 'CREATE_POST', 'fngdgt_blog_posts', `Published new blog post: "${title}" (${wordCount} words, ${charCount} chars)`);
    fngdgtSyncWithBackend('posts', 'POST', newPost);
    fngdgtShowToast(`Published "${title}" to the live feed.`, 'success');
  }

  fngdgtResetAdminPostForm();
  fngdgtRefreshEntireUI();
  fngdgtRenderAdminPostsList();
}

function fngdgtEditAdminPost(postId) {
  const post = fngdgtState.posts.find(p => p.id === Number(postId));
  if (!post) return;
  fngdgtRuntime.editingPostId = post.id;

  document.getElementById('adminPostTitle').value = post.title;
  document.getElementById('adminPostSubtitle').value = post.subtitle || '';
  document.getElementById('adminPostCategory').value = post.category;
  document.getElementById('adminPostEraSelect').value = post.eraSlug;
  document.getElementById('adminPostAuthor').value = post.authorName;
  document.getElementById('adminPostCoverImage').value = post.coverImage;
  document.getElementById('adminPostScore').value = post.reviewScore || 9.5;
  document.getElementById('adminPostIsGizmo').checked = Boolean(post.isGizmo);
  document.getElementById('adminPostIsFeatured').checked = Boolean(post.isFeatured);
  document.getElementById('adminPostTags').value = (post.tags || []).join(', ');

  document.getElementById('adminEditorFontFamily').value = post.fontFamily || 'Inter, sans-serif';
  document.getElementById('adminEditorFontSize').value = post.fontSize || '1.08rem';
  document.getElementById('adminEditorFontColor').value = post.fontColor && post.fontColor.startsWith('#') ? post.fontColor : '#F8FAFC';
  document.getElementById('adminEditorTextAlign').value = post.textAlign || 'left';

  const canvas = document.getElementById('adminEditorCanvas');
  canvas.innerHTML = post.contentHtml;
  fngdgtApplyEditorWrapperStyle();

  const submitBtn = document.getElementById('adminPostSubmitBtn');
  if (submitBtn) submitBtn.textContent = 'Update Existing Blog Post';
  fngdgtShowToast(`Loaded "${post.title}" into editor.`, 'info');
}

function fngdgtDeleteAdminPost(postId) {
  const idx = fngdgtState.posts.findIndex(p => p.id === Number(postId));
  if (idx < 0) return;
  const removed = fngdgtState.posts.splice(idx, 1)[0];
  fngdgtRecordAudit('admin', 'DELETE_POST', 'fngdgt_blog_posts', `Deleted blog post #${removed.id}: "${removed.title}"`);
  fngdgtSyncWithBackend(`posts/${removed.id}`, 'DELETE');
  fngdgtRefreshEntireUI();
  fngdgtRenderAdminPostsList();
  fngdgtShowToast(`Deleted "${removed.title}".`, 'info');
}

function fngdgtResetAdminPostForm() {
  fngdgtRuntime.editingPostId = null;
  const form = document.getElementById('adminPostForm');
  if (form) form.reset();
  const canvas = document.getElementById('adminEditorCanvas');
  if (canvas) {
    canvas.innerHTML = '<p>Compose your rich-formatted technology report or extensive Gizmo treatise here...</p>';
  }
  const submitBtn = document.getElementById('adminPostSubmitBtn');
  if (submitBtn) submitBtn.textContent = 'Publish Blog Post to Feed';
  fngdgtUpdateEditorMetrics();
}

function fngdgtRenderAdminPostsList() {
  const container = document.getElementById('adminPostsTableBody');
  if (!container) return;
  container.innerHTML = fngdgtState.posts.map(post => `
    <tr class="border-b border-emerald-900/15 text-xs">
      <td class="py-2.5 pr-3 font-bold text-slate-900">${post.title}</td>
      <td class="py-2.5 px-2 text-emerald-700">${post.category}</td>
      <td class="py-2.5 px-2 text-slate-600">${post.wordCount} words (${post.readMinutes}m)</td>
      <td class="py-2.5 px-2">${post.isGizmo ? '<span class="text-amber-800 font-bold">Gizmo</span>' : 'Standard'}</td>
      <td class="py-2.5 pl-2 text-right space-x-1.5">
        <button type="button" onclick="fngdgtEditAdminPost(${post.id})" class="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-700 hover:bg-cyan-500/30 font-semibold">Edit</button>
        <button type="button" onclick="fngdgtDeleteAdminPost(${post.id})" class="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-semibold">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Admin Quick Reads CRUD
function fngdgtSaveAdminQuickRead(e) {
  e.preventDefault();
  const title = document.getElementById('adminQrTitle').value.trim();
  const summary = document.getElementById('adminQrSummary').value.trim();
  const category = document.getElementById('adminQrCategory').value;
  const eraSlug = document.getElementById('adminQrEraSelect').value;
  const readTime = document.getElementById('adminQrReadTime').value.trim() || '45 sec read';
  const badge = document.getElementById('adminQrBadge').value.trim() || 'Lab Dispatch';

  const newQr = { id: Date.now(), title, summary, category, eraSlug, readTime, badge };
  fngdgtState.quickReads.unshift(newQr);
  fngdgtRecordAudit('admin', 'CREATE_QUICKREAD', 'fngdgt_quick_reads', `Added Quick-Read: "${title}"`);
  fngdgtSyncWithBackend('quickreads', 'POST', newQr);
  e.target.reset();
  fngdgtRenderQuickReads();
  fngdgtRenderAdminQuickReadsList();
  fngdgtShowToast('Quick-Read item published.', 'success');
}

function fngdgtDeleteAdminQuickRead(qrId) {
  const idx = fngdgtState.quickReads.findIndex(q => q.id === Number(qrId));
  if (idx < 0) return;
  const removed = fngdgtState.quickReads.splice(idx, 1)[0];
  fngdgtRecordAudit('admin', 'DELETE_QUICKREAD', 'fngdgt_quick_reads', `Removed Quick-Read: "${removed.title}"`);
  fngdgtSyncWithBackend(`quickreads/${removed.id}`, 'DELETE');
  fngdgtRenderQuickReads();
  fngdgtRenderAdminQuickReadsList();
  fngdgtShowToast('Quick-Read removed.', 'info');
}

function fngdgtRenderAdminQuickReadsList() {
  const listEl = document.getElementById('adminQuickReadsList');
  if (!listEl) return;
  listEl.innerHTML = fngdgtState.quickReads.map(qr => `
    <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-900/15 flex items-center justify-between gap-3 text-xs">
      <div>
        <span class="font-bold text-emerald-700">[${qr.badge}]</span>
        <span class="font-semibold text-slate-900 ml-1">${qr.title}</span>
        <p class="text-slate-600 mt-0.5">${qr.summary}</p>
      </div>
      <button type="button" onclick="fngdgtDeleteAdminQuickRead(${qr.id})" class="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 shrink-0 font-semibold">
        Delete
      </button>
    </div>
  `).join('');
}

// Admin Tech Eras & Banners Customizer
function fngdgtSaveAdminEraBanner(e) {
  e.preventDefault();
  const slug = document.getElementById('adminEraSlug').value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  const name = document.getElementById('adminEraName').value.trim();
  const years = document.getElementById('adminEraYears').value.trim();
  const bannerTitle = document.getElementById('adminEraBannerTitle').value.trim();
  const bannerSubtitle = document.getElementById('adminEraBannerSubtitle').value.trim();
  const bannerImage = document.getElementById('adminEraBannerImage').value;
  const primaryAccent = document.getElementById('adminEraPrimaryColor').value;
  const secondaryAccent = document.getElementById('adminEraSecondaryColor').value;

  const existing = fngdgtState.eras.find(er => er.slug === slug);
  if (existing) {
    Object.assign(existing, { name, years, bannerTitle, bannerSubtitle, bannerImage, primaryAccent, secondaryAccent });
  } else {
    fngdgtState.eras.push({
      slug, name, years, bannerTitle, bannerSubtitle, bannerImage,
      primaryAccent, secondaryAccent, bgTint: '#080D1E',
      muralCaption: bannerTitle
    });
  }

  fngdgtState.settings.activeEraSlug = slug;
  fngdgtRecordAudit('admin', 'CUSTOMIZE_ERA_BANNER', 'fngdgt_tech_eras', `Saved & activated Era Banner "${name}" (${years})`);
  fngdgtSyncWithBackend('eras', 'POST', { slug, name, years, bannerTitle, bannerSubtitle, bannerImage, primaryAccent, secondaryAccent, isActive: true });
  fngdgtRefreshEntireUI();
  fngdgtRenderAdminErasList();
  fngdgtPopulateAdminSelects();
  fngdgtShowToast(`Saved and activated "${name}" era banner & theme.`, 'success');
}

function fngdgtLoadEraIntoAdminForm(slug) {
  const era = fngdgtState.eras.find(e => e.slug === slug);
  if (!era) return;
  document.getElementById('adminEraSlug').value = era.slug;
  document.getElementById('adminEraName').value = era.name;
  document.getElementById('adminEraYears').value = era.years;
  document.getElementById('adminEraBannerTitle').value = era.bannerTitle;
  document.getElementById('adminEraBannerSubtitle').value = era.bannerSubtitle;
  document.getElementById('adminEraBannerImage').value = era.bannerImage;
  document.getElementById('adminEraPrimaryColor').value = era.primaryAccent;
  document.getElementById('adminEraSecondaryColor').value = era.secondaryAccent;
  fngdgtShowToast(`Loaded "${era.name}" into Era Customizer.`, 'info');
}

function fngdgtRenderAdminErasList() {
  const container = document.getElementById('adminErasGrid');
  if (!container) return;
  const activeSlug = fngdgtState.settings.activeEraSlug;
  container.innerHTML = fngdgtState.eras.map(era => `
    <div class="p-3.5 rounded-xl bg-emerald-50/70 border ${era.slug === activeSlug ? 'border-cyan-400' : 'border-emerald-900/15'} flex items-center justify-between gap-3 text-xs">
      <div class="flex items-center gap-3">
        <span class="w-5 h-5 rounded-full shrink-0 border border-white/40" style="background:linear-gradient(135deg, ${era.primaryAccent}, ${era.secondaryAccent})"></span>
        <div>
          <div class="font-bold text-slate-900">${era.name} <span class="text-slate-600 font-normal">(${era.years})</span></div>
          <div class="text-slate-600 line-clamp-1">${era.bannerTitle}</div>
        </div>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button type="button" onclick="fngdgtLoadEraIntoAdminForm('${era.slug}')" class="px-2.5 py-1 rounded bg-emerald-50 text-slate-800 hover:bg-emerald-100">Customize</button>
        <button type="button" onclick="fngdgtActivateEraTheme('${era.slug}'); fngdgtRenderAdminErasList();" class="px-2.5 py-1 rounded era-accent-bg font-bold">
          ${era.slug === activeSlug ? 'Active' : 'Activate'}
        </button>
      </div>
    </div>
  `).join('');
}

// Admin Global Settings & Contact Form
function fngdgtPopulateAdminSettingsForm() {
  const s = fngdgtState.settings;
  const c = fngdgtState.contact;
  if (!document.getElementById('adminSiteTitleInput')) return;

  document.getElementById('adminSiteTitleInput').value = s.siteTitle || 'Fingadget';
  document.getElementById('adminSiteTaglineInput').value = s.siteTagline || '';
  document.getElementById('adminBreakingRibbonInput').value = s.breakingRibbon || '';
  document.getElementById('adminGlobalLangSelect').value = s.activeLanguage || 'en';

  document.getElementById('adminContactNewsroom').value = c.newsroomEmail || '';
  document.getElementById('adminContactPress').value = c.pressEmail || '';
  document.getElementById('adminContactSignal').value = c.secureTipLine || '';
  document.getElementById('adminContactHq').value = c.hqLocation || '';
  document.getElementById('adminContactPhone').value = c.phoneNumber || '';
  document.getElementById('adminContactHours').value = c.officeHours || '';
}

function fngdgtSaveAdminSettingsAndContact(e) {
  e.preventDefault();
  fngdgtState.settings.siteTitle = document.getElementById('adminSiteTitleInput').value.trim() || 'Fingadget';
  fngdgtState.settings.siteTagline = document.getElementById('adminSiteTaglineInput').value.trim();
  fngdgtState.settings.breakingRibbon = document.getElementById('adminBreakingRibbonInput').value.trim();
  fngdgtState.settings.activeLanguage = document.getElementById('adminGlobalLangSelect').value;

  fngdgtState.contact.newsroomEmail = document.getElementById('adminContactNewsroom').value.trim();
  fngdgtState.contact.pressEmail = document.getElementById('adminContactPress').value.trim();
  fngdgtState.contact.secureTipLine = document.getElementById('adminContactSignal').value.trim();
  fngdgtState.contact.hqLocation = document.getElementById('adminContactHq').value.trim();
  fngdgtState.contact.phoneNumber = document.getElementById('adminContactPhone').value.trim();
  fngdgtState.contact.officeHours = document.getElementById('adminContactHours').value.trim();

  fngdgtRecordAudit('admin', 'UPDATE_SITE_AND_CONTACT', 'fngdgt_site_settings', `Updated global branding, language (${fngdgtState.settings.activeLanguage}), and newsroom contact details.`);
  fngdgtSyncWithBackend('settings', 'PUT', fngdgtState.settings);
  fngdgtSyncWithBackend('contact', 'PUT', fngdgtState.contact);
  fngdgtRefreshEntireUI();
  fngdgtShowToast('Global branding, language, and contact details persisted.', 'success');
}

// Admin Audit Trail Viewer
function fngdgtRenderAdminAuditLogs() {
  const tbody = document.getElementById('adminAuditLogTableBody');
  if (!tbody) return;
  tbody.innerHTML = fngdgtState.auditLogs.map(log => `
    <tr class="border-b border-emerald-900/15 text-xs">
      <td class="py-2 pr-2 text-slate-600 whitespace-nowrap">${new Date(log.createdAt).toLocaleTimeString()}</td>
      <td class="py-2 px-2 font-semibold text-emerald-700">${log.actor}</td>
      <td class="py-2 px-2"><span class="px-2 py-0.5 rounded bg-emerald-50 text-amber-800 font-mono text-[11px]">${log.action}</span></td>
      <td class="py-2 px-2 font-mono text-[11px] text-slate-600">${log.entity}</td>
      <td class="py-2 pl-2 text-slate-800">${log.description}</td>
    </tr>
  `).join('');
}

function fngdgtResetFactoryState() {
  fngdgtState = JSON.parse(JSON.stringify(FNGDGT_DEFAULT_STATE));
  fngdgtRecordAudit('admin', 'FACTORY_RESET', 'fngdgt_database', 'Restored default seeded articles, eras, and settings.');
  fngdgtRefreshEntireUI();
  if (fngdgtRuntime.isAdminLoggedIn) {
    fngdgtRenderAdminView();
  }
  fngdgtShowToast('Restored default seeded database state.', 'info');
}

// 16. MASTER UI REFRESH & INITIALIZATION
function fngdgtRefreshEntireUI() {
  fngdgtApplyThemeAndEra();
  fngdgtApplyTranslationsToDOM();
  fngdgtRenderHeroBento();
  fngdgtRenderQuickReads();
  fngdgtRenderFeedControls();
  fngdgtRenderBlogFeed();
  fngdgtRenderEraExplorer();
  fngdgtRenderMuralsGallery();
  fngdgtRenderContactSection();
}

function fngdgtInitApp() {
  fngdgtLoadState();
  fngdgtRefreshEntireUI();

  // Attempt background bootstrap sync if running on live Netlify + NeonDB
  fngdgtSyncWithBackend('bootstrap', 'GET').then(remote => {
    if (remote && !remote.fallbackMode && Array.isArray(remote.posts) && remote.posts.length > 0) {
      fngdgtSaveState();
    }
  });

  // Wire Search, Sort, Format, Era & Pagination listeners
  const searchInput = document.getElementById('feedSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      fngdgtRuntime.searchQuery = e.target.value;
      fngdgtRuntime.currentPage = 1;
      fngdgtRenderBlogFeed();
    });
  }

  const eraFilter = document.getElementById('feedEraFilterSelect');
  if (eraFilter) {
    eraFilter.addEventListener('change', e => {
      fngdgtRuntime.selectedEra = e.target.value;
      fngdgtRuntime.currentPage = 1;
      fngdgtRenderBlogFeed();
    });
  }

  const formatFilter = document.getElementById('feedFormatFilterSelect');
  if (formatFilter) {
    formatFilter.addEventListener('change', e => {
      fngdgtRuntime.selectedFormat = e.target.value;
      fngdgtRuntime.currentPage = 1;
      fngdgtRenderBlogFeed();
    });
  }

  const sortSelect = document.getElementById('feedSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      fngdgtRuntime.sortBy = e.target.value;
      fngdgtRuntime.currentPage = 1;
      fngdgtRenderBlogFeed();
    });
  }

  const perPageSelect = document.getElementById('feedPerPageSelect');
  if (perPageSelect) {
    perPageSelect.addEventListener('change', e => {
      fngdgtRuntime.itemsPerPage = Number(e.target.value) || 4;
      fngdgtRuntime.currentPage = 1;
      fngdgtRenderBlogFeed();
    });
  }

  const editorCanvas = document.getElementById('adminEditorCanvas');
  if (editorCanvas) {
    editorCanvas.addEventListener('input', fngdgtUpdateEditorMetrics);
    editorCanvas.addEventListener('keyup', fngdgtUpdateEditorMetrics);
  }

  // Scroll listener for reading progress bar
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    const bar = document.getElementById('readingProgressBar');
    if (bar) bar.style.width = `${scrolled}%`;
  });
}

window.addEventListener('DOMContentLoaded', fngdgtInitApp);
