import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
} from "@mui/material";
import { ROUTES } from "../Routes";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const settings = ["Profile", "Logout"];
const capitalize = (str) => {
  if (!str) return "";
  return str?.charAt(0).toUpperCase() + str.slice(1);
};

export default function Navbar() {
  const [currentUser, setUser] = useState("");
  const userData = useSelector((state) => state.userAuth);
  const { user } = userData;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (path, item) => {
    setAnchorElUser(null);
    if (item === "LogOut") {
      localStorage.clear();
      navigate(path);
    }
    navigate(path);
  };

  const setHandleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const firstname = capitalize(currentUser.firstname);
  const lastname = capitalize(currentUser.lastname);
  useEffect(() => {
    setUser(userData.user);
    console.log(userData);
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LIBRARY
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {ROUTES.filter((route) => route.onNavbar == true).map(
                  ({ path, item }) => (
                    <MenuItem key={path} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{item}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {ROUTES.filter((route) => route.onNavbar).map(
                ({ isPrivate, path, item, isAdmin, role }) => {
                  return (
                    isPrivate &&
                    role === user?.isUser && (
                      <Button
                        component={Link}
                        to={path}
                        key={path}
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          mx: 2,
                          color: "white",
                          display: "block",
                        }}
                      >
                        {item}
                      </Button>
                    )
                  );
                }
              )}
            </Box>
            <Typography
              variant="h6"
              mx={2}
              display={{ xs: "none", md: "flex" }}
            >
              {firstname} {lastname}
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, border: "2px solid white" }}
                >
                  <Avatar alt="Remy Sharp" src={currentUser.profilepic} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={setHandleCloseUserMenu}
              >
                {ROUTES.filter(
                  ({ onNavbar, role }) => !onNavbar && role === user?.isUser
                ).map(({ item, path }) => (
                  <MenuItem
                    key={item}
                    onClick={() => {
                      handleCloseUserMenu(path, item);
                    }}
                  >
                    <Typography textAlign="center">{item}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={() => handleLogout()}>
                  <Typography textAlign="center">{"LogOut"}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
