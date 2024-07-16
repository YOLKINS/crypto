export interface CryptoState {
    selectedCoin: string;
    period: number;
    data: { time: number; volume: number }[];
    coins: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}