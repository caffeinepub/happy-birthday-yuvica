import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";

/* ── Types ───────────────────────────────────────────────────────────────── */
interface ConfettiPiece {
  id: number;
  x: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  shape: "square" | "circle" | "star";
}

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

interface TwinkleStar {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  dur: number;
}

interface SurpriseCard {
  id: number;
  emoji: string;
  title: string;
  message: string;
  gradient: string;
}

interface WishCard {
  id: string;
  emoji: string;
  title: string;
  content: string;
}

interface Reason {
  num: number;
  text: string;
}

/* ── Data ────────────────────────────────────────────────────────────────── */
const CONFETTI_COLORS = [
  "#FF87B2",
  "#FFB3D1",
  "#C9A0DC",
  "#B57BEE",
  "#FFD700",
  "#FFC436",
  "#AFFFDB",
  "#FF6B9D",
  "#D4A0FF",
  "#86EFAC",
];

const surpriseCards: SurpriseCard[] = [
  {
    id: 1,
    emoji: "🌸",
    title: "A Flower for You",
    message:
      "Like a flower in spring, you bloom with grace and beauty. Every petal represents a quality that makes you extraordinary — kindness, laughter, courage, and love. The world is a prettier place because you're in it. 🌸✨",
    gradient:
      "linear-gradient(135deg, oklch(0.93 0.12 345), oklch(0.88 0.1 320))",
  },
  {
    id: 2,
    emoji: "⭐",
    title: "You Are a Star",
    message:
      "Stars don't compete with each other — they just shine. And you, Yuvica, shine brighter than any star in the night sky. Your brilliance cannot be dimmed. Keep shining, always and forever. ⭐💫",
    gradient:
      "linear-gradient(135deg, oklch(0.94 0.1 85), oklch(0.88 0.14 70))",
  },
  {
    id: 3,
    emoji: "🦋",
    title: "Transform & Fly",
    message:
      "Like a butterfly, you are constantly becoming more beautiful, more free, and more wonderful. Every change, every challenge, every new day shapes you into something breathtaking. Spread your wings and fly! 🦋🌈",
    gradient:
      "linear-gradient(135deg, oklch(0.9 0.1 280), oklch(0.86 0.12 260))",
  },
  {
    id: 4,
    emoji: "💖",
    title: "Your Kind Heart",
    message:
      "Your kindness is your greatest gift to the world. The way you care for others, the way you listen, the way you love — it creates ripples of warmth that touch every heart around you. Never change, sweet Yuvica. 💖🌟",
    gradient:
      "linear-gradient(135deg, oklch(0.92 0.14 355), oklch(0.88 0.16 340))",
  },
  {
    id: 5,
    emoji: "🌈",
    title: "Rainbow Days Ahead",
    message:
      "After every storm comes a rainbow, and your whole life stretches before you like the most beautiful rainbow — full of color, promise, and wonder. Every color is a new adventure waiting just for you. 🌈✨",
    gradient:
      "linear-gradient(135deg, oklch(0.9 0.08 200), oklch(0.86 0.1 220))",
  },
  {
    id: 6,
    emoji: "🎀",
    title: "Princess Energy",
    message:
      "You walk with grace, you laugh with abandon, and you carry yourself like the princess you truly are. Today, your crown is polished and waiting. Own this day, because you were born to shine. 👑🎀",
    gradient:
      "linear-gradient(135deg, oklch(0.88 0.12 310), oklch(0.84 0.14 295))",
  },
  {
    id: 7,
    emoji: "🍰",
    title: "Sweet Like Cake",
    message:
      "You are sweeter than birthday cake, warmer than candlelight, and more delightful than any celebration. Being around you is the greatest gift of all. Thank you for existing, Yuvica. 🍰💕",
    gradient:
      "linear-gradient(135deg, oklch(0.93 0.1 345), oklch(0.89 0.1 60))",
  },
  {
    id: 8,
    emoji: "🌙",
    title: "Moonlit Dreams",
    message:
      "May all your dreams be as vast and magical as the night sky. May you always reach for the moon, and may the stars light your path whenever the road feels dark. Dream big, beautiful girl. 🌙⭐💖",
    gradient:
      "linear-gradient(135deg, oklch(0.85 0.1 270), oklch(0.8 0.12 250))",
  },
];

