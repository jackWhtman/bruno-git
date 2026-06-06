import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  font-family: sans-serif;
  overflow: hidden;
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};

  .git-sidebar {
    width: 280px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background-color: ${(props) => props.theme.background.mantle};
    border-right: 1px solid ${(props) => props.theme.border.border1};
  }

  .git-main-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    background-color: ${(props) => props.theme.bg};
  }

  .git-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #fff;
  }
`;

export default StyledWrapper;
