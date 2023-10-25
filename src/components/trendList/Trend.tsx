import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TrendingGifsProps {
  apiKey: string;
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

interface TrendingGifsResponse {
  data: GifObject[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

const TrendingGifs: React.FC<TrendingGifsProps> = ({ apiKey }) => {
  const [trendingGifs, setTrendingGifs] = useState<GifObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        setLoading(true);
        const response = await axios.get<TrendingGifsResponse>(
          `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=30`
        );
        const data = response.data.data;
        setTrendingGifs(data);
      } catch (error) {
        console.error('Error fetching trending gifs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingGifs();
  }, [apiKey]);

  return (
    <div>
      <h2>Trending Gifs</h2>
      {loading ? (
        <p>Loading trending gifs...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px',gap:'20px'}}>
          {trendingGifs.map((gif) => (
            <div key={gif.id}>
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                style={{ width: '100px', height: '100px' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingGifs;