'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink, Code2, Sparkles, Laptop, Rocket, Cpu, CheckCircle } from 'lucide-react';
import styles from './DevPromo.module.css';

export const DevPromo = () => {
    const features = [
        'Modern UI/UX Design',
        'Fast & Responsive Websites',
        'SEO Optimized',
        'Business Landing Pages',
        'Portfolio Websites',
        'Booking Platforms',
        'Full Deployment Support',
        'Premium Animations',
    ];

    return (
        <section className={styles.promoSection} id="need-a-website">
            {/* Background elements */}
            <div className={styles.glowOrb1} aria-hidden="true" />
            <div className={styles.glowOrb2} aria-hidden="true" />
            <div className={styles.codeWatermark} aria-hidden="true">
                {`const developer = {
  name: "Sai Vinoth",
  skills: ["React", "Next.js", "CSS", "UI/UX"],
  passion: "Premium Websites",
  speed: "Optimized"
};`}
            </div>

            <div className="container">
                <motion.div 
                    className={styles.promoCard}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Top availability badge */}
                    <div className={styles.badgeRow}>
                        <div className={styles.availBadge}>
                            <span className={styles.pulseDot} />
                            Available for Freelance Projects
                        </div>
                    </div>

                    <div className={styles.cardContent}>
                        {/* Left column: Text info */}
                        <div className={styles.textCol}>
                            <div className={styles.sectionHeader}>
                                <span className={styles.categoryBadge}>
                                    <Code2 size={14} />
                                    Need a Website?
                                </span>
                                <h2 className={styles.headline}>
                                    Need a Website for <br />
                                    <span className={styles.highlight}>Your Business?</span>
                                </h2>
                                <p className={styles.subheadline}>
                                    We design and develop modern, high-performance websites for travel brands, 
                                    startups, local businesses, creators, and companies.
                                </p>
                            </div>

                            {/* Features grid */}
                            <div className={styles.featuresGrid}>
                                {features.map((feature, idx) => (
                                    <motion.div 
                                        key={idx}
                                        className={styles.featureItem}
                                        initial={{ opacity: 0, x: -15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 + 0.2, duration: 0.4 }}
                                    >
                                        <CheckCircle size={16} className={styles.checkIcon} />
                                        <span>{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Action Row */}
                            <div className={styles.ctaRow}>
                                <motion.a
                                    href="https://wa.me/917604904217?text=Hi%20Sai%20Vinoth%2C%20I%20need%20a%20professional%20website%20for%20my%20business."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.primaryCta}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <MessageCircle size={18} />
                                    <span>Chat on WhatsApp</span>
                                </motion.a>

                                <motion.a
                                    href="https://wa.me/917604904217?text=Hi%20Sai%20Vinoth%2C%20I%20would%20like%20to%20see%20your%20web%20design%20portfolio."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.secondaryCta}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <ExternalLink size={16} />
                                    <span>View Portfolio</span>
                                </motion.a>
                            </div>

                            {/* Trust Indicator */}
                            <div className={styles.trustIndicator}>
                                <Sparkles size={14} className={styles.sparkleIcon} />
                                Custom Websites Delivered Professionally
                            </div>
                        </div>

                        {/* Right column: Interactive Visual Graphic */}
                        <div className={styles.graphicCol}>
                            <div className={styles.windowFrame}>
                                <div className={styles.windowHeader}>
                                    <span className={styles.windowDotRed} />
                                    <span className={styles.windowDotYellow} />
                                    <span className={styles.windowDotGreen} />
                                    <span className={styles.windowTitle}>saivinoth.dev</span>
                                </div>
                                <div className={styles.windowBody}>
                                    <div className={styles.codeLine}><span className={styles.codeKeyword}>import</span> {'{ ModernWeb }'} <span className={styles.codeKeyword}>from</span> <span className={styles.codeString}>'saivinoth-dev'</span>;</div>
                                    <div className={styles.codeLine} />
                                    <div className={styles.codeLine}><span className={styles.codeComment}>// Crafting stunning digital experiences</span></div>
                                    <div className={styles.codeLine}><span className={styles.codeKeyword}>const</span> <span className={styles.codeVar}>project</span> = <span className={styles.codeKeyword}>new</span> <span className={styles.codeClass}>ModernWeb</span>({'{'}</div>
                                    <div className={`${styles.codeLine} ${styles.indent1}`}><span className={styles.codeKey}>design</span>: <span className={styles.codeString}>'Premium Cinematic'</span>,</div>
                                    <div className={`${styles.codeLine} ${styles.indent1}`}><span className={styles.codeKey}>performance</span>: <span className={styles.codeString}>'Ultra Fast 100/100'</span>,</div>
                                    <div className={`${styles.codeLine} ${styles.indent1}`}><span className={styles.codeKey}>ux</span>: <span className={styles.codeString}>'Apple Level Smoothness'</span>,</div>
                                    <div className={`${styles.codeLine} ${styles.indent1}`}><span className={styles.codeKey}>seo</span>: <span className={styles.codeString}>'Ranked #1 on Google'</span></div>
                                    <div className={styles.codeLine}>{'}'});</div>
                                    <div className={styles.codeLine} />
                                    <div className={styles.codeLine}><span className={styles.codeVar}>project</span>.<span className={styles.codeMethod}>launch</span>();</div>
                                </div>
                            </div>

                            {/* Floating decorative mini-badges */}
                            <motion.div 
                                className={`${styles.floatBadge} ${styles.badge1}`}
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            >
                                <Laptop size={14} />
                                UI/UX Design
                            </motion.div>
                            <motion.div 
                                className={`${styles.floatBadge} ${styles.badge2}`}
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                            >
                                <Rocket size={14} />
                                Next.js & SEO
                            </motion.div>
                            <motion.div 
                                className={`${styles.floatBadge} ${styles.badge3}`}
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                            >
                                <Cpu size={14} />
                                100% Core Web Vitals
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
