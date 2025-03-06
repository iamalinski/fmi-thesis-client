import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// components
import Dashboard from "@pages/dashboard";
import Login from "@pages/login";
import Register from "@pages/register";
import NotAuthorized from "@pages/errors/NotAuthorized";
import NotFound from "@pages/errors/NotFound";
import AuthRoute from "@components/routes/AuthRoute";
import PublicRoute from "@components/routes/PublicRoute";
import Invoices from "@pages/invoices";
import Invoice from "@pages/invoices/Invoice";
import InvoicePreview from "@pages/invoices/InvoicePreview";
// import Sales from "@pages/sales";
// import Sale from "@pages/sales/Sale";
import Articles from "@pages/articles";
import Article from "@pages/articles/Article";
import Clients from "./pages/clients";
import Profile from "./pages/profile";

// styles
import "@assets/scss/app.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const isAuthenticated = false;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AuthRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/new" element={<Invoice />} />
            <Route path="/invoices/:id" element={<InvoicePreview />} />
            <Route path="/invoices/edit/:id" element={<Invoice />} />
            {/* <Route path="/sales" element={<Sales />} />
          <Route path="/sales/new" element={<Sale />} /> */}
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/new" element={<Article />} />
            <Route path="/articles/edit/:id" element={<Article />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
