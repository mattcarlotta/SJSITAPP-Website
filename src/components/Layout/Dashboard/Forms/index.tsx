import * as React from "react";
// import isEmpty from "lodash.isempty";
// import get from "lodash.get";
import Card from "~components/Layout/Card";
import { FaFileSignature } from "~icons";
// import app from "~utils/axiosConfig";
// import { parseData } from "~utils/parseResponse";
// import { AxiosResponse, ReactNode, TEventData } from "~types";

// export type TDashboardEventsState = {
//   isLoading: boolean;
//   isVisible: boolean;
//   error: string;
//   events: Array<TEventData>;
//   modalChildren: ReactNode;
// };

export const Events = (): JSX.Element => {
  // const [state, setState] = React.useState<TDashboardEventsState>({
  //   error: "",
  //   events: [],
  //   isLoading: true,
  //   isVisible: false,
  //   modalChildren: null
  // });

  // const { events, isVisible, modalChildren } = state;

  // const fetchTodayEvents = React.useCallback(async () => {
  //   try {
  //     const res: AxiosResponse = await app.get("dashboard/events/today");
  //     const data = parseData(res);

  //     setState(prevState => ({
  //       ...prevState,
  //       isLoading: false,
  //       events: data.events
  //     }));
  //   } catch (error) {
  //     setState(prevState => ({
  //       ...prevState,
  //       isLoading: false,
  //       error: error.message
  //     }));
  //   }
  // }, []);

  // React.useEffect(() => {
  //   fetchTodayEvents();
  // }, [fetchTodayEvents]);

  return (
    <Card dataTestId="dashboard-forms" icon={<FaFileSignature />} title="Forms">
      Hello
    </Card>
  );
};

export default Events;
