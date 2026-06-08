import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .git-view-header {
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.75rem;
    background-color: ${(props) => props.theme.background.crust};
    border-bottom: 1px solid ${(props) => props.theme.border.border1};
  }

  .git-view-content {
    flex: 1;
    overflow-y: auto;
    padding: 0.75rem;
  }

  .commit-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .commit-row {
    display: flex;
    align-items: center;
    padding: 0.4rem 0.625rem;
    border-radius: ${(props) => props.theme.border.radius.base};
    border: 1px solid ${(props) => props.theme.border.border1};
    background-color: ${(props) => props.theme.background.mantle};
    transition: all 0.15s ease;

    &:hover {
      border-color: ${(props) => props.theme.brand};
    }
  }
`;

export default StyledWrapper;
