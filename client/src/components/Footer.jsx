import { logo } from "../assets/images";

const footerLinks = [
  { label: "Home", link: "#home" },
  { label: "Transactions", link: "#transactions" },
  { label: "Services", link: "#services" },
];

const Footer = () => {
  return (
    <footer className="gradient-bg-footer p-4 pb-20" id="footer">
      <div className="container mx-auto">
        <div className="border-t-2"></div>
        <div className="mb-4 flex flex-col items-center justify-evenly p-4 md:mb-0 md:flex-row">
          <div className="flex justify-center md:flex-[0.5] md:items-center md:justify-start">
            <img src={logo} alt="logo" className="w-32" />
          </div>
          <div className="flex flex-1 justify-between gap-16">
            {footerLinks.map((footerLink, index) => (
              <a href={footerLink.link} key={index} className="cursor-pointer">
                <p className="cursor-pointer text-lg font-semibold text-white">
                  {footerLink.label}
                </p>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-white">
            Come join us @{" "}
            <span className="cursor-pointer underline">
              inquriy@kryptocash.com
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
