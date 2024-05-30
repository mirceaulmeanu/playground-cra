import {Box, ListItemIcon, ListItemText, MenuItem, MenuList} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useCallback} from "react";
import {useServices} from "../../react-hooks/use-services.hook";

export function MainMenu() {
    const services = useServices();
    const newStream = useCallback(() => {
        services.streamForm.newStream();
    }, [services.streamForm]);
    return <Box sx={{m: 2}}>
        <MenuList id="basic-menu">
            <MenuItem onClick={newStream}>
                <ListItemIcon>
                    <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>ADD NEW STREAM</ListItemText>
            </MenuItem>
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
        </ul>
    </Box>;
}