function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  const msInMinute = 60 * 1000;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  console.log(diff);
  console.log(now);
  console.log(date);

  if (diff < msInMinute) {
    return "just now";
  } else if (diff < msInHour) {
    const minutes = Math.floor(diff / msInMinute);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (diff < msInDay) {
    const hours = Math.floor(diff / msInHour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diff / msInDay);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
}

export { timeAgo };
