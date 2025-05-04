import { ExchangeRates } from "@/types/types";
import {
  PropsWithChildren,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
export interface ICurrency {
  code: string;
  symbol: string;
  name: string;
  changeCode: string;
}
export interface CurrencyType {
  currencies: ICurrency[];
  setExchangeRates: Dispatch<SetStateAction<{}>>;
  selectedCurrency: ICurrency;
  setSelectedCurrency: Dispatch<SetStateAction<ICurrency>>;
  exchangeRates: ExchangeRates;
}

export const Currency = createContext<CurrencyType>({
  currencies: [],
  setExchangeRates: () => {},
  selectedCurrency: {
    code: "USD",
    changeCode: "USDUSD",
    symbol: "$",
    name: "US Dollar",
  },
  setSelectedCurrency: () => {},
  exchangeRates: {},
});

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

interface ICurrencyProvider extends PropsWithChildren {}

function CurrencyProvider({ children }: ICurrencyProvider) {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>({
    code: "USD",
    changeCode: "USDUSD",
    symbol: "$",
    name: "US Dollar",
  });
  const [exchangeRates, setExchangeRates] = useState<{}>({});

  useEffect(() => {
    async function fetchData() {
      const [currenciesRes, ratesRes] = await Promise.all([
        fetch(baseUrl + "currencies"),
        fetch(baseUrl + "currencies/exchange-rates?base=USD"),
      ]);
      const currencies = await currenciesRes.json();
      const rates = await ratesRes.json();
      setCurrencies(currencies);
      setExchangeRates(rates);
    }
    fetchData();
  }, []);

  return (
    <Currency.Provider
      value={{
        currencies,
        setExchangeRates,
        selectedCurrency,
        setSelectedCurrency,
        exchangeRates,
      }}
    >
      {children}
    </Currency.Provider>
  );
}

export default CurrencyProvider;
