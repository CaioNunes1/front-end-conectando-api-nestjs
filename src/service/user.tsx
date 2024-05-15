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
        const response = await api.post('auth/signup',{email,password})
        return response.data;
    } catch (err) {
        return err;
    }
}