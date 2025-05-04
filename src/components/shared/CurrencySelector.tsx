import { useContext } from "react";
import { Currency, ICurrency } from "@/Context/Currency";

export const CurrencySelector = () => {
  const { currencies, selectedCurrency, setSelectedCurrency } =
    useContext(Currency);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currencyName = e.target.value as string;
    const newCurrency = currencies.find(
      (currency: ICurrency) => currency.name === currencyName
    );
    if (newCurrency) setSelectedCurrency(newCurrency);
  };

  return (
    <select
      className="rounded"
      value={selectedCurrency.name}
      onChange={handleChange}
    >
      {currencies.map((currency: ICurrency) => (
        <option key={currency.name} value={currency.name}>
          {currency.name}
        </option>
      ))}
    </select>
  );
};
