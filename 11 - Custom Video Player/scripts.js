const video = document.querySelector(".player video");
const progressBarFilled = document.querySelector(".progress__filled");
const progressBar = document.querySelector(".progress");
const playBtn = document.querySelector(".player__button");
const volumeSlide = document.querySelector("[name='volume']");
const playbackSlide = document.querySelector("[name='playbackRate']");
const skipBackwardBtn = document.querySelector("[data-skip='-10']");
const skipForwardBtn = document.querySelector("[data-skip='25']");

let isDragging = false;

progressBar.addEventListener("click", handleProgressBarInteraction)
progressBar.addEventListener("mousedown", () => isDragging = true);
progressBar.addEventListener("mouseup", () => isDragging = false);
document.addEventListener("mousemove", (e) => isDragging && handleProgressBarInteraction(e));

video.addEventListener("timeupdate", updateProgressBarFilled);
video.addEventListener("click", togglePlay);
playBtn.addEventListener("click", togglePlay);
volumeSlide.addEventListener("input", changeVolume);
playbackSlide.addEventListener("input", changePlaybackSpeed);
skipBackwardBtn.addEventListener("click", skip);
skipForwardBtn.addEventListener("click", skip);

function updateProgressBarFilled() {
  const progressBarFilledPercent = (video.currentTime / video.duration) * 100;
  progressBarFilled.style.flexBasis = `${progressBarFilledPercent}%`;
}

function handleProgressBarInteraction(e) {
  video.currentTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  updateProgressBarFilled();
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.textContent = "⏸";
  } else {
    video.pause();
    playBtn.textContent = "►";
  }
}

function changeVolume() {
  video.volume = volumeSlide.value;
}

function changePlaybackSpeed() {
  video.playbackRate = playbackSlide.value;
}

function skip(e) {
  const skipValue = parseFloat(e.target.getAttribute("data-skip"));
  video.currentTime = Math.abs(video.currentTime + skipValue);
}
