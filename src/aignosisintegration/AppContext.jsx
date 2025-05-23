import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  // Define the shared state
  const [testData, setTestData] = useState({
    PATIENT_UID: '',
    TRANSACTION_ID: '',
    guardianPno: '',
    clinicOrReferrerName: '',
    patientName: '',
    patientDOB: '',
    inclenFormData: '',
    isaaFormData: '',
    carsFormData: '',
    dataCollectionMode: [],
    patienthistoryform1Data: '',
    patienthistoryform2Data: '',
    patienthistoryform3Data: '',
    patienthistoryform4Data: '',
    videolanguage:'',
    mchatscore:'',
    carsscore:'',
    isaascore:'',
    inclenscore:'',
    calibration_encrypted_aes_key: '',
    video_encrypted_aes_key: '',
    data_usage_consent: false,
  });

  // Pass the state and updater function to the provider
  return (
    <AppContext.Provider value={{ testData, setTestData }}>
      {children}
    </AppContext.Provider>
  );
};
