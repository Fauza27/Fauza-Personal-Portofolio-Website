'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
}

const MIN_SCALE = 0.1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.15;

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const viewportRef = useRef<HTMLDivElement>(null);   // the clipping box
  const svgWrapRef  = useRef<HTMLDivElement>(null);   // the transformed element

  const [error, setError]       = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [displayScale, setDisplayScale] = useState(1);

  // Transform state stored in refs (no re-render on every drag frame)
  const scaleRef     = useRef(1);
  const translateRef = useRef({ x: 0, y: 0 });
  const fitScaleRef  = useRef(1);   // "100%" = diagram fills container width

  // Pointer tracking
  const lastPointer     = useRef({ x: 0, y: 0 });
  const lastPinchDist   = useRef<number | null>(null);
  const isDraggingRef   = useRef(false);

  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);

  // ─── Apply CSS transform ──────────────────────────────────────────
  const applyTransform = useCallback(() => {
    const el = svgWrapRef.current;
    if (!el) return;
    const { x, y } = translateRef.current;
    const s = scaleRef.current;
    el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    setDisplayScale(s);
  }, []);

  const clamp = (v: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, v));

  // ─── Zoom toward a point in viewport coordinates ─────────────────
  const zoomBy = useCallback((delta: number, cx?: number, cy?: number) => {
    const wrap = viewportRef.current;
    if (!wrap) return;

    const oldScale = scaleRef.current;
    const newScale = clamp(oldScale + delta);
    const ratio    = newScale / oldScale;

    const rect   = wrap.getBoundingClientRect();
    const originX = cx !== undefined ? cx - rect.left : rect.width  / 2;
    const originY = cy !== undefined ? cy - rect.top  : rect.height / 2;

    translateRef.current = {
      x: originX - ratio * (originX - translateRef.current.x),
      y: originY - ratio * (originY - translateRef.current.y),
    };
    scaleRef.current = newScale;
    applyTransform();
  }, [applyTransform]);

  // ─── Reset to "fit" view ─────────────────────────────────────────
  const resetTransform = useCallback(() => {
    scaleRef.current     = fitScaleRef.current;
    translateRef.current = { x: 0, y: 0 };
    applyTransform();
  }, [applyTransform]);

  // ─── Compute fit scale after SVG is rendered ─────────────────────
  const computeFitScale = useCallback(() => {
    const viewport = viewportRef.current;
    const svgEl    = svgWrapRef.current?.querySelector('svg');
    if (!viewport || !svgEl) return;

    // Use the SVG's intrinsic width via viewBox or width attribute
    const vb = svgEl.viewBox?.baseVal;
    const naturalW = vb && vb.width > 0
      ? vb.width
      : svgEl.getBoundingClientRect().width / (scaleRef.current || 1);

    const availW = viewport.clientWidth - 48; // subtract horizontal padding
    const fit    = availW > 0 && naturalW > 0
      ? Math.min(1, availW / naturalW)   // never upscale beyond 1
      : 1;

    fitScaleRef.current  = fit;
    scaleRef.current     = fit;
    translateRef.current = { x: 0, y: 0 };
    applyTransform();
  }, [applyTransform]);

  // ─── Wheel zoom ──────────────────────────────────────────────────
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP, e.clientX, e.clientY);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomBy]);

  // ─── Mouse pan ───────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    isDraggingRef.current = true;
    setIsDragging(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || e.pointerType === 'touch') return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    translateRef.current = {
      x: translateRef.current.x + dx,
      y: translateRef.current.y + dy,
    };
    applyTransform();
  }, [applyTransform]);

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  // ─── Touch pan + pinch ───────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      lastPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      isDraggingRef.current = true;
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      lastPinchDist.current = Math.hypot(dx, dy);
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDraggingRef.current) {
      const dx = e.touches[0].clientX - lastPointer.current.x;
      const dy = e.touches[0].clientY - lastPointer.current.y;
      lastPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      translateRef.current = {
        x: translateRef.current.x + dx,
        y: translateRef.current.y + dy,
      };
      applyTransform();
    } else if (e.touches.length === 2 && lastPinchDist.current !== null) {
      const dx   = e.touches[1].clientX - e.touches[0].clientX;
      const dy   = e.touches[1].clientY - e.touches[0].clientY;
      const dist = Math.hypot(dx, dy);
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      zoomBy((dist / lastPinchDist.current - 1) * scaleRef.current, midX, midY);
      lastPinchDist.current = dist;
    }
  }, [applyTransform, zoomBy]);

  const onTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    lastPinchDist.current = null;
  }, []);

  // ─── Mermaid render ──────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      if (!svgWrapRef.current) return;
      try {
        setIsLoading(true);
        setError(null);

        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            background: 'transparent',
            mainBkg: '#1a1a2e',
            nodeBorder: '#4a4a8a',
            clusterBkg: '#16213e',
            titleColor: '#e2e8f0',
            edgeLabelBackground: '#1a1a2e',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            primaryColor: '#0d9488',
            primaryBorderColor: '#14b8a6',
            primaryTextColor: '#f0fdfa',
            lineColor: '#6366f1',
            secondaryColor: '#1e293b',
            tertiaryColor: '#0f172a',
            nodeTextColor: '#e2e8f0',
            textColor: '#cbd5e1',
            actorBkg: '#1e293b',
            actorBorder: '#14b8a6',
            actorTextColor: '#f0fdfa',
            activationBkgColor: '#0d9488',
            activationBorderColor: '#14b8a6',
            signalColor: '#94a3b8',
            signalTextColor: '#cbd5e1',
            labelBoxBkgColor: '#1e293b',
            labelBoxBorderColor: '#4a4a8a',
            labelTextColor: '#e2e8f0',
            loopTextColor: '#e2e8f0',
            noteBkgColor: '#0f172a',
            noteBorderColor: '#14b8a6',
            noteTextColor: '#e2e8f0',
          },
          flowchart: { useMaxWidth: false, htmlLabels: true, curve: 'basis' },
          sequence: {
            useMaxWidth: false,
            diagramMarginX: 16,
            diagramMarginY: 16,
            actorMargin: 60,
            messageMargin: 35,
            mirrorActors: false,
          },
        });

        const { svg } = await mermaid.render(idRef.current, chart.trim());

        if (!cancelled && svgWrapRef.current) {
          svgWrapRef.current.innerHTML = svg;
          const svgEl = svgWrapRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.display = 'block';
            svgEl.style.maxWidth = 'none';
          }
          // Slight delay so layout is settled before measuring
          requestAnimationFrame(() => {
            if (!cancelled) {
              computeFitScale();
              setIsLoading(false);
            }
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
          setIsLoading(false);
        }
      }
    }

    renderDiagram();
    return () => { cancelled = true; };
  }, [chart, computeFitScale]);

  // Re-fit on container resize
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!isLoading) computeFitScale();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isLoading, computeFitScale]);

  // Zoom percentage relative to the fit scale
  const pct = Math.round((displayScale / (fitScaleRef.current || 1)) * 100);

  if (error) {
    return (
      <div className="my-8 rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-400">
        <p className="mb-2 font-semibold">Diagram render error</p>
        <pre className="whitespace-pre-wrap font-mono text-xs opacity-70">{error}</pre>
      </div>
    );
  }

  return (
    <div className="my-8 w-full overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-2xl backdrop-blur-sm transition-colors hover:border-teal-500/30">

      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-white/30">
            diagram
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="mr-1 min-w-[3.2rem] text-right text-xs tabular-nums text-white/40">
            {pct}%
          </span>

          <button
            onClick={() => zoomBy(-ZOOM_STEP)}
            title="Zoom out (scroll down)"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white/80 active:scale-90"
          >
            <ZoomOut size={14} />
          </button>

          <button
            onClick={() => zoomBy(ZOOM_STEP)}
            title="Zoom in (scroll up)"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white/80 active:scale-90"
          >
            <ZoomIn size={14} />
          </button>

          <button
            onClick={resetTransform}
            title="Fit to container (100%)"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white/80 active:scale-90"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* ── Viewport (clipping + interaction surface) ── */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 180,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="flex h-44 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500/20 border-t-teal-500" />
          </div>
        )}

        {/* SVG — scaled from top-left origin */}
        <div
          ref={svgWrapRef}
          className={`origin-top-left will-change-transform p-6 transition-opacity duration-300 [&_svg]:block [&_text]:fill-slate-200 [&_.label]:text-slate-200 ${
            isLoading ? 'pointer-events-none opacity-0 absolute' : 'opacity-100'
          }`}
          style={{ transform: 'translate(0px,0px) scale(1)' }}
        />

        {/* Subtle hint — auto fades */}
        {!isLoading && (
          <div
            className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] text-white/30 backdrop-blur-sm"
            style={{ animation: 'fadeOutHint 3.5s ease-in-out 1s forwards' }}
          >
            <Move size={10} />
            <span>drag · scroll / pinch to zoom</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeOutHint {
          0%, 70% { opacity: 1; }
          100%     { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
