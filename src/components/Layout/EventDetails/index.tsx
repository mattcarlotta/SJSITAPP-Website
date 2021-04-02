import * as React from "react";
import isEmpty from "lodash.isempty";
import Badge from "~components/Layout/Badge";
import Bold from "~components/Layout/Bold";
import FormatDate from "~components/Layout/FormatDate";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import Margin from "~components/Layout/Margin";
import { FaClock, FaCalendarCheck } from "~icons";
import { TEventData } from "~types";

export type TEventDetailsProps = {
  event: TEventData;
  id?: string;
};

const EventDetails = ({ event, id }: TEventDetailsProps): JSX.Element => (
  <List
    data-testid="event-details-content"
    boxShadow="0px 1px 6px 1px rgba(0,0,0,0.25)"
    background="#ebebeb"
    borderRadius="3px"
    margin="10px 0 0"
  >
    <ListItem
      data-testid="team"
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
            <Margin left="5px" right="5px">
              vs.
            </Margin>
            {event.opponent}
          </>
        )}
      </Bold>
    </ListItem>
    <ListItem data-testid="event-date">
      <Bold>Date:</Bold>
      <FormatDate
        style={{ display: "inline" }}
        format="MMMM Do, YYYY @ h:mm a"
        date={event.eventDate}
      />
    </ListItem>
    <ListItem data-testid="event-type">
      <Bold>Event Type:</Bold>
      {event.eventType}
    </ListItem>
    {event.notes && (
      <ListItem data-testid="event-notes">
        <Bold>Event Notes:</Bold>
        {event.notes}
      </ListItem>
    )}
    <ListItem data-testid="event-location">
      <Bold>Location:</Bold>
      {event.location}
    </ListItem>
    {event.uniform && (
      <ListItem data-testid="event-uniform">
        <Bold>Uniform:</Bold>
        {event.uniform}
      </ListItem>
    )}
    {event.employeeResponse && (
      <ListItem data-testid="employee-response">
        <Bold>My Response:</Bold>
        <Badge
          style={{ display: "inline-block" }}
          response={event.employeeResponse}
        >
          {event.employeeResponse}
        </Badge>
      </ListItem>
    )}
    {event.employeeNotes && (
      <ListItem data-testid="employee-notes">
        <Bold>Employee Notes:</Bold>
        {event.employeeNotes}
      </ListItem>
    )}
    {!isEmpty(event.schedule) && (
      <ListItem data-testid="schedule-employees">
        <Bold>Schedule:</Bold>
        {event.schedule.map(({ _id, employeeIds }) => (
          <List data-testid="call-time" style={{ marginTop: 5 }} key={_id}>
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
                  data-testid="employee"
                  margin="5px 0 5px 20px"
                  padding="3px 0 3px 10px"
                  color={_id === id ? "#fff" : undefined}
                  style={{
                    backgroundColor: _id === id ? "#006d75" : "",
                    borderRadius: _id === id ? 10 : 0,
                    fontWeight: _id === id ? "bold" : "normal"
                  }}
                >
                  <Margin right="5px">&#9900;</Margin>
                  {_id === id && (
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
                data-testid="no-scheduled"
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
