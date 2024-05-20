import { useState } from "react"
import TextLogin from "./TextLogin";
import { Link } from "react-router-dom";
import { signInUsers } from "../service/user";
import { useNavigate } from 'react-router-dom';

const AddData = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        try{
          if(!email){// se quando for escrever, sair e não escrever nada, aparece esse alerta
            alert("Por favor adicione um email")
            return
          }
          if(!password){// se quando for escrever, sair e não escrever nada, aparece esse alerta
            alert("Por favor adicione uma senha")
            return
          }

          const result=await signInUsers({email,password});
    
            if(result?.status==403){
                alert('Logado com sucesso!');
                navigate('/UserScreen')
            } else {
              alert('Erro ao realizar login.');
              navigate('/UserScreen')
            }

            

        }
        catch(error){
          console.log(error)
        }
        
        
      }
    
  return (
    <div>
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
    </div>
  )
}

export default AddData
