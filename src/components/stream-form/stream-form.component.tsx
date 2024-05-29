import {useServices} from "../../react-hooks/use-services.hook"
import {observer} from "mobx-react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, TextField} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {runInAction} from "mobx";
import {IStream} from "../../services/streams-list/streams-list.service.interface";

const emptyStream = {name: "", url: "", image: ""};

export const StreamForm: React.FC = observer(() => {
    const services = useServices();

    let [localStream, setLocalStream] = useState<IStream>(emptyStream);

    const handleClose = useCallback(() => {
        services.streamForm.close();
    }, [services.streamForm]);

    const handleDelete = useCallback(() => {
        services.streamsList.removeStream(services.streamForm.stream!);
        services.streamForm.close();
    }, [services.streamForm, services.streamsList]);

    useEffect(() => {
        if (services.streamForm.stream) {
            setLocalStream({ ...services.streamForm.stream });
        } else {
            setLocalStream(emptyStream);
        }
    }, [services.streamForm.stream]);

    // actual rendering starts here

    if (!services.streamForm.modalOpen) {
        return null;
    }

    return <Dialog open={true}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                if (services.streamForm.stream) {
                    services.streamsList.updateStream(services.streamForm.stream, { ...localStream });
                } else {
                    services.streamsList.addStream({ ...localStream });
                }
                handleClose();
            },
        }}
    >
        {/* <ModalBox> Edit stream {JSON.stringify(services.streamForm.stream)}</ModalBox> */}
        <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="streamName"
                name="streamName"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={localStream.name}
                onChange={(ev) => {
                    runInAction(() => {
                        localStream.name = ev.target.value;
                        setLocalStream({ ...localStream });
                    });
                }}
            />
            <TextField
                required
                margin="dense"
                id="streamUrl"
                name="streamUrl"
                label="Url"
                type="url"
                fullWidth
                variant="standard"
                value={localStream.url}
                onChange={(ev) => {
                    runInAction(() => {
                        localStream.url = ev.target.value;
                        setLocalStream({ ...localStream });
                    })
                }}
            />
            <TextField
                margin="dense"
                id="streamImage"
                name="streamImage"
                label="Image"
                type="url"
                fullWidth
                variant="standard"
                value={localStream.image}
                onChange={(ev) => {
                    runInAction(() => {
                        localStream.image = ev.target.value;
                        setLocalStream({ ...localStream });
                    })
                }}
            />
        </DialogContent>
        <DialogActions>
            { localStream.url && localStream.name ? <IconButton onClick={handleDelete}><DeleteIcon /></IconButton> : null }
            <div style={{flexGrow: 1}}></div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">{services.streamForm.stream ? "Save" : "Add"}</Button>
        </DialogActions>
    </Dialog>;
});
