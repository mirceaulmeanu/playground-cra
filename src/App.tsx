import React from 'react';
import {IServiceFactoryExtended} from './services/service-factory-extended.interface';
import CssBaseline from '@mui/material/CssBaseline';
import {Container} from '@mui/material';
import {TopBar} from './components/top-bar/top-bar.component';
import {PlayBar} from './components/play-bar/play-bar.component';
import {AppContainer} from './components/app-container/app-container.component';
import {StreamsList} from './components/streams-list/streams-list.component';

interface IAppProps {
  services: IServiceFactoryExtended;
}

export function App(props: IAppProps) {
    return (
        <AppContainer>
            <CssBaseline />
            <TopBar />
            <Container style={{margin: "0", flexGrow: 1}}>
                <StreamsList />
            </Container>
            <div style={{height: "2rem"}} />
            <PlayBar />
        </AppContainer>
    );
}
