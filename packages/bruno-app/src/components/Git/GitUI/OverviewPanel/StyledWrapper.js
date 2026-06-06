import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2.5rem;
  text-align: center;
  height: 100%;

  .status-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    border: 1px solid transparent;
    border-radius: ${(props) => props.theme.border.radius.base};
    font-size: ${(props) => props.theme.font.size.sm};
    font-weight: 500;
    max-width: 400px;

    &.up-to-date {
      border-color: ${(props) => props.theme.status.success.border};
      background-color: ${(props) => props.theme.status.success.background};
      color: ${(props) => props.theme.status.success.text};
    }

    &.behind {
      border-color: ${(props) => props.theme.status.danger.border};
      background-color: ${(props) => props.theme.status.danger.background};
      color: ${(props) => props.theme.status.danger.text};
    }
  }
`;

export default StyledWrapper;
