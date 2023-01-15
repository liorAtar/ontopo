<template>
  <div class="carousel">
    <div class="carousel-inner">
      <button class="move-btn" @click="updateCurrContent('left')"><i class="fas fa-chevron-left"></i></button>
      <carousel-item v-for="(content, idx) in carousel.carousel" :content="content" :key="content._id"
        :currContent="currContent" :idx="idx" :transitionName="transitionName" :lang="lang" />
      <button class="move-btn move-right" @click="updateCurrContent('right')"><i
          class="fas fa-chevron-right"></i></button>
      <div class="pages">
        <button v-for="(content, idx) in carousel.carousel" :key="idx" class="page-btn"
          :class="currContent === idx ? 'selected-page' : ''" @click="updateCurrContent('page', idx)">
          <i class="fa-solid fa-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { carouselService } from "../services/carousel.service"
import CarouselItem from "./CarouselItem.vue"

export default {
  props: {
    lang: String
  },
  data() {
    return {
      carousel: [],
      currContent: 0,
      transitionName: "",
    }
  },
  created() {
    this.loadCarousel()
  },
  methods: {
    loadCarousel() {
      carouselService.query().then(resCarousel => {
        this.carousel = resCarousel
      })
    },
    updateCurrContent(move, idx = 0) {
      switch (move) {
        case 'left': {
          this.transitionName = "content-move-left"
          this.currContent -= 1
          if (this.currContent < 0) {
            this.currContent = this.carousel.carousel.length - 1
          }
          break;
        }
        case 'right': {
          this.transitionName = "content-move-right"
          this.currContent += 1
          if (this.currContent === this.carousel.carousel.length) {
            this.currContent = 0
          }
          break;
        }
        case 'page': {
          while (this.currContent !== idx) {
            if (this.currContent < idx) {
              this.transitionName = "content-move-right"
              this.currContent += 1
            }
            else if (this.currContent > idx) {
              this.transitionName = "content-move-left"
              this.currContent -= 1
            }
          }
          break;
        }
      }
    },
  },
  components: {
    CarouselItem
  }
}
</script>
