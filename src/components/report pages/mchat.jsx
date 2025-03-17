import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const MCHAT = () => {
  

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  const age=(getURLParameter("Age") || "N/A") + " Years";
  const formatToOneDecimal = (value) => parseFloat(value).toFixed(1);
  const name=getURLParameter("Name") || "N/A";  
  const currentDate = new Date().toLocaleDateString();
  const mchatScore = getURLParameter("MCHATscore") || "N/A";
  const MCHATinterpretation = getURLParameter("MCHATinterpretation") || "N/A";
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
 <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen" >
 <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm]">
             <div>
                    <h1 className='text-left text-sm'>Modified Checklist for Autism in Toddlers Report</h1>
                    <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
                </div>

      <div className="container" style={{width: "100%",
          maxWidth: "800px",
          margin: "auto"}}>
        <h1 style={{paddingBottom: "15px",
            marginLeft:"-28vw",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: "600",
            fontSize: "xx-large",
            color: "#94059f",
            }}>MCHAT <span style={{color:"black"}}> Screening:</span>
        </h1>
        <div style={{textAlign:"justify"}}>
        The Modified Checklist for Autism in Toddlers, Revised (MCHAT-R) is a standardized screening tool designed to assess behavioral development in toddlers aged 16-30 months. This 20-question screener evaluates various aspects of a child's behavior, providing insight into their developmental progress.

                <br /> <br /> <br /> <br />
                The caregiver of {name} completed the MCHAT-R, and based on the results, the child scored a total of {mchatScore}. This score indicates that {name} falls within the {MCHATinterpretation} risk range for Autism.

                {/* The system provides outputs as <span id="MCHATinterpretationmessage"
                    style={{fontSize: "15px", color: "#007bff"}}> {MCHATinterpretation}</span> and the Aignosis ISAA test output was: <span id='isaascore'
                    style={{fontSize: "xx-large", color: "#007bff"}}>{mchatScore}</span>  */}
                    These results will inform discussions with {name}'s healthcare provider, ensuring timely and appropriate support for their developmental needs.
                <br /><br />
        </div>
        
        {/* <div id="patientData" style={{fontSize:"larger"}}>
          <div><span className="label" >Patient Name:</span> <span id="isaapatientNamecell">{name}</span></div>
          <div><span className="label">Age:</span> <span id="chronologicalAgecell">{age}</span></div>
        </div> */}
        <br /><br /> <br />  
        {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{mchatScore} </span></h2>
        <p style={{textAlign:"left"}}>Interpretation: <span id="MCHATinterpretationmessage">{MCHATinterpretation}</span></p> */}

       
        
       
        
        <center>
        <table border="4" style={{width: "50%", textAlign: "center", marginTop: "10px", border: "1px solid #d1d5db" , padding: "8px" }}>
                    <tr >
                        <th style={{ border: "1px solid #d1d5db", borderLeft:"0px", borderRight:"0px" ,  padding: "8px" }}>Score Range</th>
                        <th style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Classification</th>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>&lt; 0-2</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Low Risk of Autism</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>3-7</td>
                        <td style={{ border: "1px solid #d1d5db",borderRight:"0px" ,  padding: "8px" }}>Mild Risk of Autism</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>8-20+</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Severe Risk of Autism</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>&gt; 153</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Severe Autism</td>
                    </tr>
                </table> 
        </center> 
        <br /><br /><br /> <br /><br />
        {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{mchatScore} </span></h2>
        <p style={{textAlign:"left"}}>Interpretation: <span id="MCHATinterpretationmessage">{MCHATinterpretation}</span></p> */}

        {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
         <div className="w-full flex justify-between items-center text-xs font-manrope mt-60 border-t-2 border-[#800080] pt-2">
                    <span className='text-[10px]'>MCHAT Report - {name}</span>
                    <div className="text-center text-[10px]">
                        <span></span>
                        <br />
                        <span>ID: Report Generation Date: {currentDate}</span>
                    </div>
                    <span className='text-[10px]'>Page 12</span>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default MCHAT;
