import GlobalCryptoContext from "./context/GlobalCryptoContext";
import { useState } from 'react'
import { Main } from "./containers/Main";
import { Toaster } from 'react-hot-toast';

function App() {
  const [currencySelected, setCurrencySelected] = useState('bitcoin')

  const handleSetCurrency = (value) => {
    setCurrencySelected(value)
  }
  return (
    <>
    <GlobalCryptoContext.Provider value={{handleSetCurrency, currencySelected}}>
      <Main />
      <Toaster />
    </GlobalCryptoContext.Provider>
    </>
  );
}

export default App;
