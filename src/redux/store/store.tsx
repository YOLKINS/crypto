import { configureStore } from '@reduxjs/toolkit';
import cryptoSlice, { fetchCoins, fetchExchangeVolume, setSelectedCoin, setPeriod } from '../reducers/cryptoSlice';

const store = configureStore({
    reducer: {
      crypto: cryptoSlice.reducer,
    },
});

export { fetchCoins, fetchExchangeVolume, setSelectedCoin, setPeriod }
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;  