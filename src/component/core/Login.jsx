import React from 'react'
import Tamplet from './Tamplet'
import logimg from '../../assets/images/login.webp'

const Login = () => {
  return (
    <div>
      <Tamplet
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={logimg}
      formType="login"
    />
    </div>
  )
}

export default Login
