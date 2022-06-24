import GlobalCryptoContext from "./context/GlobalCryptoContext";
import { useState } from 'react'
import { Main } from "./features/Main/Main";

function App() {
  const [currencySelected, setCurrencySelected] = useState('bitcoin')

  const handleSetCurrency = (value) => {
    setCurrencySelected(value)
  }
  return (
    <>
    <GlobalCryptoContext.Provider value={{handleSetCurrency, currencySelected}}>
      <Main />
    </GlobalCryptoContext.Provider>
    </>
  );
}

export default App;
