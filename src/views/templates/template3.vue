<template>
  <div class="bg-blue-500 min-h-screen p-8 flex justify-center items-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
      <!-- Header Section -->
      <div class="flex mb-8">
        <!-- Left Column -->
        <div class="w-full md:w-1/3 pr-4 mb-4 md:mb-0">
          <div class="rounded-lg overflow-hidden mb-4 bg-gray-200 aspect-square">
            <img
              v-if="cvData.photo"
              :src="cvData.photo"
              alt="Profile Photo"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
              No Photo
            </div>
          </div>
          <div class="text-sm text-center">
            <p class="mb-1">
              <strong>{{ cvData.firstName }} {{ cvData.lastName }}</strong>
            </p>
            <p class="mb-1">Date of Birth: {{ cvData.dateOfBirth }}</p>
            <p class="mb-1">Sex: {{ cvData.sex }}</p>
            <p>Locate: {{ cvData.locate }}</p>
          </div>
        </div>
        <!-- Right Column -->
        <div class="w-2/3 pl-4">
          <h1 class="text-6xl font-bold text-center text-blue-600 mb-4 mt-24">
            {{ cvData.firstName }} {{ cvData.lastName }}
          </h1>
          <div>
            <h2 class="text-2xl font-semibold text-center text-blue-600 mb-2">INTRODUCE</h2>
            <p class="text-gray-700">{{ cvData.summary }}</p>
          </div>
        </div>
      </div>

      <!-- Two-column layout for the rest of the content -->
      <div class="flex flex-wrap -mx-4">
        <!-- Left Column -->
        <div class="w-1/2 px-4">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold text-blue-600 mb-4">Education</h2>
            <div v-for="(edu, index) in cvData.education" :key="index" class="mb-2">
              <h3 class="text-lg font-semibold">{{ edu.major }} - {{ edu.school }}</h3>
              <p class="text-gray-600">{{ edu.year }}</p>
            </div>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-semibold text-blue-600 mb-4">Skills</h2>
            <div class="flex flex-wrap">
              <div
                v-for="(skill, index) in cvData.skills"
                :key="index"
                class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                {{ skill }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="w-1/2 px-4">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold text-blue-600 mb-4">Experience</h2>
            <div v-for="(exp, index) in cvData.experience" :key="index" class="mb-4">
              <h3 class="text-lg font-semibold">{{ exp.position }} at {{ exp.company }}</h3>
              <p class="text-gray-600">{{ exp.period }}</p>
              <p class="text-gray-700">{{ exp.description }}</p>
            </div>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-semibold text-blue-600 mb-4">Contact</h2>
            <div class="flex items-center mb-2">
              <i class="fab fa-facebook-f text-blue-600 mr-2"></i>
              <a :href="cvData.facebook" class="text-blue-600 hover:underline">Facebook</a>
            </div>
            <div class="flex items-center mb-2">
              <i class="fab fa-instagram text-blue-600 mr-2"></i>
              <a :href="cvData.instagram" class="text-blue-600 hover:underline">Instagram</a>
            </div>
            <div class="flex items-center">
              <i class="fab fa-behance text-blue-600 mr-2"></i>
              <a :href="cvData.behance" class="text-blue-600 hover:underline">Behance</a>
            </div>
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>
