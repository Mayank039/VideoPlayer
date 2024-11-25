import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';

function Recommended({ categoryId }) {
  const [apiData, setApiData] = useState([]); // Initialize as an empty array

  const fetchData = async () => {
    try {
      const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const response = await fetch(relatedVideo_url);
      const data = await response.json();
      if (data.items) {
        setApiData(data.items);
      } else {
        console.error('Unexpected API response:', data);
      }
    } catch (error) {
      console.error('Error fetching related videos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.length > 0 ? (
        apiData.map((item, index) => (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img
              src={item.snippet?.thumbnails?.medium?.url || ''}
              alt={item.snippet?.title || 'Thumbnail'}
            />
            <div className="vid-info">
              <h4>{item.snippet?.title || 'Video Title'}</h4>
              <p>{item.snippet?.channelTitle || 'Channel Name'}</p>
              <p>{item.statistics?.viewCount ? `${value_converter(item.statistics.viewCount)} Views` : 'Views Unavailable'}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>Loading recommended videos...</p>
      )}
    </div>
  );
}

export default Recommended;
