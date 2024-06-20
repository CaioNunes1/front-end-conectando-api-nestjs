import React, { useEffect, useState } from "react"
import './UserScreenCss.css'
import { getUser } from "../../service/user"
import { useNavigate } from "react-router-dom"
import { Snackbar, Button, Alert } from '@mui/material';
const UserScreen:React.FC = () => {
    const [profileImg,setProfileImg]=useState<string| ArrayBuffer | null>(null)
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
    const [user,setUser]=useState<{email:string;firstname:string} | null>(null)
    const email=localStorage.getItem('email');
    const navigate = useNavigate(); // Obtém a função de navegação
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        const fetchUserData=async ()=>{
            if(email){
                try{
                    const userData=await getUser(email);
                    if(userData.length>0){
                        setUser(userData[0])//pega o primeiro item porque a função get user retorna uma lista
                        //de usuários
                    }
                    
                }
                catch(error){
                    console.log("Ocorreu um erro",error)
                }
            }
            
        }

        fetchUserData();

    },[]);

    const handleClose=(event,reason)=>{
        if(reason=='clickaway'){
            return
        }
        setOpen(event);

    }


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

    useEffect(()=>{
        if(profileImg && typeof profileImg!== 'string'){
            const dataURL=convertArrayBufferToDataURL(profileImg);
            setImgSrc(dataURL);
        }
        else{
            setImgSrc(profileImg as string);
        }
    },[profileImg]);

    const convertArrayBufferToDataURL = (buffer: ArrayBuffer): string => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/jpeg;base64,' + window.btoa(binary);
      };

    const handleImgClick=()=>{
        document.getElementById('fileInput')?.click()
    }

    const hangleLogout=()=>{
        navigate('/')
    }

  return (
    <div className="body">
        <div className="topBar" >
        <form action="" onClick={hangleLogout}>
        <input type="submit" value='Logout' className='btnUserScreen btn-blockUserScreen'/>
        </form>   
            <div className="containerUserScreen">
                <div className="user-screen" style={{padding:'0px', paddingTop:'15px'}}>
                    
                        <div className="profile-container">
                        <input type="file" id="fileInput" accept="image/*" onChange={handleImgChange}/>                
                            <img src={imgSrc || 'default-profile.png'} alt="" className="profile-image" 
                            onClick={handleImgClick} />
                            
                        </div>
                </div>

                <div style={{marginTop:'50px'}}>
                    <div className="form-control">
                        <label htmlFor="">Name</label>
                        <div className="userProps">{user?.firstname} </div>
                    </div>

                    <div className="form-control" style={{marginTop:'50px'}}>
                    <label htmlFor="">Email</label>
                    <div className="userProps">{user?.email}</div>
                </div>

                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Você fez login com sucesso!
                </Alert>
            </Snackbar>
        </div>
    </div>
  )
}

export default UserScreen
