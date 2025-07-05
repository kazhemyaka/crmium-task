import { type FC, useEffect, useState } from "react";
import getNBURate from "../services/nbuApi";
import { getCurrentDeal, updateDealRate } from "../services/zohoApi";
import "../i18n";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import Container from "./Container";
import Rate from "./Rate";
import Difference from "./Difference";

interface ExchangeRateWidgetProps {
  dealId: string;
}

const ExchangeRateWidget: FC<ExchangeRateWidgetProps> = ({ dealId }) => {
  const [nbuRate, setNbuRate] = useState<number | null>(null);
  const [dealRate, setDealRate] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (dealId) {
      loadData();
    }
  }, [dealId]);

  const loadData = async () => {
    try {
      const [nbu, deal] = await Promise.all([
        getNBURate(),
        getCurrentDeal(dealId),
      ]);

      setNbuRate(nbu);
      setDealRate(deal.ExchangeRate || 0);
    } catch (error) {
      console.error("Error:", error);
      setError(t("load_error"));
    }
  };

  const differenceInPercentage = () => {
    if (nbuRate && dealRate) {
      return Math.abs(((dealRate - nbuRate) / nbuRate) * 100);
    }
    return 0;
  };

  const diffPercentage = differenceInPercentage();
  const roundedDiff = Math.round(diffPercentage * 10) / 10;
  const isHighDifference = roundedDiff >= 5;

  const handleUpdateDealRate = async () => {
    if (nbuRate && dealId) {
      try {
        console.log("Updating deal rate.");
        setUploading(true);
        await updateDealRate(dealId, parseFloat(nbuRate.toFixed(2)));
        setDealRate(nbuRate);
        setUploading(false);
        console.log("Deal rate updated successfully.");
      } catch (error) {
        console.error("Error:", error);
        setError(t("update_error"));
        setUploading(false);
      }
    }
  };

  return error ? (
    <Container className="text-red-500">{error}</Container>
  ) : nbuRate === null || dealRate === null ? (
    <Container>{t("loading")}</Container>
  ) : (
    <Container>
      <div className="flex gap-1 mb-2">
        <Button label="EN" onClick={() => i18n.changeLanguage("en")} />
        <Button label="UA" onClick={() => i18n.changeLanguage("uk")} />
      </div>
      <Rate label={t("nbu_rate")} value={nbuRate} />
      <Rate label={t("deal_rate")} value={dealRate} />
      <Difference
        label={t("difference")}
        isHighDifference={isHighDifference}
        differenceInPercentage={differenceInPercentage}
      />
      {isHighDifference && (
        <Button
          label={uploading ? t("loading") : t("update_deal_rate")}
          onClick={handleUpdateDealRate}
          disabled={uploading}
        />
      )}
    </Container>
  );
};

export default ExchangeRateWidget;
