import EmailStatus from "~components/Layout/EmailStatus";
import EmailSendToList from "~components/Layout/EmailSendToList";
import FormatDate from "~components/Layout/FormatDate";
import { dateTimeFormat } from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams, ReactElement } from "~types";

const Columns: GridColumns = [
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <EmailStatus status={params.getValue("status") as string} />
    )
  },
  {
    field: "sendTo",
    headerName: "Send To",
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <EmailSendToList emails={params.getValue("sendTo") as Array<string>} />
    )
  },
  {
    field: "sendFrom",
    headerName: "Send From",
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <EmailSendToList
        emails={[params.getValue("sendFrom")] as Array<string>}
      />
    )
  },
  {
    field: "sendDate",
    headerName: "Send Date",
    flex: 1.25,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue("sendDate") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "subject",
    headerName: "Subject",
    flex: 1.25
  }
];

export default Columns;
