<template>
  <header class="header">
    <section class="header-container" :class="lang === 'en' ? 'd-rtl' : ''">
      <img class="logo" src="/logo.svg" />
      <div class="dropdown">
        <img class="lang-icon" src="./assets/icons/language.svg" @click="toggleDropdown" />
        <div class="arrow-up" :class="lang === 'en' ? 'd-rtl' : ''" v-show="IsLangDropdownOpen"></div>
        <div ref="myDropdown" class="dropdown-content" :class="lang === 'en' ? 'd-rtl' : ''"
          v-show="IsLangDropdownOpen">
          <button value="en" @click="handleLangChange">English</button>
          <button value="he" @click="handleLangChange">עברית</button>
        </div>
      </div>
    </section>
  </header>
  <carousel :lang="lang" :carousel="carousel" :currContent="currContent" :transitionName="transitionName" @updateCurrContent="updateCurrContent"/>
  <recommendation :lang="lang" :carousel="carousel" :currContent="currContent"/>
</template>

<script>
import Carousel from './components/Carousel.vue'
import Recommendation from './components/Recommendation.vue'
import { carouselService } from "./services/carousel.service"

export default {
  data() {
    return {
      carousel: [],
      currContent: 0,
      IsLangDropdownOpen: false,
      lang: 'en',
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
    handleLangChange(ev) {
      this.lang = ev.target.value
      this.IsLangDropdownOpen = false
    },
    toggleDropdown() {
      this.IsLangDropdownOpen = !this.IsLangDropdownOpen
    },
    updateCurrContent({move, idx}) {
      switch (move) {
        case 'left': {
          this.transitionName = this.lang === 'he' ? "content-move-right" : "content-move-left"
          this.currContent -= 1
          if (this.currContent < 0) {
            this.currContent = this.carousel.carousel.length - 1
          }
          break;
        }
        case 'right': {
          this.transitionName = this.lang === 'he' ? "content-move-left" : "content-move-right"
          this.currContent += 1
          if (this.currContent === this.carousel.carousel.length) {
            this.currContent = 0
          }
          break;
        }
        case 'page': {
          while (this.currContent !== idx) {
            if (this.currContent < idx) {
              this.transitionName = this.lang === 'he' ? "content-move-left" : "content-move-right"
              this.currContent += 1
            }
            else if (this.currContent > idx) {
              this.transitionName = this.lang === 'he' ? "content-move-right" : "content-move-left"
              this.currContent -= 1
            }
          }
          break;
        }
      }
    },
  },
  components: {
    Carousel,
    Recommendation
  }
}
</script>
