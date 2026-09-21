"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useAnimationFrame } from "framer-motion";

// ─── PreviewCard ─────────────────────────────────────────────────────────────

function PreviewCard({ image, side, className = "" }) {
  return (
    <div
      className={[
        "relative w-full max-w-[350px] h-[260px] md:h-[500px]",
        "rounded-[28px] overflow-hidden",
        "border border-white/10 dark:border-white/10",
        "bg-white/60 dark:bg-white/5",
        "backdrop-blur-xl",
        "shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]",
        "ring-1 ring-black/5 dark:ring-white/10",
        className,
      ].join(" ")}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={image.src}
            alt={"Connecting Dots Erp"}
            fill
            sizes="(min-width: 768px) 350px, 90vw"
            className="object-cover"
            priority={false}
          />
          {/* subtle gradient for legibility + premium depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        </motion.div>
      </AnimatePresence>

      <div
        className={[
          "absolute bottom-0 left-0 right-0 p-5",
          side === "left" ? "text-left" : "text-left md:text-right",
        ].join(" ")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={image.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium text-white/90 tracking-wide"
          >
            {image.alt}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── MarqueeRow ───────────────────────────────────────────────────────────────

function MarqueeRow({
  images,
  direction,
  speed = 55,
  itemWidth = 170,
  itemHeight = 210,
  gap = 20,
  edge,
  onEdgeImageChange,
  className = "",
}) {
  const slot = itemWidth + gap;
  const trackCount = images.length;
  const totalWidth = slot * trackCount;

  // Three copies guarantee the seam never enters view, even on ultra-wide screens.
  const renderImages = useMemo(() => [...images, ...images, ...images], [images]);

  const x = useMotionValue(direction === "ltr" ? -totalWidth : 0);
  const containerRef = useRef(null);
  const containerWidthRef = useRef(0);
  const lastIndexRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      containerWidthRef.current = el.offsetWidth;
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const dt = delta / 1000;
    const velocity = direction === "ltr" ? speed : -speed;
    let next = x.get() + velocity * dt;

    // Keep x wrapped inside [-totalWidth, 0) so the loop never visibly jumps.
    next = ((next % totalWidth) + totalWidth) % totalWidth - totalWidth;
    x.set(next);

    const containerWidth = containerWidthRef.current;
    if (!containerWidth || !onEdgeImageChange) return;

    const targetScreenX = edge === "left" ? 0 : containerWidth;
    const rawIndex = Math.floor((targetScreenX - next) / slot);
    const wrappedIndex = ((rawIndex % trackCount) + trackCount) % trackCount;

    if (wrappedIndex !== lastIndexRef.current) {
      lastIndexRef.current = wrappedIndex;
      onEdgeImageChange(images[wrappedIndex]);
    }
  });

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
      <motion.div style={{ x, gap: `${gap}px` }} className="flex will-change-transform">
        {renderImages.map((image, i) => (
          <div
            key={`${image.id}-${i}`}
            style={{ width: itemWidth, height: itemHeight, flex: "0 0 auto" }}
            className="group relative rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm transition-transform duration-300 ease-out hover:scale-[1.04] hover:shadow-xl hover:z-10"
          >
            <Image
              src={image.src}
              alt={"Connecting Dots Erp"}
              fill
              sizes={`${itemWidth}px`}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── MarqueeShowcase ──────────────────────────────────────────────────────────

export function MarqueeShowcase({
  topImages,
  bottomImages,
  speed = 55,
  itemWidth = 170,
  itemHeight = 210,
  gap = 20,
  rowGap = 24,
  className = "",
}) {
  const bottom = bottomImages ?? topImages;

  const [leftImage, setLeftImage] = useState(topImages[0]);
  const [rightImage, setRightImage] = useState(bottom[bottom.length - 1]);

  return (
    <div
      className={[
        "w-full flex flex-col md:flex-row items-center justify-center",
        "gap-8 md:gap-10 p-6 md:p-12",
        className,
      ].join(" ")}
    >
      <PreviewCard image={leftImage} side="left" />

      {/* Center scrolling lanes — fades at the edges to sell the "entering / leaving" effect */}
      <div
        className="relative w-full md:flex-1 max-w-3xl"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
       
        <div className="flex flex-col" style={{ gap: rowGap }}>
          <MarqueeRow
            images={topImages}
            direction="ltr"
            edge="left"
            speed={speed}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            gap={gap}
            onEdgeImageChange={setLeftImage}
          />
          <MarqueeRow
            images={bottom}
            direction="rtl"
            edge="right"
            speed={speed}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            gap={gap}
            onEdgeImageChange={setRightImage}
          />
        </div>
      </div>

      <PreviewCard image={rightImage} side="right" />
    </div>
  );
}

export default MarqueeShowcase;