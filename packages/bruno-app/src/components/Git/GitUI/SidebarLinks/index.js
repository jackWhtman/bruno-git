import React from 'react';
import { useTheme } from 'providers/Theme';
import { IconGitBranch, IconChevronDown } from '@tabler/icons';
import MenuDropdown from 'ui/MenuDropdown';
import Button from 'ui/Button';
import StyledWrapper from './StyledWrapper';

const SidebarLinks = ({
  gitData,
  selectedFile,
  setSelectedFile,
  activeView,
  setActiveView,
  isPerformingGitAction,
  handleBranchChange,
  onCreateBranchClick
}) => {
  const { theme } = useTheme();

  return (
    <StyledWrapper className="bottom-links">
      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Links</div>

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

      {gitData.branches && (
        <div className="branch-select-section" style={{ width: '100%' }}>
          <MenuDropdown
            items={[
              ...gitData.branches.map((b) => ({
                id: b,
                label: b,
                onClick: () => handleBranchChange(b)
              })),
              {
                type: 'divider',
                id: 'create-branch-divider'
              },
              {
                id: 'create-branch',
                label: 'Create New Branch...',
                onClick: onCreateBranchClick
              }
            ]}
            selectedItemId={gitData.currentGitBranch}
            placement="bottom-start"
            className="w-full"
          >
            <Button
              variant="outline"
              color="secondary"
              size="xs"
              fullWidth
              disabled={isPerformingGitAction}
              style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div className="flex items-center gap-2 truncate">
                <IconGitBranch size={14} style={{ color: theme.brand }} />
                <span className="truncate">{gitData.currentGitBranch || 'Select Branch'}</span>
              </div>
              <IconChevronDown size={14} className="text-neutral-400" />
            </Button>
          </MenuDropdown>
        </div>
      )}
    </StyledWrapper>
  );
};

export default SidebarLinks;
