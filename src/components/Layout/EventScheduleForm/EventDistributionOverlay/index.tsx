import * as React from "react";
import isEmpty from "lodash.isempty";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import CloseModalButton from "~components/Layout/CloseModalButton";
import EventDistributionChart from "~components/Layout/EventDistributionChart";
import FadeIn from "~components/Layout/FadeIn";
import FetchError from "~components/Layout/FetchError";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import SlideTransition from "~components/Layout/SlideTransition";
import { FaChartBar, FaTimes } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { ReactElement, TEventDistributionData } from "~types";

export type TEventDistributionOverlayProps = {
  id: string;
};

export type TEventDistributionOverlayState = {
  error: boolean;
  isLoading: boolean;
  isOpen: boolean;
  events: Array<TEventDistributionData>;
};

const EventDistributionOverlay = ({
  id
}: TEventDistributionOverlayProps): ReactElement => {
  const [state, setState] = React.useState<TEventDistributionOverlayState>({
    events: [],
    error: false,
    isLoading: false,
    isOpen: false
  });
  const { error, events, isOpen, isLoading } = state;

  const fetchEventDistribution = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get(`members/event-counts/${id}`);
      const data = parseData<Array<TEventDistributionData>>(res);

      setState(prevState => ({
        ...prevState,
        events: data,
        error: false,
        isLoading: false
      }));
    } catch (err) {
      setState(prevState => ({
        ...prevState,
        error: true,
        isLoading: false
      }));
    }
  }, [app, id, parseData]);

  const handleOpen = (): void => {
    setState(prevState => ({
      ...prevState,
      isLoading: isEmpty(prevState.events),
      isOpen: true
    }));
  };

  const handleClose = (): void => {
    setState(prevState => ({
      ...prevState,
      isLoading: false,
      isOpen: false
    }));
  };

  const handleReload = (): void => {
    setState(prevState => ({
      ...prevState,
      error: false,
      events: [],
      isLoading: true
    }));
  };

  React.useEffect(() => {
    if (isLoading && id) fetchEventDistribution();
  }, [isLoading, id, fetchEventDistribution]);

  return (
    <>
      <Button
        primary
        dataTestId="toggle-event-chart-overlay"
        type="button"
        maxWidth="330px"
        borderRadius="10px"
        onClick={handleOpen}
      >
        <FaChartBar style={{ position: "relative", top: 4, marginRight: 10 }} />
        Monthly Event Distribution
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={isOpen}
        TransitionComponent={SlideTransition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="event-dialog-slide-title"
        aria-describedby="event-dialog-slide-description"
      >
        <Padding top="20px" bottom="30px" left="30px" right="30px">
          <DialogTitle id="event-dialog-slide-title">
            <CloseModalButton
              data-test-id="close-modal"
              aria-label="close modal"
              type="button"
              style={{ top: "15px", right: "25px" }}
              onClick={handleClose}
            >
              <FaTimes style={{ fontSize: 20 }} />
            </CloseModalButton>
          </DialogTitle>
          {isLoading ? (
            <LoadingPanel
              data-testid="loading-schedule-event-form"
              borderRadius="5px"
              height="750px"
            />
          ) : (
            <Center style={{ height: "750px" }}>
              <DialogContent>
                {error ? (
                  <FetchError height="650px" onClickReload={handleReload} />
                ) : (
                  <FadeIn timing="1s">
                    <EventDistributionChart events={events} />
                  </FadeIn>
                )}
              </DialogContent>
            </Center>
          )}
        </Padding>
      </Dialog>
    </>
  );
};

export default EventDistributionOverlay;
