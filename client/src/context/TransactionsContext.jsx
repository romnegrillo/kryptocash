import { useState, useEffect } from 'react';

import { createContext } from 'react';
import { contractAddress, transactionsAbi } from '../data';

const { ethereum } = window;

const TransactionsContext = createContext();

const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  });

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask!');

      const accounts = await ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        console.log('Currently connected account.');
        console.log(accounts[0]);
      } else {
        console.log('No accounts found.');
      }
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum object detected.');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask!');

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum object detected.');
    }
  };

  const disConnectWallet = async () => {
    return alert('To disconnect or switch account, please do it on Metamask.');
  };

  const handleFormChange = (e, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: e.target.value,
    }));
  };

  const sendTransaction = async () => {
    try {
      console.log('Sending transactions...');
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum object detected.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);

        console.log('Metamask account changed.');
        console.log(accounts[0]);
      } else {
        setCurrentAccount(null);
      }
    });

    // Clean up the event listener
    return () => ethereum.removeListener('accountsChanged');
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        connectWallet,
        disConnectWallet,
        currentAccount,
        sendTransaction,
        formData,
        handleFormChange,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsContext, TransactionsProvider };
