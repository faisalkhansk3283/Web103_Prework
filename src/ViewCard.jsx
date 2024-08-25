import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://esgmegxniyxfpgkrsqgt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZ21lZ3huaXl4ZnBna3JzcWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MTk1MTIsImV4cCI6MjA0MDA5NTUxMn0.QzEgtrdieP4gEknZE385CJAF7lO4IzMnvPhYVyxNriU';

const supabase = createClient(supabaseUrl, supabaseKey);

const ViewCard = ({ id, name, url, description, imageURL, refreshCreators, handleBackToHome }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedUrl, setUpdatedUrl] = useState(url);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedImageURL, setUpdatedImageURL] = useState(imageURL);

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('creators')
      .update({ name: updatedName, url: updatedUrl, description: updatedDescription, imageURL: updatedImageURL })
      .eq('name', updatedName); // Use the ID for updating

    if (error) {
      console.error('Error updating data:', error);
    } else {
      console.log('Data updated successfully:', data);
      setIsEditing(false);
      refreshCreators(); // Refresh the list to show the updated data
      handleBackToHome(); // Navigate back to the home section
      refreshCreators();
    }
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('creators')
      .delete()
      .eq('name', updatedName); // Use the ID for deletion

    if (error) {
      console.error('Error deleting data:', error);
    } else {
      console.log('Data deleted successfully:', data);
      refreshCreators(); // Refresh the list to remove the deleted data
      handleBackToHome(); // Navigate back to the home section
      refreshCreators();
    }
  };

  return (
    <div className="card">
      {isEditing ? (
        <div>
          <h5>Name:</h5>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <h5>URL:</h5>
          <input
            type="text"
            value={updatedUrl}
            onChange={(e) => setUpdatedUrl(e.target.value)}
          />
          <h5>Description:</h5>
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <h5>Image URL:</h5>
          <input
            type="text"
            value={updatedImageURL}
            onChange={(e) => setUpdatedImageURL(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <img src={imageURL} alt={name} />
          <h4>Name: {name}</h4>
          <h4>URL: {url}</h4>
          <h4>Description: {description}</h4>
          <h4>Image URL: <a href={imageURL} target="_blank" rel="noopener noreferrer">{imageURL}</a></h4>
          <button onClick={() => setIsEditing(true)}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ViewCard;
