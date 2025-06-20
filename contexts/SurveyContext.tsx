import React, { createContext, useContext, useState } from 'react';
import { SurveyData } from '@/types/database';

interface SurveyContextType {
  surveyData: Partial<SurveyData>;
  updateSurveyData: (data: Partial<SurveyData>) => void;
  resetSurveyData: () => void;
}

const SurveyContext = createContext<SurveyContextType>({
  surveyData: {},
  updateSurveyData: () => {},
  resetSurveyData: () => {},
});

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [surveyData, setSurveyData] = useState<Partial<SurveyData>>({});

  const updateSurveyData = (data: Partial<SurveyData>) => {
    setSurveyData(prev => ({ ...prev, ...data }));
  };

  const resetSurveyData = () => {
    setSurveyData({});
  };

  return (
    <SurveyContext.Provider value={{
      surveyData,
      updateSurveyData,
      resetSurveyData,
    }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}