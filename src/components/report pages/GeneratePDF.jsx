import React, { useRef, useState, useContext } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Commnpdfpage from './Commnpdfpage';
import imglogo from '/aignosislogo.png';
import { AppContext } from "../../AppContext";
import ISAA from './newISAA';
import ISAA2 from './isaa2';
import ISAA3 from './isaa3';
import ISAA4 from './isaa4';
import MCHAT from './newMCHAT';
import MCHAT2 from './mchat2';
import MCHAT3 from './mchat3';
import CARS from './newCARS';
import CARS2 from './cars2';
import CARS3 from './cars3';
import INCLEN from './newINCLEN';
const pdfData = [
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738767409455_page1.png',
        alttext:'report first page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738767504591_page2.png',
        alttext:'report second page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738768231265_page3.png',
        alttext:'report third page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738768279180_page4.png',
        alttext:'report four page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738768308524_page5.png',
        alttext:'report fifth page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738768377852_page6.png',
        alttext:'report six page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738768391375_page7.png',
        alttext:'report seven page',
    },
]


const SecondpdfData = [
    // {
    //     url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738768677082_page8.png',
    //     alttext:'report eight page',
    // },
    // {
    //     url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738768918579_page9.png',
    //     alttext:'report nine page',
    // },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738768941181_page10.png',
        alttext:'report ten page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738768955924_page11.png',
        alttext:'report eleven page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738769196127_page12.png',
        alttext:'report tweleve page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738769245551_page13.png',
        alttext:'report thireteen page',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738769259360_page14.png',
        alttext:'report  page 14',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738769273519_page15.png',
        alttext:'report page 15',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738769286119_page16.png',
        alttext:'report page 16',
    },
    {
        url:'https://prod-aignosis-terraform-state.s3.ap-south-1.amazonaws.com/1738769299141_page17.png',
        alttext:'report page 17',
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
const ComponentToPrint = React.forwardRef(({ isisaaChecked, ismchatChecked, iscarsChecked }, ref) => (
  <div id="pdf-container" ref={ref} style={{ width: "794px", minHeight: "1123px" }}>
    {pdfData.map((item, index) => (
      <Commnpdfpage key={`pdfData-${index}`} src={item.url} alttext={item.alttext} />
    ))}

        <div className="pdf-page isaa-page"><ISAA /></div>
        {/* <div className="pdf-page isaa-page"><ISAA2 /></div>
        <div className="pdf-page isaa-page"><ISAA3 /></div>
        <div className="pdf-page isaa-page"><ISAA4 /></div> */}


         <div className="pdf-page isaa-page"><MCHAT /></div>
        {/* <div className="pdf-page isaa-page"><MCHAT2 /></div>
        <div className="pdf-page isaa-page"><MCHAT3 /></div> */}


    
        <div className="pdf-page isaa-page"><CARS /></div>
        {/* <div className="pdf-page isaa-page"><CARS2 /></div>
        <div className="pdf-page isaa-page"><CARS3 /></div>  */}
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