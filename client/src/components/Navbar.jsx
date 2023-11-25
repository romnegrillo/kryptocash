import { useState, useContext } from "react";

import { TransactionsContext } from "../context/TransactionsContext";

import shortenAddress from "../utils/shortenAddress";

import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { logo } from "../assets/images";

const navLinks = ["Home", "Transactions", "Services"];

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentAccount, connectWallet, disconnectWallet } =
    useContext(TransactionsContext);

  return (
    <nav className="max-container padding-x mx-auto flex items-center justify-between py-2">
      <div className="flex cursor-pointer items-center justify-center text-white">
        <div className="w-24">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        <h1 className="text-2xl capitalize tracking-widest">KRYPTOCASH</h1>
      </div>

      <ul className="hidden items-center justify-center gap-8 text-lg font-semibold text-white lg:flex">
        {navLinks.map((navLink, index) => (
          <li key={index} className="cursor-pointer">
            {navLink}
          </li>
        ))}

        {!currentAccount && (
          <li>
            <button
              className="hidden w-full cursor-pointer rounded-full bg-[#2952e3] px-4 py-2 font-semibold text-white hover:bg-[#2546bd] lg:block"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </li>
        )}

        {currentAccount && (
          <li>
            <button
              className="hidden w-full cursor-pointer rounded-full bg-[#2952e3] px-4 py-2 font-semibold text-white hover:bg-[#2546bd] lg:block"
              onClick={disconnectWallet}
            >
              {shortenAddress(currentAccount)}
            </button>
          </li>
        )}
      </ul>

      {!toggleMenu && (
        <HiMenuAlt4
          className="block h-12 w-8 cursor-pointer text-white lg:hidden"
          onClick={() => setToggleMenu(true)}
        />
      )}

      {toggleMenu && (
        <ul className="blue-glassmorphism absolute right-0 top-0 flex  h-screen w-3/4 flex-col items-center  justify-start text-lg font-semibold text-white shadow-2xl lg:hidden">
          <AiOutlineClose
            className="ml-8 mt-8 h-12 w-8 cursor-pointer self-start text-white"
            onClick={() => setToggleMenu(false)}
          />

          {navLinks.map((navLink, index) => (
            <li key={index} className="my-8 cursor-pointer">
              {navLink}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
