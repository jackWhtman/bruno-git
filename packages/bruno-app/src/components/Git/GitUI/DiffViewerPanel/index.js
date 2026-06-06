import React from 'react';
import { IconBrandGit, IconLoader2 } from '@tabler/icons';
import Button from 'ui/Button';
import * as Diff2Html from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import VisualDiffViewer from '../../VisualDiffViewer';
import StyledWrapper from './StyledWrapper';

const DiffViewerPanel = ({
  selectedFile,
  setSelectedFile,
  diffLoading,
  isVisualDiff,
  visualDiffData,
  diffString
}) => {
  return (
    <StyledWrapper>
      <div className="diff-view-header">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <IconBrandGit size={16} />
          <span>{selectedFile.path}</span>
        </div>
        <Button
          variant="outline"
          color="secondary"
          size="xs"
          onClick={() => setSelectedFile(null)}
        >
          Close Diff
        </Button>
      </div>
      <div className="diff-viewer-panel">
        {diffLoading ? (
          <div className="flex items-center justify-center h-full gap-2 text-neutral-400">
            <IconLoader2 className="animate-spin" size={20} />
            <span>Loading file diff...</span>
          </div>
        ) : isVisualDiff && visualDiffData ? (
          <VisualDiffViewer
            oldData={visualDiffData.oldData}
            newData={visualDiffData.newData}
            leftLabel={selectedFile.type === 'staged' ? 'Parent Commit (HEAD)' : 'Index/Staged'}
            rightLabel={selectedFile.type === 'staged' ? 'Staged Changes' : 'Working Directory'}
          />
        ) : diffString ? (
          <div
            className="w-full text-xs diff-container"
            dangerouslySetInnerHTML={{
              __html: Diff2Html.html(diffString, {
                drawFileList: false,
                matching: 'lines',
                outputFormat: 'side-by-side'
              })
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-400">
            No differences found or new file has empty content.
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

export default DiffViewerPanel;
