import * as React from "react";
import Card from "~components/Layout/Card";
import Header from "~components/Navigation/Header";
import FlexEnd from "~components/Layout/FlexEnd";
import Table from "~components/Layout/Table";
import Link from "~components/Navigation/Link";
import QueryHandler from "~components/Navigation/QueryHandler";
import { FaMailBulk, FaEdit } from "~icons";
import columns from "./Columns";

export const ViewMail = (): JSX.Element => (
  <>
    <Header title="View Forms" url="/employee/mail/viewall" />
    <Card
      dataTestId="view-mail-page"
      icon={<FaMailBulk />}
      title="View Mail"
      subtitle="View All Emails"
    >
      <FlexEnd>
        <Link
          dataTestId="create-mail-link"
          alt
          hideShadow
          width="190px"
          margin="20px 20px 10px 0"
          padding="5px 10px"
          href="/employee/mail/create"
        >
          <FaEdit style={{ position: "relative", top: 2, marginRight: 8 }} />
          Compose Mail
        </Link>
      </FlexEnd>
      <QueryHandler>
        {props => (
          <Table {...props} resend API="mail" view="mail" columns={columns} />
        )}
      </QueryHandler>
    </Card>
  </>
);

export default ViewMail;
