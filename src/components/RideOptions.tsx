import './RideOptions.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

interface RideOption {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}

export default function RideOptions() {
  const [data, setData] = useState<RideOption[]>([]);

  const fetchData = async () => {
    try {
      const response = await Axios.get<RideOption[]>('http://localhost:3000/ride-options'); // Especificando o tipo de dados esperado na resposta
      setData(response.data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='ride-options-container'>
      <div className='ride-options-header-container'>
        <p>Why should you ride with us?</p>
        <h2>Best in class rides</h2>
      </div>
      <ul className='ride-cards-container'>
        {data.map((item) => (
          <li key={item.id}>
            <div className='ride-card'>
              <img src={item.imageUrl} alt={item.title} />
              <div className='card-text'>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className='card-link'>
                <a href={item.link}>LEARN MORE</a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
