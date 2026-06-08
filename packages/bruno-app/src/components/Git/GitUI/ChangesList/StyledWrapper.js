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
    padding: 0.25rem 0.5rem;
    font-size: ${(props) => props.theme.font.size.xs};
    font-weight: 400;
    background-color: ${(props) => props.theme.background.surface0};
    color: ${(props) => props.theme.text};
  }

  .count-badge {
    padding: 2px 8px;
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
    padding: 0.2rem 0.5rem;
    font-size: ${(props) => props.theme.font.size.xs};
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
    flex: 1;
    min-width: 0;
    padding-right: 3.5rem;
    font-size: ${(props) => props.theme.font.size.xs};
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
    position: absolute;
    right: 0.5rem;
    font-size: ${(props) => props.theme.font.size.xs};
    font-weight: bold;
    padding: 0px 4px;
    border-radius: ${(props) => props.theme.border.radius.sm};
    text-align: center;
    min-width: 16px;
    flex-shrink: 0;

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

  .change-actions {
    display: none;
    position: absolute;
    right: 0.5rem;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
  }

  .change-item:hover .change-actions {
    display: flex;
  }

  .change-item:hover .status-badge {
    display: none;
  }
`;

export default StyledWrapper;
