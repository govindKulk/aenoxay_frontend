import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from './login/Button'

export const verifyEmail = async (url, body, headers) => {

  console.log(headers)

  const res = await axios.post(url,body, {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },

  })

  return res;
}

const EmailVerification = () => {
  const [verifyStatus, setVerifyStatus] = useState(false)
  const {id} = useParams()
  console.log(id)
  const navigate = useNavigate()
  useEffect(() => {

    if(verifyStatus) {
      setTimeout(() => {
        navigate('/verification_page')
      }, 3000)
      return () => {}
    }

    verifyEmail('/user/verify', {otl: id}).then(res => {
      if(res.status === 200){
        console.log(res.data);
        setVerifyStatus(true)

      }else if(res.status === 500){
        console.log(res.data);
      }
    }).catch(err => {
      console.log(err)
    })


  }, [verifyStatus])

  return (
    <div>
      
      {verifyStatus && <h1>
        Successfully verified your email. Redirecting to the home page.

      </h1>}


    </div>
  )
}

export default EmailVerification;
