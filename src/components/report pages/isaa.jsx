import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ISAA = () => {
  const ISAAQuestions = [
    [
      'Has poor eye contact',
      'Lacks social smile',
      'Remains aloof',
      'Does not reach out to others',
      'Unable to relate to people',
      'Unable to respond to social/environmental cues',
      'Engages in solitary and repetitive play activities',
      'Unable to take turns in social interaction',
      'Does not maintain peer relationships',
    ],
    [
      'Inconsistent attention and concentration',
      'Shows delay in responding',
      'Has unusual memory of some kind',
      "Has 'savant' ability",
    ],
    [
      'Shows inappropriate emotional response',
      'Shows exaggerated emotions',
      'Engages in self-stimulating emotions',
      'Lacks fear of danger',
      'Excited or agitated for no apparent reason',
    ],
    [
      'Acquired speech and lost it',
      'Has difficulty in using non-verbal language or gestures to communicate',
      'Engages in stereotyped and repetitive use of language',
      'Engages in echolalic speech',
      'Produces infantile squeals/unusual noises',
      'Unable to initiate or sustain conversation with others',
      'Uses jargon or meaningless words',
      'Uses pronoun reversals',
      'Unable to grasp pragmatics of communication (real meaning)',
    ],
    [
      'Engages in stereotyped and repetitive motor mannerisms',
      'Shows attachment to inanimate objects',
      'Shows hyperactivity/restlessness',
      'Exhibits aggressive behavior',
      'Throws temper tantrums',
      'Engages in self-injurious behavior',
      'Insists on sameness',
    ],
    [
      'Unusually sensitive to sensory stimuli',
      'Stares into space for long periods of time',
      'Has difficulty in tracking objects',
      'Has unusual vision',
      'Insensitive to pain',
      'Responds to objects/people unusually by smelling, touching or tasting',
    ],
  ];

  const domainNames = [
    'Social Relationship and Reciprocity',
    'Cognitive Component',
    'Emotional Responsiveness',
    'Speech, Language, and Communication',
    'Behavioral Patterns',
    'Sensory Aspects',
  ];

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return 'N/A';

    // If it's a number or numeric string (Excel serial date)
    if (!isNaN(rawDate)) {
      const excelEpoch = new Date(1899, 11, 30); // Excel's day 1
      const date = new Date(excelEpoch.getTime() + rawDate * 86400000);
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }

    // Else, assume mm/dd/yyyy string and reformat
    const parts = rawDate.split('/');
    if (parts.length !== 3) return rawDate;
    return `${parts[1].padStart(2, '0')}/${parts[0].padStart(2, '0')}/${parts[2]}`;
  };

  const patientData = {
    dob: formatDate(getURLParameter('Date_of_Birth')) || 'N/A',
    doa: formatDate(getURLParameter('Date_of_Assessment')) || 'N/A',
    socialResponsiveness:
      parseFloat(getURLParameter('social_response')) || 'N/A',
    emotionalResponsiveness:
      parseFloat(getURLParameter('emotional_response')) || 'N/A',
    speechRecognition:
      parseFloat(getURLParameter('speech_recognition')) || 'N/A',
    behaviouralPattern:
      parseFloat(getURLParameter('behaviour_pattern')) || 'N/A',
    sensoryAspects: parseFloat(getURLParameter('sensory_aspect')) || 'N/A',
    cognitiveComponent: parseFloat(getURLParameter('cognitive')) || 'N/A',
    TOT_ISAA: parseFloat(getURLParameter('TOT_ISAA')) || 'N/A',
    isaaInterpretation: getURLParameter('isaaInterpretation') || 'N/A',
    name: getURLParameter('Name') || 'N/A',
  };

  const currentDate = new Date().toLocaleDateString();
  const displayData = () => {
    // document.getElementById('isaapatientNamecell').innerText = getURLParameter("Name") || "N/A";
    // document.getElementById('chronologicalAgecell').innerText = (getURLParameter("Age") || "N/A") + " Years";
    // document.getElementById('isaascore').innerText = formatToOneDecimal(patientData.TOT_ISAA);
    // document.getElementById('isaaInterpretationmessage').innerText = patientData.isaaInterpretation;

    createBarChart(patientData);
  };

  let chartInstance = null; // Store the chart instance globally

  const createBarChart = (data) => {
    const ctx = document.getElementById('barChart').getContext('2d');

    // Destroy existing chart if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Create new chart instance
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Social Responsiveness',
          'Emotional Responsiveness',
          'Speech Recognition',
          'Behavioural Pattern',
          'Sensory Aspects',
          'Cognitive Component',
        ],
        datasets: [
          {
            label: 'Percentage',
            data: [
              data.socialResponsiveness,
              data.emotionalResponsiveness,
              data.speechRecognition,
              data.behaviouralPattern,
              data.sensoryAspects,
              data.cognitiveComponent,
            ],
            backgroundColor: [
              '#93ef93',
              '#8bd0fa',
              '#b20fa9',
              '#bc81f6',
              '#f7a000',
              '#cbcbcb',
            ],
            borderColor: [
              '#4bc0c0',
              '#36a2eb',
              '#ffce56',
              '#9966ff',
              '#ff9f40',
              '#c9cbcf',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
          },
        },
        plugins: {
          datalabels: {
            color: 'white',
            anchor: 'center',
            align: 'center',
            font: {
              weight: 'bold',
              size: 14,
            },
            formatter: (value) => value.toFixed(2),
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  };

  useEffect(() => {
    // displayData();
  }, []);

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
        #barChart {
          max-width: 100%;
          margin-top: 20px;
        }
        .section-title {
          color: #94059f;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      `}</style>
      <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen">
        <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm]">
          <div>
            <h1 className="text-left text-sm">
              Indian Scale for Assessment of Autism Report
            </h1>
            <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
          </div>

          <div
            className="container"
            style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}
          >
            <h1
              style={{
                paddingBottom: '15px',
                fontFamily: '"Times New Roman", Times, serif',
                fontWeight: '600',
                fontSize: 'xx-large',
                color: '#94059f',
              }}
            >
              Developmental <span style={{ color: 'black' }}> Screening</span>
            </h1>
            <div style={{ textAlign: 'justify' }}>
              ISAA is an objective tool for persons with autism that uses
              observations, clinical evaluations of behaviors, testing by
              interaction with subjects, and supplemented by parents or
              caretakers in order to diagnose autism. ISAA consists of 40 items
              rated on a 5 scale ranging from 1 (never) to 5 (always). The 40
              items on ISAA are further divided into the following sub scales.
              <br />
              <br />
              Name: {patientData.name}
              <br />
              Date of Birth: {patientData.dob}
              <br />
              Date of Assessment: {patientData.doa}
            </div>

            <br />
            <center>
              <table
                border="4"
                style={{
                  width: '50%',
                  textAlign: 'center',
                  marginTop: '10px',
                  border: '1px solid #d1d5db',
                  padding: '8px',
                }}
              >
                <tr>
                  <th
                    style={{
                      border: '1px solid #d1d5db',
                      borderLeft: '0px',
                      borderRight: '0px',
                      padding: '8px',
                    }}
                  >
                    Domain
                  </th>
                  <th
                    style={{
                      border: '1px solid #d1d5db',
                      borderRight: '0px',
                      padding: '8px',
                    }}
                  >
                    Score
                  </th>
                </tr>
                <tr>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderLeft: '0px',
                      padding: '8px',
                    }}
                  >
                    Social Relationships and Reciprocity
                  </td>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderRight: '0px',
                      padding: '8px',
                    }}
                  >
                    {patientData.socialResponsiveness}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderLeft: '0px',
                      padding: '8px',
                    }}
                  >
                    Emotional Responsiveness
                  </td>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderRight: '0px',
                      padding: '8px',
                    }}
                  >
                    {patientData.emotionalResponsiveness}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderLeft: '0px',
                      padding: '8px',
                    }}
                  >
                    Speech and Language Communication
                  </td>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderRight: '0px',
                      padding: '8px',
                    }}
                  >
                    {patientData.speechRecognition}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderLeft: '0px',
                      padding: '8px',
                    }}
                  >
                    Behavioral Patterns
                  </td>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderRight: '0px',
                      padding: '8px',
                    }}
                  >
                    {patientData.behaviouralPattern}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderLeft: '0px',
                      padding: '8px',
                    }}
                  >
                    Sensory Aspects
                  </td>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderRight: '0px',
                      padding: '8px',
                    }}
                  >
                    {patientData.sensoryAspects}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderLeft: '0px',
                      padding: '8px',
                    }}
                  >
                    Cognitive Components
                  </td>
                  <td
                    style={{
                      border: '1px solid #d1d5db',
                      borderRight: '0px',
                      padding: '8px',
                    }}
                  >
                    {patientData.cognitiveComponent}
                  </td>
                </tr>
                {/* <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>&gt; 153</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Severe Autism</td>
                    </tr> */}
              </table>
            </center>
            {/* <canvas id="barChart"></canvas> */}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* <h2 style={{textAlign:"left"}}>ISAA Developmental Score: <span id="isaascore" >{patientData.TOT_ISAA} </span></h2>
        <p style={{textAlign:"left"}}>0% developmental score - maximally neurotypical score. A score of 100% developmental challenge is achieved if the most neurotypical response is selected for each relevant question in
