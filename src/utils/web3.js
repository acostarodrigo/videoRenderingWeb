import { VideoRenderingSigningStargateClient } from "../cosmosClient/dist/signingStargateClient";
import { GasPrice } from "@cosmjs/stargate";

export const getSigningClient = async (keplr) => {
  await keplr.experimentalSuggestChain(getChainInfo());
  await keplr.enable(videoRenderingChainId);
  const offlineSigner = keplr.getOfflineSigner(videoRenderingChainId);
  const creator = (await offlineSigner.getAccounts())[0].address;
  const signingClient =
    await VideoRenderingSigningStargateClient.connectWithSigner(
      process.env.RPC_URL,
      offlineSigner,
      {
        gasPrice: GasPrice.fromString("0jct"),
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
    rest: process.env.REST_URL,
    bip44: {
      coinType: 678,
    },
    bech32Config: {
      bech32PrefixAccAddr: "janction",
      bech32PrefixAccPub: "janction" + "pub",
      bech32PrefixValAddr: "janction" + "valoper",
      bech32PrefixValPub: "janction" + "valoperpub",
      bech32PrefixConsAddr: "janction" + "valcons",
      bech32PrefixConsPub: "janction" + "valconspub",
    },
    currencies: [
      {
        coinDenom: "JCT",
        coinMinimalDenom: "JCT",
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "JCT",
        coinMinimalDenom: "jct",
        coinDecimals: 6,
        coinGeckoId: "jct",
        gasPriceStep: {
          low: 0,
          average: 1,
          high: 1,
        },
      },
    ],
    coinType: 118,
    features: [],
  };
};
