import moment from "~utils/momentWithTimezone";
import { CSSProperties } from "~types";

export type TFormatDateProps = {
  date: string | Date;
  format: string;
  style?: CSSProperties;
};

const FormatDate = ({ date, format, style }: TFormatDateProps): JSX.Element => (
  <p style={style}>{moment(date || Date.now()).format(format)}</p>
);

export default FormatDate;