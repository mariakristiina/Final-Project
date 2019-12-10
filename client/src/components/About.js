import React from "react";

const About = props => {

  if (props.currentLanguage === "English")   {
    return(
        <>
        <h1>Hello</h1>
        <div>
        <p>We are a non-profit organisation that provides a platform and a space for locals in Berlin and recent refugees to help each other on non-profit basis, share skills and connect.</p>
      </div>
      </>
    ) } else if (props.currentLanguage === "German") {
        return (
            <>
            <h1>Hallo</h1>
             <p>Auf Deutch</p>
             </>
        ) }
}

export default About;