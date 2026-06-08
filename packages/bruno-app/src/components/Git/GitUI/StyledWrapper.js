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

  .git-sidebar-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .git-sidebar-scrollable {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow-y: auto;
  }

  /* Overrides for common Accordion component inside sidebar */
  div[data-testid="git-sidebar-accordion"] {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    
    > div {
      /* Targets AccordionItem */
      border: none;
      border-radius: 0;
      margin-bottom: 0;
      border-bottom: 1px solid ${(props) => props.theme.border?.border1 || '#333'};
      display: flex;
      flex-direction: column;
      min-height: 0;
      
      &:not(:has(button.open)) {
        flex: 0 0 auto;
      }
      
      &:has(button.open) {
        &:first-child {
          flex: 1;
          min-height: 0;
        }
        &:not(:first-child) {
          flex: 0 0 auto;
        }
      }
      
      /* Target AccordionHeader button */
      > button {
        padding: 0.625rem 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: ${(props) => props.theme.sidebar?.muted || '#888'};
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
        
        &:hover, &.open {
          background-color: ${(props) => props.theme.background?.surface0 || '#222'};
          color: ${(props) => props.theme.text || '#fff'};
        }
        
        > div {
          display: flex;
          align-items: center;
          width: 100%;
        }
        
        .count-badge {
          padding: 2px 6px;
          border-radius: 9999px;
          font-size: ${(props) => props.theme.font?.size?.xs || '10px'};
          font-weight: 500;
          margin-left: 0.25rem;
          background-color: ${(props) => props.theme.background?.crust || '#111'};
          color: ${(props) => props.theme.text || '#fff'};
          text-transform: none;
          letter-spacing: normal;
        }
        
        svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }
      }
      
      /* Target AccordionContent div */
      &:not(:has(button.open)) > div:last-child {
        display: none !important;
      }
      
      &:has(button.open) > div:last-child {
        padding: 0 !important;
        max-height: none !important;
        display: flex;
        flex-direction: column;
        min-height: 0;
        flex: 1;
        
        .changes-list {
          flex: 1;
          overflow-y: auto;
        }
      }
    }
    
    /* Bottom pin Links section when Changes is collapsed */
    > div:first-child:not(:has(button.open)) + div {
      margin-top: auto !important;
    }
  }

  .git-branch-bottom {
    padding: 0.75rem 1rem;
    background-color: ${(props) => props.theme.background?.crust || '#111'};
    border-top: 1px solid ${(props) => props.theme.border?.border1 || '#333'};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .git-branch-dropdown-container {
    flex: 1;
    min-width: 0;
  }

  .git-ahead-behind-indicators {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    flex-shrink: 0;
  }

  .git-indicator-item {
    display: flex;
    align-items: center;
    gap: 0.125rem;
    font-size: 0.75rem;
    font-weight: 600;
    
    &.zero {
      opacity: 0.35;
      color: ${(props) => props.theme.text || '#888'};
    }
    
    &.ahead.active {
      color: ${(props) => props.theme.status?.success?.text || '#4caf50'};
    }
    
    &.behind.active {
      color: ${(props) => props.theme.status?.warning?.text || '#ff9800'};
    }
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
