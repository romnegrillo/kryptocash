import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const Services = () => {
  return (
    <section className="gradient-bg-services">
      <div className="padding-x max-container mx-auto flex flex-col py-24 ">
        <div className="mb-16 flex flex-1 items-center justify-center">
          <h2 className="text-5xl text-white">
            Services that we
            <br />
            continue to improve.
          </h2>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-4 xl:flex-row">
          <ServiceCard
            title="Security guaranteed"
            subTitle="Security is guaranteed. We always maintain privacy and maintain the quality of the products."
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            color={"bg-[#2952e3]"}
          />

          <ServiceCard
            title="Best exchange rates"
            subTitle="Enjoy competitive exchange rates. We constantly monitor the market to ensure you get the best value for your crypto transactions."
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            color={"bg-[#8945f8]"}
          />

          <ServiceCard
            title="Security Guaranteed"
            subTitle="Experience lightning-fast transactions. Our optimized processing ensures your crypto transfers are swift and hassle-free."
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            color={"bg-[#f84550]"}
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, subTitle, icon, color }) => {
  return (
    <div className="white-glassmorphism flex h-60 w-full flex-1 flex-col items-center justify-center gap-8  px-4 py-8 md:h-72">
      <div
        className={`flex h-10 w-10 items-center justify-center ${color} rounded-full`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="mb-4 text-center text-xl font-semibold  text-white">
          {title}
        </h3>
        <p className="text-center text-white">{subTitle}</p>
      </div>
    </div>
  );
};
export default Services;
