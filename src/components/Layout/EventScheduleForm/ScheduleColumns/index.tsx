import * as React from "react";
import { css } from "@emotion/react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided
} from "react-beautiful-dnd";
import Bold from "~components/Layout/Bold";
import FormatDate from "~components/Layout/FormatDate";
import Legend from "~components/Layout/Legend";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import Row from "~components/Layout/Row";
import FlexCenter from "~components/Layout/FlexCenter";
import { shortDateTimeFormat } from "~utils/dateFormats";
import DropContainer from "../DropContainer";
import EventContainer from "../EventContainer";
import { TEvent, TEventColumns, TEventUsers } from "~types";

export type TScheduleColumnsProps = {
  event: TEvent;
  columns: TEventColumns;
  users: TEventUsers;
  handleDrag: (result: DropResult, provided: ResponderProvided) => void;
};

const ScheduleColumns = ({
  handleDrag,
  event,
  columns,
  users
}: TScheduleColumnsProps): JSX.Element => (
  <div
    css={css`
      padding: 15px;
      margin-bottom: 25px;
      height: 100%;
      border-bottom: 1px solid rgb(232, 237, 242);
    `}
  >
    <DragDropContext onDragEnd={handleDrag}>
      <FlexCenter>
        <Legend />
        <EventContainer>
          <div
            css={css`
              text-align: center;
              color: #fff;
              background: #0d6472;
              border-radius: 3px;
              padding: 10px 5px;
              text-transform: uppercase;
              font-size: 17px;
            `}
          >
            {event.team}&nbsp;
            {event.opponent && (
              <>
                <span
                  css={css`
                    margin: 0 5px;
                  `}
                >
                  vs.&nbsp;
                </span>
                {event.opponent}
                &nbsp;
              </>
            )}
          </div>
          <List style={{ padding: "0 5px", fontSize: 17 }}>
            <ListItem>
              <Bold>Event Date: </Bold>&nbsp;
              <FormatDate
                date={event.eventDate}
                format={shortDateTimeFormat}
                style={{ display: "inline" }}
              />
            </ListItem>
            <ListItem>
              <Bold>Location: </Bold> {event.location}
            </ListItem>
            <ListItem>
              <Bold>Uniform: </Bold> {event.uniform}
            </ListItem>
            <ListItem>
              <Bold>Notes: </Bold> {event.notes || "(none)"}
            </ListItem>
          </List>
        </EventContainer>
      </FlexCenter>
      <Row>
        {columns.map(({ _id, title, employeeIds }) => (
          <DropContainer
            id={_id}
            key={_id}
            title={title}
            users={
              employeeIds.map(id =>
                users.find(user => user._id === id)
              ) as TEventUsers
            }
            width={`${100 / columns.length - 1}%`}
          />
        ))}
      </Row>
    </DragDropContext>
  </div>
);

export default ScheduleColumns;
