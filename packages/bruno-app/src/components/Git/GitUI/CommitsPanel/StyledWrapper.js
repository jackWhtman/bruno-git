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

  .commit-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    overflow: hidden;
  }

  .commit-hash {
    font-family: monospace;
    font-size: ${(props) => props.theme.font.size.xs || '11px'};
    font-weight: 600;
    color: ${(props) => props.theme.brand};
  }

  .commit-message {
    font-size: ${(props) => props.theme.font.size.sm || '12px'};
    font-weight: 500;
    color: ${(props) => props.theme.text};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .commit-meta {
    font-size: ${(props) => props.theme.font.size.xs};
    color: ${(props) => props.theme.colors.text.muted};
  }

  .commit-stats {
    display: flex;
    align-items: center;
    font-size: ${(props) => props.theme.font.size.sm};
    gap: 0.5rem;
  }
`;

export default StyledWrapper;
