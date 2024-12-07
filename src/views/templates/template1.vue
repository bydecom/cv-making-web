<template>
  <div class="w-3/4 p-8 bg-white overflow-auto">
    <div class="flex justify-between"></div>
    <div class="card">
      <div class="card-content p-8">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2">
            <h1 class="text-3xl font-bold mb-2">{{ cvData.firstName }} {{ cvData.lastName }}</h1>
            <p class="text-xl text-gray-600 mb-2 mt-2">{{ cvData.jobTitle }}</p>
            <p class="mb-2">{{ cvData.summary }}</p>
          </div>
          <div class="text-right">
            <p>{{ cvData.email }}</p>
            <p>{{ cvData.phone }}</p>
            <p>{{ cvData.location }}</p>
          </div>
        </div>

        <div class="mt-6" v-if="cvData.skills.length">
          <h2 class="text-2xl font-semibold mb-2">Skills</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in cvData.skills"
              :key="index"
              class="bg-gray-200 px-2 py-1 rounded text-sm"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <div class="mt-6" v-if="cvData.education.length">
          <h2 class="text-2xl font-semibold mb-2">Education</h2>
          <div v-for="(edu, index) in cvData.education" :key="index">
            <h3 class="font-semibold">{{ edu.degree }}</h3>
            <p>{{ edu.school }}, {{ edu.year }}</p>
          </div>
        </div>

        <div class="mt-6" v-if="cvData.experience.length">
          <h2 class="text-2xl font-semibold mb-2">Experience</h2>
          <div v-for="(exp, index) in cvData.experience" :key="index" class="mb-4">
            <h3 class="font-semibold">{{ exp.title }}</h3>
            <p class="text-gray-600">
              {{ exp.company }}<span v-if="exp.company && exp.period"> | </span>{{ exp.period }}
            </p>
            <p>{{ exp.description }}</p>
          </div>
        </div>

        <div class="mt-6" v-if="cvData.projects.length">
          <h2 class="text-2xl font-semibold mb-2">Projects</h2>
          <div v-for="(project, index) in cvData.projects" :key="index" class="mb-4">
            <h3 class="font-semibold">{{ project.title }}</h3>
            <p>{{ project.detail }}</p>
          </div>
        </div>

        <div class="mt-6" v-if="cvData.achievements.length">
          <h2 class="text-2xl font-semibold mb-2">Achievements</h2>
          <div v-for="(achievement, index) in cvData.achievements" :key="index" class="mb-4">
            <h3 class="font-semibold">{{ achievement.title }}</h3>
            <p>{{ achievement.detail }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['cvData'])
</script>

<style scoped>
.button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
.card {
  width: 100%;
  border: 0px solid #ccc;
  border-radius: 0.5rem;
}
.card-content {
  padding: 0.5rem;
}
</style>
