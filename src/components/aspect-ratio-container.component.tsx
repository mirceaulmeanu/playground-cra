import React, {PropsWithChildren} from "react";
import styled from "@emotion/styled";

interface IAspectRatioBoxProps {
    expectedWidth: number;
    expectedHeight: number;
}

const AspectRatioBox = styled.div<IAspectRatioBoxProps>`
    position: relative;
    width: 100%;
    height: 0;
    padding-top: calc(${({expectedWidth, expectedHeight}) => `${expectedHeight} / ${expectedWidth} * 100%`});
`;

const AspectRatioContentBox = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

interface IAspectRatioContainerProp extends PropsWithChildren {
    width: number;
    height: number;
}

export function AspectRatioContainer(props: PropsWithChildren<IAspectRatioContainerProp>) {
    return (
        <AspectRatioBox expectedWidth={props.width} expectedHeight={props.height}>
            <AspectRatioContentBox>
                {props.children}
            </AspectRatioContentBox>
        </AspectRatioBox>
    );
}
