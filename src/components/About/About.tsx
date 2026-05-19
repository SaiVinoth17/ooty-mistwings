'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Camera, Coffee, Mountain, ShieldCheck, Compass, HeartHandshake, Clock, Star, Wallet } from 'lucide-react';
import styles from './About.module.css';

const whyCards = [
    {
        icon: <Compass size={24} />,
        title: 'Local Expertise',
        description: 'Born and raised in the Nilgiris, we know every trail, hidden waterfall, and secret viewpoint.',
        color: '#2d6a4f',
    },
    {
        icon: <Wallet size={24} />,
        title: 'Affordable Luxury',
        description: 'Premium experiences at honest prices. No hidden fees, no compromises on quality.',
        color: '#ff9f1c',
    },
    {
        icon: <Star size={24} />,
        title: 'Personalized Trips',
        description: 'Every itinerary is tailored to your preferences. Tell us your dream — we make it happen.',
        color: '#9b5de5',
    },
    {
        icon: <Clock size={24} />,
        title: '24/7 Support',
        description: 'From booking to drop-off, our team is always just a WhatsApp message away.',
        color: '#0096c7',
    },
    {
        icon: <ShieldCheck size={24} />,
        title: 'Safe & Reliable',
        description: 'Verified drivers, insured vehicles, and 500+ happy travelers speak to our safety record.',
        color: '#2dc653',
    },
    {
        icon: <HeartHandshake size={24} />,
        title: 'Hidden Gems',
        description: 'Skip the tourist traps. We take you to the magical, misty corners of Ooty nobody else shows.',
        color: '#e63946',
    },
];

const features = [
    {
        icon: <Mountain size={24} />,
        title: 'Hidden Trails',
        description: 'Explore untouched paths and hidden waterfalls away from the tourist crowds.'
    },
    {
        icon: <Coffee size={24} />,
        title: 'Estate Experiences',
        description: 'Wake up to the aroma of fresh Nilgiri tea in our exclusive estate tours.'
    },
    {
        icon: <Leaf size={24} />,
        title: 'Eco-Conscious',
        description: 'We prioritize sustainable travel that benefits local communities and nature.'
    },
    {
        icon: <Camera size={24} />,
        title: 'Curated Moments',
        description: 'Specialized trips capturing the aesthetic misty golden hours of Ooty.'
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.1 + 0.1,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as any,
        },
    }),
};

export const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const imageRotateX = useTransform(scrollYProgress, [0, 0.5], [8, 0]);
    const imageRotateY = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);
    const imageScale   = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);

    return (
        <section className={styles.aboutSection} id="about" ref={sectionRef}>
            {/* Main about grid */}
            <div className={`container ${styles.aboutGrid}`}>
                {/* Image collage */}
                <motion.div
                    className={styles.imageCol}
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        rotateX: imageRotateX,
                        rotateY: imageRotateY,
                        scale: imageScale,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div className={styles.imageGrid}>
                        <div className={`${styles.imgBox} ${styles.tall}`}>
                            <img src="/about_waterfall.png" alt="Pykara Waterfalls Ooty" loading="lazy" />
                        </div>
                        <div className={`${styles.imgBox} ${styles.wide}`}>
                            <img src="/about_tea_estate.png" alt="Nilgiris Tea Estate" loading="lazy" />
                        </div>
                        <div className={`${styles.imgBox} ${styles.small}`}>
                            <img src="/about_bungalow.png" alt="Ooty Bungalow" loading="lazy" />
                        </div>
                    </div>
                    {/* Floating stat badge */}
                    <motion.div
                        className={styles.floatingBadge}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className={styles.badgeStar}>★</span>
                        <div>
                            <strong>4.9 / 5</strong>
                            <span>Avg. Rating</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Text side */}
                <motion.div
                    className={styles.contentCol}
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className={styles.sectionBadge}>Our Story</span>
                    <h2 className={styles.title}>
                        Redefining Ooty <br />
                        <span className={styles.highlight}>Beyond the Clichés</span>
                    </h2>
                    <p className={styles.desc}>
                        MistWings Holidays isn't just a travel agency — we are storytellers of the Nilgiris. We believe in
                        moving past the crowded botanical gardens and boating lakes to show you the untamed, misty, and
                        magical soul of Ooty.
                    </p>
                    <p className={styles.desc}>
                        From serene pine forest drives to twilight wildlife safaris, our itineraries are
                        crafted for those who seek the extraordinary.
                    </p>

                    <div className={styles.featuresList}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className={styles.featureItem}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.1 + 0.2,
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1] as any,
                                }}
                            >
                                <div className={styles.iconBox}>{feature.icon}</div>
                                <div>
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Why Choose Us — 6-card grid */}
            <div className={styles.whySection}>
                <div className="container">
                    <motion.div
                        className={styles.whyHeader}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className={styles.sectionBadge}>Why MistWings</span>
                        <h2 className={styles.whyTitle}>
                            6 Reasons Travelers <span className={styles.highlight}>Choose Us</span>
                        </h2>
                        <p className={styles.whySubtitle}>
                            Every trip we craft is built on trust, local knowledge, and a passion for showing you Ooty like never before.
                        </p>
                    </motion.div>

                    <div className={styles.whyGrid}>
                        {whyCards.map((card, index) => (
                            <motion.div
                                key={card.title}
                                className={styles.whyCard}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <div
                                    className={styles.whyIconBox}
                                    style={{
                                        background: `${card.color}18`,
                                        border: `1px solid ${card.color}30`,
                                        color: card.color,
                                    }}
                                >
                                    {card.icon}
                                </div>
                                <h3 className={styles.whyCardTitle}>{card.title}</h3>
                                <p className={styles.whyCardDesc}>{card.description}</p>
                                <div
                                    className={styles.whyCardGlow}
                                    style={{ background: `radial-gradient(ellipse at top left, ${card.color}15 0%, transparent 70%)` }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
