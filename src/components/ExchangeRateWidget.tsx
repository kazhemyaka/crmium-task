import { type FC, useEffect, useState } from "react";
import getNBURate from "../services/nbuApi";
import {
  getCurrentDeal,
  updateDealRate,
  insertExchangeRate,
  searchLastExchangeRate,
  searchLastFiveExchangeRates,
} from "../services/zohoApi";
import "../i18n";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import Container from "./Container";
import Rate from "./Rate";
import Difference from "./Difference";
import Table from "./Table";

interface ExchangeRateWidgetProps {
  dealId: string;
}

const ExchangeRateWidget: FC<ExchangeRateWidgetProps> = ({ dealId }) => {
  const [nbuRate, setNbuRate] = useState<number | null>(null);
  const [dealRate, setDealRate] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [lastRate, setLastRate] = useState<number | null>(null);
  const [lastFiveRates, setLastFiveRates] = useState<any[]>([]);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (dealId) {
      loadData();
    }
  }, [dealId]);

  const loadData = async () => {
    try {
      const [nbu, deal, lastRate, lastFiveRates] = await Promise.all([
        getNBURate(),
        getCurrentDeal(dealId),
        searchLastExchangeRate(dealId, "NBU"),
        searchLastFiveExchangeRates(dealId, "NBU"),
      ]);

      setNbuRate(nbu || null);
      setDealRate(deal.ExchangeRate || null);
      setLastRate(lastRate?.Rate || null);
      setLastFiveRates(lastFiveRates || []);
    } catch (error) {
      console.error("Error:", error);
      setError(t("load_error"));
    }
  };

  const differenceInPercentage = (a: number, b: number) => {
    if (a === 0) return 0;
    return Math.abs(((b - a) / a) * 100);
  };

  const diffPercentageNbuDeal = differenceInPercentage(
    dealRate || 0,
    nbuRate || 0
  );
  const roundedDiffNbuDeal = Math.round(diffPercentageNbuDeal * 10) / 10;
  const isHighDifference = roundedDiffNbuDeal >= 5;

  const diffPercentageLastRate = differenceInPercentage(
    lastRate || 0,
    nbuRate || 0
  );
  const roundedDiffLastRate = Math.round(diffPercentageLastRate * 10) / 10;

  const handleUpdateDealRate = async () => {
    if (nbuRate && dealId) {
      try {
        console.log("Updating deal rate.");
        setUploading(true);
        await updateDealRate(dealId, parseFloat(nbuRate.toFixed(2)));
        setDealRate(nbuRate);
        await insertExchangeRate(dealId, nbuRate, "NBU", roundedDiffLastRate);
        console.log("Exchange rate inserted successfully.");
        await loadData();
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
      <div className="flex flex-col gap-4 mb-4">
        <Rate label={t("nbu_rate")} value={nbuRate} />
        <Rate label={t("deal_rate")} value={dealRate} />
        <Difference
          label={t("difference")}
          isHighDifference={isHighDifference}
          differenceInPercentage={diffPercentageNbuDeal}
        />
      </div>
      {isHighDifference && (
        <Button
          label={uploading ? t("loading") : t("update_deal_rate")}
          onClick={handleUpdateDealRate}
          disabled={uploading}
        />
      )}
      {lastFiveRates.length > 0 && (
        <Table
          headers={[t("date"), t("rate"), t("difference")]}
          rows={lastFiveRates.map((rate) => [
            new Date(rate.Date).toLocaleString("uk-UA", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            rate.Rate.toFixed(1),
            rate.Difference.toFixed(1) + "%",
          ])}
        />
      )}
    </Container>
  );
};

export default ExchangeRateWidget;
