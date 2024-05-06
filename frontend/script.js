// [Example] Function to get launch data from the backend
const getLaunchDataFromServer = async () => {
  try {
    const response = await fetch("/launch-data");
    if (!response.ok) {
      throw new Error("Couldn't get data.");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

// [Example] Event listener to update the frontend with launch data
document.addEventListener("DOMContentLoaded", async () => {
  const launchWordElement = document.getElementById("launch-word");
  const launchDateElement = document.getElementById("launch-date");
  const launchData = await getLaunchDataFromServer();
  if (launchData) {
    launchWordElement.textContent = launchData.word;
    launchDateElement.textContent = launchData.date;
  }
});
