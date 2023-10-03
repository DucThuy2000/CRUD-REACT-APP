import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Create from "./pages/Create";

function App() {
  return (
    <Container maxWidth="md" sx={{ marginTop: '20px' }}>
      <Create></Create>
    </Container>
  );
}

export default App;
