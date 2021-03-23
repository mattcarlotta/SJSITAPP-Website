import * as React from "react";
import { connect } from "react-redux";
import { updateUserProfile } from "~actions/Auth";
import Card from "~components/Layout/Card";
import Padding from "~components/Layout/Padding";
import TabPanel from "~components/Layout/TabPanel";
import Tab from "~components/Layout/Tab";
import Tabs from "~components/Layout/Tabs";
import Header from "~components/Navigation/Header";
import Profile from "./Profile";
import EventResponses from "./EventResponses";
import { BsPeopleCircle, FaCogs, FaChartBar, FaReply } from "~icons";
import { TRootState } from "~types";

export type TSettingPageProps = {
  id: string;
  avatar: string;
  email: string;
  emailReminders: boolean;
  firstName: string;
  lastName: string;
  role: string;
  serverError?: string;
  serverMessage?: string;
  updateUserProfile: typeof updateUserProfile;
};

const SettingsPage = (props: TSettingPageProps): JSX.Element => {
  const { role } = props;
  const isEmployee = role === "employee";
  const [tab, setTab] = React.useState(0);

  const handleTabChange = React.useCallback((_, tab: number): void => {
    setTab(tab);
  }, []);

  return (
    <>
      <Header title="Settings" url="/settings" />
      <Card dataTestId="settings-page" title="Settings" icon={<FaCogs />}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="standard"
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
            <div>Events Availability</div>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <EventResponses id={props.id} />
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
  updateUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
