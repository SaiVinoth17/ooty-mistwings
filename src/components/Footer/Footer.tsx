'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Compass, ArrowRight, MessageCircle, Heart } from 'lucide-react';
import styles from './Footer.module.css';

const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Tour Packages', href: '#packages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact Us', href: '#contact' },
];

const destinations = [
    { name: 'Ooty Sightseeing', href: '#packages' },
    { name: 'Pykara Escapade', href: '#packages' },
    { name: 'Mudumalai Safari', href: '#packages' },
    { name: 'Coonoor Heritage', href: '#packages' },
    { name: 'Coimbatore Transfer', href: '#packages' },
    { name: 'Mysore Transfer', href: '#packages' },
    { name: 'Custom Tours', href: '#contact' },
];

const socialLinks = [
    { icon: <Instagram size={18} />, href: 'https://www.instagram.com/ooty_mistwings_/', label: 'Instagram', color: '#E1306C' },
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: <Youtube size={18} />, href: '#', label: 'YouTube', color: '#FF0000' },
    { icon: <MessageCircle size={18} />, href: 'https://wa.me/916381911347', label: 'WhatsApp', color: '#25D366' },
];

export const Footer = () => {
    return (
        <footer className={styles.footer} id="contact">
            {/* Top wave decoration */}
            <div className={styles.waveTop} aria-hidden="true">
                <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
                    <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" fill="currentColor" />
                </svg>
            </div>

            <div className={`container ${styles.footerGrid}`}>
                {/* Brand Column */}
                <div className={styles.brandCol}>
                    <a href="#home" className={styles.logo} aria-label="MistWings Holidays">
                        <img src="/logo.jpg" alt="MistWings Holidays" className={styles.logoImage} />
                        <div>
                            <span className={styles.logoName}>MistWings</span>
                            <span className={styles.logoTagline}>Holidays</span>
                        </div>
                    </a>
                    <p className={styles.brandDesc}>
                        Experience the unseen beauty of Ooty. We craft immersive and unforgettable travel
                        experiences through the misty Nilgiris for wanderlust souls.
                    </p>
                    <div className={styles.socialLinks}>
                        {socialLinks.map((s) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIcon}
                                aria-label={s.label}
                                whileHover={{ scale: 1.15, backgroundColor: s.color }}
                                transition={{ duration: 0.2 }}
                            >
                                {s.icon}
                            </motion.a>
                        ))}
                    </div>
                    {/* WhatsApp CTA */}
                    <a
                        href="https://wa.me/916381911347?text=Hi!%20I%20want%20to%20book%20a%20tour%20with%20MistWings%20Holidays."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappCta}
                    >
                        <MessageCircle size={16} />
                        Chat on WhatsApp
                        <ArrowRight size={14} />
                    </a>
                </div>

                {/* Quick Links */}
                <div className={styles.linksCol}>
                    <h3 className={styles.colTitle}>Quick Links</h3>
                    <ul>
                        {quickLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} className={styles.footerLink}>
                                    <ArrowRight size={12} className={styles.linkArrow} />
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Destinations */}
                <div className={styles.linksCol}>
                    <h3 className={styles.colTitle}>
                        <Compass size={16} className={styles.colIcon} />
                        Destinations
                    </h3>
                    <ul>
                        {destinations.map((dest) => (
                            <li key={dest.name}>
                                <a href={dest.href} className={styles.footerLink}>
                                    <ArrowRight size={12} className={styles.linkArrow} />
                                    {dest.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className={styles.contactCol}>
                    <h3 className={styles.colTitle}>Contact Us</h3>
                    <ul className={styles.contactList}>
                        <li>
                            <div className={styles.contactIconBox}><MapPin size={16} /></div>
                            <span>Commercial Road, Charring Cross, Ooty, Tamil Nadu 643001</span>
                        </li>
                        <li>
                            <div className={styles.contactIconBox}><Phone size={16} /></div>
                            <div>
                                <a href="tel:+916381911347" className={styles.contactLink}>+91 63819 11347</a>
                                <a href="tel:+919994228307" className={styles.contactLink}>+91 99942 28307</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles.contactIconBox}><Mail size={16} /></div>
                            <a href="mailto:ootymistwings43@gmail.com" className={styles.contactLink}>
                                ootymistwings43@gmail.com
                            </a>
                        </li>
                        <li>
                            <div className={styles.contactIconBox}><Instagram size={16} /></div>
                            <a href="https://www.instagram.com/ooty_mistwings_/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                @ooty_mistwings_
                            </a>
                        </li>
                    </ul>

                    {/* Map thumbnail */}
                    <div className={styles.mapThumb}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.0!2d76.6950!3d11.4102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8e3a5d32b8b1b%3A0x1!2sCharring+Cross%2C+Ooty!5e0!3m2!1sen!2sin!4v1"
                            width="100%"
                            height="120"
                            style={{ border: 0, borderRadius: '10px', opacity: 0.75 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="MistWings Holidays Location"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className={styles.bottomBar}>
                <div className={`container ${styles.bottomInner}`}>
                    <p>© {new Date().getFullYear()} MistWings Holidays. All rights reserved.</p>
                    <p className={styles.madeWith}>
                        Made with <Heart size={12} className={styles.heartIcon} /> by{' '}
                        <a href="#" className={styles.devLink}>Sai Vinoth</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
