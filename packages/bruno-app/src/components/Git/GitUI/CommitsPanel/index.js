import React from 'react';
import { IconBrandGit } from '@tabler/icons';
import Button from 'ui/Button';
import StyledWrapper from './StyledWrapper';

const CommitsPanel = ({ gitData, setActiveView }) => {
  return (
    <StyledWrapper className="git-view-container">
      <div className="git-view-header">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <IconBrandGit size={16} />
          <span>Commits</span>
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
        {gitData.logs && gitData.logs.length > 0 ? (
          <div className="commit-list">
            {gitData.logs.map((commit) => (
              <div key={commit.hash} className="commit-row">
                <div className="commit-info">
                  <span className="commit-hash" title={commit.hash}>
                    {commit.hash.substring(0, 7)}
                  </span>
                  <span className="commit-message">{commit.message}</span>
                  <span className="commit-meta">
                    by {commit.author_name} • {new Date(commit.date).toLocaleString()}
                  </span>
                </div>
                {(commit.filesChanged > 0 || commit.insertions > 0 || commit.deletions > 0) && (
                  <div className="commit-stats">
                    <span className="text-neutral-500 mr-2">
                      {commit.filesChanged} file{commit.filesChanged > 1 ? 's' : ''}
                    </span>
                    {commit.insertions > 0 && (
                      <span className="text-green-500 font-semibold">+{commit.insertions}</span>
                    )}
                    {commit.deletions > 0 && (
                      <span className="text-red-500 font-semibold">-{commit.deletions}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-neutral-500 text-xs py-8 text-center">No commits found</div>
        )}
      </div>
    </StyledWrapper>
  );
};

export default CommitsPanel;
