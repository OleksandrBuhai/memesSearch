import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SearchSuggestionsProps {
  apiKey: string;
  term: string;
}

interface GifObject {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

interface SearchSuggestionsResponse {
  data: GifObject[];
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ apiKey, term }) => {
  const [suggestions, setSuggestions] = useState<GifObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get<SearchSuggestionsResponse>(
          `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(term)}&api_key=${apiKey}`
        );
        const data = response.data.data;
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [apiKey, term]);

  return (
    <div>
      <h2>Search Suggestions</h2>
      {loading ? (
        <p>Loading suggestions...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px',gap:'20px'}}>
          {suggestions.map((suggestion) => (
            <div key={suggestion.id}>
              <img src={suggestion.images.fixed_height.url} alt={suggestion.title} style={{ width: '100px', height: '100px' }} />
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
