<template>
    <div class="page">
        <HOMEPAGE />
    </div>
</template>

<script>
import HOMEPAGE from "@components/organisms/index.vue"

export default {
    components: { HOMEPAGE },
}
</script>

<style lang="scss" scoped>
@import "@assets/styles/main.scss";

.page {
    widows: 100vw;
    height: 100vh;

    background-color: $color-white-100;
}
</style>
