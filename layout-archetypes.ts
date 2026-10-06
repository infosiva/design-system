/**
 * Layout Archetypes Library
 * Each archetype = proven UI pattern with specific section order, spacing, and density.
 * Claude picks the right one based on project brief signals.
 */

export interface LayoutArchetype {
  id: string
  name: string
  description: string
  bestFor: string[]          // category/mood combos that fit well
  sections: SectionDef[]
  heroVariant: 'centered' | 'split' | 'fullbleed' | 'terminal' | 'chat' | 'magazine' | 'bento' | 'tool-first' | 'story' | 'search' | 'map' | 'compare'
  navStyle: 'floating' | 'sticky-top' | 'sidebar' | 'minimal' | 'command'
  cardStyle: 'grid' | 'masonry' | 'list' | 'carousel' | 'dashboard-panels' | 'bento' | 'kanban' | 'timeline'
  spacing: 'tight' | 'comfortable' | 'spacious'
  stitchPrompt: string       // ready-to-paste into Google Stitch
  claudeDesignNotes: string  // notes for Claude when implementing
}

export interface SectionDef {
  name: string
  required: boolean
  component: string
}

export const ARCHETYPES: LayoutArchetype[] = [
  {
    id: 'hero-chat',
    name: 'Conversational Hero',
    description: 'Chat interface as the hero — user types, AI responds. Action is the UI.',
    bestFor: ['generate', 'learn', 'Productivity', 'EdTech', 'playful', 'energetic'],
    heroVariant: 'chat',
    navStyle: 'minimal',
    cardStyle: 'grid',
    spacing: 'comfortable',
    sections: [
      { name: 'Minimal Nav', required: true, component: 'NavMinimal' },
      { name: 'Chat Hero (full viewport)', required: true, component: 'HeroChat' },
      { name: 'Feature Pills', required: true, component: 'FeaturePills' },
      { name: 'Social Proof Row', required: false, component: 'ProofRow' },
      { name: 'Simple Footer', required: true, component: 'FooterSimple' },
    ],
    stitchPrompt: `Create a modern AI chat app landing page. Dark background. Hero is a chat interface showing AI in conversation. Minimal top nav (logo + sign in). Below chat: 3 feature pills with icons. Clean, no clutter.`,
    claudeDesignNotes: 'Hero = full-width chat preview component. Keep nav height < 56px. Feature pills use pill-glass class. No heavy stats section — trust is built by the live demo feel.',
  },
  {
    id: 'magazine-editorial',
    name: 'Magazine Editorial',
    description: 'Asymmetric hero, large typography, content-first layout like editorial sites.',
    bestFor: ['browse', 'Entertainment', 'energetic', 'consumer'],
    heroVariant: 'magazine',
    navStyle: 'sticky-top',
    cardStyle: 'masonry',
    spacing: 'tight',
    sections: [
      { name: 'Nav with search', required: true, component: 'NavSearch' },
      { name: 'Featured Hero (2/3 + 1/3 split)', required: true, component: 'HeroMagazine' },
      { name: 'Category strip', required: true, component: 'CategoryStrip' },
      { name: 'Content grid (masonry)', required: true, component: 'MasonryGrid' },
      { name: 'Trending sidebar', required: false, component: 'TrendingSidebar' },
      { name: 'Footer', required: true, component: 'FooterFull' },
    ],
    stitchPrompt: `Editorial magazine layout, dark theme. Top nav with logo, search bar, categories. Hero: 2/3 width large featured content card left, 1/3 right stack of 3 smaller cards. Below: horizontal category pills, then masonry grid of content cards.`,
    claudeDesignNotes: 'Use CSS grid with named areas. Featured card = large image + overlay text. Category strip scrolls horizontally on mobile. Cards use glass-liquid on hover.',
  },
  {
    id: 'saas-dashboard-landing',
    name: 'SaaS Dashboard Landing',
    description: 'Marketing page that previews a dashboard. For tool/SaaS products.',
    bestFor: ['track', 'dashboard', 'FinTech', 'Productivity', 'serious', 'authoritative', 'professional'],
    heroVariant: 'split',
    navStyle: 'sticky-top',
    cardStyle: 'dashboard-panels',
    spacing: 'comfortable',
    sections: [
      { name: 'Nav with CTA', required: true, component: 'NavCTA' },
      { name: 'Split Hero (copy left, dashboard screenshot right)', required: true, component: 'HeroSplit' },
      { name: 'Logos / Trust bar', required: true, component: 'TrustBar' },
      { name: 'Feature sections (alternating left/right)', required: true, component: 'FeatureAlternating' },
      { name: 'Pricing', required: false, component: 'PricingTable' },
      { name: 'Testimonials', required: false, component: 'TestimonialGrid' },
      { name: 'CTA band', required: true, component: 'CTABand' },
      { name: 'Footer', required: true, component: 'FooterFull' },
    ],
    stitchPrompt: `Professional SaaS landing page. Light/dark mode toggle in nav. Hero: left side headline + subtext + two CTAs; right side: realistic dashboard screenshot/mockup with shadow. Below: trust logos row. Then alternating feature sections (image + text). Clean, conversion-focused.`,
    claudeDesignNotes: 'Dashboard mockup on right = div with real chart components (recharts). Feature sections alternate image-left / image-right. Heavy use of reveal-3d scroll animations. Stats use count-up.',
  },
  {
    id: 'finance-terminal',
    name: 'Finance Terminal',
    description: 'Data-dense, green-on-dark, Bloomberg-inspired. For finance/tracking tools.',
    bestFor: ['track', 'FinTech', 'authoritative', 'serious', 'dense', 'professional'],
    heroVariant: 'terminal',
    navStyle: 'sticky-top',
    cardStyle: 'dashboard-panels',
    spacing: 'tight',
    sections: [
      { name: 'Nav (dark, compact)', required: true, component: 'NavDark' },
      { name: 'Hero with live ticker', required: true, component: 'HeroTicker' },
      { name: 'Key metrics row', required: true, component: 'MetricsRow' },
      { name: 'Feature grid (2x2 panels)', required: true, component: 'PanelGrid' },
      { name: 'AI insights preview', required: true, component: 'AIInsightsPreview' },
      { name: 'Social proof + CTA', required: true, component: 'ProofCTA' },
      { name: 'Footer minimal', required: true, component: 'FooterMinimal' },
    ],
    stitchPrompt: `Bloomberg Terminal-inspired finance app landing. Very dark background (#030712). Monospace font for numbers. Top nav compact. Hero shows portfolio performance chart with animated line. Metrics row: 4 cards with up/down arrows, green/red colors. Feature panels in 2x2 grid.`,
    claudeDesignNotes: 'Use JetBrains Mono for numbers. Green = #10b981 for positive, red = #ef4444 for negative. Animate line charts on scroll. depth-grid behind hero for depth effect.',
  },
  {
    id: 'gamified-learning',
    name: 'Gamified Learning',
    description: 'Duolingo-style: streaks, XP, progress bars, friendly characters.',
    bestFor: ['learn', 'EdTech', 'playful', 'energetic', 'student', 'consumer'],
    heroVariant: 'centered',
    navStyle: 'minimal',
    cardStyle: 'grid',
    spacing: 'comfortable',
    sections: [
      { name: 'Nav minimal', required: true, component: 'NavMinimal' },
      { name: 'Centered hero with XP badge + mascot', required: true, component: 'HeroGameified' },
      { name: 'Progress showcase', required: true, component: 'ProgressShowcase' },
      { name: 'Language cards grid', required: true, component: 'LanguageGrid' },
      { name: 'How it works (game steps)', required: true, component: 'GameSteps' },
      { name: 'Streak stats', required: true, component: 'StreakStats' },
      { name: 'Social proof + CTA', required: true, component: 'ProofCTA' },
      { name: 'Footer', required: true, component: 'FooterSimple' },
    ],
    stitchPrompt: `Language learning app landing page, gamified Duolingo-style but more modern. Vibrant gradient background (purple to cyan). Hero: centered headline, XP progress bar showing "Level up your language", animated mascot icon. Below: row of language flag cards with difficulty badges. Then 3-step "how it works" with game-style numbered badges.`,
    claudeDesignNotes: 'XP bar = animated CSS progress element. Step badges = badge-3d class. Flag cards = glass-liquid with hover lift. Use liquid-blob background orbs in brand colors (purple + cyan + green).',
  },
  {
    id: 'travel-magazine',
    name: 'Travel Magazine',
    description: 'Full-bleed photography, destination cards, wanderlust-inducing layout.',
    bestFor: ['generate', 'TravelTech', 'playful', 'premium', 'consumer', 'browse'],
    heroVariant: 'fullbleed',
    navStyle: 'floating',
    cardStyle: 'masonry',
    spacing: 'comfortable',
    sections: [
      { name: 'Floating nav (transparent over hero)', required: true, component: 'NavFloating' },
      { name: 'Full-bleed hero with destination search', required: true, component: 'HeroFullbleed' },
      { name: 'Popular destinations grid', required: true, component: 'DestinationGrid' },
      { name: 'AI planner feature (center highlight)', required: true, component: 'AIFeatureHighlight' },
      { name: 'Travel story cards', required: false, component: 'StoryCards' },
      { name: 'Testimonials', required: false, component: 'TestimonialRow' },
      { name: 'CTA + Footer', required: true, component: 'CTAFooter' },
    ],
    stitchPrompt: `Luxury travel planning app. Full-bleed hero image (aerial ocean/mountains). Transparent floating nav. Hero overlay: bold headline "Plan your dream trip in 60 seconds" + AI search input. Below: destination cards with hover zoom, gradient overlays. AI feature section: centered, light background, chat demo.`,
    claudeDesignNotes: 'Hero bg = gradient instead of real img (avoid copyright). Destination cards = aspect-[4/3] with overflow-hidden + scale-on-hover. Floating nav becomes solid on scroll (JS IntersectionObserver). liquid-blob blobs in sky-blue and amber.',
  },
  {
    id: 'career-portfolio',
    name: 'Career Portfolio',
    description: 'Resume/career tools: professional, achievement-focused, credential-heavy.',
    bestFor: ['generate', 'CareerTech', 'premium', 'serious', 'professional', 'student'],
    heroVariant: 'split',
    navStyle: 'sticky-top',
    cardStyle: 'list',
    spacing: 'comfortable',
    sections: [
      { name: 'Nav with login', required: true, component: 'NavAuth' },
      { name: 'Split hero (copy left, resume preview right)', required: true, component: 'HeroResume' },
      { name: 'ATS score widget', required: true, component: 'ATSScoreWidget' },
      { name: 'Template gallery', required: true, component: 'TemplateGallery' },
      { name: 'Feature list', required: true, component: 'FeatureList' },
      { name: 'Before/After comparison', required: false, component: 'BeforeAfter' },
      { name: 'CTA + Footer', required: true, component: 'CTAFooter' },
    ],
    stitchPrompt: `AI resume builder landing page, professional and premium. Dark navy background. Split hero: left = bold headline "Get hired 3x faster" + subtext + CTA button; right = animated resume document preview with AI highlighting sections. Below: ATS score indicator (circular gauge). Template gallery: horizontal scroll of resume templates.`,
    claudeDesignNotes: 'Resume preview = styled div with realistic resume layout. ATS gauge = SVG circle progress. Template cards scroll horizontally on mobile. Professional color = deep navy + indigo + cyan accent.',
  },
  {
    id: 'marketing-calendar',
    name: 'Marketing Calendar',
    description: 'Calendar/planning UI as hero. Grid-first layout like Notion/Linear.',
    bestFor: ['schedule', 'MarketingTech', 'playful', 'energetic', 'professional'],
    heroVariant: 'split',
    navStyle: 'sticky-top',
    cardStyle: 'grid',
    spacing: 'comfortable',
    sections: [
      { name: 'Nav', required: true, component: 'NavCTA' },
      { name: 'Split hero (text left, calendar UI right)', required: true, component: 'HeroCalendar' },
      { name: 'Platform logos (connect to Instagram/TikTok/X)', required: true, component: 'PlatformLogos' },
      { name: 'AI content generation demo', required: true, component: 'ContentGenDemo' },
      { name: 'Feature grid', required: true, component: 'FeatureGrid' },
      { name: 'CTA + Footer', required: true, component: 'CTAFooter' },
    ],
    stitchPrompt: `Social media calendar AI tool landing. Purple-pink gradient accents. Split hero: left headline "30 days of content in 5 minutes" + CTA; right: mini calendar UI with scheduled posts (purple dots). Below: row of social media platform icons. Then AI demo section showing content being generated.`,
    claudeDesignNotes: 'Calendar mockup = CSS grid with colored dots representing posts. Platform logos row = grayscale → color on hover. Content gen demo = typewriter animation. Use gradient border (iridescent-border class) on calendar mockup.',
  },
  {
    id: 'compliance-authority',
    name: 'Compliance Authority',
    description: 'Trust-first, government-adjacent feel. Clean, authoritative, reassuring.',
    bestFor: ['generate', 'LegalTech', 'authoritative', 'serious', 'enterprise', 'professional'],
    heroVariant: 'centered',
    navStyle: 'sticky-top',
    cardStyle: 'list',
    spacing: 'spacious',
    sections: [
      { name: 'Nav with trust signals', required: true, component: 'NavTrust' },
      { name: 'Centered hero with compliance badge', required: true, component: 'HeroCompliance' },
      { name: 'Industry selector', required: true, component: 'IndustrySelector' },
      { name: 'How compliance check works', required: true, component: 'HowItWorks' },
      { name: 'Compliance checklist preview', required: true, component: 'ChecklistPreview' },
      { name: 'Trust badges + testimonials', required: true, component: 'TrustSection' },
      { name: 'CTA + Footer', required: true, component: 'CTAFooter' },
    ],
    stitchPrompt: `Compliance SaaS landing page, authoritative and trustworthy. Clean white/light blue background. Top nav: logo + "For [industry]" dropdown + sign in. Hero: centered, large blue checkmark icon, headline "Stay compliant. Stay protected." + industry dropdown. Below: how it works in 3 steps with icons. Then compliance checklist preview card.`,
    claudeDesignNotes: 'No dark background — use white/slate-50 for authority feel. Blue = #1d4ed8 primary. Checkmark icons = large, animated (scale-in on scroll). Checklist preview = glass-liquid card with realistic checklist items.',
  },
  {
    id: 'weekend-lifestyle',
    name: 'Weekend Lifestyle',
    description: 'Warm, social, activity-cards. Instagram-meets-Airbnb energy.',
    bestFor: ['generate', 'Lifestyle', 'playful', 'calm', 'consumer'],
    heroVariant: 'centered',
    navStyle: 'floating',
    cardStyle: 'masonry',
    spacing: 'comfortable',
    sections: [
      { name: 'Floating nav', required: true, component: 'NavFloating' },
      { name: 'Centered hero with mood selector', required: true, component: 'HeroMoodSelector' },
      { name: 'Activity cards (masonry)', required: true, component: 'ActivityMasonry' },
      { name: 'AI planner feature', required: true, component: 'AIPlanner' },
      { name: 'Community picks', required: false, component: 'CommunityPicks' },
      { name: 'CTA + Footer', required: true, component: 'CTAFooter' },
    ],
    stitchPrompt: `Weekend activity planner app landing, warm and social. Warm gradient background (amber to orange to green). Hero: center, "What's your vibe this weekend?" with emoji mood selector buttons (🎮 🎨 🌿 🍕 🎵). Below: masonry grid of activity cards with photos, warm rounded corners, soft shadows.`,
    claudeDesignNotes: 'Mood selector buttons = pill-glass with emoji. Masonry = CSS columns-2 md:columns-3. Activity cards = glass-liquid with warm gradient overlay. liquid-blob in amber + orange + emerald.',
  },
]

