<template>
    <div class="recommendation">
        <button :disabled="loadingRecommendations" class="recommendation-btn" @click="createRecommendation">{{ lang ===
        'he' ? 'קבל/י המלצות' : 'Get Recommendation'}}</button>
        <p v-show="loadingRecommendations">{{ lang ===
        'he' ? '...טוען' : 'Loading...'}}</p>
        <ol v-show="!loadingRecommendations" :class="lang === 'he' ? 'd-rtl' : ''">
            <li :class="lang === 'he' ? 'd-rtl' : ''"
                v-for="recommend in recommendations" :key="recommend.id">
                {{ recommend.title }}
            </li>
        </ol>
        <div class="categories">
            <button @click="createRecommendationByCategory('sushi')" :disabled="loadingRecommendationsCategory">
                <img alt="sushi"
                    src="https://fusedbyfionauyema.com/wp-content/uploads/2021/02/Fused-by-Fiona-Uyema-Sushi-Q-A-how-to-make-sushi-at-home-500x375.jpg" />
            </button>
            <button @click="createRecommendationByCategory('hamburger')" :disabled="loadingRecommendationsCategory">
                <img alt="hamburger"
                    src="https://video-images.vice.com/articles/5ba3c50e4cd7cf00064a6266/lede/1537461482934-GettyImages-591214593.jpeg" />
            </button>
            <button @click="createRecommendationByCategory('pasta')" :disabled="loadingRecommendationsCategory">
                <img alt="pasta"
                    src="https://rainbowplantlife.com/wp-content/uploads/2021/06/sausage-pasta-lazy-meals-1-of-3-scaled.jpg" />
            </button>
            <button @click="createRecommendationByCategory('salad')" :disabled="loadingRecommendationsCategory">
                <img alt="salad"
                    src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2021%2F08%2F16%2Fchopped-power-salad-with-chicken.jpg&q=60" />
            </button>
            <button @click="createRecommendationByCategory('ice cream')" :disabled="loadingRecommendationsCategory">
                <img alt="ice cream"
                    src="https://www.thespruceeats.com/thmb/QjCQ4RTjmnhrovGkuJWzZCXYFX8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-90053856-588b7aff5f9b5874ee534b04.jpg" />
            </button>
        </div>
        <p v-show="loadingRecommendationsCategory">{{ lang ===
        'he' ? '...טוען' : 'Loading...'}}</p>
        <ol v-show="!loadingRecommendationsCategory" :class="lang === 'he' ? 'd-rtl' : ''">
            <li :class="lang === 'he' ? 'd-rtl' : ''"
                v-for="recommend in recommendationsByCategory" :key="recommend.id">
                {{ recommend.title }}
            </li>
        </ol>
    </div>
</template>

<script>
import { openAiService } from '../services/openAi.service'
import { utilService } from '../services/util.service'

export default {
    props: {
        lang: String,
        carousel: Object,
        currContent: Number
    },
    data() {
        return {
            recommendations: [],
            recommendationsByCategory: [],
            userInput: 'restaurants',
            loadingRecommendations: false,
            loadingRecommendationsCategory: false
        }
    },
    methods: {
        async createRecommendation() {
            this.loadingRecommendations = true
            let question = 'Recommend me on ' + this.carousel.carousel[this.currContent].title['en'] + ' in Israel.'
            question += this.lang === 'he' ? ' Translate the response to Hebrew' : ''
            'Recommend me on ' + this.carousel.carousel[this.currContent].title['en'] + ' in Israel'
            const recommentarions = await this.openaiReq(question)
            this.recommendations = recommentarions
            this.loadingRecommendations = false
        },
        async createRecommendationByCategory(category) {
            this.loadingRecommendationsCategory = true
            let question = 'Recommend me on 3 places of ' + category + ' in Israel.'
            question += this.lang === 'he' ? ' Translate the response to Hebrew' : ''
            const recommentarions = await this.openaiReq(question)
            this.recommendationsByCategory = recommentarions
            this.loadingRecommendationsCategory = false
        },
        async openaiReq(question) {
            const recommendation = await openAiService.aiQuery({ question })
            const recommendations = recommendation.data.result.split(/\r?\n/);
            recommendations.splice(0, 2)
            const recommendationsToAdd = recommendations.map(
                recommend => (
                    { id: utilService.makeId(), title: recommend })
            )
            return recommendationsToAdd.filter(recommend => recommend.title.length > 3)
        }
    },
    watch: {
        lang(newLang, oldLang) {
            this.recommendations = [];
            this.recommendationsByCategory = [];
        },
    },
}
</script>