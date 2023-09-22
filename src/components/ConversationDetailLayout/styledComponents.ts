import styled from "styled-components";

interface HeaderTextProps {
  desktopOnly?: boolean;
}

export const HeaderText = styled.span<HeaderTextProps>`
  font-weight: bold;
  @media (max-width: 600px) {
    ${({ desktopOnly }: HeaderTextProps) => `
      display: ${desktopOnly ? "none" : "hidden"}
    `}
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 8rem;
  @media (max-width: 600px) {
    margin: 0.5rem;
    padding: 0.5rem;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: end;
  width: 50%;
  overflow-y: scroll;
  scrollbar-width: none;
  height: 80vh;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightgrey;
  border-top: 1px solid black;
  height: 4rem;
  padding: 2rem;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  margin: 0 2rem;
  @media (max-width: 600px) {
    margin: 0;
  }
`;

export const SendMessageInput = styled.input`
  height: 3rem;
  border-radius: 2rem;
  padding: 1rem 2rem;
  width: 100%;
`;

export const SendArrowContainer = styled.div`
  position: absolute;
  right: 10%;
  top: 20%;
`;
