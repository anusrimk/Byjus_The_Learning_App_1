import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Video.module.css";

const videos = [
  { id: 1, title: "Video 1", description: "Description for Video 1" },
  { id: 2, title: "Video 2", description: "Description for Video 2" },
  { id: 3, title: "Video 3", description: "Description for Video 3" },
];

const VideoWatching = () => {
  const { videoId } = useParams();
  const video = videos.find((v) => v.id === parseInt(videoId, 10));

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className={styles.watching}>
      <div className={styles.videoPlayer}>
        <div className={styles.videoContent}>🎥 Playing {video.title}</div>
      </div>
      <div className={styles.videoDescription}>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoWatching;
