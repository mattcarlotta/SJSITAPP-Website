import * as React from "react";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import CollapseFlex from "~components/Layout/CollapseFlex";
import FlexEnd from "~components/Layout/FlexEnd";
import Table from "~components/Layout/Table";
import TableFilterButton from "~components/Layout/TableFilterButton";
import Link from "~components/Navigation/Link";
import QueryHandler from "~components/Navigation/QueryHandler";
import { FaCalendarPlus, MdEventNote } from "~icons";
import columns from "./Columns";
import filters from "./Filters";
import { ReactElement } from "~types";

export const ViewEvents = (): ReactElement => (
  <>
    <Header title="View Events" url="/employee/events/viewall" />
    <Card
      dataTestId="view-events-page"
      icon={<MdEventNote />}
      title="View Events"
      subtitle="Past and Present Events"
    >
      <QueryHandler>
        {props => (
          <>
            <CollapseFlex>
              <TableFilterButton filters={filters} {...props} />
              <FlexEnd>
                <Link
                  dataTestId="create-event-link"
                  alt
                  hideShadow
                  width="190px"
                  padding="5.5px 10px"
                  borderRadius="5px"
                  href="/employee/events/create"
                >
                  <FaCalendarPlus
                    style={{ position: "relative", top: 2, marginRight: 5 }}
                  />
                  Create Event
                </Link>
              </FlexEnd>
            </CollapseFlex>
            <Table
              {...props}
              resend
              schedule
              API="events"
              edit="events"
              columns={columns}
            />
          </>
        )}
      </QueryHandler>
    </Card>
  </>
);

export default ViewEvents;
