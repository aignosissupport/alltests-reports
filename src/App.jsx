import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router, Route, and Routes
import { AppProvider } from "./AppContext"; // Import AppProvider
import GeneratePDF from "./components/report pages/GeneratePDF";

const App = () => {
  return (
    <Router>
      <AppProvider>
        <Routes>
          {" "}
          {/* Use Routes to define all your routes */}
          {/* <Route path="/download" element={<Report />} /> */}
          {/* <Route path="/report" element={<ReportComLast />} /> */}
          {/* <Route path="/" element={<ResultsPage />} /> */}
          {/* <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} /> */}
          {/* <Route path='/generatepdf' element={<GeneratePDF />} /> */}
          <Route path="/" element={<GeneratePDF />} />
          {/* <Route path="/isaa" element={<ISAA />} />
          <Route path="/isaa2" element={<ISAA2 />} />
          <Route path="/isaa3" element={<ISAA3 />} />
          <Route path="/isaa4" element={<ISAA4 />} />
          <Route path="/mchat" element={<MCHAT />} />
          <Route path="/mchat2" element={<MCHAT2 />} />
          <Route path="/mchat3" element={<MCHAT3 />} />
          <Route path="/cars" element={<CARS />} />
          <Route path="/cars2" element={<CARS2 />} />
          <Route path="/cars3" element={<CARS3 />} />  */}
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;
