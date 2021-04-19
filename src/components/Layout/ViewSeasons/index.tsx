import * as React from "react";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import CollapseFlex from "~components/Layout/CollapseFlex";
import FlexEnd from "~components/Layout/FlexEnd";
import Table from "~components/Layout/Table";
import TableFilterButton from "~components/Layout/TableFilterButton";
import Link from "~components/Navigation/Link";
import QueryHandler from "~components/Navigation/QueryHandler";
import { FaFolderPlus, FaKey } from "~icons";
import columns from "./Columns";
import filters from "./Filters";
import { ReactElement } from "~types";

export const ViewSeasons = (): ReactElement => (
  <>
    <Header title="View Seasons" url="/employee/seasons/viewall" />
    <Card
      dataTestId="view-seasons-page"
      icon={<FaKey />}
      title="View Seasons"
      subtitle="Past and Present Seasons"
    >
      <QueryHandler>
        {props => (
          <>
            <CollapseFlex>
              <TableFilterButton filters={filters} {...props} />
              <FlexEnd>
                <Link
                  dataTestId="create-season-link"
                  alt
                  hideShadow
                  width="180px"
                  padding="5.5px 10px"
                  borderRadius="5px"
                  href="/employee/seasons/create"
                >
                  <FaFolderPlus
                    style={{ position: "relative", top: 2, marginRight: 10 }}
                  />
                  New Season
                </Link>
              </FlexEnd>
            </CollapseFlex>
            <Table
              {...props}
              disableCheckbox
              API="seasons"
              edit="seasons"
              columns={columns}
            />
          </>
        )}
      </QueryHandler>
    </Card>
  </>
);

export default ViewSeasons;
