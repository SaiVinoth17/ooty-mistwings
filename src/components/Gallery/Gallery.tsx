'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import styles from './Gallery.module.css';

interface GalleryItem {
    id: number;
    src: string;
    title: string;
    location: string;
    aspect: 'tall' | 'wide' | 'square';
}

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        src: '/ooty-bg.png',
        title: 'Misty Ooty Hills',
        location: 'Ooty, Nilgiris',
        aspect: 'tall',
    },
    {
        id: 2,
        src: '/ooty-botanical.png',
        title: 'Botanical Garden',
        location: 'Ooty Lake Road',
        aspect: 'wide',
    },
    {
        id: 3,
        src: '/ooty-tea-estate.png',
        title: 'Nilgiri Tea Estates',
        location: 'Coonoor, Nilgiris',
        aspect: 'tall',
    },
    {
        id: 4,
        src: '/about_waterfall.png',
        title: 'Hidden Waterfall',
        location: 'Pykara, Ooty',
        aspect: 'square',
    },
    {
        id: 5,
        src: '/mudumalai.png',
        title: 'Mudumalai Wilderness',
        location: 'Mudumalai Tiger Reserve',
        aspect: 'wide',
    },
    {
        id: 6,
        src: '/pykara-boating.png',
        title: 'Pykara Lake Boating',
        location: 'Pykara, Ooty',
        aspect: 'tall',
    },
    {
        id: 7,
        src: '/about_tea_estate.png',
        title: 'Dawn at the Tea Garden',
        location: 'Kotagiri, Nilgiris',
        aspect: 'square',
    },
    {
        id: 8,
        src: '/mudumalai-standalone.png',
        title: 'Into the Wild',
        location: 'Mudumalai, Tamil Nadu',
        aspect: 'tall',
    },
    {
        id: 9,
        src: '/ooty-pykara.png',
        title: 'Emerald Valley',
        location: 'Pykara Route, Ooty',
        aspect: 'wide',
    },
    {
        id: 10,
        src: '/pykara_mudumalai_combo.png',
        title: 'Pykara & Mudumalai',
        location: 'Nilgiri Biosphere',
        aspect: 'square',
    },
    {
        id: 11,
        src: '/about_bungalow.png',
        title: 'Estate Bungalow',
        location: 'Ooty, Tamil Nadu',
        aspect: 'tall',
    },
    {
        id: 12,
        src: '/hero-bg.png',
        title: 'Golden Hour Mist',
        location: 'Ooty Viewpoint',
        aspect: 'wide',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

export const Gallery = () => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = useCallback(() => {
        setLightboxIndex(null);
        document.body.style.overflow = 'auto';
    }, []);

    const goNext = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
    }, [lightboxIndex]);

    const goPrev = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex(
            (lightboxIndex - 1 + galleryItems.length) % galleryItems.length
        );
    }, [lightboxIndex]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxIndex, closeLightbox, goNext, goPrev]);

    const activeItem =
        lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

    return (
        <section className={styles.gallerySection} id="gallery">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className={styles.sectionHeader}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className={styles.sectionBadge}>
                        <Images size={16} />
                        Our Gallery
                    </span>
                    <h2 className={styles.sectionTitle}>
                        Capture the Magic of{' '}
                        <span className={styles.highlight}>the Nilgiris</span>
                    </h2>
                    <p className={styles.sectionDesc}>
                        Every frame tells a story — from mist-draped peaks to
                        emerald tea gardens and wild forest paths.
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                <motion.div
                    className={styles.masonryGrid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`${styles.galleryItem} ${styles[item.aspect]}`}
                            variants={itemVariants}
                            onClick={() => openLightbox(index)}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    loading="lazy"
                                    className={styles.galleryImage}
                                />
                                <div className={styles.overlay}>
                                    <div className={styles.overlayContent}>
                                        <ZoomIn
                                            size={28}
                                            className={styles.zoomIcon}
                                        />
                                        <div className={styles.overlayText}>
                                            <h3 className={styles.imageTitle}>
                                                {item.title}
                                            </h3>
                                            <p className={styles.imageLocation}>
                                                {item.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && activeItem && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className={styles.lightboxBackdrop}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeLightbox}
                        />

                        {/* Modal */}
                        <motion.div
                            className={styles.lightboxModal}
                            initial={{ opacity: 0, scale: 0.88, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.88, y: 24 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                className={styles.closeBtn}
                                onClick={closeLightbox}
                                aria-label="Close lightbox"
                            >
                                <X size={20} />
                            </button>

                            {/* Image */}
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeItem.id}
                                    src={activeItem.src}
                                    alt={activeItem.title}
                                    className={styles.lightboxImage}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.04 }}
                                    transition={{ duration: 0.35 }}
                                />
                            </AnimatePresence>

                            {/* Caption */}
                            <div className={styles.lightboxCaption}>
                                <h3 className={styles.lightboxTitle}>
                                    {activeItem.title}
                                </h3>
                                <p className={styles.lightboxLocation}>
                                    {activeItem.location}
                                </p>
                            </div>

                            {/* Counter */}
                            <div className={styles.lightboxCounter}>
                                {lightboxIndex + 1} / {galleryItems.length}
                            </div>
                        </motion.div>

                        {/* Prev Button */}
                        <motion.button
                            className={`${styles.navBtn} ${styles.navBtnPrev}`}
                            onClick={goPrev}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={26} />
                        </motion.button>

                        {/* Next Button */}
                        <motion.button
                            className={`${styles.navBtn} ${styles.navBtnNext}`}
                            onClick={goNext}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            aria-label="Next image"
                        >
                            <ChevronRight size={26} />
                        </motion.button>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};
