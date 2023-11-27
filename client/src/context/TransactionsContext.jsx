import { useState, useEffect, useCallback } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { contractAddress, transactionsAbi } from "../data";

const TransactionsContext = createContext();

const TransactionsProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentEthBalance, setCurrentEthBalance] = useState(0);
  const [contract, setContract] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  console.log(currentEthBalance);

  // Connect to Metamask.
  const connectWallet = async (displayToast) => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setCurrentAccount(account);
        updateBalance();
        initializeEthers();
      } catch (error) {
        if (error.code === -32002) {
          displayToast("Pending connection detected.", "error");
          return;
        } else if (error.code === 4001) {
          displayToast("Wallet connection canceled.", "error");
        } else {
          displayToast("Wallet connection error occured.", "error");
        }

        console.error("Error connecting to Metamask", error);
      }
    } else {
      console.error("Ethereum object not found, install Metamask.");
      displayToast("MetaMask not detected.", "error");
    }
  };

  // Disconnect Metamask.
  const disconnectWallet = async (displayToast) => {
    displayToast("Wallet can only be fully disconnected on MetaMask.", "info");
    clearWalletStates();
  };

  // Clear wallet states when disconnected.
  // Actual disconnection is done on Metamask
  // and we have no control over it.
  const clearWalletStates = () => {
    setProvider(null);
    setSigner(null);
    setCurrentAccount(null);
    updateBalance();
    setContract(null);
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

        const filteredTransactions = structuredTransactions
          .filter(
            (transaction) =>
              transaction.addressFrom.trim().toLowerCase() ===
              currentAccount.trim().toLowerCase(),
          )
          .reverse();

        setTransactions(filteredTransactions);
      }
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  }, [contract]);

  // Contract Function: sendTransaction.
  const sendTransaction = async (displayToast) => {
    if (!contract) return;
    const { addressTo, amount, keyword, message } = formData;
    const parsedAmount = ethers.parseEther(amount); // ETH to Wei.

    try {
      // On old smart contract, the sending of transaction is not included.
      // It is a separate function call on Metamask itself.
      // I already updated the smart contract to include this so it won't be used.

      // await signer.sendTransaction({
      //   to: addressTo,
      //   value: parsedAmount,
      // });

      setIsLoading(true);
      const transactionHash = await contract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword,
        {
          value: parsedAmount, // Specify the ETH amount to be sent
        },
      );

      console.log("Loading Transaction hash: ", transactionHash.hash);

      await transactionHash.wait();

      console.log("Transaction success.");

      await getAllTransactions();
      setIsLoading(false);
      clearForm();
      displayToast("Transaction success.", "success");
    } catch (error) {
      console.error("Error sending transaction", error);
      setIsLoading(false);
      displayToast("Transaction canceled/failed.", "error");
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

  // Update ETH balance.
  const updateBalance = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];

        // Fetch the balance in Wei
        const balanceWei = await window.ethereum.request({
          method: "eth_getBalance",
          params: [account, "latest"],
        });

        // Convert Wei to Ether
        const balanceEth = parseInt(balanceWei, 16) / 1e18;

        // Update the state with the new balance
        setCurrentEthBalance(balanceEth.toString());
      } catch (error) {
        console.error("Error updating balance: ", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  // Handle form change.
  const handleFormChange = (e, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: e.target.value,
    }));
  };

  const clearForm = () => {
    console.log("Clear form data.");
    setFormData({
      addressTo: "",
      amount: "",
      keyword: "",
      message: "",
    });
  };

  // Handle Metamask account change.
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        // Added async
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          updateBalance();
          await initializeEthers(); // Await initializeEthers.
        } else {
          clearWalletStates();
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
            updateBalance();
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
        updateBalance();
        initializeEthers();
      } else {
        clearWalletStates();
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
        disconnectWallet,
        currentAccount,
        sendTransaction,
        formData,
        currentEthBalance,
        handleFormChange,
        transactions,
        getAllTransactions,
        getTransactionCount,
        isLoading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsContext, TransactionsProvider };
