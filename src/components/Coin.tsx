import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, fetchCoins, setSelectedCoin, AppDispatch, fetchExchangeVolume } from '../redux/store/store';

const Coin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCoin, coins, status } = useSelector((state: RootState) => state.crypto);

  const handleCoinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCoin(e.target.value))
  }  

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCoins());
    }
  }, [status, dispatch]);

  return (
    <select value={selectedCoin} onChange={handleCoinChange}>
      {coins.map(coin => (
        <option key={coin} value={coin}>{coin}</option>
      ))}
    </select>
  );
};

export default Coin;