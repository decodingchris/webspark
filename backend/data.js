// [Example] Function to generate launch data
export const getLaunchData = () => {
  const today = new Date();
  // add 24 hours in milliseconds to get tomorrow's date and time
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const launchDate = tomorrow.toLocaleString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const launchData = {
    date: launchDate,
    word: "on",
  };
  return JSON.stringify(launchData);
};
