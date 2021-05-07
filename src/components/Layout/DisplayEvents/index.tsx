import * as React from "react";
import isEmpty from "lodash.isempty";
import { Dialog } from "@material-ui/core";
import Button from "~components/Layout/Button";
import CloseModalButton from "~components/Layout/CloseModalButton";
import EventDetails from "~components/Layout/EventDetails";
import FlexSpaceAround from "~components/Layout/FlexSpaceAround";
import Margin from "~components/Layout/Margin";
import NoEvents from "~components/Layout/NoEvents";
import Padding from "~components/Layout/Padding";
import SlideTransition from "~components/Layout/SlideTransition";
import Team from "~components/Layout/Team";
import { FaCalendarCheck, FaTimes } from "~icons";
import { CSSProperties, ReactElement, TEventData } from "~types";

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
  nextWeek,
  scheduleIconStyle,
  spacing,
  width
}: TDisplayEventProps): ReactElement => {
  const [state, setState] = React.useState<TDisplayEventState>({
    isVisible: false,
    modalContent: {} as TEventData
  });
  const { isVisible, modalContent } = state;

  const handleCloseModal = (): void => {
    setState(prevState => ({
      ...prevState,
      isVisible: false
    }));
  };

  const handleResetModalContent = (): void => {
    setState(prevState => ({
      ...prevState,
      modalContent: {} as TEventData
    }));
  };

  const handleShowModal = (modalContent: TEventData): void => {
    setState({
      isVisible: true,
      modalContent
    });
  };

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
                  employeeIds.some(({ _id }) => _id === id) ? (
                    <FaCalendarCheck
                      key={id}
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
      <Dialog
        open={isVisible}
        fullWidth
        maxWidth="sm"
        TransitionComponent={SlideTransition}
        onClose={handleCloseModal}
        onExited={handleResetModalContent}
      >
        <CloseModalButton
          data-testid="close-modal"
          aria-label="close modal"
          type="button"
          style={{ top: "15px", right: "25px" }}
          onClick={handleCloseModal}
        >
          <FaTimes style={{ fontSize: 20 }} />
        </CloseModalButton>
        <Padding top="40px" right="40px" bottom="40px" left="40px">
          <EventDetails event={modalContent} id={id} />
        </Padding>
      </Dialog>
    </>
  );
};

export default DisplayEvents;
