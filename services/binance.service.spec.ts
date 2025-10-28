import { expect, jest, test, beforeEach } from "@jest/globals";

const exchangeInfo = jest.fn<any>().mockResolvedValue({
  data: jest.fn().mockReturnValue({ symbols: [] }),
});

jest.unstable_mockModule("@binance/spot", () => ({
  Spot: jest.fn<any>().mockImplementation(() => ({
    restAPI: {
      exchangeInfo,
    },
    websocketStreams: {
      connect: jest.fn(),
    },
  })),
  SPOT_WS_STREAMS_PROD_URL: "wss://stream.binance.com:9443",
  SpotRestAPI: {},
  SpotWebsocketStreams: {},
}));

const { default: binanceService } = await import("./binance.service");

beforeEach(() => {
  exchangeInfo.mockClear();
});

test("Should create connection", async () => {
  const pair = "test pair";

  await binanceService.get(pair);

  expect(exchangeInfo).toHaveBeenCalledWith({ symbol: pair });
});
