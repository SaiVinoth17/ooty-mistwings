'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

interface Testimonial {
    id: number;
    name: string;
    origin: string;
    tripType: string;
    rating: number;
    quote: string;
    initials: string;
    avatarGradient: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Priya Sharma',
        origin: 'Mumbai',
        tripType: 'Honeymoon Package',
        rating: 5,
        quote: 'MistWings made our honeymoon absolutely magical! The private tea estate tour at sunrise was beyond our expectations. Every detail was planned perfectly.',
        initials: 'PS',
        avatarGradient: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)',
    },
    {
        id: 2,
        name: 'Rahul & Kavitha',
        origin: 'Chennai',
        tripType: 'Complete Ooty Tour',
        rating: 5,
        quote: 'Best travel experience we\'ve had! Our guide knew every hidden spot. The Doddabetta sunrise views were breathtaking. Highly recommend!',
        initials: 'RK',
        avatarGradient: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
    },
    {
        id: 3,
        name: 'Arun Kumar',
        origin: 'Bangalore',
        tripType: 'Mudumalai Safari',
        rating: 5,
        quote: 'Saw wild elephants up close! The safari was thrilling and the driver was knowledgeable. Will definitely book again for our next trip.',
        initials: 'AK',
        avatarGradient: 'linear-gradient(135deg, #ff9f1c 0%, #e07b0b 100%)',
    },
    {
        id: 4,
        name: 'Meena Iyer',
        origin: 'Coimbatore',
        tripType: 'Pykara Escapade',
        rating: 5,
        quote: 'The waterfalls were stunning! Everything was well-organized from pickup to drop. The team is very professional and friendly.',
        initials: 'MI',
        avatarGradient: 'linear-gradient(135deg, #40916c 0%, #74c69d 100%)',
    },
    {
        id: 5,
        name: 'Sanjay & Family',
        origin: 'Hyderabad',
        tripType: 'Family Group Tour',
        rating: 5,
        quote: 'Perfect for family travel. Kids loved the botanical garden and the tea factory. Affordable pricing for excellent service!',
        initials: 'SF',
        avatarGradient: 'linear-gradient(135deg, #1b4332 0%, #40916c 100%)',
    },
    {
        id: 6,
        name: 'Divya Nair',
        origin: 'Kerala',
        tripType: 'Coonoor Heritage Tour',
        rating: 5,
        quote: 'Coonoor is a hidden gem! MistWings showed us places we never would have found on our own. The lamb\'s rock views were spectacular!',
        initials: 'DN',
        avatarGradient: 'linear-gradient(135deg, #ff9f1c 0%, #2d6a4f 100%)',
    },
];

const AUTO_PLAY_INTERVAL = 4000;

export const Testimonials = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goToNext = useCallback(() => {
        setDirection('next');
        setCurrent((prev) => (prev + 1) % testimonials.length);
    }, []);

    const goToPrev = useCallback(() => {
        setDirection('prev');
        setCurrent(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    }, []);

    const goToIndex = (index: number) => {
        setDirection(index > current ? 'next' : 'prev');
        setCurrent(index);
    };

    // Auto-play
    useEffect(() => {
        if (isPaused) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(goToNext, AUTO_PLAY_INTERVAL);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, goToNext]);

    const slideVariants = {
        enter: (dir: 'next' | 'prev') => ({
            opacity: 0,
            x: dir === 'next' ? 60 : -60,
            scale: 0.97,
        }),
        center: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
        },
        exit: (dir: 'next' | 'prev') => ({
            opacity: 0,
            x: dir === 'next' ? -60 : 60,
            scale: 0.97,
            transition: { duration: 0.35 },
        }),
    };

    const activeTestimonial = testimonials[current];

    return (
        <section className={styles.testimonialsSection} id="testimonials">
            {/* Background ambient elements */}
            <div className={styles.ambientBlob1} aria-hidden="true" />
            <div className={styles.ambientBlob2} aria-hidden="true" />

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
                        <Star size={15} fill="currentColor" />
                        Traveler Stories
                    </span>
                    <h2 className={styles.sectionTitle}>
                        What Our{' '}
                        <span className={styles.highlight}>Guests Say</span>
                    </h2>
                    <p className={styles.sectionDesc}>
                        Real experiences from travelers who discovered the magic
                        of the Nilgiris with us.
                    </p>
                </motion.div>

                {/* Slider */}
                <div
                    className={styles.sliderWrapper}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Prev Arrow */}
                    <button
                        className={`${styles.arrowBtn} ${styles.arrowPrev}`}
                        onClick={goToPrev}
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {/* Card */}
                    <div className={styles.cardViewport}>
                        <AnimatePresence
                            mode="wait"
                            custom={direction}
                            initial={false}
                        >
                            <motion.div
                                key={activeTestimonial.id}
                                className={styles.testimonialCard}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                {/* Quote icon */}
                                <div className={styles.quoteIconWrapper} aria-hidden="true">
                                    <Quote size={32} className={styles.quoteIcon} />
                                </div>

                                {/* Quote text */}
                                <blockquote className={styles.quoteText}>
                                    &ldquo;{activeTestimonial.quote}&rdquo;
                                </blockquote>

                                {/* Stars */}
                                <div className={styles.starsRow} aria-label={`${activeTestimonial.rating} out of 5 stars`}>
                                    {Array.from({ length: activeTestimonial.rating }).map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={styles.starIcon}
                                                fill="currentColor"
                                            />
                                        )
                                    )}
                                </div>

                                {/* Traveler Info */}
                                <div className={styles.travelerRow}>
                                    <div
                                        className={styles.avatar}
                                        style={{
                                            background:
                                                activeTestimonial.avatarGradient,
                                        }}
                                        aria-hidden="true"
                                    >
                                        {activeTestimonial.initials}
                                    </div>
                                    <div className={styles.travelerInfo}>
                                        <span className={styles.travelerName}>
                                            {activeTestimonial.name}
                                        </span>
                                        <span className={styles.travelerOrigin}>
                                            {activeTestimonial.origin}
                                        </span>
                                    </div>
                                    <span className={styles.tripBadge}>
                                        {activeTestimonial.tripType}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Next Arrow */}
                    <button
                        className={`${styles.arrowBtn} ${styles.arrowNext}`}
                        onClick={goToNext}
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                {/* Dot Navigation */}
                <div className={styles.dotsRow} role="tablist" aria-label="Testimonial navigation">
                    {testimonials.map((t, i) => (
                        <button
                            key={t.id}
                            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                            onClick={() => goToIndex(i)}
                            role="tab"
                            aria-selected={i === current}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Progress bar */}
                {!isPaused && (
                    <div className={styles.progressBar}>
                        <motion.div
                            key={current}
                            className={styles.progressFill}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                duration: AUTO_PLAY_INTERVAL / 1000,
                                ease: 'linear',
                            }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};
