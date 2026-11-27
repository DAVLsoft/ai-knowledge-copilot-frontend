import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/templates/Layout";
import { DocumentsPage } from "./pages/DocumentsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/documents" replace />} />
          <Route path="documents" element={<DocumentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
