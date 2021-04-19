import { DataGrid } from "@material-ui/data-grid";
import { createStyles, Theme, makeStyles } from "@material-ui/core";
import NoTableData from "~components/Layout/NoTableData";
import {
  GridColumns,
  GridRowsProp,
  GridPageChangeParams,
  GridSelectionModelChangeParams,
  ReactElement
} from "~types";

export type TTableProps = {
  columns: GridColumns;
  disableCheckbox: boolean;
  page: number;
  rows: GridRowsProp;
  totalDocs: number;
  handlePageChange: (params: GridPageChangeParams) => void;
  handleSelectionChange: (selection: GridSelectionModelChangeParams) => void;
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
      border:
        theme.palette.type === "light"
          ? "1px solid #f0f0f0"
          : "1px solid #1d1d1d",
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
      "& .MuiDataGrid-columnsContainer": {
        backgroundColor: theme.palette.type === "light" ? "#fafafa" : "#1d1d1d"
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
      "& .MuiDataGrid-colCell:nth-last-child(2), .MuiDataGrid-cell:nth-last-child(2)": {
        borderRight: 0
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
        textAlign: "center",
        // justifyContent: "center",
        textOverflow: "unset",
        overflowX: "auto"
      },
      ...customCheckbox(theme)
    }
  })
);

const CustomDataGrid = ({
  disableCheckbox,
  columns,
  handlePageChange,
  handleSelectionChange,
  page,
  rows,
  totalDocs
}: TTableProps): ReactElement => (
  <DataGrid
    autoHeight
    className={useStyles().root}
    components={{
      NoRowsOverlay: NoTableData
    }}
    checkboxSelection={!disableCheckbox}
    disableColumnMenu
    disableSelectionOnClick
    columns={columns}
    getRowId={row => row._id}
    onPageChange={handlePageChange}
    onSelectionModelChange={handleSelectionChange}
    pagination
    page={page}
    pageSize={10}
    paginationMode="server"
    rows={rows}
    rowCount={totalDocs}
  />
);

CustomDataGrid.defaultProps = {
  disableCheckbox: false
};

export default CustomDataGrid;
