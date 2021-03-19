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
  const [tabExpanded, setExpanded] = React.useState(expanded === id);

  const handleChange = React.useCallback((): void => {
    setExpanded(prevState => !prevState);
  }, []);

  React.useEffect(() => {
    setExpanded(expanded === id);
  }, [expanded]);

  return (
    <>
      <SubHeader>{title}</SubHeader>
      <Accordion expanded={tabExpanded} onChange={handleChange}>
        <AccordionSummary
          aria-controls={id}
          id={id}
          expandIcon={<MdExpandMore />}
          className={useAccSumStyles().root}
        >
          Click to view details
        </AccordionSummary>
        <AccordionDetails className={useAccDetStyles().root}>
          <Paragraph marginBottom="0px">{children}</Paragraph>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomAccordion;
