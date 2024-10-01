<template>
  <div class="flex bg-gray-100 mt-20 mb-20 w-full">
    <CvEditor :cvData="cvData" :updateCvData="updateCvData" @update-image="updateImage" />
    <CvPreview :cvData="cvData" :image="imageData" />
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
  ],
  certificates: [],
  extracurricularActivities: [],
  projects: [],
  languages: [],
  references: []
})

const imageData = ref('') // New ref to hold the image data

const updateCvData = (newData) => {
  cvData.value = newData
}

const updateImage = (newImage) => {
  imageData.value = newImage
}
</script>

<style scoped>
.flex {
  display: 100%;
}
.h-screen {
  height: 150vh;
}
.bg-gray-100 {
  background-color: #f7fafc;
}
</style>
