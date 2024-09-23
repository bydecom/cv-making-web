<template>
  <div class="container mx-auto px-4 py-16 text-center mt-20">
    <div class="container mx-auto px-4 py-16 text-center relative">
      <h1 class="text-5xl font-bold text-gray-800 mb-6">Job-winning resume templates</h1>
      <p class="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Each resume template is designed to follow the exact rules you need to get hired faster. Use
        our resume templates and get free access to 18 more career tools!
      </p>
      <button class="bg-blue-500 text-white px-6 py-3 rounded mb-8">Create my resume</button>
    </div>
    <div class="px-16">
      <!-- Add padding here -->
      <div class="flex justify-center space-x-4 mb-8">
        <button
          v-for="category in categories"
          :key="category"
          :class="[
            'flex items-center space-x-2 px-4 py-2 rounded',
            {
              'bg-blue-100 text-blue-700': activeCategory === category,
              'bg-white text-gray-800': activeCategory !== category
            }
          ]"
          @click="setActiveCategory(category)"
        >
          <span>{{ category }}</span>
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          @mouseenter="hoveredTemplate = template.id"
          @mouseleave="hoveredTemplate = null"
          class="template-card overflow-hidden bg-white shadow-lg transition-all duration-300"
          :class="{ 'ring-2 ring-blue-500': selectedTemplate === template.id }"
        >
          <div class="relative">
            <img
              :src="template.image"
              :alt="template.name"
              class="template-image w-full h-[300px] object-cover"
            />
            <div
              v-if="template.popular"
              class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 p-1 rounded"
            >
              <span class="flex items-center">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.176 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.34 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z"
                  ></path>
                </svg>
                Popular
              </span>
            </div>
            <div
              class="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center transition-opacity duration-300"
              :class="{
                'opacity-100': hoveredTemplate === template.id,
                'opacity-0': hoveredTemplate !== template.id
              }"
            >
              <button
                @click="selectTemplate(template.id)"
                class="bg-white text-gray-900 hover:bg-gray-100 p-2 rounded"
              >
                <span v-if="selectedTemplate === template.id">
                  <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 4.707 7.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                    ></path>
                  </svg>
                  Selected
                </span>
                <span v-else>Choose Template</span>
              </button>
            </div>
          </div>
          <div class="p-4 bg-white">
            <h3 class="font-semibold text-lg text-gray-800">{{ template.name }}</h3>
            <p class="mt-1 text-gray-600">{{ template.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resume01 from '@/assets/resume-01.jpg'

export default {
  data() {
    return {
      templates: [
        {
          id: 1,
          name: 'Executive Pro',
          image: resume01,
          category: 'Professional',
          description: 'A professional template for executives.'
        },
        {
          id: 2,
          name: 'Minimalist',
          image: resume01,
          category: 'Minimalist',
          description: 'A clean and minimalist template.'
        },
        {
          id: 3,
          name: 'Tech Innovator',
          image: resume01,
          category: 'Tech',
          description: 'A modern template for tech professionals.'
        },
        {
          id: 4,
          name: 'Creative Edge',
          image: resume01,
          category: 'Creative',
          description: 'A creative template for designers.'
        },
        {
          id: 5,
          name: 'Academic Excellence',
          image: resume01,
          category: 'Academic',
          description: 'An academic template for scholars.'
        },
        {
          id: 6,
          name: 'Modern Sleek',
          image: resume01,
          category: 'Professional',
          description: 'A sleek and modern template.'
        }
      ],
      categories: ['All', 'Professional', 'Minimalist', 'Tech', 'Creative', 'Academic'],
      selectedTemplate: null,
      activeCategory: 'All',
      hoveredTemplate: null
    }
  },
  computed: {
    filteredTemplates() {
      return this.activeCategory === 'All'
        ? this.templates
        : this.templates.filter((template) => template.category === this.activeCategory)
    }
  },
  methods: {
    setActiveCategory(category) {
      this.activeCategory = category
    },
    selectTemplate(templateId) {
      this.selectedTemplate = templateId
      this.$router.push({ name: 'EditPage', params: { template: templateId } })
    }
  }
}
</script>

<style scoped>
.template-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 16px;
}
.template-image {
  width: 100%;
  height: auto;
}
.choose-button {
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
