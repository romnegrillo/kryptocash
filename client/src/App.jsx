import { Navbar, Hero, Services, Transactions, Footer } from './components';

const App = () => {
  return (
    <div>
      <div className="relative gradient-bg-welcome min-h-screen">
        <Navbar />
        <Hero />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
