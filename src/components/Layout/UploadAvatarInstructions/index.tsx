import { css } from "@emotion/react";
import FlexCenter from "~components/Layout/FlexCenter";
import Margin from "~components/Layout/Margin";
import { FaCloudUploadAlt } from "~icons";

const UploadAvatarInstructions = (): JSX.Element => (
  <FlexCenter style={{ padding: 5, textAlign: "center" }} direction="column">
    <Margin as="div" top="0" right="auto" bottom="0" left="auto">
      <FaCloudUploadAlt style={{ fontSize: 80 }} />
    </Margin>
    <div
      css={css`
        font-size: 14px;
      `}
    >
      Click <strong>here</strong> or drag an image to this area.
    </div>
    <div
      css={css`
        font-size: 12px;
        margin: 5px 0 0 0;
      `}
    >
      Accepted formats:
    </div>
    <div
      css={css`
        font-size: 12px;
      `}
    >
      jpg/jpeg/png &#8804; 2mb
    </div>
  </FlexCenter>
);

export default UploadAvatarInstructions;
