import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const CARS2 = () => {
  
  const chartRef = useRef(null);
  const [CARSResponses, setCARSResponses] = useState([]);

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const age = (getURLParameter("Age") || "N/A") + " Years";
  const name = getURLParameter("Name") || "N/A";
  const currentDate = new Date().toLocaleDateString();
  const TOT_CARS = getURLParameter("TOT_CARS") || "N/A";
  const carsInterpretation = getURLParameter("carsInterpretation") || "N/A";

  const CARSQuestions = [
    "Relating to People", "Imitation", "Emotional Response", "Body Use",
    "Object Use", "Adaptation to Change", 
    "Visual Response", "Listening Response",
    "Taste, Smell, and Touch Response and Use", "Fear or Nervousness", "Verbal Communication",
    "Nonverbal Communication", "Activity Level", "Level and Consistency of Intellectual Response",
    "General Impressions"
  ];
  const CARSQuestions1 = [
    "Relating to People", "Imitation", "Emotional Response", "Body Use",
    "Object Use", "Adaptation to Change", 
    // "Visual Response", "Listening Response",
    // "Taste, Smell, and Touch Response and Use", "Fear or Nervousness", "Verbal Communication",
    // "Nonverbal Communication", "Activity Level", "Level and Consistency of Intellectual Response",
    // "General Impressions"
  ];

  useEffect(() => {
    displayCARSResponses();
    createCARSChart();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Cleanup the chart on unmount
      }
    };
  }, []);

  const displayCARSResponses = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const responses = CARSQuestions1.map((question, index) => {
      const response = urlParams.get(`CARS_${index + 1}`) || "N/A";
      return { question, response };
    });
    setCARSResponses(responses);
  };

  const createCARSChart = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const CARSscores = CARSQuestions.map((_, index) => {
      return parseFloat(urlParams.get(`CARS_${index + 1}`)) || 0;
    });

    const barColors = [
      "#ff5733", "#33ff57", "#5733ff", "#ff33a8", "#33a8ff",
      "#a8ff33", "#ff8c33", "#33ff8c", "#8c33ff", "#ff338c",
      "#338cff", "#8cff33", "#ffcc33", "#33ffcc", "#cc33ff"
    ];

    const ctx = document.getElementById("CARSChart").getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy any existing chart
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: CARSQuestions,
        datasets: [{
          label: "CARS Scores",
          data: CARSscores,
          backgroundColor: barColors,
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
          datalabels: {
            color: "white",
            anchor: "center",
            align: "center",
            font: { size: 12, weight: "bold" },
            formatter: (value) => value.toFixed(2)
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 4,
            title: {
              display: true,
              text: "Scores (0 - 4)",
              font: { size: 14 }
            }
          },
          y: {
            title: {
              display: true,
              text: "CARS Questions",
              font: { size: 14 }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  };

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          text-align: justify;
        }
        .data-field {
          margin-bottom: 10px;
          font-size: 16px;
        }
        .label {
          font-weight: bold;
        }
        .chart-container {
          width: 100%;
          height: 500px;
          margin-top: 30px;
        }
        .table-container {
          margin-top: 30px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #94059f;
          color: white;
        }
        td {
          color: #333;
        }
      `}</style>

      <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen">
        <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm]">
          <div>
            <h1 className='text-left text-sm'>Childhood Autism Rating Scale Report</h1>
            <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
          </div>

          <div className="container" style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
            <h1 style={{
              paddingBottom: "15px",
              marginLeft: "-30vw",
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: "600",
              fontSize: "xx-large",
              color: "#94059f",
            }}>
              CARS <span style={{ color: "black" }}> Screening:</span>
            </h1>
            <div className="chart-container">
              <canvas id="CARSChart"></canvas>
            </div>

            <div className="table-container">
              <h2 style={{ color: "#94059f", fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
                CARS Responses:
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Response</th>
                  </tr>
                </thead>
                <tbody>
                  {CARSResponses.map((item, index) => (
                    <tr key={index}>
                      <td>{item.question}</td>
                      <td style={{ color: "#94059f" }}>{item.response}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-between items-center text-xs font-manrope mt-6 border-t-2 border-[#800080] pt-2">
              <span className='text-[10px]'>CARS Report - {name}</span>
              <div className="text-center text-[10px]">
                <span>ID: Report Generation Date: {currentDate}</span>
              </div>
              <span className='text-[10px]'>Page 16</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CARS2;
