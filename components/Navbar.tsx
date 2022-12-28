import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../public/Layer 1.png"
import Image from "next/image";
import {createTheme, ThemeProvider} from "@mui/material";
import {alpha} from "@mui/material/styles";
import {useRouter} from "next/router";

const pages = ['Flight Search', 'Contact', 'About Us'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const router = useRouter();
    const handleClick = (page: string) => {
        if (page === "Flight Search") {
            router.push("/search");
        }
        if (page === "Contact") {
            router.push("/contact");
        }
        if (page === "About Us") {
            router.push("/about");
        }
        handleCloseNavMenu();
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: alpha("rgb(255,255,255)", .5)
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static" color={"primary"}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Image src={Logo} alt={"Logo"} style={{
                        width: "5vh",
                        height: "5vh",
                        marginRight: "1em",
                    }}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        MileWise
                    </Typography>


                    <Typography
                        variant="h5"
                        noWrap
                        onClick={() => router.push("/")}
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        MileWise
                    </Typography>
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'flex-end',

                    }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleClick(page)}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'flex', md: 'none' },
                        justifyContent: "flex-end"



                    }}>
                        <IconButton
                            size="large"
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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} >
                                    <Button
                                        key={page}
                                        onClick={() => handleClick(page)}
                                        sx={{ my: 2, color: 'black', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    );
}
export default ResponsiveAppBar;