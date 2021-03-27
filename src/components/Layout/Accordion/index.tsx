import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paragraph from "~components/Layout/Paragraph";
import SubHeader from "~components/Navigation/SubHeader";
import { MdExpandMore } from "~icons";
import stripSpaces from "~utils/stripSpaces";

export type TCustomAccordionProps = {
  children: any;
  expanded: string;
  title: string;
};

const useAccStyles = makeStyles({
  expanded: {
    boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.5)"
  }
});

const useAccSumStyles = makeStyles({
  root: {
    backgroundColor: "#f7f7f7",
    border: "1px solid #ccc",
    minHeight: 56
  }
});

const useAccDetStyles = makeStyles({
  root: {
    backgroundColor: "#ddd"
  }
});

const CustomAccordion = ({
  children,
  expanded,
  title
}: TCustomAccordionProps): JSX.Element => {
  const id = stripSpaces(title);
  const isExpanded = expanded === id;
  const [tabExpanded, setExpanded] = React.useState(isExpanded);

  const handleChange = (): void => {
    setExpanded(prevState => !prevState);
  };

  React.useEffect(() => {
    setExpanded(isExpanded);
  }, [expanded]);

  return (
    <>
      <SubHeader>{title}</SubHeader>
      <Accordion
        classes={useAccStyles()}
        expanded={tabExpanded}
        onChange={handleChange}
      >
        <AccordionSummary
          aria-controls={id}
          id={id}
          expandIcon={<MdExpandMore />}
          className={useAccSumStyles().root}
        >
          {!tabExpanded ? "Click to expand answer" : title}
        </AccordionSummary>
        <AccordionDetails className={useAccDetStyles().root}>
          <Paragraph marginBottom="0px">{children}</Paragraph>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomAccordion;