/* Archetypes 11-18 (added 2026-10-05): bento, tool-first, story, directory, board, map, docs, compare, gallery */
const s = (name: string, component: string, required = true) => ({ name, required, component })

const EXTRA_ARCHETYPES: LayoutArchetype[] = [
  {
    id: 'bento-showcase',
    name: 'Bento Showcase',
    description: 'Asymmetric tile grid where every tile is a live mini-demo. Strong for multi-feature products.',
    bestFor: ['Productivity', 'Developer Tools', 'SaaS', 'Multi-feature', 'modern', 'polished'],
    sections: [s('Hero', 'HeroBento'), s('BentoGrid', 'BentoGrid'), s('Proof', 'ProofStrip'), s('CTA', 'CtaBand')],
    heroVariant: 'bento', navStyle: 'floating', cardStyle: 'bento', spacing: 'comfortable',
    stitchPrompt: 'Bento grid landing: one 2x2 hero tile with live demo, four 1x1 feature tiles, one wide proof tile. 12px gaps, 20px radius, tile-local accents.',
    claudeDesignNotes: 'CSS grid, grid-template-areas; tiles animate in with stagger from motion/presets. Each tile owns its background.',
  },
  {
    id: 'tool-first-workbench',
    name: 'Tool-First Workbench',
    description: 'The product itself is the page: input and output panels above the fold, no marketing hero.',
    bestFor: ['Utilities', 'Converters', 'Generators', 'AI Tools', 'instant', 'practical'],
    sections: [s('ToolPanel', 'ToolWorkbench'), s('Examples', 'ExampleChips'), s('HowItWorks', 'ThreeSteps', false), s('FAQ', 'FaqAccordion', false)],
    heroVariant: 'tool-first', navStyle: 'command', cardStyle: 'grid', spacing: 'tight',
    stitchPrompt: 'Two-pane workbench: left input with example chips, right live result, slim top bar with command palette. No hero headline above the tool.',
    claudeDesignNotes: 'Core action works with zero auth. Keyboard-first: Cmd+K, Enter to run. Result panel has skeleton, empty and error states.',
  },
  {
    id: 'story-scroll',
    name: 'Story Scroll',
    description: 'Chaptered narrative with sticky visual that changes per section. For products explained as a journey.',
    bestFor: ['Health', 'Wellness', 'Education', 'Learning', 'calm', 'guided'],
    sections: [s('Hero', 'HeroStory'), s('Chapters', 'StickyChapters'), s('Outcome', 'OutcomeBand'), s('CTA', 'CtaBand')],
    heroVariant: 'story', navStyle: 'minimal', cardStyle: 'timeline', spacing: 'spacious',
    stitchPrompt: 'Scrollytelling: left sticky illustration swaps per chapter, right column text chapters, progress rail on the edge.',
    claudeDesignNotes: 'IntersectionObserver or motion useScroll. Static first chapter visible at rest; reduced-motion shows all chapters stacked.',
  },
  {
    id: 'directory-marketplace',
    name: 'Directory & Marketplace',
    description: 'Search-led listing page with filters, result cards and a detail drawer.',
    bestFor: ['Marketplace', 'Directory', 'Jobs', 'Local', 'Listings', 'browse', 'discovery'],
    sections: [s('SearchHero', 'HeroSearch'), s('Filters', 'FilterBar'), s('Results', 'ResultGrid'), s('Detail', 'DetailDrawer', false)],
    heroVariant: 'search', navStyle: 'sticky-top', cardStyle: 'grid', spacing: 'comfortable',
    stitchPrompt: 'Search bar hero with category chips, sticky filter row, 3-column result cards with image, price and rating, side drawer for detail.',
    claudeDesignNotes: 'Real result data only (no placeholder listings). Filter state in URL. Empty-results state suggests relaxing a filter.',
  },
  {
    id: 'kanban-board',
    name: 'Board Workspace',
    description: 'Columns of draggable cards; the board is the landing demo.',
    bestFor: ['Project Management', 'CRM', 'Pipeline', 'Tracking', 'Operations', 'organised', 'workflow'],
    sections: [s('Hero', 'HeroSplit'), s('BoardDemo', 'KanbanBoard'), s('Automations', 'RuleList', false), s('CTA', 'CtaBand')],
    heroVariant: 'split', navStyle: 'sidebar', cardStyle: 'kanban', spacing: 'tight',
    stitchPrompt: 'Left sidebar nav, top bar with search, 4 columns of cards with status chips and avatars, one card mid-drag with shadow.',
    claudeDesignNotes: 'Columns scroll horizontally inside their own container, never the page. Drag has keyboard alternative.',
  },
  {
    id: 'map-first',
    name: 'Map First',
    description: 'Full-bleed map or spatial canvas with floating panel. For location and route products.',
    bestFor: ['Travel', 'Maps', 'Logistics', 'Local', 'Real Estate', 'Rides', 'spatial', 'explore'],
    sections: [s('MapCanvas', 'HeroMap'), s('Panel', 'FloatingPanel'), s('Results', 'ResultList'), s('CTA', 'CtaBand', false)],
    heroVariant: 'map', navStyle: 'floating', cardStyle: 'list', spacing: 'comfortable',
    stitchPrompt: 'Full-viewport map, floating left panel with search and result list, bottom sheet on mobile.',
    claudeDesignNotes: 'Free tiles only (OpenStreetMap/MapLibre). Panel becomes a bottom sheet under 640px.',
  },
  {
    id: 'docs-knowledge',
    name: 'Docs & Knowledge',
    description: 'Sidebar tree plus reading column plus on-page outline. For reference-heavy products.',
    bestFor: ['Documentation', 'Knowledge Base', 'API', 'Compliance', 'Reference', 'precise', 'trustworthy'],
    sections: [s('Hero', 'HeroSearch'), s('Tree', 'SidebarTree'), s('Article', 'ReadingColumn'), s('Outline', 'OnPageOutline', false)],
    heroVariant: 'search', navStyle: 'sidebar', cardStyle: 'list', spacing: 'comfortable',
    stitchPrompt: 'Three columns: collapsible tree, 68ch article, right outline. Search with Cmd+K. Code blocks with copy.',
    claudeDesignNotes: 'Measure 65-72ch. Serif or humanist body. Anchor links on headings. Mobile: tree in a drawer.',
  },
  {
    id: 'compare-pricing',
    name: 'Compare & Decide',
    description: 'Side-by-side comparison as the hero. For tools where the choice is the product.',
    bestFor: ['Finance', 'Insurance', 'Shopping', 'Comparison', 'Pricing', 'decision', 'analytical'],
    sections: [s('Hero', 'HeroCompare'), s('Table', 'CompareTable'), s('Verdict', 'VerdictCard'), s('FAQ', 'FaqAccordion', false)],
    heroVariant: 'compare', navStyle: 'sticky-top', cardStyle: 'grid', spacing: 'comfortable',
    stitchPrompt: 'Two-option hero with toggles, sticky-header comparison table, highlighted winner column, verdict card with reasons.',
    claudeDesignNotes: 'Table scrolls inside its own container on mobile with the first column sticky. Winner is stated in text, not colour alone.',
  },
  {
    id: 'media-gallery',
    name: 'Media Gallery',
    description: 'Full-bleed visual wall with a carousel strip. For creative, video and image products.',
    bestFor: ['Creative', 'Video', 'Image', 'Design', 'Music', 'Portfolio', 'visual', 'expressive'],
    sections: [s('Hero', 'HeroFullbleed'), s('Strip', 'CarouselStrip'), s('Wall', 'MasonryWall'), s('CTA', 'CtaBand')],
    heroVariant: 'fullbleed', navStyle: 'floating', cardStyle: 'carousel', spacing: 'spacious',
    stitchPrompt: 'Full-bleed animated hero, snap-scroll carousel strip, masonry wall with hover reveal, floating pill nav.',
    claudeDesignNotes: 'Generated or CSS visuals, no heavy video. Lazy-load below fold. Hover reveals need a focus equivalent.',
  },
]
ARCHETYPES.push(...EXTRA_ARCHETYPES)

