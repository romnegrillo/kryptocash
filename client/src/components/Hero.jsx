import { useContext } from 'react';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { Input, Loader } from './';
import { TransactionsContext } from '../context/TransactionsContext';
import shortenAddress from '../utils/shortenAddress';

const Hero = () => {
  const {
    connectWallet,
    disConnectWallet,
    currentAccount,
    formData,
    handleFormChange,
    sendTransaction,
  } = useContext(TransactionsContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { addressTo, amount, keyword, message } = formData;

    if (!addressTo || !amount || !keyword || !message) {
      return;
    }

    sendTransaction();
  };

  return (
    <section className="max-container mx-auto p-8 flex-1 flex lg:flex-row flex-col items-center">
      <div className="flex-1 flex justify-center">
        <div className=" flex flex-col items-start justify-start md:w-auto w-[full]">
          <h1 className="text-white text-5xl mb-4">
            Send Crypto <br /> and a message <br /> across the world.
          </h1>
          <p className="text-white mb-12">
            Genuine, tamper-proof, and beyond traditional bank flaws.
          </p>

          {!currentAccount && (
            <button
              className="bg-[#2952e3] py-4 px-8 font-bold rounded-full cursor-pointer hover:bg-[#2546bd] text-white mb-12 w-full"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}

          {currentAccount && (
            <button
              className="bg-[#2952e3] py-4 px-8 font-bold rounded-full cursor-pointer hover:bg-[#2546bd] text-white mb-12 w-full"
              onClick={disConnectWallet}
            >
              {shortenAddress(currentAccount)}
            </button>
          )}

          <div className="border border-slate-600 rounded-lg grid md:grid-cols-3 grid-cols-2 mb-16 lg:self-start self-center w-full">
            <div className="text-white border border-slate-600 rounded-tl-md px-4 py-8 text-center">
              Reliability
            </div>
            <div className="text-white border  border-slate-600 px-4 py-8 text-center">
              Security
            </div>
            <div className="text-white border  border-slate-600 rounded-tr px-4 py-8 text-center">
              Ethereum
            </div>

            <div className="text-white border  border-slate-600 rounded-bl px-4 py-8 text-center">
              Web 3.0
            </div>
            <div className="text-white border  border-slate-600 px-4 py-8 text-center">
              Low Fees
            </div>
            <div className="text-white border  border-slate-600 rounded-br px-4 py-8 text-center">
              Blockchain
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center py-8">
        <div className="h-[230px] w-96 rounded-lg eth-card white-glassmorphism flex flex-col justify-between mb-12">
          <div className="h-10 w-full py-2 px-4 flex justify-between ">
            <div className="flex justify-center items-center w-12 h-12 border rounded-full p-2">
              <SiEthereum className="text-white w-12 h-12" />
            </div>

            <BsInfoCircle className="text-white w-6 h-6" />
          </div>

          <div className="w-full py-2 px-4 flex flex-col justify-between">
            <p className="text-white font-semibold ">
              Ethereum MetaMask Address:
            </p>
            <p className="text-sm text-white font-bold">
              {currentAccount
                ? shortenAddress(currentAccount)
                : 'Account disconnected'}
            </p>
          </div>
        </div>

        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <Input
            type="text"
            placeholder="Address To"
            name="addressTo"
            onChange={handleFormChange}
          />
          <Input
            type="number"
            placeholder="Amount (ETH)"
            name="amount"
            onChange={handleFormChange}
          />
          <Input
            type="text"
            placeholder="Keyword"
            name="keyword"
            onChange={handleFormChange}
          />
          <Input
            type="text"
            placeholder="Enter Messages"
            name="message"
            onChange={handleFormChange}
          />

          <div className="h-[1px] w-full bg-gray-400 my-2" />

          {false ? (
            <Loader />
          ) : (
            <button
              onClick={handleSubmit}
              className="text-white  w-full mt-2 border-[1px] py-2 px-8 border-[#3d4f7c] rounded-full cursor-pointer font-semibold flex items-center justify-center hover:bg-[#2952e3]"
            >
              Send Now
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
