import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import APFormTitle from "~components/Layout/APFormTitle";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import FetchError from "~components/Layout/FetchError";
import LoadingPanel from "~components/Layout/LoadingPanel";
import NoForms from "~components/Layout/NoForms";
import Padding from "~components/Layout/Padding";
import { FaUserClock } from "~icons";
import app from "~utils/axiosConfig";
import moment from "~utils/momentWithTimezone";
import { parseData } from "~utils/parseResponse";
import { TAvailabilityData } from "~types";
import AvailabilityAvgChart from "~components/Layout/AvailabilityAvgChart";

export type TDashboardEventsState = {
  availability: Array<TAvailabilityData>;
  error: boolean;
  isLoading: boolean;
};

const simpleFormat = "MMM Do";

export const Availability = (): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventsState>({
    availability: [],
    error: false,
    isLoading: true
  });

  const { error, availability, isLoading } = state;

  const fetchAvailability = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get("dashboard/availability");
      const data = parseData<Array<TAvailabilityData>>(res);

      setState({
        availability: data,
        error: false,
        isLoading: false
      });
    } catch (err) {
      setState(prevState => ({
        ...prevState,
        error: true,
        isLoading: false
      }));
    }
  }, []);

  const handleReload = React.useCallback(() => {
    setState({
      availability: [],
      error: false,
      isLoading: true
    });
  }, []);

  React.useEffect(() => {
    if (isLoading) fetchAvailability();
  }, [isLoading, fetchAvailability]);

  return (
    <Card
      dataTestId="dashboard-availability"
      icon={<FaUserClock />}
      title="Availability"
      padding="0"
    >
      <APFormTitle>Sharks & Barracuda Availability</APFormTitle>
      <Padding top="5px" left="10px" right="10px">
        <div
          css={css`
            margin-top: 5px;
            margin-bottom: 20px;
            color: #1a4448;
            text-align: center;
          `}
        >
          {moment().add(1, "months").startOf("month").format(simpleFormat)}
          &nbsp;–&nbsp;
          {moment().add(1, "months").endOf("month").format(simpleFormat)}
        </div>
        {isLoading ? (
          <LoadingPanel
            data-testid="loading-events"
            borderRadius="5px"
            height="200px"
            margin="5px auto 0"
          />
        ) : error ? (
          <FetchError onClickReload={handleReload} />
        ) : (
          <AvailabilityAvgChart availability={availability} />
        )}
      </Padding>
    </Card>
  );
};

export default Availability;
