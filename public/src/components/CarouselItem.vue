<template>
    <transition :name="transitionName">
        <div class="carousel-item" v-show="currContent === idx">
            <img class="carousel-img" :class="lang === 'en' ? 'd-rtl' : ''" :src="content.img" />
            <p class="title" :class="lang === 'en' ? 'd-rtl' : ''">{{content.title[lang]}}</p>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        content: Object,
        currContent: Number,
        idx: Number,
        transitionName: String,
        lang: String
    },
}
</script>