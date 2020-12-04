import React from "react";
import styled from "styled-components";
import Portal from "./Portal";

// eslint-disable-next-line react/prop-types
const Modal = ({ children, on, toggle }) => {
  return (
    <Portal>
      {on && (
        <ModalWrapper>
          <ModalCard>
            <CloseButton onClick={toggle}>
              <Icon name="close" />
            </CloseButton>
            <div>{children}</div>
          </ModalCard>
          <Background onClick={toggle} />
        </ModalWrapper>
      )}
    </Portal>
  );
};
export default Modal;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  position: relative;
  background: white;
  border-radius: 5px;
  padding: 25px;
  min-width: 60%;
  z-index: 10;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 100px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  padding: 10px;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
`;

const Icon = ({ name }) => {
  switch (name) {
    case "close":
      return (
        <svg
          x="0px"
          y="0px"
          width="24px"
          height="24px"
          viewBox="0 0 31.11 31.11"
          enableBackground="new 0 0 31.11 31.11"
        >
          <polygon
            fill="#000"
            points="31.11,1.41 29.7,0 15.56,14.14 1.41,0 0,1.41 14.14,15.56 0,29.7 1.41,31.11 15.56,16.97   29.7,31.11 31.11,29.7 16.97,15.56 "
          />
        </svg>
      );
    default:
      return "";
  }
};
