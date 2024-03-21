import "./App.module.scss";
import Incident from "./components/Incident";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IncidentState from "./context/incidents/IncidentState";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <IncidentState>
        <QueryClientProvider client={queryClient}>
          <Incident />
        </QueryClientProvider>
      </IncidentState>
    </>
  );
}

export default App;
