import React from 'react';
import { IconBrandGit } from '@tabler/icons';
import Button from 'ui/Button';
import StyledWrapper from './StyledWrapper';

const CommitArea = ({
  commitMessage,
  setCommitMessage,
  stagedCount,
  isPerformingGitAction,
  handleCommit
}) => {
  return (
    <StyledWrapper>
      <textarea
        className="commit-textarea"
        placeholder="Enter commit message..."
        value={commitMessage}
        onChange={(e) => setCommitMessage(e.target.value)}
        disabled={isPerformingGitAction || stagedCount === 0}
      />
      <Button
        onClick={handleCommit}
        disabled={isPerformingGitAction || stagedCount === 0 || !commitMessage.trim()}
        icon={<IconBrandGit size={16} />}
        fullWidth
      >
        Commit Changes
      </Button>
    </StyledWrapper>
  );
};

export default CommitArea;
