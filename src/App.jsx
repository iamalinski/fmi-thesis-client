import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme/theme";

// components
import Dashboard from "@pages/dashboard";
import Login from "@pages/login";
import NotAuthorized from "@pages/errors/NotAuthorized";
import NotFound from "@pages/errors/NotFound";
import AuthRoute from "@components/routes/AuthRoute";
import PublicRoute from "@components/routes/PublicRoute";
import Invoices from "@pages/invoices";
import Invoice from "@pages/invoices/Invoice";
import Sales from "@pages/sales";
import Settings from "@pages/settings";
import Articles from "@pages/articles";

// styles
import "@assets/scss/app.scss";

function App() {
  const isAuthenticated = true;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/new" element={<Invoice />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/articles" element={<Articles />} />
        </Route>

        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
