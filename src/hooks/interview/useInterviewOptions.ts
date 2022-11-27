import { createContext, useContext } from 'react';

export interface InterviewOptions {
  askStory?: boolean;
  shortInterview?: boolean;
  orgName?: string;
  isSaving: boolean;
  updatedAt?: string;
  isCompleted?: boolean;
  setIsSaving: (isSaving: boolean) => void;
}

const initialValue: InterviewOptions = {
  askStory: true,
  shortInterview: false,
  orgName: '',
  isSaving: false,
  isCompleted: false,
  updatedAt: new Date().toISOString(),
  setIsSaving: () => {}
};

export const InterviewOptionsContext = createContext<InterviewOptions>(initialValue);

const useInterviewOptions = (): InterviewOptions => {
  const interviewOptions = useContext(InterviewOptionsContext);

  return interviewOptions;
};

export default useInterviewOptions;
