import api from "./api";

interface SignUpData
{
email:string,
name:string,
password:string
}

interface SignInData
{
email:string,
password:string
}

export async function signUpUsers({email,name,password}: SignUpData) {
    try {
        const response = await api.post('auth/signup',{email,name,password})
        const token=response.data;
        localStorage.setItem('token',token)
        return token
    } catch (err) {
        return err;
    }
}

export async function signInUsers({email,password}: SignInData) {
    try {
        const response = await api.post('auth/signup',{email,password})
        return response.data;
    } catch (err) {
        return err;
    }
}

export async function getUser(token:string){
    try{
        
        if(!token) throw new Error('No found token')

        const response=await api.get('users/me',{
            headers:{
                Authorization:`Bearer${token}`
            }
        });
        return response.data;
    }
    catch(error){
        console.log("Error fetching user data",error)
        throw error;
    }
}