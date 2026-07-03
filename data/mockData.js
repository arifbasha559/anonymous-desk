export const TRENDING_TOPICS = [
  "#SalaryNeg",
  "#WorkLifeBalance",
  "#Management",
  "#Burnout",
  "#CareerSwitch",
  "#Ethics",
];

export const POSTS = [
  {
    id: "1",
    category: "Tech",
    categoryIcon: "laptop-outline",
    timeAgo: "2h ago",
    title:
      "How do I handle a manager who continually takes credit for my architecture proposals in leadership meetings?",
    upvotes: 142,
    replies: 38,
    isHot: true,
    readingNow: 12,
    tags: ["Management", "Ethics"],
    body: `My manager consistently presents my architecture designs in leadership meetings without attributing them to me. I've confronted them twice privately but nothing changes.

Management is being completely opaque about this. Has anyone navigated a similar situation? What specific questions should I be asking HR or legal without raising red flags or appearing like a flight risk?`,
    aiSummary:
      'Document with timestamps, CC yourself on proposals. Request skip-level 1:1. Frame as "seeking alignment on attribution process."',
    comments: [
      {
        id: "c1",
        role: "Software Engineer",
        experience: "9 yrs",
        isExpert: true,
        timeAgo: "1h ago",
        body: "Document everything with timestamps. Forward key emails to your personal account before you do anything else. Then request a 1:1 with your skip-level and frame it as wanting to understand the leadership communication process.",
        helpful: 84,
        isExpertReply: true,
      },
      {
        id: "c2",
        role: "Engineering Manager",
        experience: "6 yrs",
        isExpert: true,
        timeAgo: "45m ago",
        body: "As a manager I've seen this pattern. Visibility is key — start presenting your own work in team meetings proactively before the leadership sync. Send follow-up emails summarizing your proposals with your name clearly attached.",
        helpful: 57,
        isExpertReply: true,
      },
      {
        id: "c3",
        role: "Senior SWE",
        experience: "4 yrs",
        isExpert: false,
        timeAgo: "30m ago",
        body: "I went through this exact situation last year. The turning point was when I started sending pre-meeting summaries to my manager and their manager simultaneously. Made it very hard to erase my involvement.",
        helpful: 31,
        isExpertReply: false,
      },
    ],
  },
  {
    id: "2",
    category: "Legal",
    categoryIcon: "scale-outline",
    timeAgo: "4h ago",
    title:
      "Discovering compliance violations during an internal audit. The partners want to bury it. What is my liability if I stay silent?",
    upvotes: 89,
    replies: 64,
    isHot: false,
    readingNow: null,
    tags: ["Ethics", "Legal"],
    body: `During a routine internal audit I uncovered what appear to be significant compliance violations. When I raised this with senior partners they strongly suggested I "reframe" my findings.

I'm deeply uncomfortable. What is my actual legal exposure if I comply with their request versus if I escalate?`,
    aiSummary:
      "Consult an employment attorney immediately before taking any action. Document everything. Whistleblower protections may apply.",
    comments: [
      {
        id: "c4",
        role: "M&A Attorney",
        experience: "12 yrs",
        isExpert: true,
        timeAgo: "3h ago",
        body: "Do NOT take any action without consulting an employment attorney first. Depending on your industry, you may have mandatory reporting obligations. Staying silent could make you complicit. Whistleblower protections are stronger than most people realize.",
        helpful: 102,
        isExpertReply: true,
      },
    ],
  },
  {
    id: "3",
    category: "Finance",
    categoryIcon: "trending-up-outline",
    timeAgo: "6h ago",
    title:
      "I suspect our Q3 projections are being artificially inflated before the upcoming merger. Looking for advice from senior analysts.",
    upvotes: 215,
    replies: 112,
    isHot: true,
    readingNow: null,
    tags: ["Ethics", "Finance"],
    body: `The numbers I'm seeing in our Q3 projections don't match the underlying data I have access to. We have a merger announcement expected next quarter.

I don't know if this is intentional or an error, but I'm being pressured to sign off on the analysis. What should I do?`,
    aiSummary:
      "This may involve securities law. Do not sign off. Consult legal counsel. SEC whistleblower program offers strong protections.",
    comments: [],
  },
  {
    id: "4",
    category: "Healthcare",
    categoryIcon: "medkit-outline",
    timeAgo: "8h ago",
    title:
      "Admin is pushing for shorter patient consultation times to boost throughput. How are other department heads pushing back effectively?",
    upvotes: 304,
    replies: 45,
    isHot: true,
    readingNow: 28,
    tags: ["Management", "Ethics"],
    body: `Hospital admin has mandated a 20% reduction in average consultation times citing efficiency metrics. As a department head I believe this directly compromises patient care quality and potentially safety.

Other department heads seem to be quietly complying. How do I push back without being sidelined?`,
    aiSummary:
      "Frame pushback in terms of liability and outcomes data. Request a joint clinical-admin review. Document patient safety concerns formally.",
    comments: [],
  },
  {
    id: "5",
    category: "Tech",
    categoryIcon: "laptop-outline",
    timeAgo: "10h ago",
    title:
      "Navigating an acquisition while holding unvested equity. My company is in late-stage talks and management is being opaque about acceleration clauses.",
    upvotes: 178,
    replies: 29,
    isHot: false,
    readingNow: null,
    tags: ["Salary", "Career Switch"],
    body: `My company is currently in late-stage talks for an acquisition. I hold a significant amount of unvested equity that makes up a large portion of my total compensation package over the next 3 years.

Management is being completely opaque about acceleration clauses. Has anyone navigated a similar situation? What specific questions should I be asking HR or legal without raising red flags or appearing like a flight risk?`,
    aiSummary:
      'Request "Change of Control" language from your equity administrator. Frame inquiry as standard personal financial planning to maintain anonymity.',
    comments: [
      {
        id: "c5",
        role: "VP of Finance",
        experience: "12 yrs",
        isExpert: true,
        timeAgo: "1h ago",
        body: 'You need to request the exact language regarding "Change of Control" in your grant agreement. Look specifically for "Single Trigger" vs "Double Trigger" acceleration. If they are being opaque, you can frame the request purely as standard financial planning: "I am updating my long-term personal financial plan with my advisor and need to confirm the vesting schedule mechanics in the event of any corporate restructuring." This is a common, mature request.',
        helpful: 24,
        isExpertReply: true,
      },
      {
        id: "c6",
        role: "M&A Attorney",
        experience: "8 yrs",
        isExpert: true,
        timeAgo: "45m ago",
        body: "To add to the excellent advice above: Do not ask HR directly. Ask your designated equity administrator (e.g., Shareworks, Carta) for your specific grant documents. Also, review your original employment offer letter, as sometimes favorable acceleration terms are stipulated there rather than in the generic plan document.",
        helpful: 8,
        isExpertReply: true,
      },
    ],
  },
];

export const CONTEXT_TAGS = [
  "Salary",
  "Management",
  "Ethics",
  "Burnout",
  "Career Switch",
  "Legal",
  "HR",
  "Workplace Culture",
  "Other",
];

export const RECENT_ACTIVITY = [
  {
    id: "a1",
    type: "reply",
    icon: "chatbubble-outline",
    text: 'Replied to "Scaling SaaS Infrastructure"',
    timeAgo: "2 hours ago",
  },
  {
    id: "a2",
    type: "karma",
    icon: "star-outline",
    text: 'Earned +50 Karma for "Database Optimization"',
    timeAgo: "5 hours ago",
  },
  {
    id: "a3",
    type: "post",
    icon: "document-text-outline",
    text: 'Posted "Future of Anonymous Networks"',
    timeAgo: "Yesterday",
  },
  {
    id: "a4",
    type: "reply",
    icon: "chatbubble-outline",
    text: 'Replied to "Handling toxic team dynamics"',
    timeAgo: "2 days ago",
  },
];

