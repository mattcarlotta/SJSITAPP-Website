import * as React from "react";
import Router from "next/router";
import * as ReactDOM from "react-dom";
import { FaTimes } from "~icons";
import FlexEnd from "~components/Layout/FlexEnd";
import CloseModalButton from "~components/Layout/CloseModalButton";
import BackgroundOverlay from "./BackgroundOverlay";
import Center from "./Center";
import ClickHandler from "./ClickHandler";
import ModalContent from "./ModalContent";
import ModalContainer from "./ModalContainer";
import WindowContainer from "./WindowContainer";
import { ReactElement, ReactPortal, ReactNode } from "~types";

export interface IModalProps {
  background?: string;
  children: ReactElement | Array<ReactElement>;
  dataTestId: string;
  disableClickHandler?: boolean;
  isOpen: boolean;
  maxWidth?: string;
  onClick?: () => void;
}

/* istanbul ignore next */
const render = (children: ReactNode): ReactPortal | ReactNode =>
  typeof window !== "undefined" && typeof document !== "undefined"
    ? ReactDOM.createPortal(children, document.body)
    : children;

const Modal = ({
  background,
  children,
  dataTestId,
  disableClickHandler,
  isOpen,
  maxWidth,
  onClick
}: IModalProps): ReactElement => (
  <>
    {isOpen &&
      render(
        <>
          <BackgroundOverlay />
          <WindowContainer>
            <ModalContainer data-testid="modal">
              <Center maxWidth={maxWidth}>
                <ClickHandler
                  data-testid="modal-clickhandler"
                  closeModal={!disableClickHandler ? onClick : undefined}
                >
                  <ModalContent
                    data-testid={dataTestId}
                    maxWidth={maxWidth}
                    background={background}
                  >
                    <FlexEnd>
                      <CloseModalButton
                        data-testid="close-modal"
                        aria-label="close modal"
                        onClick={() => (onClick ? onClick() : Router.push("/"))}
                      >
                        <FaTimes />
                      </CloseModalButton>
                    </FlexEnd>
                    {children}
                  </ModalContent>
                </ClickHandler>
              </Center>
            </ModalContainer>
          </WindowContainer>
        </>
      )}
  </>
);

export default Modal;
