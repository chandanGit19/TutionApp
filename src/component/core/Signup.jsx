import React from 'react'
import logImg from '../../assets/images/signup.webp'
import Tamplet from './Tamplet'
const Signup = () => {
  return (
    <div>
      <Tamplet 
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={logImg}
      formType="signup"/>
    </div>
  )
}

export default Signup