/**
 * Match a project brief to the best layout archetype
 */
/** avoid = archetype ids already used by recent/sibling projects (-4 each, so variety wins close calls); seed = project id, breaks ties deterministically. */
export function pickArchetype(brief: import('./projects.config').ProjectBrief, avoid: string[] = [], seed = ''): LayoutArchetype {
  const scores = ARCHETYPES.map(arch => {
    let score = 0

    // Match primary action
    if (arch.bestFor.includes(brief.primaryAction)) score += 3

    // Match category
    if (arch.bestFor.includes(brief.category)) score += 3

    // Match mood
    brief.mood.forEach(m => { if (arch.bestFor.includes(m)) score += 2 })

    // Match audience
    brief.audience.forEach(a => { if (arch.bestFor.includes(a)) score += 1 })

    // Match content density to spacing
    if (brief.contentDensity === 'dense' && arch.spacing === 'tight') score += 2
    if (brief.contentDensity === 'sparse' && arch.spacing === 'spacious') score += 2
    if (brief.contentDensity === 'medium' && arch.spacing === 'comfortable') score += 2

    score -= 4 * avoid.filter(id => id === arch.id).length
    const h = [...seed + arch.id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % 100
    return { arch, score: score + h / 1000 }
  })

  scores.sort((a, b) => b.score - a.score)
  return scores[0].arch
}
