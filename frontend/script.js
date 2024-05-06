const getDataFromServer = async () => {
  try {
    const response = await fetch("/data");
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

document.addEventListener("DOMContentLoaded", async () => {
  const launchWordElement = document.getElementById("launch-word");
  const launchDateElement = document.getElementById("launch-date");
  const launchData = await getDataFromServer();
  if (launchData) {
    launchWordElement.textContent = launchData.word;
    launchDateElement.textContent = launchData.date;
  }
});
