import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import Button from "~components/Layout/Button";
import FadeIn from "~components/Layout/FadeIn";
import Team from "~components/Layout/Team";
import EventDetails from "~components/Layout/EventDetails";
import FlexSpaceAround from "~components/Layout/FlexSpaceAround";
import Modal from "~components/Layout/Modal";
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
  content: Array<TEventData>;
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
  content,
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
    modalContent: null
  });
  const { isVisible, modalContent } = state;

  const handleCloseModal = React.useCallback(() => {
    setState({
      isVisible: false,
      modalContent: null
    });
  }, []);

  const handleShowModal = React.useCallback((modalContent: TEventData) => {
    setState({
      isVisible: true,
      // @ts-ignore
      modalContent
    });
  }, []);

  return (
    <>
      {!isEmpty(content) &&
        content.map(item => (
          <FadeIn key={item._id} timing="0.4s">
            <Button
              dataTestId="upcoming-event"
              className="event-date"
              type="button"
              primary={item.team === "San Jose Sharks"}
              danger={item.team === "San Jose Barracuda"}
              padding={padding}
              margin="0 auto"
              maxWidth="250px"
              style={btnStyle}
              onClick={() => handleShowModal(item)}
            >
              <FlexSpaceAround style={innerStyle}>
                {!isEmpty(item.schedule) &&
                  item.schedule.map(({ employeeIds }) =>
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
                  team={item.team}
                />
                {item.opponent && (
                  <>
                    <span
                      css={css`
                        margin: 0 ${spacing || 5}px;
                      `}
                    >
                      vs.
                    </span>
                    <Team
                      folder={folder || "calendar"}
                      size={height || width}
                      team={item.opponent}
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
          // @ts-ignore
          event={modalContent}
          id={id}
          loggedinUserId={loggedinUserId}
        />
      </Modal>
    </>
  );
};

export default Event;
