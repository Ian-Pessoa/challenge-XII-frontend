import './Booking.css';
import React, { useState, useEffect } from 'react';

export default function Booking() {
  const [pickup, setPickup] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [pickupError, setPickupError] = useState<boolean>(false);
  const [destinationError, setDestinationError] = useState<boolean>(false);

  useEffect(() => {
    const getCityFromIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setPickup(`${data.city}, ${data.region}`);
      } catch (error) {
        setPickup('Erro ao obter cidade');
      }
    };

    getCityFromIP();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let valid = true;

    if (!pickup) {
      setPickupError(true);
      valid = false;
    } else {
      setPickupError(false);
    }

    if (!destination) {
      setDestinationError(true);
      valid = false;
    } else {
      setDestinationError(false);
    }

    if (valid) {
      window.location.href = 'http://localhost:5173/ride';
    }
  };

  const handleClear = (field: 'pickup' | 'destination') => {
    if (field === 'pickup') {
      setPickup('');
      setPickupError(false);
    } else {
      setDestination('');
      setDestinationError(false);
    }
  };

  return (
    <section className='booking'>
      <div className='image-container'>
        <img className='hero-image' src="https://imageschallenge.s3.amazonaws.com/Hero+image.png" alt="" />
      </div>
      <div className='booking-form'>
        <p>NEED A RIDE?</p>
        <h1>Book with <span><span className='my-span'>my</span>RIDE</span> now!</h1>
        <div className='booking-fields'>
          <h2>Find a ride now</h2>
          <form onSubmit={handleSubmit}>
            <div className='booking-form-inputs'>
              <div className={`single-input ${pickupError ? 'input-error-booking' : ''}`}>
                <label htmlFor="pickup" className={pickupError ? 'label-error-booking' : ''}>Your Pickup</label>
                <div className='input-container'>
                  <input
                    type="text"
                    id="pickup"
                    name="pickup"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className={pickupError ? 'input-error-booking' : ''}
                  />
                  <span className="clear-icon" onClick={() => handleClear('pickup')}>
                    <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.8334 9.70874L18.6584 8.53374L14.0001 13.1921L9.34175 8.53374L8.16675 9.70874L12.8251 14.3671L8.16675 19.0254L9.34175 20.2004L14.0001 15.5421L18.6584 20.2004L19.8334 19.0254L15.1751 14.3671L19.8334 9.70874Z" fill="white" fillOpacity="0.56" className={pickupError ? 'svg-path-error' : ''} />
                    </svg>
                  </span>
                </div>
              </div>

              <div className={`single-input ${destinationError ? 'input-error-booking' : ''}`}>
                <label htmlFor="destination" className={destinationError ? 'label-error-booking' : ''}>Your Destination</label>
                <div className='input-container'>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={destinationError ? 'input-error-booking' : ''}
                  />
                  <span className="clear-icon" onClick={() => handleClear('destination')}>
                    <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.8334 9.70874L18.6584 8.53374L14.0001 13.1921L9.34175 8.53374L8.16675 9.70874L12.8251 14.3671L8.16675 19.0254L9.34175 20.2004L14.0001 15.5421L18.6584 20.2004L19.8334 19.0254L15.1751 14.3671L19.8334 9.70874Z" fill="white" fillOpacity="0.56" className={destinationError ? 'svg-path-error' : ''} />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <button type="submit">
              <img src="https://imageschallenge.s3.amazonaws.com/%E2%86%B3+%F0%9F%93%8Dicon.svg" alt="Lupa Icon" /> FIND A DRIVER
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
