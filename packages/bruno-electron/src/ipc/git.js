const { ipcMain } = require('electron');
const nodePath = require('path');
const {
  cloneGitRepository,
  getCollectionGitRootPath,
  getCollectionGitData,
  getChangedFilesInCollectionGit,
  stageChanges,
  unstageChanges,
  discardChanges,
  commitChanges,
  pushGitChanges,
  pullGitChanges,
  fetchChanges,
  checkoutGitBranch,
  getUnstagedFileDiff,
  getStagedFileDiff,
  getAheadBehindCount,
  fetchRemotes,
  listStashes,
  applyStash,
  dropStash,
  getWorkingFileContentForVisualDiff
} = require('../utils/git');
const { createDirectory, removeDirectory } = require('../utils/filesystem');

const registerGitIpc = (mainWindow) => {
  ipcMain.handle('renderer:clone-git-repository', async (event, { url, path, processUid }) => {
    let directoryCreated = false;
    try {
      await createDirectory(path);
      directoryCreated = true;
      await cloneGitRepository(mainWindow, { url, path, processUid });
      return 'Repository cloned successfully';
    } catch (error) {
      if (directoryCreated) {
        await removeDirectory(path);
      }
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:get-data', async (event, collectionPath) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      if (!gitRootPath) return {};
      const data = await getCollectionGitData(gitRootPath, collectionPath);
      return { ...data, gitRootPath };
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:get-changed-files', async (event, collectionPath) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      if (!gitRootPath) return { staged: [], unstaged: [], conflicted: [] };
      return await getChangedFilesInCollectionGit(gitRootPath, collectionPath);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:stage-changes', async (event, collectionPath, files) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      const absoluteFiles = files.map((f) => nodePath.isAbsolute(f) ? f : nodePath.join(gitRootPath, f));
      return await stageChanges(gitRootPath, absoluteFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:unstage-changes', async (event, collectionPath, files) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      const absoluteFiles = files.map((f) => nodePath.isAbsolute(f) ? f : nodePath.join(gitRootPath, f));
      return await unstageChanges(gitRootPath, absoluteFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:discard-changes', async (event, collectionPath, files) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      const absoluteFiles = files.map((f) => nodePath.isAbsolute(f) ? f : nodePath.join(gitRootPath, f));
      return await discardChanges(gitRootPath, absoluteFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:commit-changes', async (event, collectionPath, message) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      return await commitChanges(gitRootPath, message);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:push-changes', async (event, { collectionPath, processUid, remote, remoteBranch }) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      return await pushGitChanges(mainWindow, { gitRootPath, processUid, remote, remoteBranch });
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:pull-changes', async (event, { collectionPath, processUid, remote, remoteBranch, strategy }) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      return await pullGitChanges(mainWindow, { gitRootPath, processUid, remote, remoteBranch, strategy });
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:fetch-changes', async (event, collectionPath, remote) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      return await fetchChanges(gitRootPath, remote);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:checkout-branch', async (event, { collectionPath, branchName, processUid, shouldCreate }) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      return await checkoutGitBranch(mainWindow, { gitRootPath, branchName, processUid, shouldCreate });
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:get-unstaged-file-diff', async (event, collectionPath, filePath) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      const absoluteFilePath = nodePath.isAbsolute(filePath) ? filePath : nodePath.join(gitRootPath, filePath);
      return await getUnstagedFileDiff(gitRootPath, absoluteFilePath);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:get-staged-file-diff', async (event, collectionPath, filePath) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      const absoluteFilePath = nodePath.isAbsolute(filePath) ? filePath : nodePath.join(gitRootPath, filePath);
      return await getStagedFileDiff(gitRootPath, absoluteFilePath);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:get-ahead-behind-count', async (event, collectionPath) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      if (!gitRootPath) return { ahead: 0, behind: 0 };
      return await getAheadBehindCount(gitRootPath);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:get-remotes', async (event, collectionPath) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      if (!gitRootPath) return [];
      return await fetchRemotes(gitRootPath);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:list-stashes', async (event, collectionPath) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      if (!gitRootPath) return [];
      return await listStashes(gitRootPath);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:apply-stash', async (event, collectionPath, stashIndex) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      return await applyStash(gitRootPath, stashIndex);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:drop-stash', async (event, collectionPath, stashIndex) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      return await dropStash(gitRootPath, stashIndex);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git:get-working-file-content-for-visual-diff', async (event, collectionPath, filePath, type) => {
    try {
      const gitRootPath = getCollectionGitRootPath(collectionPath);
      return await getWorkingFileContentForVisualDiff(gitRootPath, filePath, type);
    } catch (error) {
      return Promise.reject(error);
    }
  });
};

module.exports = registerGitIpc;
