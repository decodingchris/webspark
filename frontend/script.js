const getDataFromServer = async () => {
  try {
    const response = await fetch("/data");
    if (!response.ok) {
      throw new Error("Couldn't get data.");
    }
    const data = await response.text();
    return data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const launchDateElement = document.getElementById("launch-date");
  const launchDate = await getDataFromServer();
  if (launchDate) {
    launchDateElement.textContent = launchDate;
  } else {
    launchDateElement.textContent = "tomorrow";
  }
});
