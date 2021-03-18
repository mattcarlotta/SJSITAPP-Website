import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";

const ScheduleQuestions = ({ id }: { id: string }): JSX.Element => (
  <>
    <Center>
      <Title margin="50px 0 0px 0">Scheduling Questions</Title>
      <Paragraph>
        Find answers to questions about all things involving scheduling.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I view my monthly schedule?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion expanded={id} title="How do I view my scheduled games?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion expanded={id} title="How is scheduling determined?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
  </>
);

export default ScheduleQuestions;
