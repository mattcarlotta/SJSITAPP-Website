import * as React from "react";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import CollapseFlex from "~components/Layout/CollapseFlex";
import FlexEnd from "~components/Layout/FlexEnd";
import Table from "~components/Layout/Table";
import TableFilterButton from "~components/Layout/TableFilterButton";
import Link from "~components/Navigation/Link";
import QueryHandler from "~components/Navigation/QueryHandler";
import { FaKey, FaUserPlus } from "~icons";
import columns from "./Columns";
import filters from "./Filters";
import { ReactElement } from "~types";

export const ViewAuthorizations = (): ReactElement => (
  <>
    <Header title="View Authorizations" url="/employee/mail/viewall" />
    <Card
      dataTestId="view-authorizations-page"
      icon={<FaKey />}
      title="View Authorizations"
      subtitle="View Member Authorizations"
    >
      <QueryHandler>
        {props => (
          <>
            <CollapseFlex>
              <TableFilterButton filters={filters} {...props} />
              <FlexEnd>
                <Link
                  dataTestId="add-member-link"
                  alt
                  hideShadow
                  width="190px"
                  padding="5.5px 10px"
                  borderRadius="5px"
                  href="/employee/members/create"
                >
                  <FaUserPlus
                    style={{ position: "relative", top: 2, marginRight: 8 }}
                  />
                  Create Member
                </Link>
              </FlexEnd>
            </CollapseFlex>
            <Table {...props} resend API="tokens" columns={columns} />
          </>
        )}
      </QueryHandler>
    </Card>
  </>
);

export default ViewAuthorizations;
