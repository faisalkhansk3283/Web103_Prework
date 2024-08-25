import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://esgmegxniyxfpgkrsqgt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZ21lZ3huaXl4ZnBna3JzcWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MTk1MTIsImV4cCI6MjA0MDA5NTUxMn0.QzEgtrdieP4gEknZE385CJAF7lO4IzMnvPhYVyxNriU'

const supabase = createClient(supabaseUrl, supabaseKey);

const Card = ({ refreshCreators }) => {
    // State to hold form input values
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
  
    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Log the current state values for debugging
      console.log({
        name,
        url,
        description,
        imageURL,
      });
  
      const { data, error } = await supabase
        .from('creators')
        .insert([{ name, url, description, imageURL }]);
  
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        // Clear the form by resetting the state
        setName('');
        setUrl('');
        setDescription('');
        setImageURL('');

        refreshCreators();
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button type="submit">Add Creator</button>
      </form>
    );
  };
  
  export default Card;
