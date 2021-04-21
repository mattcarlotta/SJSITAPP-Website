import * as React from "react";
import { Slide } from "@material-ui/core";
import { ReactElement, Ref, TransitionProps } from "~types";

const SlideTransition = React.forwardRef(
  (
    props: TransitionProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
  ) => <Slide direction="down" ref={ref} {...props} />
);

export default SlideTransition;
