"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, CheckCircle, Star, StarHalf, Shield, MessageSquare, Tag } from "lucide-react";
import styles from "./TrustSection.module.css";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface StatConfig {
  id: string;
  target: number;
  suffix: string;
  prefix: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  isRating?: boolean;
}

interface BadgeConfig {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

/* ─────────────────────────────────────────────
   Animated Counter Hook
───────────────────────────────────────────── */
function useCountUp(target: number, duration: number = 2000, active: boolean = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    },
    [target, duration]
  );

  useEffect(() => {
    if (!active) return;
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, animate]);

  return count;
}

/* ─────────────────────────────────────────────
   Star Rating Component
───────────────────────────────────────────── */
function StarRating() {
  return (
    <div className={styles.starRow} aria-label="4.9 out of 5 stars">
      {[1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={20}
          className={styles.starFilled}
          aria-hidden="true"
          fill="currentColor"
        />
      ))}
      <StarHalf
        size={20}
        className={styles.starFilled}
        aria-hidden="true"
        fill="currentColor"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Individual Stat Card
───────────────────────────────────────────── */
function StatCard({
  stat,
  index,
  active,
}: {
  stat: StatConfig;
  index: number;
  active: boolean;
}) {
  const count = useCountUp(stat.target, 2000, active);

  return (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.03 }}
    >
      {/* Accent glow blob */}
      <div className={styles.cardGlow} aria-hidden="true" />

      {/* Icon */}
      <div className={styles.iconWrap} aria-hidden="true">
        {stat.icon}
      </div>

      {/* Counter / Rating */}
      {stat.isRating ? (
        <div className={styles.ratingBlock}>
          <span className={styles.counterValue}>
            {stat.prefix}
            {(count / 10).toFixed(1)}
            {stat.suffix}
          </span>
          <StarRating />
        </div>
      ) : (
        <span className={styles.counterValue}>
          {stat.prefix}
          {count.toLocaleString()}
          {stat.suffix}
        </span>
      )}

      {/* Label */}
      <p className={styles.statLabel}>{stat.label}</p>
      <p className={styles.statSublabel}>{stat.sublabel}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────── */
const STATS: StatConfig[] = [
  {
    id: "travelers",
    target: 500,
    suffix: "+",
    prefix: "",
    label: "Happy Travelers",
    sublabel: "Memories made in the Nilgiris",
    icon: <Users size={28} strokeWidth={1.8} />,
  },
  {
    id: "rating",
    target: 49,          // divided by 10 → 4.9
    suffix: "★",
    prefix: "",
    label: "Google Rating",
    sublabel: "Verified reviews from our guests",
    icon: <Star size={28} strokeWidth={1.8} />,
    isRating: true,
  },
  {
    id: "years",
    target: 5,
    suffix: "+",
    prefix: "",
    label: "Years Experience",
    sublabel: "Crafting Ooty adventures since 2019",
    icon: <Award size={28} strokeWidth={1.8} />,
  },
  {
    id: "success",
    target: 98,
    suffix: "%",
    prefix: "",
    label: "Trip Success",
    sublabel: "Zero compromises on experience",
    icon: <CheckCircle size={28} strokeWidth={1.8} />,
  },
];

const BADGES: BadgeConfig[] = [
  {
    id: "local",
    label: "Locally Owned & Operated",
    sub: "Born & bred in Ooty",
    icon: <Shield size={18} strokeWidth={2} />,
  },
  {
    id: "whatsapp",
    label: "Instant WhatsApp Booking",
    sub: "Reply within minutes",
    icon: <MessageSquare size={18} strokeWidth={2} />,
  },
  {
    id: "price",
    label: "Best Price Guarantee",
    sub: "No hidden charges, ever",
    icon: <Tag size={18} strokeWidth={2} />,
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="trust" ref={sectionRef} className={styles.section}>
      {/* Mist overlays for blending */}
      <div className={styles.mistTop} aria-hidden="true" />
      <div className={styles.mistBottom} aria-hidden="true" />

      {/* Background radial depth orbs */}
      <div className={styles.orbLeft} aria-hidden="true" />
      <div className={styles.orbRight} aria-hidden="true" />

      <div className="container">
        {/* Section heading */}
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.eyebrow}>Why Choose Us</span>
          <h2 className={styles.title}>
            Trusted by Hundreds of{" "}
            <span className={styles.accentText}>Happy Travelers</span>
          </h2>
          <p className={styles.subtitle}>
            From the misty peaks of Doddabetta to the sprawling tea estates of Ooty — we&apos;ve
            been crafting unforgettable Nilgiris experiences since 2019.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className={styles.statsGrid} role="list" aria-label="MistWings statistics">
          {STATS.map((stat, i) => (
            <div key={stat.id} role="listitem">
              <StatCard stat={stat} index={i} active={isInView} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        {/* Trust badges row */}
        <motion.div
          className={styles.badgesRow}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          role="list"
          aria-label="Trust badges"
        >
          {BADGES.map((badge, i) => (
            <motion.div
              key={badge.id}
              className={styles.badge}
              role="listitem"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.7 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.04, y: -2 }}
            >
              <span className={styles.badgeIcon} aria-hidden="true">
                {badge.icon}
              </span>
              <div className={styles.badgeText}>
                <span className={styles.badgeLabel}>{badge.label}</span>
                <span className={styles.badgeSub}>{badge.sub}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
