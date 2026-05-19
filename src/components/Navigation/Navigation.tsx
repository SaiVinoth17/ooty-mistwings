import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import styles from './Navigation.module.css';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Packages', href: '#packages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active section detection via IntersectionObserver
    useEffect(() => {
        const sectionIds = navLinks.map(l => l.href.slice(1));
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { rootMargin: '-40% 0px -55% 0px' }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach(obs => obs.disconnect());
    }, []);

    // Close menu on scroll
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const close = () => setIsMobileMenuOpen(false);
        window.addEventListener('scroll', close, { passive: true, once: true });
        return () => window.removeEventListener('scroll', close);
    }, [isMobileMenuOpen]);

    return (
        <motion.header
            className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className={`container ${styles.navContainer}`}>
                <div className={styles.navInner}>
                    <a href="#home" className={styles.logo} aria-label="MistWings Holidays Home">
                        <img src="/logo.jpg" alt="MistWings Holidays" className={styles.logoImage} />
                        <span className={styles.logoText}>MistWings</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className={styles.desktopNav} aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.activeLink : ''}`}
                            >
                                {link.name}
                                {activeSection === link.href.slice(1) && (
                                    <motion.span
                                        className={styles.activeDot}
                                        layoutId="activeNavDot"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}
                        <ThemeToggle />
                        <a
                            href="tel:+916381911347"
                            className={styles.callBtn}
                            aria-label="Call us"
                        >
                            <Phone size={14} />
                            <span>Call</span>
                        </a>
                        <button
                            className={styles.bookBtn}
                            onClick={() => {
                                document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            aria-label="Book a tour"
                        >
                            Book Now
                        </button>
                    </nav>

                    {/* Mobile toggle */}
                    <div className={styles.mobileRight}>
                        <ThemeToggle />
                        <button
                            className={styles.mobileMenuBtn}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileNav}
                        initial={{ opacity: 0, y: -20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.97 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <nav className={styles.mobileNavLinks} aria-label="Mobile navigation">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className={`${styles.mobileNavLink} ${activeSection === link.href.slice(1) ? styles.activeMobileLink : ''}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.button
                                className={styles.bookBtnMobile}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Book Your Trip
                            </motion.button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
