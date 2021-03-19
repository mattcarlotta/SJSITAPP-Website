import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import WarningText from "~components/Layout/WarningText";
import OutsideLink from "~components/Navigation/OutsideLink";
import { FaEdit, FaTools, FaTrash } from "~icons";
import { CSSProperties } from "~types";

const iconStyle = {
  position: "relative",
  top: 2
} as CSSProperties;

const Seasons = ({ id }: { id: string }): JSX.Element => (
  <>
    <Center>
      <Title margin="50px 0 0px 0">Seasons</Title>
      <Paragraph>
        Find answers to all things regarding creating, editing, and deleting
        seasons.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I create a season?">
      To create a season, go to the
      <OutsideLink
        dataTestId="create-season-link"
        href="/employee/seasons/create"
      >
        Create Season
      </OutsideLink>
      page and fill out the&nbsp;
      <strong>New Season</strong> form by: Selecting the&nbsp;
      <strong>Season Duration</strong> (beginning of and end of season) dates.
      Once completed, click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="150px"
        padding="5px"
        margin="0 3px"
      >
        Create Season
      </Button>
      button to create the season.
      <WarningText>
        Be advised that events and forms can&#39;t be created until at least one
        season exists.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I delete a season?">
      To delete a season, go to the
      <OutsideLink
        dataTestId="view-seasons-link"
        href="/employee/seasons/viewall?page=1"
      >
        View Seasons
      </OutsideLink>
      page, underneath the <strong>Table Actions</strong> column, click on one
      of the
      <Button
        primary
        display="inline-block"
        type="button"
        width="50px"
        padding="4px"
        margin="0 3px"
      >
        <FaTools style={iconStyle} />
      </Button>
      table actions buttons to open a menu, then click on the
      <Button
        danger
        display="inline-block"
        type="button"
        width="100px"
        padding="5px"
        margin="0 3px"
      >
        <FaTrash style={{ ...iconStyle, marginRight: 5 }} />
        <span>Delete</span>
      </Button>
      button. A pop up will confirm your selection and will remove the season
      upon confirmation.
      <WarningText>
        Be advised that this action is irreversible. Once deleted, the season is
        permanently removed.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I edit a season?">
      To edit a season, go to the
      <OutsideLink
        dataTestId="edit-season-link"
        href="/employee/seasons/viewall?page=1"
      >
        View Seasons
      </OutsideLink>
      page, underneath the <strong>Table Actions</strong> column, click on one
      of the
      <Button
        primary
        display="inline-block"
        type="button"
        width="50px"
        padding="4px"
        margin="0 3px"
      >
        <FaTools style={iconStyle} />
      </Button>
      table actions buttons to open a menu, then click on the
      <Button
        danger
        display="inline-block"
        type="button"
        width="100px"
        padding="5px"
        margin="0 3px"
      >
        <FaEdit style={{ ...iconStyle, marginRight: 5 }} />
        <span>Edit</span>
      </Button>
      button. Edit any of the fields and click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="160px"
        padding="4px"
        margin="0 3px"
      >
        Update Season
      </Button>
      button to save your changes.
      <WarningText>
        Be advised that editing a season will update any events and forms that
        share its Season ID.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I view all seasons?">
      To view all seasons, go to the
      <OutsideLink
        dataTestId="view-season-link"
        href="/employee/seaons/viewall?page=1"
      >
        View Seasons
      </OutsideLink>
      page.
    </Accordion>
  </>
);

export default Seasons;
