
import './App.css';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { PolyjuiceHttpProvider } from '@polyjuice-provider/web3';
import { AddressTranslator } from 'nervos-godwoken-integration';

import { CONFIG } from '../config';
import { LotteryWrapper } from '../lib/contracts/LotteryWrapper';

async function createWeb3() {
  // Modern dapp browsers...
  if ((window as any).ethereum) {
      const godwokenRpcUrl = CONFIG.WEB3_PROVIDER_URL;
      const providerConfig = {
          rollupTypeHash: CONFIG.ROLLUP_TYPE_HASH,
          ethAccountLockCodeHash: CONFIG.ETH_ACCOUNT_LOCK_CODE_HASH,
          web3Url: godwokenRpcUrl
      };

      const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig);
      const web3 = new Web3(provider || Web3.givenProvider);

      try {
          // Request account access if needed
          await (window as any).ethereum.enable();
      } catch (error) {
          // User denied account access...
      }

      return web3;
  }

  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  return null;
}

export function App() {
  const [web3, setWeb3] = useState<Web3>();
  const [contract, setContract] = useState<LotteryWrapper | null>(null);
  const [accounts, setAccounts] = useState<string[]>();
  const [balance, setBalance] = useState<bigint>();
  const [polyjuiceAddress, setPolyjuiceAddress] = useState<string | undefined>();
  const [existingContractIdInputValue, setExistingContractIdInputValue] = useState<string>();
  const [storedValue, setStoredValue] = useState<number | undefined>();
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const toastId = React.useRef();
  const [newStoredNumberInputValue, setNewStoredNumberInputValue] = useState<
      number | undefined
  >();


  const account = accounts?.[0];

    useEffect(() => {
    const init = async () => {
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(Lottery.abi, values.DEPLOYED_CONTRACT_ADDRESS);
      const [houseFee, state] = await Promise.all([
        contract.getHouseFee(account),
        contract.currentState(account)
      ]);

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setHouseFee(houseFee);
      setBet({state: 0});
    }
    init();
  }, []);

  const isReady = () => {
    return (
      typeof contract !== 'undefined' 
      && typeof web3 !== 'undefined'
      && typeof accounts !== 'undefined'
      && typeof houseFee !== 'undefined'
    );
  }

  useEffect(() => {
    if(isReady()) {

      updateBet();
      updatePlayers();
    }
  }, [accounts, contract, web3, houseFee]);

  async function updateBet() {
    const bet = await Promise.all([
      contract.betCount(account),
      contract.betSize(account),
      contract.admin(account),
      contract.currentState(account),
    ]);
    setBet({count: bet[0], size: bet[1], admin: bet[2], state: parseInt(bet[3])});
  }

  async function updatePlayers() {

    const players = await contract.getPlayers(account);
    console.log(players)
    setPlayers(players);
  }
 
  return (
    <div className="App">
    </div>
  );
}

export default App;
