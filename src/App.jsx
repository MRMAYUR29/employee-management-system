import AppRoutes from "./routes/AppRoutes";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
