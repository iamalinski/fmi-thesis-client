import { Route, Routes } from "react-router-dom";

// components
import Dashboard from "@pages/dashboard";
import Login from "@pages/login";
import NotAuthorized from "@pages/errors/NotAuthorized";
import NotFound from "@pages/errors/NotFound";
// import ServerError from "@pages/errors/ServerError";
import AuthRoute from "@components/routes/AuthRoute";
import PublicRoute from "@components/routes/PublicRoute";
import Invoices from "@pages/invoices";
import Invoice from "@pages/invoices/Invoice";
import Sales from "@pages/sales";
import Settings from "@pages/settings";

// styles
import "@assets/scss/app.scss";

function App() {
  const isAuthenticated = true;

  return (
    <Routes>
      {/* Root Route - Redirects based on authentication */}
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />

      {/* Public Routes */}
      <Route
        element={<PublicRoute isAuthenticated={isAuthenticated} />}
      ></Route>

      {/* Protected Routes */}
      <Route element={<AuthRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/new" element={<Invoice />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Error Routes */}
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
