<template>
    <ion-page>
        <ion-content>
            <div class="w-full h-auto bg-[#1c57bb] dark:bg-black flex flex-col items-center py-5">
                <div class="w-full mb-2">
                    <ion-buttons  class="flex justify-between px-3">
                        <ion-icon :icon="ioniconsArrowBack" @click="router.push('/')" class="cursor-pointer text-2xl text-white"></ion-icon>
                        <button class="bg-gray-500 font-light p-3 rounded-md text-white uppercase" :class="{'opacity-50':isLoading}" @click="logout">déconnexion</button>
                    </ion-buttons>
                </div>
                <span class="text-white uppercase font-bold">mon Profile</span>
                <div class="w-[100px] h-[100px] mb-10 relative top-5 border rounded-full border-white">
                    <img src="~~/assets/images/logo-white.png" alt="">
                </div>
                <div>
                    <button class="capitalize p-3 text-white text-center rounded-md" :class="{'bg-white text-[#1c57bb]':isActif=='details'}" @click="details">détails</button>
                    <button class="capitalize p-3 text-center text-white rounded-md" :class="{'bg-white text-[#1c57bb]':isActif=='edit'}" @click="edit">éditer</button>
                </div>
            </div>
            
            
            <div  class="w-5/6 pl-10 py-5">
                <component :is='components[index]'></component>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup>
import editProfile from '~~/components/editProfile.vue'
import profileDetails from '~~/components/profileDetails.vue'
import {useAuthStore} from '~~/store/auth'
import { Storage } from '@ionic/storage';



definePageMeta({
    middleware:'auth'
})

const store = new Storage();
await store.create();

const index = ref(0); 
const isActif = ref('details'); 


const details = async ()=>{
    index.value=0;
    isActif.value = 'details';
};
const edit = async ()=>{
    index.value=1;
    isActif.value = 'edit';
};


const isLoading = ref(false);
const router = useIonRouter();

const supabase = useSupabaseAuthClient();
const {isLoggedIn} = useAuthStore();
const auth = useAuthStore();
const logout = async ()=>{
    isLoading.value = true;
   const {error} = await supabase.auth.signOut();
   isLoading.value = false;
   if (!error) {
        auth.isLoggedIn = false;
        await store.set('isLoggedIn', false);
        router.replace('/login');
   }

}


const components = [profileDetails, editProfile];

</script>
    
