import { Navbar, Hero, Services, Transactions, Footer } from "./components";

const App = () => {
  return (
    <>
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
