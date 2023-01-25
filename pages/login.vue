<template>
    <ion-page>
        <ion-content>
            <div class="w-5/6 mx-auto pt-5 text-2xl">
                <ion-icon :icon="ioniconsArrowBack" @click="navigateTo('/')" class="cursor-pointer"></ion-icon>
            </div>

            <div class="w-5/6 h-auto flex flex-col items-center mx-auto">
                <h1 class="text-center mb-10">Connectez-vous à votre compte</h1>

                <FormError :text="errors"></FormError>

                <div class="w-full mb-5">
                    <input type="email" placeholder="Email" v-model="form.email" class="bg-[#e3edfd] w-full pl-5 p-3 rounded-3xl focus:outline-[#1c57bb]">
                </div>
                <div class="w-full mb-5">
                    <input type="password" placeholder="Mot de passe" v-model="form.password" class="bg-[#e3edfd] w-full pl-5 p-3 rounded-3xl focus:outline-[#1c57bb]">
                </div>
                <p class="w-full flex justify-end mb-5">
                    <span class="text-red-500 cursor-pointer" @click="router.push('/forgot-password')">Mot de passe oublié ?</span>
                </p>
                <button class="w-5/6 p-2 bg-[#00dc82] text-white text-lg mb-8 rounded-md uppercase font-light" :class="{'opacity-50':isLoading}" @click="submit">Se connecter</button>
                <p>
                    Vous n'avez pas de compte ? <span class="text-[#1c57bb] cursor-pointer" @click.prevent="router.push('/register')">Créez un compte</span>
                </p>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup>
import { Storage } from '@ionic/storage';
import { useAuthStore } from "~~/store/auth";

definePageMeta({
    middleware:'guest',
})

const store = new Storage();
await store.create();

const router = useIonRouter();


const form=reactive({
    email:'',
    password:''
});


const errors = ref(null);

const isDesabled = ref(false);

const resetError = () => {
    errors.value = null;
};
const resetForm = () => {
  form.email = "";
  form.password = "";
};


const isLoading = ref(false);

const auth = useAuthStore();
const supabase = useSupabaseClient();
const submit = async ()=>{
    if (!isDesabled.value) {
        resetError();
        isLoading.value = true;
        isDesabled.value = true;
      
        const {data, error}  = await supabase.auth.signInWithPassword(form);

        if (data.user) {
            resetForm();
            auth.isLoggedIn = true;
            await store.set('isLoggedIn', true);
            router.push('/profile')
        }

        const {response} = useTranslateResponse(error);
        errors.value = response.value;
        isLoading.value = false;
        isDesabled.value = false;
    } 

}

</script>
