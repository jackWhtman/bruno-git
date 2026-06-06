import React from 'react';
import StyledWrapper from './StyledWrapper';

const SidebarLinks = ({
  selectedFile,
  setSelectedFile,
  activeView,
  setActiveView
}) => {
  return (
    <StyledWrapper className="bottom-links">
      <div
        className={`link-item ${!selectedFile && activeView === 'overview' ? 'active' : ''}`}
        onClick={() => {
          setSelectedFile(null);
          setActiveView('overview');
        }}
      >
        <div className="flex items-center gap-2">
          <span>Overview</span>
        </div>
      </div>
      <div
        className={`link-item ${!selectedFile && activeView === 'commits' ? 'active' : ''}`}
        onClick={() => {
          setSelectedFile(null);
          setActiveView('commits');
        }}
      >
        <div className="flex items-center gap-2">
          <span>Commits</span>
        </div>
      </div>
      <div
        className={`link-item ${!selectedFile && activeView === 'stashes' ? 'active' : ''}`}
        onClick={() => {
          setSelectedFile(null);
          setActiveView('stashes');
        }}
      >
        <div className="flex items-center gap-2">
          <span>Stashes</span>
        </div>
      </div>
      <div
        className={`link-item ${!selectedFile && activeView === 'remotes' ? 'active' : ''}`}
        onClick={() => {
          setSelectedFile(null);
          setActiveView('remotes');
        }}
      >
        <div className="flex items-center gap-2">
          <span>Remotes</span>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default SidebarLinks;
