import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IconLoader2 } from '@tabler/icons';
import { updateCollectionGitData } from 'providers/ReduxStore/slices/collections';
import toast from 'react-hot-toast';
import Sidebar from 'components/Sidebar';
import StyledWrapper from './StyledWrapper';

// Subcomponents
import CommitArea from './CommitArea';
import ChangesList from './ChangesList';
import SidebarLinks from './SidebarLinks';
import DiffViewerPanel from './DiffViewerPanel';
import CommitsPanel from './CommitsPanel';
import StashesPanel from './StashesPanel';
import RemotesPanel from './RemotesPanel';
import OverviewPanel from './OverviewPanel';
import CreateBranchModal from './CreateBranchModal';

const GitUI = ({ collection }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [gitData, setGitData] = useState({});
  const [changedFiles, setChangedFiles] = useState({ staged: [], unstaged: [], conflicted: [] });
  const [aheadBehind, setAheadBehind] = useState({ ahead: 0, behind: 0 });
  const [lastFetched, setLastFetched] = useState(null);

  const [commitMessage, setCommitMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [diffString, setDiffString] = useState('');
  const [diffLoading, setDiffLoading] = useState(false);
  const [isPerformingGitAction, setIsPerformingGitAction] = useState(false);

  const [activeView, setActiveView] = useState('overview');
  const [stashes, setStashes] = useState([]);
  const [remotes, setRemotes] = useState([]);
  const [showCreateBranchModal, setShowCreateBranchModal] = useState(false);

  const [isVisualDiff, setIsVisualDiff] = useState(false);
  const [visualDiffData, setVisualDiffData] = useState(null);

  const refreshGitStatus = async () => {
    if (!collection?.pathname) return;
    try {
      setIsLoading(true);
      const data = await window.ipcRenderer.invoke('renderer:git:get-data', collection.pathname);
      const files = await window.ipcRenderer.invoke('renderer:git:get-changed-files', collection.pathname);
      const counts = await window.ipcRenderer.invoke('renderer:git:get-ahead-behind-count', collection.pathname);

      setGitData(data);
      setChangedFiles(files);
      setAheadBehind(counts);

      dispatch(updateCollectionGitData({
        collectionUid: collection.uid,
        gitData: data
      }));

      if (activeView === 'stashes') {
        const resStashes = await window.ipcRenderer.invoke('renderer:git:list-stashes', collection.pathname);
        setStashes(resStashes || []);
      }
      if (activeView === 'remotes') {
        const resRemotes = await window.ipcRenderer.invoke('renderer:git:get-remotes', collection.pathname);
        setRemotes(resRemotes || []);
      }
    } catch (err) {
      console.error('Error refreshing git status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshGitStatus();
  }, [collection?.pathname]);

  useEffect(() => {
    if (activeView === 'stashes' && collection?.pathname) {
      const loadStashes = async () => {
        try {
          const res = await window.ipcRenderer.invoke('renderer:git:list-stashes', collection.pathname);
          setStashes(res || []);
        } catch (err) {
          console.error('Error fetching stashes:', err);
        }
      };
      loadStashes();
    } else if (activeView === 'remotes' && collection?.pathname) {
      const loadRemotes = async () => {
        try {
          const res = await window.ipcRenderer.invoke('renderer:git:get-remotes', collection.pathname);
          setRemotes(res || []);
        } catch (err) {
          console.error('Error fetching remotes:', err);
        }
      };
      loadRemotes();
    }
  }, [activeView, collection?.pathname]);

  useEffect(() => {
    if (!selectedFile) {
      setDiffString('');
      setIsVisualDiff(false);
      setVisualDiffData(null);
      return;
    }
    const supportsVisualDiff = (filePath) => {
      if (!filePath) return false;
      const fileName = filePath.split('/').pop();
      const excludedFiles = ['folder.yml', 'folder.bru', 'opencollection.yml', 'collection.bru'];
      if (excludedFiles.includes(fileName)) {
        return false;
      }
      return filePath.endsWith('.bru') || filePath.endsWith('.yml');
    };
    const loadDiff = async () => {
      try {
        setDiffLoading(true);
        setIsVisualDiff(false);
        setVisualDiffData(null);
        setDiffString('');

        if (supportsVisualDiff(selectedFile.path)) {
          const res = await window.ipcRenderer.invoke(
            'renderer:git:get-working-file-content-for-visual-diff',
            collection.pathname,
            selectedFile.path,
            selectedFile.type
          );
          if (res && (res.oldParsed || res.newParsed)) {
            setIsVisualDiff(true);
            setVisualDiffData({
              oldData: res.oldParsed,
              newData: res.newParsed
            });
            return;
          }
        }

        let diff = '';
        if (selectedFile.type === 'staged') {
          diff = await window.ipcRenderer.invoke('renderer:git:get-staged-file-diff', collection.pathname, selectedFile.path);
        } else {
          diff = await window.ipcRenderer.invoke('renderer:git:get-unstaged-file-diff', collection.pathname, selectedFile.path);
        }
        setDiffString(diff);
      } catch (err) {
        console.error('Error loading diff:', err);
        setDiffString('Error loading diff');
      } finally {
        setDiffLoading(false);
      }
    };
    loadDiff();
  }, [selectedFile, collection?.pathname]);

  const handleUnstageAll = async () => {
    const filesToUnstage = changedFiles.staged.map((f) => f.path);
    if (!filesToUnstage.length) return;
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:unstage-changes', collection.pathname, filesToUnstage);
      toast.success('Unstaged all changes');
      await refreshGitStatus();
      if (selectedFile?.type === 'staged') {
        setSelectedFile(null);
      }
    } catch (err) {
      toast.error('Failed to unstage changes');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handleStageAll = async () => {
    const filesToStage = changedFiles.unstaged.map((f) => f.path);
    if (!filesToStage.length) return;
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:stage-changes', collection.pathname, filesToStage);
      toast.success('Staged all changes');
      await refreshGitStatus();
    } catch (err) {
      toast.error('Failed to stage changes');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handleStageFile = async (filePath) => {
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:stage-changes', collection.pathname, [filePath]);
      toast.success('Staged file');
      await refreshGitStatus();
      if (selectedFile?.path === filePath) {
        setSelectedFile({ path: filePath, type: 'staged' });
      }
    } catch (err) {
      toast.error('Failed to stage file');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handleUnstageFile = async (filePath) => {
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:unstage-changes', collection.pathname, [filePath]);
      toast.success('Unstaged file');
      await refreshGitStatus();
      if (selectedFile?.path === filePath) {
        setSelectedFile({ path: filePath, type: 'unstaged' });
      }
    } catch (err) {
      toast.error('Failed to unstage file');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handleDiscardFile = async (filePath) => {
    const confirm = window.confirm('Are you sure you want to discard all changes in this file? This action cannot be undone.');
    if (!confirm) return;
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:discard-changes', collection.pathname, [filePath]);
      toast.success('Discarded changes');
      await refreshGitStatus();
      if (selectedFile?.path === filePath) {
        setSelectedFile(null);
      }
    } catch (err) {
      toast.error('Failed to discard changes');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handleDiscardAll = async () => {
    const filesToDiscard = changedFiles.unstaged.map((f) => f.path);
    if (!filesToDiscard.length) return;
    const confirm = window.confirm(`Are you sure you want to discard changes in all ${filesToDiscard.length} files? This action cannot be undone.`);
    if (!confirm) return;
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:discard-changes', collection.pathname, filesToDiscard);
      toast.success('Discarded all changes');
      await refreshGitStatus();
      setSelectedFile(null);
    } catch (err) {
      toast.error('Failed to discard changes');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handleCommit = async () => {
    if (!commitMessage.trim()) {
      toast.error('Please enter a commit message');
      return;
    }
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:commit-changes', collection.pathname, commitMessage.trim());
      toast.success('Changes committed successfully');
      setCommitMessage('');
      await refreshGitStatus();
      setSelectedFile(null);
    } catch (err) {
      toast.error(err.message || 'Failed to commit changes');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handleFetch = async () => {
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:fetch-changes', collection.pathname);
      setLastFetched(new Date());
      toast.success('Fetch completed');
      await refreshGitStatus();
    } catch (err) {
      toast.error('Fetch failed');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handlePull = async () => {
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:pull-changes', {
        collectionPath: collection.pathname,
        processUid: 'git-pull',
        remote: 'origin',
        remoteBranch: gitData.currentGitBranch,
        strategy: '--no-rebase'
      });
      toast.success('Pull completed successfully');
      await refreshGitStatus();
    } catch (err) {
      toast.error(err.message || 'Pull failed');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handlePush = async () => {
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:push-changes', {
        collectionPath: collection.pathname,
        processUid: 'git-push',
        remote: 'origin',
        remoteBranch: gitData.currentGitBranch
      });
      toast.success('Push completed successfully');
      await refreshGitStatus();
    } catch (err) {
      toast.error(err.message || 'Push failed');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handleBranchChange = async (branchName) => {
    if (!branchName || branchName === gitData.currentGitBranch) return;
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:checkout-branch', {
        collectionPath: collection.pathname,
        branchName,
        processUid: 'git-checkout',
        shouldCreate: false
      });
      toast.success(`Switched to branch ${branchName}`);
      await refreshGitStatus();
      setSelectedFile(null);
    } catch (err) {
      toast.error(err.message || 'Failed to checkout branch');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const handleCreateBranch = async (branchName) => {
    if (!branchName) return;
    try {
      setIsPerformingGitAction(true);
      await window.ipcRenderer.invoke('renderer:git:checkout-branch', {
        collectionPath: collection.pathname,
        branchName,
        processUid: 'git-checkout',
        shouldCreate: true
      });
      toast.success(`Created and switched to branch ${branchName}`);
      await refreshGitStatus();
      setSelectedFile(null);
      setShowCreateBranchModal(false);
    } catch (err) {
      toast.error(err.message || 'Failed to create branch');
    } finally {
      setIsPerformingGitAction(false);
    }
  };

  const stagedCount = changedFiles.staged?.length || 0;

  return (
    <StyledWrapper>
      {/* Git Sidebar Panel */}
      <Sidebar>
        <CommitArea
          commitMessage={commitMessage}
          setCommitMessage={setCommitMessage}
          stagedCount={stagedCount}
          isPerformingGitAction={isPerformingGitAction}
          handleCommit={handleCommit}
        />

        <ChangesList
          changedFiles={changedFiles}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          handleUnstageAll={handleUnstageAll}
          handleUnstageFile={handleUnstageFile}
          handleDiscardAll={handleDiscardAll}
          handleDiscardFile={handleDiscardFile}
          handleStageAll={handleStageAll}
          handleStageFile={handleStageFile}
        />

        <SidebarLinks
          gitData={gitData}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          activeView={activeView}
          setActiveView={setActiveView}
          isPerformingGitAction={isPerformingGitAction}
          handleBranchChange={handleBranchChange}
          onCreateBranchClick={() => setShowCreateBranchModal(true)}
        />
      </Sidebar>

      {/* Git Main View */}
      <div className="git-main-view">
        {isPerformingGitAction && (
          <div className="git-overlay">
            <IconLoader2 className="animate-spin" size={20} />
            <span>Performing Git action...</span>
          </div>
        )}

        {selectedFile ? (
          <DiffViewerPanel
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            diffLoading={diffLoading}
            isVisualDiff={isVisualDiff}
            visualDiffData={visualDiffData}
            diffString={diffString}
          />
        ) : activeView === 'commits' ? (
          <CommitsPanel
            gitData={gitData}
            setActiveView={setActiveView}
          />
        ) : activeView === 'stashes' ? (
          <StashesPanel
            stashes={stashes}
            setStashes={setStashes}
            collection={collection}
            refreshGitStatus={refreshGitStatus}
            setIsPerformingGitAction={setIsPerformingGitAction}
            setActiveView={setActiveView}
          />
        ) : activeView === 'remotes' ? (
          <RemotesPanel
            remotes={remotes}
            setActiveView={setActiveView}
          />
        ) : (
          <OverviewPanel
            lastFetched={lastFetched}
            aheadBehind={aheadBehind}
            isPerformingGitAction={isPerformingGitAction}
            handleFetch={handleFetch}
            handlePull={handlePull}
            handlePush={handlePush}
          />
        )}
      </div>
      {showCreateBranchModal && (
        <CreateBranchModal
          onClose={() => setShowCreateBranchModal(false)}
          onSubmit={handleCreateBranch}
        />
      )}
    </StyledWrapper>
  );
};

export default GitUI;
