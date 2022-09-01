import React from 'react';
import './confirmDialogue.scss'

function ConfirmationDialogue({
  dialogueStatus,
  handleConfirm,
  handleCancel,

}) {
  let status;
  dialogueStatus !== ('approved' || 'rejected')
    ? (status = dialogueStatus)
    : dialogueStatus === 'approved'
    ? (status = 'approve')
    : (status = 'reject');

  return (
    <>
      <div className="container-dialog">
        <span
          data-testid="confirmDialogue_text"
          className="mb-5 capitalize"
        >{`Do you really want to ${status} trip request?`}</span>
        <div className="button-container">
          <button className="cancel-button" onClick={() => handleCancel(false)}>
            NO
          </button>
          <button
            className="confirmation-button"
            onClick={() => handleConfirm(dialogueStatus)}
          >
            Yes
          </button>
        </div>
      </div>
     
    </>
  );
}

export default ConfirmationDialogue;
