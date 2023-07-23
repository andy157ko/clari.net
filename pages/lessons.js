document.addEventListener("DOMContentLoaded", function() {
    const audioElement = document.getElementById("player");
    let externalAudioPlaying = false;
  
    audioElement.addEventListener("play", function() {
      externalAudioPlaying = true;
    });
  
    audioElement.addEventListener("pause", function() {
      externalAudioPlaying = false;
    });
  
    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === "visible" && externalAudioPlaying) {
        audioElement.pause();
      }
    });
  });
  