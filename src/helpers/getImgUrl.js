import cloudinary from '../cloudinary'

function getImgUrl(public_id){
    const link = cloudinary.image(public_id).toURL();
    console.log(link); 
    return link
}

export default getImgUrl;