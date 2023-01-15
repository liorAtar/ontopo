<template>
  <div class="carousel">
    <div class="carousel-inner">
      <button 
        class="move-btn" 
        @click="lang === 'he' ? updateCurrContent('right') : updateCurrContent('left')">
          <i class="fas fa-chevron-left"></i>
      </button>
      <carousel-item 
        v-for="(content, idx) in carousel.carousel" 
        :content="content" 
        :key="content._id"
        :currContent="currContent" 
        :idx="idx" 
        :transitionName="transitionName" 
        :lang="lang" 
        />
      <button 
        class="move-btn move-right"
        @click="lang === 'he' ? updateCurrContent('left') : updateCurrContent('right')">
          <i class="fas fa-chevron-right"></i>
      </button>
      <div class="pages" :class="lang === 'he' ? 'd-rtl' : ''">
        <button 
          v-for="(content, idx) in carousel.carousel" 
          :key="idx" 
          class="page-btn"
          :class="currContent === idx ? 'selected-page' : ''" @click="updateCurrContent('page', idx)">
            <i class="fa-solid fa-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselItem from "./CarouselItem.vue"

export default {
  props: {
    carousel: Object,
    lang: String,
    currContent: Number,
    transitionName: String
  },
  methods: {
    updateCurrContent(move, idx = 0) {
      this.$emit('updateCurrContent', { move, idx })
    },
  },
  components: {
    CarouselItem
  }
}
</script>
