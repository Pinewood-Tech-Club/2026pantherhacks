"use client";

import { useCallback, useEffect, useRef } from "react";

const CELL_SIZE = 12;
const ALIVE_COLOR = "rgba(45, 208, 122, 0.15)";
const FADE_COLOR = "rgba(45, 208, 122, 0.06)";

// Interactive mode colors — brighter
const ALIVE_COLOR_INTERACTIVE = "rgba(45, 208, 122, 0.5)";
const FADE_COLOR_INTERACTIVE = "rgba(45, 208, 122, 0.15)";

// ── Pattern library ──────────────────────────────────────────────
type Pattern = [number, number][];

const GOSPER_GUN: Pattern = [
  [0, 24],
  [1, 22], [1, 24],
  [2, 12], [2, 13], [2, 20], [2, 21], [2, 34], [2, 35],
  [3, 11], [3, 15], [3, 20], [3, 21], [3, 34], [3, 35],
  [4, 0], [4, 1], [4, 10], [4, 16], [4, 20], [4, 21],
  [5, 0], [5, 1], [5, 10], [5, 14], [5, 16], [5, 17], [5, 22], [5, 24],
  [6, 10], [6, 16], [6, 24],
  [7, 11], [7, 15],
  [8, 12], [8, 13],
];

const PULSAR: Pattern = [];
const PULSAR_Q = [
  [1, 2], [1, 3], [1, 4], [2, 1], [3, 1], [4, 1],
  [2, 6], [3, 6], [4, 6], [6, 2], [6, 3], [6, 4],
];
for (const [r, c] of PULSAR_Q) {
  PULSAR.push([r, c], [r, 12 - c], [12 - r, c], [12 - r, 12 - c]);
}

const LWSS: Pattern = [
  [0, 1], [0, 4], [1, 0], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3],
];

const PENTADECATHLON: Pattern = [
  [0, 1], [1, 1], [2, 0], [2, 2], [3, 1], [4, 1],
  [5, 1], [6, 1], [7, 0], [7, 2], [8, 1], [9, 1],
];

const R_PENTOMINO: Pattern = [[0, 1], [0, 2], [1, 0], [1, 1], [2, 1]];
const ACORN: Pattern = [[0, 1], [1, 3], [2, 0], [2, 1], [2, 4], [2, 5], [2, 6]];
const B_HEPTOMINO: Pattern = [[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2], [3, 2]];
const GLIDER: Pattern = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
const DIEHARD: Pattern = [[0, 6], [1, 0], [1, 1], [2, 1], [2, 5], [2, 6], [2, 7]];

// Heavyweight spaceship
const HWSS: Pattern = [
  [0, 2], [0, 3], [1, 0], [1, 6], [2, 7], [3, 0], [3, 7],
  [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7],
];

const ALL_PATTERNS: Pattern[] = [
  GOSPER_GUN, PULSAR, LWSS, PENTADECATHLON, R_PENTOMINO,
  ACORN, B_HEPTOMINO, GLIDER, DIEHARD, HWSS,
];

function rotatePattern(p: Pattern): Pattern {
  const maxR = Math.max(...p.map(([r]) => r));
  return p.map(([r, c]) => [c, maxR - r]);
}

function mirrorPattern(p: Pattern): Pattern {
  const maxC = Math.max(...p.map(([, c]) => c));
  return p.map(([r, c]) => [r, maxC - c]);
}

function randomTransform(p: Pattern): Pattern {
  let result = p;
  const rotations = Math.floor(Math.random() * 4);
  for (let i = 0; i < rotations; i++) result = rotatePattern(result);
  if (Math.random() > 0.5) result = mirrorPattern(result);
  return result;
}

// ── Chunk-based procedural generation ──────────────────────────
// The grid is divided into horizontal "chunks" of CHUNK_HEIGHT rows.
// Each chunk is procedurally generated when first needed.
const CHUNK_HEIGHT = 40; // rows per chunk

export type GameOfLifeProps = {
  interactive?: boolean;
  onExitInteractive?: () => void;
};

