export function parseUrl(videoID) {
  return "https://www.youtube.com/watch?v=" + videoID;
}

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};