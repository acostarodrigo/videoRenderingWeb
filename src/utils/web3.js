import { ethers } from "ethers";
import ante from "utils/Ante.json";
import Web3 from "web3";
export const getAnteContract = async (metamask, wallet) => {
  const contractAddress = process.env.REACT_APP_BLOCKCHAIN_ANTE_ADDRESS;
  const provider = new ethers.BrowserProvider(metamask);
  const signer = await provider.getSigner(wallet);

  const contract = new ethers.Contract(contractAddress, ante.abi, signer);

  return { contract, signer, provider };
};

export const getReadOnlyContract = () => {
  const network = process.env.REACT_APP_BLOCKCHAIN_NETWORK;
  const key = process.env.REACT_APP_BLOCKCHAIN_INFURA_API_KEY;
  const provider = new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${key}`
  );
  const web3 = new Web3(provider);
  const contractAddress = process.env.REACT_APP_BLOCKCHAIN_ANTE_ADDRESS;
  const contract = new web3.eth.Contract(ante.abi, contractAddress);
  return contract;
};
