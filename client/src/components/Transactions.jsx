import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';

import dummyData from '../data/dummyData';
import { sepoliaAddressLink } from '../data';
import shortenAddress from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch';

const Transactions = () => {
  const { currentAccount } = useContext(TransactionsContext);

  return (
    <section className="gradient-bg-transactions p-8">
      <div className="container mx-auto">
        {!currentAccount ? (
          <h3 className="text-white text-center text-5xl ">
            Please connect your MetaMask Wallet
          </h3>
        ) : (
          <TransactionList />
        )}
      </div>
    </section>
  );
};

const TransactionList = () => {
  return (
    <div>
      <h3 className="text-white text-center  text-5xl mb-8">
        Your Latest Transactions
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {dummyData.map((transaction) => (
          <TransactionCard transaction={transaction} key={transaction.id} />
        ))}
      </div>
    </div>
  );
};

const TransactionCard = ({ transaction }) => {
  const { url, message, timestamp, addressFrom, amount, addressTo } =
    transaction;

  const gifUrl = useFetch({ keyword: message });

  return (
    <div className="flex flex-col bg-[#303031] p-4 rounded-lg hover:shadow-2xl  max-w-md">
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
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default Transactions;

