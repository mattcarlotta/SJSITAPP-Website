import styled from "@emotion/styled";
import { RiSignalWifiErrorFill } from "~icons";
import FlexCenter from "../FlexCenter";

export type TFetchErrorComponent = {
  className?: string;
};

const FetchErrorComponent = ({
  className
}: TFetchErrorComponent): JSX.Element => (
  <div className={className}>
    <FlexCenter direction="column">
      <RiSignalWifiErrorFill
        style={{ fontSize: "40px", marginBottom: "5px" }}
      />
      <div>
        Oops, something went wrong. Unable to retrieve the requested data.
      </div>
    </FlexCenter>
  </div>
);

const FetchError = styled(FetchErrorComponent)`
  color: #d03916;
  padding: 20px;
  margin-top: 25px;
  text-align: center;
  font-size: 15px;
`;

export default FetchError;
