import {Slide, useScrollTrigger} from "@mui/material";

export function HideOnScroll(props: {children: React.ReactElement}) {
    const trigger = useScrollTrigger();
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {props.children}
      </Slide>
    );
  }