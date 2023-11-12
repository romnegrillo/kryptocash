import { useState } from 'react';

import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { logo } from '../assets/images';

const navLinks = ['Home', 'Transactions', 'Services'];

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="max-container mx-auto p-8 flex justify-between items-center">
      <div className="flex justify-center items-center text-white  cursor-pointer">
        <div className="w-24">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        <h1 className="text-2xl tracking-widest">KRYPTOCASH</h1>
      </div>

      <ul className="justify-center items-center gap-8 font-semibold text-lg text-white lg:flex hidden">
        {navLinks.map((navLink, index) => (
          <li key={index} className="cursor-pointer">
            {navLink}
          </li>
        ))}
      </ul>

      {!toggleMenu && (
        <HiMenuAlt4
          className="text-white w-8 h-12 lg:hidden block cursor-pointer"
          onClick={() => setToggleMenu(true)}
        />
      )}

      {toggleMenu && (
        <ul className="absolute right-0 top-0 h-screen w-1/2  flex-col justify-start blue-glassmorphism items-center  shadow-2xl font-semibold text-lg text-white lg:hidden flex">
          <AiOutlineClose
            className="text-white w-8 h-12 mt-8 self-start ml-8 cursor-pointer"
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
