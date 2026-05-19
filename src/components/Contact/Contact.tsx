'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  PhoneCall,
  Send,
  CheckCircle2,
  Sparkles,
  Users,
  CalendarDays,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';
import styles from './Contact.module.css';

interface FormState {
  name: string;
  phone: string;
  email: string;
  destination: string;
  date: string;
  guests: string;
  requirements: string;
}

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  destination: 'Ooty Sightseeing',
  date: '',
  guests: '2',
  requirements: '',
};

const contactCards = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 63819 11347 / +91 99942 28307',
    href: 'tel:+916381911347',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'ootymistwings43@gmail.com',
    href: 'mailto:ootymistwings43@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Commercial Road, Charring Cross, Ooty, Tamil Nadu 643001',
    href: 'https://maps.google.com/?q=Commercial+Road+Charring+Cross+Ooty',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@ooty_mistwings_',
    href: 'https://www.instagram.com/ooty_mistwings_/',
  },
];

const destinations = [
  'Ooty Sightseeing',
  'Pykara Tour',
  'Mudumalai Safari',
  'Coonoor Tour',
  'Custom Package',
];

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const req = form.requirements.trim() || 'None';
    const message =
      `Hi! I want to book a tour.%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Destination: ${encodeURIComponent(form.destination)}%0A` +
      `Date: ${encodeURIComponent(form.date || 'Flexible')}%0A` +
      `Guests: ${encodeURIComponent(form.guests)}%0A` +
      `Requirements: ${encodeURIComponent(req)}`;

    window.open(`https://wa.me/916381911347?text=${message}`, '_blank');
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className={styles.contactSection} id="contact-form">
      {/* Ambient blobs */}
      <div className={styles.blobTopRight} aria-hidden="true" />
      <div className={styles.blobBottomLeft} aria-hidden="true" />

      <div className="container">
        <div className={styles.contactGrid}>
          {/* ── LEFT COLUMN ── */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.badge}>
              <Sparkles size={15} />
              Get In Touch
            </span>

            <h2 className={styles.leftTitle}>
              Plan Your Dream{' '}
              <span className="gradient-text">Ooty Trip</span>
            </h2>

            <p className={styles.leftSubtitle}>
              Ready to experience the magic of the Nilgiris? Fill in your details and we'll craft
              the perfect journey tailored just for you. Our team responds within minutes on
              WhatsApp — fast, friendly, and personal.
            </p>

            {/* Contact Cards */}
            <div className={styles.contactCards}>
              {contactCards.map((card, index) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={styles.contactCard}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4 }}
                >
                  <div className={styles.cardIconWrap}>
                    <card.icon size={20} />
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardLabel}>{card.label}</span>
                    <span className={styles.cardValue}>{card.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <motion.a
                href="https://wa.me/916381911347"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnWhatsApp}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </motion.a>
              <motion.a
                href="tel:+916381911347"
                className={styles.btnCall}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <PhoneCall size={20} />
                Call Now
              </motion.a>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN (Form) ── */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`glass-md glass-sheen ${styles.formCard}`}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── SUCCESS STATE ── */
                  <motion.div
                    key="success"
                    className={styles.successState}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className={styles.successIcon}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
                    >
                      <CheckCircle2 size={56} />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      Message Sent! 🎉
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      We've opened WhatsApp with your enquiry pre-filled. Our team will confirm
                      your booking shortly. Get ready for an unforgettable Ooty experience!
                    </motion.p>
                    <motion.button
                      className={styles.resetBtn}
                      onClick={handleReset}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Submit Another Enquiry
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ── FORM ── */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.formHeader}>
                      <h3 className={styles.formTitle}>Book Your Tour</h3>
                      <p className={styles.formSubtitle}>Fill in your details and we'll confirm on WhatsApp</p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} noValidate className={styles.form}>
                      {/* Full Name */}
                      <div className={`${styles.fieldGroup} ${errors.name ? styles.hasError : ''}`}>
                        <label className={styles.label} htmlFor="name">
                          Full Name <span className={styles.required}>*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className={styles.input}
                          placeholder="e.g. Ravi Kumar"
                          value={form.name}
                          onChange={handleChange}
                          autoComplete="name"
                        />
                        {errors.name && (
                          <motion.span
                            className={styles.errorMsg}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <AlertCircle size={13} /> {errors.name}
                          </motion.span>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className={`${styles.fieldGroup} ${errors.phone ? styles.hasError : ''}`}>
                        <label className={styles.label} htmlFor="phone">
                          Phone Number <span className={styles.required}>*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className={styles.input}
                          placeholder="e.g. 9876543210"
                          value={form.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                          maxLength={10}
                        />
                        {errors.phone && (
                          <motion.span
                            className={styles.errorMsg}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <AlertCircle size={13} /> {errors.phone}
                          </motion.span>
                        )}
                      </div>

                      {/* Email (optional) */}
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="email">
                          Email <span className={styles.optional}>(optional)</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className={styles.input}
                          placeholder="e.g. ravi@email.com"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                      </div>

                      {/* Two-col row: Destination + Date */}
                      <div className={styles.twoCol}>
                        {/* Destination */}
                        <div className={styles.fieldGroup}>
                          <label className={styles.label} htmlFor="destination">
                            Destination
                          </label>
                          <div className={styles.selectWrapper}>
                            <select
                              id="destination"
                              name="destination"
                              className={styles.select}
                              value={form.destination}
                              onChange={handleChange}
                            >
                              {destinations.map((d) => (
                                <option key={d} value={d}>
                                  {d}
                                </option>
                              ))}
                            </select>
                            <ChevronDown size={16} className={styles.selectChevron} />
                          </div>
                        </div>

                        {/* Travel Date */}
                        <div className={styles.fieldGroup}>
                          <label className={styles.label} htmlFor="date">
                            <CalendarDays size={13} style={{ display: 'inline', marginRight: 4 }} />
                            Travel Date
                          </label>
                          <input
                            id="date"
                            name="date"
                            type="date"
                            className={styles.input}
                            value={form.date}
                            onChange={handleChange}
                            min={today}
                          />
                        </div>
                      </div>

                      {/* Number of Guests */}
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="guests">
                          <Users size={13} style={{ display: 'inline', marginRight: 4 }} />
                          Number of Guests
                        </label>
                        <input
                          id="guests"
                          name="guests"
                          type="number"
                          className={styles.input}
                          min={1}
                          max={12}
                          value={form.guests}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Special Requirements */}
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="requirements">
                          Special Requirements
                          <span className={styles.optional}>(optional)</span>
                        </label>
                        <textarea
                          id="requirements"
                          name="requirements"
                          className={styles.textarea}
                          placeholder="e.g. Wheelchair accessibility, vegetarian meals, specific spots to visit..."
                          value={form.requirements}
                          onChange={handleChange}
                          rows={3}
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        className={styles.submitBtn}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <Send size={18} />
                        Send via WhatsApp
                      </motion.button>

                      <p className={styles.formNote}>
                        🔒 Your information is private and only shared with MistWings Holidays.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
