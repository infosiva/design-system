/**
 * Design System — Project Registry
 * Define each project's brief here BEFORE writing any code.
 * Run: `npx ts-node pick-layout.ts` to get layout archetype + Stitch prompt + component skeleton.
 */

export type AudienceType =
  | 'consumer'
  | 'professional'
  | 'student'
  | 'developer'
  | 'enterprise'

export type MoodType =
  | 'playful'
  | 'serious'
  | 'premium'
  | 'minimal'
  | 'energetic'
  | 'calm'
  | 'authoritative'

export type PrimaryAction =
  | 'signup'
  | 'search'
  | 'generate'
  | 'dashboard'
  | 'browse'
  | 'compare'
  | 'track'
  | 'schedule'
  | 'learn'

export interface ProjectBrief {
  id: string
  name: string
  tagline: string
  category: string         // e.g. "EdTech" | "FinTech" | "Productivity" | "Entertainment"
  primaryAction: PrimaryAction
  audience: AudienceType[]
  mood: MoodType[]
  colorPalette: string[]   // hex codes — brand identity
  contentDensity: 'sparse' | 'medium' | 'dense'  // sparse=marketing, dense=SaaS/dashboard
  keyFeatures: string[]    // 3-5 bullet features shown on landing
  competitorStyle?: string // e.g. "like Duolingo" | "like Notion" | "like Bloomberg"
  localPath: string
  vercelUrl?: string
  githubRepo?: string
}

