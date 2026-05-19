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
        src: '/gallery_original_11.jpg',
        title: 'Pykara Lake Boating',
        location: 'Pykara, Ooty',
        aspect: 'tall',
    },
    {
        id: 2,
        src: '/gallery_original_1.jpg',
        title: 'Misty Mountain Valley',
        location: 'Doddabetta Peak, Ooty',
        aspect: 'tall',
    },
    {
        id: 3,
        src: '/gallery_original_5.jpg',
        title: 'Scenic Estate Drive',
        location: 'Coonoor Tea Estates',
        aspect: 'wide',
    },
    {
        id: 4,
        src: '/gallery_original_2.jpg',
        title: 'Happy Travelers & Guides',
        location: 'Pine Forest Trails',
        aspect: 'tall',
    },
    {
        id: 5,
        src: '/gallery_original_6.jpg',
        title: 'Sunset Over Nilgiri Range',
        location: 'Ooty Viewpoint',
        aspect: 'wide',
    },
    {
        id: 6,
        src: '/gallery_original_3.jpg',
        title: 'Into the Pine Wilderness',
        location: 'Shooting Point, Ooty',
        aspect: 'tall',
    },
    {
        id: 7,
        src: '/gallery_original_7.jpg',
        title: 'Tea Garden Panoramas',
        location: 'Kotagiri, Nilgiris',
        aspect: 'wide',
    },
    {
        id: 8,
        src: '/gallery_original_4.jpg',
        title: 'Chasing Hidden Cascades',
        location: 'Catherine Waterfalls',
        aspect: 'tall',
    },
    {
        id: 9,
        src: '/gallery_original_9.jpg',
        title: 'Wildlife Safari Adventure',
        location: 'Mudumalai Forest Route',
        aspect: 'wide',
    },
    {
        id: 10,
        src: '/gallery_original_8.jpg',
        title: 'Serene Lake Vistas',
        location: 'Avalanche Lake, Ooty',
        aspect: 'tall',
    },
    {
        id: 11,
        src: '/gallery_original_10.jpg',
        title: 'Estate Bungalow Walkway',
        location: 'Ooty, Tamil Nadu',
        aspect: 'tall',
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
