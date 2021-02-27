import * as React from "react";
import isEmpty from "lodash.isempty";
import Button from "~components/Layout/Button";
import FadeIn from "~components/Layout/FadeIn";
import Team from "~components/Layout/Team";
import EventDetails from "~components/Layout/EventDetails";
import FlexSpaceAround from "~components/Layout/FlexSpaceAround";
import Modal from "~components/Layout/Modal";
import Margin from "~components/Layout/Margin";
import { FaCalendarCheck } from "~icons";
import { CSSProperties, TEventData } from "~types";

const iconStyle = {
  position: "relative",
  verticalAlign: "middle",
  color: "#fff",
  fontSize: 16,
  margin: "0 5px"
} as CSSProperties;

export type TEventProps = {
  btnStyle?: CSSProperties;
  details: Array<TEventData>;
  folder: string;
  height?: number;
  id?: string;
  innerStyle?: CSSProperties;
  padding?: string;
  loggedinUserId?: string;
  scheduleIconStyle?: CSSProperties;
  spacing?: number;
  width?: number;
};

export type TEventState = {
  isVisible: boolean;
  modalContent: any;
};

const Event = ({
  btnStyle,
  details,
  folder,
  height,
  id,
  innerStyle,
  padding,
  loggedinUserId,
  scheduleIconStyle,
  spacing,
  width
}: TEventProps): JSX.Element => {
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
      {!isEmpty(details) &&
        details.map(event => (
          <FadeIn key={event._id} timing="0.4s">
            <Button
              dataTestId="upcoming-event"
              className="event-date"
              type="button"
              primary={event.team === "San Jose Sharks"}
              danger={event.team === "San Jose Barracuda"}
              padding={padding}
              margin="0 auto"
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
          </FadeIn>
        ))}
      <Modal
        dataTestId="event-details-modal"
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

export default Event;
