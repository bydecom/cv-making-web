<template>
  <div class="bg-white min-h-screen p-8 flex justify-center items-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
      <div class="header text-center mb-8">
        <h1 class="name text-3xl font-bold">{{ cvData.firstName }} {{ cvData.lastName }}</h1>
        <p class="job-title text-xl">{{ cvData.jobTitle }}</p>
        <p>Date of Birth: {{ cvData.dateOfBirth }}</p>
        <p>Address: {{ cvData.address }}</p>
        <p>Phone: {{ cvData.phone }}</p>
        <p>Email: {{ cvData.email }}</p>
        <img v-if="cvData.photo" :src="cvData.photo" alt="Profile Photo" />
      </div>
      <div class="career-objective mb-8">
        <h2 class="text-2xl font-semibold">Career Objective</h2>
        <p>{{ cvData.summary }}</p>
      </div>
      <div class="experience mb-8">
        <h2 class="text-2xl font-semibold">Work Experience</h2>
        <div v-for="(exp, index) in cvData.experience" :key="index">
          <h3>{{ exp.position }} at {{ exp.company }} ({{ exp.period }})</h3>
          <p>{{ exp.description }}</p>
        </div>
      </div>
      <div class="education mb-8">
        <h2 class="text-2xl font-semibold">Education</h2>
        <div v-for="(edu, index) in cvData.education" :key="index">
          <h3>{{ edu.major }} - {{ edu.school }} ({{ edu.year }})</h3>
        </div>
      </div>
      <div class="skills mb-8">
        <h2 class="text-2xl font-semibold">Skills</h2>
        <ul>
          <li v-for="(skill, index) in cvData.skills" :key="index">{{ skill }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['cvData'])
</script>

<style scoped>
.cv-container {
  font-family: Arial, sans-serif;
  color: #333;
  width: max-content;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.name {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.job-title {
  font-size: 1.5rem;
  color: #666;
  margin: 0;
}

h2 {
  font-size: 1.5rem;
  border-bottom: 2px solid #333;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
</style>
