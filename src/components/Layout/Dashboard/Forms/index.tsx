import * as React from "react";
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import APFormExpired from "~components/Layout/APFormExpired";
import CardSubTitle from "~components/Layout/CardSubTitle";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import DisplayMonthDates from "~components/Layout/DisplayMonthDates";
import FetchError from "~components/Layout/FetchError";
import FormatDate from "~components/Layout/FormatDate";
import LoadingPanel from "~components/Layout/LoadingPanel";
import NoForms from "~components/Layout/NoForms";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import Link from "~components/Navigation/Link";
import { BsPencilSquare, FaFileSignature } from "~icons";
import app from "~utils/axiosConfig";
import { dateTimeFormat } from "~utils/dateFormats";
import moment from "~utils/momentWithTimezone";
import { parseData } from "~utils/parseResponse";
import { TFormData } from "~types";

export type TDashboardEventsState = {
  error: boolean;
  form: TFormData;
  hasExpired: boolean;
  isLoading: boolean;
};

export const Forms = (): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventsState>({
    error: false,
    form: {},
    hasExpired: false,
    isLoading: true
  });
  const { error, form, hasExpired, isLoading } = state;

  const fetchForms = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get("dashboard/ap-form");
      const data = parseData<TFormData>(res);

      const hasExpired =
        moment(get(data, ["expirationDate"])).toDate() < moment().toDate();

      setState({
        error: false,
        form: data,
        hasExpired,
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
      error: false,
      form: {},
      hasExpired: false,
      isLoading: true
    });
  }, []);

  React.useEffect(() => {
    if (isLoading) fetchForms();
  }, [isLoading, fetchForms]);

  return (
    <Card
      dataTestId="dashboard-forms"
      icon={<FaFileSignature />}
      title="Forms"
      padding="0"
    >
      <CardSubTitle>Sharks & Barracuda A/P Form</CardSubTitle>
      <Padding top="10px" left="20px" right="20px">
        <Center>
          {isLoading ? (
            <LoadingPanel
              data-testid="loading-events"
              borderRadius="5px"
              height="230px"
              margin="5px auto 0"
            />
          ) : error ? (
            <FetchError height="227px" onClickReload={handleReload} />
          ) : !isEmpty(form) ? (
            <>
              <PanelDescription data-testid="ap-form">
                {!hasExpired ? "Expires" : "Expired"} on&nbsp;
                <FormatDate
                  date={form.expirationDate}
                  format={dateTimeFormat}
                  style={{ display: "inline" }}
                />
              </PanelDescription>
              <DisplayMonthDates
                startMonth={form.startMonth}
                endMonth={form.endMonth}
              />
              {!hasExpired ? (
                <Link
                  alt
                  display="block"
                  margin="10px auto"
                  borderRadius="50px"
                  padding="17px 0px"
                  width="280px"
                  hideShadow
                  dataTestId="dashboard-ap-form-link"
                  href={`/employee/forms/view/${form._id}`}
                >
                  <BsPencilSquare
                    style={{
                      position: "relative",
                      top: 4,
                      marginRight: 8,
                      fontSize: 20
                    }}
                  />
                  View Form ({form.eventCounts} events)
                </Link>
              ) : (
                <APFormExpired />
              )}
            </>
          ) : (
            <>
              <DisplayMonthDates />
              <NoForms />
            </>
          )}
        </Center>
      </Padding>
    </Card>
  );
};

export default Forms;
