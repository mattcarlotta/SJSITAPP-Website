import * as React from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { connect } from "react-redux";
import Select from "~components/Forms/Select";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import Paragraph from "~components/Layout/Paragraph";
import Head from "~components/Navigation/Header";
import OutsideLink from "~components/Navigation/OutsideLink";
import { FaQuestionCircle } from "~icons";
import stripSpaces from "~utils/stripSpaces";
import topics, { stafftopics } from "./Topics";
import General from "./General";
import FormAndAvailability from "./FormAndAvailability";
import EmployeeSchedule from "./EmployeeSchedule";
import GettingStarted from "./GettingStarted";
import AutomatedServices from "./AutomatedServices";
import Events from "./Events";
import Forms from "./Forms";
import Mail from "./Mail";
import Members from "./Members";
import EmployeeScheduling from "./EmployeeScheduling";
import Seasons from "./Seasons";
import { ConnectedProps, EventTarget, PickReduxState } from "~types";

/* istanbul ignore next */
const mapState = ({ auth }: PickReduxState<"auth">) => ({
  role: auth.role
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type THelpPageState = {
  searchText: string;
  id: string;
};

export const HelpPage = ({ role }: PropsFromRedux): JSX.Element => {
  const router = useRouter();
  const isMember = role === "member";
  const availableTopics = !isMember ? stafftopics : topics;
  const [basePath, hash] = router.asPath.split("#");
  const [state, setState] = React.useState<THelpPageState>({
    searchText: "",
    id: hash
  });
  const { searchText, id } = state;
  const nextPath = `${basePath}${id ? `#${id}` : ""}`;

  const handleSearchChange = ({ target: { value } }: EventTarget): void => {
    setState({
      searchText: value as string,
      id: stripSpaces(value as string)
    });
  };

  /* istanbul ignore next */
  React.useEffect(() => {
    if (hash !== id) setState(prevState => ({ ...prevState, id: hash }));
  }, [hash]);

  React.useEffect(() => {
    router.push(nextPath, undefined, { shallow: true });
  }, [id]);

  return (
    <>
      <Head title="Help" url={nextPath} />
      <Card
        dataTestId="help-page"
        title="Help"
        icon={<FaQuestionCircle />}
        subtitle="Questions and Answers"
      >
        <Padding top="10px" right="50px" bottom="80px" left="50px">
          <Center
            style={{
              maxWidth: "800px",
              margin: "0 auto"
            }}
          >
            <Paragraph marginBottom="10px">
              Use the search box below to quickly find answers to your
              questions!
            </Paragraph>
            <div
              css={css`
                height: 45px;
                max-width: 650px;
                margin: 0 auto;
              `}
            >
              <Select
                isSearchable
                name="searchQuestions"
                placeholder="Type here to search for common questions..."
                value={searchText}
                selectOptions={availableTopics}
                onChange={handleSearchChange}
              />
            </div>
            <PanelDescription>
              If you&#39;re unable to find an answer to your question, then
              please
              <OutsideLink
                dataTestId="contact-us-link"
                href="/employee/contact-us"
              >
                contact us
              </OutsideLink>
              .
            </PanelDescription>
          </Center>
          <General id={id} />
          <FormAndAvailability id={id} />
          <EmployeeSchedule id={id} />
          {!isMember && (
            <>
              <GettingStarted id={id} />
              <Events id={id} />
              <Forms id={id} />
              <Mail id={id} />
              <Members id={id} />
              <EmployeeScheduling id={id} />
              <Seasons id={id} />
              <AutomatedServices id={id} />
            </>
          )}
        </Padding>
      </Card>
    </>
  );
};

export default connector(HelpPage);
