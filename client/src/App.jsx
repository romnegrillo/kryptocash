import { Navbar, Hero, Services, Transactions, Footer } from "./components";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="gradient-bg-welcome relative">
        <Navbar />
        <Hero />
      </div>

      <Transactions />
      <Services />
      <Footer />
    </>
  );
};

export default App;
