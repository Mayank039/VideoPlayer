import React from 'react';
import './Video.css';
import PlayVideo from '../../Components/PlayVideo/PlayVideo';
import Recommended from '../../Components/Recommended/Recommended';
import { useParams } from 'react-router-dom';

function Video() {
  // Destructure `videoId` and `categoryId` from the object returned by `useParams`
  const { videoId, categoryId } = useParams();

  return (
    <div className="play-container">
      {/* Pass `videoId` to `PlayVideo` */}
      <PlayVideo videoId={videoId} />
      {/* Optionally pass `categoryId` to `Recommended` if it is needed */}
      <Recommended categoryId={categoryId} />
    </div>
  );
}

export default Video;