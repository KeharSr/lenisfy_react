import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api'

const ForgotPassword = () => {
  //make a state

  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')

  //send otp function
  const handleSendOtp = (e) => {
    e.preventDefault()


    //api call
    forgotPasswordApi({ phoneNumber }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message)
        setIsSent(true)
      }
    }).catch((err) => {
      if (err.response.status === 400 || 500) {
        toast.error(err.response.data.message)
      }
    })

  }


  //verify otp and set new password
  const handleVerifyOtp = (e) => {
    e.preventDefault()

    const data = {
      phoneNumber: phoneNumber,
      otp: otp,
      newPassword: newPassword
    }

    //api call
    verifyOtpApi(data).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message)
      }
    }).catch((err) => {
      if (err.response.status === 400 || 500) {
        toast.error(err.response.data.message)
      }
    })
  }




  return (
    <>
      <div className='container mt-3'>
        <h3>Forgot Password</h3>

        <form className='w-25'>
          <span className='d-flex'>
            <h4>+977</h4>
            <input disabled={isSent} onChange={(e) => setPhoneNumber(e.target.value)} type='phone' className='form-control' placeholder='Phone Number' />


          </span>
          <button disabled={isSent} onClick={handleSendOtp} className='btn btn-primary w-100 mt-3'>Submit</button>
          {
            isSent && <>
              <hr />

              <p> OTP has been sent to your {phoneNumber}👌</p>
              <input onChange={(e) => setOtp(e.target.value)} type='number' className='form-control' placeholder='Enter valid OTP' />
              <input onChange={(e) => setNewPassword(e.target.value)} type='password' className='form-control mt-3' placeholder='Enter new password' />
              <button onClick={handleVerifyOtp} className='btn btn-primary w-100 mt-3'>Submit</button>



            </>
          }
        </form>
      </div>
    </>
  )
}

export default ForgotPassword