export const PROJECTS: ProjectBrief[] = [
  {
    id: 'idea-agent',
    name: 'IdeaAgent',
    tagline: 'Your AI brainstorming partner',
    category: 'Productivity',
    primaryAction: 'generate',
    audience: ['professional', 'developer', 'consumer'],
    mood: ['energetic', 'playful'],
    colorPalette: ['#6366f1', '#8b5cf6', '#ec4899'],
    contentDensity: 'medium',
    keyFeatures: [
      'Voice-activated idea generation',
      'AI-powered brainstorming sessions',
      'Save and organize ideas',
      'Share with team',
    ],
    competitorStyle: 'like Notion AI but more fun',
    localPath: '/Users/sivaprakasam/projects/agents/idea-agent',
    githubRepo: 'infosiva/idea-agent',
  },
  {
    id: 'yt-portal',
    name: 'YT Portal',
    tagline: 'Discover trending YouTube content',
    category: 'Entertainment',
    primaryAction: 'browse',
    audience: ['consumer'],
    mood: ['energetic', 'playful'],
    colorPalette: ['#ef4444', '#dc2626', '#1f1f1f'],
    contentDensity: 'dense',
    keyFeatures: [
      'Trending video discovery',
      'Category filtering',
      'AI-curated recommendations',
      'Dark cinema mode',
    ],
    competitorStyle: 'like YouTube but cleaner dark UI',
    localPath: '/Users/sivaprakasam/projects/agents/yt-portal',
    githubRepo: 'infosiva/yt-portal',
  },
  {
    id: 'meetscribe',
    name: 'MeetScribe',
    tagline: 'AI meeting notes in seconds',
    category: 'Productivity',
    primaryAction: 'generate',
    audience: ['professional', 'enterprise'],
    mood: ['minimal', 'serious', 'calm'],
    colorPalette: ['#0ea5e9', '#0284c7', '#f8fafc'],
    contentDensity: 'sparse',
    keyFeatures: [
      'Auto-transcription',
      'AI action item extraction',
      'One-click summary',
      'Slack/email integration',
    ],
    competitorStyle: 'like Otter.ai but minimal',
    localPath: '/Users/sivaprakasam/projects/agents/meetscribe',
    githubRepo: 'infosiva/meetscribe',
  },
  {
    id: 'weekendai',
    name: 'WeekendAI',
    tagline: 'Plan the perfect weekend with AI',
    category: 'Lifestyle',
    primaryAction: 'generate',
    audience: ['consumer'],
    mood: ['playful', 'energetic', 'calm'],
    colorPalette: ['#f59e0b', '#f97316', '#10b981'],
    contentDensity: 'medium',
    keyFeatures: [
      'Personalized weekend plans',
      'Local event discovery',
      'Budget-aware suggestions',
      'Social sharing',
    ],
    competitorStyle: 'like TripAdvisor but AI-first, weekend-focused',
    localPath: '/Users/sivaprakasam/projects/agents/weekendai',
    githubRepo: 'infosiva/weekendai',
  },
  {
    id: 'complybuddy',
    name: 'ComplyBuddy',
    tagline: 'AI compliance assistant for small businesses',
    category: 'LegalTech',
    primaryAction: 'generate',
    audience: ['professional', 'enterprise'],
    mood: ['authoritative', 'serious', 'premium'],
    colorPalette: ['#1e40af', '#1d4ed8', '#f1f5f9'],
    contentDensity: 'sparse',
    keyFeatures: [
      'Instant compliance checks',
      'Plain English explanations',
      'Industry-specific rules',
      'Document generation',
    ],
    competitorStyle: 'like LegalZoom but AI-chat first',
    localPath: '/Users/sivaprakasam/projects/agents/complybuddy',
    githubRepo: 'infosiva/complybuddy',
  },
  {
    id: 'ai-resume-builder',
    name: 'ResumeVault',
    tagline: 'AI resume builder that gets you hired',
    category: 'CareerTech',
    primaryAction: 'generate',
    audience: ['student', 'professional', 'consumer'],
    mood: ['premium', 'serious', 'minimal'],
    colorPalette: ['#0f172a', '#6366f1', '#22d3ee'],
    contentDensity: 'medium',
    keyFeatures: [
      'ATS-optimized resumes',
      'Job description matching',
      'One-click formatting',
      'Export to PDF/Word',
    ],
    competitorStyle: 'like Zety but more AI-native',
    localPath: '/Users/sivaprakasam/projects/agents/ai-resume-builder',
    vercelUrl: 'ai-resume-builder-olive-omega.vercel.app',
    githubRepo: 'infosiva/ai-resume-builder',
  },
  {
    id: 'social-media-calendar',
    name: 'ContentCal',
    tagline: 'AI social media planner on autopilot',
    category: 'MarketingTech',
    primaryAction: 'schedule',
    audience: ['professional', 'consumer'],
    mood: ['playful', 'energetic'],
    colorPalette: ['#8b5cf6', '#ec4899', '#f59e0b'],
    contentDensity: 'medium',
    keyFeatures: [
      'AI post generation',
      'Visual content calendar',
      'Multi-platform scheduling',
      'Hashtag optimizer',
    ],
    competitorStyle: 'like Buffer but with AI content generation built in',
    localPath: '/Users/sivaprakasam/projects/agents/social-media-calendar',
    vercelUrl: 'social-media-calendar.vercel.app',
    githubRepo: 'infosiva/social-media-calendar',
  },
  {
    id: 'ai-investment-tracker',
    name: 'WealthPilot',
    tagline: 'Track investments with AI insights',
    category: 'FinTech',
    primaryAction: 'track',
    audience: ['consumer', 'professional'],
    mood: ['authoritative', 'serious', 'premium'],
    colorPalette: ['#064e3b', '#10b981', '#f59e0b'],
    contentDensity: 'dense',
    keyFeatures: [
      'Portfolio tracking',
      'AI market insights',
      'Risk analysis',
      'P&L dashboard',
    ],
    competitorStyle: 'like Bloomberg but consumer-friendly',
    localPath: '/Users/sivaprakasam/projects/agents/ai-investment-tracker',
    vercelUrl: 'ai-investment-tracker-delta.vercel.app',
    githubRepo: 'infosiva/ai-investment-tracker',
  },
  {
    id: 'ai-travel-planner',
    name: 'WanderAI',
    tagline: 'AI travel planner for dream trips',
    category: 'TravelTech',
    primaryAction: 'generate',
    audience: ['consumer'],
    mood: ['playful', 'premium', 'energetic'],
    colorPalette: ['#0284c7', '#06b6d4', '#f59e0b'],
    contentDensity: 'medium',
    keyFeatures: [
      'Full itinerary generation',
      'Budget optimization',
      'Local hidden gems',
      'Packing list AI',
    ],
    competitorStyle: 'like TripIt but AI-generated from scratch',
    localPath: '/Users/sivaprakasam/projects/agents/ai-travel-planner',
    vercelUrl: 'ai-travel-planner-vert.vercel.app',
    githubRepo: 'infosiva/ai-travel-planner',
  },
  {
    id: 'language-learning-bot',
    name: 'SpeakFast',
    tagline: 'Learn any language 3x faster with AI',
    category: 'EdTech',
    primaryAction: 'learn',
    audience: ['student', 'consumer', 'professional'],
    mood: ['playful', 'energetic'],
    colorPalette: ['#7c3aed', '#06b6d4', '#10b981'],
    contentDensity: 'medium',
    keyFeatures: [
      'Conversational AI practice',
      'Grammar correction in real-time',
      'Gamified progress system',
      'Pronunciation feedback',
    ],
    competitorStyle: 'like Duolingo but chat-native, no gamification overload',
    localPath: '/Users/sivaprakasam/projects/agents/language-learning-bot',
    vercelUrl: 'language-learning-bot-blue.vercel.app',
    githubRepo: 'infosiva/language-learning-bot',
  },
]
