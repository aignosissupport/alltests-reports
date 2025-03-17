import React, { createContext, useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
// Create the context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [testData, setTestData] = useState({
    patient_id: "",
    transaction_id: "",
    focal_IOU: "",
    joint_attention_error: "",
    eye_contact_error: "",
    gaze_dispersion: "",
    gaze_speed: "",
    screen_focus: "",
    object_tracking_error: "",
    social_preference: "",
    gaze_holds: "",
    saccades: "",
    lipsync_recog: "",
    convo_recog: "",
    yaw: "",
    pitch: "",
    roll: "",
    name: "",
  });
  const [params] = useSearchParams();
  useEffect(() => {
    // const params = new useSearchParams(window.location.search);
    

  
    setTestData({
      patient_id: params.get("patient_id") || "",
      transaction_id: params.get("transaction_id") || "",
      focal_IOU: params.get("focal_IOU") || "",
      joint_attention_error: params.get("joint_attention_error") || "",
      eye_contact_error: params.get("eye_contact_error") || "",
      gaze_dispersion: params.get("gaze_dispersion") || "",
      gaze_speed: params.get("gaze_speed") || "",
      screen_focus: params.get("screen_focus") || "",
      object_tracking_error: params.get("object_tracking_error") || "",
      social_preference: params.get("social_preference") || "",
      gaze_holds: params.get("gaze_holds") || "",
      saccades: params.get("saccades") || "",
      lipsync_recog: params.get("lipsync_recog") || "",
      convo_recog: params.get("convo_recog") || "",
      yaw: params.get("yaw") || "",
      pitch: params.get("pitch") || "",
      roll: params.get("roll") || "",
      name: params.get("name") || "",
    });
  }, []);

  return (
    <AppContext.Provider value={{ testData }}>
      {children}
    </AppContext.Provider>
  );
};