export function GameOfLife({ interactive, onExitInteractive }: GameOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollYRef = useRef(0);
  const stateRef = useRef<{
    cols: number;
    viewportRows: number;
    grid: Map<number, Uint8Array>; // chunkIndex → cell data (cols * CHUNK_HEIGHT)
    fadeGrid: Map<number, Float32Array>;
    generatedChunks: Set<number>;
    paused: boolean;
    speed: number; // ms between steps
    isInteractive: boolean;
    mouseDown: boolean;
    drawMode: number; // 1 = place, 0 = erase
  } | null>(null);

  const controlsRef = useRef<HTMLDivElement>(null);

  // Initialize or get state
  const getState = useCallback(() => {
    if (!stateRef.current) {
      stateRef.current = {
        cols: 0,
        viewportRows: 0,
        grid: new Map(),
        fadeGrid: new Map(),
        generatedChunks: new Set(),
        paused: false,
        speed: 150,
        isInteractive: false,
        mouseDown: false,
        drawMode: 1,
      };
    }
    return stateRef.current;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = getState();

    function ensureChunk(chunkIdx: number) {
      if (state.grid.has(chunkIdx)) return;
      const size = state.cols * CHUNK_HEIGHT;
      state.grid.set(chunkIdx, new Uint8Array(size));
      state.fadeGrid.set(chunkIdx, new Float32Array(size));
    }

    function generateChunk(chunkIdx: number) {
      if (state.generatedChunks.has(chunkIdx)) return;
      state.generatedChunks.add(chunkIdx);
      ensureChunk(chunkIdx);

      const chunk = state.grid.get(chunkIdx)!;
      const fade = state.fadeGrid.get(chunkIdx)!;
      const cols = state.cols;

      function setCell(x: number, y: number) {
        if (x >= 0 && x < cols && y >= 0 && y < CHUNK_HEIGHT) {
          const idx = y * cols + x;
          chunk[idx] = 1;
          fade[idx] = 1;
        }
      }

      function placePattern(pattern: Pattern, ox: number, oy: number) {
        for (const [dy, dx] of pattern) {
          setCell(ox + dx, oy + dy);
        }
      }

      // Randomly place 2-5 interesting patterns per chunk
      const numPatterns = 2 + Math.floor(Math.random() * 4);
      for (let i = 0; i < numPatterns; i++) {
        const pat = ALL_PATTERNS[Math.floor(Math.random() * ALL_PATTERNS.length)];
        const transformed = randomTransform(pat);
        const ox = Math.floor(Math.random() * (cols - 40));
        const oy = Math.floor(Math.random() * (CHUNK_HEIGHT - 15));
        placePattern(transformed, Math.max(0, ox), Math.max(0, oy));
      }

      // Always place at least 1 glider gun per chunk for continuous activity
      if (Math.random() > 0.3) {
        const gun = randomTransform(GOSPER_GUN);
        const gx = Math.floor(Math.random() * Math.max(1, cols - 40));
        const gy = Math.floor(Math.random() * Math.max(1, CHUNK_HEIGHT - 12));
        placePattern(gun, Math.max(0, gx), Math.max(0, gy));
      }

      // Scatter some gliders
      const numGliders = 3 + Math.floor(Math.random() * 5);
      for (let i = 0; i < numGliders; i++) {
        const g = randomTransform(GLIDER);
        const gx = Math.floor(Math.random() * (cols - 5));
        const gy = Math.floor(Math.random() * (CHUNK_HEIGHT - 5));
        placePattern(g, gx, gy);
      }

      // Random noise (~5%)
      for (let i = 0; i < chunk.length; i++) {
        if (!chunk[i] && Math.random() < 0.05) {
          chunk[i] = 1;
          fade[i] = 1;
        }
      }
    }

    function getCell(chunkIdx: number, localX: number, localY: number): number {
      // Handle crossing chunk boundaries
      let ci = chunkIdx;
      let ly = localY;
      if (ly < 0) { ci--; ly += CHUNK_HEIGHT; }
      else if (ly >= CHUNK_HEIGHT) { ci++; ly -= CHUNK_HEIGHT; }

      const lx = ((localX % state.cols) + state.cols) % state.cols;
      const chunk = state.grid.get(ci);
      if (!chunk) return 0;
      return chunk[ly * state.cols + lx];
    }

    function stepChunks(activeChunks: number[]) {
      // We need to step all active chunks + their neighbors for correct boundaries
      const chunksToStep = new Set<number>();
      for (const ci of activeChunks) {
        chunksToStep.add(ci - 1);
        chunksToStep.add(ci);
        chunksToStep.add(ci + 1);
      }

      const nextChunks = new Map<number, Uint8Array>();

      for (const ci of chunksToStep) {
        ensureChunk(ci);
        const chunk = state.grid.get(ci)!;
        const fadeChunk = state.fadeGrid.get(ci)!;
        const next = new Uint8Array(state.cols * CHUNK_HEIGHT);

        for (let y = 0; y < CHUNK_HEIGHT; y++) {
          for (let x = 0; x < state.cols; x++) {
            let neighbors = 0;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                neighbors += getCell(ci, x + dx, y + dy);
              }
            }

            const idx = y * state.cols + x;
            const alive = chunk[idx];

            if (alive) {
              next[idx] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
              next[idx] = neighbors === 3 ? 1 : 0;
            }

            if (next[idx]) {
              fadeChunk[idx] = 1;
            } else {
              fadeChunk[idx] = Math.max(0, fadeChunk[idx] - 0.03);
            }
          }
        }

        nextChunks.set(ci, next);
      }

      // Apply
      for (const [ci, next] of nextChunks) {
        state.grid.set(ci, next);
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const newCols = Math.ceil(window.innerWidth / CELL_SIZE) + 2;
      const newRows = Math.ceil(window.innerHeight / CELL_SIZE) + 2;

      // If cols changed, we need to regenerate everything
      if (newCols !== state.cols) {
        state.cols = newCols;
        state.viewportRows = newRows;
        state.grid.clear();
        state.fadeGrid.clear();
        state.generatedChunks.clear();

        // Generate initial visible chunks
        const scrollOffset = scrollYRef.current * 0.5;
        const startRow = Math.floor(scrollOffset / CELL_SIZE);
        const startChunk = Math.floor(startRow / CHUNK_HEIGHT) - 1;
        const endChunk = Math.ceil((startRow + newRows) / CHUNK_HEIGHT) + 1;
        for (let ci = startChunk; ci <= endChunk; ci++) {
          generateChunk(ci);
        }
      } else {
        state.viewportRows = newRows;
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function onScroll() {
      scrollYRef.current = window.scrollY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    function draw() {
      const vpWidth = window.innerWidth;
      const vpHeight = window.innerHeight;
      ctx!.clearRect(0, 0, vpWidth, vpHeight);

      const isInt = state.isInteractive;
      const aliveColor = isInt ? ALIVE_COLOR_INTERACTIVE : ALIVE_COLOR;
      const fadeColor = isInt ? FADE_COLOR_INTERACTIVE : FADE_COLOR;

      // In interactive mode, no parallax — the grid is 1:1 with viewport
      const scrollOffset = isInt ? 0 : scrollYRef.current * 0.5;
      const offsetPx = scrollOffset % CELL_SIZE;
      const startRow = Math.floor(scrollOffset / CELL_SIZE);
      const visibleRows = state.viewportRows + 1;

      // Determine which chunks are visible and ensure they're generated
      const startChunk = Math.floor(startRow / CHUNK_HEIGHT) - 1;
      const endChunk = Math.ceil((startRow + visibleRows) / CHUNK_HEIGHT) + 1;

      for (let ci = startChunk; ci <= endChunk; ci++) {
        generateChunk(ci);
      }

      // Draw visible cells
      for (let vy = 0; vy < visibleRows; vy++) {
        const globalRow = startRow + vy;
        const chunkIdx = Math.floor(globalRow / CHUNK_HEIGHT);
        const localRow = ((globalRow % CHUNK_HEIGHT) + CHUNK_HEIGHT) % CHUNK_HEIGHT;

        const fadeChunk = state.fadeGrid.get(chunkIdx);
        const gridChunk = state.grid.get(chunkIdx);
        if (!fadeChunk || !gridChunk) continue;

        for (let x = 0; x < state.cols; x++) {
          const idx = localRow * state.cols + x;
          const fade = fadeChunk[idx];

          if (fade > 0.01) {
            const alive = gridChunk[idx];
            ctx!.fillStyle = alive ? aliveColor : fadeColor;
            ctx!.globalAlpha = fade;
            ctx!.fillRect(
              x * CELL_SIZE,
              vy * CELL_SIZE - offsetPx,
              CELL_SIZE - 1,
              CELL_SIZE - 1,
            );
          }
        }
      }
      ctx!.globalAlpha = 1;
    }

    let lastStep = 0;

    function animate(time: number) {
      const interval = state.speed;
      if (!state.paused && time - lastStep > interval) {
        // Get active chunks (visible + neighbors)
        const scrollOffset = state.isInteractive ? 0 : scrollYRef.current * 0.5;
        const startRow = Math.floor(scrollOffset / CELL_SIZE);
        const startChunk = Math.floor(startRow / CHUNK_HEIGHT) - 1;
        const endChunk = Math.ceil((startRow + state.viewportRows) / CHUNK_HEIGHT) + 1;
        const activeChunks: number[] = [];
        for (let ci = startChunk; ci <= endChunk; ci++) activeChunks.push(ci);
        stepChunks(activeChunks);
        lastStep = time;
      }
      draw();
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    // ── Interactive mode: mouse/touch drawing ──
    function getCellFromEvent(e: MouseEvent | Touch): { chunkIdx: number; localX: number; localY: number } | null {
      const rect = canvas!.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const cellX = Math.floor(px / CELL_SIZE);
      const cellY = Math.floor(py / CELL_SIZE);

      const scrollOffset = state.isInteractive ? 0 : scrollYRef.current * 0.5;
      const startRow = Math.floor(scrollOffset / CELL_SIZE);
      const globalRow = startRow + cellY;
      const chunkIdx = Math.floor(globalRow / CHUNK_HEIGHT);
      const localRow = ((globalRow % CHUNK_HEIGHT) + CHUNK_HEIGHT) % CHUNK_HEIGHT;
      const localX = ((cellX % state.cols) + state.cols) % state.cols;

      return { chunkIdx, localX, localY: localRow };
    }

    function paintCell(e: MouseEvent | Touch) {
      if (!state.isInteractive) return;
      const cell = getCellFromEvent(e);
      if (!cell) return;
      ensureChunk(cell.chunkIdx);
      const chunk = state.grid.get(cell.chunkIdx)!;
      const fade = state.fadeGrid.get(cell.chunkIdx)!;
      // Paint a 2x2 brush for easier drawing
      for (let dy = 0; dy <= 1; dy++) {
        for (let dx = 0; dx <= 1; dx++) {
          const lx = cell.localX + dx;
          const ly = cell.localY + dy;
          if (lx >= 0 && lx < state.cols && ly >= 0 && ly < CHUNK_HEIGHT) {
            const idx = ly * state.cols + lx;
            chunk[idx] = state.drawMode as 0 | 1;
            fade[idx] = state.drawMode ? 1 : 0;
          }
        }
      }
    }

    function onMouseDown(e: MouseEvent) {
      if (!state.isInteractive) return;
      state.mouseDown = true;
      // Right-click or ctrl+click = erase
      state.drawMode = (e.button === 2 || e.ctrlKey) ? 0 : 1;
      paintCell(e);
    }

    function onMouseMove(e: MouseEvent) {
      if (!state.isInteractive || !state.mouseDown) return;
      paintCell(e);
    }

    function onMouseUp() {
      state.mouseDown = false;
    }

    function onTouchStart(e: TouchEvent) {
      if (!state.isInteractive) return;
      state.mouseDown = true;
      state.drawMode = 1;
      if (e.touches[0]) paintCell(e.touches[0]);
    }

    function onTouchMove(e: TouchEvent) {
      if (!state.isInteractive || !state.mouseDown) return;
      if (e.touches[0]) paintCell(e.touches[0]);
    }

    function onTouchEnd() {
      state.mouseDown = false;
    }

    function onContextMenu(e: Event) {
      if (state.isInteractive) e.preventDefault();
    }

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("contextmenu", onContextMenu);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("contextmenu", onContextMenu);
    };
  }, [getState]);

  // Sync interactive prop to state
  useEffect(() => {
    const state = getState();
    state.isInteractive = !!interactive;

    if (interactive) {
      // Reset to a fresh grid centered on viewport
      state.grid.clear();
      state.fadeGrid.clear();
      state.generatedChunks.clear();
      state.paused = false;
      state.speed = 100;
      // Generate chunk 0 with some fun stuff
      state.generatedChunks.add(0);
      const size = state.cols * CHUNK_HEIGHT;
      const chunk = new Uint8Array(size);
      const fade = new Float32Array(size);

      // Place a few interesting patterns in the center
      const cx = Math.floor(state.cols / 2);
      const cy = Math.floor(CHUNK_HEIGHT / 2);
      const gun = GOSPER_GUN;
      for (const [dy, dx] of gun) {
        const x = cx - 18 + dx;
        const y = cy - 4 + dy;
        if (x >= 0 && x < state.cols && y >= 0 && y < CHUNK_HEIGHT) {
          chunk[y * state.cols + x] = 1;
          fade[y * state.cols + x] = 1;
        }
      }
      // Place a pulsar nearby
      for (const [dy, dx] of PULSAR) {
        const x = cx + 25 + dx;
        const y = cy - 6 + dy;
        if (x >= 0 && x < state.cols && y >= 0 && y < CHUNK_HEIGHT) {
          chunk[y * state.cols + x] = 1;
          fade[y * state.cols + x] = 1;
        }
      }
      // Some random noise
      for (let i = 0; i < size; i++) {
        if (!chunk[i] && Math.random() < 0.03) {
          chunk[i] = 1;
          fade[i] = 1;
        }
      }

      state.grid.set(0, chunk);
      state.fadeGrid.set(0, fade);
      // Generate neighbors
      for (let ci = -1; ci <= 1; ci++) {
        if (ci !== 0) {
          const s = state.cols * CHUNK_HEIGHT;
          state.grid.set(ci, new Uint8Array(s));
          state.fadeGrid.set(ci, new Float32Array(s));
        }
      }
    }
  }, [interactive, getState]);

  // Control handlers
  const handlePause = useCallback(() => {
    const state = getState();
    state.paused = !state.paused;
    // Force re-render for button text
    if (controlsRef.current) {
      const btn = controlsRef.current.querySelector("[data-pause]") as HTMLButtonElement;
      if (btn) btn.textContent = state.paused ? "Play" : "Pause";
    }
  }, [getState]);

  const handleStep = useCallback(() => {
    const state = getState();
    state.paused = true;
    if (controlsRef.current) {
      const btn = controlsRef.current.querySelector("[data-pause]") as HTMLButtonElement;
      if (btn) btn.textContent = "Play";
    }
    // Step once
    const activeChunks: number[] = [];
    for (let ci = -2; ci <= 2; ci++) activeChunks.push(ci);
    // Trigger a step by temporarily un-pausing state handled in animate
    const scrollOffset = 0;
    const startRow = Math.floor(scrollOffset / CELL_SIZE);
    const startChunk = Math.floor(startRow / CHUNK_HEIGHT) - 1;
    const endChunk = Math.ceil((startRow + state.viewportRows) / CHUNK_HEIGHT) + 1;
    const chunks: number[] = [];
    for (let ci = startChunk; ci <= endChunk; ci++) chunks.push(ci);

    // Manual step
    const chunksToStep = new Set<number>();
    for (const ci of chunks) {
      chunksToStep.add(ci - 1);
      chunksToStep.add(ci);
      chunksToStep.add(ci + 1);
    }

    for (const ci of chunksToStep) {
      if (!state.grid.has(ci)) {
        const s = state.cols * CHUNK_HEIGHT;
        state.grid.set(ci, new Uint8Array(s));
        state.fadeGrid.set(ci, new Float32Array(s));
      }
    }

    // Direct step
    function getCellLocal(chunkIdx: number, localX: number, localY: number): number {
      let ci2 = chunkIdx;
      let ly = localY;
      if (ly < 0) { ci2--; ly += CHUNK_HEIGHT; }
      else if (ly >= CHUNK_HEIGHT) { ci2++; ly -= CHUNK_HEIGHT; }
      const lx = ((localX % state.cols) + state.cols) % state.cols;
      const chunk = state.grid.get(ci2);
      if (!chunk) return 0;
      return chunk[ly * state.cols + lx];
    }

    const nextChunks = new Map<number, Uint8Array>();
    for (const ci of chunksToStep) {
      const chunk = state.grid.get(ci)!;
      const fadeChunk = state.fadeGrid.get(ci)!;
      const next = new Uint8Array(state.cols * CHUNK_HEIGHT);
      for (let y = 0; y < CHUNK_HEIGHT; y++) {
        for (let x = 0; x < state.cols; x++) {
          let neighbors = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              neighbors += getCellLocal(ci, x + dx, y + dy);
            }
          }
          const idx = y * state.cols + x;
          if (chunk[idx]) {
            next[idx] = neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            next[idx] = neighbors === 3 ? 1 : 0;
          }
          if (next[idx]) { fadeChunk[idx] = 1; }
          else { fadeChunk[idx] = Math.max(0, fadeChunk[idx] - 0.03); }
        }
      }
      nextChunks.set(ci, next);
    }
    for (const [ci, next] of nextChunks) state.grid.set(ci, next);
  }, [getState]);

  const handleClear = useCallback(() => {
    const state = getState();
    state.grid.clear();
    state.fadeGrid.clear();
    state.generatedChunks.clear();
    // Create empty chunk 0
    const s = state.cols * CHUNK_HEIGHT;
    for (let ci = -1; ci <= 1; ci++) {
      state.grid.set(ci, new Uint8Array(s));
      state.fadeGrid.set(ci, new Float32Array(s));
    }
  }, [getState]);

  const handleSpeed = useCallback((faster: boolean) => {
    const state = getState();
    if (faster) {
      state.speed = Math.max(20, state.speed - 30);
    } else {
      state.speed = Math.min(500, state.speed + 30);
    }
    if (controlsRef.current) {
      const label = controlsRef.current.querySelector("[data-speed]");
      if (label) label.textContent = `${state.speed}ms`;
    }
  }, [getState]);

  const handleRandomize = useCallback(() => {
    const state = getState();
    state.grid.clear();
    state.fadeGrid.clear();
    state.generatedChunks.clear();
    // Generate chunk 0 with random content
    const s = state.cols * CHUNK_HEIGHT;
    const chunk = new Uint8Array(s);
    const fade = new Float32Array(s);
    // Random density
    for (let i = 0; i < s; i++) {
      if (Math.random() < 0.15) {
        chunk[i] = 1;
        fade[i] = 1;
      }
    }
    state.grid.set(0, chunk);
    state.fadeGrid.set(0, fade);
    for (let ci = -1; ci <= 1; ci++) {
      if (ci !== 0) {
        state.grid.set(ci, new Uint8Array(s));
        state.fadeGrid.set(ci, new Float32Array(s));
      }
    }
    state.generatedChunks.add(0);
    state.generatedChunks.add(-1);
    state.generatedChunks.add(1);
  }, [getState]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-0 ${interactive ? "cursor-crosshair" : "pointer-events-none"}`}
        style={{ opacity: interactive ? 1 : 0.6 }}
      />

      {/* Interactive mode controls */}
      {interactive && (
        <div
          ref={controlsRef}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-2xl p-3"
          style={{
            background: "rgba(5, 8, 7, 0.9)",
            border: "1px solid var(--line-strong)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <button
            data-pause
            onClick={handlePause}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
            style={{
              color: "var(--green)",
              background: "var(--green-glow)",
              border: "1px solid var(--line)",
            }}
          >
            Pause
          </button>

          <button
            onClick={handleStep}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
            style={{
              color: "var(--text)",
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
          >
            Step
          </button>

          <button
            onClick={handleClear}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
            style={{
              color: "var(--text)",
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
          >
            Clear
          </button>

          <button
            onClick={handleRandomize}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
            style={{
              color: "var(--text)",
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
          >
            Random
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleSpeed(false)}
              className="rounded-lg px-2 py-1.5 text-xs font-bold transition-colors"
              style={{
                color: "var(--text-dim)",
                background: "var(--surface)",
                border: "1px solid var(--line)",
              }}
            >
              −
            </button>
            <span
              data-speed
              className="w-12 text-center text-[10px] font-semibold tabular-nums"
              style={{ color: "var(--text-dim)" }}
            >
              100ms
            </span>
            <button
              onClick={() => handleSpeed(true)}
              className="rounded-lg px-2 py-1.5 text-xs font-bold transition-colors"
              style={{
                color: "var(--text-dim)",
                background: "var(--surface)",
                border: "1px solid var(--line)",
              }}
            >
              +
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onExitInteractive}
            className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
            style={{
              color: "var(--text-dim)",
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
