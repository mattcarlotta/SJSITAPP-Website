import * as React from "react";
import isEmpty from "lodash.isempty";
import Button from "~components/Layout/Button";
import Team from "~components/Layout/Team";
import EventDetails from "~components/Layout/EventDetails";
import FlexSpaceAround from "~components/Layout/FlexSpaceAround";
import Modal from "~components/Layout/Modal";
import Margin from "~components/Layout/Margin";
import NoEvents from "~components/Layout/NoEvents";
import { FaCalendarCheck } from "~icons";
import { CSSProperties, TEventData } from "~types";

const iconStyle = {
  position: "relative",
  verticalAlign: "middle",
  color: "#fff",
  fontSize: 16,
  margin: "0 5px"
} as CSSProperties;

export type FolderTypes = "badges" | "calendar" | "lowres" | string;

export type TDisplayEventProps = {
  btnStyle?: CSSProperties;
  events: Array<TEventData>;
  folder?: FolderTypes;
  height?: number;
  id?: string;
  innerStyle?: CSSProperties;
  loggedinUserId?: string;
  nextWeek?: boolean;
  scheduleIconStyle?: CSSProperties;
  spacing?: number;
  width?: number;
};

export type TDisplayEventState = {
  isVisible: boolean;
  modalContent: TEventData;
};

const DisplayEvents = ({
  btnStyle,
  events,
  folder,
  height,
  id,
  innerStyle,
  loggedinUserId,
  nextWeek,
  scheduleIconStyle,
  spacing,
  width
}: TDisplayEventProps): JSX.Element => {
  const [state, setState] = React.useState({
    isVisible: false,
    modalContent: {}
  });
  const { isVisible, modalContent } = state;

  const handleCloseModal = React.useCallback(() => {
    setState({
      isVisible: false,
      modalContent: {}
    });
  }, []);

  const handleShowModal = React.useCallback((modalContent: TEventData) => {
    setState({
      isVisible: true,
      modalContent
    });
  }, []);

  return (
    <>
      {!isEmpty(events) ? (
        events.map(event => (
          <Button
            dataTestId="upcoming-event"
            key={event._id}
            className="event-date"
            type="button"
            primary={event.team === "San Jose Sharks"}
            danger={event.team === "San Jose Barracuda"}
            padding="5px 20px"
            margin="0 auto 5px auto"
            maxWidth="250px"
            style={btnStyle}
            onClick={() => handleShowModal(event)}
          >
            <FlexSpaceAround style={innerStyle}>
              {!isEmpty(event.schedule) &&
                event.schedule.map(({ employeeIds }) =>
                  !isEmpty(employeeIds) &&
                  employeeIds.some(({ _id }) => _id === loggedinUserId) ? (
                    <FaCalendarCheck
                      key={loggedinUserId}
                      style={{ ...iconStyle, ...scheduleIconStyle }}
                    />
                  ) : null
                )}
              <Team
                folder={folder || "calendar"}
                size={height || width}
                team={event.team}
              />
              {event.opponent && (
                <>
                  <Margin
                    left={`${spacing || 5}px`}
                    right={`${spacing || 5}px`}
                  >
                    vs.
                  </Margin>
                  <Team
                    folder={folder || "calendar"}
                    size={height || width}
                    team={event.opponent}
                  />
                </>
              )}
            </FlexSpaceAround>
          </Button>
        ))
      ) : (
        <NoEvents today={!nextWeek} />
      )}
      <Modal
        dataTestId="event-events-modal"
        isOpen={isVisible}
        onClick={handleCloseModal}
        maxWidth="500px"
      >
        <EventDetails
          event={modalContent as TEventData}
          id={id}
          loggedinUserId={loggedinUserId}
        />
      </Modal>
    </>
  );
};

export default DisplayEvents;
