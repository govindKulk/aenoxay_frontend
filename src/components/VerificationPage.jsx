import React, { useEffect, useState } from 'react'
import { RiMailCheckFill } from "react-icons/ri";
import Button from './login/Button';
import { verifyEmail } from './EmailVerification';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../store/userStore';

const VerificationPage = () => {

    const navigate = useNavigate();
    const [emailVerified, setEmailVerified] = useState(false);
    const {setIsLoggedin} = useUserStore();
    useEffect(() => {

        if(emailVerified) {
            navigate('/')
            return () => {}
        }
        const fetchData = async () => {
            const res = await axios.get('/user/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })


            const { user } = res.data;
            const status = res.status;


            if (status === 200) {
                if (user.emailVerified) {
                    
                    setTimeout(() => {
                        
                        setEmailVerified(true)
                    
                    }, 5000)
                }
            }


        }

        fetchData().catch(error => {
            console.log(error)
            localStorage.removeItem('token')
            setIsLoggedin(false)
            navigate('/signin')
        });

    }, [emailVerified])
    const handleResendMail = async () => {


        verifyEmail('/user/resend-verify', {}, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data);
            } else if (res.status === 500) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err)
        })

    }
    return (
        <div className='flex min-h-screen items-center justify-center'>
            {!emailVerified && <div className='flex text-center flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold'> Please Verify Your Email </h1>
                <RiMailCheckFill size={200} className='text-gray-500' />
                <p>Please Verify Your Email address we have sent you an email.</p>
                <Button label={'Resend'} onClick={handleResendMail} />
            </div>}
            {
                emailVerified && <h1 className='min-h-screen flex items-center justify-center text-center text-4xl font-bold'>
                    Successfully verified your email. Redirecting to the home page.

                </h1>
            }
        </div>
    )
}

export default VerificationPage
