"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import styles from "./FloatingActions.module.css";

const WHATSAPP_URL = "https://wa.me/916381911347";
const SCROLL_THRESHOLD = 400;

/* ─────────────────────────────────────────────
   WhatsApp SVG Icon (official brand mark)
───────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      width="26"
      height="26"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [whatsappHovered, setWhatsappHovered] = useState(false);
  const [scrollTopHovered, setScrollTopHovered] = useState(false);

  /* Track scroll position */
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Smooth scroll to top */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* Open WhatsApp */
  const openWhatsApp = useCallback(() => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className={styles.container} role="complementary" aria-label="Quick actions">
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            key="scroll-top"
            className={styles.scrollTopWrap}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {scrollTopHovered && (
                <motion.span
                  className={styles.tooltip}
                  role="tooltip"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  Back to top
                </motion.span>
              )}
            </AnimatePresence>

            <button
              className={styles.scrollTopBtn}
              onClick={scrollToTop}
              onMouseEnter={() => setScrollTopHovered(true)}
              onMouseLeave={() => setScrollTopHovered(false)}
              aria-label="Scroll back to top"
            >
              <ChevronUp size={24} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.div
        className={styles.whatsappWrap}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {whatsappHovered && (
            <motion.span
              className={styles.tooltip}
              role="tooltip"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
            >
              Chat on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse rings */}
        <span className={styles.pulseRing} aria-hidden="true" />
        <span className={`${styles.pulseRing} ${styles.pulseRingDelay}`} aria-hidden="true" />

        <button
          className={styles.whatsappBtn}
          onClick={openWhatsApp}
          onMouseEnter={() => setWhatsappHovered(true)}
          onMouseLeave={() => setWhatsappHovered(false)}
          aria-label="Chat with us on WhatsApp"
        >
          <WhatsAppIcon />
        </button>
      </motion.div>
    </div>
  );
}
