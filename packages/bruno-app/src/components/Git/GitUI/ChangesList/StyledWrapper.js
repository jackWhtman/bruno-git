import styled from 'styled-components';

const StyledWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .changes-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    font-size: ${(props) => props.theme.font.size.sm};
    font-weight: 600;
    background-color: ${(props) => props.theme.background.surface0};
    color: ${(props) => props.theme.text};
  }

  .count-badge {
    padding: 2px 6px;
    border-radius: 9999px;
    font-size: ${(props) => props.theme.font.size.xs};
    font-weight: 500;
    margin-left: 0.25rem;
    background-color: ${(props) => props.theme.background.crust};
    color: ${(props) => props.theme.text};
  }

  .change-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.375rem 1rem;
    font-size: ${(props) => props.theme.font.size.sm};
    cursor: pointer;
    position: relative;
    border-left: 2px solid transparent;
    transition: all 0.15s ease;

    &:hover {
      background-color: ${(props) => props.theme.background.crust};
    }

    &.selected {
      background-color: color-mix(in srgb, ${(props) => props.theme.brand} 15%, transparent);
      border-left-color: ${(props) => props.theme.brand};
    }
  }

  .file-path {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    font-size: ${(props) => props.theme.font.size.sm};
    color: ${(props) => props.theme.colors.text.subtext2};
  }

  .action-icon {
    opacity: 0.6;
    cursor: pointer;
    transition: opacity 0.15s ease, color 0.15s ease;

    &:hover {
      opacity: 1;
      color: ${(props) => props.theme.brand};
    }
  }

  .status-badge {
    font-size: ${(props) => props.theme.font.size.xs};
    font-weight: bold;
    padding: 0px 4px;
    border-radius: ${(props) => props.theme.border.radius.sm};
    text-align: center;
    min-width: 16px;

    &.added {
      background-color: ${(props) => props.theme.status.success.background};
      color: ${(props) => props.theme.status.success.text};
    }

    &.deleted {
      background-color: ${(props) => props.theme.status.danger.background};
      color: ${(props) => props.theme.status.danger.text};
    }

    &.modified {
      background-color: ${(props) => props.theme.status.warning.background};
      color: ${(props) => props.theme.status.warning.text};
    }
  }
`;

export default StyledWrapper;
