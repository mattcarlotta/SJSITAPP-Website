import React from "react";
import Router from "next/router";
import { FaTimes } from "react-icons/fa";
import FlexEnd from "~components/Layout/FlexEnd";
import BackgroundOverlay from "./BackgroundOverlay";
import Center from "./Center";
import CloseModalButton from "./CloseModalButton";
import ClickHandler from "./ClickHandler";
import ModalContent from "./ModalContent";
import ModalContainer from "./ModalContainer";
import WindowContainer from "./WindowContainer";

export interface IModalProps {
  children: JSX.Element | JSX.Element[];
  dataTestId: string;
  disableClickHandler?: boolean;
  isOpen: boolean;
  maxWidth?: string;
  onClick?: () => void;
}

export const Modal = ({
  children,
  dataTestId,
  disableClickHandler,
  maxWidth,
  onClick
}: IModalProps): JSX.Element => (
  <>
    <BackgroundOverlay />
    <WindowContainer>
      <ModalContainer>
        <Center maxWidth={maxWidth}>
          <ClickHandler closeModal={!disableClickHandler ? onClick : undefined}>
            <ModalContent data-test={dataTestId} maxWidth={maxWidth}>
              <FlexEnd>
                <CloseModalButton
                  id="close-modal"
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
);

export default Modal;
