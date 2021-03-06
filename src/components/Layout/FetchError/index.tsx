import styled from "@emotion/styled";
import Button from "~components/Layout/Button";
import FlexCenter from "~components/Layout/FlexCenter";
import { MdRefresh, RiSignalWifiErrorFill } from "~icons";

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
          padding="5px"
          margin="10px 0 0 0"
          width="130px"
          type="button"
          onClick={onClickReload}
        >
          <MdRefresh
            style={{
              position: "relative",
              top: 3,
              marginRight: 5
            }}
          />
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
  height: 100%;
`;

export default FetchError;
