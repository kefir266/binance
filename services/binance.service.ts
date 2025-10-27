import dotenv from "dotenv";
import {
  Spot,
  SpotRestAPI,
  SPOT_WS_STREAMS_PROD_URL,
  SpotWebsocketStreams,
} from "@binance/spot";
dotenv.config();

class BinanceService {
  connection: any;
  websocketConnection;

  constructor() {
    this.connection = new Spot({
      configurationRestAPI: {
        apiKey: process.env.APIKEY || "",
        apiSecret: process.env.APISECRET,
      },
    });

    this.websocketConnection = new Spot({
      configurationWebsocketStreams: {
        wsURL: SPOT_WS_STREAMS_PROD_URL,
      },
    });
  }

  async get(symbol: string) {
    const response = await this.connection.restAPI.exchangeInfo({ symbol });

    return response.data();
  }

  getStreamData(onDataFn: any, symbol: string) {
    this.websocketConnection.websocketStreams
      .connect()
      .then((connection: SpotWebsocketStreams.WebsocketStreamsConnection) => {
        const stream = connection.aggTrade({ symbol });
        stream.on("message", onDataFn);
      });
  }
}

export default new BinanceService();
