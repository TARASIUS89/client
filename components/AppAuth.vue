<template>
    <!--компонент регистрации / авторизации-->
    <UiSignin v-if="index.authToggle" />
    <UiLogin v-else />
</template>

<script setup>
const index = useIndexStore();
</script>