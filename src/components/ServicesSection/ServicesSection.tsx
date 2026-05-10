'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ServicesSection.module.css';

const services = [
  {
    id: 'honeymoon',
    title: 'Honeymoon Package',
    description: 'Exclusive romantic getaways with premium stays and private experiences.',
    image: '/service_honeymoon.png',
  },
  {
    id: 'group',
    title: 'Group Package',
    description: 'Perfect for families and friends to explore the Nilgiris together.',
    image: '/service_group.png',
  },
  {
    id: 'team',
    title: 'Team Package',
    description: 'Corporate retreats and team building setups amidst nature.',
    image: '/service_team.png',
  }
];

// Per-card 3D stagger variant
const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 60,
    rotateX: 12,
    rotateY: i === 0 ? 6 : i === 2 ? -6 : 0,
    scale: 0.92,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      delay: i * 0.14,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  }),
};

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Section-level parallax drift
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section className={styles.servicesSection} ref={sectionRef}>
      <motion.div className="container" style={{ y: sectionY }}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.title}>
            Curated <span className={styles.highlight}>Services</span>
          </h2>
          <p className={styles.subtitle}>
            Specialized experiences designed for every occasion.
          </p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.serviceCard}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className={styles.imageContainer}>
                <img src={service.image} alt={service.title} className={styles.image} />
                <div className={styles.overlay}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
