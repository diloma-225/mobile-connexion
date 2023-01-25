<template>
    <span class="text-red-500 text-sm ml-3 my-5">{{text}}</span>
</template>
<script>
export default {
    props:{
        text:{
            type:String
        }
    }
}
</script>