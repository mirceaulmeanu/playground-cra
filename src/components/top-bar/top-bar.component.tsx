import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from '@mui/icons-material/Settings';

interface ITopBarProps {}

export function TopBar(props: ITopBarProps) {
    return <AppBar position="sticky" >
        <Toolbar>
        <IconButton
            size="large"
            // edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2 }}
        >
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <IconButton
            size="large"
            // edge="start"
            color="inherit"
            aria-label="settings"
            // sx={{ mr: 2 }}
        >
            <SettingsIcon />
        </IconButton>
        </Toolbar>
    </AppBar>
}