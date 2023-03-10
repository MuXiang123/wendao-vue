<template>
    <div class="container">
        <centertVue></centertVue>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import centertVue from './center.vue'
import leftVue from './left.vue'

</script>
<style>
.container{
    background-color: rgba(250, 250, 250, 1);
}
</style>