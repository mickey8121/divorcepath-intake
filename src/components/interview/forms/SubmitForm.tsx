import { FC, Fragment, useCallback, useState } from 'react';

import { useRouter } from 'next/router';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';

import useIntakeFromProvider from 'hooks/intake/useIntakeFromProvider';
import useInterviewOptions from 'hooks/interview/useInterviewOptions';

import { useSubmitIntakeInterviewMutation } from 'generated/graphql';

const SubmitForm: FC = () => {
  const { isCompleted, orgName } = useInterviewOptions();

  const [isConfirm, setIsConfirm] = useState(false);

  const handleChangeToggle = useCallback(() => setIsConfirm(prev => !prev), []);

  const [submitInterview, { loading }] = useSubmitIntakeInterviewMutation();

  const { email } = useIntakeFromProvider();

  const { query } = useRouter();

  const handleSubmit = useCallback(async () => {
    try {
      await submitInterview({ variables: { where: { token: query.token as string } } });

      toast.success('Interview successfully submitted', { autoClose: 3000 });
    } catch {
      toast.error(
        'The time for completing this interview has expired or has already been sent. If you have any questions, contact support or a lawyer.'
      );
    }
  }, [query.token, submitInterview]);

  return (
    <Fragment>
      <div className="hint">
        Once you've finished this interview, click "Submit" to confirm your answers. Contact{' '}
        <span className="org-name">{orgName}</span> at {email} if you have any questions about this
        interview or your file.
      </div>

      <div className="hint">
        Once you've submitted the interview, your answers will be saved to your client profile.
        Please double check and confirm your answers before submitting.
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          name="isConfirm"
          id="customCheckRegister"
          onChange={handleChangeToggle}
          type="checkbox"
          checked={isConfirm}
          disabled={isCompleted}
        />
        <label className="form-check-label" htmlFor="customCheckRegister">
          <span>I've checked my answers</span>
        </label>
      </div>

      <div className="submit-buttons">
        <Button
          className="submit"
          type="submit"
          onClick={handleSubmit as any}
          disabled={!isConfirm || loading || isCompleted}
        >
          Save and Submit
        </Button>
        <Button className="cancel" disabled={loading || isCompleted}>
          Cancel
        </Button>
      </div>
    </Fragment>
  );
};

export default SubmitForm;
