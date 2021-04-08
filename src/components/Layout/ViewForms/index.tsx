import * as React from "react";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import FlexEnd from "~components/Layout/FlexEnd";
import Table from "~components/Layout/Table";
import Link from "~components/Navigation/Link";
import QueryHandler from "~components/Navigation/QueryHandler";
import { FaFileSignature, FaKey } from "~icons";
import columns from "./Columns";

export const ViewForms = (): JSX.Element => (
  <>
    <Header title="View Forms" url="/employee/forms/viewall" />
    <Card
      dataTestId="view-forms-page"
      icon={<FaKey />}
      title="View Forms"
      subtitle="Past and Present Forms"
    >
      <FlexEnd>
        <Link
          dataTestId="create-form-link"
          alt
          hideShadow
          width="180px"
          margin="20px 20px 10px 0"
          padding="5px 10px"
          href="/employee/forms/create"
        >
          <FaFileSignature
            style={{ position: "relative", top: 2, marginRight: 5 }}
          />
          New Form
        </Link>
      </FlexEnd>
      <QueryHandler>
        {props => (
          <Table
            {...props}
            resend
            API="forms"
            edit="forms"
            view="forms"
            columns={columns}
          />
        )}
      </QueryHandler>
    </Card>
  </>
);

export default ViewForms;
