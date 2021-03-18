import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";

const GeneralQuestions = ({ id }: { id: string }): JSX.Element => (
  <>
    <Center>
      <Title margin="50px 0 0px 0">General Questions</Title>
      <Paragraph>
        Find answers to general questions like how to change your account
        settings and/or navigate the website.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I change my avatar?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion expanded={id} title="How do I change my email?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion expanded={id} title="How do I change my email preferences?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion expanded={id} title="How do I change my first or last name?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion expanded={id} title="How do I change my password?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
    <Accordion expanded={id} title="How do I log out of my current session?">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
      amet blandit leo lobortis eget.
    </Accordion>
  </>
);

export default GeneralQuestions;
