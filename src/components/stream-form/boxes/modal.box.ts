import {Box, BoxProps} from "@mui/material";
import {styled} from "@mui/material/styles";

export const ModalBox = styled(Box)<BoxProps>`
    position: fixed;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    border-radius: ${({theme}) => theme.shape.borderRadius}px;
    background-color: ${({theme}) => theme.palette.background.paper};
`;