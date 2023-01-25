

export default function useAuth(){
    const {$axios} = useNuxtApp();

    const register = async (user)=>{
        //await $axios.get('/sanctum/csrf-cookie');
        return await $axios.post('/api/register', user);
    }
    const login = async (credentails)=>{
        //await $axios.get('/sanctum/csrf-cookie');
        return await $axios.post('/api/login', credentails);
    }


    return {
        register,
        login
    }
}