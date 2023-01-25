<template>
    <ClientOnly>
    <span v-if="isLoading">Chargement...</span>
    <div v-else>
        <div class="w-full mb-5">
            <label class="mb-2 block ml-3">Nom d'utlisateur</label>
            <input type="text" v-model="profile.username" class="bg-[#e3edfd] w-full p-3 pl-5 mb-3 rounded-3xl  focus:outline-none" readonly>
        </div>
        <div class="w-full mb-5">
            <label class="mb-2 block ml-3">Nom et Prénoms</label>
            <input type="text" v-model="profile.full_name" class="bg-[#e3edfd] w-full p-3 pl-5 mb-3 rounded-3xl  focus:outline-none" readonly>
        </div>
        <div class="w-full mb-5">
            <label class="mb-2 block ml-3">Adresse email</label>
            <input type="text" :value="user.email"  class="bg-[#e3edfd] w-full p-3 pl-5 mb-3 rounded-3xl  focus:outline-none" readonly>
        </div>
    </div>
</ClientOnly>
</template>
<script setup>

const isLoading = ref(false);
const profile = ref(null);


const supabase = useSupabaseClient();


const { data: { user } } = await supabase.auth.getUser();
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

</script>