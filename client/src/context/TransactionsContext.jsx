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
      console.log(
        'Problem detecting ethereum object, please install Metamask.'
      );
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(
        'Problem detecting ethereum object, please install Metamask.'
      );
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
      console.log(
        'Problem detecting ethereum object, please install Metamask.'
      );
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    try {
      ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);

          console.log('Metamask account changed.');
          console.log(accounts[0]);
        } else {
          setCurrentAccount(null);
        }
      });
    } catch (error) {
      console.log(
        'Problem detecting ethereum object, please install Metamask.'
      );
    }

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
