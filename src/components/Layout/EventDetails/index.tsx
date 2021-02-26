import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import Badge from "~components/Layout/Badge";
import Bold from "~components/Layout/Bold";
import FormatDate from "~components/Layout/FormatDate";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import Margin from "~components/Layout/Margin";
import { FaClock, FaCalendarCheck } from "~icons";
import moment from "~utils/momentWithTimezone";
import { TEventData } from "~types";

export type TEventDetailsProps = {
  event: TEventData;
  id?: string;
  loggedinUserId?: string;
};

const EventDetails = ({
  event,
  id,
  loggedinUserId
}: TEventDetailsProps): JSX.Element => (
  <List
    key="modal-content"
    boxShadow="0px 1px 6px 1px rgba(0,0,0,0.25)"
    background="#ebebeb"
    borderRadius="3px"
    margin="10px 0 0"
  >
    <ListItem
      className="team"
      team={event.team}
      margin="0"
      color="#fff"
      textAlign="center"
      padding="15px 10px"
    >
      <Bold>
        {event.team}
        {event.opponent && (
          <>
            <span
              css={css`
                margin: 0 5px;
                word-wrap: break-word;
              `}
            >
              vs.
            </span>
            {event.opponent}
          </>
        )}
      </Bold>
    </ListItem>
    <ListItem padding="0 10px">
      <Bold>Event Type: </Bold> {event.eventType}
    </ListItem>
    <ListItem padding="0 10px">
      <Bold>Date: </Bold>&nbsp;
      {moment(event.eventDate).format("MMMM Do, YYYY @ h:mm a")}
    </ListItem>
    {event.notes && (
      <ListItem padding="0 10px">
        <Bold>Event Notes: </Bold> {event.notes}
      </ListItem>
    )}
    <ListItem padding="0 10px">
      <Bold>Location: </Bold> {event.location}
    </ListItem>
    {event.uniform && (
      <ListItem padding="0 10px">
        <Bold>Uniform: </Bold> {event.uniform}
      </ListItem>
    )}
    {event.employeeResponse && (
      <ListItem padding="0 10px">
        <Bold>Employee Response:</Bold>
        <Badge
          style={{ display: "inline-block" }}
          response={event.employeeResponse}
        >
          {event.employeeResponse}
        </Badge>
      </ListItem>
    )}
    {event.employeeNotes && (
      <ListItem padding="0 10px">
        <Bold>Employee Notes:</Bold> {event.employeeNotes}
      </ListItem>
    )}
    {!isEmpty(event.schedule) && (
      <ListItem padding="0 10px">
        <Bold>Scheduled Employees</Bold>
        {event.schedule.map(({ _id, employeeIds }) => (
          <List style={{ marginTop: 5 }} key={_id}>
            <Bold style={{ paddingLeft: 10 }}>
              <FaClock
                style={{
                  marginRight: 7,
                  fontSize: 14,
                  position: "relative",
                  top: 1
                }}
              />
              <FormatDate
                style={{ display: "inline" }}
                format="hh:mm a"
                date={_id}
              />
            </Bold>
            {!isEmpty(employeeIds) ? (
              employeeIds.map(({ _id, firstName, lastName }) => (
                <ListItem
                  key={_id}
                  className="employee"
                  margin="0 0 0 20px"
                  padding="0 0 0 10px"
                  color={
                    _id === id || _id === loggedinUserId ? "#fff" : undefined
                  }
                  style={{
                    backgroundColor:
                      _id === id || _id === loggedinUserId ? "#006d75" : "",

                    fontWeight:
                      _id === id || _id === loggedinUserId ? "bold" : "normal"
                  }}
                >
                  <Margin right="5px">&#9900;</Margin>
                  {(_id === id || _id === loggedinUserId) && (
                    <Margin right="5px">
                      <FaCalendarCheck
                        style={{
                          fontSize: 14
                        }}
                      />
                    </Margin>
                  )}
                  <span>
                    {firstName} {lastName}
                  </span>
                </ListItem>
              ))
            ) : (
              <ListItem
                className="none-scheduled"
                margin="5px 0 5px 20px"
                padding="0 0 0 10px"
              >
                <Margin right="5px">&#9900;</Margin>
                &#40;none&#41;
              </ListItem>
            )}
          </List>
        ))}
      </ListItem>
    )}
  </List>
);

export default EventDetails;
