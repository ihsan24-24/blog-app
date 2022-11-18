import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { IsLogin, singOut } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";

const NavbarComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [nowUser, setNowUSer] = useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    IsLogin(setNowUSer);
  }, []);
  const handleLogin = () => {
    navigate("/");
    handleClose();
  };
  const handleLogout = () => {
    singOut(setNowUSer);
    handleClose();
    navigate("/");
  };
  const handleNewPost = () => {
    handleClose();
    navigate("/newpost");
  };
  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleNewPost}>New Post</MenuItem>
                {nowUser && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
                {!nowUser && <MenuItem onClick={handleLogin}>Login</MenuItem>}
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarComp;
