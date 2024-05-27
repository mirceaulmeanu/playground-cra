import {List} from '@mui/material';
import {useServices} from '../../react-hooks/use-services.hook';
import {StreamListItem} from '../stream-list-item/stream-list-item.component';
import {observer} from 'mobx-react';

// interface IStreamsListProps {
// }

export const StreamsList: React.FC = observer(() => {
    const services = useServices();
    return <List>
        {services.streamsList.streamsList.map((stream, index) => {
            // console.log(stream.name);
            return <StreamListItem stream={stream} index={index} key={index} />
        })}
    </List>;
})