import * as React from "react";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import CollapseFlex from "~components/Layout/CollapseFlex";
import FlexEnd from "~components/Layout/FlexEnd";
import Table from "~components/Layout/Table";
import TableFilterButton from "~components/Layout/TableFilterButton";
import Link from "~components/Navigation/Link";
import QueryHandler from "~components/Navigation/QueryHandler";
import { FaMailBulk, FaEdit } from "~icons";
import columns from "./Columns";
import filters from "./Filters";
import { ReactElement } from "~types";

export const ViewMail = (): ReactElement => (
  <>
    <Header title="View Mail" url="/employee/mail/viewall" />
    <Card
      dataTestId="view-mail-page"
      icon={<FaMailBulk />}
      title="View Mail"
      subtitle="View All Past and Present Emails"
    >
      <QueryHandler>
        {props => (
          <>
            <CollapseFlex>
              <TableFilterButton filters={filters} {...props} />
              <FlexEnd>
                <Link
                  dataTestId="create-mail-link"
                  alt
                  hideShadow
                  width="190px"
                  padding="5.5px 10px"
                  borderRadius="5px"
                  href="/employee/mail/create"
                >
                  <FaEdit
                    style={{ position: "relative", top: 2, marginRight: 8 }}
                  />
                  Compose Mail
                </Link>
              </FlexEnd>
            </CollapseFlex>
            <Table {...props} resend API="mail" view="mail" columns={columns} />
          </>
        )}
      </QueryHandler>
    </Card>
  </>
);

export default ViewMail;
