import React from 'react';
import { Meme } from '../../types/types';

interface MemeListProps {
    memes: Meme[];
    onMemeClick: (meme: Meme) => void;
}

const MemeList: React.FC<MemeListProps> = ({ memes, onMemeClick }) => {

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
          {memes.map((meme) => (
            <div key={meme.id} style={{ margin: '10px', cursor: 'pointer' }} onClick={() => onMemeClick(meme)}>
            
              {meme.images && meme.images.fixed_height && meme.images.fixed_height.url ? (
                <img
                  src={meme.images.fixed_height.url}
                  alt={meme.title}
                  style={{ width: '200px', height: '200px' }}
                />
              ) : (
                <div style={{ width: '200px', height: '200px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p>No image available</p>
                </div>
              )}
            </div>
          ))}
        </div>
      );
};

export default MemeList;
