// First-party artwork only. Provenance lives in assets/tool-logos/sources.md.
export const toolBrands = {
  openai: {
    name: "Codex / OpenAI",
    src: "/assets/ai-os/tool-logos/openai-blossom.svg",
    url: "https://openai.com/codex/",
  },
  claude: {
    name: "Anthropic",
    src: "/assets/ai-os/tool-logos/anthropic-mark.svg",
    url: "https://www.anthropic.com/claude-code",
  },
  hermes: {
    name: "Hermes",
    src: "/assets/ai-os/tool-logos/hermes-agent.png",
    url: "https://github.com/NousResearch/hermes-agent",
  },
  qdrant: {
    name: "Qdrant",
    src: "/assets/ai-os/tool-logos/qdrant-mark.svg",
    url: "https://qdrant.tech/",
  },
  semantica: {
    name: "Semantica",
    src: "/assets/ai-os/tool-logos/semantica-mark.svg",
    url: "https://github.com/semantica-agi/semantica",
  },
  obsidian: {
    name: "Obsidian",
    url: "https://obsidian.md/",
  },
  langfuse: {
    name: "Langfuse",
    src: "/assets/ai-os/tool-logos/langfuse-mark.svg",
    url: "https://langfuse.com/",
  },
  gbrain: { name: "GBrain", url: "https://github.com/garrytan/gbrain" },
  mcp: {
    name: "MCP",
    src: "/assets/ai-os/tool-logos/mcp-mark.svg",
    url: "https://modelcontextprotocol.io/",
  },
};

export function logoImage(key) {
  const brand = toolBrands[key];
  const image = document.createElement("img");
  image.width = 24;
  image.height = 24;
  image.alt = "";
  if (brand?.src) image.src = brand.src;
  image.className = "tool-logo";
  return image;
}

export function decorateToolLogos(root = document) {
  root.querySelectorAll("[data-tool-logo]").forEach((element) => {
    if (toolBrands[element.dataset.toolLogo]?.src)
      element.replaceChildren(logoImage(element.dataset.toolLogo));
  });
}

export function toolKey(label) {
  return {
    Qdrant: "qdrant",
    Semantica: "semantica",
    Obsidian: "obsidian",
    GBrain: "gbrain",
    Langfuse: "langfuse",
    MCP: "mcp",
    Hermes: "hermes",
    Codex: "openai",
    "Claude Code": "claude",
    SharePoint: "sharepoint",
  }[label];
}
