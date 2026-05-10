'use client';
import React from 'react';
import styles from './VisitingCard.module.css';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export function VisitingCard() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.cardContainer}>
                    {/* Liquid Background Blobs */}
                    <div className={styles.blob1}></div>
                    <div className={styles.blob2}></div>
                    <div className={styles.blob3}></div>
                    
                    {/* Glass Card */}
                    <div className={styles.glassCard}>
                        <div className={styles.cardHeader}>
                            <img src="/logo.jpg" alt="MistWings" className={styles.logo} />
                            <div>
                                <h3 className={styles.companyName}>MistWings Holidays</h3>
                                <p className={styles.tagline}>Untamed Travels</p>
                            </div>
                        </div>
                        
                        <div className={styles.cardBody}>
                            <div className={styles.contactItem}>
                                <div className={styles.iconBox}><Phone size={18} /></div>
                                <div>
                                    <p>+91 99942 28307</p>
                                    <p>+91 63819 11347</p>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <div className={styles.iconBox}><Mail size={18} /></div>
                                <p>ootytaxiservice43@gmail.com</p>
                            </div>
                            <div className={styles.contactItem}>
                                <div className={styles.iconBox}><Globe size={18} /></div>
                                <p>ootymistwings.com</p>
                            </div>
                            <div className={styles.contactItem}>
                                <div className={styles.iconBox}><MapPin size={18} /></div>
                                <p>1, Commercial Road, Ooty, Tamil Nadu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
