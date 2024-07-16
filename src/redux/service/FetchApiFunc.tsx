export default class FetchApiFunc {
    static api_key = '061293dccad74a4c1a77a613c1c3f6c4c15a08627c901ffd48847ecf37b19871';
    static options = {
        headers: {
          Authorization: `Apikey ${FetchApiFunc.api_key}`,
          'Content-Type': 'application/json',
        },
      }
    
    static async _serviceFetch(url: string) {
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/${url}`, FetchApiFunc.options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = response.json()
        console.log('result from serviceFetch', result);
        return result;
      } catch (error) { 
        console.error('Fetch error:', error);
        throw error;
      }
    }
  
    static getCoinList() {
      return this._serviceFetch(`blockchain/list`);
    }
  
    static getExchangeVolume({ coin, period }: { coin: string, period: number }) {
      const now = Math.floor(Date.now());
      return this._serviceFetch(
        `exchange/histohour?tsym=${coin}&limit=${period * 24}&toTs=${now}`
      );
    }
}