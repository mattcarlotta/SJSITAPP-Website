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

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
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
          classes={useStyles()}
        >
          Click to view details
        </AccordionSummary>
        <AccordionDetails>
          <Paragraph marginBottom="0px">{children}</Paragraph>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomAccordion;
