const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..", "..");
const newsletterDir = path.join(rootDir, "Content", "newsletters");
const substackDir = path.join(rootDir, "Content", "Substack");
const statePath = path.join(substackDir, "newsletter_substack_state.json");

const args = new Set(process.argv.slice(2));
const initBaseline = args.has("--init-baseline");
const force = args.has("--force");

function readState() {
  if (!fs.existsSync(statePath)) {
    return { version: 1, sources: {} };
  }

  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function writeState(state) {
  state.updatedAt = new Date().toISOString();
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n", "utf8");
}

function hashContent(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function decodeEntities(value) {
  const named = {
    amp: "&",
    lt: "<",
    gt: ">",
    nbsp: " ",
    middot: ",",
    rsquo: "'",
    lsquo: "'",
    rdquo: '"',
    ldquo: '"',
    quot: '"',
    apos: "'",
    mdash: ",",
    ndash: ","
  };

  return value
    .replace(/&#(\d+);/g, (_, number) => String.fromCharCode(Number(number)))
    .replace(/&#x([0-9a-f]+);/gi, (_, number) => String.fromCharCode(parseInt(number, 16)))
    .replace(/&([a-z]+);/gi, (_, name) => named[name.toLowerCase()] || "");
}

function stripTags(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, ""))
    .replace(/\{\{[^}]+\}\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCaseFromFile(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^NEWSLETTER[_\s]*/i, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b[a-z]/g, char => char.toUpperCase());
}

function extractTitle(html, fileName) {
  const headings = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(match => stripTags(match[1]));
  const ignored = new Set([
    "Summer Online Practice",
    "Choose the Pass That Fits Your Summer",
    "An Invitation to Slow Down: The Sacred Journey Workshop",
    "Free Writing at the Gate",
    "A Gentle Practice For Remembering"
  ]);

  const likelyTitle = headings.find(heading => heading && !ignored.has(heading));
  if (likelyTitle) {
    return likelyTitle;
  }

  const h2 = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (h2) {
    return stripTags(h2[1]).replace(/^Newsletter\s*\|\s*/i, "");
  }

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title) {
    return stripTags(title[1]).replace(/^Newsletter\s*\|\s*/i, "");
  }

  return titleCaseFromFile(fileName);
}

function slugify(title) {
  return title
    .normalize("NFKD")
    .replace(/[^\w\s]/g, "")
    .trim()
    .replace(/\s+/g, "_");
}

function nextNumber() {
  const numbers = fs.readdirSync(substackDir)
    .map(name => /^(\d+)_/.exec(name))
    .filter(Boolean)
    .map(match => Number(match[1]));

  return numbers.length ? Math.max(...numbers) + 1 : 1;
}

function findExistingOutput(title) {
  const slug = slugify(title).toLowerCase();
  return fs.readdirSync(substackDir).find(name => {
    if (!/^\d+_.*\.md$/i.test(name)) {
      return false;
    }

    return name.toLowerCase().includes(slug);
  }) || null;
}

function convertInline(html) {
  let text = html;
  text = text.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
    if (href.includes("unsubscribe") || href.includes("{{")) {
      return "";
    }

    return `[${stripTags(label)}](${href})`;
  });
  text = text.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  text = text.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  text = text.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  text = text.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");
  return stripTags(text);
}

function htmlToMarkdown(html) {
  let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;

  body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  body = body.replace(/<!--[\s\S]*?-->/g, "");
  body = body.replace(/<div[^>]*class=["'][^"']*header[^"']*["'][^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, "");
  body = body.replace(/<div[^>]*class=["'][^"']*footer[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "");
  body = body.replace(/<table[\s\S]*?<\/table>/gi, "");
  body = body.replace(/<div[^>]*class=["'][^"']*btn-wrap[^"']*["'][^>]*>\s*([\s\S]*?)<\/div>/gi, "$1");
  body = body.replace(/<span[^>]*class=["'][^"']*best-fit[^"']*["'][^>]*>[\s\S]*?<\/span>/gi, "");

  body = body.replace(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, "\n\n![$2]($1)\n\n");
  body = body.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*>/gi, "\n\n![$1]($2)\n\n");
  body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n");
  body = body.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n");
  body = body.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n\n### $1\n\n");
  body = body.replace(/<p[^>]*>\s*Hello\s*\{\{contact\.first_name\}\},?\s*<\/p>/gi, "\n\n## Personal Intro\n\nHello,\n\n");
  body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, content) => `\n\n${convertInline(content)}\n\n`);
  body = body.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, content) => `\n\n${convertInline(content)}\n\n`);
  body = body.replace(/<br\s*\/?>/gi, "\n");
  body = body.replace(/<[^>]+>/g, "\n");

  let markdown = decodeEntities(body)
    .replace(/\{\{[^}]+\}\}/g, "")
    .replace(/\r/g, "")
    .split("\n")
    .map(line => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();

  if (!markdown.startsWith("## Personal Intro")) {
    markdown = markdown.replace(/^Hello,?\s*/i, "## Personal Intro\n\nHello,\n\n");
  }

  markdown = markdown.replace(/## This Week's Wellness Wisdom\s+###/g, "## This Week's Wellness Wisdom\n\n###");
  markdown = markdown.replace(/### By Laura Harvey \| Beyond the Bend Yoga/gi, "*By Laura Harvey | Beyond the Bend Yoga*");
  markdown = markdown.replace(/\n\s*Unsubscribe\s*$/i, "");
  return markdown;
}

function convertNewsletter(filePath, stateEntry) {
  const html = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath);
  const title = extractTitle(html, fileName);
  const date = fs.statSync(filePath).mtime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  let outputName = stateEntry?.output;
  if (!outputName) {
    const existing = findExistingOutput(title);
    outputName = existing || `${String(nextNumber()).padStart(2, "0")}_${slugify(title)}.md`;
  }

  const body = htmlToMarkdown(html);
  const full = `# ${title}\n\n*By Laura Harvey | Beyond the Bend Yoga*\n\n*${date}*\n\n${body}\n\n**Beyond the Bend Yoga**\n\nRising Moon Studio, Sherwood Park, AB\n\n[beyondthebendyoga.ca](https://beyondthebendyoga.ca)\n`;
  fs.writeFileSync(path.join(substackDir, outputName), full, "utf8");

  return outputName;
}

function candidateFiles() {
  return fs.readdirSync(newsletterDir)
    .filter(name => /\.html$/i.test(name))
    .filter(name => /newsletter/i.test(name))
    .map(name => path.join(newsletterDir, name))
    .sort((a, b) => fs.statSync(a).mtimeMs - fs.statSync(b).mtimeMs);
}

function main() {
  const state = readState();
  let created = 0;
  let skipped = 0;
  let baselined = 0;

  for (const filePath of candidateFiles()) {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const hash = hashContent(content);
    const previous = state.sources[fileName];

    if (initBaseline && !previous) {
      const title = extractTitle(content, fileName);
      state.sources[fileName] = {
        hash,
        output: findExistingOutput(title),
        status: "baseline",
        updatedAt: new Date().toISOString()
      };
      baselined += 1;
      continue;
    }

    if (!force && previous && previous.hash === hash) {
      skipped += 1;
      continue;
    }

    const output = convertNewsletter(filePath, previous);
    state.sources[fileName] = {
      hash,
      output,
      status: "converted",
      updatedAt: new Date().toISOString()
    };
    created += 1;
  }

  writeState(state);
  console.log(`Substack conversion complete. Created or updated: ${created}. Skipped: ${skipped}. Baselined: ${baselined}.`);
}

main();
