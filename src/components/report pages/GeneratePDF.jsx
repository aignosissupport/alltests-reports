import React, { useRef, useState, useContext } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Commnpdfpage from './Commnpdfpage';
import imglogo from '/aignosislogo.png';
import { AppContext } from "../../AppContext";
import ISAA from './newISAA';

import MCHAT from './newMCHAT';

import CARS from './newCARS';

import INCLEN from './newINCLEN';
import PatientHistory from './PatientHistory';
const pdfData = [
    {
        url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.1.png',
        alttext:'report page 1',
    },
    {
        url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.2.png',
        alttext:'report page 2',
    },
    {
        url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.3.png',
        alttext:'report page 3',
    },
    {
        url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.4.png',
        alttext:'report page 4',
    },
    {
        url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.5.png',
        alttext:'report page 5',
    },
    {
        url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.6.png',
        alttext:'report page 6',
    },
    {
        url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.7.png',
        alttext:'report page 7',
    },
]


const SecondpdfData = [
  {
    url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.1.png',
    alttext:'report page 13',
},
{
    url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.2.png',
    alttext:'report page 14',
},
{
    url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.3.jpg',
    alttext:'report page 14',
},
{
    url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.4.png',
    alttext:'report page 15',
},
{
    url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.5.png',
    alttext:'report page 16',
},
{
    url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.6.png',
    alttext:'report page 17',
},
{
    url:'https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.7.png',
    alttext:'report page 18',
},
]

// const ComponentToPrint = React.forwardRef((props, ref) => (
//     <div  id="pdf-container"  ref={ref}  className="p-5">
//          {pdfData.map((item, index) => (
//         <Commnpdfpage
//         key={index}
//         src={item.url}
//         alttext={item.alttext}
//         />
//     ))}
//         <Page1 />
//         <Page2 />
//         <Page3 />
//         <Page4 />
//         <Page5 />
//         {SecondpdfData.map((item, index) => (
//         <Commnpdfpage
//         key={index}
//         src={item.url}
//         alttext={item.alttext}
//         />
//     ))}
//     </div>
// ));
const ComponentToPrint = React.forwardRef(({ isisaaChecked, ismchatChecked, iscarsChecked, isinclenChecked}, ref) => (
  <div id="pdf-container" ref={ref} style={{ width: "794px", minHeight: "1123px" }}>
    {pdfData.map((item, index) => (
      <Commnpdfpage key={`pdfData-${index}`} src={item.url} alttext={item.alttext} />
    ))}

        <div className='pdf-page isaa-page'><PatientHistory /></div>

        <div className="pdf-page isaa-page"><ISAA /></div>

        <div className="pdf-page isaa-page"><MCHAT /></div>

        <div className="pdf-page isaa-page"><CARS /></div>

        <div className="pdf-page isaa-page"><INCLEN /></div>


    {SecondpdfData.map((item, index) => (
      <Commnpdfpage key={`SecondpdfData-${index}`} src={item.url} alttext={item.alttext} />
    ))}
  </div>
));


const GeneratePDF = () => {
  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
    const { testData,  } = useContext(AppContext);
    const name=getURLParameter("Name") || "N/A";
    const componentRef = useRef();  
    const [loading, setLoading] = useState(false); // Loader state
    const [isisaaChecked, setIsisaaChecked] = useState(true);
    const [ismchatChecked, setIsmchatChecked] = useState(true);
    const [iscarsChecked, setIscarsChecked] = useState(true);
    const [isinclenChecked, setIsinclenChecked] = useState(true);

    const [toRemove, setToRemove] = useState([7, 9, 11]);
    const handleCheckboxChange = (e, value) => {
      const { name, checked } = e.target;
      let updatedToRemove = [...toRemove];

      if (!checked) {
          if (name === "mchat" && !updatedToRemove.includes(10)) {
              updatedToRemove.push(10);
          } else if (name === "isaa" && !updatedToRemove.includes(8)) {
              updatedToRemove.push(8);
          } else if (name === "cars" && !updatedToRemove.includes(12)) {
              updatedToRemove.push(12);
          } else if (name === "inclen" && !updatedToRemove.includes(12)) {
            updatedToRemove.push(14);
        }
      } else {
          if (name === "mchat") {
              updatedToRemove = updatedToRemove.filter(num => num !== 10);
          } else if (name === "isaa") {
              updatedToRemove = updatedToRemove.filter(num => num !== 8);
          } else if (name === "cars") {
              updatedToRemove = updatedToRemove.filter(num => num !== 12);
          }
          else if (name === "inclen") {
            updatedToRemove = updatedToRemove.filter(num => num !== 14);
        }
      }

      setToRemove(updatedToRemove);

      // Update state based on checkbox name
      if (name === "mchat") setIsmchatChecked(checked);
      if (name === "isaa") setIsisaaChecked(checked);
      if (name === "cars") setIscarsChecked(checked);
      if (name === "inclen") setIsinclenChecked(checked);
  };
 

    const generatePDF = async () => {

      setLoading(true); // Show loader when PDF generation starts
      const pdf = new jsPDF({
        orientation: "p", 
        unit: "mm", 
        format: "a4",
        compress: true, // Enable compression
    });
            const pages = document.querySelectorAll(".pdf-page"); 
    
        for (let i = 0; i < pages.length; i++) {
          if(toRemove.includes(i)){
            continue;
          }
            const page = pages[i];
            

            try {
                const canvas = await html2canvas(page, {
                    useCORS: true,
                    scale: 2, // Ensure high resolution
                    backgroundColor: "#ffffff", // Avoid transparency issues
                    width: 794, 
                    height: 1123
                });
    
                const imgData = canvas.toDataURL("image/png", 1.0); 
    
                if (i !== 0) pdf.addPage();
                console.log(page);
                pdf.addImage(imgData, "PNG", 0, 0, 210, 297 ); // A4 size in mm
    
            } catch (error) {
                console.error("Error capturing page:", error);
            }
        }
    
        pdf.save(`${name}_report.pdf`);
        setLoading(false); // Hide loader after download is complete

    };

  
  
  
  
    


      
    return (
      <div className="text-center ml-[30%]">
       <div className="mb-4">
                <label>
                    <input type="checkbox" name="mchat" checked={ismchatChecked} onChange={(e) => handleCheckboxChange(e, 10)} />
                    MCHAT
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                    <input type="checkbox" name="isaa" checked={isisaaChecked} onChange={(e) => handleCheckboxChange(e, 8)} />
                    ISAA
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                    <input type="checkbox" name="cars" checked={iscarsChecked} onChange={(e) => handleCheckboxChange(e, 12)} />
                    CARS
                </label>
                <label>
                    <input type="checkbox" name="inclen" checked={isinclenChecked} onChange={(e) => handleCheckboxChange(e, 12)} />
                    INCLEN
                </label>
            </div>
        <button
        className="mt-5 px-4 ml-[-30%] py-2 bg-blue-600 text-white rounded"
        onClick={generatePDF}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate PDF"}
      </button>
      
      <ComponentToPrint 
        ref={componentRef} 
        isisaaChecked={isisaaChecked} 
        ismchatChecked={ismchatChecked} 
        iscarsChecked={iscarsChecked} 
        isinclenChecked ={isinclenChecked}
      />
      <center>
      {loading && (

        
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="p-4 bg-white rounded-lg">
            <img src={imglogo} alt=""  style={{scale:'1', height:'15vh'}}/>
            <p className="text-lg font-semibold text-gray-700">Generating PDF...</p>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mt-2"></div>
          </div>
        </div>
        
      )}
      </center>
    </div>
  );
};
  
  export default GeneratePDF;


