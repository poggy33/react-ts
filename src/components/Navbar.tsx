import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

import i18n from "../i18n"; //i18next
import { useTranslation } from "react-i18next"; //i18next

const MyLanguageButton = styled(Button)(() => ({
  color: "red",
  minWidth: "30px",
  fontSize: "0.7rem",
}));

const BasicMenu = ({ isLoggedIn }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation(); //i18n
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/");
          }}
        >
          {t("home")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("news");
          }}
        >
          {t("news")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            if (isLoggedIn) {
              navigate("/profile");
            } else {
              navigate("/");
            }
          }}
        >
          {t("profile")}
        </MenuItem>
      </Menu>
    </div>
  );
};

interface Props {
  matches: any;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({ isLoggedIn, setIsLoggedIn, matches }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(); //i18n

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgb(14,23,36)", height: "64px" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {matches ? (
              <Box>
                <Button color="inherit" onClick={() => navigate("/")}>
                  {t("home")}
                </Button>
                <Button color="inherit" onClick={() => navigate("/news")}>
                  {t("news")}
                </Button>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                  {t("profile")}
                </Button>
              </Box>
            ) : (
              <BasicMenu isLoggedIn={isLoggedIn} />
            )}
          </Typography>
          <MyLanguageButton onClick={() => i18n.changeLanguage("en")}>
            en
          </MyLanguageButton>
          <Box sx={{ border: "1px solid silver", height: "15px" }}></Box>
          <MyLanguageButton onClick={() => i18n.changeLanguage("ua")}>
            ua
          </MyLanguageButton>
          <Box sx={{ minWidth: "100px" }}>
            {!isLoggedIn ? (
              <Button
                color="inherit"
                sx={{ marginLeft: "20px" }}
                onClick={() => navigate("/login")}
              >
                {t("login")}
              </Button>
            ) : (
              <Button
                color="inherit"
                sx={{ marginLeft: "20px" }}
                onClick={() => {
                  localStorage.removeItem("admin");
                  setIsLoggedIn(false);
                  navigate("/");
                }}
              >
                {t("logout")}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
