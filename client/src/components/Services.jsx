import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const Services = () => {
  return (
    <section className="gradient-bg-services">
      <div className="container mx-auto flex flex-col lg:flex-row p-8">
        <div className="flex-1 flex justify-center items-center mb-8">
          <h2 className="text-white text-5xl">
            Services that we
            <br />
            continue to improve.
          </h2>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <ServiceCard
            title="Security guaranteed"
            subTitle="Security is guaranteed. We always maintain privacy and maintain the quality of the products."
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            color={'bg-[#2952e3]'}
          />

          <ServiceCard
            title="Best exchange rates"
            subTitle="Enjoy competitive exchange rates. We constantly monitor the market to ensure you get the best value for your crypto transactions."
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            color={'bg-[#8945f8]'}
          />

          <ServiceCard
            title="Security Guaranteed"
            subTitle="Experience lightning-fast transactions. Our optimized processing ensures your crypto transfers are swift and hassle-free."
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            color={'bg-[#f84550]'}
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, subTitle, icon, color }) => {
  return (
    <div className="white-glassmorphism w-full flex justify-center items-center py-4 px-8 gap-8">
      <div
        className={`w-10 h-10 flex justify-center items-center ${color} rounded-full`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="text-white text-lg mb-2 font-semibold">{title}</h3>
        <p className="text-white">{subTitle}</p>
      </div>
    </div>
  );
};
export default Services;

