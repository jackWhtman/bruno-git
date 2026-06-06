import React from 'react';
import { IconMinus, IconPlus, IconCornerUpLeft } from '@tabler/icons';
import ActionIcon from 'ui/ActionIcon';
import StyledWrapper from './StyledWrapper';

const ChangesList = ({
  changedFiles,
  selectedFile,
  setSelectedFile,
  handleUnstageAll,
  handleUnstageFile,
  handleDiscardAll,
  handleDiscardFile,
  handleStageAll,
  handleStageFile
}) => {
  const stagedCount = changedFiles.staged?.length || 0;
  const unstagedCount = changedFiles.unstaged?.length || 0;

  return (
    <StyledWrapper className="changes-list">
      {/* Staged Changes Header */}
      {stagedCount > 0 && (
        <>
          <div className="changes-header">
            <div className="flex items-center gap-1.5">
              <span>Staged Changes</span>
              <span className="count-badge">{stagedCount}</span>
            </div>
            <ActionIcon
              label="Unstage all changes"
              onClick={handleUnstageAll}
            >
              <IconMinus size={14} />
            </ActionIcon>
          </div>
          {changedFiles.staged.map((file) => {
            const isSelected = selectedFile?.path === file.path && selectedFile?.type === 'staged';
            return (
              <div
                key={`staged-${file.path}`}
                className={`group change-item ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedFile({ path: file.path, type: 'staged' })}
              >
                <span className="file-path" title={file.path}>{file.path}</span>
                <div className="hidden group-hover:flex items-center gap-2">
                  <ActionIcon
                    label="Unstage file"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnstageFile(file.path);
                    }}
                  >
                    <IconMinus size={14} />
                  </ActionIcon>
                </div>
                <span className="status-badge added">A</span>
              </div>
            );
          })}
        </>
      )}

      {/* Unstaged Changes Header */}
      <div className="changes-header">
        <div className="flex items-center gap-1.5">
          <span>Unstaged Changes</span>
          <span className="count-badge">{unstagedCount}</span>
        </div>
        {unstagedCount > 0 && (
          <div className="flex items-center gap-2">
            <ActionIcon
              label="Discard all changes"
              onClick={handleDiscardAll}
            >
              <IconCornerUpLeft size={13} />
            </ActionIcon>
            <ActionIcon
              label="Stage all changes"
              onClick={handleStageAll}
            >
              <IconPlus size={14} />
            </ActionIcon>
          </div>
        )}
      </div>
      {unstagedCount === 0 ? (
        <div className="px-4 py-8 text-xs text-center text-neutral-500 opacity-50">
          No unstaged changes
        </div>
      ) : (
        changedFiles.unstaged.map((file) => {
          const isSelected = selectedFile?.path === file.path && selectedFile?.type === 'unstaged';
          return (
            <div
              key={`unstaged-${file.path}`}
              className={`group change-item ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedFile({ path: file.path, type: 'unstaged' })}
            >
              <span className="file-path" title={file.path}>{file.path}</span>
              <div className="hidden group-hover:flex items-center gap-2">
                <ActionIcon
                  label="Discard changes"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDiscardFile(file.path);
                  }}
                >
                  <IconCornerUpLeft size={13} />
                </ActionIcon>
                <ActionIcon
                  label="Stage changes"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStageFile(file.path);
                  }}
                >
                  <IconPlus size={14} />
                </ActionIcon>
              </div>
              <span className={`status-badge ${
                file.fileIndex === '?'
                  ? 'modified'
                  : file.fileIndex === 'D'
                    ? 'deleted'
                    : 'modified'
              }`}
              >
                {file.fileIndex === '?' ? 'U' : file.fileIndex || 'M'}
              </span>
            </div>
          );
        })
      )}
    </StyledWrapper>
  );
};

// Note: To preserve standard parenthesized multiline JSX inside arrow function return blocks or when using StyledWrapper
const ChangesListWrapper = (props) => (
  <ChangesList {...props} />
);

export default ChangesListWrapper;
