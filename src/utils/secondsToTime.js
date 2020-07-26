export default (duration) => {
  const sec_num = new Date(1000 * duration).toISOString();
  let hours = sec_num.substr(11, 2);
  let minutes = sec_num.substr(14, 2);
  let seconds = sec_num.substr(17, 2);
  if (hours === '00') {
    if (minutes === '00') {
      return seconds + 'sec';
    }
    return minutes + 'min';
  }
  return hours + 'h ' + minutes + 'min';
};
