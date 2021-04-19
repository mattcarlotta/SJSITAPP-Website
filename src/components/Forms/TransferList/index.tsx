import * as React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Card,
  CardHeader,
  Divider
} from "@material-ui/core";
import Errors from "~components/Forms/Errors";
import Label from "~components/Forms/Label";
import { FaChevronUp, FaChevronDown } from "~icons";
import { EmailTransferList, EventTarget, ReactNode } from "~types";

const useStyles = makeStyles<Theme, { errors?: string }>((theme: Theme) =>
  createStyles({
    root: {
      display: "block",
      width: "100%",
      margin: "auto",
      "& .MuiGrid-item": {
        padding: "2px 0"
      }
    },
    card: {
      border: ({ errors }) => (!errors ? "1px solid #ccc" : "1px solid red"),
      boxShadow: "none"
    },
    cardHeader: {
      padding: theme.spacing(1, 2)
    },
    list: {
      height: 200,
      backgroundColor: theme.palette.background.paper,
      overflow: "auto"
    },
    button: {
      margin: theme.spacing(0.5, 0)
    }
  })
);

function not(a: EmailTransferList, b: EmailTransferList) {
  return a.filter(email => b.indexOf(email) === -1);
}

function intersection(a: EmailTransferList, b: EmailTransferList) {
  return a.filter(email => b.indexOf(email) !== -1);
}

function union(a: EmailTransferList, b: EmailTransferList) {
  return [...a, ...not(b, a)];
}

export type TTransferListProps = {
  name: string;
  label?: ReactNode;
  errors?: string;
  onChange: ({ target: { name, value } }: EventTarget) => void;
  transferList: EmailTransferList;
  tooltip?: string;
};

const TransferList = ({
  errors,
  label,
  name,
  onChange,
  transferList,
  tooltip
}: TTransferListProps): JSX.Element => {
  const classes = useStyles({ errors });
  const [checked, setChecked] = React.useState<EmailTransferList>([]);
  const [left, setAvailable] = React.useState<EmailTransferList>(transferList);
  const [right, setChosen] = React.useState<EmailTransferList>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (email: string) => () => {
    const currentIndex = checked.findIndex(item => item === email);
    const newChecked = Array.from(checked);

    if (currentIndex === -1) {
      newChecked.push(email);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: EmailTransferList) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: EmailTransferList) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    const chosenList = right.concat(leftChecked);
    setChosen(chosenList);
    setAvailable(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    onChange({ target: { name, value: chosenList } });
  };

  const handleCheckedLeft = () => {
    const chosenList = not(right, rightChecked);
    setChosen(chosenList);
    setAvailable(left.concat(rightChecked));
    setChecked(not(checked, rightChecked));
    onChange({ target: { name, value: chosenList } });
  };

  const customList = (title: ReactNode, items: EmailTransferList) => (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
              // @ts-ignore
              "data-testid": `all-${title}-items`
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        className={classes.list}
        dense
        component="div"
        role="list"
        data-testid={title}
      >
        {items.map(email => {
          const labelId = `transfer-list-item-${email}-label`;

          return (
            <ListItem
              key={email}
              role="listitem"
              data-testid={email}
              button
              onClick={handleToggle(email)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.some(item => item === email)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                    // @ts-ignore
                    "data-testid": email
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={email.replace(/ <.*?>/g, "")}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <div data-testid="transfer-container" style={{ minHeight: 670 }}>
      {label && <Label name={name} label={label} tooltip={tooltip} />}
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{customList("Employees", left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              data-testid="move-items-up"
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              <FaChevronUp />
            </Button>
            <Button
              data-testid="move-items-down"
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              <FaChevronDown />
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList("Send To", right)}</Grid>
      </Grid>
      {errors && <Errors data-testid="errors">{errors}</Errors>}
    </div>
  );
};

export default TransferList;
