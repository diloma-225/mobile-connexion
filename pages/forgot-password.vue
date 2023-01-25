<template>
    <ion-page>
        <ion-content>
            <div class="w-full mb-2 p-5">
                <ion-buttons  class="flex justify-between px-3">
                    <ion-icon :icon="ioniconsArrowBack" @click="router.push('/')" class="cursor-pointer text-2xl text-black"></ion-icon>
                </ion-buttons>
            </div>
            <div class="w-5/6 mx-auto flex flex-col items-center">
                <div class="lg:w-3/6 md:w-5/6 mb-5 mt-10">
                    <h1 class="ml-3 font-bold mb-5">Mot de passe oublié ?</h1>
                    <span class="ml-3 block font-light mb-3">entrez votre email ci-dessous pour réinitialiser votre mot de passe</span>
                    <input type="email" v-model="email" placeholder="Adresse email" class="bg-[#e3edfd] w-full pl-5 p-3 rounded-3xl focus:outline-[#1c57bb]">
                    <FormError :text="errors"></FormError>
                    <SuccessForm v-if="success" :text="success"></SuccessForm>
                </div>
                <button class="w-3/6 p-2 bg-[#00dc82] text-white text-lg mb-8 rounded-md uppercase font-light" :class="{'opacity-50':isLoading}" @click="submit">Envoyer</button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup>

definePageMeta({
    middleware:'guest',
})

const supabase = useSupabaseAuthClient();

const router = useIonRouter();

const isLoading = ref(false);
const email = ref("");
const errors = ref(null);
const success = ref("");
const submit= async ()=>{
    isLoading.value = true;

    let { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
        redirectTo: 'http://localhost:3000/update-password'
    });

    if (!error) {
        success.value="email envoyé !";
    }
    const {response} = useTranslateResponse(error);
    errors.value = response.value;

    isLoading.value = false;
}
</script>