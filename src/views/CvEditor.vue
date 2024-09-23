<template>
  <div class="w-1/2 p-8 overflow-auto">
    <h2 class="text-2xl font-bold mb-6">Edit Your CV</h2>
    <div class="space-y-4">
      <input v-model="cvData.firstName" placeholder="First Name" class="input" />
      <input v-model="cvData.lastName" placeholder="Last Name" class="input" />
      <input v-model="cvData.jobTitle" placeholder="Job Title" class="input" />
      <input v-model="cvData.email" type="email" placeholder="Email" class="input" />
      <input v-model="cvData.phone" placeholder="Phone" class="input" />
      <input v-model="cvData.location" placeholder="Location" class="input" />
      <textarea v-model="cvData.summary" placeholder="Professional Summary" class="textarea" />
      <div>
        <h3 class="font-semibold mb-2">Skills</h3>
        <div v-for="(skill, index) in cvData.skills" :key="index" class="flex items-center mb-2">
          <input v-model="cvData.skills[index]" class="input mr-2" />
          <button @click="removeSkill(index)" class="button">Remove</button>
        </div>
        <button @click="addSkill" class="button">Add Skill</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps(['cvData', 'updateCvData'])

const addSkill = () => {
  props.updateCvData({ ...props.cvData, skills: [...props.cvData.skills, ''] })
}

const removeSkill = (index) => {
  const newSkills = props.cvData.skills.filter((_, i) => i !== index)
  props.updateCvData({ ...props.cvData, skills: newSkills })
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
