import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TransactionsProvider } from "./context/TransactionsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TransactionsProvider>
    <App />
  </TransactionsProvider>,
);
