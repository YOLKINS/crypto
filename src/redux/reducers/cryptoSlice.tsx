import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import FetchApiFunc from '../service/FetchApiFunc';

import { CryptoState } from '../types/types';

const initialState: CryptoState = {
  selectedCoin: 'BTC',
  period: 1,
  data: [],
  coins: [],
  status: 'idle',
};

export const fetchCoins = createAsyncThunk('crypto/fetchCoins', async () => {
  const response = await FetchApiFunc.getCoinList();
  return response.Data;
});

export const fetchExchangeVolume = createAsyncThunk(
  'crypto/fetchExchangeVolume',
  async ({ coin, period }: { coin: string, period: number }) => {
    const response = await FetchApiFunc.getExchangeVolume({ coin, period });
    const result = response.Data.map((d: any) => ({ time: d.time, volume: d.volume }));
    result.pop();
    return result;
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedCoin: (state, action: PayloadAction<string>) => {
      state.selectedCoin = action.payload;
    },
    setPeriod: (state, action: PayloadAction<number>) => {
      state.period = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = Object.keys(action.payload);
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchExchangeVolume.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeVolume.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExchangeVolume.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSelectedCoin, setPeriod } = cryptoSlice.actions;
export default cryptoSlice;