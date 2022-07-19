import React from "react";
import "./youtubeContainer.css";
function YoutubeContainer({ video }) {
  console.log(video);
  return (
    <>
      {video && (
        <div className="preview_video">
          <iframe
            width="430"
            height="280"
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      )}
    </>
  );
}

export default YoutubeContainer;
