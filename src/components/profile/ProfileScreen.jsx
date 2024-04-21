import React, { useEffect, useRef, useState } from 'react'
import { MdCameraEnhance } from "react-icons/md";
import Button from '../login/Button';
import axios from 'axios';
import getImgUrl from '../../helpers/getImgUrl';
import { useUserStore } from '../../store/userStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Logout from './Logout';

const ProfileScreen = () => {


    const fileInputRef = useRef(null);
    const [file, setFile] = useState();
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const formData = new FormData();
    const [editMode, setEditMode] = useState(true)

    function handleButtonClick(e) {
        fileInputRef.current.click();

    }

    function handleFileInputClick(e) {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));



    }
    const {isLoggedin, setIsLoggedin} = useUserStore();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const firstSetup = searchParams.get('firstSetup') === 'true' ? true : false;
  


    useEffect( () => {


        const fetchData = async () => {
            const res = await axios.get('/user/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }) 

            
            const {user} = res.data;
            const status = res.status;
            
            
            if(status === 200){
                console.log(res.status);
                const imageUrl = getImgUrl(user.profilePic)
                console.log(imageUrl)
                setImageUrl(imageUrl)
                setLocation(user.location);
                localStorage.setItem('profilePic', imageUrl)

            }
        console.log(user)
        
        }

        fetchData().catch(error =>  {
            console.log(error)
            localStorage.removeItem('token')
            setIsLoggedin(false)
            navigate('/signin')
        });

    }, [])

    console.log(location)
    async function handleFileUpload(e) {
        if(!file || !location) return;
        console.log(file)
        formData.append('profilePic', file)
        formData.append('location', location)

        try {
            const response = await axios.post('/user/upload/picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            })
            
            console.log("upload response", response.data);

            const imageUrl = getImgUrl(response.data.public_id )
            setImageUrl(imageUrl)
            
            localStorage.setItem('profilePic', imageUrl)

            setTimeout(() => {
                navigate('/verification_page')
            }, 5000)


        }catch(error){
            console.log(error);
        }

    }

    console.log(imageUrl)


    return (
        <div className='flex flex-col max-w-screen-sm mx-auto gap-y-8 min-h-screen justify-center '>
            <div>
                <h1 className='text-2xl font-bold py-2 flex justify-between items-center'>Welcome Lets create your profile</h1>
                <p className='text-neutral-500'>Let others get to know you better! You can do this later.</p>
            </div>

            <div>
               {editMode && <p className='font-bold'>Add an Avatar</p>}
                <div className='flex flex-row gap-4 items-center py-2'>
                    <div className='w-[150px] h-[150px] rounded-[100%] border-dashed border-2  border-gray-400 flex items-center justify-center'>
                  {
                    imageUrl ? <img src={imageUrl} alt="profile" className='w-[150px] h-[150px] rounded-[100%]' /> : <MdCameraEnhance className='text-rose-500 text-4xl' />
                  }
                    </div>
                    <input ref={fileInputRef} type="file" className='hidden  ' name="profilePic" id="profilePic" placeholder='Choose Image' accept="image/png, image/jpeg" onChange={handleFileInputClick}  />

                    {editMode && <div>
                        <button className='p-1 my-2 border border-gray-300 rounded-md text-gray-600 font-bold text-sm' onClick={handleButtonClick}>Choose Image</button>
                        <p className='cursor-not-allowed pointer-events-none text-gray-400 text-xs'> {'> '} or choose on of our defaults. </p>
                    </div>}
                </div>
            </div>
            <div>
                <p className='font-bold'>Add Your Location</p>
                <input type="text" name="location" id="location" className=' !border-b !border-b-neutral-500 outline-none pb-2 text-gray-600 font-bold text-sm' placeholder='Enter your location' value={location} onChange={(e) => setLocation(e.target.value)} disabled={!editMode} />
            </div>
            <div>
                {firstSetup && <Button label={"Next"} onClick={handleFileUpload} />}
            </div>
        </div>
    )
}

export default ProfileScreen
