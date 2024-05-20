import React, { useEffect, useState } from "react"
import './UserScreenCss.css'
import { getUser } from "../../service/user"
const UserScreen:React.FC = () => {
    const [profileImg,setProfileImg]=useState<string| ArrayBuffer | null>(null)
    const [user,setUser]=useState<{email:string;name:string} | null>(null)


    useEffect(()=>{
        const fetchUserData=async()=>{
            try{
                const userData=await getUser();
                setUser(userData);
            }
            catch(error){
                console.log('Error fetching data')
            }
        };

        fetchUserData();
    },[])

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
    <div className="">
        <div className="user-screen" style={{padding:'0px', paddingTop:'15px'}}>
            
                <div className="profile-container">
                    <img src={profileImg || 'default-profile.png'} alt="" className="profile-image" 
                    onClick={handleImgClick} />
                    <input type="file" id="fileInput" accept="image/*" onChange={handleImgChange}/>                
                </div>
        </div>

        <div style={{marginTop:'50px'}}>
            <div className="form-control">
                <label htmlFor="">Name</label>
                <div className="userProps">{user?.name} </div>
            </div>

            <div className="form-control" style={{marginTop:'50px'}}>
            <label htmlFor="">Email</label>
            <div className="userProps">{user?.email}</div>
        </div>

        </div>
    </div>
  )
}

export default UserScreen
