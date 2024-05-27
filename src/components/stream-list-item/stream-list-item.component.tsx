import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import {IStream} from '../../services/streams-list/streams-list.service.interface';
import {useCallback} from 'react';
import {useServices} from '../../react-hooks/use-services.hook';

interface IStreamListItemProps {
    stream: IStream;
    index: number;
}

export const StreamListItem: React.FC<IStreamListItemProps> = (props: IStreamListItemProps) => {
    const services = useServices();
    const {stream, index} = props;
    const editStream = useCallback(() => {
        services.streamForm.editStream(stream, index);
    }, [services.streamForm, stream, index]);
    return <ListItem divider={true} secondaryAction={
        <IconButton aria-label="edit" onClick={editStream}>
            <EditIcon />
        </IconButton>
    }>
        <ListItemButton>
            <ListItemAvatar>
            <Avatar variant="square">
                {stream.image ? <img
                src={stream.image}
                style={{width: "100%"}}
                alt={`Logo ${stream.name}`}
                /> : <ImageIcon />}
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={stream.name} secondary={!index ? "Buffering ..." : undefined} />
        </ListItemButton>
    </ListItem>
};