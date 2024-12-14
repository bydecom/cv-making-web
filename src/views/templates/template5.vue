<template>
  <div class="bg-gray-100 min-h-screen p-4 flex justify-center items-center">
    <div class="bg-white w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden">
      <div class="flex">
        <!-- Left column -->
        <div class="w-1/3 bg-gray-900 text-white p-6 min-h-[1270px]">
          <div class="mb-8">
            <img
              :src="cvData.avatar || '/placeholder.svg?height=150&width=150'"
              alt=""
              class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white"
            />
            <h1 class="text-2xl font-bold text-center">
              {{ cvData.firstName }} {{ cvData.lastName }}
            </h1>
            <p class="text-center text-gray-400">{{ cvData.jobTitle }}</p>
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2 border-b border-gray-700 pb-1">Contact</h2>
            <p class="flex items-center mb-2">
              <MailIcon class="w-4 h-4 mr-2" />
              {{ cvData.email }}
            </p>
            <p class="flex items-center mb-2">
              <PhoneIcon class="w-4 h-4 mr-2" />
              {{ cvData.phone }}
            </p>
            <p class="flex items-center">
              <MapPinIcon class="w-4 h-4 mr-2" />
              {{ cvData.location }}
            </p>
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2 border-b border-gray-700 pb-1">Skills</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(skill, index) in cvData.skills"
                :key="index"
                class="bg-gray-800 px-2 py-1 rounded text-sm"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-2 border-b border-gray-700 pb-1">Education</h2>
            <div v-for="(edu, index) in cvData.education" :key="index" class="mb-3">
              <h3 class="font-semibold">{{ edu.degree }}</h3>
              <p class="text-sm text-gray-400">{{ edu.school }}, {{ edu.year }}</p>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="w-2/3 p-6 min-h-[1270px]">
          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-2 text-gray-800 border-b border-gray-300 pb-1">
              Summary
            </h2>
            <p class="text-gray-700">{{ cvData.summary }}</p>
          </div>

          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-2 text-gray-800 border-b border-gray-300 pb-1">
              Experience
            </h2>
            <div v-for="(exp, index) in cvData.experience" :key="index" class="mb-4">
              <h3 class="font-semibold text-lg">{{ exp.title }}</h3>
              <p class="text-gray-600 mb-1">
                {{ exp.company }}<span v-if="exp.company && exp.period"> | </span>{{ exp.period }}
              </p>
              <p class="text-gray-700">{{ exp.description }}</p>
            </div>
          </div>

          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-2 text-gray-800 border-b border-gray-300 pb-1">
              Projects
            </h2>
            <div v-for="(project, index) in cvData.projects" :key="index" class="mb-3">
              <h3 class="font-semibold text-lg">{{ project.title }}</h3>
              <p class="text-gray-700">{{ project.detail }}</p>
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-2 text-gray-800 border-b border-gray-300 pb-1">
              Achievements
            </h2>
            <div v-for="(achievement, index) in cvData.achievements" :key="index" class="mb-3">
              <h3 class="font-semibold text-lg">{{ achievement.title }}</h3>
              <p class="text-gray-700">{{ achievement.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-vue-next'

const props = defineProps(['cvData'])
</script>

<style scoped>
/* Any additional styles can be added here if needed */
</style>
