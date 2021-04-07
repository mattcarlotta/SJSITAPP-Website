import { DataGrid } from "@material-ui/data-grid";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { GridColumns, GridRowsProp } from "~types";

export type TTableProps = {
  columns: GridColumns;
  rows: GridRowsProp;
  totalDocs: number;
};

const customCheckbox = (theme: Theme) => ({
  "& .MuiCheckbox-root svg": {
    width: 16,
    height: 16,
    backgroundColor: "transparent",
    border: `1px solid ${
      theme.palette.type === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
    }`,
    borderRadius: 2
  },
  "& .MuiCheckbox-root svg path": {
    display: "none"
  },
  "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
    backgroundColor: "#1890ff",
    borderColor: "#1890ff"
  },
  "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
    position: "absolute",
    display: "table",
    border: "2px solid #fff",
    borderTop: 0,
    borderLeft: 0,
    transform: "rotate(45deg) translate(-50%,-50%)",
    opacity: 1,
    transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
    content: '""',
    top: "50%",
    left: "39%",
    width: 5.71428571,
    height: 9.14285714
  },
  "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after": {
    width: 8,
    height: 8,
    backgroundColor: "#1890ff",
    transform: "none",
    top: "39%",
    border: 0
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: 0,
      color:
        theme.palette.type === "light"
          ? "rgba(0,0,0,.85)"
          : "rgba(255,255,255,0.85)",
      WebkitFontSmoothing: "auto",
      letterSpacing: "normal",
      "& .MuiDataGrid-cell:focus": {
        outline: 0
      },
      "& .MuiDataGrid-colCell:focus": {
        outline: 0
      },
      "& .MuiDataGrid-row:hover": {
        backgroundColor: "#fafafa"
      },
      "& .MuiDataGrid-renderingZone": {
        borderLeft:
          theme.palette.type === "light"
            ? "1px solid #f0f0f0"
            : "1px solid #1d1d1d"
      },
      "& .MuiDataGrid-columnsContainer": {
        backgroundColor: theme.palette.type === "light" ? "#fafafa" : "#1d1d1d",
        border:
          theme.palette.type === "light"
            ? "1px solid #f0f0f0"
            : "1px solid #1d1d1d"
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none"
      },
      "& .MuiDataGrid-colCellTitleContainer": {
        justifyContent: "center"
      },
      "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
        borderRight: `1px solid ${
          theme.palette.type === "light" ? "#f0f0f0" : "#303030"
        }`
      },
      "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid ${
          theme.palette.type === "light" ? "#f0f0f0" : "#303030"
        }`
      },
      "& .MuiDataGrid-cell": {
        color:
          theme.palette.type === "light"
            ? "rgba(0,0,0,.85)"
            : "rgba(255,255,255,0.65)",
        display: "flex",
        justifyContent: "center",
        overflowX: "auto"
      },
      "& .MuiPaginationItem-root": {
        borderRadius: 0
      },
      ...customCheckbox(theme)
    }
  })
);

const CustomDataGrid = ({
  columns,
  rows,
  totalDocs
}: TTableProps): JSX.Element => (
  <DataGrid
    className={useStyles().root}
    checkboxSelection
    disableColumnMenu
    pagination
    rows={rows}
    rowCount={totalDocs}
    getRowId={row => row._id}
    columns={columns}
    pageSize={10}
  />
);

export default CustomDataGrid;
