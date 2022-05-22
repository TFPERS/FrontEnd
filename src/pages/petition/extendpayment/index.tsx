import Link from "next/link";
import React from "react";
// import StepProgressBar from "react-step-progress";
// import "react-step-progress/dist/index.css";
import Layout from "../../../components/Layout/main";

function ExtentPayment() {
  const step1Content = <h1>dd</h1>;
  const step2Content = <h1>dd</h1>;
  const step3Content = <h1>dd</h1>;

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }

  function step3Validator() {
    // return a boolean
  }
  return (
    <Layout>
      {/* <StepProgressBar
        startingStep={0}
        steps={[
          {
            label: "Briefing",
            name: "Briefing",
            content: step1Content,
          },
          {
            label: "Image-Acquisition",
            name: "Image-Acquisition",
            content: step2Content,
          },
          {
            label: "Image-processing",
            name: "Image Processing",
            content: step3Content,
          },
        ]}
      /> */}
      <div>
        <Link href="/petition">
          <a>back</a>
        </Link>
      </div>
    </Layout>
  );
}

export default ExtentPayment;