this domain. <br/>
100% developmental score - maximally atypical score. A score of 0% developmental challenge is achieved if the atypical response is selected for each relevant question in this
domain.</p> */}
            {patientData.TOT_ISAA >= 63 && patientData.TOT_ISAA <= 69 ? (
              <>
                The Score on ISAA ({patientData.TOT_ISAA}) suggests the presence
                of some autistic traits, although they do not meet the threshold
                for a conclusive diagnosis of autism spectrum disorder.
              </>
            ) : (
              <>
                The Scores on ISAA were indicative of ({patientData.TOT_ISAA}){' '}
                {patientData.isaaInterpretation} degree of autistic traits being
                present in the child.
              </>
            )}

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="w-full flex justify-between items-center text-xs font-manrope mt-10 border-t-2 border-[#800080] pt-2">
              <span className="text-[10px]">
                ISAA Report - {patientData.name}
              </span>
              {/* <div className="text-center text-[10px]">
                        <span></span>
                        <br />
                        <span>ID: Report Generation Date: {currentDate}</span>
                    </div> */}
              <span className="text-[10px]">Page 08</span>
            </div>
            {domainNames.map((domain, index) => (
              <div key={index}>
                {/* <h2 className="section-title">{domain}</h2>
            <center>
            <table border="1" width="80%">
              <thead>
                <tr>
                  <th style={{ border: "1px solid #d1d5db", borderLeft:"0px" , padding: "8px" }}>Question</th>
                  <th style={{ border: "1px solid #d1d5db", borderLeft:"0px" , borderRight:"0px" , padding: "8px" }}>Response</th>
                </tr>
              </thead>
              <tbody> 
                {ISAAQuestions[index].map((question, qIndex) => (
                  <tr key={qIndex}>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px" ,  padding: "8px" }}>{question}</td>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px" , borderRight:"0px" , padding: "8px" }}>{getURLParameter(`ISAA_${index + 1}.${qIndex + 1}`) || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </center> */}
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ISAA;
