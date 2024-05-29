// import styled from '@emotion/styled';
import {AppBar, Avatar, Box, Fab, IconButton, Slider, Toolbar, Typography, styled, useTheme} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {useServices} from '../../react-hooks/use-services.hook';
import {useCallback} from 'react';
import {observer} from 'mobx-react';
import {LoadingBox} from './boxes/loading.box';
import {AspectRatioContainer} from '../aspect-ratio-container.component';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -50,
    left: 0,
    right: 0,
    margin: '0 auto',
  });
  
interface IPlayBarProps {}

export const PlayBar: React.FC<IPlayBarProps> = observer((props: IPlayBarProps) => {
    const services = useServices();
    const theme = useTheme();
    const newStream = useCallback(() => {
        services.streamForm.newStream();
    }, [services.streamForm]);
    const handleCurrentStream = useCallback(() => {
        const currentStream = services.streamPlay.currentStream;
        if (!currentStream) { return; }
        if (services.streamPlay.isCurrentStreamPlaying() || services.streamPlay.isCurrentStreamLoading() || services.streamPlay.isCurrentStreamBuffering()) {
            services.streamPlay.pauseStream();
            return;
        }
        if (services.streamPlay.isCurrentStreamIdle() || services.streamPlay.isCurrentStreamPaused() || services.streamPlay.isCurrentStreamError()) {
            services.streamPlay.playStream();
            return;
        }
    }, [services.streamPlay]);
    
    const previousStream = useCallback(() => {
        const currentStream = services.streamPlay.currentStream;
        if (!currentStream) { return; }
        const currentIndex = services.streamsList.list.indexOf(currentStream);
        if (currentIndex > 0) {
            services.streamPlay.playStream(services.streamsList.list[currentIndex - 1]);
        }
    }, [services.streamPlay, services.streamsList]);
    
    const nextStream = useCallback(() => {
        const currentStream = services.streamPlay.currentStream;
        if (!currentStream) { return; }
        const currentIndex = services.streamsList.list.indexOf(currentStream);
        if (currentIndex < services.streamsList.list.length - 1) {
            services.streamPlay.playStream(services.streamsList.list[currentIndex + 1]);
        }
    }, [services.streamPlay, services.streamsList]);
    
    const stopStream = useCallback(() => {
        services.streamPlay.stop();
    }, [services.streamPlay]);

    const handleVolumeChange = useCallback((event: Event, newValue: number | number[]) => {
        services.streamPlay.volume = newValue as number;
    }, [services.streamPlay]);
    

    return <AppBar position="sticky" sx={{ top: 'auto', bottom: 0 }}>
        <StyledFab
            color={services.streamPlay.currentStream ? undefined : "secondary"}
            aria-label={services.streamPlay.currentStream ? 'stop' : 'add'}
            size={services.streamPlay.currentStream ? 'small' : 'large'}
        >
            {services.streamPlay.currentStream ? <StopIcon onClick={stopStream} /> : <AddIcon onClick={newStream} />}
        </StyledFab>
        { services.streamPlay.currentStream ? <>
            { services.streamPlay.currentStream.image ? <div style={{width: "50%", maxWidth: "300px", margin: "1rem auto 0"}}>
                <AspectRatioContainer width={1} height={1}>
                    <Avatar variant="square" sx={{width: "100%", height: "100%"}}>
                        <img
                            src={services.streamPlay.currentStream.image}
                            style={{width: "100%"}}
                            alt={`Logo ${services.streamPlay.currentStream.name}`}
                        />
                    </Avatar>
                </AspectRatioContainer>
            </div> : null }
        <Box>
            <Typography align='center' margin="1rem">{services.streamPlay.currentStream.name}</Typography>
        </Box>
        <Toolbar>
            { services.streamPlay.isCurrentStreamLoading() ? <LoadingBox /> : null }
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" size="large" onClick={previousStream}>
                <SkipPreviousIcon/>
            </IconButton>
            <IconButton color="inherit" size="large" onClick={handleCurrentStream}>
                {
                    services.streamPlay.isCurrentStreamPlaying() || services.streamPlay.isCurrentStreamLoading() || services.streamPlay.isCurrentStreamBuffering() ?
                    <PauseIcon fontSize="large" /> :
                    <PlayArrowIcon fontSize="large" />
                }
            </IconButton>
            <IconButton color="inherit" size="large" onClick={nextStream}>
                <SkipNextIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
        <Toolbar >
            <VolumeDownIcon htmlColor='#ccc' sx={{mx: 2}} />
            <Slider
                aria-label="volume" value={services.streamPlay.volume} onChange={handleVolumeChange} min={0} max={1} step={0.05}
                sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
                }}
            />
            <VolumeUpIcon htmlColor='#ccc' sx={{mx: 2}} />
        </Toolbar>
        </> : null }
        
    </AppBar>
});
