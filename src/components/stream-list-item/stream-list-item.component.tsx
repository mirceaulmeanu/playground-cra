import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText} from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import {IStream} from '../../services/streams-list/streams-list.service.interface';
import {useCallback} from 'react';
import {useServices} from '../../react-hooks/use-services.hook';
import {observer} from 'mobx-react';

interface IStreamListItemProps {
    stream: IStream;
    index: number;
}

export const StreamListItem: React.FC<IStreamListItemProps> = observer((props: IStreamListItemProps) => {
    const services = useServices();
    const {stream, index} = props;
    const editStream = useCallback(() => {
        services.streamForm.editStream(stream, index);
    }, [services.streamForm, stream, index]);
    
    const playStream = useCallback(() => {
        services.streamPlay.playStream(stream);
    }, [services.streamPlay, stream]);
    
    return <ListItem divider={true} secondaryAction={/* services.streamPlay.currentStream === stream ? null : */<IconButton aria-label="edit" onClick={editStream}>
            <EditIcon />
        </IconButton>
    }>
        <ListItemButton onClick={playStream} style={{padding: "0 16px 0 0"}}>
            <ListItemAvatar>
            <Avatar variant="square">
                {stream.image ? <img
                src={stream.image}
                style={{width: "100%"}}
                alt={`Logo ${stream.name}`}
                /> : stream.name.substring(0, 1).toUpperCase()}
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={stream.name} secondary={(services.streamPlay.currentStream === stream && stream.playMessage) ? stream.playMessage : stream.errorMessage} />
        </ListItemButton>
    </ListItem>
});