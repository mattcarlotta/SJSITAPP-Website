import * as React from "react";
import Router from "next/router";
import * as ReactDOM from "react-dom";
import { FaTimes } from "~icons";
import FlexEnd from "~components/Layout/FlexEnd";
import BackgroundOverlay from "./BackgroundOverlay";
import Center from "./Center";
import CloseModalButton from "./CloseModalButton";
import ClickHandler from "./ClickHandler";
import ModalContent from "./ModalContent";
import ModalContainer from "./ModalContainer";
import WindowContainer from "./WindowContainer";

export interface IModalProps {
  background?: string;
  children: JSX.Element | JSX.Element[];
  dataTestId: string;
  disableClickHandler?: boolean;
  isOpen: boolean;
  maxWidth?: string;
  onClick?: () => void;
}

const Modal = ({
  background,
  children,
  dataTestId,
  disableClickHandler,
  isOpen,
  maxWidth,
  onClick
}: IModalProps): JSX.Element => (
  <>
    {isOpen &&
      ReactDOM.createPortal(
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
        </>,
        document.body
      )}
  </>
);

export default Modal;
