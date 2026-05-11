'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './ScrollEffects.module.css';

// Floating Nature Orbs that drift on scroll
const NatureOrb: React.FC<{ delay: number; color: string; size: number; x: string; }> = ({ delay, color, size, x }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0vh', '60vh']);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.12, 0.25, 0.18, 0.05]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 0.9]);

    return (
        <motion.div
            className={styles.orb}
            style={{
                y,
                opacity,
                scale,
                width: size,
                height: size,
                background: color,
                left: x,
                animationDelay: `${delay}s`,
            }}
        />
    );
};

// Scroll progress bar at top of page
export const ScrollProgressBar: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            className={styles.progressBar}
            style={{ scaleX, transformOrigin: '0%' }}
        />
    );
};

// Animated section divider with nature motif
export const NatureDivider: React.FC = () => (
    <div className={styles.divider}>
        <div className={styles.dividerLine} />
        <div className={styles.dividerIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2C16 2 8 10 8 18C8 22.4 11.6 26 16 26C20.4 26 24 22.4 24 18C24 10 16 2 16 2Z" fill="currentColor" opacity="0.7"/>
                <path d="M16 8L16 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 16L16 12L22 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
        </div>
        <div className={styles.dividerLine} />
    </div>
);

// Background ambient orbs
export const AmbientOrbs: React.FC = () => {
    return (
        <div className={styles.orbsContainer} aria-hidden="true">
            <NatureOrb delay={0} color="radial-gradient(circle, rgba(45,106,79,0.6) 0%, transparent 70%)" size={600} x="10%" />
            <NatureOrb delay={2} color="radial-gradient(circle, rgba(64,145,108,0.5) 0%, transparent 70%)" size={400} x="65%" />
            <NatureOrb delay={4} color="radial-gradient(circle, rgba(255,159,28,0.3) 0%, transparent 70%)" size={300} x="80%" />
            <NatureOrb delay={1} color="radial-gradient(circle, rgba(148,210,189,0.4) 0%, transparent 70%)" size={500} x="40%" />
        </div>
    );
};

// Zoom in/out section wrapper
export const ZoomSection: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

    const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.88, 1, 1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -40]);

    return (
        <motion.div
            ref={ref}
            id={id}
            className={className}
            style={{ scale, opacity, y, willChange: 'transform, opacity' }}
        >
            {children}
        </motion.div>
    );
};

export default NatureOrb;
