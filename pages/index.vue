<template>
    
<ion-page>
    <ion-content>
        <header class="flex flex-col items-center dark:bg-black">
            <div class="w-[100px] h-[100px] mb-10 relative top-5 border rounded-full border-white">
                <img src="~~/assets/images/logo-white.png" alt="">
            </div>
            <p class="w-5/6 text-center uppercase text-lg font-semibold text-white">
                Ionic & Nuxt 3 mobile application
            </p>
        </header>

        <h1 class="text-center uppercase mb-10 dark:text-[#1c57bb]">bienvenue !</h1>

        <div class="w-4/6 mx-auto flex justify-around">
            <button class="p-3 rounded-3xl font-light bg-[#1c57bb] dark:bg-black text-white uppercase" @click="router.push('/login')" v-if="auth.isLoggedIn">mon profile</button>
            <div class="w-full flex justify-around" v-else>
                <button class="p-3 rounded-3xl font-light bg-[#1c57bb] dark:bg-black text-white uppercase" @click="router.push('/login')">Connexion</button>
                <button class="p-3 rounded-3xl font-light border uppercase hover:bg-[#1c57bb] dark:hover:bg-black hover:text-white" :style="buttonStyle" @click=" router.push('/register')">inscription</button>
            </div>
        </div>
        <div class="w-4/6 mx-auto flex justify-center mt-5">
            <button @click="changeColor">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="colorMode.preference =='dark'">
                    <path d="M12.0557 3.59974C12.2752 3.2813 12.2913 2.86484 12.0972 2.53033C11.9031 2.19582 11.5335 2.00324 11.1481 2.03579C6.02351 2.46868 2 6.76392 2 12C2 17.5228 6.47715 22 12 22C17.236 22 21.5313 17.9764 21.9642 12.8518C21.9967 12.4664 21.8041 12.0968 21.4696 11.9027C21.1351 11.7086 20.7187 11.7248 20.4002 11.9443C19.4341 12.6102 18.2641 13 17 13C13.6863 13 11 10.3137 11 6.99996C11 5.73589 11.3898 4.56587 12.0557 3.59974Z" fill="#000000"/>
                </svg>

                <svg fill="#000000" width="30px" height="30px" viewBox="-5.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" v-else>
                    <title>sun</title>
                    <path d="M10.68 21.64c-3.12 0-5.64-2.52-5.64-5.64s2.52-5.64 5.64-5.64 5.64 2.52 5.64 5.64-2.52 5.64-5.64 5.64zM10.68 12.040c-2.2 0-3.96 1.76-3.96 3.96s1.76 3.96 3.96 3.96 3.96-1.76 3.96-3.96-1.76-3.96-3.96-3.96zM10.68 9.040c-0.48 0-0.84-0.36-0.84-0.84v-2.040c0-0.48 0.36-0.84 0.84-0.84s0.84 0.36 0.84 0.84v2.040c0 0.48-0.36 0.84-0.84 0.84zM16.2 11.32c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l1.44-1.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-1.44 1.44c-0.2 0.16-0.4 0.24-0.6 0.24zM18.48 16.84c-0.48 0-0.84-0.36-0.84-0.84s0.36-0.84 0.84-0.84h2.040c0.48 0 0.84 0.36 0.84 0.84s-0.36 0.84-0.84 0.84h-2.040zM17.64 23.8c-0.2 0-0.44-0.080-0.6-0.24l-1.44-1.48c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l1.44 1.44c0.32 0.32 0.32 0.84 0 1.2-0.16 0.2-0.4 0.28-0.6 0.28zM10.68 26.68c-0.48 0-0.84-0.36-0.84-0.84v-2.040c0-0.48 0.36-0.84 0.84-0.84s0.84 0.36 0.84 0.84v2.040c0 0.48-0.36 0.84-0.84 0.84zM3.72 23.8c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l1.44-1.44c0.32-0.32 0.84-0.32 1.2 0s0.32 0.84 0 1.2l-1.44 1.44c-0.16 0.16-0.4 0.24-0.6 0.24zM0.84 16.84c-0.48 0-0.84-0.36-0.84-0.84s0.36-0.84 0.84-0.84h2.040c0.48 0 0.84 0.36 0.84 0.84s-0.36 0.84-0.84 0.84h-2.040zM5.16 11.32c-0.2 0-0.44-0.080-0.6-0.24l-1.44-1.44c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l1.44 1.44c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.36 0.24-0.6 0.24z"></path>
                </svg>
            </button>
        </div>
     
    </ion-content>
</ion-page>
</template>
<script setup>
import {useAuthStore} from '~~/store/auth'
import { Storage } from '@ionic/storage';
import { App } from '@capacitor/app';

const colorMode = useColorMode();

const changeColor = ()=>{
    colorMode.preference = colorMode.preference==="dark"?"light":"dark";
}

const buttonStyle = computed(() => {
    return colorMode.preference==="dark"?"border:2px solid #000":"border:2px solid #1c57bb";
})

const store = new Storage();
await store.create();

const supabase = useSupabaseClient();
const router = useIonRouter();

const auth = useAuthStore();

const { data: { user } } = await supabase.auth.getUser();

onMounted(async () => {
    auth.isLoggedIn =  await store.get('isLoggedIn');
})

useBackButton(-1, () => {
    if (window.location.pathname ==="/") {
        App.exitApp();
    }
});

</script>

<style>
header {
    position: relative;
    height: 300px;
    background-color: #1c57bb;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 70%,
      0 calc(100% - 5vw)
    );
    /* change the calc height to a percentage height to get alternate responsive behavior*/
  }
</style>