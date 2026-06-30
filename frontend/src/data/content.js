// RoboFounders content + media constants

export const LOGO = "/images/logo-icon.png";
export const LOGO_FULL = "/images/logo-full.png";
export const LOGO_MARK = "/images/logo-mark.png";

export const MEDIA = {
  heroVideo: "/videos/hero.mp4",
  globalVideo: "/videos/global-expansion.mp4",
  robotPortrait: "https://images.pexels.com/photos/8294558/pexels-photo-8294558.jpeg",
  robotWhite: "https://images.unsplash.com/photo-1535378273068-9bb67d5beacd",
  network: "https://images.unsplash.com/photo-1637166185518-058f5896a2e9",
  founder: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6",
  team: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
  event1: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
  event2: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
  event3: "https://images.unsplash.com/photo-1558008258-3256797b43f3",
};

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#how" },
  { label: "Our Works", href: "#moments" },
  { label: "For Startups", href: "#founders" },
  { label: "Our Teams", href: "#founder" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

// from/to are scroll progress values [0–1] for when each text appears/disappears.
// 0.18–0.82 is left as pure unobstructed video.
export const HERO_SCENES = [
  { from: 0, to: 0.18, tag: "Robot COO", title: "Your Robot COO\nis Here", sub: "Meet the AI-powered operator built to run your global expansion." },
  { from: 0.82, to: 1, tag: "Go Global", title: "Build the Future.\nGo Global.", sub: "Performance-driven partnership. We win when you win." },
];

export const STATS = [
  { value: "6", label: "Global Hubs" },
  { value: "3,000+", label: "Companies Served" },
  { value: "4", label: "IPOs by Founder" },
  { value: "24/7", label: "Robot COO Uptime" },
];

export const STEPS = [
  {
    n: "01",
    kicker: "Vision Meets Execution",
    title: "Activate Your Robot COO",
    body: "Bring your expansion goals. We deploy AI + robotics intelligence and local human teams across our global hubs to build your beachhead.",
  },
  {
    n: "02",
    kicker: "Global Without the Grind",
    title: "Execute on the Ground",
    body: "Full-stack global operations: sales strategy, partnerships, event participation, live demos, market entry and all the heavy lifting.",
  },
  {
    n: "03",
    kicker: "Your Time to Go Global",
    title: "Scale & Dominate",
    body: "Performance-based growth with continuous support from AI robotics and human experts. We win when you win.",
  },
];

export const VALUES = [
  {
    icon: "Target",
    title: "Global Sales & Partnerships",
    body: "Sales strategy and partnership execution that opens doors in Japan, the US, Malaysia and across ASEAN.",
  },
  {
    icon: "CalendarCheck",
    title: "Events, Demos & Presence",
    body: "Real, physical presence at major events — Startup World Cup, Diffusion Sarawak, IVS2026 and beyond.",
  },
  {
    icon: "Bot",
    title: "Human + Robot Team Building",
    body: "Robot COO \u201cRofi\u201d works alongside local human teams at conferences, hackathons and exhibitions.",
  },
  {
    icon: "Cpu",
    title: "Embodied AI for Founders",
    body: "AI-powered robotics and embodied AI engineered specifically for founders scaling internationally.",
  },
  {
    icon: "Globe2",
    title: "On-Ground Market Entry",
    body: "We become your local face — operations, logistics and relationships handled in-region, in-language.",
  },
  {
    icon: "TrendingUp",
    title: "Performance-Driven Model",
    body: "Zero (or low) upfront hassle. We take on execution risk with AI + robotics + local teams.",
  },
];

export const MOMENTUM = [
  { date: "2026", title: "Startup World Cup 2026", body: "Competing with a human–robot mixed team on the world\u2019s biggest startup stage.", tag: "Competing" },
  { date: "2026", title: "Diffusion 2026 — Sarawak", body: "Exhibiting embodied AI and the Robot COO experience to the ASEAN ecosystem.", tag: "Exhibiting" },
  { date: "2026", title: "IVS2026 — Japan", body: "On-ground demos and partnership building across the Japanese startup landscape.", tag: "Exhibiting" },
  { date: "Now", title: "Silicon Valley Launch", body: "New company launch with an aggressive San Francisco / Silicon Valley expansion push.", tag: "Launching" },
  { date: "Ongoing", title: "BuildClub Tokyo", body: "Active organizer involvement, building a founder + robotics community in Tokyo.", tag: "Community" },
];

export const WORKS = [
  { tag: "Market Entry", title: "Japan Beachhead", body: "Set up local sales, partnerships and event presence for a US deeptech startup entering Tokyo.", img: "/images/events/team-ivs.jpeg" },
  { tag: "Live Demos", title: "Robot COO at Conferences", body: "Rofi the Robot COO running live booth demos and lead capture at major exhibitions.", img: "/images/events/robot-hug.jpeg" },
  { tag: "Partnerships", title: "ASEAN Expansion", body: "Built distributor and channel partnerships across Malaysia and Southeast Asia.", img: "/images/events/banner-booth.jpeg" },
];

// Real moments from RoboFounders events, booths and demos.
export const GALLERY = [
  { src: "/images/events/robot-hug.jpeg", caption: "A founder shares a moment with Rofi, our Robot COO", span: "wide" },
  { src: "/images/events/team-ivs.jpeg", caption: "The team on the ground at IVS2026, Japan" },
  { src: "/images/events/team-banner.jpeg", caption: "Partnership conversations at the booth" },
  { src: "/images/events/booth-laptop.jpeg", caption: "Live demos and lead capture in session" },
  { src: "/images/events/founder-laptop.jpeg", caption: "Empowering founders, one expansion at a time" },
  { src: "/images/events/banner-booth.jpeg", caption: "\u201cStop flying. We will be there.\u201d \u2014 our event stand" },
  { src: "/images/events/stickers.jpeg", caption: "Limited-edition IVS2026 boarding pass stickers" },
  { src: "/images/events/ivs-poster.jpeg", caption: "Booth SC-16 \u2014 see you at IVS2026", span: "tall" },
];

export const EVENT_VIDEOS = [
  "/videos/event-demo.mp4",
  "/videos/event-clip2.mp4",
  "/videos/event-clip1.mp4",
];

export const NEWS = [
  { date: "Jun 2026", title: "RoboFounders opens San Francisco hub", body: "Doubling down on Silicon Valley to support founders going global." },
  { date: "May 2026", title: "Rofi debuts at Startup World Cup", body: "Our Robot COO joins the human team on stage for live execution." },
  { date: "Apr 2026", title: "ASEAN partnership network expands", body: "New on-ground partners added across Malaysia and the region." },
];

// Leadership: the Robot COO + the human team behind RoboFounders.
export const TEAM = [
  { name: "Rofi", role: "Robot COO", note: "Our embodied AI operator on the ground", isRobot: true },
  { name: "Hiro Umemoto", role: "Chief Financial Officer", initials: "HU" },
  { name: "Mai Okazawa", role: "Chief Marketing Officer", initials: "MO" },
  { name: "Bong Hao Jie", role: "Chief AI Officer", initials: "BH" },
  { name: "Celine Tan", role: "Chief Strategy Officer", initials: "CT" },
];

// Other ventures the founder has built or leads.
export const FOUNDER_VENTURES = [
  "Summys",
  "Eventsize",
  "RIVENIQ",
  "AI Founder Table",
  "BuildClub Tokyo",
];

export const CONTACT = {
  linkedin: "https://www.linkedin.com/company/robofounders/",
  website: "https://robofounders.net/",
  twitter: "https://x.com/maripto7",
  founderLinkedin: "https://www.linkedin.com/in/marie-asami/",
};
