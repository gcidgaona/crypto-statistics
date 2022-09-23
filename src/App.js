import GlobalCryptoContext from "./context/GlobalCryptoContext";
import PriceBtcContext from "./context/PriceBtcContext";
import { useState } from 'react'
import { Main } from "./containers/Main";
import { Toaster } from 'react-hot-toast';

function App() {
  const [currencySelected, setCurrencySelected] = useState('bitcoin');
  const [priceBtc, setPriceBtc] = useState(0);

  const handleSetCurrency = (value) => {
    setCurrencySelected(value)
  }
  const handlePriceBtc = (value) => setPriceBtc(value);

  return (
    <>
      <PriceBtcContext.Provider value={{handlePriceBtc, priceBtc}}>
        <GlobalCryptoContext.Provider value={{handleSetCurrency, currencySelected}}>
          <Main />
          <Toaster />
        </GlobalCryptoContext.Provider>
      </PriceBtcContext.Provider>
    </>
  );
}

export default App;
