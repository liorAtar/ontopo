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
  <carousel :lang="lang" />
  <recommendation />
</template>

<script>
import Carousel from './components/Carousel.vue'
import Recommendation from './components/Recommendation.vue'

export default {
  data() {
    return {
      IsLangDropdownOpen: false,
      lang: 'en',
    }
  },
  methods: {
    handleLangChange(ev) {
      this.lang = ev.target.value
      this.IsLangDropdownOpen = false
    },
    toggleDropdown() {
      this.IsLangDropdownOpen = !this.IsLangDropdownOpen
    },
  },
  components: {
    Carousel,
    Recommendation
  }
}
</script>
