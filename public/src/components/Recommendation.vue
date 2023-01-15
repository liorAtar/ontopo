<template>
    <div class="recommendation">
        <button class="recommendation-btn" @click="createRecommendation">Get Recommendation</button>
        <ol>
            <li v-for="recommend in recommendations" :key="recommend.id">
                {{ recommend.title }}
            </li>
        </ol>
    </div>
</template>

<script>
import { openAiService } from '../services/openAi.service'
import { utilService } from '../services/util.service'

export default {
    data() {
        return {
            recommendations: [],
            userInput: 'Please recommend me restaurants in Israel',
        }
    },
    methods: {
        async createRecommendation() {
            const recommendation = await openAiService.aiQuery(this.userInput)
            const recommendations = recommendation.data.result.split(/\r?\n/);
            recommendations.splice(0, 2)
            const recommendationsToAdd = recommendations.map(
                recommend => (
                    { id: utilService.makeId(), title: recommend })
            )
            this.recommendations = recommendationsToAdd.filter(recommend => recommend.title.length > 1)
        }
    },
}
</script>