import { Cloudinary } from "@cloudinary/url-gen/index";

const cloudinary = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    },
    url: {
      apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
      apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    },
  });

export default Cloudinary;