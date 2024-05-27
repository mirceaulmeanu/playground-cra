import {List} from '@mui/material';
import {useServices} from '../../react-hooks/use-services.hook';
import {StreamListItem} from '../stream-list-item/stream-list-item.component';

interface IStreamsListProps {
}

export function StreamsList (props: IStreamsListProps) {
    const services = useServices();
    return <List>
        {services.streamsList.getList().map((stream, index) => 
            <StreamListItem stream={stream} index={index} key={index} />
        )}
    </List>
}