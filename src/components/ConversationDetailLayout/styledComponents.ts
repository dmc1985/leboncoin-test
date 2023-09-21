import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  margin: 2rem 8rem;
  @media (max-width: 600px) {
    margin: 0.5rem;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: end;
  width: 50%;
  overflow-y: scroll;
  scrollbar-width: none;
  height: 70vh;
  @media (max-width: 600px) {
    width: 100%;
  }
  margin-top: 8rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: lightgrey;
  border-top: 1px solid black;
  height: 4rem;
`;

export const SendMessageInput = styled.input`
  height: 3rem;
  border-radius: 2rem;
  padding: 1rem 2rem;
  bottom: 10%;
  width: 90%;
  margin: 0 2rem;
  align-self: center;
`;

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

export const InputContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export const SendArrowContainer = styled.div`
  position: absolute;
  right: 10%;
  top: 20%;
`;
