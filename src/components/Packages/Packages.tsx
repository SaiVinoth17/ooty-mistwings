import React, { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Clock, CarFront, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import styles from './Packages.module.css';
import dynamic from 'next/dynamic';

const MapSelector = dynamic(() => import('./MapSelector'), { ssr: false, loading: () => <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div> });

// 3-D stagger variant for package cards
const cardVariants = {
    hidden: (_i: number) => ({
        opacity: 0,
        y: 60,
        rotateX: 14,
        scale: 0.90,
    }),
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: {
            delay: (i % 3) * 0.12,
            duration: 0.70,
            ease: [0.22, 1, 0.36, 1] as any,
        },
    }),
};

const packages = [
    {
        id: 1,
        title: 'Complete Ooty Sightseeing',
        duration: '09:00 AM to 06:00 PM',
        groupSize: 'Up to 4 Persons',
        transport: 'Sedan Cab',
        price: '₹2,000',
        basePrice: 2000,
        image: '/ooty-botanical.png',
        tags: ['Ooty Lake', 'Doddabetta Peak'],
        featured: true,
        description: 'Explore the heart of Ooty with a full day of gardens, peaks, and iconic landmarks.',
        itinerary: [
            'Doddabetta peak',
            'Tea factory and Museum',
            'Ooty lake',
            'Thread garden',
            'Rose garden',
            'Botanical garden',
            'Karnataka garden'
        ]
    },
    {
        id: 2,
        title: 'Pykara Escapade',
        duration: '09:00 AM to 06:00 PM',
        groupSize: 'Up to 4 Persons',
        transport: 'Sedan Cab',
        price: '₹2,500',
        basePrice: 2500,
        image: '/pykara-escapade-ooty.webp',
        alt: 'Pykara Lake boating scenic view in Ooty',
        tags: ['Waterfalls', 'Lake Boating'],
        featured: false,
        description: 'Escape to the pristine beauty of Pykara. Enjoy breathtaking waterfalls, lakes, and forests.',
        itinerary: [
            'Pine tree forest',
            'Kam Raj sagar dam outer view',
            'Ninth miles & Sixth miles',
            'Pykara water fall',
            'Pykara lake',
            'Golf course outer view'
        ]
    },
    {
        id: 3,
        title: 'Mudumalai Trekking',
        duration: '09:00 AM to 06:00 PM',
        groupSize: 'Up to 4 Persons',
        transport: 'Sedan Cab',
        price: '₹3,500',
        basePrice: 3500,
        image: '/mudumalai-standalone.png',
        tags: ['Wildlife', 'Safari'],
        featured: false,
        description: 'Dive deep into the wild heart of Mudumalai. Spot elephants, tigers, and exotic birds in their natural habitat.',
        itinerary: [
            'Mudumalai wildlife sanctuary',
            'Elephant camp',
            'Safari ride',
            'Moyar river view'
        ]
    },
    {
        id: 4,
        title: 'Pykara & Mudumalai',
        duration: '09:00 AM to 06:00 PM',
        groupSize: 'Up to 4 Persons',
        transport: 'Sedan Cab',
        price: '₹3,500',
        basePrice: 3500,
        image: '/pykara-mudumalai-tour.webp',
        alt: 'Mudumalai forest and Pykara sightseeing tour in Ooty',
        tags: ['Pykara', 'Wildlife Sanctuary'],
        featured: true,
        description: 'Combine the serenity of Pykara with the wild thrills of Mudumalai sanctuary.',
        itinerary: [
            'All Pykara Sightseeing places',
            'Mudumalai wildlife sanctuary',
            'Elephant camp'
        ]
    },
    {
        id: 5,
        title: 'Heritage Coonoor Tour',
        duration: '09:00 AM to 06:00 PM',
        groupSize: 'Up to 4 Persons',
        transport: 'Sedan Cab',
        price: '₹2,500',
        basePrice: 2500,
        image: '/ooty-tea-estate.png',
        tags: ['Sims Park', 'Tea Estates'],
        featured: false,
        description: 'Discover the heritage of Coonoor. Walk through lush tea estates and beautiful viewpoints.',
        itinerary: [
            'Ketti valley view',
            'Madras regimental outer view',
            'Sims park',
            '2500 acre of tea estates view',
            'Lambs rock view',
            'Sleeping lady view',
            'Dolphin nose view (Catherine waterfall)'
        ]
    },
    {
        id: 6,
        title: 'Coimbatore Station / Airport Pickup',
        duration: 'Flexible Timing',
        groupSize: 'Up to 4 Persons',
        transport: 'Sedan Cab',
        price: '₹3,500',
        basePrice: 3500,
        image: '/coimbatore-transfer.png',
        tags: ['Railway Station', 'Airport'],
        featured: true,
        isTransfer: true,
        description: 'Comfortable pick-up or drop from Coimbatore Railway Station or Airport to Ooty and back.',
        itinerary: [
            'Pickup from Coimbatore Railway Station / Airport',
            'Scenic drive through Mettupalayam',
            'Hairpin bends of the Nilgiri hills',
            'Drop at Ooty (or reverse)'
        ]
    },
    {
        id: 7,
        title: 'Mysore Railway Pickup',
        duration: 'Flexible Timing',
        groupSize: 'Up to 4 Persons',
        transport: 'Sedan Cab',
        price: '₹4,500',
        basePrice: 4500,
        image: '/mysore-transfer.png',
        tags: ['Mysore', 'Railway Transfer'],
        featured: false,
        isTransfer: true,
        description: 'Seamless pick-up or drop from Mysore Railway Station to Ooty through scenic Bandipur and Mudumalai.',
        itinerary: [
            'Pickup from Mysore Railway Station',
            'Drive through Bandipur National Park',
            'Mudumalai forest route',
            'Drop at Ooty (or reverse)'
        ]
    },
    {
        id: 8,
        title: 'Mettupalayam Pickup',
        duration: 'Flexible Timing',
        groupSize: 'Up to 4 Persons',
        transport: 'Sedan Cab',
        price: '₹2,500',
        basePrice: 2500,
        image: '/about_tea_estate.png',
        tags: ['Mettupalayam', 'Transfer'],
        featured: false,
        isTransfer: true,
        description: 'Convenient pick-up or drop from Mettupalayam to Ooty via the scenic ghat roads.',
        itinerary: [
            'Pickup from Mettupalayam Railway or Bus Station',
            'Scenic drive via Coonoor and Wellington',
            'Drop at your Ooty Hotel (or reverse)'
        ]
    }
];

