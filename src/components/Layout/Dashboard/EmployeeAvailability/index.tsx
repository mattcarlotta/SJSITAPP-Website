import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import APFormTitle from "~components/Layout/APFormTitle";
import Bold from "~components/Layout/Bold";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import DisplayMonthDates from "~components/Layout/DisplayMonthDates";
import FetchError from "~components/Layout/FetchError";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import LoadingPanel from "~components/Layout/LoadingPanel";
import NoAvailability from "~components/Layout/NoAvailability";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import { FaUserClock } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { CSSProperties, TEmployeeAvailabilityData } from "~types";

export type TEmployeeAvailabilityState = {
  availability: Array<TEmployeeAvailabilityData>;
  error: boolean;
  isLoading: boolean;
  months: Array<string>;
};

export type TEmployeeAvailabilityResData = {
  membersAvailability: Array<TEmployeeAvailabilityData>;
  months: Array<string>;
};

const listStyle = {
  height: 180,
  overflowY: "auto",
  padding: "0 5px",
  backgroundColor: "#f7f6f6",
  border: "1px solid rgba(12, 137, 157, 0.4)",
  borderRadius: 5
} as CSSProperties;

export const EmployeeAvailability = (): JSX.Element => {
  const [state, setState] = React.useState<TEmployeeAvailabilityState>({
    availability: [],
    error: false,
    isLoading: true,
    months: []
  });

  const { error, availability, isLoading, months } = state;

  const fetchMembersAvailability = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get("dashboard/members-availability");
      const data = parseData<TEmployeeAvailabilityResData>(res);

      setState({
        availability: data.membersAvailability,
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
    if (isLoading) fetchMembersAvailability();
  }, [isLoading, fetchMembersAvailability]);

  return (
    <Card
      dataTestId="dashboard-employee-availability"
      icon={<FaUserClock />}
      title="Availability"
      padding="0"
    >
      <APFormTitle>Employee Availability</APFormTitle>
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
              Target availability is set to 75% and above
            </PanelDescription>
            <DisplayMonthDates startMonth={months[0]} endMonth={months[1]} />
            {!isEmpty(availability) ? (
              <List data-testid="employee-availability-list" style={listStyle}>
                {availability.map(({ id, availability }, key) => (
                  <ListItem
                    key={id}
                    display="flex"
                    padding="0 0 0 5px"
                    style={{
                      backgroundColor: key % 2 ? "#d8d8d8" : "transparent"
                    }}
                  >
                    <FlexStart>
                      <Bold>{id}</Bold>
                    </FlexStart>
                    <FlexEnd>
                      <span
                        css={css`
                          color: ${availability >= 75 ? "blue" : "red"};
                        `}
                      >
                        {availability}&#37;
                      </span>
                    </FlexEnd>
                  </ListItem>
                ))}
              </List>
            ) : (
              <NoAvailability />
            )}
          </Center>
        )}
      </Padding>
    </Card>
  );
};

export default EmployeeAvailability;
