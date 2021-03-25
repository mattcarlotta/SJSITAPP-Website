import * as React from "react";
import get from "lodash.get";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  deleteUserAvatar,
  updateUserAvatar,
  updateUserProfile
} from "~actions/Auth";
import Availability from "~components/Layout/Availability";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import EventCalendar from "~components/Layout/EventCalendar";
import Line from "~components/Layout/Line";
import Padding from "~components/Layout/Padding";
import Profile from "~components/Layout/Profile";
import TabPanel from "~components/Layout/TabPanel";
import Tab from "~components/Layout/Tab";
import Tabs from "~components/Layout/Tabs";
import Title from "~components/Layout/Title";
import Header from "~components/Navigation/Header";
import { BsPeopleCircle, FaCogs, FaChartBar, FaReply } from "~icons";
import capitalize from "~utils/capitalize";
import { TRootState } from "~types";

export type TSettingPageProps = {
  id: string;
  avatar: string;
  email: string;
  emailReminders: boolean;
  firstName: string;
  lastName: string;
  registered: string;
  role: string;
  serverError?: string;
  serverMessage?: string;
  status: string;
  deleteUserAvatar: typeof deleteUserAvatar;
  updateUserAvatar: typeof updateUserAvatar;
  updateUserProfile: typeof updateUserProfile;
};
const TABS = ["profile", "availability", "responses"];

export const SettingsPage = (props: TSettingPageProps): JSX.Element => {
  const { role } = props;
  const router = useRouter();
  const query = get(router, ["query", "tab"]);
  const [tab, setTab] = React.useState(0);

  const isEmployee = role === "employee";
  const tabValue = TABS.findIndex(tab => tab === query);

  const handleTabChange = React.useCallback((_, tab: number): void => {
    router.push(`?tab=${TABS[tab]}`, undefined, { shallow: true });
  }, []);

  React.useEffect(() => {
    setTab(Math.max(0, tabValue));
  }, [tabValue]);

  return (
    <>
      <Header
        title={`Settings ${capitalize(query as string) || ""}`}
        url={`/employee/settings${query ? `?tab=${query}` : ""}`}
      />
      <Card dataTestId="settings-page" title="Settings" icon={<FaCogs />}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          aria-label="event tabs"
        >
          <Tab
            dataTestId="profile"
            index={0}
            tab={tab}
            label={
              <>
                <BsPeopleCircle style={{ marginRight: 5 }} />
                Profile
              </>
            }
          />
          {isEmployee && [
            <Tab
              key="availability"
              index={1}
              dataTestId="availability"
              tab={tab}
              label={
                <>
                  <FaChartBar style={{ marginRight: 5 }} />
                  Availability
                </>
              }
            />,
            <Tab
              key="responses"
              dataTestId="responses"
              index={2}
              tab={tab}
              label={
                <>
                  <FaReply style={{ marginRight: 5 }} />
                  Responses
                </>
              }
            />
          ]}
        </Tabs>
        <Padding top="10px" left="40px" right="40px" bottom="40px">
          <TabPanel value={tab} index={0}>
            <Profile {...props} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Availability id={props.id} />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Center style={{ marginBottom: "-4px" }}>
              <Title>My Responses</Title>
              <Line centered width="400px" />
            </Center>
            <EventCalendar APIURL="responses" id={props.id} disableGames />
          </TabPanel>
        </Padding>
      </Card>
    </>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({
  auth,
  server
}: Pick<TRootState, "auth" | "server">) => ({
  ...auth,
  serverError: server.error,
  serverMessage: server.message
});

/* istanbul ignore next */
const mapDispatchToProps = {
  deleteUserAvatar,
  updateUserAvatar,
  updateUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
