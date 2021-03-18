import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import WarningText from "~components/Layout/WarningText";
import OutsideLink from "~components/Navigation/OutsideLink";
import { BsPencilSquare } from "~icons";

const FormAndAvailabilityQuestions = ({ id }: { id: string }): JSX.Element => (
  <>
    <Center>
      <Title style={{ marginTop: 50 }}>Forms and Availability Questions</Title>
      <Paragraph>
        Find answers to questions about A/P forms and availability.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I view my monthly availabilty?">
      To view your month to month availability, go to the
      <OutsideLink dataTestId="settings-link" href="/employee/settings">
        Settings
      </OutsideLink>
      page and click on the <strong>Availability</strong> tab. You can change
      the <strong>Month</strong> and/or <strong>Year</strong> to reflect which
      month and year you&#39;d wish to view. The pie chart displays your
      responses and availability for the selected month&#39;s A/P form and the
      bar chart displays the amount of games that you were scheduled for versus
      the amount of available home games.
      <br />
      <br />
      To view the current month&#39;s availability percentage, go to the
      <OutsideLink dataTestId="dashboard-link" href="/employee/dashboard">
        Dashboard
      </OutsideLink>
      page and underneath the <strong>Availabilty</strong> tab will be your
      current month&#39;s availability percentage.
    </Accordion>
    <Accordion
      expanded={id}
      title="How do I view my monthly A/P form responses?"
    >
      To view your month to month A/P form responses, go to the
      <OutsideLink dataTestId="settings-link" href="/employee/settings">
        Settings
      </OutsideLink>
      page and click on the <strong>Responses</strong> tab. You can change the
      <strong>&nbsp;Month</strong> and/or <strong>Year</strong> to reflect which
      month and year you&#39;d wish to view. If you&#39;ve filled out the A/P
      form for the selected month, a series of games will be rendered within the
      calendar. If you wish to see what your response was for a particular game,
      simply click the game to display its details, which will include your
      <strong>&nbsp;Employee Response</strong>.
    </Accordion>
    <Accordion expanded={id} title="How do I view an A/P form?">
      To view an A/P form, go to the
      <OutsideLink dataTestId="dashboard-link" href="/employee/dashboard">
        Dashboard
      </OutsideLink>
      page and click on the
      <Button
        primary
        display="inline-block"
        type="button"
        width="250px"
        padding="4px"
        margin="0 3px"
      >
        <BsPencilSquare
          style={{
            position: "relative",
            top: 4,
            marginRight: 8,
            fontSize: 20
          }}
        />
        AP Form (# events)
      </Button>
      button located located underneath the <strong>Forms</strong> panel.
      <WarningText>
        Be advised that this A/P form button will disappear once the A/P form
        has expired.
      </WarningText>
    </Accordion>
    <Accordion
      expanded={id}
      title="How do I add my availability to an A/P form?"
    >
      To add your availabilty to an A/P form, go to the
      <OutsideLink dataTestId="dashboard-link" href="/employee/dashboard">
        Dashboard
      </OutsideLink>
      page and click on the
      <Button
        primary
        display="inline-block"
        type="button"
        width="250px"
        padding="4px"
        margin="0 3px"
      >
        <BsPencilSquare
          style={{
            position: "relative",
            top: 4,
            marginRight: 8,
            fontSize: 20
          }}
        />
        AP Form (# events)
      </Button>
      button located underneath to the <strong>Forms</strong> panel. Add your
      responses accordingly and click the
      <Button
        primary
        display="inline-block"
        type="button"
        width="100px"
        padding="4px"
        margin="0 3px"
      >
        Submit
      </Button>
      button when you&#39;re done.
      <WarningText>
        Be advised that this A/P form button will disappear once the A/P form
        has expired.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I update my A/P form availabilty?">
      To update your availabilty to an A/P form, go to the
      <OutsideLink dataTestId="dashboard-link" href="/employee/dashboard">
        Dashboard
      </OutsideLink>
      page and click on the
      <Button
        primary
        display="inline-block"
        type="button"
        width="250px"
        padding="4px"
        margin="0 3px"
      >
        <BsPencilSquare
          style={{
            position: "relative",
            top: 4,
            marginRight: 8,
            fontSize: 20
          }}
        />
        AP Form (# events)
      </Button>
      button located underneath to the <strong>Forms</strong> panel. Update your
      previous responses accordingly and click the
      <Button
        primary
        display="inline-block"
        type="button"
        width="100px"
        padding="8px"
        margin="0 3px"
      >
        Submit
      </Button>
      button when you&#39;re done.
      <WarningText>
        Be advised that this A/P form button will disappear once the A/P form
        has expired.
      </WarningText>
    </Accordion>
  </>
);

export default FormAndAvailabilityQuestions;
