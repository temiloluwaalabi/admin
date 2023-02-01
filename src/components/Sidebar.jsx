import React from 'react'
import logo from "../assets/logo.png"
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
    useThemeProps
} from "@mui/material"

import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlineOutlined,
    PointOfSaleOutlined,
    PieChartOutlined,
    BookOnlineOutlined,
    Person2Outlined
} from '@mui/icons-material';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from "../assets/Profileimg.png";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Courses",
        icon: <BookOnlineOutlined />,
    },
    {
        text: "Users",
        icon: <Person2Outlined />,
    },
    {
        text: "Add Courses",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Add Users",
        icon: <CalendarMonthOutlined />,
    },
    // {
    //     text: "Modules",
    //     icon: <ReceiptLongOutlined />,
    // },
    // {
    //     text: "Overview",
    //     icon: <PublicOutlined />,
    // },
    // {
    //     text: "Creation",
    //     icon: null,
    // },
    
    // {
    //     text: "Add Modules",
    //     icon: <TodayOutlined />,
    // },
   
    // {
    //     text: "Update",
    //     icon: <PieChartOutlined />,
    // },
    // {
    //     text: "Management",
    //     icon: null,
    // },
    // {
    //     text: "Settings",
    //     icon: <AdminPanelSettingsOutlined />,
    // },
    // {
    //     text: "Website Settings",
    //     icon: <TrendingUpOutlined />,
    // },
];

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
    user
}) => {
    const { pathname } = useLocation()
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme()

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])
    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 2rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" justifyContent="center" alignItems="center" gap="0.5rem">
                                    <img src={logo} width="150px"  />
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 2rem" }}>
                                            {text}
                                        </Typography>
                                    )
                                }
                                const lcText = text.toLowerCase();
                                const first = lcText.split(" ")[0];
                                const sec = lcText.split(" ")[1];
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                if(sec){
                                                    navigate(`/${first}-${sec}`)
                                                }else{
                                                    navigate(`/${lcText}`);
                                                }
                                                setActive(lcText)
                                            }}
                                            sx={{
                                                backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                                color: active === lcText
                                                    ? theme.palette.primary[600]
                                                    : theme.palette.secondary[100]
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "1rem",
                                                    color: active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[100]


                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}

                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                    <Box position="" sx={{mb:"1rem", mt:"auto"}} bottom="2rem">
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 2rem">
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
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
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px ",
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar