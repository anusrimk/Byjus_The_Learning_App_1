import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Video.module.css";

const videos = [
  { id: 1, title: "Video 1", description: "Description for Video 1" },
  { id: 2, title: "Video 2", description: "Description for Video 2" },
  { id: 3, title: "Video 3", description: "Description for Video 3" },
];

const VideoLanding = () => {
  const navigate = useNavigate();

  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <div className={styles.landing}>
      <h1>Videos</h1>
      <div className={styles.container}>
        {videos.map((video) => (
          <div
            key={video.id}
            className={styles.videoCard}
            onClick={() => handleVideoClick(video.id)}
          >
            <div className={styles.videoThumbnail}>📹</div>
            <div className={styles.videoDetails}>
              <h2>{video.title}</h2>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLanding;
