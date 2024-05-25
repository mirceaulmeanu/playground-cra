import React from 'react';
import {IServiceFactoryExtended} from './services/service-factory-extended.interface';
import CssBaseline from '@mui/material/CssBaseline';
import {Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import {TopBar} from './components/top-bar/top-bar.component';
import {PlayBar} from './components/play-bar/play-bar.component';
import {AppContainer} from './components/app-container/app-container.component';

interface IAppProps {
  services: IServiceFactoryExtended;
}

export function App(props: IAppProps) {
  return (
    <AppContainer>
      <CssBaseline />
      <TopBar />
      <Container style={{margin: "0", flexGrow: 1}}>
        <List>
          {props.services.streamsList.getList().map((stream, i) => <>
            {/* {!!i ? <Divider variant="inset" component="li" /> : null} */}
            <ListItem divider={true} secondaryAction={
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            }>
              <ListItemAvatar>
                <Avatar variant="square">
                  {stream.image ? <img
                    src={stream.image}
                    style={{width: "100%"}}
                    alt={`Logo ${stream.name}`}
                  /> : <ImageIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={stream.name} secondary={!i ? "Buffering ..." : undefined} />
              
            </ListItem>
          </>)}
        </List>
      </Container>
      <div style={{height: "2rem"}} />
      <PlayBar />
    </AppContainer>
  );
}
