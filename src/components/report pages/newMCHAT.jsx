import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const MCHAT = ({isLastPage}) => {
  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return 'N/A';
    if (!isNaN(rawDate)) {
      const excelEpoch = new Date(1899, 11, 30);
      const date = new Date(excelEpoch.getTime() + rawDate * 86400000);
      return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    }
    const parts = rawDate.split('/');
    if (parts.length !== 3) return rawDate;
    return `${parts[1].padStart(2, '0')}/${parts[0].padStart(2, '0')}/${parts[2]}`;
  };

  const patientData = {
    dob: formatDate(getURLParameter('dob')) || 'N/A',
    doa: formatDate(getURLParameter('Date_of_Assessment')) || 'N/A',
    name: (getURLParameter('Name') || 'N/A').trim(),
    mchatScore: getURLParameter('MCHATscore') || 'N/A',
    MCHATinterpretation: getURLParameter('MCHATinterpretation')?.toLowerCase() || 'N/A',
    assessor: (getURLParameter("Assessor")?.toLowerCase().split(" ")[0]) || "N/A",
    impression: getURLParameter('impression') || "N/A",
   };

  const signatureMap = {
    'deeksha': 'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/psych_deeksha_sign.jpg',
    'harshita': 'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/psych_harshita_sign.jpg',
    'poonam': 'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/psych_poonam_sign.png',
    // Add more if needed
  };  

  const signatureUrl = signatureMap[patientData.assessor];

  useEffect(() => {
    // displayData logic if needed later
  }, []);

  return (
    <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen relative">
      <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm] relative">
        <h1 className="text-sm font-semibold text-left text-purple-700">
          Modified Checklist for Autism in Toddlers Report
        </h1>
        <div className="w-full border-t-2 mt-2 border-purple-700"></div>

        <h2 className="text-2xl font-bold text-purple-800 mt-6">
          MCHAT <span className="text-black">Screening</span>
        </h2>

        <p className="mt-4 text-justify text-gray-700">
          The Modified Checklist for Autism in Toddlers, Revised (MCHAT-R) is a
          standardized screening tool designed to assess behavioral development
          in toddlers aged 16-30 months. This 20-question screener evaluates
          various aspects of a child's behavior, providing insight into their
          developmental progress.
        </p>

        <p className="mt-2 pt-4 text-left text-gray-700">
          Name: <span className="font-semibold">{patientData.name}</span>
          <br />
          Date of Birth:{' '}
          <span className="font-semibold">{patientData.dob}</span>
          <br />
          Date of Assessment:{' '}
          <span className="font-semibold">{patientData.doa}</span>
        </p>

        <table className="w-[60%] mx-auto mt-20 text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Score Range
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Classification
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">0-2</td>
              <td className="border px-4 py-2">Low Risk of Autism</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3-7</td>
              <td className="border px-4 py-2">Medium Risk of Autism</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">8-20+</td>
              <td className="border px-4 py-2">High Risk of Autism</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-8 pt-8 text-justify text-gray-700">
          The caregiver of {patientData.name} completed the MCHAT-R, and based
          on the results, the child scored a total of {patientData.mchatScore}. This score places 
          the child in the <strong>{patientData.MCHATinterpretation}-risk</strong> category for autism.
        </p>

        {isLastPage && (
          <div className="mt-12 border-t border-gray-300 pt-4 text-left text-gray-800">
            <h3 className="text-md font-semibold text-purple-800 mb-2">Impressions</h3>
            <p>
              Based on the assessment scores and behavioral observations:<br />
              {patientData.impression.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>

          </div>
        )}

        {signatureUrl && (
          <div className="mt-6 pl-3 flex justify-start">
            <div className="flex flex-col items-start text-xs text-gray-500">
              <img src={signatureUrl} alt="Digital Signature" className="h-[150px] w-auto" />
            </div>
          </div>
        )}


        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-gray-500 border-t border-purple-800 pt-2">
          <span>MCHAT Report - {patientData.name}</span>
          {/* <span>Page 08</span> */}
        </div>
      </div>
    </div>
  );
};

export default MCHAT;
