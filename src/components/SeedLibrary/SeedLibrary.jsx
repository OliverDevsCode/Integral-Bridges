import React, { useState, useEffect } from 'react'
import LibraryCard from '../LibraryCard.jsx/LibraryCard'
import { fetchAllSeeds } from '../../utils/databaseAccess'

import { useNavigate } from 'react-router-dom';


import './SeedLibrary.css'

const SeedLibrary = () => {
  const [seeds, setSeeds] = useState([]);

  const navigate = useNavigate();
  

  useEffect(() => {
    console.log("Gathering Seeds");
    
    const loadSeeds = async () => {
      const seedData = await fetchAllSeeds();
      setSeeds(seedData);
    };

    loadSeeds();
  }, []);

  return (
  <div className='library-container'>
    <h1>Welcome To The Seed Libary 🌱</h1>
    <p>Explore Seeds Found By The Community</p>
    <button id='contribute-button' onClick={() => navigate(`/contribute`)}>Click to Contribute</button>
    <div className='seed-grid'>
      {seeds.map((seed, index) => (
        <LibraryCard 
          key={index}
          seed={seed.seed}
          title={seed.title}
          author={seed.submittedBy}
        />
      ))}
    </div>
  </div>
);
}

export default SeedLibrary;
