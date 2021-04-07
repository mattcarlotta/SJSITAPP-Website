import * as React from "react";
import toast from "~components/App/Toast";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import FlexEnd from "~components/Layout/FlexEnd";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Table from "~components/Layout/Table";
import Link from "~components/Navigation/Link";
// import QueryHandler from "~components/Navigation/QueryHandler";
import { FaFolderPlus, FaKey } from "~icons";
import columns from "./Columns";
// import Filters from "./Filters";
// import columns from "./Columns";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { TSeasonData } from "~types";

export type TViewSeasonsState = {
  data: Array<TSeasonData>;
  isLoading: boolean;
  totalDocs: number;
};

export type TSeasonTableData = {
  seasons: Array<TSeasonData>;
  totalDocs: number;
};

export const ViewSeasons = (): JSX.Element => {
  const [state, setState] = React.useState<TViewSeasonsState>({
    data: [],
    isLoading: true,
    totalDocs: 0
  });
  const { data, isLoading, totalDocs } = state;

  const fetchInitialSeasons = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get("seasons/viewall?page=1");
      const data = parseData<TSeasonTableData>(res);

      setState({
        data: data.seasons,
        isLoading: false,
        totalDocs: data.totalDocs
      });
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }, [app, parseData]);

  React.useEffect(() => {
    if (isLoading) fetchInitialSeasons();
  }, [isLoading]);

  return (
    <>
      <Header title="View Seasons" url="/employee/seasons/viewall" />
      <Card
        dataTestId="view-seasons-page"
        icon={<FaKey />}
        title="View Seasons"
        subtitle="Past and Present Seasons"
      >
        <FlexEnd>
          <Link
            dataTestId="nav-create-season"
            alt
            hideShadow
            width="180px"
            margin="20px 20px 0 0"
            padding="5px 10px"
            href="/employee/seasons/create"
          >
            <FaFolderPlus style={{ position: "relative", top: 2 }} />
            &nbsp; New Season
          </Link>
        </FlexEnd>
        {isLoading ? (
          <LoadingPanel
            data-testid="loading-events"
            borderRadius="5px"
            height="650px"
          />
        ) : (
          <Table columns={columns} rows={data} totalDocs={totalDocs} />
        )}
      </Card>
    </>
  );
};

export default ViewSeasons;

/*
	<Filters {...props} {...rest} />
						<Table
							{...props}
							{...rest}
							columns={columns}
							data={tokens}
							deleteAction={deleteToken}
							deleteManyRecords={deleteManyTokens}
							fetchData={fetchTokens}
							editLocation="members/authorizations"
							sendMail={resendToken}
						/>
            */
