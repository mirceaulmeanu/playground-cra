// import styled from '@emotion/styled';
import {AppBar, Box, Fab, IconButton, Toolbar, styled} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {useServices} from '../../react-hooks/use-services.hook';
import {useCallback} from 'react';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });
  
interface IPlayBarProps {}

export function PlayBar(props: IPlayBarProps) {
    const services = useServices()
    const newStream = useCallback(() => {
        services.streamForm.newStream();
    }, [services.streamForm]);

    return <AppBar position="sticky" enableColorOnDark sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
        <StyledFab color="secondary" aria-label="add">
            <AddIcon onClick={newStream} />
        </StyledFab>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" size="large">
            <SkipPreviousIcon />
        </IconButton>
        <IconButton color="inherit" size="large">
            <PlayArrowIcon fontSize="large" />
            {/* <PauseIcon /> */}
        </IconButton>
        <IconButton color="inherit" size="large">
            <SkipNextIcon />
        </IconButton>
        </Toolbar>
    </AppBar>
}