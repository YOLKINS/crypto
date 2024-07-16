import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, fetchExchangeVolume, AppDispatch } from './redux/store/store';

import { Coin, Period, Chart } from './components';

import styles from './styles/App.module.css'

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCoin, period } = useSelector((state: RootState) => state.crypto);

  const refresh = () => {
    dispatch(fetchExchangeVolume({ coin: selectedCoin, period }))
  }

  useEffect(() => {
    if (selectedCoin && period) {
      dispatch(fetchExchangeVolume({ coin: selectedCoin, period: period }));
    }
  }, [selectedCoin, period, dispatch]);

  return (
    <>
      <header className={styles.header}>
        <h1>Crypto Exchange Volume</h1>
      </header>
      <main className={styles.main}>
        <Coin />
        <Period />
        <button className={styles.refresh} onClick={refresh}>Refresh</button>
        <Chart />
      </main>      
    </>
  );
};

export default App;

