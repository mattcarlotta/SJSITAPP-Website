import * as React from "react";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import FlexEnd from "~components/Layout/FlexEnd";
import Table from "~components/Layout/Table";
import Link from "~components/Navigation/Link";
import QueryHandler from "~components/Navigation/QueryHandler";
import { FaFolderPlus, FaKey } from "~icons";
import columns from "./Columns";

export const ViewSeasons = (): JSX.Element => (
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
          dataTestId="create-season-link"
          alt
          hideShadow
          width="180px"
          margin="20px 20px 10px 0"
          padding="5px 10px"
          href="/employee/seasons/create"
        >
          <FaFolderPlus
            style={{ position: "relative", top: 2, marginRight: 10 }}
          />
          New Season
        </Link>
      </FlexEnd>
      <QueryHandler>
        {props => (
          <Table {...props} API="seasons" edit="seasons" columns={columns} />
        )}
      </QueryHandler>
    </Card>
  </>
);

export default ViewSeasons;
