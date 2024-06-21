import TextLogin from "./TextLogin";
import { SyntheticEvent, useState } from "react";
import { signUpUsers } from "../service/user";
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
const SignUp = () => {

    const [email,SetEmail]=useState('')
    const [password,setPassword]=useState('');
    const [password2,setPassword2]=useState('');
    const [name,SetName]=useState('');
    const navigate = useNavigate(); // Obtém a função de navegação

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [isTrue,setIsTrue]=useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    

    const handleSignUp= async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();//evitar o reload da página

        try{
            if(!email || !password || !name){
                handleAlertLoginFail('Algum dos campos não estão preechidos')
                setIsTrue(true)
                return
            }
            if(password!=password2){
                handleAlertLoginFail("Senha não está correta")
                return
            }
    
            const result=await signUpUsers({email,password,name});
    
            if(result){
                //alert('Cadastro realizado com sucesso!');
                handleAlertLogin()
                setIsTrue(true);
                
            } else {
                handleAlertLoginFail('Erro ao realizar cadastro.');
              
            }
            
        }
        catch(error){
            console.log(error);
        }
        if(isTrue){
            return navigate('/')        
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
                <form onSubmit={handleSignUp}>
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
                <div className="form">
                    <TextLogin titleLabel="Faça seu cadastro"/>
                    <div className="form-control">
                        <label htmlFor="">Name</label>
                        <input type="text" value={name} placeholder="Digite o seu nome" onChange={(e)=>SetName(e.target.value)}/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="">Email</label>
                        <input type="text" value={email} placeholder="Digite o seu email" onChange={(e)=>SetEmail(e.target.value)}/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="">Password</label>
                        <input type="password" value={password} placeholder="Digite a sua senha" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="">Password</label>
                        <input type="password" value={password2} placeholder="Digite a sua senha novamente" onChange={(e)=>setPassword2(e.target.value)}/>
                    </div>

                    <input type="submit" value='Sign up' className='btn btn-block'/>
                    {/*como o input é so tipo submit quando apertar o botão ele vai acionar o onSubmit */}
                </div>
                </form>
            </div>
        </div>
  )
}

export default SignUp
