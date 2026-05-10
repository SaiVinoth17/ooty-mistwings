import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import styles from './Hero.module.css';

export const Hero = () => {
    const { scrollY } = useScroll();

    // Parallax layers — different speeds for depth
    const bgY       = useTransform(scrollY, [0, 1000], [0, 320]);
    const contentY  = useTransform(scrollY, [0, 600],  [0, -80]);
    const rotateX   = useTransform(scrollY, [0, 600],  [0, 6]);
    const scale     = useTransform(scrollY, [0, 600],  [1, 0.94]);
    const opacity   = useTransform(scrollY, [0, 520],  [1, 0]);

    // Spring-smoothed versions
    const smoothBgY      = useSpring(bgY,      { stiffness: 80, damping: 20 });
    const smoothContentY = useSpring(contentY, { stiffness: 80, damping: 20 });
    const smoothRotateX  = useSpring(rotateX,  { stiffness: 80, damping: 20 });
    const smoothScale    = useSpring(scale,    { stiffness: 80, damping: 20 });

    return (
        <section className={styles.heroSection} id="home">
            {/* Deep parallax background */}
            <motion.div
                className={styles.background}
                style={{ y: smoothBgY }}
            >
                <img src="/hero-bg.png" alt="Ooty Landscape" className={styles.bgImage} />
                <div className={styles.overlay} />
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
                        initial={{ opacity: 0, y: 24, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Discover the Unseen Nilgiris
                    </motion.span>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
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
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.85, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.015 }}
                    >
                        <div className={styles.searchItem}>
                            <MapPin className={styles.icon} size={20} />
                            <div className={styles.inputGroup}>
                                <label>Location</label>
                                <input type="text" placeholder="Where to?" defaultValue="Ooty, Tamil Nadu" />
                            </div>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.searchItem}>
                            <Calendar className={styles.icon} size={20} />
                            <div className={styles.inputGroup}>
                                <label>Date</label>
                                <input type="text" placeholder="When?" defaultValue="Upcoming Weekend" />
                            </div>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.searchItem}>
                            <Users className={styles.icon} size={20} />
                            <div className={styles.inputGroup}>
                                <label>Guests</label>
                                <input type="text" placeholder="Who?" defaultValue="2 Guests" />
                            </div>
                        </div>

                        <button
                            className={styles.searchBtn}
                            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <Search size={22} />
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
