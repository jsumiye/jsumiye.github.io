"use strict";

document.querySelectorAll('a[target="_blank"]').forEach((anchor) => {
  const note = "opens in a new tab";
  const label = anchor.getAttribute("aria-label");
  if (label) {
    if (!label.includes(note)) {
      anchor.setAttribute("aria-label", label + " (" + note + ")");
    }
    return;
  }
  if (anchor.querySelector(".sr-only")) return;
  const span = document.createElement("span");
  span.className = "sr-only";
  span.textContent = " (" + note + ")";
  anchor.appendChild(span);
});

const diagrams = document.querySelectorAll(".mermaid");
if (diagrams.length) {
  import("https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs")
    .then((mod) => {
      const mermaid = mod.default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "strict",
        flowchart: { curve: "linear", padding: 10 },
        themeVariables: {
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "14px",
          background: "#f1eee6",
          primaryColor: "#faf8f4",
          primaryTextColor: "#1c1916",
          primaryBorderColor: "#cfc8bb",
          lineColor: "#6f6a63",
          secondaryColor: "#f4f1ea",
          tertiaryColor: "#faf8f4",
          clusterBkg: "#faf8f4",
          clusterBorder: "#cfc8bb",
          edgeLabelBackground: "#f1eee6",
        },
      });
      return mermaid.run({ nodes: diagrams });
    })
    .catch(() => {
      // The diagram source stays visible if the CDN script does not load.
    });
}
