import { useState } from "react"
import TextLogin from "./TextLogin";
import { Link } from "react-router-dom";
import { signInUsers } from "../service/user";
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { SyntheticEvent } from "react";

const AddData = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [isTrue,setIsTrue]=useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    //const token=localStorage.getItem('token')

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        try{
          if(!email){// se quando for escrever, sair e não escrever nada, aparece esse alerta
            handleAlertLoginFail("Por favor adicione um email")
            return
          }
          if(!password){// se quando for escrever, sair e não escrever nada, aparece esse alerta
            handleAlertLoginFail("Por favor adicione uma senha")
            return
          }

          const result=await signInUsers({email,password});

          localStorage.setItem('email',email)
          
            if(result?.access_token){
                //alert('Logado com sucesso!');
                handleAlertLogin();
                setIsTrue(true);
            }
            else if(result?.access_token ===403){
              //alert('Credenciais incorretas.');
              handleAlertLoginFail('Credenciais incorretas.')
              //navigate('/UserScreen')
            }
            else{
              //alert('Erro ao realizar login.');
              handleAlertLoginFail('Erro ao realizar login.');
            }

            

        }
        catch(error){
          console.log(error)
        }

        if(isTrue){
          navigate('/UserScreen')
        }
        
        
      }

  // ALERT QUANDO DA CERTO O LOGIN    
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleAlertLogin = () => {
    setOpenSuccess(true);
  };

  const handleAlertLoginFail = (message: string) => {
    setErrorMessage(message);
    setOpenError(true);
  };
    
  return (
    <div className="body">
        <div className="container">
            <TextLogin titleLabel="Faça seu Login"/>
              <form onSubmit={handleLogin}>
                
              <div className='form' >
                <div className='form-control'>
                  <label htmlFor="">Email</label>
                  <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                </div>

                <div className='form-control'>
                  <label htmlFor="">Password</label>
                  <input type="password" placeholder="***********" value={password} onChange={(e)=>setPassword(e.target.value)}  />
                </div>

                <input type="submit" value='Sign in' className='btn btn-block'/>
              </div>

              <div >
                <Link className='link-sign-up' to="/SignUp">Não tem conta? Cadastre-se Aqui</Link>
              </div>
              </form>
              <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Você fez login com sucesso!
                </Alert>
              </Snackbar>
              <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  {errorMessage}
                </Alert>
              </Snackbar>
            </div>
    </div>
  )
}

export default AddData
