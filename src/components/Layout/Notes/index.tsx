import styled from "@emotion/styled";
import { CSSProperties } from "~types";

export type TNotesProps = {
  className?: string;
  notes: string;
  style?: CSSProperties;
};
const NotesComponent = ({
  className,
  notes,
  style
}: TNotesProps): JSX.Element => (
  <div className={className} style={style}>
    <i style={{ marginRight: 5 }}>Special Notes: </i>
    <span>{notes}</span>
  </div>
);

const Notes = styled(NotesComponent)`
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default Notes;
