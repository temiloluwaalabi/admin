import React, { useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import profileImage from "../assets/Profileimg.png"
// import { useTheme } from '@emotion/react';
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme, useThemeProps } from '@mui/material';

const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
    user
}) => {
    const dispatch = useDispatch()
    const theme = useTheme();
    const [anchorEl, setAnchcorEl] = useState(null)
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchcorEl(event.currentTarget)
    const handleClose = () => setAnchcorEl(null)
    const isNonMobile = useMediaQuery("(min-width: 600px)")

    return <AppBar
        sx={{
            position: "static",
            background: "none",
            boxShadow: "none"
        }}
    >
        {/* LEFT SODE */}
        <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* LEFT SIDE */}
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <FlexBetween
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="9px"
                    gap="3rem"
                    p="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlined sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightModeOutlined sx={{ fontSize: "25px" }} />
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontSize: "25px" }} />
                </IconButton>

                <FlexBetween sx={{ flexDirection: isNonMobile ? "row" : "column"}}>
                    <Button
                        onClick={handleClick}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: isNonMobile ? "row" : "column" ,
                            alignItems: "center",
                            textTransform: "none",
                            gap: "1rem"
                        }}
                    >
                        <Box
                            component="img"
                            alt="profile"
                            src={profileImage}
                            height="40px"
                            width="40px"
                            borderRadius="50%"
                            sx={{ objectFit: "cover", display: !isNonMobile ? "none" : "flex" }}
                        />
                        <Box textAlign="left">
                            <Typography
                                fontWeight="bold"
                                fontSize="0.9rem"
                                sx={{ color: theme.palette.secondary[100] }}
                            >
                                {user.username}
                            </Typography>
                            <Typography
                                fontSize="0.8rem"
                                sx={{ color: theme.palette.secondary[200] }}
                            >
                                {user.lastname}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined
                            sx={{
                                color: theme.palette.secondary[300],
                                fontSize: "25px ",
                                display: !isNonMobile ? "none" : "flex"
                            }}
                        />
                    </Button>
                    <Menu  sx={{  }} anchorEl = {anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}} >
                        <MenuItem onclick={handleClose}>Log Out</MenuItem>
                    </Menu>

                </FlexBetween>
            </FlexBetween>

        </Toolbar>
    </AppBar>

}

export default Navbar