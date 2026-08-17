import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./ToolkitGraph.module.css";

/** An entry may be a bare label, or carry a caption and its own children. */
type Item = string | { label: string; blurb?: string; items?: Item[] };

type Cluster = {
  id: string;
  label: string;
  color: string;
  blurb: string;
  items: Item[];
};

type Node = {
  index: number;
  label: string;
  blurb?: string;
  color: string;
  kind: "root" | "cluster" | "leaf";
  /** top-level cluster this node belongs to — drives the lit/dimmed state */
  group: string | null;
  depth: number;
  parent: number;
  children: number[];
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Link = { a: number; b: number; rest: number };
type Point = { x: number; y: number };

const INK = "#141414";
const PAPER = "#F7F7F7";

const REPULSION = 1500;
const REPULSION_RANGE = 170;
const SPRING = 0.02;
const GRAVITY = 0.003;
const DAMPING = 0.88;
const MAX_SPEED = 7;
const MAX_LABEL_LINES = 5;

const REFERENCE_AREA = 1178 * 468;

function tint(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const p = parseInt(PAPER.slice(1), 16);
  const mix = (c: number, pc: number) => Math.round(c + (pc - c) * amount);
  return `rgb(${mix(r, (p >> 16) & 255)}, ${mix(g, (p >> 8) & 255)}, ${mix(
    b,
    p & 255
  )})`;
}

function wrapLabel(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines.slice(0, MAX_LABEL_LINES);
}

const itemLabel = (item: Item) => (typeof item === "string" ? item : item.label);
const itemBlurb = (item: Item) =>
  typeof item === "string" ? undefined : item.blurb;
const itemChildren = (item: Item) =>
  typeof item === "string" ? undefined : item.items;

export const ToolkitGraph = () => {
  const { t, i18n } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<number | null>(null);
  const dragRef = useRef<number | null>(null);

  const [caption, setCaption] = useState<{ text: string; color?: string } | null>(
    null
  );
  /** Cluster pinned open from the legend, showing its whole tree. */
  const [selected, setSelected] = useState<string | null>(null);
  const selectedRef = useRef<string | null>(null);
  selectedRef.current = selected;

  const lang = i18n.language;
  const clusters = useMemo(
    () => t("toolkit.clusters", { returnObjects: true }) as Cluster[],
    [t, lang]
  );
  const centerLabel = useMemo(() => t("toolkit.centerLabel"), [t, lang]);
  const hint = useMemo(() => t("toolkit.hint"), [t, lang]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const backdrop = document.createElement("canvas");
    const bctx = backdrop.getContext("2d");
    if (!bctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let alpha = 1;
    let scale = 1;

    /** Index of the node whose children are currently fanned out. */
    let openIndex: number | null = null;
    /** Where each fanned-out child should sit, and which side its label takes. */
    const openTargets = new Map<number, Point>();
    const openSides = new Map<number, boolean>();
    const openHomes = new Map<number, Point>();
    let openT = 0;
    let closing = false;
    let backdropDirty = true;
    /** true = whole-cluster tree from the legend, false = hover fan */
    let treeMode = false;

    const BACKDROP_SCALE = 0.5;
    const OPEN_MS = 700;
    const CLOSE_MS = 450;
    const easeOutCubic = (v: number) => 1 - Math.pow(1 - v, 3);

    // ---- build the graph -------------------------------------------------
    const nodes: Node[] = [];
    const links: Link[] = [];

    const push = (n: Omit<Node, "index" | "children">) => {
      const index = nodes.length;
      nodes.push({ ...n, index, children: [] });
      return index;
    };

    const rootIndex = push({
      label: centerLabel,
      color: INK,
      kind: "root",
      group: null,
      depth: 0,
      parent: 0,
      r: 11,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    });

    const addItem = (
      item: Item,
      parent: number,
      cluster: Cluster,
      depth: number,
      angle: number
    ) => {
      const spread = angle + (Math.random() - 0.5) * 1.2;
      const reach = depth === 1 ? 200 : 90;
      const index = push({
        label: itemLabel(item),
        blurb: itemBlurb(item),
        color: cluster.color,
        kind: "leaf",
        group: cluster.id,
        depth,
        parent,
        r: depth === 1 ? 4 : 3.2,
        x: nodes[parent].x + Math.cos(spread) * reach,
        y: nodes[parent].y + Math.sin(spread) * reach * 0.8,
        vx: 0,
        vy: 0,
      });
      nodes[parent].children.push(index);
      links.push({ a: parent, b: index, rest: depth === 1 ? 55 : 42 });

      itemChildren(item)?.forEach((child) =>
        addItem(child, index, cluster, depth + 1, angle)
      );
    };

    clusters.forEach((cluster, ci) => {
      const angle = (ci / clusters.length) * Math.PI * 2;
      const clusterIndex = push({
        label: cluster.label,
        blurb: cluster.blurb,
        color: cluster.color,
        kind: "cluster",
        group: cluster.id,
        depth: 0,
        parent: rootIndex,
        r: 7.5,
        x: Math.cos(angle) * 130,
        y: Math.sin(angle) * 100,
        vx: 0,
        vy: 0,
      });
      nodes[rootIndex].children.push(clusterIndex);
      links.push({ a: rootIndex, b: clusterIndex, rest: 120 });

      cluster.items.forEach((item) => addItem(item, clusterIndex, cluster, 1, angle));
    });

    // ---- sizing ----------------------------------------------------------
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      scale = Math.max(0.5, Math.min(1.1, Math.sqrt((width * height) / REFERENCE_AREA)));
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      backdrop.width = Math.max(1, Math.round(width * dpr * BACKDROP_SCALE));
      backdrop.height = Math.max(1, Math.round(height * dpr * BACKDROP_SCALE));

      alpha = Math.max(alpha, 0.3);
      backdropDirty = true;
      if (openIndex !== null) {
        if (treeMode) layoutTree(openIndex);
        else layoutOpen(openIndex);
      }
    };

    const radiusOf = (n: Node) => n.r * (scale < 0.8 ? 0.85 : 1);
    const labelRoom = () => Math.min(250, width * 0.34);

    const fontFor = (n: Node) => {
      const shrink = scale < 0.8 ? 0.85 : 1;
      return Math.round(
        (n.kind === "leaf" ? 11 : n.kind === "root" ? 13 : 12) * shrink
      );
    };

    const wrapCache = new Map<string, string[]>();
    const wrapCached = (
      c: CanvasRenderingContext2D,
      text: string,
      maxWidth: number,
      size: number
    ) => {
      const key = `${size}|${Math.round(maxWidth)}|${text}`;
      let lines = wrapCache.get(key);
      if (!lines) {
        lines = wrapLabel(c, text, maxWidth);
        wrapCache.set(key, lines);
      }
      return lines;
    };

    /**
     * Measures a fanned-out child: its wrapped label plus, underneath, its
     * detail line (a university and location, or a project description).
     * Layout and drawing share this so row heights always match what is drawn.
     */
    const measureFanned = (n: Node) => {
      const size = fontFor(n);
      const subSize = Math.max(9, size - 1);
      const lead = size + 4;
      const subLead = subSize + 3;
      const textWidth = labelRoom() - 26;

      ctx.font = `${size}px "JetBrains Mono", ui-monospace, monospace`;
      const lines = wrapCached(ctx, n.label, textWidth, size);

      let subLines: string[] = [];
      if (n.blurb) {
        ctx.font = `${subSize}px "JetBrains Mono", ui-monospace, monospace`;
        subLines = wrapCached(ctx, n.blurb, textWidth, subSize).slice(0, 4);
      }

      const totalH =
        lines.length * lead + (subLines.length ? 6 + subLines.length * subLead : 0);
      return { size, subSize, lead, subLead, lines, subLines, totalH };
    };

    /**
     * Lays the open node's children into two columns. Row height follows each
     * label's wrapped line count, so a five-line paper title can't sit on top
     * of the entry below it.
     */
    const layoutOpen = (index: number) => {
      openTargets.clear();
      openSides.clear();

      const parent = nodes[index];
      const kids = parent.children;
      if (!kids.length) return;

      const anchor = { x: parent.x, y: parent.y };
      const pad = labelRoom();
      const offsetX = Math.max(100, 160 * scale);
      const rightCount = Math.ceil(kids.length / 2);
      const columns = [kids.slice(0, rightCount), kids.slice(rightCount)];

      columns.forEach((column, side) => {
        if (!column.length) return;
        const toRight = side === 0;

        const heights = column.map((k) =>
          Math.max(30, measureFanned(nodes[k]).totalH + 16)
        );
        const total = heights.reduce((a, b) => a + b, 0);

        // shift the column as a block so it stays on canvas without squashing
        let y = Math.min(
          Math.max(16, height - 16 - total),
          Math.max(16, anchor.y - total / 2)
        );
        const x = Math.min(
          width - pad,
          Math.max(pad, anchor.x + (toRight ? offsetX : -offsetX))
        );

        column.forEach((k, i) => {
          openTargets.set(k, { x, y: y + heights[i] / 2 });
          openSides.set(k, toRight);
          y += heights[i];
        });
      });
    };

    /** Column width of the current tree layout, used when wrapping labels. */
    let treeColGap = 260;

    /** Column x for a given depth below the selected cluster. */
    const treeColumn = (depth: number, colGap: number) => 64 + depth * colGap;

    /**
     * Tidy left-to-right tree for a whole cluster: every descendant gets a
     * row, leaves stack, and each parent centres on its children. Rows are
     * compressed to fit rather than spilling off the canvas.
     */
    const layoutTree = (clusterIndex: number) => {
      openTargets.clear();
      openSides.clear();

      const cluster = nodes[clusterIndex];
      let maxDepth = 0;
      let leafCount = 0;
      const walk = (idx: number, depth: number) => {
        maxDepth = Math.max(maxDepth, depth);
        const kids = nodes[idx].children;
        if (!kids.length) leafCount++;
        else kids.forEach((k) => walk(k, depth + 1));
      };
      walk(clusterIndex, 0);

      // Reserve room to the right of the last column for its labels, or the
      // deepest entries run off the edge of the canvas.
      const labelReserve = Math.min(190, width * 0.26);
      const colGap = Math.min(
        300,
        Math.max(120, (width - 64 - labelReserve) / Math.max(1, maxDepth))
      );

      // Rows fit a three-line label, shrinking only if there are too many
      // leaves to fit the canvas at that height.
      const fullRow = 46 * (scale < 0.8 ? 0.85 : 1);
      const rowHeight = Math.max(
        18,
        Math.min(fullRow, (height - 44) / Math.max(1, leafCount))
      );

      let cursor = 0;
      const place = (idx: number, depth: number): number => {
        const kids = nodes[idx].children;
        let y: number;
        if (!kids.length) {
          y = cursor;
          cursor += rowHeight;
        } else {
          const ys = kids.map((k) => place(k, depth + 1));
          y = (ys[0] + ys[ys.length - 1]) / 2;
        }
        openTargets.set(idx, { x: treeColumn(depth, colGap), y });
        return y;
      };
      place(clusterIndex, 0);

      // centre the whole tree vertically
      const span = Math.max(0, cursor - rowHeight);
      const shift = height / 2 - span / 2;
      openTargets.forEach((p) => {
        p.y = Math.min(height - 16, Math.max(16, p.y + shift));
      });

      treeColGap = colGap;
      void cluster;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    resize();

    nodes.forEach((n) => {
      n.x += width / 2;
      n.y += height / 2;
    });

    /** Hovering a node with no children opens its parent, i.e. its siblings. */
    const openTargetFor = (n: Node | null) => {
      if (!n || n.kind === "root") return null;
      return n.children.length ? n.index : n.parent;
    };

    const beginOpen = (index: number | null, tree = false) => {
      openIndex = index;
      treeMode = tree;
      openHomes.clear();
      openT = 0;
      closing = false;
      backdropDirty = true;

      if (index === null) {
        openTargets.clear();
        openSides.clear();
        return;
      }
      if (tree) layoutTree(index);
      else layoutOpen(index);
      openTargets.forEach((_, k) => {
        openHomes.set(k, { x: nodes[k].x, y: nodes[k].y });
      });
    };

    const litGroup = () => (openIndex === null ? null : nodes[openIndex].group);

    // ---- simulation ------------------------------------------------------
    const step = (dt: number) => {
      const dragged = dragRef.current;
      const hoverNode = hoverRef.current !== null ? nodes[hoverRef.current] : null;

      // A cluster pinned from the legend wins over whatever is hovered.
      const sel = selectedRef.current;
      const selIndex =
        sel === null
          ? -1
          : nodes.findIndex((n) => n.kind === "cluster" && n.group === sel);
      const wantTree = selIndex !== -1;
      const desired = wantTree ? selIndex : openTargetFor(hoverNode);

      if (desired !== openIndex || wantTree !== treeMode) {
        if (openIndex !== null && openT > 0) closing = true;
        else beginOpen(desired, wantTree);
      } else if (closing) {
        closing = false;
      }

      if (closing) {
        openT -= dt / CLOSE_MS;
        if (openT <= 0) beginOpen(desired, wantTree);
      } else if (openIndex !== null) {
        openT = Math.min(1, openT + dt / OPEN_MS);
      }

      if (openIndex !== null && dragged === null) {
        const eased = easeOutCubic(Math.max(0, openT));
        openTargets.forEach((target, k) => {
          const home = openHomes.get(k);
          if (!home) return;
          const n = nodes[k];
          n.x = home.x + (target.x - home.x) * eased;
          n.y = home.y + (target.y - home.y) * eased;
          n.vx = 0;
          n.vy = 0;
        });
        return;
      }

      alpha *= 0.985;
      if (alpha < 0.002) {
        alpha = 0;
        if (dragged === null) return;
        alpha = 0.02;
      }

      const range = REPULSION_RANGE * scale;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let dist = Math.hypot(dx, dy);
          if (dist === 0) {
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
            dist = 0.01;
          }
          if (dist > range) continue;
          const force = ((REPULSION * scale) / (dist * dist)) * alpha;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          a.vx -= fx;
          a.vy -= fy;
          b.vx += fx;
          b.vy += fy;
        }
      }

      links.forEach((link) => {
        const a = nodes[link.a];
        const b = nodes[link.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const force = (dist - link.rest * scale) * SPRING * alpha;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      });

      nodes.forEach((n, i) => {
        if (i === dragged) {
          n.vx = 0;
          n.vy = 0;
          return;
        }

        const pull = (n.kind === "root" ? GRAVITY * 26 : GRAVITY) * alpha;
        n.vx += (width / 2 - n.x) * pull;
        n.vy += (height / 2 - n.y) * pull;

        n.vx *= DAMPING;
        n.vy *= DAMPING;

        const speed = Math.hypot(n.vx, n.vy);
        if (speed > MAX_SPEED) {
          n.vx = (n.vx / speed) * MAX_SPEED;
          n.vy = (n.vy / speed) * MAX_SPEED;
        }

        n.x += n.vx;
        n.y += n.vy;

        const padX = n.kind === "cluster" ? Math.min(150, width * 0.16) : n.r + 14;
        const padY = n.kind === "cluster" ? 60 : n.r + 22;
        n.x = Math.min(width - padX, Math.max(padX, n.x));
        n.y = Math.min(height - padY, Math.max(padY, n.y));
      });
    };

    // ---- drawing ---------------------------------------------------------
    const drawLink = (c: CanvasRenderingContext2D, link: Link, lit: boolean) => {
      const a = nodes[link.a];
      const b = nodes[link.b];
      c.beginPath();
      c.moveTo(a.x, a.y);
      c.lineTo(b.x, b.y);
      c.strokeStyle = tint(b.color, lit ? 0.45 : 0.75);
      c.lineWidth = lit && openIndex !== null ? 1.4 : 1;
      c.stroke();
    };

    const drawDot = (
      c: CanvasRenderingContext2D,
      n: Node,
      lit: boolean,
      halo: boolean
    ) => {
      const r = radiusOf(n);
      if (halo) {
        c.beginPath();
        c.arc(n.x, n.y, r + 7, 0, Math.PI * 2);
        c.fillStyle = tint(n.color, 0.82);
        c.fill();
      }
      c.beginPath();
      c.arc(n.x, n.y, r, 0, Math.PI * 2);
      c.fillStyle = lit ? n.color : tint(n.color, 0.7);
      c.fill();
    };

    const drawCenteredLabel = (c: CanvasRenderingContext2D, n: Node) => {
      const size = fontFor(n);
      c.font = `${size}px "JetBrains Mono", ui-monospace, monospace`;
      c.textAlign = "center";
      c.textBaseline = "top";
      const lines = wrapCached(c, n.label, Math.min(240, width * 0.62), size);
      lines.forEach((line, i) => {
        const y = n.y + radiusOf(n) + 7 + i * (size + 3);
        const halfWidth = c.measureText(line).width / 2;
        const lx = Math.min(width - halfWidth - 6, Math.max(halfWidth + 6, n.x));
        c.strokeStyle = PAPER;
        c.lineWidth = 3;
        c.strokeText(line, lx, y);
        c.fillText(line, lx, y);
      });
    };

    const renderBackdrop = (isLit: (n: Node) => boolean) => {
      const s = dpr * BACKDROP_SCALE;
      bctx.setTransform(s, 0, 0, s, 0, 0);
      bctx.clearRect(0, 0, width, height);

      bctx.save();
      bctx.filter = `blur(${3 * BACKDROP_SCALE}px)`;
      bctx.globalAlpha = 0.7;
      links.forEach((l) => {
        if (!(isLit(nodes[l.a]) && isLit(nodes[l.b]))) drawLink(bctx, l, false);
      });
      nodes.forEach((n) => {
        if (isLit(n)) return;
        drawDot(bctx, n, false, false);
        if (n.kind !== "leaf") {
          bctx.fillStyle = tint(INK, 0.45);
          drawCenteredLabel(bctx, n);
        }
      });
      bctx.restore();

      bctx.fillStyle = "rgba(247, 247, 247, 0.55)";
      bctx.fillRect(0, 0, width, height);
      backdropDirty = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const hover = hoverRef.current;
      const hoverNode = hover !== null ? nodes[hover] : null;
      const group = litGroup();

      const isLit = (n: Node) => !group || n.group === group;

      if (group) {
        if (backdropDirty) renderBackdrop(isLit);
        ctx.drawImage(backdrop, 0, 0, width, height);
      }

      links.forEach((l) => {
        const lit = isLit(nodes[l.a]) && isLit(nodes[l.b]);
        if (group && !lit) return;
        drawLink(ctx, l, true);
      });

      const labelFade = easeOutCubic(Math.max(0, Math.min(1, openT)));

      nodes.forEach((n) => {
        if (group && !isLit(n)) return;
        drawDot(ctx, n, true, n === hoverNode);

        const fanned = openTargets.has(n.index);
        const isOpenNode = n.index === openIndex;
        if (n.kind === "leaf" && !fanned && !isOpenNode) return;

        const size = fontFor(n);
        ctx.font = `${size}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.fillStyle = n.kind === "leaf" ? tint(INK, 0.2) : INK;

        // Tree mode: one compact label to the right of every dot in the column
        if (treeMode && fanned) {
          ctx.globalAlpha = labelFade;
          const depth = n.kind === "cluster" ? 0 : n.depth;
          const treeSize = Math.round(
            (depth === 0 ? 13 : depth === 1 ? 11.5 : 10.5) *
              (scale < 0.8 ? 0.88 : 1)
          );
          ctx.font = `${treeSize}px "JetBrains Mono", ui-monospace, monospace`;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillStyle = depth === 0 ? INK : tint(INK, depth === 1 ? 0.15 : 0.35);

          const lx = n.x + radiusOf(n) + 8;
          // never wider than the gap to the next column, nor past the canvas
          const room = Math.max(80, Math.min(treeColGap - 30, width - lx - 10));
          const lines = wrapCached(ctx, n.label, room, treeSize).slice(0, 3);
          const lead = treeSize + 3;
          const startY = n.y - ((lines.length - 1) * lead) / 2;
          lines.forEach((line, i) => {
            ctx.strokeStyle = PAPER;
            ctx.lineWidth = 3.5;
            ctx.strokeText(line, lx, startY + i * lead);
            ctx.fillText(line, lx, startY + i * lead);
          });
          ctx.globalAlpha = 1;
          return;
        }

        if (fanned) {
          ctx.globalAlpha = labelFade;
          const toRight = openSides.get(n.index) ?? true;
          const { subSize, lead, subLead, lines, subLines, totalH } =
            measureFanned(n);

          ctx.textAlign = toRight ? "left" : "right";
          ctx.textBaseline = "top";
          const r = radiusOf(n);
          const lx = n.x + (toRight ? r + 9 : -(r + 9));
          let y = n.y - totalH / 2;

          ctx.font = `${size}px "JetBrains Mono", ui-monospace, monospace`;
          ctx.fillStyle = tint(INK, 0.15);
          lines.forEach((line) => {
            ctx.strokeStyle = PAPER;
            ctx.lineWidth = 3.5;
            ctx.strokeText(line, lx, y);
            ctx.fillText(line, lx, y);
            y += lead;
          });

          if (subLines.length) {
            y += 6;
            ctx.font = `${subSize}px "JetBrains Mono", ui-monospace, monospace`;
            ctx.fillStyle = tint(INK, 0.5);
            subLines.forEach((line) => {
              ctx.strokeStyle = PAPER;
              ctx.lineWidth = 3.5;
              ctx.strokeText(line, lx, y);
              ctx.fillText(line, lx, y);
              y += subLead;
            });
          }

          ctx.globalAlpha = 1;
          return;
        }

        drawCenteredLabel(ctx, n);
      });
    };

    let lastTime = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(50, now - lastTime);
      lastTime = now;
      step(dt);
      draw();
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);

    // ---- interaction -----------------------------------------------------
    const nodeAt = (px: number, py: number) => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (Math.hypot(n.x - px, n.y - py) <= radiusOf(n) + 11) return i;
      }
      return null;
    };

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    let clearTimer: number | null = null;

    const applyHover = (found: number | null) => {
      if (found === hoverRef.current) return;
      hoverRef.current = found;
      canvas.style.cursor = found === null ? "default" : "grab";
      if (found === null) {
        setCaption(null);
        return;
      }
      const node = nodes[found];
      if (node.kind === "root") {
        setCaption({ text: hint });
        return;
      }
      const cluster = clusters.find((c) => c.id === node.group);
      setCaption({
        text: node.blurb ?? cluster?.blurb ?? node.label,
        color: node.color,
      });
    };

    const setHover = (found: number | null, immediate = false) => {
      if (clearTimer !== null) {
        window.clearTimeout(clearTimer);
        clearTimer = null;
      }
      if (found !== null || immediate) {
        applyHover(found);
        return;
      }
      if (hoverRef.current === null) return;
      clearTimer = window.setTimeout(() => {
        clearTimer = null;
        applyHover(null);
      }, 160);
    };

    const onPointerMove = (e: PointerEvent) => {
      const { x, y } = toLocal(e);
      if (dragRef.current !== null) {
        const n = nodes[dragRef.current];
        n.x = x;
        n.y = y;
        alpha = Math.max(alpha, 0.35);
        return;
      }
      setHover(nodeAt(x, y));
    };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = toLocal(e);
      const found = nodeAt(x, y);
      // clicking the canvas returns from a pinned cluster to free exploring
      if (selectedRef.current !== null) setSelected(null);
      if (found === null) return;
      setHover(found);
      dragRef.current = found;
      alpha = Math.max(alpha, 0.5);
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
      e.preventDefault();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (dragRef.current !== null) {
        openIndex = null; // re-anchor the fan where the drag left things
        backdropDirty = true;
      }
      dragRef.current = null;
      canvas.style.cursor = hoverRef.current === null ? "default" : "grab";
      if (canvas.hasPointerCapture(e.pointerId))
        canvas.releasePointerCapture(e.pointerId);
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      dragRef.current = null;
      setHover(null, true);
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      if (clearTimer !== null) window.clearTimeout(clearTimer);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [centerLabel, hint, clusters]);

  // With a cluster pinned, the strip prompts for detail rather than repeating
  // the general hint — the tree is already on screen.
  const pinned = clusters.find((c) => c.id === selected);
  const captionText =
    caption?.text ?? (pinned ? t("toolkit.hintPinned") : hint);
  const captionColor = caption?.color ?? pinned?.color;
  const captionIsHint = !caption;

  const flatten = (items: Item[]): string[] =>
    items.flatMap((item) => [
      itemLabel(item),
      ...(itemChildren(item) ? flatten(itemChildren(item)!) : []),
    ]);

  return (
    <section id="toolkit" className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal variant="fadeIn">
          <span className={styles.label}>{t("toolkit.label")}</span>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <h2 className={styles.heading}>{t("toolkit.heading")}</h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={100}>
          <p className={styles.description}>{t("toolkit.description")}</p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={180}>
          <div className={styles.box}>
            <div className={styles.stage} ref={wrapRef}>
              <canvas ref={canvasRef} className={styles.canvas} />
            </div>

            <div
              className={styles.caption}
              style={{ "--caption-color": captionColor } as React.CSSProperties}
            >
              <span className={styles.captionDot} />
              <span
                className={captionIsHint ? styles.captionHint : styles.captionText}
              >
                {captionText}
              </span>

              <div className={styles.legend}>
                {clusters.map((cluster) => {
                  const on = selected === cluster.id;
                  return (
                    <button
                      key={cluster.id}
                      type="button"
                      className={[styles.stamp, on ? styles.stampOn : ""]
                        .filter(Boolean)
                        .join(" ")}
                      style={{ "--stamp": cluster.color } as React.CSSProperties}
                      aria-pressed={on}
                      title={cluster.label}
                      onClick={() => {
                        setSelected(on ? null : cluster.id);
                        setCaption(null);
                      }}
                    >
                      <span className={styles.srOnly}>{cluster.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ul className={styles.srOnly}>
          {clusters.map((cluster) => (
            <li key={cluster.id}>
              {cluster.label}: {flatten(cluster.items).join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
