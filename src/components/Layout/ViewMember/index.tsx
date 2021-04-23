import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import Availability from "~components/Layout/Availability";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import EventCalendar from "~components/Layout/EventCalendar";
import Line from "~components/Layout/Line";
import MemberProfile from "~components/Layout/MemberProfile";
import Padding from "~components/Layout/Padding";
import TabPanel from "~components/Layout/TabPanel";
import Tab from "~components/Layout/Tab";
import Tabs from "~components/Layout/Tabs";
import Title from "~components/Layout/Title";
import Header from "~components/Navigation/Header";
import { BsPeopleCircle, FaCogs, FaChartBar, FaReply } from "~icons";
import capitalize from "~utils/capitalize";
import { ChangeEvent, ReactElement } from "~types";

const TABS = ["profile", "availability", "responses"];

export const MemberSettingsPage = (): ReactElement => {
  const router = useRouter();
  const query = get(router, ["query", "tab"]);
  const id = get(router, ["query", "id"]);
  const [tab, setTab] = React.useState(0);

  const tabValue = TABS.findIndex(tab => tab === query);

  const handleTabChange = (_: ChangeEvent<any>, tab: number): void => {
    router.push(`${id}?tab=${TABS[tab]}`, undefined, { shallow: true });
  };

  React.useEffect(() => {
    setTab(Math.max(0, tabValue));
  }, [tabValue]);

  return (
    <>
      <Header
        title={`Member ${capitalize(query as string) || ""}`}
        url={`/employee/members/${id}${query ? `?tab=${query}` : ""}`}
      />
      <Card
        dataTestId="member-settings-page"
        title="Member Settings"
        icon={<FaCogs />}
      >
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
          />
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
        </Tabs>
        <TabPanel value={tab} index={0}>
          <Padding top="10px" left="20px" right="20px" bottom="40px">
            <MemberProfile id={id as string} />
          </Padding>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Padding left="20px" right="20px" bottom="40px">
            <Availability id={id as string} />
          </Padding>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Center style={{ marginBottom: "-4px" }}>
            <Title>My Responses</Title>
            <Line centered maxWidth="225px" />
          </Center>
          <EventCalendar APIURL="responses" id={id as string} disableGames />
        </TabPanel>
      </Card>
    </>
  );
};

export default MemberSettingsPage;
