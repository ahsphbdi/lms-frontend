export default function AssignmentModal({
  closeCreateAssignmentModal,
  createAssignmentModalTop,
  fetchSessionData,
  sessionId
}) {
  return (
    <div
      className="course-detail-top-item-modal"
      style={{ top: `${createAssignmentModalTop}%` }}
    >
      <div className="modal-container">
        <div className="modal-close" onClick={closeCreateAssignmentModal}></div>
      </div>
    </div>
  );
}
