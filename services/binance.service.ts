import dotenv from "dotenv";
import { Spot, SpotRestAPI, SPOT_WS_STREAMS_PROD_URL } from "@binance/spot";
dotenv.config();

class BinanceService {
  connection: any;

  constructor() {
    this.connection = new Spot({
      configurationRestAPI: {
        apiKey: process.env.APIKEY || "",
        apiSecret: process.env.APISECRET,
      },
    });
  }

  async get(symbol: string) {
    const response = await this.connection.restAPI.exchangeInfo({ symbol });

    return response.data();
  }
}

export default new BinanceService();
