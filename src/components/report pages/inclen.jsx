import React, { useEffect } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const INCLEN = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const getURLParameter = (name) => {
    return urlParams.get(name);
  };
  const age=(getURLParameter("ca") || "");
  const formatToOneDecimal = (value) => parseFloat(value).toFixed(1);
  const name=getURLParameter("Name") || "";  
  const currentDate = new Date().toLocaleDateString();
  const SQ = getURLParameter("SQ") || "";
  const SA = getURLParameter("SA") || "";
  const SHD = getURLParameter("SHD") || "";
  const SHE = getURLParameter("SHE") || "";
  const SD = getURLParameter("SD") || "";
  const OCC = getURLParameter("OCC") || "";
  const COM = getURLParameter("COM") || "";
  const LOC = getURLParameter("LOC") || "";
  const SOC = getURLParameter("SOC") || "";
  const SHG = getURLParameter("SHG") || "";
  const dq = urlParams.get("dq") || "N/A";
  const da = urlParams.get("da") || "N/A";
  const INCLENscore = urlParams.get("INCLENscore") || "N/A";
  const INCLEN_B1 = urlParams.get("INCLEN_B1") || "N/A";
  const INCLEN_B2 = urlParams.get("INCLEN_B2") || "N/A";
  const INCLEN_B3 = urlParams.get("INCLEN_B3") || "N/A";
  const INCLEN_B4 = urlParams.get("INCLEN_B4") || "N/A";
  const INCLEN_B5 = urlParams.get("INCLEN_B5") || "N/A";
  // const INCLEN_B6 = urlParams.get("INCLEN_B6") || "N/A";
  const INCLEN_B7 = urlParams.get("INCLEN_B7") || "N/A";
  const INCLEN_B8 = urlParams.get("INCLEN_B8") || "N/A";
  const INCLEN_B9 = urlParams.get("INCLEN_B9") || "N/A";
  const INCLEN_B10 = urlParams.get("INCLEN_B10") || "N/A";
  // const INCLEN_B11 = urlParams.get("INCLEN_B11") || "N/A";

  let INCLEN_B6 = urlParams.get("INCLEN_B6") || "N/A";
  let INCLEN_B11 = urlParams.get("INCLEN_B11") || "N/A";

  // Convert B6: If it's a string and not "nan", set to 1, else 0
  INCLEN_B6 = (INCLEN_B6 && INCLEN_B6.toLowerCase() !== "nan") ? 1 : 0;

  // Convert B11: If it's "No ASD (Response to 4 is “0”)", set to 0, else 1
  INCLEN_B11 = (INCLEN_B11 && INCLEN_B11.startsWith("No ASD")) ? 0 : 1;

	const formatteddq = isNaN(dq) ? dq : formatToOneDecimal(dq);
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
                    <h1 className='text-left text-sm'>Developmental Screening Test</h1>
                    <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
                </div>

      <div className="container" style={{width: "100%",
          maxWidth: "800px",
          margin: "auto"}}>
        <h1 style={{paddingBottom: "15px",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: "600",
            fontSize: "xx-large",
            color: "#94059f",
            }}>INCLEN <span style={{color:"black"}}> Screening</span>
        </h1>
        <div style={{ textAlign: "justify" }}>
          The INCLEN-ASD tool has been developed for identification of Autism Spectrum Disorder. 
          This has been further modified by AIIMS, New Delhi.

          <br /><br />
                  
          <center>
          <table border="4" style={{width: "50%", textAlign: "center", marginTop: "10px", border: "1px solid #d1d5db" , padding: "8px" }}>
                <tr >
                    <th style={{ border: "1px solid #d1d5db", borderLeft:"0px", borderRight:"0px" ,  padding: "8px" }}>Parameter</th>
                    <th style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Score</th>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Social Interaction</td> 
                    <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{INCLEN_B1.charAt(0)}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>Comunication</td> 
                    <td style={{ border: "1px solid #d1d5db",borderRight:"0px" ,  padding: "8px" }}>{INCLEN_B2.charAt(0)}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>Restricted Interests</td> 
                    <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{INCLEN_B3.charAt(0)}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Early Onset</td> 
                    <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{INCLEN_B7.charAt(0)}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Impaired function</td> 
                    <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{INCLEN_B6}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Impaired function</td> 
                    <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{INCLEN_B4.charAt(0)}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Total Number of Criteria fulfilled</td> 
                    <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{INCLEN_B5.charAt(0)}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Summary Assesment of ASD</td> 
                    <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{INCLEN_B11}</td>
                </tr>
          </table> 
          </center> 

        <br /><br />

          {(INCLENscore === "1" || (INCLENscore === "0" && INCLEN_B4.charAt(0) === "1")) ? (
                <>
                    The scores of INDT-ASD were indicating that the child has Autism Spectrum Disorder.
                </>
            ) : (
                <>
                    The scores of INDT-ASD were indicating that the child does not have Autism Spectrum Disorder.
                </>
          )}


          <br /><br />
      </div>
      <br /><br />

        
        {/* <div id="patientData" style={{fontSize:"larger"}}>
          <div><span className="label" >Patient Name:</span> <span id="isaapatientNamecell">{name}</span></div>
          <div><span className="label">Age:</span> <span id="chronologicalAgecell">{age}</span></div>
        </div>
        <br /><br /> */}
        {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{SQ} </span></h2>
        <p style={{textAlign:"left"}}>Interpretation: <span id="SAmessage">{SA}</span></p> */}

       
        
       

        <br /><br />
        <div style={{fontSize: "12px",
            color: "#727a98",
            fontFamily: `"Times New Roman", Times, serif`,
            fontWeight: "600",
            lineHeight: "15px",
            textAlign:"justify"}}>
              {/* On INCLEN the social quotient was calculated to be {SQ} which indicates no impairment in socio adaptive functioning.  */}
            {/* <p>The  INCLEN (Childhood Autism Rating Scale) test output provides an assessment of the child's behavior patterns based on their responses to key screening questions across various developmental domains.</p> <p> <br /> <strong>Lower INCLEN Score:</strong> A lower score indicates that the child’s behaviors align closely with typical developmental milestones, suggesting a minimal likelihood of autism spectrum disorder (ASD). In this case, the child exhibits expected social interaction, communication, and behavioral patterns, indicating that the child’s development is progressing typically. </p> <br /><p> <strong>Higher INCLEN Score:</strong> A higher score suggests that the child’s responses indicate a greater degree of atypical behaviors or developmental delays, which may be associated with autism spectrum disorder. This means that the child may experience challenges in areas such as social communication, emotional response, imitation, and flexibility. A higher score doesn’t confirm a diagnosis of autism but serves as an early indicator that further evaluation by a specialist may be necessary. </p> <br /> <p> The INCLEN screening tool is designed to help identify children who may require additional assessment and intervention at an early stage. Early detection and timely intervention can play a crucial role in supporting a child’s developmental needs and improving long-term outcomes. </p> */}
        </div>
        {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{SQ} </span></h2>
        <p style={{textAlign:"left"}}>Interpretation: <span id="SAmessage">{SA}</span></p> */}

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
         <div className="w-full flex justify-between items-center text-xs font-manrope mt-6 border-t-2 border-[#800080] pt-2">
                    <span className='text-[10px]'>INCLEN Report - {name}</span>
                    <div className="text-center text-[10px]">
                        <span></span>
                        <br />
                        <span>ID: Report Generation Date: {currentDate}</span>
                    </div>
                    <span className='text-[10px]'>Page 15</span>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default INCLEN;
