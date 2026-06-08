import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 0.4rem 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid ${(props) => props.theme.border.border1};

  .commit-textarea {
    width: 100%;
    border-radius: ${(props) => props.theme.border.radius.sm};
    padding: 0.25rem 0.375rem;
    font-size: ${(props) => props.theme.font.size.xs};
    outline: none;
    resize: none;
    height: 50px;
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
