<template>
  <div class="w-1/2 p-8 overflow-auto editor-container">
    <h2 class="text-2xl font-bold mb-6">Edit Your CV</h2>
    <div class="space-y-4">
      <input type="file" @change="onFileChange" accept="image/*" class="input" />
      <input v-model="cvData.firstName" placeholder="First Name" class="input" />
      <input v-modnel="cvData.lastName" placeholder="Last Name" class="input" />
      <input v-model="cvData.jobTitle" placeholder="Job Title" class="input" />
      <input v-model="cvData.email" type="email" placeholder="Email" class="input" />
      <input v-model="cvData.phone" placeholder="Phone" class="input" />
      <input v-model="cvData.location" placeholder="Location" class="input" />
      <textarea
        v-model="cvData.summary"
        placeholder="Professional Summary"
        class="textarea"
      ></textarea>

      <div>
        <h3 class="font-semibold mb-2">Skills</h3>
        <div
          v-for="(skill, index) in cvData.skills"
          :key="index"
          class="skill-container flex items-center mb-2"
        >
          <input v-model="cvData.skills[index]" class="input flex-grow mr-2" />
          <img
            @click="removeSkill(index)"
            src="@/assets/icons/trashbin.png"
            class="icon-remove-skill"
            alt="Remove"
          />
        </div>
        <button @click="addSkill" class="button">Add Skill</button>
      </div>

      <div>
        <h3 class="font-semibold mb-2">Experience</h3>
        <div
          v-for="(exp, index) in cvData.experience"
          :key="index"
          class="experience-container-wrapper mb-4"
        >
          <div class="experience-container">
            <input
              v-model="cvData.experience[index].title"
              placeholder="Title"
              class="input mb-2"
            />
            <input
              v-model="cvData.experience[index].company"
              placeholder="Company"
              class="input mb-2"
            />
            <input
              v-model="cvData.experience[index].period"
              placeholder="Period"
              class="input mb-2"
            />
            <textarea
              v-model="cvData.experience[index].description"
              placeholder="Description"
              class="textarea mb-2"
            ></textarea>
            <img
              @click="removeExperience(index)"
              src="@/assets/icons/trashbin.png"
              class="icon-remove"
              alt="Remove"
            />
          </div>
        </div>
        <button @click="addExperience" class="button">Add Experience</button>
      </div>

      <div>
        <h3 class="font-semibold mb-2">Education</h3>
        <div
          v-for="(edu, index) in cvData.education"
          :key="index"
          class="education-container-wrapper mb-4"
        >
          <div class="education-container">
            <input
              v-model="cvData.education[index].degree"
              placeholder="Degree"
              class="input mb-2"
            />
            <input
              v-model="cvData.education[index].school"
              placeholder="School"
              class="input mb-2"
            />
            <input v-model="cvData.education[index].year" placeholder="Year" class="input mb-2" />
            <img
              @click="removeEducation(index)"
              src="@/assets/icons/trashbin.png"
              class="icon-remove"
              alt="Remove"
            />
          </div>
        </div>
        <button @click="addEducation" class="button">Add Education</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps(['cvData', 'updateCvData'])
const emit = defineEmits()

const showCertificates = ref(false)
const showExtracurricular = ref(false)
const showProject = ref(false)
const showLanguage = ref(false)
const showReference = ref(false)

const newReference = ref('')

const addSkill = () => {
  props.updateCvData({ ...props.cvData, skills: [...props.cvData.skills, ''] })
}

const removeSkill = (index) => {
  const newSkills = props.cvData.skills.filter((_, i) => i !== index)
  props.updateCvData({ ...props.cvData, skills: newSkills })
}

const addExperience = () => {
  props.updateCvData({
    ...props.cvData,
    experience: [
      ...props.cvData.experience,
      { title: '', company: '', period: '', description: '' }
    ]
  })
}

const removeExperience = (index) => {
  const newExperience = props.cvData.experience.filter((_, i) => i !== index)
  props.updateCvData({ ...props.cvData, experience: newExperience })
}

