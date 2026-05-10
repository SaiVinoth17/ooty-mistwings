import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Camera, Coffee, Mountain } from 'lucide-react';
import styles from './About.module.css';

const features = [
    {
        icon: <Mountain size={24} />,
        title: 'Hidden Trails',
        description: 'Explore untouched paths and hidden waterfalls away from the tourist crowds.'
    },
    {
        icon: <Coffee size={24} />,
        title: 'Estate Stays',
        description: 'Wake up to the aroma of fresh Nilgiri tea in our exclusive estate bungalows.'
    },
    {
        icon: <Leaf size={24} />,
        title: 'Eco-Tourism',
        description: 'We prioritize sustainable travel that benefits local communities and nature.'
    },
    {
        icon: <Camera size={24} />,
        title: 'Curated Photography',
        description: 'Specialized trips capturing the aesthetic misty golden hours of Ooty.'
    }
];

export const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Image collage 3D tilt on scroll
    const imageRotateX = useTransform(scrollYProgress, [0, 0.5], [8, 0]);
    const imageRotateY = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);
    const imageScale   = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);

    return (
        <section className={styles.aboutSection} id="about" ref={sectionRef}>
            <div className={`container ${styles.aboutGrid}`}>
                {/* Image collage with 3D entrance */}
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
                        <div className={`${styles.imgBox} ${styles.tall}`} />
                        <div className={`${styles.imgBox} ${styles.wide}`} />
                        <div className={`${styles.imgBox} ${styles.small}`} />
                    </div>
                </motion.div>

                {/* Text side */}
                <motion.div
                    className={styles.contentCol}
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className={styles.sectionBadge}>Why Choose Us</span>
                    <h2 className={styles.title}>
                        Redefining Ooty <br />
                        <span className={styles.highlight}>Beyond the Clichés</span>
                    </h2>
                    <p className={styles.desc}>
                        MistWings Holidays isn't just a travel agency; we are storytellers of the Nilgiris. We believe in
                        moving past the crowded botanical gardens and boating lakes to show you the untamed, misty, and
                        magical soul of Ooty.
                    </p>
                    <p className={styles.desc}>
                        From dining under the shola forest canopy to twilight wildlife safaris, our itineraries are
                        crafted for those who seek the extraordinary.
                    </p>

                    <div className={styles.featuresList}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className={styles.featureItem}
                                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.12 + 0.2,
                                    duration: 0.6,
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
        </section>
    );
};
