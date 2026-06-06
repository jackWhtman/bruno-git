import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${(props) => props.theme.background.crust};
  border-top: 1px solid ${(props) => props.theme.border.border1};

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

  .branch-select-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${(props) => props.theme.font.size.sm};
    padding-top: 0.5rem;
    border-top: 1px solid ${(props) => props.theme.border.border1};
  }
`;

export default StyledWrapper;
