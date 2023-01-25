<template>
    <ion-page>
        <ion-content>
            <div class="w-5/6 mx-auto flex flex-col items-center">
                <div class="w-3/6 mb-5 mt-10">
                    <h1 class="ml-3 font-bold mb-5">Réinitialiser le mot de passe</h1>

                    <input type="password" v-model="password" placeholder="Nouveau mot de passe" class="bg-[#e3edfd] w-full pl-5 p-3 rounded-3xl focus:outline-[#1c57bb] mb-5">
                    <input type="password" v-model="confirm_password" placeholder="Confirmer mot de passe" class="bg-[#e3edfd] w-full pl-5 p-3 rounded-3xl focus:outline-[#1c57bb]">
                    <FormError :text="errors"></FormError>
                    <!-- <SuccessForm v-if="success" :text="success"></SuccessForm> -->
                </div>
                <button class="w-3/6 p-2 bg-[#00dc82] text-white text-lg mb-8 rounded-md uppercase font-light" :class="{'opacity-50':isLoading}" @click="updatePassword">Envoyer</button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup>
import {useAuthStore} from '~~/store/auth'
import { Storage } from '@ionic/storage';

const store = new Storage();
await store.create();

const supabase = useSupabaseAuthClient();

const password = ref("");
const confirm_password = ref("");
const errors = ref("");
const isLoading = ref(false);

const router = useIonRouter();
const auth = useAuthStore();

const updatePassword = async ()=>{

    isLoading.value = true;
    if (password.value==confirm_password.value) {

        const { data, error } = await supabase.auth.updateUser({
        password: password.value
        });
        if (!error) {
            auth.isLoggedIn = true;
            await store.set('isLoggedIn', true);
            router.push('/profile');
        }

        const {response} = useTranslateResponse(error);
        errors.value = response.value;
    }else{
        errors.value = "Les mots de passe ne correspondent pas";
    }

    isLoading.value = false;
}

</script>