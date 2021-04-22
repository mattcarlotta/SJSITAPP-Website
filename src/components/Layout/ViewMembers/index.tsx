import * as React from "react";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import CollapseFlex from "~components/Layout/CollapseFlex";
import FlexEnd from "~components/Layout/FlexEnd";
import Table from "~components/Layout/Table";
import TableFilterButton from "~components/Layout/TableFilterButton";
import Link from "~components/Navigation/Link";
import QueryHandler from "~components/Navigation/QueryHandler";
import { FaUsers, FaUserPlus } from "~icons";
import columns from "./Columns";
import filters from "./Filters";
import { ReactElement } from "~types";

export const ViewMembers = (): ReactElement => (
  <>
    <Header title="View Members" url="/employee/mail/viewall" />
    <Card
      dataTestId="view-members-page"
      icon={<FaUsers />}
      title="View Mail"
      subtitle="Find and View Active and Suspended Members"
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
            <Table
              {...props}
              disableCheckbox
              API="members"
              view="members"
              columns={columns}
            />
          </>
        )}
      </QueryHandler>
    </Card>
  </>
);

export default ViewMembers;
