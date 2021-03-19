import * as React from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { connect } from "react-redux";
import Select from "~components/Forms/Select";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
// import Line from "~components/Layout/Line";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import Paragraph from "~components/Layout/Paragraph";
import Head from "~components/Navigation/Header";
// import Link from "~components/Navigation/Link";
import OutsideLink from "~components/Navigation/OutsideLink";
import { FaQuestionCircle } from "~icons";
import stripSpaces from "~utils/stripSpaces";
import topics, { stafftopics } from "./Topics";
import GeneralQuestions from "./GeneralQuestions";
import FormAndAvailabilityQuestions from "./FormAndAvailabilityQuestions";
import ScheduleQuestions from "./ScheduleQuestions";
import GettingStarted from "./GettingStarted";
import AutomatedServices from "./AutomatedServices";
import Events from "./Events";
import { EventTarget, TRootState } from "~types";

export type THelpPageState = {
  searchText: string;
  id: string;
};

const HelpPage = ({ role }: { role: string }): JSX.Element => {
  const router = useRouter();
  const isStaff = role !== "employeee";
  const availableTopics = isStaff ? stafftopics : topics;
  const [basePath, hash] = router.asPath.split("#");
  const [state, setState] = React.useState<THelpPageState>({
    searchText: "",
    id: hash
  });
  const { searchText, id } = state;
  const nextPath = `${basePath}${id ? `#${id}` : ""}`;

  const handleSearchChange = React.useCallback(
    ({ target: { value } }: EventTarget) => {
      setState({ searchText: value, id: stripSpaces(value) });
    },
    []
  );

  React.useEffect(() => {
    router.push(nextPath, undefined, { shallow: true });
  }, [nextPath]);

  return (
    <>
      <Head title="Help" url={nextPath} />
      <Card
        dataTestId="help-page"
        title="Help"
        icon={<FaQuestionCircle />}
        subtitle="Questions and Answers"
      >
        <Padding top="10px" right="40px" bottom="80px" left="40px">
          <Center
            style={{
              marginTop: 25,
              maxWidth: "800px",
              width: "100%",
              margin: "0 auto"
            }}
          >
            <Paragraph marginBottom="10px">
              Use the search box below to quickly find answers to your
              questions!
            </Paragraph>
            <div
              css={css`
                width: 100%;
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
              If you&#39;re unable to find an answer to your question, please
              <OutsideLink
                dataTestId="contact-us-link"
                href="/employee/contact-us"
              >
                contact us
              </OutsideLink>
              .
            </PanelDescription>
          </Center>
          <GeneralQuestions id={id} />
          <FormAndAvailabilityQuestions id={id} />
          <ScheduleQuestions id={id} />
          {isStaff && (
            <>
              <GettingStarted id={id} />
              <AutomatedServices id={id} />
              <Events id={id} />
            </>
          )}
        </Padding>
      </Card>
    </>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ auth }: Pick<TRootState, "auth">) => ({
  role: auth.role
});

export default connect(mapStateToProps)(HelpPage);
