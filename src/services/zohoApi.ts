import dayjs from "dayjs";

export const getCurrentDeal = async (dealId: string) => {
  const response = await window.ZOHO.CRM.API.getRecord({
    Entity: "Deals",
    RecordID: dealId,
  });

  if (!response || !response.data || response.data.length === 0) {
    throw new Error("Deal not found");
  }

  return response.data[0];
};

export const updateDealRate = async (dealId: string, rate: number) => {
  const response = await window.ZOHO.CRM.API.updateRecord({
    Entity: "Deals",
    APIData: {
      id: dealId,
      ExchangeRate: rate,
    },
  });

  if (!response && !response.data && response.data.length === 0) {
    const recordData = response.data[0];
    if (recordData.code !== "SUCCESS" || recordData.status !== "success") {
      throw new Error(
        `Failed to update deal rate: ${
          response?.message || response?.data?.[0]?.message || "Unknown error"
        }`
      );
    }
  }
};

export const insertExchangeRate = async (
  dealId: string,
  rate: number,
  rateSource: "NBU" | "Other",
  difference: number
) => {
  const response = await window.ZOHO.CRM.API.insertRecord({
    Entity: "Exchange_Rates_History",
    APIData: {
      Name: `Exchange Rate for Deal ${dealId}`,
      Deal: dealId,
      Rate: rate,
      Date: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
      Rate_Source: rateSource,
      Difference: difference,
    },
  });

  if (!response || !response.data || response.data.length === 0) {
    throw new Error("Failed to insert exchange rate");
  }

  return response.data[0];
};

export const searchLastExchangeRate = async (
  dealId: string,
  rateSource: "NBU" | "Other"
) => {
  const response = await window.ZOHO.CRM.API.searchRecord({
    Entity: "Exchange_Rates_History",
    Type: "criteria",
    Query: `((Deal:equals:${dealId}) and (Rate_Source:equals:${rateSource}))`,
    SortBy: "Date",
    SortOrder: "desc",
    Limit: 1,
  });

  if (!response || !response.data || response.data.length === 0) {
    return null;
  }

  return response.data[0];
};

export const searchLastFiveExchangeRates = async (
  dealId: string,
  rateSource: "NBU" | "Other"
) => {
  const response = await window.ZOHO.CRM.API.searchRecord({
    Entity: "Exchange_Rates_History",
    Type: "criteria",
    Query: `((Deal:equals:${dealId}) and (Rate_Source:equals:${rateSource}))`,
    SortBy: "Date",
    SortOrder: "desc",
    Limit: 5,
  });

  if (!response || !response.data || response.data.length === 0) {
    return null;
  }

  return response.data;
};
