import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import APFormExpired from "~components/Layout/APFormExpired";
import APFormTitle from "~components/Layout/APFormTitle";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import FetchError from "~components/Layout/FetchError";
import LoadingPanel from "~components/Layout/LoadingPanel";
import NoForms from "~components/Layout/NoForms";
import Padding from "~components/Layout/Padding";
import Link from "~components/Navigation/Link";
import { BsPencilSquare, FaFileSignature } from "~icons";
import app from "~utils/axiosConfig";
import moment from "~utils/momentWithTimezone";
import { parseData } from "~utils/parseResponse";
import { TFormData } from "~types";

export type TDashboardEventsState = {
  error: boolean;
  form: TFormData;
  hasExpired: boolean;
  isLoading: boolean;
};

const format = "MMM Do @ hh:mm a";
const simpleFormat = "MMM Do";

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
        moment(data.expirationDate).toDate() < moment().toDate();

      setState({
        error: false,
        form: data,
        isLoading: false,
        hasExpired
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
      <APFormTitle>Sharks & Barracuda A/P Form</APFormTitle>
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
        ) : !isEmpty(form) ? (
          <>
            <div
              css={css`
                padding: 5px;
                text-align: center;
              `}
            >
              <div
                css={css`
                  color: #888;
                  margin: 2px 0 0 0;
                  font-size: 14px;
                `}
              >
                Expires on {moment(form.expirationDate).format(format)}
              </div>
              <div
                css={css`
                  margin-bottom: 13px;
                  color: #1a4448;
                `}
              >
                {moment(form.startMonth).format(simpleFormat)}&nbsp;–&nbsp;
                {moment(form.endMonth).format(simpleFormat)}
              </div>
              {!hasExpired ? (
                <Link
                  alt
                  display="block"
                  margin="0 auto"
                  borderRadius="50px"
                  padding="17px 0px"
                  width="220px"
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
                  View Form
                </Link>
              ) : (
                <APFormExpired />
              )}
            </div>
          </>
        ) : (
          <Center>
            <div
              css={css`
                margin-top: 5px;
                color: #1a4448;
              `}
            >
              {moment().add(1, "months").startOf("month").format(simpleFormat)}
              &nbsp;–&nbsp;
              {moment().add(1, "months").endOf("month").format(simpleFormat)}
            </div>
            <NoForms />
          </Center>
        )}
      </Padding>
    </Card>
  );
};

export default Forms;
