<template>
    <ion-page>
        <ion-content>
            <div class="w-5/6 mx-auto pt-5 text-2xl">
                <ion-icon :icon="ioniconsArrowBack" @click="router.push('/')" class="cursor-pointer"></ion-icon>
            </div>

            <div class="w-5/6 h-auto flex flex-col items-center mx-auto">
                <h1 class="text-center">Création de compte</h1>
                <FormError :text="errors"></FormError>

                <div class="w-full mb-5">
                    <input type="email" v-model="form.email" placeholder="Adresse email" class="bg-[#e3edfd] w-full p-3 pl-5 mb-3 rounded-3xl focus:outline-[#1c57bb]">
                </div>
                <div class="w-full mb-5">
                    <input type="password" v-model="form.password" placeholder="Mot de passe" class="bg-[#e3edfd] w-full p-3 pl-5 mb-3 rounded-3xl focus:outline-[#1c57bb]">
                </div>
                <button class="w-5/6 p-2 bg-[#00dc82]  text-white text-lg mb-8 rounded-md uppercase font-light" :class="{'opacity-30':isLoading}" @click.prevent="submit">
                    <span v-if="isLoading">Création de compte...</span>
                    <span v-else>Créez votre compte</span>
                </button>
                <p>
                    Vous avez déjà un compte ? <span class="text-[#1c57bb] cursor-pointer" @click.prevent="router.push('/login')">Connectez-vous</span>
                </p>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup>
import { Storage } from '@ionic/storage';
import { useAuthStore } from "~~/store/auth";

definePageMeta({
    middleware:'guest'
})

const store = new Storage();
await store.create();

const router = useIonRouter();

const form =reactive({
    email:"",
    password:""
});

const errors = ref(null);

const isLoading = ref(false);
const isDesabled = ref(false);

const resetError = () => {
  errors.value = null;
};


const auth = useAuthStore();
const supabase = useSupabaseClient()
const submit = async ()=>{
    if (!isDesabled.value) {
        resetError();
        isLoading.value=true;
        isDesabled.value = true;
        const {data, error} = await supabase.auth.signUp(form);
        if (data.user) {
            auth.isLoggedIn = true;
            await store.set('isLoggedIn', true);
            router.push('/profile')
        }
       
        const {response} = useTranslateResponse(error);
        errors.value = response.value;

        isLoading.value=false; 
        isDesabled.value = false;
    }

}

</script>
