import * as React from "react";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import CollapseFlex from "~components/Layout/CollapseFlex";
import FlexEnd from "~components/Layout/FlexEnd";
import Table from "~components/Layout/Table";
import TableFilterButton from "~components/Layout/TableFilterButton";
import Link from "~components/Navigation/Link";
import QueryHandler from "~components/Navigation/QueryHandler";
import { FaFileSignature, FaKey } from "~icons";
import columns from "./Columns";
import filters from "./Filters";

export const ViewForms = (): JSX.Element => (
  <>
    <Header title="View Forms" url="/employee/forms/viewall" />
    <Card
      dataTestId="view-forms-page"
      icon={<FaKey />}
      title="View Forms"
      subtitle="Past and Present Forms"
    >
      <QueryHandler>
        {props => (
          <>
            <CollapseFlex>
              <TableFilterButton filters={filters} {...props} />
              <FlexEnd>
                <Link
                  dataTestId="create-form-link"
                  alt
                  hideShadow
                  width="190px"
                  padding="5px 10px"
                  borderRadius="5px"
                  href="/employee/forms/create"
                >
                  <FaFileSignature
                    style={{ position: "relative", top: 2, marginRight: 5 }}
                  />
                  Create Form
                </Link>
              </FlexEnd>
            </CollapseFlex>
            <Table
              {...props}
              resend
              API="forms"
              edit="forms"
              view="forms"
              columns={columns}
            />
          </>
        )}
      </QueryHandler>
    </Card>
  </>
);

export default ViewForms;
