import fs from "fs";
import path from "path";
import en from "./en";
import ja from "./ja";
import { media, productIds } from "./media";
import { newsArticles } from "./newsData";

function leaves(value, prefix = "") {
  return Object.entries(value).flatMap(([key, item]) =>
    typeof item === "object"
      ? leaves(item, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}
test("English and Japanese have complete matching content structures", () => {
  expect(leaves(ja).sort()).toEqual(leaves(en).sort());
  for (const content of [en, ja]) {
    for (const key of leaves(content))
      expect(
        key
          .split(".")
          .reduce((value, part) => value[part], content)
          .trim(),
      ).not.toBe("");
  }
});
test("both launch products have optimized media and matching gallery descriptions", () => {
  const publicFile = (file) =>
    path.resolve(__dirname, "../../public", file.slice(1));
  for (const id of productIds) {
    const assets = media.products[id];
    for (const image of [assets.hero, ...assets.gallery]) {
      for (const size of [640, 1600])
        expect(fs.existsSync(publicFile(`${image}-${size}.webp`))).toBe(true);
    }
    if (assets.video)
      expect(fs.existsSync(publicFile(assets.video))).toBe(true);
    for (const locale of [en, ja])
      expect(locale.products[id].galleryAlts).toHaveLength(
        assets.gallery.length,
      );
  }
});

test("client-provided homepage and team images are present", () => {
  const publicFile = (file) =>
    path.resolve(__dirname, "../../public", file.slice(1));
  for (const image of [
    ...Object.values(media.home),
    media.founder,
    ...Object.values(media.team),
  ]) {
    expect(fs.existsSync(publicFile(image))).toBe(true);
  }
  expect(fs.existsSync(publicFile(media.homeVideo))).toBe(true);
});

test("homepage content follows the current client worksheet direction", () => {
  expect(en.nav).toEqual([
    "Home",
    "About Us",
    "Products",
    "Our Works",
    "For Startups",
    "News & Events",
    "Our Teams",
    "Contact",
  ]);
  expect(en.hero.accent).toBe("for Dangerous Manufacturing.");
  expect(en.hero.line).toBe("Protect People. Automate Danger.");
  expect(ja.hero.title).toBe("危険な製造現場を、");
  expect(ja.hero.line).toBe("人を守る。危険をロボットに。");
  expect(en.footer.tagline).toBe(
    "The Physical AI Platform for Dangerous Manufacturing.",
  );
  expect(productIds).toEqual(["roller-screw", "robotic-hand"]);
  expect(en.team.members.map(({ name, role }) => [name, role])).toEqual([
    ["Takeshi Kanamori", "COO"],
    ["Hiromichi Sasaki", "Robotics Engineering Director"],
    ["Eiichiro Nakamizo", "Regional Director, Kansai"],
    ["Yasumitsu Morita", "Strategic Advisor"],
    ["Hiro Umemoto", "CFO Office"],
    ["Hao Jie Bong", "AI Office"],
    ["Mai Okazawa", "Chief Marketing Officer"],
    ["Celine Tan", "Head of Borneo Office"],
    ["Thao Le", "Head of Da Nang Office, Vietnam"],
  ]);
  expect(Object.keys(media.team).sort()).toEqual(
    en.team.members.map(({ id }) => id).sort(),
  );
});

test("public content excludes investment and fundraising language", () => {
  const publicContent = JSON.stringify({ en, ja, newsArticles }).replaceAll(
    "Apollo Capital",
    "",
  );
  expect(publicContent).not.toMatch(
    /fundrais|investor|investment|venture capital|capital partnership|capital alliance|\bcapital\b|資金調達|投資家|資本提携|戦略的投資|資本|戦略的アライアンス/i,
  );
});

test("latest worksheet news and marquee content is available in both languages", () => {
  expect(newsArticles["diffusion-borneo-beyond-poc"]).toBeDefined();
  expect(en.marquee.items).toEqual(
    expect.arrayContaining([
      "Physical AI for Manufacturing",
      "From Factory to World.",
      "Robots Taking on Dangerous Work.",
    ]),
  );
  expect(ja.marquee.items).toHaveLength(en.marquee.items.length);
});
