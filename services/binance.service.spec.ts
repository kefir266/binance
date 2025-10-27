const { expect, jest, test } = require("@jest/globals");

const exchangeInfo = jest.fn();
const mockedSpot = jest.fn(() => {
  restAPI: {
    exchangeInfo;
  }
});

jest.mock("./binance.service", () => ({
  "@binance/spot": {
    Spot: mockedSpot,
  },
}));

test("Should create connection", () => {
  const pair = "test pair";

  const binance = require("./binance.service");
  binance.get(pair);

  expect(exchangeInfo).toHaveBeenCalledWith({ symbol: pair });
});
