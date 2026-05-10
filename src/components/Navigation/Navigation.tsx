import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Navigation.module.css';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Ooty', href: '#about' },
    { name: 'Packages', href: '#packages' },
    { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className={`container ${styles.navContainer}`}>
                {/* Glass pill wrapper */}
                <div className={styles.navInner}>
                    <a href="#home" className={styles.logo}>
                        <img src="/logo.jpg" alt="MistWings Holidays" className={styles.logoImage} />
                    </a>

                    {/* Desktop Nav */}
                    <nav className={styles.desktopNav}>
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className={styles.navLink}>
                                {link.name}
                            </a>
                        ))}
                        <ThemeToggle />
                        <button
                            className={styles.bookBtn}
                            onClick={() => {
                                document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Book Now
                        </button>
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
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
                        <nav className={styles.mobileNavLinks}>
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className={styles.mobileNavLink}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <ThemeToggle />
                            </motion.div>
                            <motion.button
                                className={styles.bookBtnMobile}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
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
