import {IconButton, SwipeableDrawer, Toolbar, Typography, styled} from "@mui/material";
import {PropsWithChildren} from "react";
import CloseIcon from '@mui/icons-material/Close';

const DrawerContent = styled('div')`
    width: 100dvw;
    max-width: 460px;
    min-height: 100%;
`;

interface IDrawerProps {
    title: string;
    anchor?: "top" | "right" | "bottom" | "left" | undefined
    open: boolean;
    onOpen: React.ReactEventHandler<{}>;
    onClose: React.ReactEventHandler<{}>;
}

export function Drawer(props: PropsWithChildren<IDrawerProps>) {
    return <SwipeableDrawer anchor={props.anchor} open={props.open} onOpen={props.onOpen} onClose={props.onClose} >
        <DrawerContent>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {props.title}
                </Typography>
                <IconButton
                    size="large"
                    // edge="start"
                    color="inherit"
                    aria-label="menu"
                    // sx={{ mr: 2 }}
                    onClick={props.onClose}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            {props.children}
        </DrawerContent>
    </SwipeableDrawer>;
}