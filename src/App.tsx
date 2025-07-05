import "./App.css";
import { useEffect, useState } from "react";
import ExchangeRateWidget from "./components/ExchangeRateWidget";

function App() {
  const [dealId, setDealId] = useState<string>("");

  useEffect(() => {
    window.ZOHO.embeddedApp.on("PageLoad", (data: any) => {
      setDealId(data.EntityId);
    });

    window.ZOHO.embeddedApp.init();
  }, []);

  return <ExchangeRateWidget dealId={dealId} />;
}

export default App;
