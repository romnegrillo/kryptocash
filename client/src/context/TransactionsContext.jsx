import { useState, useEffect, useCallback } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { contractAddress, transactionsAbi } from "../data";

const TransactionsContext = createContext();

const TransactionsProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  // Connect to Metamask.
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // TODO: Convert into using ethers, not window.ethereum.
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setCurrentAccount(account);
        initializeEthers();
      } catch (error) {
        console.error("Error connecting to Metamask", error);
      }
    } else {
      console.error("Ethereum object not found, install Metamask.");
    }
  };

  // Disconnect Metamask.
  const disConnectWallet = async () => {
    setProvider(null);
    setSigner(null);
    setCurrentAccount(null);
    setContract(null);

    alert("To full disconnect your wallet, do it in MetaMask.");
  };

  // Initialize Ethers.
  // The provider, signer and smart contract will be intialized here.
  // Each time a page loads or a metamask account is changed,
  // this will be called.
  const initializeEthers = async () => {
    const newProvider = new ethers.BrowserProvider(window.ethereum);
    const newSigner = await newProvider.getSigner();
    const newContract = new ethers.Contract(
      contractAddress,
      transactionsAbi,
      newSigner,
    );
    setProvider(newProvider);
    setSigner(newSigner);
    setContract(newContract);
  };

  // Contract Function: getAllTransactions.
  // Should be called on page load or metamask account changed.
  const getAllTransactions = useCallback(async () => {
    if (!contract) return;
    try {
      const transactions = await contract.getAllTransactions();

      if (transactions.length) {
        const structuredTransactions = transactions.map((transaction) => ({
          addressFrom: transaction.sender,
          addressTo: transaction.receiver,
          amount: ethers.formatEther(transaction.amount),
          message: transaction.message,
          timestamp: new Date(Number(transaction.timestamp) * 1000),
          keyword: transaction.keyword,
        }));

        const filteredTransactions = structuredTransactions.filter(
          (transaction) =>
            transaction.addressFrom.trim().toLowerCase() ===
            currentAccount.trim().toLowerCase(),
        );

        setTransactions(filteredTransactions);
      }
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  }, [contract]);

  // Contract Function: sendTransaction.
  const sendTransaction = async () => {
    if (!contract) return;
    const { addressTo, amount, keyword, message } = formData;
    const parsedAmount = ethers.parseEther(amount); // ETH to Wei.

    try {
      await signer.sendTransaction({
        to: addressTo,
        value: parsedAmount,
      });

      const transactionHash = await contract.addToBlockchain(
        addressTo,
        parsedAmount,
        keyword,
        message,
      );

      console.log("Loading Transaction hash: ", transactionHash.hash);

      await transactionHash.wait();

      console.log("Transaction success.");

      await getAllTransactions();
    } catch (error) {
      console.error("Error sending transaction", error);
    }
  };

  // Contract Function: getTransactionCount.
  const getTransactionCount = async () => {
    if (!contract) return;
    try {
      const count = await contract.getTransactionCount();
      return count;
    } catch (error) {
      console.error("Error getting transaction count", error);
    }
  };

  // Handle form change.
  const handleFormChange = (e, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: e.target.value,
    }));
  };

  // Handle Metamask account change.
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        // Added async
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          await initializeEthers(); // Await initializeEthers.
        } else {
          disConnectWallet();
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  // Load initial connected account on first page load.
  useEffect(() => {
    const loadConnectedAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
            initializeEthers();
          }
        } catch (error) {
          console.error("Error loading connected account", error);
        }
      }
    };

    loadConnectedAccount();

    // Listener for account changes.
    window.ethereum?.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        initializeEthers();
      } else {
        disConnectWallet();
      }
    });

    // Listener for network changes.
    window.ethereum?.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  // Fetch transactions when the contract is initialized or re-initialized.
  useEffect(() => {
    if (contract) {
      getAllTransactions();
    }
  }, [contract, getAllTransactions]);

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
        getAllTransactions,
        getTransactionCount,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsContext, TransactionsProvider };
