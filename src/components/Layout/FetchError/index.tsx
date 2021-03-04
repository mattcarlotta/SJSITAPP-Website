import styled from "@emotion/styled";
import { RiSignalWifiErrorFill } from "~icons";
import Button from "~components/Layout/Button";
import FlexCenter from "~components/Layout/FlexCenter";

export type TFetchErrorComponent = {
  className?: string;
  onClickReload?: () => void;
};

const FetchErrorComponent = ({
  className,
  onClickReload
}: TFetchErrorComponent): JSX.Element => (
  <div data-testid="fetch-error" className={className}>
    <FlexCenter direction="column">
      <RiSignalWifiErrorFill
        style={{ fontSize: "40px", marginBottom: "5px" }}
      />
      <div>Something went wrong. Unable to retrieve the requested data.</div>
      {onClickReload && (
        <Button
          primary
          noGlow
          data-testid="reload-component"
          padding="3px"
          margin="10px 0 0 0"
          width="100px"
          type="button"
          onClick={onClickReload}
        >
          Reload
        </Button>
      )}
    </FlexCenter>
  </div>
);

const FetchError = styled(FetchErrorComponent)`
  color: #d03916;
  padding-top: 20px;
  text-align: center;
  font-size: 15px;
`;

export default FetchError;
