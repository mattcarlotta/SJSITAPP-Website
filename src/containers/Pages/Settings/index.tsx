import * as React from "react";
import { connect } from "react-redux";
import { updateUserProfile } from "~actions/Auth";
import Card from "~components/Layout/Card";
import TabPanel, { a11yProps } from "~components/Layout/TabPanel";
import Tab from "~components/Layout/Tab";
import Tabs from "~components/Layout/Tabs";
import Header from "~components/Navigation/Header";
import Profile from "./Profile";
import { FaCogs } from "~icons";
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
          <Tab disabled={tab === 0} label="profile" {...a11yProps(0)} />
          {isEmployee && [
            <Tab
              key="availability"
              disabled={tab === 1}
              label="availability"
              {...a11yProps(1)}
            />,
            <Tab
              key="responses"
              disabled={tab === 2}
              label="responses"
              {...a11yProps(2)}
            />
          ]}
        </Tabs>
        <TabPanel value={tab} index={0}>
          <Profile {...props} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <div>Availability</div>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <div>Responses</div>
        </TabPanel>
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
