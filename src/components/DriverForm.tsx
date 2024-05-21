import './DriverForm.css';
import { useForms } from '../hooks/useForms';
import { FormSchema } from '../schemas/formSchema';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Spinner from './Spinner';
import Success from './Success';

interface Country {
  alpha3Code: string;
  name: string;
}

interface City {
  name: string;
}

export default function DriverForm() {
  const { register, handleSubmit, errors } = useForms();
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [selectedCarType, setSelectedCarType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const onSubmit = async (data: FormSchema) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/drivers', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCarTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCarType(event.target.value);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response: AxiosResponse<string[]> = await axios.get('http://localhost:3000/countries');
      const countriesData = response.data.map(country => ({
        alpha3Code: country,
        name: country
      }));
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchCities = async (country: string) => {
    try {
      setLoading(true);
      const response: AxiosResponse<string[]> = await axios.get(`http://localhost:3000/countries/${country}/cities`);
      const citiesData = response.data.map(city => ({ name: city }));
      setCities(citiesData);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setIsCityDisabled(selectedCountry === 'select');
    if (selectedCountry !== 'select') {
      fetchCities(selectedCountry);
    } else {
      setCities([]);
    }
  };

  if (isSubmitted) {
    return <Success />;
  }

  return (
    <div className='driver-form'>
      {loading && <div className='loading-overlay'><Spinner /></div>}
      <div className='driver-form-header'>
        <img src="https://imageschallenge.s3.amazonaws.com/Popup+image.png" alt="" />
        <div className='form-titles'>
          <h3>Drive with MyRide</h3>
          <p>Register as a driver using the form below. Our team will assess and get back to you within 48 hours.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='inputs-row'>
          <div className='input-name input-name-left'>
            <input 
              type="text" 
              id='firstName' 
              placeholder='First Name'
              {...register("firstName")} 
            />
            {errors.firstName && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.firstName.message}</small></div>}
          </div>
          <div className='input-name input-name-right' >
            <input 
              type="text" 
              id='lastName' 
              placeholder='Last Name' 
              {...register("lastName")} 
            />
            {errors.lastName && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.lastName.message}</small></div>}
          </div>
        </div>
        <div>
          <input 
            type="text" 
            id='email' 
            placeholder='Email Address' 
            {...register("email")} 
          />
          {errors.email && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.email.message}</small></div>}
        </div>
        <div className='select-container'>
          <select id="country" {...register('country')} onChange={handleCountryChange}>
            <option value="select">Country</option>
            {countries.map((country) => (
              <option key={country.alpha3Code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <img src="https://imageschallenge.s3.amazonaws.com/Arrow.svg" alt="" />
        </div>
        {errors.country && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.country.message}</small></div>}
        <div className='select-container'>
          <select id="city" {...register('city')} disabled={isCityDisabled}>
            <option value="select">City</option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <img src="https://imageschallenge.s3.amazonaws.com/Arrow.svg" alt="" />
        </div>
        {errors.city && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.city.message}</small></div>}
        <div>
          <input 
            type="text" 
            id='referralCode' 
            placeholder='Referral Code' 
            {...register("referralCode")} 
          />
          {errors.referralCode && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.referralCode.message}</small></div>}
        </div>
        <div className='switch-container'>
          <p>I drive my own car</p>
          <label className='switch'>
            <input 
              type="checkbox" 
              id='ownCar' 
              {...register("ownCar")} 
            />
            <span className='slider' />
          </label>
          {errors.ownCar && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.ownCar.message}</small></div>}
        </div>
        <div>
          <h3 className='car-type-title'>Select your car type</h3>
          <div className='options-row'>
            <div className={`input-div ${selectedCarType === 'Sedan' ? 'active-car-type' : ''}`}>
              <input 
                type="radio" 
                id='sedan' 
                value='Sedan'
                {...register("carType")} 
                onChange={handleCarTypeChange}
              />
              <div className='car-type'>
                <div>
                  <img src="https://imageschallenge.s3.amazonaws.com/Card+Image.svg" alt="" />
                </div>
                <label htmlFor="sedan">Sedan</label>
              </div>
            </div>
            <div className={`input-div ${selectedCarType === 'SUV/Van' ? 'active-car-type' : ''}`}>
              <input 
                type="radio" 
                id='suv' 
                value='SUV/Van'
                {...register("carType")} 
                onChange={handleCarTypeChange}
              />
              <div className='car-type'>
                <div>
                  <img src="https://imageschallenge.s3.amazonaws.com/Card+Image+(1).svg" alt="" />
                </div>
                <label htmlFor="suv">SUV/Van</label>
              </div>
            </div>
            <div className={`input-div ${selectedCarType === 'Semi Luxury' ? 'active-car-type' : ''}`}>
              <input 
                type="radio" 
                id='semiLuxury' 
                value='Semi Luxury'
                {...register("carType")} 
                onChange={handleCarTypeChange}
              />
              <div className='car-type'>
                <div>
                  <img src="https://imageschallenge.s3.amazonaws.com/Card+Image+(2).svg" alt="" />
                </div>
                <label htmlFor="semiLuxury">Semi Luxury</label>
              </div>
            </div>
            <div className={`input-div ${selectedCarType === 'Luxury Car' ? 'active-car-type' : ''}`}>
              <input 
                type="radio" 
                id='luxury' 
                value='Luxury Car'
                {...register("carType")} 
                onChange={handleCarTypeChange}
              />
              <div className='car-type'>
                <div>
                  <img src="https://imageschallenge.s3.amazonaws.com/Card+Image+(3).svg" alt="" />
                </div>
                <label htmlFor="luxury">Luxury Car</label>
              </div>
            </div>
          </div>
          {errors.carType && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.carType.message}</small></div>}
        </div>
        <button className='submit-driver-form-button' type='submit'>SUBMIT</button>
      </form>
    </div>
  );
}
