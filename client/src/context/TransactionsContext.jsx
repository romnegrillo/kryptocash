import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { ethers } from 'ethers';
import { contractAddress, transactionsAbi } from '../data';

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();

  const transactionsContract = new ethers.Contract(
    contractAddress,
    transactionsAbi,
    signer
  );

  return transactionsContract;
};

const TransactionsContext = createContext();

const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );

  const checkIfWalletIsConnected = async () => {
    try {
      const accounts = await ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();

        console.log('Currently connected account.');
        console.log(accounts[0]);
      } else {
        console.log('No accounts found.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
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

  const checkIfTransactionsExist = async () => {
    const transactionContract = await getEthereumContract();
    const transactionCount = await transactionContract.getTransactionCount();

    setTransactionCount(Number(transactionCount));

    return Number(transactionCount);
  };

  const getAllTransactions = async () => {
    if (!(await checkIfTransactionsExist())) return;

    const transactionContract = await getEthereumContract();
    const transactions = await transactionContract.getAllTransactions();

    const structuredTransactions = transactions.map((transaction) => ({
      addressFrom: transaction.sender,
      addressTo: transaction.receiver,
      amount: ethers.formatEther(transaction.amount),
      message: transaction.message,
      timestamp: new Date(Number(transaction.timestamp) * 1000),
      keyword: transaction.keyword,
    }));

    console.log(structuredTransactions);

    setTransactions(structuredTransactions);
  };

  const sendTransaction = async () => {
    try {
      const { addressTo, amount, keyword, message } = formData;

      const transactionContract = await getEthereumContract();
      const parsedAmount = ethers.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            value: parsedAmount.toString(),
            gas: '0x5208',
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        keyword,
        message
      );

      console.log('Loading Transaction hash: ', transactionHash.hash);
      setIsLoading(true);
      await transactionHash.wait();

      console.log('Transaction success.');
      setIsLoading(false);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(Number(transactionCount));
    } catch (error) {
      console.log(error);
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
          checkIfWalletIsConnected();

          console.log('Metamask account changed.');
          console.log(accounts[0]);
        } else {
          setCurrentAccount(null);
        }
      });
    } catch (error) {
      console.log(error);
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
        transactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsContext, TransactionsProvider };
