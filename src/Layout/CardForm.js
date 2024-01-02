import React from 'react';

function CardForm({ formData, onChange, onSubmit, onCancel ,submitLabel, cancelLabel}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          name="front"
          id="front"
          className="form-control"
          rows="3"
          value={formData.front}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          name="back"
          id="back"
          className="form-control"
          rows="3"
          value={formData.back}
          onChange={onChange}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
      {submitLabel}
      </button>
      <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>
      {cancelLabel}
      </button>
    </form>
  );
}

export default CardForm;