const addEducation = () => {
  props.updateCvData({
    ...props.cvData,
    education: [...props.cvData.education, { degree: '', school: '', year: '' }]
  })
}

const removeEducation = (index) => {
  const newEducation = props.cvData.education.filter((_, i) => i !== index)
  props.updateCvData({ ...props.cvData, education: newEducation })
}

const toggleCertificates = () => {
  showCertificates.value = !showCertificates.value
  if (showCertificates.value) {
    props.updateCvData({ ...props.cvData, certificates: [...props.cvData.certificates, ''] })
  }
}

const toggleExtracurricular = () => {
  showExtracurricular.value = !showExtracurricular.value
  if (showExtracurricular.value) {
    props.updateCvData({
      ...props.cvData,
      extracurricularActivities: [...props.cvData.extracurricularActivities, '']
    })
  }
}

const toggleProject = () => {
  showProject.value = !showProject.value
  if (showProject.value) {
    props.updateCvData({ ...props.cvData, projects: [...props.cvData.projects, ''] })
  }
}

const toggleLanguage = () => {
  showLanguage.value = !showLanguage.value
  if (showLanguage.value) {
    props.updateCvData({ ...props.cvData, languages: [...props.cvData.languages, ''] })
  }
}

const toggleReference = () => {
  showReference.value = !showReference.value
  if (showReference.value) {
    props.updateCvData({ ...props.cvData, references: [...props.cvData.references, ''] })
  }
}

// Add remove functions for each section
const removeCertificate = (index) => {
  const newCertificates = props.cvData.certificates.filter((_, i) => i !== index)
  props.updateCvData({ ...props.cvData, certificates: newCertificates })
}

const removeExtracurricular = (index) => {
  const newActivities = props.cvData.extracurricularActivities.filter((_, i) => i !== index)
  props.updateCvData({ ...props.cvData, extracurricularActivities: newActivities })
}

const removeProject = (index) => {
  const newProjects = props.cvData.projects.filter((_, i) => i !== index)
  props.updateCvData({ ...props.cvData, projects: newProjects })
}

const removeLanguage = (index) => {
  const newLanguages = props.cvData.languages.filter((_, i) => i !== index)
  props.updateCvData({ ...props.cvData, languages: newLanguages })
}

const removeReference = (index) => {
  const newReferences = props.cvData.references.filter((_, i) => i !== index)
  props.updateCvData({ ...props.cvData, references: newReferences })
}

const addReference = () => {
  if (newReference.value.trim() !== '') {
    props.updateCvData({
      ...props.cvData,
      references: [...props.cvData.references, newReference.value.trim()]
    })
    newReference.value = ''
  }
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      emit('update-image', e.target.result) // Emit the image data
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.editor-container {
  height: 600px; /* Đặt chiều cao cố định cho khung */
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  max-height: 50px; /* Đặt chiều cao tối đa cho input */
  overflow: hidden; /* Ẩn nội dung thừa */
}

.textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  max-height: 100px; /* Đặt chiều cao tối đa cho textarea */
  overflow: auto; /* Hiển thị thanh cuộn nếu nội dung quá dài */
  resize: vertical; /* Cho phép người dùng điều chỉnh chiều cao */
}

.button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.export-button {
  margin-left: auto; /* Căn nút về bên phải */
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.export-button:hover {
  background-color: #0056b3;
}

.icon-remove {
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: block;
  margin-left: auto;
}
.icon-remove-skill {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 10px; /* Đặt icon ở bên phải input */
}

.skill-container {
  display: flex;
  align-items: center;
}

.experience-container-wrapper,
.education-container-wrapper {
  position: relative;
}

.experience-container,
.education-container {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.header {
  display: flex;
  justify-content: space-between; /* Căn giữa tiêu đề và nút */
  align-items: center; /* Căn giữa theo chiều dọc */
}
.profile-photo {
  width: 100px; /* Adjust size as needed */
  height: auto;
  border-radius: 50%; /* Optional: for circular image */
}
</style>
