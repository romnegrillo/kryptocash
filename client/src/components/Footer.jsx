import { logo } from '../assets/images';

const Footer = () => {
  return (
    <footer className="gradient-bg-footer p-4 pb-20">
      <div className="container mx-auto">
        <div className="border-t-2"></div>
        <div className="flex md:flex-row flex-col items-center p-4 justify-evenly mb-4 md:mb-0">
          <div className="flex md:flex-[0.5] justify-center md:justify-start md:items-center">
            <img src={logo} alt="logo" className="w-32" />
          </div>
          <div className="flex-1 flex justify-between gap-16">
            <p className="text-white text-lg font-semibold cursor-pointer">
              Home
            </p>
            <p className="text-white text-lg font-semibold cursor-pointer">
              Transactions
            </p>
            <p className="text-white text-lg font-semibold cursor-pointer">
              Services
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-white">
            Come join us @{' '}
            <span className="underline cursor-pointer">
              inquriy@kryptocash.com
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
