const getNBURate = async (): Promise<number> => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");

  const cachedRate = localStorage.getItem("nbuRate");
  const cachedDate = localStorage.getItem("nbuRateDate");

  if (cachedRate && cachedDate === formattedDate) {
    console.log("Using cached NBU rate.");
    return parseFloat(cachedRate);
  }

  console.log("Fetching NBU rate from API.");
  const response = await fetch(
    `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${formattedDate}&json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch NBU rate");
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No data found for the specified date");
  }

  console.log("NBU Rate received.");

  const nbuRate = data[0].rate;

  localStorage.setItem("nbuRate", nbuRate.toString());
  localStorage.setItem("nbuRateDate", formattedDate);

  return nbuRate;
};

export default getNBURate;