export const Packages = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const headerY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);

    const [selectedPkg, setSelectedPkg] = React.useState<typeof packages[0] | null>(null);
    const [cabType, setCabType] = React.useState<'Sedan' | 'Innova'>('Sedan');
    const [bookingStep, setBookingStep] = React.useState(1);
    const [bookingDate, setBookingDate] = React.useState('');
    const [guests, setGuests] = React.useState(2);
    const [pickupLocation, setPickupLocation] = React.useState('');

    React.useEffect(() => {
        if (guests > 4 && cabType === 'Sedan') {
            setCabType('Innova');
        }
    }, [guests, cabType]);

    const handleExplore = (pkg: typeof packages[0]) => {
        setSelectedPkg(pkg);
        setCabType('Sedan');
        setBookingStep(1);
        setBookingDate('');
        setGuests(2);
        setPickupLocation('');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedPkg(null);
        document.body.style.overflow = 'auto';
    };

    const getPrice = (base: number) => {
        return cabType === 'Sedan' ? base : base + 1500;
    };

    return (
        <section className={styles.packagesSection} id="packages" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    style={{ y: headerY }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div>
                        <span className={styles.sectionBadge}>
                            <Sparkles size={16} /> Premium Cab Tours
                        </span>
                        <h2 className={styles.title}>Explore with <span className={styles.highlight}>Elegance</span></h2>
                    </div>
                </motion.div>

                <div className={styles.packagesGrid}>
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            layoutId={`card-${pkg.id}`}
                            className={`${styles.packageCard} ${pkg.featured ? styles.featured : ''}`}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <motion.div layoutId={`image-container-${pkg.id}`} className={styles.cardImageWrapper}>
                                <motion.img layoutId={`image-${pkg.id}`} src={pkg.image} alt={(pkg as any).alt || pkg.title} className={styles.cardImage} loading="lazy" />
                                <div className={styles.tags}>
                                    {pkg.tags.map(tag => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </motion.div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta}>
                                    <div className={styles.metaItem}>
                                        <Clock size={16} /> <span>{pkg.duration}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <CarFront size={16} /> <span>{pkg.transport}</span>
                                    </div>
                                </div>

                                <motion.h3 layoutId={`title-${pkg.id}`} className={styles.cardTitle}>{pkg.title}</motion.h3>

                                <div className={styles.cardFooter}>
                                    <div className={styles.price}>
                                        <span className={styles.priceLabel}>Starting from</span>
                                        <span className={styles.priceValue}>{pkg.price}</span>
                                    </div>
                                    <motion.button
                                        layoutId={`btn-${pkg.id}`}
                                        className={styles.bookBtn}
                                        onClick={() => handleExplore(pkg)}
                                    >
                                        Explore
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Immersive Overlay Modal */}
            <AnimatePresence>
                {selectedPkg && (
                    <>
                        <motion.div
                            className={styles.modalBackdrop}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                        />
                        <div className={styles.modalContainer} onClick={closeModal}>
                            <motion.div
                                layoutId={`card-${selectedPkg.id}`}
                                className={styles.modalContent}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className={styles.closeBtn} onClick={closeModal}>✕</button>

                                <div className={styles.modalLayout}>
                                    {/* Left: Image Side */}
                                    <motion.div layoutId={`image-container-${selectedPkg.id}`} className={styles.modalImageSide}>
                                        <motion.img layoutId={`image-${selectedPkg.id}`} src={selectedPkg.image} alt={(selectedPkg as any).alt || selectedPkg.title} className={styles.modalImage} loading="lazy" />
                                        <div className={styles.modalImageOverlay}>
                                            <motion.h3 layoutId={`title-${selectedPkg.id}`}>{selectedPkg.title}</motion.h3>
                                            <p className={styles.modalDesc}>{selectedPkg.description}</p>
                                        </div>
                                    </motion.div>

                                    {/* Right: Interaction Side */}
                                    <div className={styles.modalActionSide}>
                                        <div className={styles.actionHeader}>
                                            <h4>
                                                {bookingStep === 1 && 'Tour Itinerary'}
                                                {bookingStep === 2 && 'Travel Date & Guests'}
                                                {bookingStep === 3 && '📍 Pickup & Drop Location'}
                                                {bookingStep === 4 && 'Select Cab & Book'}
                                            </h4>
                                            <div className={styles.stepIndicators}>
                                                <div className={`${styles.step} ${bookingStep >= 1 ? styles.activeStep : ''}`} />
                                                <div className={`${styles.step} ${bookingStep >= 2 ? styles.activeStep : ''}`} />
                                                {!(selectedPkg as any).isTransfer && <div className={`${styles.step} ${bookingStep >= 3 ? styles.activeStep : ''}`} />}
                                                <div className={`${styles.step} ${bookingStep >= 4 ? styles.activeStep : ''}`} />
                                            </div>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {bookingStep === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 24, rotateY: 6 }}
                                                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                                    exit={{ opacity: 0, x: -24 }}
                                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                    className={styles.stepContent}
                                                >
                                                    <div className={styles.itineraryList}>
                                                        {selectedPkg.itinerary.map((place, idx) => (
                                                            <div key={idx} className={styles.itineraryItem}>
                                                                <div className={styles.itineraryDot}>
                                                                    <MapPin size={16} />
                                                                </div>
                                                                <span>{place}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <motion.button
                                                        layoutId={`btn-${selectedPkg.id}`}
                                                        className={styles.continueBtn}
                                                        onClick={() => setBookingStep(2)}
                                                        style={{ marginTop: 'auto' }}
                                                    >
                                                        Proceed to Dates & Guests
                                                    </motion.button>
                                                </motion.div>
                                            )}

                                            {bookingStep === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 24 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -24 }}
                                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                    className={styles.stepContent}
                                                >
                                                    <div className={styles.inputGroup}>
                                                        <div>
                                                            <label>Travel Date</label>
                                                            <div className={styles.guestHint}>Select your tour date</div>
                                                        </div>
                                                        <div className={styles.datePickerWrapper}>
                                                            <input
                                                                type="date"
                                                                className={styles.dateInput}
                                                                value={bookingDate}
                                                                onChange={(e) => setBookingDate(e.target.value)}
                                                                min={new Date().toISOString().split('T')[0]}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className={styles.inputGroup}>
                                                        <div>
                                                            <label>Number of Guests</label>
                                                            <div className={styles.guestHint}>Including children</div>
                                                        </div>
                                                        <div className={styles.counter}>
                                                            <button className={styles.counterBtn} onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                                                            <span className={styles.counterValue}>{guests}</span>
                                                            <button className={styles.counterBtn} onClick={() => setGuests(Math.min(12, guests + 1))}>+</button>
                                                        </div>
                                                    </div>

                                                    <div className={styles.bookingFooter} style={{ marginTop: 'auto' }}>
                                                        <button className={styles.backBtn} onClick={() => setBookingStep(1)}>Back</button>
                                                        <button
                                                            className={styles.continueBtn}
                                                            onClick={() => { if (bookingDate) setBookingStep((selectedPkg as any).isTransfer ? 4 : 3); }}
                                                            style={{ opacity: bookingDate ? 1 : 0.5, flexGrow: 1 }}
                                                            disabled={!bookingDate}
                                                        >
                                                            {bookingDate ? ((selectedPkg as any).isTransfer ? 'Proceed to Cab Selection' : 'Proceed to Location') : 'Select Date to Continue'}
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {bookingStep === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 24 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -24 }}
                                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                    className={styles.stepContent}
                                                >
                                                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                                        <MapSelector
                                                            onLocationSelect={(loc) => setPickupLocation(loc.address)}
                                                            value={pickupLocation}
                                                            placeholder="Search your hotel, station or landmark..."
                                                        />
                                                    </div>

                                                    <div className={styles.bookingFooter} style={{ marginTop: 'auto' }}>
                                                        <button className={styles.backBtn} onClick={() => setBookingStep(2)}>Back</button>
                                                        <button
                                                            className={styles.continueBtn}
                                                            onClick={() => { if (pickupLocation) setBookingStep(4); }}
                                                            style={{ opacity: pickupLocation ? 1 : 0.5, flexGrow: 1 }}
                                                            disabled={!pickupLocation}
                                                        >
                                                            {pickupLocation ? 'Proceed to Cab Selection' : 'Select Location to Continue'}
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {bookingStep === 4 && (
                                                <motion.div
                                                    key="step4"
                                                    initial={{ opacity: 0, x: 24 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -24 }}
                                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                    className={styles.stepContent}
                                                >
                                                    <div className={styles.cabSelector}>
                                                        <label className={styles.cabOption} style={{ opacity: guests > 4 ? 0.5 : 1 }}>
                                                            <input type="radio" name="cab" checked={cabType === 'Sedan'} onChange={() => setCabType('Sedan')} disabled={guests > 4} />
                                                            <div className={styles.cabDetails}>
                                                                <span className={styles.cabName}>Sedan (Etios/Swift/Nissan Sunny)</span>
                                                                <span className={styles.cabCapacity}>Up to 4 Persons {guests > 4 && '(Unavailable for your group size)'}</span>
                                                            </div>
                                                            <span className={styles.cabPrice}>₹{selectedPkg.basePrice.toLocaleString('en-IN')}</span>
                                                        </label>
                                                        <label className={styles.cabOption}>
                                                            <input type="radio" name="cab" checked={cabType === 'Innova'} onChange={() => setCabType('Innova')} />
                                                            <div className={styles.cabDetails}>
                                                                <span className={styles.cabName}>SUV (Innova/Xylo/Ertiga)</span>
                                                                <span className={styles.cabCapacity}>Up to 7 Persons</span>
                                                            </div>
                                                            <span className={styles.cabPrice}>₹{(selectedPkg.basePrice + 1500).toLocaleString('en-IN')}</span>
                                                        </label>
                                                    </div>

                                                    <div className={styles.summaryCard}>
                                                        <h5 className={styles.summaryTitle}>Booking Summary</h5>
                                                        <div className={styles.priceRow}>
                                                            <span>Selected Cab ({cabType})</span>
                                                            <span>₹{getPrice(selectedPkg.basePrice).toLocaleString('en-IN')}</span>
                                                        </div>
                                                        <div className={styles.priceRow}>
                                                            <span>Guest Add-on ({Math.max(0, guests - 4)} x ₹1,000)</span>
                                                            <span>₹{(Math.max(0, guests - 4) * 1000).toLocaleString('en-IN')}</span>
                                                        </div>
                                                        <div className={styles.priceRow}>
                                                            <span className={styles.personFeeHint}>Travel Date</span>
                                                            <span>{new Date(bookingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                        </div>
                                                        {!(selectedPkg as any).isTransfer && (
                                                            <div className={styles.priceRow}>
                                                                <span className={styles.personFeeHint}>Location</span>
                                                                <span style={{ textAlign: 'right', maxWidth: '60%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={pickupLocation}>{pickupLocation}</span>
                                                            </div>
                                                        )}
                                                        <div className={styles.divider} />
                                                        <div className={`${styles.priceRow} ${styles.totalRow}`}>
                                                            <span>Total Fare</span>
                                                            <span className={styles.totalPrice}>₹{(getPrice(selectedPkg.basePrice) + Math.max(0, guests - 4) * 1000).toLocaleString('en-IN')}</span>
                                                        </div>
                                                    </div>

                                                    <div className={styles.bookingFooter}>
                                                        <button className={styles.backBtn} onClick={() => setBookingStep((selectedPkg as any).isTransfer ? 2 : 3)}>Back</button>
                                                        <button
                                                            className={styles.confirmBookBtn}
                                                            onClick={() => {
                                                                const formattedDate = new Date(bookingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                                                                const finalTotal = getPrice(selectedPkg.basePrice) + (Math.max(0, guests - 4) * 1000);
                                                                const locString = (selectedPkg as any).isTransfer ? 'Standard Route' : pickupLocation;
                                                                const message = encodeURIComponent(`Hi, I want to book the "${selectedPkg.title}" sightseeing tour.\n\n📅 Date: ${formattedDate}\n👥 Guests: ${guests} (+₹${Math.max(0, guests - 4) * 1000})\n📍 Pickup/Drop: ${locString}\n🚗 Cab: ${cabType}\n💵 Total Fare: ₹${finalTotal}.`);
                                                                window.open(`https://wa.me/916381911347?text=${message}`, '_blank');
                                                            }}
                                                        >
                                                            <CheckCircle size={20} />
                                                            Book on WhatsApp
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};
