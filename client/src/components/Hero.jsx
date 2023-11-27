import { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Input, Loader } from "./";
import { TransactionsContext } from "../context/TransactionsContext";
import shortenAddress from "../utils/shortenAddress";
import displayToast from "../utils/displayToast";

import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  const {
    connectWallet,
    disconnectWallet,
    currentAccount,
    formData,
    handleFormChange,
    sendTransaction,
    currentEthBalance,
    isLoading,
  } = useContext(TransactionsContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { addressTo, amount, keyword, message } = formData;

    if (!addressTo || !amount || !keyword || !message) {
      return;
    }

    sendTransaction(displayToast);
  };

  return (
    <section className="max-container padding-x padding-y h-screen-minus-navbar mx-auto flex flex-1 flex-col items-center justify-center lg:flex-row">
      <div className="flex w-full flex-1 justify-center">
        <div className=" flex w-[full] flex-col items-start justify-start md:w-auto">
          <h1 className="mb-4 text-5xl text-white">
            Send Crypto <br /> and a message <br /> across the world.
          </h1>
          <p className="mb-12 text-white">
            Genuine, tamper-proof, and beyond traditional bank flaws.
          </p>

          {!currentAccount && (
            <button
              className="mb-12 block w-full cursor-pointer rounded-full bg-[#2952e3] px-8 py-4 font-bold text-white hover:bg-[#2546bd] lg:hidden"
              onClick={() => connectWallet(displayToast)}
            >
              Connect Wallet
            </button>
          )}

          {currentAccount && (
            <button
              className="mb-12 block w-full cursor-pointer rounded-full bg-[#2952e3] px-8 py-4 font-bold text-white hover:bg-[#2546bd] lg:hidden"
              onClick={() => disconnectWallet(displayToast)}
            >
              {shortenAddress(currentAccount)}
            </button>
          )}

          <div className="mb-16 grid w-full grid-cols-2 self-center rounded-lg border border-slate-600 md:grid-cols-3 lg:self-start">
            <div className="rounded-tl-md border border-slate-600 px-4 py-8 text-center text-white">
              Reliability
            </div>
            <div className="border border-slate-600  px-4 py-8 text-center text-white">
              Security
            </div>
            <div className="rounded-tr border  border-slate-600 px-4 py-8 text-center text-white">
              Ethereum
            </div>

            <div className="rounded-bl border  border-slate-600 px-4 py-8 text-center text-white">
              Web 3.0
            </div>
            <div className="border border-slate-600  px-4 py-8 text-center text-white">
              Low Fees
            </div>
            <div className="rounded-br border  border-slate-600 px-4 py-8 text-center text-white">
              Blockchain
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-1 flex-col items-center">
        <div className="eth-card white-glassmorphism mb-12 flex h-[230px] w-full  max-w-md flex-col justify-between rounded-lg border md:w-96">
          <div className="flex h-14 w-full justify-between px-4 py-2 ">
            <div className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border p-2">
                <SiEthereum className="h-12 w-12 text-white" />
              </div>

              <p className="ml-2 font-bold text-white">
                {Number(currentEthBalance).toFixed(4)} ETH
              </p>
            </div>

            <BsInfoCircle className="h-6 w-6 text-white" />
          </div>

          <div className="flex w-full flex-col justify-between px-4 py-2">
            <p className="font-semibold text-white ">
              Ethereum MetaMask Address:
            </p>
            <p className="text-sm font-bold text-white">
              {currentAccount
                ? shortenAddress(currentAccount)
                : "Account disconnected"}
            </p>
          </div>
        </div>

        <div className="blue-glassmorphism flex w-full max-w-md flex-col items-center justify-start p-5 md:w-96">
          <Input
            type="text"
            placeholder="Address To"
            name="addressTo"
            value={formData.addressTo}
            onChange={handleFormChange}
          />
          <Input
            type="number"
            placeholder="Amount (ETH)"
            name="amount"
            value={formData.amount}
            onChange={handleFormChange}
          />
          <Input
            type="text"
            placeholder="GIF Keyword"
            name="keyword"
            value={formData.keyword}
            onChange={handleFormChange}
          />
          <Input
            type="text"
            placeholder="Enter Messages"
            name="message"
            value={formData.message}
            onChange={handleFormChange}
          />

          <div className="my-2 h-[1px] w-full bg-gray-400" />

          {isLoading ? (
            <Loader />
          ) : (
            <button
              onClick={handleSubmit}
              className="mt-2  flex w-full cursor-pointer items-center justify-center rounded-full border-[1px] border-[#3d4f7c] px-8 py-2 font-semibold text-white hover:bg-[#2952e3]"
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
