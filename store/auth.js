import { defineStore} from "pinia";
import { Storage } from '@ionic/storage';

export  const useAuthStore = defineStore("auth",  ()=>{


        const isLoggedIn = ref(false);
        const token = ref(null);
        const user = ref(null);


        return {
            isLoggedIn,
            token,
            user
        }
    }
)