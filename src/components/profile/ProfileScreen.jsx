import React, { useRef, useState } from 'react'
import { MdCameraEnhance } from "react-icons/md";
import Button from '../login/Button';
import axios from 'axios';

const ProfileScreen = () => {


    const fileInputRef = useRef(null);
    const [file, setFile] = useState();
    const [imageUrl, setImageUrl] = useState();
    const formData = new FormData();

    function handleButtonClick(e) {
        fileInputRef.current.click();

    }

    function handleFileInputClick(e) {
        console.log(e.target)
        setFile(e.target.files[0]);


    }
    async function handleFileUpload(e) {
        formData.append('profilePic', file)

        try {
            const response = await axios.post('/user/upload/picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            
            console.log("upload response", response.data);

        }catch(error){
            console.log(error);
        }

    }
    return (
        <div className='flex flex-col max-w-screen-sm mx-auto gap-y-8 min-h-screen justify-center '>
            <div>
                <h1 className='text-2xl font-bold py-2'>Welcome Lets create your profile</h1>
                <p className='text-neutral-500'>Let others get to know you better! You can do this later.</p>
            </div>

            <div>
                <p className='font-bold'>Add an Avatar</p>
                <div className='flex flex-row gap-4 items-center py-2'>
                    <div className='w-[150px] h-[150px] rounded-[100%] border-dashed border-2  border-gray-400 flex items-center justify-center'>
                        <span>
                            <MdCameraEnhance className='text-gray-400' size={20} />
                        </span>
                    </div>
                    <input ref={fileInputRef} type="file" className='hidden  ' name="profilePic" id="profilePic" placeholder='Choose Image' accept="image/png, image/jpeg" onClick={handleFileInputClick} />

                    <div>
                        <button className='p-1 my-2 border border-gray-300 rounded-md text-gray-600 font-bold text-sm' onClick={handleButtonClick}>Choose Image</button>
                        <p className='cursor-not-allowed pointer-events-none text-gray-400 text-xs'> {'> '} or choose on of our defaults. </p>
                    </div>
                </div>
            </div>
            <div>
                <p className='font-bold'>Add Your Location</p>
                <input type="text" name="location" id="location" className=' !border-b !border-b-neutral-500 outline-none pb-2 text-gray-600 font-bold text-sm' placeholder='Enter your location' />
            </div>
            <div>
                <Button label={"Next"} onClick={handleFileUpload} />
            </div>
        </div>
    )
}

export default ProfileScreen
