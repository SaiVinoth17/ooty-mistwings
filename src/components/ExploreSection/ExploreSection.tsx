'use client';

import React from 'react';
import styles from './ExploreSection.module.css';
import { Map, MapPin } from 'lucide-react';

export function ExploreSection() {
  return (
    <section className={styles.exploreSection} id="explore-satellite">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.badge}>
            <Map size={16} /> Interactive Satellite View
          </span>
          <h2 className={styles.title}>
            Explore the <span className={styles.highlight}>Nilgiris</span> from Above
          </h2>
          <p className={styles.subtitle}>
            Navigate through high-resolution satellite imagery of Ooty, Pykara, Mudumalai, and Coonoor.
            Plan your sightseeing locations visually.
          </p>
        </div>

        <div className={styles.mapContainer}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d125218.42398495033!2d76.70295115!3d11.40641425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1715340625345!5m2!1sen!2sin" 
            width="100%" 
            height="500" 
            style={{ border: 0, borderRadius: '16px', filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ooty Satellite Map"
          ></iframe>
        </div>

        <div className={styles.techBadges}>
          <span className={styles.techBadge}>
            <MapPin size={14} /> High-Resolution Maps
          </span>
          <span className={styles.techBadge}>
            Satellite View
          </span>
          <span className={styles.techBadge}>
            Interactive Pan & Zoom
          </span>
        </div>
      </div>
    </section>
  );
}

