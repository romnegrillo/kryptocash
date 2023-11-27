import { useContext } from "react";

import { TransactionsContext } from "../context/TransactionsContext";

import { walletNotConnected } from "../assets/images";
import { sepoliaAddressLink } from "../data";
import shortenAddress from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionsContext);

  return (
    <section
      className="gradient-bg-transactions min-h-[400px] p-8"
      id="transactions"
    >
      <h3 className="mb-12 text-center text-5xl text-white">Transactions</h3>

      <div className="container mx-auto">
        {!currentAccount ? (
          <WalletNotConnected />
        ) : transactions.length ? (
          <TransactionList transactions={transactions} />
        ) : (
          <NoTransactions />
        )}
      </div>
    </section>
  );
};

const WalletNotConnected = () => {
  return (
    <div className="padding-x padding-y flex  min-h-[200px] flex-col items-center justify-center">
      <div>
        <img src={walletNotConnected} alt="wallet not connected" />
      </div>
      <p className="text-md text-center text-2xl text-white ">
        Please connect your MetaMask to view your transactions
      </p>
    </div>
  );
};

const NoTransactions = () => {
  return (
    <div className="padding-x padding-y flex  min-h-[200px] flex-col items-center justify-center">
      <div>
        <img src={walletNotConnected} alt="wallet not connected" />
      </div>
      <p className="text-md text-center text-2xl text-white ">
        No Transactions found, please test my app.
      </p>
    </div>
  );
};

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <div className="grid grid-cols-1 justify-items-center gap-4 lg:grid-cols-3">
        {transactions.map((transaction, index) => (
          <TransactionCard transaction={transaction} key={index} />
        ))}
      </div>
    </div>
  );
};

const TransactionCard = ({ transaction }) => {
  const { message, timestamp, addressFrom, amount, addressTo, keyword } =
    transaction;

  const gifUrl = useFetch({ keyword: keyword });
  console.log("keyword", keyword);

  return (
    <div className="padding-x padding-y flex w-full max-w-md flex-col rounded-lg bg-[#303031] hover:shadow-2xl">
      <p className="text-white">
        To:{" "}
        <a
          href={`${sepoliaAddressLink}/${addressTo}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-400 underline"
        >
          {shortenAddress(addressTo)}
        </a>
      </p>
      <p className="text-white">
        From:{" "}
        <a
          href={`${sepoliaAddressLink}/${addressFrom}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-400 underline"
        >
          {shortenAddress(addressFrom)}
        </a>
      </p>
      <p className="text-white">{`Amount: ${amount}`} ETH</p>

      <p className="text-white">{`Message: ${message}`}</p>

      <div className="relative mb-4 flex flex-1 flex-col items-center justify-center">
        <img src={gifUrl} alt="gif" className="my-2 w-full object-contain" />
        <p className="absolute -bottom-[2.5%] flex items-center justify-center rounded-full bg-black px-4 py-2  font-bold text-[#37c7da]">
          {timestamp.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Transactions;
