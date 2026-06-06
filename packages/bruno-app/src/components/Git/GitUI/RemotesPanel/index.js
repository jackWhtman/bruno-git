import React from 'react';
import { useTheme } from 'providers/Theme';
import { IconBrandGit } from '@tabler/icons';
import Button from 'ui/Button';
import StyledWrapper from './StyledWrapper';

const RemotesPanel = ({ remotes, setActiveView }) => {
  const { theme } = useTheme();

  return (
    <StyledWrapper className="git-view-container">
      <div className="git-view-header">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <IconBrandGit size={16} />
          <span>Remotes</span>
        </div>
        <Button
          variant="outline"
          color="secondary"
          size="xs"
          onClick={() => setActiveView('overview')}
        >
          Back to Overview
        </Button>
      </div>
      <div className="git-view-content">
        {remotes && remotes.length > 0 ? (
          <div className="commit-list">
            {remotes.map((remote) => (
              <div key={remote.name} className="commit-row flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm" style={{ color: theme.brand }}>
                    {remote.name}
                  </span>
                </div>
                <div className="text-xs flex flex-col gap-0.5 text-neutral-500 mt-1">
                  <div>
                    <span className="font-semibold text-neutral-400">Fetch URL:</span> {remote.refs?.fetch}
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-400">Push URL:</span> {remote.refs?.push}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-neutral-500 text-xs py-8 text-center">No remotes configured</div>
        )}
      </div>
    </StyledWrapper>
  );
};

export default RemotesPanel;