const wishCards: WishCard[] = [
  {
    id: "love",
    emoji: "💕",
    title: "Wish for Love",
    content:
      "I wish that your heart is always full of love — love that comes back to you, love that feels warm and safe and happy. You deserve a love story more beautiful than your favorite fairy tale. You are so worth it.",
  },
  {
    id: "adventure",
    emoji: "🗺️",
    title: "Wish for Adventure",
    content:
      "I wish every year brings you new and exciting things. May you go to new places, meet great people, and make memories that you will always smile about. Life is a big adventure — and you are the best part of it.",
  },
  {
    id: "joy",
    emoji: "😊",
    title: "Wish for Joy",
    content:
      "I wish happiness finds you in the little things — a warm cup of tea, a good book, a big hug, a pretty sunset. May you always find reasons to smile, even on the hard days. You deserve to be happy every single day.",
  },
  {
    id: "success",
    emoji: "🏆",
    title: "Wish for Success",
    content:
      "I wish that every goal you work for becomes yours. Every dream you have can come true. You are smart, strong, and talented — you have everything you need to do great things. I believe in you so much.",
  },
  {
    id: "health",
    emoji: "🌿",
    title: "Wish for Good Health",
    content:
      "I wish you stay healthy, full of energy, and feeling great every day. Taking care of yourself is the most important thing. You matter so much — please always be well. A healthy you means a happy you.",
  },
  {
    id: "magic",
    emoji: "✨",
    title: "Wish for Magic",
    content:
      "I wish your life is full of small, lovely moments that make you feel how wonderful this world is. May you always see the beauty around you. May each day bring at least one little thing that makes you say — wow.",
  },
];

const reasons: Reason[] = [
  { num: 1, text: "Your laugh makes everyone feel happy and warm." },
  {
    num: 2,
    text: "Every moment becomes better just because you are there.",
  },
  { num: 3, text: "You are so creative and always full of great ideas." },
  {
    num: 4,
    text: "You make everyone feel cared for and truly seen.",
  },
  { num: 5, text: "Your style is 100% you — and it is perfect." },
  { num: 6, text: "You dream big and you believe you can do it." },
  {
    num: 7,
    text: "You are strong even when things are hard — that is amazing.",
  },
  {
    num: 8,
    text: "You help people around you be their best selves.",
  },
  { num: 9, text: "Your eyes are full of kindness and wonder." },
  {
    num: 10,
    text: "The world is a much better place with you in it. 🌍💖",
  },
];

const heroEmojis = ["🎂", "🎉", "🌸", "✨", "🎈", "💖", "🌟", "👑", "🦋", "🌈"];
const celebrationEmojis = [
  "🎂",
  "🎉",
  "🎈",
  "🌸",
  "✨",
  "💖",
  "🌟",
  "👑",
  "🦋",
  "🎀",
  "🌈",
  "🍭",
];

/* ── Sub-components ──────────────────────────────────────────────────────── */

/** Animated confetti rain */
function ConfettiLayer() {
  const pieces: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 10 + 5,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 10,
    shape: (["square", "circle", "star"] as const)[
      Math.floor(Math.random() * 3)
    ],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.shape !== "star" ? p.color : "transparent",
            borderRadius:
              p.shape === "circle" ? "50%" : p.shape === "square" ? "2px" : "0",
            fontSize: p.shape === "star" ? `${p.size + 4}px` : undefined,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s infinite`,
            opacity: 0.8,
          }}
        >
          {p.shape === "star" ? "✦" : null}
        </div>
      ))}
    </div>
  );
}

/** Floating hearts */
function FloatingHearts() {
  const hearts: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 20 + 14,
    duration: Math.random() * 6 + 5,
    delay: Math.random() * 8,
    emoji: ["💖", "💕", "💗", "💓", "💝"][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.x}%`,
            bottom: "0",
            fontSize: `${h.size}px`,
            animation: `heartFloat ${h.duration}s ease-in ${h.delay}s infinite`,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}

