import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const MCHAT = () => {
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
    dob: formatDate(getURLParameter('Date_of_Birth')) || 'N/A',
    doa: formatDate(getURLParameter('Date_of_Assessment')) || 'N/A',
    name: getURLParameter('Name') || 'N/A',
    mchatScore: getURLParameter('MCHATscore') || 'N/A',
    MCHATinterpretation: getURLParameter('MCHATinterpretation') || 'N/A',
  };

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
              <td className="border px-4 py-2">Mild Risk of Autism</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">8-20+</td>
              <td className="border px-4 py-2">Severe Risk of Autism</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Greater than 153</td>
              <td className="border px-4 py-2">Severe Autism</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-8 pt-8 text-justify text-gray-700">
          The caregiver of {patientData.name} completed the MCHAT-R, and based
          on the results, the child scored a total of {patientData.mchatScore}.
          This score indicates that {patientData.name} falls within the{' '}
          {patientData.MCHATinterpretation} risk range for Autism.
        </p>

        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-gray-500 border-t border-purple-800 pt-2">
          <span>MCHAT Report - {patientData.name}</span>
          {/* <span>Page 08</span> */}
        </div>
      </div>
    </div>
  );
};

export default MCHAT;
