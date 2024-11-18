<template>
  <div class="w-1/2 p-8 bg-white overflow-auto">
    <div class="flex justify-between mb-4"></div>
    <div class="card">
      <div class="card-content p-6">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2">
            <h1 class="text-3xl font-bold">{{ cvData.firstName }} {{ cvData.lastName }}</h1>
            <p class="text-xl text-gray-600 mb-4">{{ cvData.jobTitle }}</p>
            <p class="mb-2">{{ cvData.summary }}</p>
          </div>
          <div class="text-right">
            <p>{{ cvData.email }}</p>
            <p>{{ cvData.phone }}</p>
            <p>{{ cvData.location }}</p>
          </div>
        </div>
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-2">Skills</h2>
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
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-2">Experience</h2>
          <div v-for="(exp, index) in cvData.experience" :key="index" class="mb-4">
            <h3 class="font-semibold">{{ exp.title }}</h3>
            <p class="text-gray-600">{{ exp.company }} | {{ exp.period }}</p>
            <p>{{ exp.description }}</p>
          </div>
        </div>
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-2">Education</h2>
          <div v-for="(edu, index) in cvData.education" :key="index">
            <h3 class="font-semibold">{{ edu.degree }}</h3>
            <p>{{ edu.school }}, {{ edu.year }}</p>
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
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.card-content {
  padding: 1rem;
}
</style>
