'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize, Expand, Shrink, Move } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
}

const MIN_SCALE = 0.1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.15;

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const svgWrapRef  = useRef<HTMLDivElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [displayScale, setDisplayScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });

  const scaleRef     = useRef(1);
  const translateRef = useRef({ x: 0, y: 0 });
  const fitScaleRef  = useRef(1);

  const lastPointer     = useRef({ x: 0, y: 0 });
  const lastPinchDist   = useRef<number | null>(null);
  const isDraggingRef   = useRef(false);

  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);

  const applyTransform = useCallback(() => {
    const el = svgWrapRef.current;
    if (!el) return;
    const { x, y } = translateRef.current;
    const s = scaleRef.current;
    el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    setDisplayScale(s);
  }, []);

  const clamp = (v: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, v));

  const zoomBy = useCallback((delta: number, cx?: number, cy?: number) => {
    if (!isFullscreen) return;
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
  }, [applyTransform, isFullscreen]);

  const computeFitScale = useCallback(() => {
    const viewport = viewportRef.current;
    const svgEl    = svgWrapRef.current?.querySelector('svg');
    if (!viewport || !svgEl) return;

    const vb = svgEl.viewBox?.baseVal;
    const naturalW = vb && vb.width > 0 ? vb.width : svgEl.getBoundingClientRect().width / (scaleRef.current || 1);
    const naturalH = vb && vb.height > 0 ? vb.height : svgEl.getBoundingClientRect().height / (scaleRef.current || 1);

    const availW = viewport.clientWidth - 48; // padding
    const availH = isFullscreen ? window.innerHeight - 100 : naturalH; // max height in fullscreen

    const fitW = availW > 0 && naturalW > 0 ? Math.min(1, availW / naturalW) : 1;
    const fitH = availH > 0 && naturalH > 0 ? Math.min(1, availH / naturalH) : 1;
    
    const fit = isFullscreen ? Math.min(fitW, fitH) : fitW;

    fitScaleRef.current  = fit;
    scaleRef.current     = fit;
    
    // In normal mode, center horizontally. In fullscreen, center both.
    const offsetX = (availW - naturalW * fit) / 2;
    const offsetY = isFullscreen ? (availH - naturalH * fit) / 2 : 0;

    translateRef.current = { x: Math.max(0, offsetX), y: Math.max(0, offsetY) };
    applyTransform();
    setNaturalSize({ w: naturalW, h: naturalH });
  }, [applyTransform, isFullscreen]);

  const resetTransform = useCallback(() => {
    computeFitScale();
  }, [computeFitScale]);

  // Handle Fullscreen Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen]);

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  // Re-fit when fullscreen changes
  useEffect(() => {
    if (!isLoading) {
      // small delay to let DOM layout settle
      const t = setTimeout(computeFitScale, 50);
      return () => clearTimeout(t);
    }
  }, [isFullscreen, isLoading, computeFitScale]);

  // Wheel zoom (only active in fullscreen)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !isFullscreen) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP, e.clientX, e.clientY);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomBy, isFullscreen]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!isFullscreen || e.pointerType === 'touch') return;
    isDraggingRef.current = true;
    setIsDragging(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [isFullscreen]);

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

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isFullscreen) return;
    if (e.touches.length === 1) {
      lastPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      isDraggingRef.current = true;
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      lastPinchDist.current = Math.hypot(dx, dy);
    }
  }, [isFullscreen]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isFullscreen) return; // Allow normal page scrolling if not fullscreen
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
  }, [applyTransform, zoomBy, isFullscreen]);

  const onTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    lastPinchDist.current = null;
  }, []);

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

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!isLoading) computeFitScale();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isLoading, computeFitScale]);

  const pct = Math.round((displayScale / (fitScaleRef.current || 1)) * 100);
  const containerHeight = isFullscreen ? '100%' : (naturalSize.h * fitScaleRef.current + 48) || 180;

  if (error) {
    return (
      <div className="my-8 rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-400">
        <p className="mb-2 font-semibold">Diagram render error</p>
        <pre className="whitespace-pre-wrap font-mono text-xs opacity-70">{error}</pre>
      </div>
    );
  }

  return (
    <div className={`my-8 overflow-hidden transition-all bg-black/30 backdrop-blur-sm shadow-2xl ${
      isFullscreen 
        ? 'fixed inset-0 z-[100] m-0 w-screen h-screen flex flex-col rounded-none border-none bg-black/95' 
        : 'w-full rounded-xl border border-white/10 hover:border-teal-500/30'
    }`}>
      
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-white/30">
            diagram {isFullscreen && ' (fullscreen)'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {isFullscreen && (
            <>
              <span className="mr-1 min-w-[3.2rem] text-right text-xs tabular-nums text-white/40">
                {pct}%
              </span>
              <button
                onClick={() => zoomBy(-ZOOM_STEP)}
                title="Zoom out"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white/80 active:scale-90"
              >
                <ZoomOut size={14} />
              </button>
              <button
                onClick={() => zoomBy(ZOOM_STEP)}
                title="Zoom in"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white/80 active:scale-90"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={resetTransform}
                title="Fit to view"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white/80 active:scale-90 mr-2"
              >
                <Maximize size={13} />
              </button>
              <div className="w-px h-4 bg-white/10 mx-1"></div>
            </>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-teal-400 active:scale-90"
          >
            {isFullscreen ? <Shrink size={14} /> : <Expand size={14} />}
          </button>
        </div>
      </div>

      {/* ── Viewport ── */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden flex-1"
        style={{
          height: isFullscreen ? 'auto' : containerHeight,
          minHeight: isFullscreen ? 'auto' : 100,
          cursor: isFullscreen ? (isDragging ? 'grabbing' : 'grab') : 'default',
          touchAction: isFullscreen ? 'none' : 'auto',
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
        {isLoading && (
          <div className="flex h-full min-h-[180px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500/20 border-t-teal-500" />
          </div>
        )}

        <div
          ref={svgWrapRef}
          className={`origin-top-left will-change-transform p-6 transition-opacity duration-300 [&_svg]:block [&_text]:fill-slate-200 [&_.label]:text-slate-200 ${
            isLoading ? 'pointer-events-none opacity-0 absolute' : 'opacity-100'
          }`}
          style={{ transform: 'translate(0px,0px) scale(1)' }}
        />

        {/* Hint when entering fullscreen */}
        {!isLoading && isFullscreen && (
          <div
            className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[12px] text-white/50 backdrop-blur-sm"
            style={{ animation: 'fadeOutHint 3.5s ease-in-out 1s forwards' }}
          >
            <Move size={12} />
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
