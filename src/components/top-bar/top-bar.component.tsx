import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from '@mui/icons-material/Settings';
import {HideOnScroll} from './hide-on-scroll.component';
import {useState} from 'react';
import {Drawer} from '../drawer/drawer.component';
import {Settings} from '../settings/settings.component';
import {MainMenu} from '../main-menu/main-menu.component';

interface ITopBarProps {}

export function TopBar(props: ITopBarProps) {
    let [leftMenuOpen, setLeftMenuOpen] = useState(false);
    let [rightMenuOpen, setRightMenuOpen] = useState(false);

    return <HideOnScroll><AppBar position="sticky" >
        <Toolbar>
        <IconButton
            size="large"
            // edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2 }}
            onClick={() => setLeftMenuOpen(true)}
        >
            <MenuIcon />
        </IconButton>
        <Drawer title="Menu" open={leftMenuOpen} onOpen={() => setLeftMenuOpen(true)} onClose={() => setLeftMenuOpen(false)} >
            <MainMenu />
        </Drawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <IconButton
            size="large"
            // edge="start"
            color="inherit"
            aria-label="settings"
            // sx={{ mr: 2 }}
            onClick={() => setRightMenuOpen(true)}
        >
            <SettingsIcon />
        </IconButton>
        <Drawer title="Settings"  anchor='right' open={rightMenuOpen} onOpen={() => setRightMenuOpen(true)} onClose={() => setRightMenuOpen(false)} >
            <Settings ></Settings>
        </Drawer>
        </Toolbar>
    </AppBar></HideOnScroll>
}