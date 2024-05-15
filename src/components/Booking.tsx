import './Booking.css';
import React, { useState, useEffect } from 'react';

export default function Booking() {
  const [pickup, setPickup] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

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

    console.log('Dados do formulário:', { pickup, destination });
  };

  const handleClear = (field: 'pickup' | 'destination') => {
    if (field === 'pickup') {
      setPickup('');
    } else {
      setDestination('');
    }
  };

  return (
    <section className='booking'>
      <div>
        <img src="https://imageschallenge.s3.amazonaws.com/Hero+image.png" alt="" />
      </div>
      <div className='booking-form'>
        <p>NEED A RIDE?</p>
        <h1>Book with <span><span className='my-span'>my</span>RIDE</span> now!</h1>
        <div className='booking-fields'>
          <h2>Find a ride now</h2>
          <form onSubmit={handleSubmit}>
            <div className='booking-form-inputs'>
              <div className='single-input'>
                <label htmlFor="pickup">Your Pickup</label>
                <div className='input-container'>
                  <input
                    type="text"
                    id="pickup"
                    name="pickup"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                  <span className="clear-icon" onClick={() => handleClear('pickup')}>
                    <img src="https://imageschallenge.s3.amazonaws.com/Icon+Button.svg" alt="" className='clear-icon' />
                  </span>
                </div>
              </div>

              <div className='single-input'>
                <label htmlFor="destination">Your Destination</label>
                <div className='input-container'>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  {destination && (
                    <span className="clear-icon" onClick={() => handleClear('destination')}>
                      <img src="https://imageschallenge.s3.amazonaws.com/Icon+Button.svg" alt="" className='clear-icon' />
                    </span>
                  )}
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
