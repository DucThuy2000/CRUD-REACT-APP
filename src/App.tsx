import { AlertProvider } from "./context/AlertContext";
import { LoadingProvider } from "./context/LoadingContext";
import Route from "./routes";

function App() {
  return (
    <LoadingProvider>
      <AlertProvider>
        <Route />
      </AlertProvider>
    </LoadingProvider>
  );
}

export default App;
