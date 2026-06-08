import React from 'react';
import { IconBrandGit } from '@tabler/icons';
import Button from 'ui/Button';
import toast from 'react-hot-toast';
import StyledWrapper from './StyledWrapper';

const StashesPanel = ({
  stashes,
  setStashes,
  collection,
  refreshGitStatus,
  setIsPerformingGitAction,
  setActiveView,
  showConfirm
}) => {
  return (
    <StyledWrapper className="git-view-container">
      <div className="git-view-header">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <IconBrandGit size={16} />
          <span>Stashes</span>
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
        {stashes && stashes.length > 0 ? (
          <div className="commit-list">
            {stashes.map((stash) => (
              <div key={stash.index} className="commit-row justify-between">
                <div className="commit-info">
                  <span className="commit-hash">stash@&#123;{stash.index}&#125;</span>
                  <span className="commit-message">{stash.message}</span>
                  {stash.date && (
                    <span className="commit-meta">
                      {new Date(stash.date).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    color="secondary"
                    size="xs"
                    onClick={async () => {
                      try {
                        setIsPerformingGitAction(true);
                        await window.ipcRenderer.invoke('renderer:git:apply-stash', collection.pathname, stash.index);
                        toast.success('Stash applied successfully');
                        await refreshGitStatus();
                      } catch (err) {
                        toast.error(err.message || 'Failed to apply stash');
                      } finally {
                        setIsPerformingGitAction(false);
                      }
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outline"
                    color="danger"
                    size="xs"
                    onClick={() => {
                      showConfirm({
                        title: 'Drop Stash',
                        message: 'Are you sure you want to drop this stash?',
                        confirmText: 'Drop',
                        confirmButtonColor: 'danger',
                        onConfirm: async () => {
                          try {
                            setIsPerformingGitAction(true);
                            await window.ipcRenderer.invoke('renderer:git:drop-stash', collection.pathname, stash.index);
                            toast.success('Stash dropped successfully');
                            const res = await window.ipcRenderer.invoke('renderer:git:list-stashes', collection.pathname);
                            setStashes(res || []);
                          } catch (err) {
                            toast.error(err.message || 'Failed to drop stash');
                          } finally {
                            setIsPerformingGitAction(false);
                          }
                        }
                      });
                    }}
                  >
                    Drop
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-neutral-500 text-xs py-8 text-center">No stashes found</div>
        )}
      </div>
    </StyledWrapper>
  );
};

export default StashesPanel;