/** Twinkling star dots */
function TwinkleStars() {
  const stars: TwinkleStar[] = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 4,
    dur: Math.random() * 2 + 1.5,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="sparkle-dot"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Scroll-triggered reveal hook */
function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/** Single surprise card with flip animation */
function SurpriseCard({ card, index }: { card: SurpriseCard; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const { ref, visible } = useIntersection(0.1);

  return (
    <div
      ref={ref}
      data-ocid={`surprise.card.${index + 1}`}
      className="flip-card cursor-pointer"
      style={{
        height: "260px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      aria-label={`${card.title} - click to reveal`}
    >
      <div
        className="flip-card-inner"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div
          className="flip-card-front flex flex-col items-center justify-center gap-2 p-3 sm:p-5 shadow-card border border-white/60"
          style={{ background: card.gradient }}
        >
          <div
            className="text-4xl sm:text-5xl animate-wiggle"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {card.emoji}
          </div>
          <h3 className="font-display text-base sm:text-xl font-bold text-center text-foreground leading-tight">
            {card.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-accent text-center">
            ✨ Tap to reveal ✨
          </p>
        </div>
        {/* Back */}
        <div
          className="flip-card-back flex flex-col items-center justify-center p-3 sm:p-5 shadow-card-hover"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.98 0.04 345), oklch(0.96 0.05 295))",
          }}
        >
          <div className="text-2xl mb-2">{card.emoji}</div>
          <p
            className="text-center text-xs sm:text-sm leading-relaxed font-accent overflow-y-auto"
            style={{ color: "oklch(0.3 0.08 320)", maxHeight: "190px" }}
          >
            {card.message}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Staggered reason item */
function ReasonItem({ reason, index }: { reason: Reason; index: number }) {
  const { ref, visible } = useIntersection(0.1);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-40px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
      className="flex items-start gap-4 p-4 rounded-2xl"
    >
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-pink-glow"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.78 0.18 345), oklch(0.68 0.18 300))",
          color: "white",
        }}
      >
        {reason.num}
      </div>
      <p
        className="font-accent text-base leading-relaxed"
        style={{ color: "oklch(0.3 0.08 320)" }}
      >
        {reason.text}
      </p>
    </div>
  );
}

