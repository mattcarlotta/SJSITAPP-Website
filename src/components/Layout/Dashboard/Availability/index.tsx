import * as React from "react";
import { css } from "@emotion/react";
import APFormTitle from "~components/Layout/APFormTitle";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import FetchError from "~components/Layout/FetchError";
import LoadingPanel from "~components/Layout/LoadingPanel";
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
  months: Array<string>;
};

export type TAvailabilityResData = {
  eventAvailability: Array<TAvailabilityData>;
  months: Array<string>;
};

const simpleFormat = "MMM Do";

export const Availability = (): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventsState>({
    availability: [],
    error: false,
    isLoading: true,
    months: []
  });

  const { error, availability, isLoading, months } = state;

  const fetchAvailability = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get("dashboard/availability");
      const data = parseData<TAvailabilityResData>(res);

      setState({
        availability: data.eventAvailability,
        error: false,
        isLoading: false,
        months: data.months
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
      isLoading: true,
      months: []
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
        {isLoading ? (
          <LoadingPanel
            data-testid="loading-events"
            borderRadius="5px"
            height="240px"
            margin="5px auto 0"
          />
        ) : error ? (
          <FetchError onClickReload={handleReload} />
        ) : (
          <Center>
            <div
              css={css`
                color: #888;
                margin-top: 5px;
                font-size: 14px;
              `}
            >
              Availability should be greater than 75%
            </div>
            <div
              css={css`
                margin-bottom: 10px;
                color: #1a4448;
                text-align: center;
              `}
            >
              {moment(months[0]).format(simpleFormat)}
              &nbsp;–&nbsp;
              {moment(months[1]).format(simpleFormat)}
            </div>
            <AvailabilityAvgChart availability={availability} />
          </Center>
        )}
      </Padding>
    </Card>
  );
};

export default Availability;
