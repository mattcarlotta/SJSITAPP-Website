import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Avatar from "~components/Layout/Avatar";
import Column from "~components/Layout/Column";
import ColumnTitle from "~components/Layout/ColumnTitle";
import Tooltip from "~components/Layout/Tooltip";
import User from "~components/Layout/User";
import UserContainer from "~components/Layout/UserContainer";
import { FaFileAlt, FaUserAltSlash } from "~icons";
import { ReactElement, TEventUsers } from "~types";

export type TDropContainerProps = {
  id: string;
  title?: string;
  users?: TEventUsers;
  width: string;
};

const DropContainer = ({
  id,
  title,
  users,
  width
}: TDropContainerProps): ReactElement => (
  <Column data-testid="column" width={width}>
    <ColumnTitle style={{ marginBottom: 5 }}>{title}</ColumnTitle>
    <Droppable droppableId={id}>
      {({ innerRef, placeholder }, { isDraggingOver }) => (
        <UserContainer
          data-testid={title}
          ref={innerRef}
          isDraggingOver={isDraggingOver}
        >
          {!isEmpty(users) && users ? (
            users.map(
              (
                { _id, avatar, firstName, lastName, response, notes },
                index
              ) => (
                <Draggable key={_id} draggableId={_id} index={index}>
                  {(
                    {
                      draggableProps,
                      dragHandleProps: eventHandlers,
                      innerRef
                    },
                    { isDragging }
                  ) => (
                    <User
                      ref={innerRef}
                      data-testid="user"
                      {...draggableProps}
                      {...eventHandlers}
                      isDragging={isDragging}
                      response={response}
                    >
                      <Avatar
                        avatar={avatar}
                        display="inline-block"
                        width="40px"
                        style={{
                          border: "2px solid #ddd"
                        }}
                      />
                      <div
                        data-testid={`${firstName} ${lastName}`}
                        css={css`
                          display: inline-block;
                          margin-left: 8px;
                          font-size: 16px;
                          vertical-align: middle;
                        `}
                      >
                        {firstName} {lastName}
                        {notes && (
                          <Tooltip title={notes}>
                            <FaFileAlt
                              style={{
                                marginLeft: 5,
                                fontSize: 14,
                                position: "relative",
                                top: 2
                              }}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </User>
                  )}
                </Draggable>
              )
            )
          ) : (
            <div
              data-testid="no-employees"
              css={css`
                text-align: center;
                color: #bbb;
                padding: 10px 5px;
                font-size: 17px;
                width: 100%;
                margin: 0 auto;
              `}
            >
              <FaUserAltSlash /> <br />
              No Employees
            </div>
          )}
          {placeholder}
          <div
            css={css`
              border-radius: 0 0 3px 3px;
              color: #5e6c84;
              display: block;
              flex: 0 0 auto;
              padding: 8px;
              position: relative;
              text-decoration: none;
              user-select: none;
            `}
          />
        </UserContainer>
      )}
    </Droppable>
  </Column>
);

export default DropContainer;
