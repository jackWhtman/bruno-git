import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${(props) => props.theme.border.border1};

  .commit-textarea {
    width: 100%;
    border-radius: ${(props) => props.theme.border.radius.sm};
    padding: 0.5rem;
    font-size: ${(props) => props.theme.font.size.sm};
    outline: none;
    resize: none;
    height: 60px;
    transition: all 0.15s ease;
    background-color: ${(props) => props.theme.input.bg};
    color: ${(props) => props.theme.text};
    border: 1px solid ${(props) => props.theme.input.border};

    &:focus {
      border-color: ${(props) => props.theme.input.focusBorder};
    }
  }
`;

export default StyledWrapper;
