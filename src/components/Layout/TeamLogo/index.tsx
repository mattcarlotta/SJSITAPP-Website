import * as React from "react";
import Margin from "~components/Layout/Margin";
import { ReactElement } from "~types";

const TeamLogo = (): ReactElement => (
  <>
    SHARKS ICE
    <Margin right="3px" left="5px">
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGEAPI}/images/logo_24x24.png`}
        alt="logo"
      />
    </Margin>
    TEAM
  </>
);

export default TeamLogo;
