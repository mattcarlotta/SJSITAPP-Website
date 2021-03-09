import * as React from "react";
import AvailabilityAvgChart from "~components/Layout/AvailabilityAvgChart";
import APFormTitle from "~components/Layout/APFormTitle";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import DisplayMonthDates from "~components/Layout/DisplayMonthDates";
import FetchError from "~components/Layout/FetchError";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import { FaUserClock } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { TAvailabilityData } from "~types";

export type TAvailabilityState = {
  availability: Array<TAvailabilityData>;
  error: boolean;
  isLoading: boolean;
  months: Array<string>;
};

export type TAvailabilityResData = {
  eventAvailability: Array<TAvailabilityData>;
  months: Array<string>;
};

export const Availability = (): JSX.Element => {
  const [state, setState] = React.useState<TAvailabilityState>({
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
      <Padding top="10px" left="20px" right="20px">
        {isLoading ? (
          <LoadingPanel
            data-testid="loading-events"
            borderRadius="5px"
            height="230px"
            margin="5px auto 0"
          />
        ) : error ? (
          <FetchError onClickReload={handleReload} />
        ) : (
          <Center>
            <PanelDescription>
              Availability should be greater than 75%
            </PanelDescription>
            <DisplayMonthDates startMonth={months[0]} endMonth={months[1]} />
            <AvailabilityAvgChart availability={availability} />
          </Center>
        )}
      </Padding>
    </Card>
  );
};

export default Availability;