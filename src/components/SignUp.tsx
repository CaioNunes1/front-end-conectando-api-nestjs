import TextLogin from "./TextLogin";
import { useState } from "react";
import { signUpUsers } from "../service/user";
import { useNavigate } from 'react-router-dom';
const SignUp = () => {

    const [email,SetEmail]=useState('')
    const [password,setPassword]=useState('');
    const [password2,setPassword2]=useState('');
    const [name,SetName]=useState('');
    const [isSignedUp,setisSignedUp]=useState(false);
    const navigate = useNavigate(); // Obtém a função de navegação

    const handleSignUp= async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();//evitar o reload da página

        try{
            if(!email || !password || !name){
                alert("Preencha todos os espaços")
                return
            }
            if(password!=password2){
                alert("Senha não está correta")
                return
            }
    
            const result=await signUpUsers({email,password,name});
    
            if(result){
                alert('Cadastro realizado com sucesso!');
                setisSignedUp(true);
            } else {
              alert('Erro ao realizar cadastro.');
              
            }
            
        }
        catch(error){
            console.log(error);
        }
        if(isSignedUp){
            return navigate('/')        
        }
        
    }
  return (
    <form onSubmit={handleSignUp}>
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
  )
}

export default SignUp
