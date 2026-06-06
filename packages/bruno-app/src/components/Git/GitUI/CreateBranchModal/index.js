import React, { useRef, useEffect, useState } from 'react';
import Portal from 'components/Portal';
import Modal from 'components/Modal';

const CreateBranchModal = ({ onClose, onSubmit }) => {
  const [branchName, setBranchName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setBranchName(val);
    if (!val.trim()) {
      setError('Branch name is required');
    } else if (/\s/.test(val)) {
      setError('Branch name cannot contain spaces');
    } else {
      setError('');
    }
  };

  const handleCreate = () => {
    const trimmed = branchName.trim();
    if (!trimmed) {
      setError('Branch name is required');
      return;
    }
    if (/\s/.test(trimmed)) {
      setError('Branch name cannot contain spaces');
      return;
    }
    onSubmit(trimmed);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    handleCreate();
  };

  return (
    <Portal>
      <Modal
        size="sm"
        title="Create New Branch"
        confirmText="Create"
        handleCancel={onClose}
        handleConfirm={handleCreate}
        confirmDisabled={!!error || !branchName.trim()}
      >
        <form onSubmit={onSubmitForm} className="bruno-form">
          <label htmlFor="branchName" className="block font-medium text-xs">
            Branch Name
          </label>
          <input
            id="branch-name"
            type="text"
            name="branchName"
            ref={inputRef}
            className="block textbox mt-2 w-full"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={handleInputChange}
            value={branchName}
            placeholder="e.g. feature/new-endpoint"
          />
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </form>
      </Modal>
    </Portal>
  );
};

export default CreateBranchModal;
