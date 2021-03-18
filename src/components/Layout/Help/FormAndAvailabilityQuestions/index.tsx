import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";

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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion
      expanded={id}
      title="How do I view my monthly A/P form responses?"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion expanded={id} title="How do I view an A/P form?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion
      expanded={id}
      title="How do I add my availability to an A/P form?"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion expanded={id} title="How do I update my A/P form availabilty?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
  </>
);

export default FormAndAvailabilityQuestions;
