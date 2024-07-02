import {Box, ListItemIcon, ListItemText, MenuItem, MenuList} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import {useCallback} from "react";
import {useServices} from "../../react-hooks/use-services.hook";

export function MainMenu() {
    const services = useServices();
    const newStream = useCallback(() => {
        services.streamForm.newStream();
    }, [services.streamForm]);
    const skipWaitingNewWorker = useCallback(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
                if (registration.waiting) {
                    // send the skip message to kick off the service worker install.
                    registration.waiting.postMessage('SKIP_WAITING');
                }
            });
          }
    }, []);
    return <Box sx={{m: 2}}>
        <MenuList id="basic-menu">
            <MenuItem onClick={newStream}>
                <ListItemIcon>
                    <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>ADD NEW STREAM</ListItemText>
            </MenuItem>
            { services.serviceWorker.isNewServiceWaiting ? <MenuItem onClick={skipWaitingNewWorker}>
                <ListItemIcon>
                    <UpdateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>UPDATE SERVICE WORKER</ListItemText>
            </MenuItem> : null }
        </MenuList>
        <p></p>
        <p>Need to implement</p>
        <ul>
            <li>List reorder with drag and drop</li>
            <li>ICY metadata</li>
            <li>Nicer play-bar with slide up animation</li>
            <li>Usability in mobile landscape / very small viewports</li>
            <li>Add list export/import capability</li>
            <li>Add PWA</li>
            <li>Add validation for https:// stream and image url</li>
            <li>Change the update button from the menu to also a notification</li>
        </ul>
    </Box>;
}