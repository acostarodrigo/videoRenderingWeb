import { VideoRenderingSigningStargateClient } from "../cosmosClient/dist/signingStargateClient";
import { GasPrice } from "@cosmjs/stargate";

export const getSigningClient = async (keplr) => {
  await keplr.experimentalSuggestChain(getChainInfo());
  await keplr.enable(videoRenderingChainId);
  const offlineSigner = keplr.getOfflineSigner(videoRenderingChainId);
  const creator = (await offlineSigner.getAccounts())[0].address;
  console.log("====================================");
  console.log("creator", creator);
  console.log("====================================");
  const signingClient =
    await VideoRenderingSigningStargateClient.connectWithSigner(
      "http://127.0.0.1:26657",
      offlineSigner,
      {
        gasPrice: GasPrice.fromString("1mini"),
      }
    );
  return [creator, signingClient];
};

export const videoRenderingChainId = "demo";
export const getChainInfo = () => {
  return {
    chainId: videoRenderingChainId,
    chainName: "Janction",
    rpc: process.env.RPC_URL,
    rest: "http://127.0.0.1:1317",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "mini",
      bech32PrefixAccPub: "mini" + "pub",
      bech32PrefixValAddr: "mini" + "valoper",
      bech32PrefixValPub: "mini" + "valoperpub",
      bech32PrefixConsAddr: "mini" + "valcons",
      bech32PrefixConsPub: "mini" + "valconspub",
    },
    currencies: [
      {
        coinDenom: "MINI",
        coinMinimalDenom: "mini",
        coinDecimals: 0,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "MINI",
        coinMinimalDenom: "mini",
        coinDecimals: 0,
        coinGeckoId: "mini",
        gasPriceStep: {
          low: 1,
          average: 1,
          high: 1,
        },
      },
    ],
    stakeCurrency: {
      coinDenom: "MINI",
      coinMinimalDenom: "mini",
      coinDecimals: 0,
      coinGeckoId: "mini",
    },
    coinType: 118,
    features: [],
  };
};
