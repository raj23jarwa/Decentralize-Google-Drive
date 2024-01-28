import React from 'react'
import { useState } from 'react'
import axios from "axios"
import './FileUpload.css'

const fileUpload = ({contract,account,provider}) => {
  const [file,setFile] =useState(null);
  const [fileName,setFileName]=useState("No image selected");
  const handleSubmit =async(e)=>{
    e.preventDefault();
    if(file){
      try {
        const formData =new FormData();
        formData.append("file",file);
        const resFile= await axios({
          method:"post",
          url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
          data:formData,
          headers:{
            pinata_api_key:`60cf79bcce329b0ecb63`,
            pinata_secret_api_key:`050291bd3d539a2bb9c1207207bc7e5162fac1ba5f6497bf99b9a82cf7d00b73`,
            "Content-Type":"multipart/form-data"
          }
        })

        const ImgHash =`ipfs://${resFile.data.IpfsHash}`;
         contract.add(account,ImgHash);
        alert("Image successfully uploaded");
        setFileName("No image selected")
        setFile(null);  
      } catch (error) {
        console.log("unable to upload image to pinata")
        
      }
    }
  } 

  const retrieveFile=(e)=>{
    const data=e.target.files[0];
    console.log(data);
    const reader=new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend=()=>{
      setFile(e.target.files[0]);
    }
    setFile(e.target.files[0].name);
    e.preventDefault();

  }
  return (
    <div className='top'>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor='file-upload' className='choose'>
          Choose Image
        </label>
        <input disabled={!account} type='file' id='file-upload' name='data' onChange={retrieveFile} />
        <span className='textArea'>Image:{fileName}</span>
        <button type='submit' className='upload' disabled={!file}>Upload File</button>
       </form>
    </div>
  )
}

export default fileUpload