import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';

import dummyData from '../data/dummyData';
import { sepoliaAddressLink } from '../data';
import shortenAddress from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch';

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionsContext);

  return (
    <section className="gradient-bg-transactions p-8">
      <div className="container mx-auto">
        {!currentAccount ? (
          <h3 className="text-white text-center text-5xl ">
            Please connect your MetaMask Wallet
          </h3>
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </div>
    </section>
  );
};

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h3 className="text-white text-center  text-5xl mb-8">
        Your Latest Transactions
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-items-center">
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

  return (
    <div className="flex flex-col bg-[#303031] p-4 rounded-lg hover:shadow-2xl max-w-md w-full">
      <p className="text-white">
        To:{' '}
        <a
          href={`${sepoliaAddressLink}/${addressTo}`}
          target="_blank"
          rel="noreferrer noopener"
          className="underline text-blue-400"
        >
          {shortenAddress(addressTo)}
        </a>
      </p>
      <p className="text-white">
        From:{' '}
        <a
          href={`${sepoliaAddressLink}/${addressFrom}`}
          target="_blank"
          rel="noreferrer noopener"
          className="underline text-blue-400"
        >
          {shortenAddress(addressFrom)}
        </a>
      </p>
      <p className="text-white">{`Amount: ${amount}`} ETH</p>

      <p className="text-white">{`Message: ${message}`}</p>

      <div className="relative flex flex-col justify-center items-center mb-4">
        <img src={gifUrl} alt="gif" className="w-full object-contain my-2" />
        <p className="absolute -bottom-[2.5%] flex justify-center items-center text-[#37c7da] font-bold bg-black rounded-full  px-4 py-2">
          {timestamp.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Transactions;
