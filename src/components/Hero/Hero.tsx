import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import styles from './Hero.module.css';

const words = ["MistWings", "Holidays"];
const subWords = ["Untamed", "Travels"];

const wordVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: 0.36 + i * 0.14,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as any,
        },
    }),
};

export const Hero = () => {
    const { scrollY } = useScroll();

    const bgY       = useTransform(scrollY, [0, 1000], [0, 380]);
    const bgScale   = useTransform(scrollY, [0, 800],  [1, 1.12]);
    const contentY  = useTransform(scrollY, [0, 600],  [0, -100]);
    const rotateX   = useTransform(scrollY, [0, 600],  [0, 8]);
    const scale     = useTransform(scrollY, [0, 600],  [1, 0.92]);
    const opacity   = useTransform(scrollY, [0, 450],  [1, 0]);

    const smoothBgY      = useSpring(bgY,      { stiffness: 60, damping: 18 });
    const smoothBgScale  = useSpring(bgScale,  { stiffness: 60, damping: 18 });
    const smoothContentY = useSpring(contentY, { stiffness: 80, damping: 22 });
    const smoothRotateX  = useSpring(rotateX,  { stiffness: 80, damping: 22 });
    const smoothScale    = useSpring(scale,    { stiffness: 80, damping: 22 });

    const scrollToPackages = () => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
    const openWhatsApp = () => window.open('https://wa.me/916381911347?text=Hi!%20I%20want%20to%20book%20a%20tour%20with%20MistWings%20Holidays.', '_blank');

    return (
        <section className={styles.heroSection} id="home">
            {/* Deep parallax + zoom background */}
            <motion.div
                className={styles.background}
                style={{ y: smoothBgY, scale: smoothBgScale }}
            >
                <img src="/hero-bg.png" alt="Ooty Misty Nilgiris Landscape" className={styles.bgImage} />
                <div className={styles.overlay} />
                <div className={styles.mist} aria-hidden="true" />
                <div className={styles.mist2} aria-hidden="true" />
            </motion.div>

            {/* 3-D content layer */}
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
                    {/* Badge */}
                    <motion.span
                        className={styles.badge}
                        initial={{ opacity: 0, y: 24, scale: 0.88 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        ✦ Discover the Unseen Nilgiris ✦
                    </motion.span>

                    {/* Animated word-reveal title */}
                    <h1 className={styles.title} aria-label="MistWings Holidays Untamed Travels">
                        <span className={styles.titleLine}>
                            {words.map((word, i) => (
                                <motion.span
                                    key={word}
                                    className={styles.titleWord}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                        <br />
                        <span className={styles.titleLine}>
                            {subWords.map((word, i) => (
                                <motion.span
                                    key={word}
                                    className={`${styles.titleWord} ${styles.highlight}`}
                                    custom={i + 2}
                                    variants={wordVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                    </h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Immerse yourself in aesthetic nature trails, exclusive tea estate stays,
                        and magical adventures crafted for wanderlust souls.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className={styles.ctaRow}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <button className={styles.ctaPrimary} onClick={scrollToPackages} aria-label="Explore tour packages">
                            <span>Explore Packages</span>
                            <ArrowRight size={18} />
                        </button>
                        <button className={styles.ctaWhatsApp} onClick={openWhatsApp} aria-label="Book on WhatsApp">
                            <MessageCircle size={18} />
                            <span>Book on WhatsApp</span>
                        </button>
                    </motion.div>

                    {/* Quick Info Row */}
                    <motion.div
                        className={styles.quickInfo}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className={styles.quickItem}>
                            <MapPin size={14} />
                            <span>Ooty, Tamil Nadu</span>
                        </div>
                        <div className={styles.quickDivider} />
                        <div className={styles.quickItem}>
                            <Calendar size={14} />
                            <span>Open Year Round</span>
                        </div>
                        <div className={styles.quickDivider} />
                        <div className={styles.quickItem}>
                            <Users size={14} />
                            <span>Groups Welcome</span>
                        </div>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        className={styles.statsRow}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {[
                            { value: '500+', label: 'Happy Travelers' },
                            { value: '4.9★', label: 'Google Rating' },
                            { value: '5+', label: 'Years Experience' },
                            { value: '8', label: 'Tour Packages' },
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
                aria-label="Scroll down to packages"
            >
                <div className={styles.scrollRing} />
                <ChevronDown size={22} />
            </motion.button>
        </section>
    );
};
