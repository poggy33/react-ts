import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next"; //i18next

const theme = createTheme();
interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<Props> = ({ isLoggedIn, setIsLoggedIn }) => {
  const { t } = useTranslation(); //i18n

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") === "admin" && data.get("password") === "12345") {
      localStorage.setItem("admin", "12345");
      setIsLoggedIn(true);
    } else {
      alert("Incorrect username or password");
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ width: "100%", minHeight: "calc(100vh - 168px)" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {t("signIn")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("username")}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: "white",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "rgba(14, 23, 36, 0.77)",
                },
              }}
            >
              {t("signIn")}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignIn;
