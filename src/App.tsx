import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Routes/appRouter";
import { ProductProvider } from "./context/productContext";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <AppRouter />
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
