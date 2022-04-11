// 获取元素
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
// 声明函数
// 用于控制播放器的开始与停止，通过互斥实现
function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
// 用于更新按钮图标
function updateButton() {
  const icon = this.paused ? '►' : '■';
  toggle.textContent = icon;
}
// 用于处理skip按钮
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
//用于处理拖动条
function handleRangeUpdate() {
  video[this.name] = this.value;
}
// 处理进度条
function handleProgress() {//更新flex-basis
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
// 添加事件监听器
// 点击事件用于改变播放器的状态
video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);
// 更改按钮图标
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
//skip
skipButtons.forEach(button => button.addEventListener('click',skip));
//拖动条
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate))
//进度条
let mousedown = false;
video.addEventListener('timeupdate',handleProgress);
progress.addEventListener('click',scrub);
progress.addEventListener('mouseover', () => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


