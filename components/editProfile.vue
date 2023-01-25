<template>
<ClientOnly>
    <span v-if="isLoading">Chargement...</span>
    <div v-else>
        <div class="w-full mb-5">
            <label class="mb-2 block ml-3">Nom d'utlisateur</label>
            <input type="text" v-model="profile.username" class="bg-[#e3edfd] w-full p-3 pl-5 mb-3 rounded-3xl  focus:outline-none">
        </div>
        <div class="w-full mb-5">
            <label class="mb-2 block ml-3">Nom et Prénoms</label>
            <input type="text" v-model="profile.full_name" class="bg-[#e3edfd] w-full p-3 pl-5 mb-3 rounded-3xl  focus:outline-none">
        </div>
        <div class="my-5">
            <SuccessForm v-if="profileSuccess" :text="profileSuccess"></SuccessForm>
        </div>
        <button class=" p-2 bg-[#f98431] text-white text-lg mb-8 rounded-md font-light" :class="{'opacity-30':resetingProfile}" @click="updateProfile">
            <span v-if="resetingProfile">Modification en cours...</span>
            <span v-else>Mettre à jour</span>
        </button>

        <h1 class="mb-5">Changer adresse e-mail</h1>
        <div class="w-full mb-5">
            <label class="mb-2 block ml-3">Adresse email</label>
            <input type="text" v-model="user.email" class="bg-[#e3edfd] w-full p-3 pl-5 mb-3 rounded-3xl  focus:outline-none">
            <SuccessForm v-if="emailUpdateSuccess" :text="emailUpdateSuccess"></SuccessForm>
        </div>
        
    
        <button class=" p-2 bg-[#f98431] text-white text-lg mb-8 rounded-md font-light" :class="{'opacity-30':updatingEmail}" @click="updateEmail">
            <span v-if="updatingEmail">Modification en cours...</span>
            <span v-else>Mettre à jour</span>
        </button>
      


        <h1 class="mb-5">Changer le mot de passe</h1>
        <div class="w-full mb-5">
            
            <label class="mb-2 block ml-3">Nouveau mot de passe</label>
            <input type="password" v-model="password"  class="bg-[#e3edfd] w-full p-3 pl-5 mb-3 rounded-3xl  focus:outline-none">
            <FormError :text="errors"></FormError>
            <SuccessForm v-if="success" :text="success"></SuccessForm>
            
        </div>
        <button class=" p-2 bg-[#f98431] text-white text-lg mb-8 rounded-md font-light" :class="{'opacity-30':resetingPassword}" @click.prevent="updatePassword">
            <span v-if="resetingPassword">Modification en cours...</span>
            <span v-else>Mettre à jour</span>
        </button>
    </div>
</ClientOnly>
</template>
<script setup>

const isLoading = ref(false);
const resetingPassword = ref(false);
const resetingProfile = ref(false);
const updatingEmail = ref(false);

const supabase = useSupabaseClient();
const { data: { user } } = await supabase.auth.getUser();
const profile = ref(null);

const getuser = async ()=>{
    try {
        isLoading.value = true;
        const { data: { user } } = await supabase.auth.getUser();
        let { data, error, status } = await supabase
            .from('profiles')
            .select()
            .eq('id', user.id)
            .single();

        if (data) {
            profile.value = data;
        }
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }

}
onMounted(async () => {
    await getuser();
})

const errors = ref(null);
const success = ref(null);
const profileSuccess = ref(null);
const emailUpdateSuccess = ref(null);

const password = ref("");



const updatePassword = async ()=>{

    resetingPassword.value = true;

    const { data, error } = await supabase.auth.updateUser({
        password: password.value
    });

    if (!error) {
        success.value = "Votre mot de passe à été modifié";
    }

    const {response} = useTranslateResponse(error);
    errors.value = response.value;
    
    resetingPassword.value = false;
    password.value = "";
}
const updateEmail = async ()=>{
    updatingEmail.value = true;
    const { data, error } = await supabase.auth.updateUser({
        email: user.email
    });
    if (!error) {
        emailUpdateSuccess.value = "Un mail a été envoyer à "+user.email+", veuillez confirmer l'adresse mail";
    }
    updatingEmail.value = false;
}


const updateProfile = async ()=>{

    resetingProfile.value = true;
     const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
        .from('profiles')
        .update({ username: profile.value.username, full_name:profile.value.full_name })
        .eq("id", profile.value.id); 

     if (!error) {
        profileSuccess.value = "Votre profile à été mis à jour";
    } 

    const {response} = useTranslateResponse(error);
    errors.value = response.value; 
    
    resetingProfile.value = false;
}
</script>