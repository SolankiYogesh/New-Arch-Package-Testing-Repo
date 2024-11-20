export default {
  secondsToMMSS: (seconds: number) =>
    new Date(seconds * 1000).toISOString().substring(14, 19),
  getPercentage: (value: number, duration: number) => {
    const progress = (value / duration) * 100;
    return Number.isNaN(progress) || !Number.isFinite(progress) ? 0 : progress;
  },
  getSlideTime: (percentage: number, duration: number) => {
    const progress = duration * (percentage / 100);
    return Number.isNaN(progress) || !Number.isFinite(progress) ? 0 : progress;
  },
};
