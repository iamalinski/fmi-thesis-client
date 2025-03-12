import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SecurityIcon from "@mui/icons-material/Security";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { useUpdatePersonalInfo } from "@hooks/profile/useProfile";
import PersonalInfo from "@components/profile/PersonalInfo";

// TabPanel component for handling tab content
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    eik: "",
    vatNumber: "",
    address: "",
    phone: "",
    email: "",
    bankName: "",
    bankAccount: "",
    mol: "",
  });

  const [securityInfo, setSecurityInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Update state when user data is loaded
  useEffect(() => {
    if (user) {
      // If user has associated company data, populate the company info
      if (user.company) {
        setCompanyInfo({
          name: user.company.name || "",
          eik: user.company.eik || "",
          vatNumber: user.company.vat_number || "",
          address: user.company.address || "",
          phone: user.company.phone || "",
          email: user.company.email || "",
          bankName: user.company.bank_name || "",
          bankAccount: user.company.bank_account || "",
          mol: user.company.mol || "",
        });
      }
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };



  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSecurityInfoChange = (e) => {
    const { name, value } = e.target;
    setSecurityInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveCompanyInfo = () => {
    // TODO: Save company info API call
    console.log("Saving company info:", companyInfo);
  };

  const handleChangePassword = () => {
    // TODO: Change password API call
    console.log("Changing password:", securityInfo);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <IconButton
          edge="start"
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Профил и настройки
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="profile tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                minWidth: 120,
                py: 2,
              },
            }}
          >
            <Tab
              icon={<PersonIcon />}
              label="Лична информация"
              iconPosition="start"
            />
            <Tab icon={<BusinessIcon />} label="Фирма" iconPosition="start" />
            <Tab
              icon={<SecurityIcon />}
              label="Сигурност"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Personal Information Tab */}
        <TabPanel value={tabValue} index={0}>
          <PersonalInfo />
        </TabPanel>

        {/* Company Information Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                Информация за фирмата
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Тези данни ще се използват за генериране на фактурите
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Име на фирмата"
                name="name"
                value={companyInfo.name}
                onChange={handleCompanyInfoChange}
                variant="outlined"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ЕИК"
                name="eik"
                value={companyInfo.eik}
                onChange={handleCompanyInfoChange}
                variant="outlined"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ДДС номер"
                name="vatNumber"
                value={companyInfo.vatNumber}
                onChange={handleCompanyInfoChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Адрес"
                name="address"
                value={companyInfo.address}
                onChange={handleCompanyInfoChange}
                variant="outlined"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Телефон"
                name="phone"
                value={companyInfo.phone}
                onChange={handleCompanyInfoChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Имейл"
                name="email"
                type="email"
                value={companyInfo.email}
                onChange={handleCompanyInfoChange}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mt: 1, mb: 3 }} />
              <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                Банкова информация
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Банка"
                name="bankName"
                value={companyInfo.bankName}
                onChange={handleCompanyInfoChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IBAN"
                name="bankAccount"
                value={companyInfo.bankAccount}
                onChange={handleCompanyInfoChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="МОЛ"
                name="mol"
                value={companyInfo.mol}
                onChange={handleCompanyInfoChange}
                variant="outlined"
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveCompanyInfo}
                sx={{ mt: 2 }}
              >
                Запази промените
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                Промяна на парола
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                За да промените паролата си, въведете текущата и новата парола
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Текуща парола"
                name="currentPassword"
                type="password"
                value={securityInfo.currentPassword}
                onChange={handleSecurityInfoChange}
                variant="outlined"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Нова парола"
                name="newPassword"
                type="password"
                value={securityInfo.newPassword}
                onChange={handleSecurityInfoChange}
                variant="outlined"
                size="small"
                required
                helperText="Минимум 8 символа, включително букви и цифри"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Потвърди новата парола"
                name="confirmPassword"
                type="password"
                value={securityInfo.confirmPassword}
                onChange={handleSecurityInfoChange}
                variant="outlined"
                size="small"
                required
                error={
                  securityInfo.newPassword !== securityInfo.confirmPassword &&
                  securityInfo.confirmPassword !== ""
                }
                helperText={
                  securityInfo.newPassword !== securityInfo.confirmPassword &&
                  securityInfo.confirmPassword !== ""
                    ? "Паролите не съвпадат"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleChangePassword}
                sx={{ mt: 2 }}
                disabled={
                  !securityInfo.currentPassword ||
                  !securityInfo.newPassword ||
                  securityInfo.newPassword !== securityInfo.confirmPassword
                }
              >
                Смени паролата
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
}
