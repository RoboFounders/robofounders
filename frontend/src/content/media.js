// Public media paths are kept here so reorganizing assets never requires JSX edits.
export const media = {
  logoOnDark: "/images/brand/robofounders-logo-new.png",
  logoOnLight: "/images/brand/robofounders-logo-new.png",
  logoSquare: "/images/brand/robofounders-mark-square.webp",
  logoGalaxy: "/images/brand/robofounders-galaxy-mark.webp",
  contactAddressLight: "/images/brand/contact-address-light.png",
  contactAddressDark: "/images/brand/contact-address-dark.png",
  founder: "/images/team/mariel.webp",
  rofi: "/images/home/rofi-3d.png",
  homeVideo: "/videos/home/physical-ai-concept.mp4",
  home: {
    hero: "/images/home/physical-ai-hero.webp",
    heroDangerousWork: "/images/home/dangerous-manufacturing.webp",
    about: "/images/home/about-factory-team.webp",
    regions: "/images/home/global-ecosystem.webp",
    why: "/images/home/why-robofounders.webp",
    factory: "/images/home/factory-deployment.webp",
    startups: "/images/home/startups-jungle.jpg",
    contact: "/images/home/contact-new.jpg",
  },
  team: {
    takeshi: "/images/team/takeshi.webp",
    hiromichi: "/images/team/hiromichi.png",
    eiichiro: "/images/team/eiichiro.webp",
    yasumitsu: "/images/team/yasumitsu.webp",
    hiro: "/images/team/hiro.webp",
    hao: "/images/team/hao.webp",
    mai: "/images/team/mai.webp",
    celine: "/images/team/celine.webp",
    thao: "/images/team/thao.webp",
  },
  newsBanner: "/images/events/news-banner.jpg",
  newsEvent: "/images/events/news-event-new.jpg",
  diffusionBorneo: "/images/events/diffusion-borneo.jpeg",
  robotHandNew: "/images/products/robot-hand-new.jpg",
  bostonAiWeek: "/images/events/boston-ai-week.jpeg",
  events: [
    "robot-hug",
    "team-ivs",
    "team-banner",
    "booth-laptop",
    "banner-booth",
    "stickers",
    "ivs-poster",
    "startups-jungle",
    "boston-ecosystem",
  ].map((name) => `/images/events/${name}.jpeg`),
  eventSizes: [
    [1246, 1313],
    [1481, 1105],
    [960, 1280],
    [960, 1280],
    [720, 1280],
    [1280, 1707],
    [1169, 1568],
    [2558, 1920],
    [1024, 768],
  ],
  eventVideos: ["event-demo", "event-clip2", "event-clip1"].map(
    (name) => `/videos/events/${name}.mp4`,
  ),
  products: {
    "roller-screw": {
      hero: "/images/products/roller-screw/assembly",
      gallery: ["/images/products/roller-screw/assembly"],
      video: "/videos/products/roller-screw/demonstration.mp4",
    },
    "robotic-hand": {
      hero: "/images/products/robotic-hand/food-handling",
      gallery: [
        "/images/products/robotic-hand/applications",
        "/images/products/robotic-hand/precision-handling",
      ],
    },
  },
};
export const productIds = ["roller-screw", "robotic-hand"];
// Actual exported dimensions; portrait variants are constrained by height.
export const productImageSizes = {
  assembly: { small: 480, width: 1200, height: 1600 },
  "close-up": { small: 640, width: 1600, height: 1200 },
  "food-handling": { small: 640, width: 1600, height: 901 },
  applications: { small: 640, width: 1600, height: 900 },
  "precision-handling": { small: 640, width: 1600, height: 606 },
};
export const contacts = {
  endpoint: "https://formsubmit.co/ajax/r@robofounders.ai",
  cc: "tak@robofounders.net,mai.robofounders@gmail.com,marieasami7@gmail.com",
  linkedin: "https://www.linkedin.com/company/robofounders/",
  founderLinkedin: "https://www.linkedin.com/in/marie-asami/",
  x: "https://x.com/maripto7",
};
