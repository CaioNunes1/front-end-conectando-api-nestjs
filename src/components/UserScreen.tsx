import React, { useState } from "react"
import '../UserScreenCss.css'
const UserScreen:React.FC = () => {
    const [profileImg,setProfileImg]=useState<string| ArrayBuffer | null>(null)

    const handleImgChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files && event.target.files[0]){
            const file= event.target.files[0];
            const reader = new FileReader();

            reader.onloadend=()=>{
                setProfileImg(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }

    const handleImgClick=()=>{
        document.getElementById('fileInput')?.click()
    }

  return (
    <div className="user-screen">
        <div className="profile-container">
            <img src={profileImg || 'default-profile.png'} alt="Profile" className="profile-image" 
            onClick={handleImgClick}/>
            <input type="file" id="fileInput" style={{display:'none'}} accept="image/*" onChange={{handleImgChange}}/>
        </div>
    </div>
  )
}

export default UserScreen
