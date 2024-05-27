import React from 'react';
import {IServiceFactoryExtended} from './services/service-factory-extended.interface';
import CssBaseline from '@mui/material/CssBaseline';
import {Container, ThemeProvider, createTheme, useMediaQuery} from '@mui/material';
import {TopBar} from './components/top-bar/top-bar.component';
import {PlayBar} from './components/play-bar/play-bar.component';
import {AppContainer} from './components/app-container/app-container.component';
import {StreamsList} from './components/streams-list/streams-list.component';
import {StreamForm} from './components/stream-form/stream-form.component';

interface IAppProps {
  services: IServiceFactoryExtended;
}

export function App(props: IAppProps) {
    /**
     * TODO: Move preffered color scheme to a service
     */
    const preferredColorScheme: 'dark' | 'light' | undefined = 'light';
    const systemColorScheme = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : "light";
    const theme = createTheme({
        palette: {
          mode: preferredColorScheme || systemColorScheme,
        },
      });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContainer>
                <TopBar />
                <Container style={{margin: "0 auto", flexGrow: 1}}>
                    <StreamsList />
                </Container>
                <div style={{height: "2rem", flexShrink: 0}} />
                <PlayBar />
                <StreamForm />
            </AppContainer>
        </ThemeProvider>
    );
}
