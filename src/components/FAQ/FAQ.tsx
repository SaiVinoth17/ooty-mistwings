'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, Minus, MessageCircle, Sparkles } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'What is the best time to visit Ooty?',
    answer:
      'October to March is ideal for a comfortable and scenic visit to Ooty. Summer (April–June) is also very pleasant with mild temperatures perfect for sightseeing. The Monsoon season (July–September) transforms Ooty into a lush green paradise — great for nature lovers, though some roads may be wet.',
  },
  {
    id: 2,
    question: 'What does the package price include?',
    answer:
      'All our packages include visits to every mentioned sightseeing spot, a comfortable cab service with an experienced local driver, and a knowledgeable local guide. Entry tickets to attractions, personal expenses, meals, and accommodation are not included in the base price.',
  },
  {
    id: 3,
    question: 'How do I book a tour?',
    answer:
      'Booking is a simple 3-step process: Click "Book Now" on your chosen package, select your preferred date and number of guests, then confirm the booking on WhatsApp. Our team will respond within minutes to finalize your itinerary.',
  },
  {
    id: 4,
    question: 'Can I customize my tour itinerary?',
    answer:
      'Absolutely! We specialize in personalized, tailor-made tours. Whether you want to add extra stops, change timings, or combine multiple packages into one epic journey — just reach out to us on WhatsApp to discuss your specific requirements and we will craft a perfect plan for you.',
  },
  {
    id: 5,
    question: 'What type of vehicles do you use?',
    answer:
      'We use well-maintained, air-conditioned Sedan cabs (Toyota Etios / Swift Dzire / Nissan Sunny) for groups of up to 4 guests, and spacious SUV/Innova cabs (Toyota Innova / Xylo / Ertiga) for groups of up to 7 guests. All vehicles are regularly serviced and driven by experienced, courteous drivers.',
  },
  {
    id: 6,
    question: 'Is Ooty safe for solo female travelers?',
    answer:
      'Yes! Ooty is widely regarded as one of Tamil Nadu\'s safest hill stations. Our team provides 24/7 WhatsApp support throughout your trip. All our drivers are background-verified and professional. We\'ve had many solo female travelers explore Ooty with us and they\'ve always felt completely safe and well-cared for.',
  },
  {
    id: 7,
    question: 'What is your cancellation policy?',
    answer:
      'We offer free cancellation up to 48 hours before your scheduled tour with a full refund. For cancellations made within 48 hours of the tour, a 50% refund is provided. In case of natural calamities or government-imposed travel restrictions, we offer full credit for rescheduling.',
  },
  {
    id: 8,
    question: 'Do you provide airport or railway station pickup?',
    answer:
      "Yes! We offer convenient pickup and drop services from Coimbatore International Airport, Coimbatore Railway Station, Mettupalayam Railway/Bus Station, and Mysore Railway Station. Just let us know your arrival details while booking and we'll be there on time.",
  },
  {
    id: 9,
    question: 'Can I pay at the time of travel?',
    answer:
      'Yes, we accept cash payments at the time of travel for your convenience. Online payment options (UPI, bank transfer) are also available on request. A small advance may be required for peak-season bookings to confirm your reservation.',
  },
  {
    id: 10,
    question: 'How far is Ooty from Coimbatore?',
    answer:
      'Ooty is approximately 90 km from Coimbatore via the Mettupalayam–Coonoor route. The journey takes about 3–4 hours by road, winding through the stunning ghat roads of the Nilgiri Hills with breathtaking hairpin bends and misty forest views — a memorable experience in itself!',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

interface AccordionItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ faq, isOpen, onToggle, index }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        className={styles.faqQuestion}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-question-${faq.id}`}
      >
        <span className={styles.questionText}>{faq.question}</span>
        <motion.span
          className={styles.iconWrapper}
          animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? 'var(--primary)' : 'transparent' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="minus"
                initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                <Minus size={16} color="#fff" />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={16} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-question-${faq.id}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}
            style={{ overflow: 'hidden' }}
          >
            <div ref={contentRef} className={styles.faqAnswer}>
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const firstColumn = faqs.slice(0, 5);
  const secondColumn = faqs.slice(5, 10);

  const whatsappUrl = 'https://wa.me/916381911347?text=Hi!%20I%20have%20a%20question%20about%20your%20Ooty%20tours.';

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={styles.faqSection} id="faq">
        {/* Ambient decorative blobs */}
        <div className={styles.blobLeft} aria-hidden="true" />
        <div className={styles.blobRight} aria-hidden="true" />

        <div className="container">
          {/* Section Header */}
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.badge}>
              <HelpCircle size={15} />
              FAQ
            </span>
            <h2 className={styles.sectionTitle}>
              Everything You Need{' '}
              <span className="gradient-text">to Know</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Got questions about visiting Ooty? We've answered the most common ones below.
              Can't find what you're looking for? Chat with us on WhatsApp — we respond fast!
            </p>
          </motion.div>

          {/* Two-Column Accordion Grid */}
          <div className={styles.faqGrid}>
            {/* Column 1 */}
            <div className={styles.faqColumn}>
              {firstColumn.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                  index={index}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className={styles.faqColumn}>
              {secondColumn.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.ctaCard}>
              <div className={styles.ctaIcon}>
                <Sparkles size={24} />
              </div>
              <div className={styles.ctaText}>
                <h3>Still have questions?</h3>
                <p>Our travel experts are ready to help you plan the perfect Ooty getaway.</p>
              </div>
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <MessageCircle size={20} />
                Have more questions? Chat with us!
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
