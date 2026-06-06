import React from 'react';
import { useTheme } from 'providers/Theme';
import {
  IconBrandGit,
  IconRefresh,
  IconDownload,
  IconUpload,
  IconCheck,
  IconAlertCircle
} from '@tabler/icons';
import Button from 'ui/Button';
import StyledWrapper from './StyledWrapper';

const OverviewPanel = ({
  lastFetched,
  aheadBehind,
  isPerformingGitAction,
  handleFetch,
  handlePull,
  handlePush
}) => {
  const { theme } = useTheme();

  const relativeTime = (date) => {
    if (!date) return 'never';
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'less than a minute ago';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  };

  return (
    <StyledWrapper className="empty-state-container">
      <div className="opacity-80 mb-4" style={{ color: theme.brand }}>
        <IconBrandGit size={72} strokeWidth={1} />
        <div className="mt-2 text-sm font-medium">Perform git actions or open files from sidebar to view</div>
      </div>

      {/* Utility Fetch / Pull / Push Actions */}
      <div className="flex gap-3 mb-8">
        <Button
          variant="outline"
          color="secondary"
          size="xs"
          onClick={handleFetch}
          disabled={isPerformingGitAction}
          icon={<IconRefresh size={14} />}
        >
          Fetch
        </Button>
        <Button
          variant="outline"
          color="secondary"
          size="xs"
          onClick={handlePull}
          disabled={isPerformingGitAction}
          icon={<IconDownload size={14} />}
        >
          Pull
        </Button>
        <Button
          variant="outline"
          color="secondary"
          size="xs"
          onClick={handlePush}
          disabled={isPerformingGitAction}
          icon={<IconUpload size={14} />}
        >
          Push
        </Button>
      </div>

      <div className="text-xs flex flex-col gap-1.5 mb-6" style={{ color: theme.colors?.text?.muted || '#888' }}>
        <div>Last fetched: {relativeTime(lastFetched)}</div>
        <div>{aheadBehind.behind || 0} Behind, {aheadBehind.ahead || 0} Ahead</div>
      </div>

      {/* Status box */}
      {aheadBehind.behind === 0 ? (
        <div className="status-box up-to-date">
          <IconCheck size={16} />
          <span>Your branch is up to date</span>
        </div>
      ) : (
        <div className="status-box behind">
          <IconAlertCircle size={16} />
          <span>Your branch is behind by {aheadBehind.behind} commit{aheadBehind.behind > 1 ? 's' : ''}</span>
        </div>
      )}
    </StyledWrapper>
  );
};

export default OverviewPanel;
