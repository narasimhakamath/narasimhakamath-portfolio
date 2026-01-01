import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Photography.css';

function Photography() {
  const [streetPhotography, setStreetPhotography] = useState([]);
  const [conceptPhotography, setConceptPhotography] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Get Cloudinary configuration from environment variables
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  // Carousel settings with center mode
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '20%',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '15%',
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '10%',
        }
      }
    ]
  };

  useEffect(() => {
    const fetchImages = async () => {
      let streetData = { resources: [] };
      let conceptData = { resources: [] };

      try {
        // Fetch Street Photography images (tagged with 'street' or in 'street' folder)
        try {
          const streetResponse = await fetch(
            `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/street.json`
          );
          if (streetResponse.ok) {
            const streetText = await streetResponse.text();
            if (streetText.trim()) {
              streetData = JSON.parse(streetText);
            }
          }
        } catch (err) {
          console.warn('Street photography fetch failed:', err.message);
        }
        
        // Fetch Concept Photography images (tagged with 'concept' or in 'concept' folder)
        try {
          const conceptResponse = await fetch(
            `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/concept.json`
          );
          if (conceptResponse.ok) {
            const conceptText = await conceptResponse.text();
            if (conceptText.trim()) {
              conceptData = JSON.parse(conceptText);
            }
          }
        } catch (err) {
          console.warn('Concept photography fetch failed:', err.message);
        }

        // Transform the data to match our component structure
        const streetPhotos = streetData.resources?.map((img, index) => ({
          id: index + 1,
          // Optimized for display: larger center image with better quality
          url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_900,h_506,q_auto:good,f_auto/${img.public_id}.${img.format}`,
          // Full size for lightbox
          fullUrl: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:good,f_auto/${img.public_id}.${img.format}`,
          alt: img.context?.custom?.alt || `Street Photography ${index + 1}`,
          title: img.context?.custom?.caption || `Street Photo ${index + 1}`
        })) || [];

        const conceptPhotos = conceptData.resources?.map((img, index) => ({
          id: index + 1,
          // Optimized for display: larger center image with better quality
          url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_600,h_600,q_auto:good,f_auto/${img.public_id}.${img.format}`,
          // Full size for lightbox
          fullUrl: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:good,f_auto/${img.public_id}.${img.format}`,
          alt: img.context?.custom?.alt || `Concept Photography ${index + 1}`,
          title: img.context?.custom?.caption || `Concept Photo ${index + 1}`
        })) || [];

        setStreetPhotography(streetPhotos);
        setConceptPhotography(conceptPhotos);
      } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
        // Set empty arrays if fetch fails
        setStreetPhotography([]);
        setConceptPhotography([]);
      } finally {
        setLoading(false);
      }
    };

    if (CLOUDINARY_CLOUD_NAME) {
      fetchImages();
    } else {
      console.warn('Cloudinary cloud name not configured');
      setLoading(false);
    }
  }, [CLOUDINARY_CLOUD_NAME]);

  const openLightbox = (photo) => {
    setCurrentImage(photo);
    setLightboxOpen(true);
    setImageLoading(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <section className="photography" id="photography">
      <div className="photography-container">
        <h2 className="section-title">Photography</h2>
        <p className="section-subtitle">I see things you might miss</p>

        {loading ? (
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {/* Street Photography Section */}
            {streetPhotography.length > 0 && (
              <div className="photography-category">
                {/* <h4 className="category-title">Street Photography</h3> */}
                <p className="category-description">
                  Documenting everyday life
                </p>
                <div className="carousel-wrapper">
                  <Slider {...settings}>
                    {streetPhotography.map((photo) => (
                      <div key={photo.id} className="photo-slide">
                        <div className="photo-card photo-card-street" onClick={() => openLightbox(photo)}>
                          <img src={photo.url} alt={photo.alt} loading="lazy" />
                          <div className="photo-overlay">
                            <h4>{photo.title}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )}

            {/* Concept Photography Section */}
            {conceptPhotography.length > 0 && (
              <div className="photography-category">
                {/* <h3 className="category-title">Concept Photography</h3> */}
                <p className="category-description">
                  Exploring creative ideas and artistic expressions through imagery
                </p>
                <div className="carousel-wrapper">
                  <Slider {...settings}>
                    {conceptPhotography.map((photo) => (
                      <div key={photo.id} className="photo-slide">
                        <div className="photo-card photo-card-concept" onClick={() => openLightbox(photo)}>
                          <img src={photo.url} alt={photo.alt} loading="lazy" />
                          <div className="photo-overlay">
                            <h4>{photo.title}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )}

            {streetPhotography.length === 0 && conceptPhotography.length === 0 && (
              <div className="no-images">
                <p>No photography available at the moment. Check back soon!</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {imageLoading && (
              <div className="lightbox-loader">
                <div className="spinner"></div>
              </div>
            )}
            <img 
              src={currentImage.fullUrl} 
              alt={currentImage.alt}
              onLoad={handleImageLoad}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
            {!imageLoading && currentImage.title && (
              <p className="lightbox-caption">{currentImage.title}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Photography;
