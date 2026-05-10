import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Compass } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer} id="contact">
            <div className={`container ${styles.footerGrid}`}>
                <div className={styles.brandCol}>
                    <a href="#home" className={styles.logo}>
                        <img src="/logo.jpg" alt="MistWings Holidays" className={styles.logoImage} />
                    </a>
                    <p className={styles.brandDesc}>
                        Experience the unseen beauty of Ooty. We craft immersive and unforgettable travel experiences for the wanderlust souls.
                    </p>
                    <div className={styles.socialLinks}>
                        <a href="https://www.instagram.com/ooty_mistwings_/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" className={styles.socialIcon} aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" className={styles.socialIcon} aria-label="Twitter"><Twitter size={20} /></a>
                    </div>
                </div>

                <div className={styles.linksCol}>
                    <h4 className={styles.colTitle}>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#packages">Tour Packages</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                    </ul>
                </div>

                <div className={styles.contactCol}>
                    <h4 className={styles.colTitle}>Contact Us</h4>
                    <ul className={styles.contactList}>
                        <li>
                            <MapPin size={18} className={styles.contactIcon} />
                            <span>1, Commercial Road, Ooty, Tamil Nadu 643001</span>
                        </li>
                        <li>
                            <Phone size={18} className={styles.contactIcon} />
                            <span>+91 63819 11347</span>
                            <span>+91 99942 28307</span>
                        </li>
                        <li>
                            <Mail size={18} className={styles.contactIcon} />
                            <span>ootytaxiservice43@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} MistWings Holidays. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
