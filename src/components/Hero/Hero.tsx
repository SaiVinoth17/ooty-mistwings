import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';

export const Hero = () => {
    const { scrollY } = useScroll();

    // Parallax layers — different speeds for depth
    const bgY       = useTransform(scrollY, [0, 1000], [0, 380]);
    const bgScale   = useTransform(scrollY, [0, 800],  [1, 1.12]);
    const contentY  = useTransform(scrollY, [0, 600],  [0, -100]);
    const rotateX   = useTransform(scrollY, [0, 600],  [0, 8]);
    const scale     = useTransform(scrollY, [0, 600],  [1, 0.92]);
    const opacity   = useTransform(scrollY, [0, 450],  [1, 0]);
    const blurVal   = useTransform(scrollY, [0, 500],  [0, 8]);

    // Spring-smoothed versions
    const smoothBgY      = useSpring(bgY,      { stiffness: 60, damping: 18 });
    const smoothBgScale  = useSpring(bgScale,  { stiffness: 60, damping: 18 });
    const smoothContentY = useSpring(contentY, { stiffness: 80, damping: 22 });
    const smoothRotateX  = useSpring(rotateX,  { stiffness: 80, damping: 22 });
    const smoothScale    = useSpring(scale,    { stiffness: 80, damping: 22 });

    const scrollToPackages = () => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className={styles.heroSection} id="home">
            {/* Deep parallax + zoom background */}
            <motion.div
                className={styles.background}
                style={{ y: smoothBgY, scale: smoothBgScale }}
            >
                <img src="/hero-bg.png" alt="Ooty Misty Landscape" className={styles.bgImage} />
                <div className={styles.overlay} />
                {/* Animated mist layer */}
                <div className={styles.mist} aria-hidden="true" />
                <div className={styles.mist2} aria-hidden="true" />
            </motion.div>

            {/* 3-D content layer — tilts & recedes as you scroll */}
            <div className={`container ${styles.contentContainer}`}>
                <motion.div
                    className={styles.content}
                    style={{
                        y: smoothContentY,
                        rotateX: smoothRotateX,
                        scale: smoothScale,
                        opacity,
                        transformOrigin: '50% 0%',
                    }}
                >
                    <motion.span
                        className={styles.badge}
                        initial={{ opacity: 0, y: 24, scale: 0.88 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        ✦ Discover the Unseen Nilgiris ✦
                    </motion.span>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    >
                        MistWings Holidays <br />
                        <span className={styles.highlight}>Untamed Travels</span>
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Immerse yourself in aesthetic nature trails, exclusive tea estate stays,
                        and magical adventures crafted for wanderlust.
                    </motion.p>

                    {/* Liquid-glass search bar */}
                    <motion.div
                        className={`glass-panel ${styles.searchBar}`}
                        initial={{ opacity: 0, y: 48, scale: 0.93 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.012 }}
                    >
                        <div className={styles.searchItem}>
                            <MapPin className={styles.icon} size={20} />
                            <div className={styles.inputGroup}>
                                <label>Location</label>
                                <input type="text" placeholder="Where to?" defaultValue="Ooty, Tamil Nadu" readOnly />
                            </div>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.searchItem}>
                            <Calendar className={styles.icon} size={20} />
                            <div className={styles.inputGroup}>
                                <label>Date</label>
                                <input type="text" placeholder="When?" defaultValue="Upcoming Weekend" readOnly />
                            </div>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.searchItem}>
                            <Users className={styles.icon} size={20} />
                            <div className={styles.inputGroup}>
                                <label>Guests</label>
                                <input type="text" placeholder="Who?" defaultValue="2 Guests" readOnly />
                            </div>
                        </div>

                        <button
                            className={styles.searchBtn}
                            onClick={scrollToPackages}
                            aria-label="Explore packages"
                        >
                            <Search size={22} />
                        </button>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        className={styles.statsRow}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {[
                            { value: '500+', label: 'Happy Tourists' },
                            { value: '8', label: 'Tour Packages' },
                            { value: '4.9★', label: 'Avg Rating' },
                        ].map((stat) => (
                            <div key={stat.label} className={styles.statItem}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                className={styles.scrollIndicator}
                onClick={scrollToPackages}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                aria-label="Scroll down"
            >
                <ChevronDown size={28} />
            </motion.button>
        </section>
    );
};
