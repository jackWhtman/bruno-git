import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .diff-view-header {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    background-color: ${(props) => props.theme.background.base};
    border-bottom: 1px solid ${(props) => props.theme.border.border1};
  }

  .diff-viewer-panel {
    flex: 1;
    overflow: auto;
    background-color: ${(props) => props.theme.background.base};
  }

  .diff-container {
    background-color: ${(props) => props.theme.background.base};
    color: ${(props) => props.theme.text};

    .d2h-file-header { display: none; }
    .d2h-file-wrapper {
      border: 1px solid ${(props) => props.theme.border.border1};
      background-color: ${(props) => props.theme.background.base};
      margin: 0;
      border-radius: ${(props) => props.theme.border.radius.base};
    }
    .d2h-file-diff { overflow-x: auto; }
    .d2h-diff-table { width: 100%; }
    .d2h-code-linenumber, .d2h-code-side-linenumber {
      background-color: ${(props) => props.theme.background.mantle};
      color: ${(props) => props.theme.colors.text.muted};
      border-right: 1px solid ${(props) => props.theme.border.border1};
      min-width: 40px;
      text-align: right;
      padding-right: 8px;
    }
    .d2h-code-line { padding: 0 8px; }
    .d2h-code-line-ctn {
      color: ${(props) => props.theme.text};
      background: transparent;
    }
    .d2h-ins {
      background-color: ${(props) => props.theme.status.success.background};
      color: ${(props) => props.theme.status.success.text};
    }
    .d2h-ins .d2h-code-line-ctn { background-color: transparent; }
    .d2h-ins ins {
      background-color: color-mix(in srgb, ${(props) => props.theme.status.success.text} 25%, transparent);
      text-decoration: none;
    }
    .d2h-del {
      background-color: ${(props) => props.theme.status.danger.background};
      color: ${(props) => props.theme.status.danger.text};
    }
    .d2h-del .d2h-code-line-ctn { background-color: transparent; }
    .d2h-del del {
      background-color: color-mix(in srgb, ${(props) => props.theme.status.danger.text} 25%, transparent);
      text-decoration: none;
    }
    .d2h-cntx {
      background-color: ${(props) => props.theme.background.base};
    }
    .d2h-info {
      background-color: ${(props) => props.theme.status.info.background};
      color: ${(props) => props.theme.status.info.text};
      border-top: 1px solid ${(props) => props.theme.border.border1};
      border-bottom: 1px solid ${(props) => props.theme.border.border1};
    }
    .d2h-emptyplaceholder {
      background-color: ${(props) => props.theme.background.mantle};
      border-right: 1px solid ${(props) => props.theme.border.border1};
    }
  }
`;

export default StyledWrapper;
