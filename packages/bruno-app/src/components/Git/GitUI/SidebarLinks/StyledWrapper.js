import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background-color: transparent;

  .link-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${(props) => props.theme.font.size.sm};
    padding: 0.375rem 0.5rem;
    border-radius: ${(props) => props.theme.border.radius.sm};
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background-color: ${(props) => props.theme.background.surface0};
    }

    &.active {
      background-color: color-mix(in srgb, ${(props) => props.theme.brand} 15%, transparent);
      color: ${(props) => props.theme.brand};
      font-weight: 500;
      opacity: 1;
    }
  }
`;

export default StyledWrapper;
