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
