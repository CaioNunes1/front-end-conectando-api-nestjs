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
        return response.data;
    } catch (err) {
        return err;
    }
}

export async function signInUsers({email,password}: SignInData) {
    try {
        const response = await api.post('auth/signin',{email,password})
        localStorage.setItem('token',response.data.access_token);
        return response.data;
    } catch (err) {
        return err;
    }
}

export async function getUser(email:string){
    try{

        const response=await api.get('users/search',{
            params:{
                email,
            },
        });
        return response.data;
    }
    catch(error){
        console.log("Error fetching user data",error)
        throw error;
    }
}