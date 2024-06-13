import {styled, keyframes} from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';

const roundRoundLikeARecordRoundRound = keyframes`
from {
    transform: translateX(-50%) rotate(0);
}
    to {
        transform: translateX(-50%) rotate(360deg);
    }
`;

export const LoadingBox = styled(AutorenewIcon)`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -5px;
    width: 70px;
    height: 70px;
    color: #ccc;
    animation: ${roundRoundLikeARecordRoundRound} 0.8s linear infinite;

    @media (min-width: 600px) {
        top: -3px;
    }
`;