/* ── Main App ────────────────────────────────────────────────────────────── */
export default function App() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useIntersection(0.1);
  const letterRef = useIntersection(0.1);
  const surpriseRef = useIntersection(0.1);
  const reasonsRef = useIntersection(0.1);
  const wishRef = useIntersection(0.1);
  const celebrationRef = useIntersection(0.1);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen birthday-bg overflow-x-hidden">
      {/* ── Background layers ─────────────────────────────────────── */}
      <ConfettiLayer />
      <FloatingHearts />
      <TwinkleStars />

      {/* ── Main content ──────────────────────────────────────────── */}
      <main className="relative z-10">
        {/* ════════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef.ref}
          data-ocid="hero.section"
          className="relative flex flex-col items-center px-4 pt-12 pb-8 text-center overflow-hidden"
          style={{ minHeight: "100svh" }}
        >
          {/* Big balloon images on each side */}
          <img
            src="/assets/generated/balloons-transparent.dim_400x400.png"
            alt="Balloons"
            className="hidden md:block absolute left-0 top-8 w-44 opacity-90 animate-float-bounce pointer-events-none"
            style={{ animationDelay: "0.5s" }}
          />
          <img
            src="/assets/generated/balloons-transparent.dim_400x400.png"
            alt="Balloons"
            className="hidden md:block absolute right-0 top-8 w-44 opacity-90 animate-float-bounce pointer-events-none"
            style={{ animationDelay: "1.2s", transform: "scaleX(-1)" }}
          />

          {/* Crown emoji */}
          <div
            className="text-5xl mb-2"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0)",
              transition:
                "opacity 0.6s ease, transform 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
            }}
          >
            👑
          </div>

          {/* "Happy Birthday" */}
          <h1
            className="font-display text-5xl sm:text-7xl md:text-8xl font-black leading-tight mb-2"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 345), oklch(0.68 0.18 300), oklch(0.82 0.18 85))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Happy Birthday
          </h1>

          {/* "Yuvica" */}
          <h2
            className="font-display font-black leading-none mb-4"
            style={{
              fontSize: "clamp(4rem, 15vw, 9rem)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.7)",
              transition:
                "opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.4s",
              background:
                "linear-gradient(135deg, oklch(0.82 0.18 85), oklch(0.78 0.18 345), oklch(0.68 0.18 300), oklch(0.82 0.18 85))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: mounted
                ? "shimmer 3s linear infinite, glowPulse 2.5s ease-in-out infinite"
                : "none",
            }}
          >
            Yuvica
          </h2>

          {/* Subtitle */}
          <p
            className="font-accent text-xl sm:text-2xl font-semibold mb-8"
            style={{
              color: "oklch(0.45 0.1 320)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s",
            }}
          >
            Today is all about you, beautiful 🌸
          </p>

          {/* Emoji row */}
          <div
            className="flex flex-wrap justify-center gap-2 mt-8"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.6s ease 1.2s",
            }}
          >
            {heroEmojis.map((emoji, i) => (
              <span
                key={`hero-emoji-${emoji}`}
                className="text-3xl sm:text-4xl"
                style={{
                  display: "inline-block",
                  animation: `emojiDance 2s ease-in-out ${i * 0.2}s infinite`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2 — LETTER
        ════════════════════════════════════════════════════════════ */}
        <section
          ref={letterRef.ref}
          data-ocid="letter.section"
          className="relative px-4 py-16 max-w-5xl mx-auto"
        >
          <div
            className="rounded-3xl overflow-hidden shadow-card"
            style={{
              background:
                "linear-gradient(135deg, oklch(1 0 0 / 0.9), oklch(0.96 0.04 310 / 0.9))",
              backdropFilter: "blur(20px)",
              border: "1.5px solid oklch(0.88 0.08 320 / 0.5)",
              opacity: letterRef.visible ? 1 : 0,
              transform: letterRef.visible
                ? "translateY(0)"
                : "translateY(40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div className="grid md:grid-cols-3 gap-0">
              {/* Text side */}
              <div className="md:col-span-2 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl">💌</span>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.18 345), oklch(0.68 0.18 300))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    A Letter for You
                  </h2>
                </div>

                <div className="space-y-6">
                  {[
                    "Dear Yuvica, today is a very special day — it is your birthday! The whole world is happy because of you. From the moment you open your eyes today, remember that you are loved more than you know. 💖",
                    "You have a smile that makes every room brighter. Your laugh is the best sound in the world. Your heart is so kind and warm, and there is no one else like you. That is what makes you so special.",
                    "Every year, you become more lovely — not just on the outside, but in the way you care for others, the way you dream big, and the way you make people around you feel good. You make everyone happy just by being you.",
                    "Today, I hope all your wishes come true. I hope every smile you give today comes back to you many times over. I hope today is full of fun, love, and all the good things you deserve.",
                    "Here is to YOU, Yuvica — a girl who deserves all the flowers, all the love, and every happy thing in this world. Have the most wonderful birthday! 🌟",
                  ].map((para, i) => (
                    <p
                      key={para.slice(0, 30)}
                      className="font-accent text-base sm:text-lg leading-relaxed"
                      style={{
                        color: "oklch(0.32 0.07 320)",
                        opacity: letterRef.visible ? 1 : 0,
                        transform: letterRef.visible
                          ? "translateX(0)"
                          : "translateX(-20px)",
                        transition: `opacity 0.6s ease ${0.2 + i * 0.15}s, transform 0.6s ease ${0.2 + i * 0.15}s`,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-8 text-right">
                  <p
                    className="font-display text-2xl font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.82 0.18 85), oklch(0.78 0.18 345))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    With all my love 💖
                  </p>
                  <p
                    className="font-display text-xl font-semibold mt-1"
                    style={{ color: "oklch(0.62 0.18 345)" }}
                  >
                    From your best friend, Garvit 🌸
                  </p>
                </div>
              </div>

              {/* Butterfly image side */}
              <div className="hidden md:flex flex-col items-center justify-center p-8 relative">
                <img
                  src="/assets/generated/butterflies-transparent.dim_400x300.png"
                  alt="Butterflies"
                  className="w-full animate-float-bounce"
                  style={{
                    filter:
                      "drop-shadow(0 4px 16px oklch(0.68 0.18 300 / 0.3))",
                    animationDelay: "0.8s",
                  }}
                />
                <div className="mt-4 text-center">
                  <p
                    className="font-display text-6xl font-black animate-glow-pulse"
                    style={{ WebkitTextFillColor: "oklch(0.82 0.18 85)" }}
                  >
                    ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3 — SURPRISE MESSAGES
        ════════════════════════════════════════════════════════════ */}
        <section ref={surpriseRef.ref} className="px-4 py-16 max-w-5xl mx-auto">
          <div
            className="text-center mb-12"
            style={{
              opacity: surpriseRef.visible ? 1 : 0,
              transform: surpriseRef.visible
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h2
              className="font-display text-4xl sm:text-5xl font-black mb-3"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 345), oklch(0.68 0.18 300), oklch(0.82 0.18 85))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Click for a Birthday Surprise! 🎁
            </h2>
            <p
              className="font-accent text-lg"
              style={{ color: "oklch(0.5 0.08 320)" }}
            >
              Each card holds a special message just for you ✨
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {surpriseCards.map((card, i) => (
              <SurpriseCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4 — WHY YUVICA IS AMAZING
        ════════════════════════════════════════════════════════════ */}
        <section
          ref={reasonsRef.ref}
          data-ocid="reasons.section"
          className="px-4 py-16 max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Reasons list */}
            <div className="md:col-span-3">
              <div
                style={{
                  opacity: reasonsRef.visible ? 1 : 0,
                  transform: reasonsRef.visible
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                <h2
                  className="font-display text-3xl sm:text-4xl font-black mb-8"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.18 300), oklch(0.78 0.18 345))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Some of the Reasons Why You are the Best 💫
                </h2>
              </div>

              <div
                className="rounded-3xl p-6 shadow-card space-y-2"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(1 0 0 / 0.85), oklch(0.96 0.04 295 / 0.85))",
                  backdropFilter: "blur(16px)",
                  border: "1.5px solid oklch(0.88 0.08 310 / 0.4)",
                }}
              >
                {reasons.map((r, i) => (
                  <ReasonItem key={r.num} reason={r} index={i} />
                ))}
              </div>
            </div>

            {/* Flowers image */}
            <div className="hidden md:flex md:col-span-2 flex-col items-center justify-start pt-16">
              <img
                src="/assets/generated/flowers-transparent.dim_400x400.png"
                alt="Flowers"
                className="w-full animate-float-bounce drop-shadow-xl"
                style={{
                  filter: "drop-shadow(0 8px 24px oklch(0.78 0.18 345 / 0.35))",
                  animationDelay: "1s",
                  opacity: reasonsRef.visible ? 1 : 0,
                  transform: reasonsRef.visible
                    ? "translateX(0)"
                    : "translateX(40px)",
                  transition:
                    "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
                }}
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 5 — BIRTHDAY WISHES (ACCORDION)
        ════════════════════════════════════════════════════════════ */}
        <section ref={wishRef.ref} className="px-4 py-16 max-w-3xl mx-auto">
          <div
            className="text-center mb-12"
            style={{
              opacity: wishRef.visible ? 1 : 0,
              transform: wishRef.visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h2
              className="font-display text-4xl sm:text-5xl font-black mb-3"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.82 0.18 85), oklch(0.78 0.18 345), oklch(0.68 0.18 300))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Make a Wish! 🕯️
            </h2>
            <p
              className="font-display text-2xl font-bold"
              style={{ color: "oklch(0.5 0.08 320)" }}
            >
              Beautiful Wishes Just for You 🌟
            </p>
          </div>

          <div
            className="rounded-3xl overflow-hidden shadow-card"
            style={{
              background:
                "linear-gradient(135deg, oklch(1 0 0 / 0.9), oklch(0.96 0.04 295 / 0.9))",
              backdropFilter: "blur(16px)",
              border: "1.5px solid oklch(0.88 0.08 310 / 0.5)",
              opacity: wishRef.visible ? 1 : 0,
              transform: wishRef.visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <Accordion type="single" collapsible className="w-full">
              {wishCards.map((wish, i) => (
                <AccordionItem
                  key={wish.id}
                  value={wish.id}
                  data-ocid={`wish.card.${i + 1}`}
                  className="border-b last:border-b-0"
                  style={{ borderColor: "oklch(0.88 0.08 310 / 0.3)" }}
                >
                  <AccordionTrigger
                    className="px-6 py-5 hover:no-underline group"
                    style={{ color: "oklch(0.3 0.08 320)" }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl group-hover:animate-wiggle">
                        {wish.emoji}
                      </span>
                      <span className="font-display text-xl font-bold">
                        {wish.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p
                      className="font-accent text-base leading-relaxed"
                      style={{
                        color: "oklch(0.38 0.08 320)",
                        paddingLeft: "3.5rem",
                      }}
                    >
                      {wish.content}
                    </p>
                    <div
                      className="mt-3 flex gap-2"
                      style={{ paddingLeft: "3.5rem" }}
                    >
                      {(["✨", "💖", "🌟"] as const).map((e, ei) => (
                        <span
                          key={`wish-sparkle-${e}`}
                          className="text-xl"
                          style={{
                            animation: `emojiDance 1.5s ease-in-out ${ei * 0.3}s infinite`,
                          }}
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Gifts image */}
          <div
            className="flex justify-center mt-12"
            style={{
              opacity: wishRef.visible ? 1 : 0,
              transition: "opacity 0.8s ease 0.5s",
            }}
          >
            <img
              src="/assets/generated/gifts-transparent.dim_400x350.png"
              alt="Birthday Gifts"
              className="w-64 sm:w-80 animate-float-bounce"
              style={{
                filter: "drop-shadow(0 8px 24px oklch(0.82 0.18 85 / 0.4))",
                animationDelay: "0.3s",
              }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 6 — FINAL CELEBRATION
        ════════════════════════════════════════════════════════════ */}
        <section
          ref={celebrationRef.ref}
          data-ocid="celebration.section"
          className="px-4 py-16 text-center"
        >
          {/* Rainbow */}
          <div
            className="flex justify-center mb-8"
            style={{
              opacity: celebrationRef.visible ? 1 : 0,
              transform: celebrationRef.visible ? "scale(1)" : "scale(0.8)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <img
              src="/assets/generated/rainbow-transparent.dim_500x300.png"
              alt="Rainbow"
              className="w-full max-w-md animate-float-bounce"
              style={{
                filter: "drop-shadow(0 8px 32px oklch(0.78 0.18 345 / 0.4))",
                animationDelay: "0.5s",
              }}
            />
          </div>

          {/* Big celebration card */}
          <div
            className="max-w-3xl mx-auto rounded-3xl p-10 sm:p-14 shadow-card-hover"
            style={{
              background:
                "linear-gradient(135deg, oklch(1 0 0 / 0.88), oklch(0.95 0.06 310 / 0.88))",
              backdropFilter: "blur(20px)",
              border: "2px solid oklch(0.82 0.18 85 / 0.4)",
              opacity: celebrationRef.visible ? 1 : 0,
              transform: celebrationRef.visible
                ? "translateY(0)"
                : "translateY(40px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
            }}
          >
            <h2
              className="font-display font-black mb-6 animate-shimmer"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1.1 }}
            >
              Today is YOUR Day! 🎊
            </h2>

            <p
              className="font-accent text-lg sm:text-xl leading-relaxed mb-10"
              style={{
                color: "oklch(0.32 0.08 320)",
                maxWidth: "600px",
                margin: "0 auto 2.5rem",
              }}
            >
              No matter where you are today, know that you are loved and
              celebrated. You are such a gift to everyone around you, Yuvica.
              May this birthday be the start of the best time of your life. Here
              is to you, here is to love, here is to all the good things ahead.{" "}
              <strong>Happy Birthday! 🎂💖✨</strong>
            </p>

            {/* Celebration emoji row */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {celebrationEmojis.map((emoji, i) => (
                <span
                  key={`celeb-${emoji}`}
                  className="text-3xl sm:text-4xl"
                  style={{
                    display: "inline-block",
                    animation: `emojiDance 2s ease-in-out ${i * 0.15}s infinite`,
                  }}
                >
                  {emoji}
                </span>
              ))}
            </div>

            {/* Extra celebration message */}
            <div
              className="mt-10 p-6 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.96 0.06 345 / 0.6), oklch(0.95 0.05 295 / 0.6))",
              }}
            >
              <p
                className="font-display text-2xl sm:text-3xl font-bold animate-glow-pulse"
                style={{ color: "oklch(0.62 0.18 345)" }}
              >
                🌟 You are loved. You are magical. You are Yuvica. 🌟
              </p>
            </div>
          </div>

          {/* Mobile balloons */}
          <div className="flex justify-center gap-8 mt-10 md:hidden">
            <img
              src="/assets/generated/balloons-transparent.dim_400x400.png"
              alt="Balloons"
              className="w-32 animate-float-bounce opacity-90"
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════ */}
        <footer
          className="relative text-center py-10 px-4 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.9 0.1 345 / 0.4), oklch(0.88 0.1 295 / 0.4))",
            borderTop: "1.5px solid oklch(0.85 0.1 320 / 0.3)",
          }}
        >
          {/* Floating mini hearts in footer */}
          {(["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"] as const).map(
            (hid, i) => (
              <div
                key={`footer-heart-${hid}`}
                className="pointer-events-none absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  bottom: "0",
                  fontSize: "1rem",
                  animation: `heartFloat ${3 + i * 0.4}s ease-in ${i * 0.5}s infinite`,
                  opacity: 0.6,
                }}
              >
                💕
              </div>
            ),
          )}

          <p
            className="font-display text-2xl font-bold mb-2 animate-glow-pulse"
            style={{ color: "oklch(0.62 0.18 345)" }}
          >
            Made with 💖 for Yuvica
          </p>
          <p
            className="font-accent text-sm"
            style={{ color: "oklch(0.55 0.08 320)" }}
          >
            Built by Garvit 💖
          </p>
        </footer>
      </main>
    </div>
  );
}
