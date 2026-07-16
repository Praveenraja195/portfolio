import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './EventGallery.css'

// Simplified image paths for 15 college event images
const EVENT_IMAGES = [
  { id: 1, path: "/events/image1.jpg" },
  { id: 2, path: "/events/image2.jpg" },
  { id: 3, path: "/events/image3.jpg" },
  { id: 4, path: "/events/image4.jpg" },
  { id: 5, path: "/events/image5.jpg" },
  { id: 6, path: "/events/image6.jpg" },
  { id: 7, path: "/events/image7.jpg" },
  { id: 8, path: "/events/image8.jpg" },
  { id: 9, path: "/events/image9.jpg" },
  { id: 10, path: "/events/image10.jpg" },
  { id: 11, path: "/events/image11.jpg" },
  { id: 12, path: "/events/image12.jpg" },
  { id: 13, path: "/events/image13.jpg" },
  { id: 14, path: "/events/image14.jpg" },
  { id: 15, path: "/events/image15.jpg" }
]

export default function EventGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [activeLightbox, setActiveLightbox] = useState(null)
  const [failedImages, setFailedImages] = useState({})
  
  const total = EVENT_IMAGES.length

  // Move from left to right automatically (decrementing index)
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }

  // Move from right to left manually (incrementing index)
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }

  // Autoplay functionality: pauses only when lightbox is open
  useEffect(() => {
    if (activeLightbox !== null) return

    const timer = setInterval(() => {
      nextSlide()
    }, 3500) // 3.5 seconds interval for smooth pacing

    return () => clearInterval(timer)
  }, [activeLightbox, total])

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }))
  }

  // Calculate wrapped offset for Cover Flow centering
  const getWrappedOffset = (index, current, totalCount) => {
    let diff = index - current
    while (diff < -totalCount / 2) diff += totalCount
    while (diff > totalCount / 2) diff -= totalCount
    return diff
  }

  return (
    <div className="gallery-section">
      <p className="eyebrow">GALLERY // EVENT PARTICIPATIONS</p>
      <h2 className="section-title">College <span>Gallery</span></h2>
      <p className="gallery-subtitle">
        A visual archive of event participation, hackathons, and symposiums across campuses.
      </p>

      {/* Carousel Container */}
      <div className="carousel-outer-container">
        {/* Nav Buttons */}
        <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous image">
          &lt;
        </button>
        <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next image">
          &gt;
        </button>

        <div className="carousel-track">
          {EVENT_IMAGES.map((event, index) => {
            const offset = getWrappedOffset(index, currentIndex, total)
            const isActive = offset === 0
            const isVisible = Math.abs(offset) <= 2 // Allow wider visibility since we have 10 images

            // Cover flow animation values
            let xPos = "0%"
            let scaleVal = 0.5
            let zIndexVal = 1
            let opacityVal = 0
            let rotY = 0
            let zVal = 0 // 3D Z-axis translation

            if (offset === 0) {
              xPos = "0%"
              scaleVal = 1
              zIndexVal = 10
              opacityVal = 1
              rotY = 0
              zVal = 60 // Bring active card forward
            } else if (offset === 1) {
              xPos = "44%" // Increase spacing to reduce overlap
              scaleVal = 0.8
              zIndexVal = 5
              opacityVal = 0.65
              rotY = -18
              zVal = -60 // Push side card back
            } else if (offset === -1) {
              xPos = "-44%" // Increase spacing to reduce overlap
              scaleVal = 0.8
              zIndexVal = 5
              opacityVal = 0.65
              rotY = 18
              zVal = -60 // Push side card back
            } else if (offset === 2) {
              xPos = "76%" // Shift far cards further away
              scaleVal = 0.6
              zIndexVal = 2
              opacityVal = 0.2
              rotY = -28
              zVal = -120 // Push far card deeper back
            } else if (offset === -2) {
              xPos = "-76%" // Shift far cards further away
              scaleVal = 0.6
              zIndexVal = 2
              opacityVal = 0.2
              rotY = 28
              zVal = -120 // Push far card deeper back
            }

            return (
              <motion.div
                key={event.id}
                className={`gallery-card-wrapper ${isActive ? 'active' : ''}`}
                style={{ zIndex: zIndexVal }}
                animate={{
                  x: xPos,
                  scale: scaleVal,
                  opacity: isVisible ? opacityVal : 0,
                  rotateY: rotY,
                  z: zVal, // Apply 3D depth translation
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                }}
              >
                <div 
                  className="gallery-card"
                  onClick={() => isActive && setActiveLightbox(event)}
                >
                  <div className="card-hud-frame">
                    <span className="hud-corner tl" />
                    <span className="hud-corner tr" />
                    <span className="hud-corner bl" />
                    <span className="hud-corner br" />
                    
                    <div className="card-media-wrap">
                      {!failedImages[event.id] ? (
                        <img 
                          src={event.path} 
                          alt={`College Event Photo ${event.id}`} 
                          className="card-image"
                          onError={() => handleImageError(event.id)}
                        />
                      ) : (
                        <div className="card-image-fallback">
                          <div className="holo-grid-bg" />
                          <div className="fallback-content">
                            <span className="fallback-icon">📸</span>
                            <span className="fallback-status">IMAGE {event.id}</span>
                            <code className="fallback-filename">/events/image{event.id}.jpg</code>
                          </div>
                        </div>
                      )}
                      <div className="card-scanline" />
                      <div className="card-vignette" />
                      {isActive && (
                        <div className="card-click-hint">
                          <span>EXPAND IMAGE</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {EVENT_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            className="gallery-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
          >
            <motion.div
              className="gallery-lightbox-content zoom-only"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="gallery-lightbox-close" 
                onClick={() => setActiveLightbox(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="lightbox-hud-wrap zoom-only">
                <span className="hud-line-top" />
                <span className="hud-label-top">DECRYPTED_MEDIA_VIEW // IMAGE {activeLightbox.id}</span>

                <div className="lightbox-image-panel zoom-only">
                  {!failedImages[activeLightbox.id] ? (
                    <img 
                      src={activeLightbox.path} 
                      alt={`College Event Photo ${activeLightbox.id}`} 
                      className="lightbox-image-full"
                      onError={() => handleImageError(activeLightbox.id)}
                    />
                  ) : (
                    <div className="lightbox-image-fallback">
                      <div className="holo-grid-bg" />
                      <div className="fallback-content">
                        <span className="fallback-large-icon">🖼️</span>
                        <span className="fallback-status">IMAGE {activeLightbox.id} PENDING</span>
                        <code className="fallback-filename">public{activeLightbox.path}</code>
                        <p className="fallback-tip">Place your photo in public/events/ named image{activeLightbox.id}.jpg to display it here.</p>
                      </div>
                    </div>
                  )}
                  <div className="lightbox-scanlines" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
