import React from "react";

const ErrorCameraMicAccess = () => {
  const errorStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1e0a2d", // Light red background
    color: "#f1f1f1", // Dark red text
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  };

  const errorTitleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const errorMessageStyle = {
    fontSize: "1.2rem",
  };

  return (
    <div className="bg-[#1A0C25] flex flex-col justify-center items-center min-h-screen text-center">
      {/* Step Progress Indicator */}
      {/* <StepProgress /> */}

      {/* Ai.gnosis Title with Glow Effect */}
      <div className="relative ">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-60 rounded-lg"></div>
        <h1 className="relative text-5xl font-semibold text-[#E3E2E5] z-10 font-montserrat">
          Ai.gnosis
        </h1>
      </div>

      {/* Big Thank You Message */}
      <div className="mt-4">
        <h2 className="text-6xl font-bold text-[#FFFFFF] font-manrope">
          Error
        </h2>
      </div>

      {/* Thank You Paragraph */}
      <div className="mt-6 max-w-2xl px-6 text-[#F6E8FB] font-raleway">
        <p className="text-lg text-center">
          We're having trouble accessing your webcam or microphone, which is
          required for this experience to work correctly. This issue is usually
          caused by browser permissions being denied, device settings blocking
          access, or another application using the camera or mic. Please ensure
          that you've granted the necessary permissions and try going back to the previous
          page.
        </p>
      </div>
    </div>
  );
};

export default ErrorCameraMicAccess;
