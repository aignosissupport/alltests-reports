import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ISAA = () => {
  

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return "N/A";
    if (!isNaN(rawDate)) {
      const excelEpoch = new Date(1899, 11, 30);
      const date = new Date(excelEpoch.getTime() + rawDate * 86400000);
      return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
    }
    const parts = rawDate.split("/");
    if (parts.length !== 3) return rawDate;
    return `${parts[1].padStart(2, "0")}/${parts[0].padStart(2, "0")}/${parts[2]}`;
  };

  const parseWeightInKg = (input) => {
            // Normalize input
            const normalized = input.trim().toLowerCase();

            // Extract float number using regex
            const match = normalized.match(/[\d.]+/);

            // If a number is found, return it as float
            if (match) {
                return parseFloat(match[0]);
            }

            // If no number found, return "Not remember"
            return "Not remember";
        };

  const formatMedHistory = (input1, input2) =>{
            if (input1.toLowerCase() !== "None") {
                return `${input1}, ${input2}`;
            } else {
                return `${input1}`;
            }
        };

  const formatSentence = (input1, input2) => {
            if (input1.toLowerCase() === "yes") {
                return `${input1}, ${input2}`;
            } else if (input1.toLowerCase() === "no") {
                return input1;
            }
    };


  const patientData = {
    name: getURLParameter("Name") || "N/A",
    age_month: getURLParameter("age_month") || "N/A",
    gender: getURLParameter("gender") || "N/A",
    dob: formatDate(getURLParameter("dob") || "N/A"),
    doa: formatDate(getURLParameter("Date_of_Assessment") || "N/A"),
    test_location: getURLParameter("test_location") || "N/A",
    assessor: getURLParameter("Assessor") || "N/A",
    informant: getURLParameter("informant") || "N/A",

    // Brief Background Info (developmental history)
    social_smile: getURLParameter("d1") || "N/A",
    head_control: getURLParameter("d2") || "N/A",
    sitting: getURLParameter("d3") || "N/A",
    standing: getURLParameter("d4") || "N/A",
    walking: getURLParameter("d5") || "N/A",
    babbling: getURLParameter("d6") || "N/A",
    one_word: getURLParameter("d7") || "N/A",
    speech: getURLParameter("d8") || "N/A",
    communication: getURLParameter("d9") || "N/A",

    // Patients Medication History
    seizures: getURLParameter("d10_1") || "N/A",
    feeding_diff: getURLParameter("d10_2") || "N/A",
    abnormal_movement: getURLParameter("d10_3") || "N/A",
    vision_diff: getURLParameter("d10_4") || "N/A",
    hearing_diff: getURLParameter("d10_5") || "N/A",
    therapy_received: getURLParameter("d10_6") || "N/A",

    // Personal History
    pod: getURLParameter("c1") || "N/A",
    gest_age: getURLParameter("c2") || "N/A",
    birth_order: (getURLParameter("b7") || "N/A").toLowerCase(),
    delivery_type: getURLParameter("c3") || "N/A",
    birth_cry: getURLParameter("c4") || "N/A",
    nicu_final: formatSentence(getURLParameter("c5_1") || "N/A", getURLParameter("c5_2") || "N/A") || "N/A",
    birth_weight: parseWeightInKg(getURLParameter("c6") || "N/A"),
    atypical_body: getURLParameter("c8") || "N/A",

    // Antenatal Risk Factors
    hyperthyroidism: getURLParameter("b4_1") || "N/A",
    weight_gain: getURLParameter("b4_2") || "N/A",
    bleeding: getURLParameter("b4_3") || "N/A",
    diabetes: getURLParameter("b4_4") || "N/A",
    infection: getURLParameter("b4_5") || "N/A",
    harmful_meds: getURLParameter("b4_6") || "N/A",
    trauma: getURLParameter("b4_7") || "N/A",

    // Family History
    marriage_in_family_relation: getURLParameter("b8") || "N/A",
    family_type: getURLParameter("b9") || "N/A",
    family_medical_history: formatMedHistory(getURLParameter("b10_1") || "N/A", getURLParameter("b10_2") || "N/A")
};


  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    // displayData logic if needed later
  }, []);

  return (
    <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen relative" >
    <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm] relative">
        <h1 className="text-sm font-semibold text-left text-purple-700">Patient Information</h1>
        <div className="w-full border-t-2 mt-2 border-purple-700"></div>

        <h2 className="text-2xl font-bold text-purple-800 mt-6">Patient <span className="text-black">History</span></h2>
        {/* <p className="mt-4 text-justify text-gray-700">
          ping pong
        </p> */}

        {/* <table className="w-full mx-auto mt text-sm border-collapse"> */}
        <table className="w-full mx-auto mt text-[11px] border-collapse">
          
            <tbody>
                <tr>
                    <th className="text-center underline py-5" colSpan={3}>
                        Basic Information
                    </th>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Name: {patientData.name}</td>
                    <td className="text-left px-4 py-2">Age: {patientData.age_month}</td>
                    <td className="text-left px-4 py-2">Gender: {patientData.gender}</td>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Date of Birth: {patientData.dob}</td>
                    <td className="text-left px-4 py-2">Date of Assessment: {patientData.doa}</td>
                    <td className="text-left px-4 py-2">Test location: {patientData.test_location}</td>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Assessor: {patientData.assessor}</td>
                    <td className="text-left px-4 py-2">Informant: {patientData.informant}</td>
                </tr>
                <tr>
                    <th className="text-center underline py-5" colSpan={3}>
                        Developmental History
                    </th>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Social Smile: {patientData.social_smile}</td>
                    <td className="text-left px-4 py-2">Head Control: {patientData.head_control}</td>
                    <td className="text-left px-4 py-2">Sitting: {patientData.sitting}</td>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Standing: {patientData.standing}</td>
                    <td className="text-left px-4 py-2">Walking: {patientData.walking}</td>
                    <td className="text-left px-4 py-2">Babbling: {patientData.babbling}</td>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">One Word (meaningful): {patientData.one_word}</td>
                    <td className="text-left px-4 py-2">Speech: {patientData.speech}</td>
                    <td className="text-left px-4 py-2">Communication: {patientData.communication}</td>
                </tr>
                <tr>
                    <th className="text-center underline py-5" colSpan={3}>
                        Patient Medical History
                    </th>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Seizures: {patientData.seizures}</td>
                    <td className="text-left px-4 py-2">Feeding Difficulties: {patientData.feeding_diff}</td>
                    <td className="text-left px-4 py-2">Abnormal Movements: {patientData.abnormal_movement}</td>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Vision Difficulties: {patientData.vision_diff}</td>
                    <td className="text-left px-4 py-2">Hearing Difficulties: {patientData.hearing_diff}</td>
                    <td className="text-left px-4 py-2">Therapy Received: {patientData.therapy_received}</td>
                </tr>
                <tr>
                    <th className="text-center underline py-5" colSpan={3}>
                        Personal History
                    </th>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Place of Delivery: {patientData.pod}</td>
                    <td className="text-left px-4 py-2">Gestational Age: {patientData.gest_age}</td>
                    <td className="text-left px-4 py-2">Birth Order: {patientData.birth_order}</td>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Delivery Type: {patientData.delivery_type}</td>
                    <td className="text-left px-4 py-2">Birth Cry: {patientData.birth_cry}</td>
                    <td className="text-left px-4 py-2">NICU Stay: {patientData.nicu_final}</td>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Birth Weight: {patientData.birth_weight}</td>
                    <td className="text-left px-4 py-2">Congenital Malformations: {patientData.atypical_body}</td>
                </tr>
                <tr>
                    <th className="text-center underline py-5" colSpan={3}>
                        Antenatal Risk Factors
                    </th>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Hyperthyroidism: {patientData.hyperthyroidism}</td>
                    <td className="text-left px-4 py-2">Poor Weight Gain: {patientData.weight_gain}</td>
                    <td className="text-left px-4 py-2">Bleeding in Pregnancy: {patientData.bleeding}</td>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Diabetes: {patientData.diabetes}</td>
                    <td className="text-left px-4 py-2">Infection: {patientData.infection}</td>
                    <td className="text-left px-4 py-2">Use of Harmful Medication: {patientData.hyperthyroidism}</td>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Trauma: {patientData.weight_gain}</td>
                </tr>
                <tr>
                    <th className="text-center underline py-5" colSpan={3}>
                        Family History
                    </th>
                </tr>
                <tr>
                    <td className="text-left px-4 py-2">Marriage in Family Relation: {patientData.marriage_in_family_relation}</td>
                    <td className="text-left px-4 py-2">Family Type: {patientData.family_type}</td>
                    <td className="text-left px-4 py-2">Medical History: {patientData.family_medical_history}</td>
                </tr>
            </tbody>
        </table>

        

        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-gray-500 border-t border-purple-800 pt-2">
            <span>ISAA Report - {patientData.name}</span>
            {/* <span>Page 08</span> */}
        </div>
      </div>
    </div>
  );
};

export default ISAA;