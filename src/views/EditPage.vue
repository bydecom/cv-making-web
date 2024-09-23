<template>
  <div class="flex h-screen bg-gray-100">
    <CvEditor :cvData="cvData" :updateCvData="updateCvData" />
    <CvPreview :cvData="cvData" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CvEditor from './CvEditor.vue'
import CvPreview from './CvPreview.vue'

const cvData = ref({
  firstName: 'John',
  lastName: 'Doe',
  jobTitle: 'Software Developer',
  email: 'john.doe@example.com',
  phone: '+1 234 567 890',
  location: 'New York, USA',
  summary:
    'Experienced software developer with a passion for creating efficient and scalable applications.',
  skills: ['JavaScript', 'React', 'Node.js', 'Python'],
  experience: [
    {
      title: 'Senior Developer',
      company: 'Tech Solutions Inc.',
      period: '2018 - Present',
      description: 'Led development of multiple web applications using React and Node.js.'
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Co.',
      period: '2015 - 2018',
      description: 'Assisted in the development of mobile applications using React Native.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      year: '2015'
    }
  ]
})

const updateCvData = (newData) => {
  cvData.value = newData
}
</script>

<style scoped>
.flex {
  display: flex;
}
.h-screen {
  height: 100vh;
}
.bg-gray-100 {
  background-color: #f7fafc;
}
</style>
