import './DriverForm.css';
import { useForms } from '../hooks/useForms';
import { FormSchema } from '../schemas/formSchema';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Country {
  alpha3Code: string;
  name: {
    common: string;
  };
}

export default function DriverForm() {
  const { register, handleSubmit, errors } = useForms();
  const [countries, setCountries] = useState<Country[]>([]);
  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [selectedCarType, setSelectedCarType] = useState<string | null>(null);

  const onSubmit = (data: FormSchema) => {
    console.log(data); 
  };

  const handleCarTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCarType(event.target.value);
  };

  useEffect(() => {
    setIsCityDisabled(true);
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response: AxiosResponse<Country[]> = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setIsCityDisabled(selectedCountry === 'select');
    if (selectedCountry === 'select') {
      document.getElementById('city')?.setAttribute('value', 'select');
    }
  };

  return (
    <div className='driver-form'>
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
        <div>
          <select id="country" {...register('country')} onChange={handleCountryChange}>
            <option value="select">Country</option>
            {countries.map((country) => ( 
              <option key={country.alpha3Code} value={country.alpha3Code}>
                {country.name.common}
              </option>
            ))}
          </select>
          {errors.country && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.country.message}</small></div>}
        </div>
        <div>
          <select id="city" {...register('city')} disabled={isCityDisabled}>
            <option value="select">City</option>
            <option value="gara">Garanhuns</option>
            <option value="rec">Recife</option>
          </select>
          {errors.city && <div className='error-container'><img src="https://imageschallenge.s3.amazonaws.com/image+27.svg" alt="" /><small>{errors.city.message}</small></div>}
        </div>
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
  )
}
