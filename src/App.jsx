import React, { useState, useEffect } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import Card from './Card';
import ViewCard from './ViewCard';
import SingleCard from './SingleCard';

const supabaseUrl = 'https://esgmegxniyxfpgkrsqgt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZ21lZ3huaXl4ZnBna3JzcWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MTk1MTIsImV4cCI6MjA0MDA5NTUxMn0.QzEgtrdieP4gEknZE385CJAF7lO4IzMnvPhYVyxNriU';

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [section, setSection] = useState('view');
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from('creators').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setCreators(data);
      }
    };

    fetchCreators();
  }, []);

  const refreshCreators = async () => {
    const { data, error } = await supabase.from('creators').select('*');
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setCreators(data);
    }
  };


  const handleBackToHome = () => {
    setSection('home');
    setSelectedCreator(null);
  };

  return (
    <div className="App">
      <header>
        <h1>Creatorverse</h1>
        <div className="sidebar">
          <button onClick={() => setSection('view')}>View All Creators</button>
          <button onClick={() => setSection('add')}>Add a creator</button>
        </div>
      </header>
      <main>
        {section === 'view' && (
          <div className="cards-container">
            {creators.map((creator) => (
              <div
                key={creator.id}
                onClick={() => {
                  setSelectedCreator(creator);
                  setSection('detail');
                }}
              >
                <SingleCard
                  key={creator.id}
                  id={creator.id}
                  name={creator.name}
                  url={creator.url}
                  description={creator.description}
                  imageURL={creator.imageURL}
                  refreshCreators={refreshCreators}
                />
              </div>
            ))}
          </div>
        )}

        {section === 'add' && <Card refreshCreators={refreshCreators} />}

        {section === 'detail' && selectedCreator && (
          <ViewCard
            id={selectedCreator.id}
            name={selectedCreator.name}
            url={selectedCreator.url}
            description={selectedCreator.description}
            imageURL={selectedCreator.imageURL}
            handleBackToHome={handleBackToHome}
            refreshCreators={refreshCreators}
          />
          
        )}
      </main>
    </div>
  );
}

export default App;
