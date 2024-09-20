<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-16 text-center relative">
      <h2 class="text-blue-900 text-base font-semibold mb-4">ONLINE RESUME BUILDER</h2>
      <h1 class="text-5xl font-bold text-gray-800 mb-6">
        Only 2% of resumes make it past<br />
        the first round. Be in the top 2%
      </h1>
      <p class="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Easy to use and ready in just minutes. Try it for free now!
      </p>
      <button
        class="bg-blue-500 text-white px-6 py-4 rounded-md text-xl font-semibold hover:bg-blue-600"
      >
        Create my resume
      </button>
      <p class="text-sm text-gray-500 mt-4">32,519 resumes created today</p>

      <transition appear name="slide-up">
        <div class="mt-16 flex justify-center" style="margin-bottom: -4rem">
          <div
            class="bg-white shadow-lg overflow-hidden"
            style="width: 40%; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem"
          >
            <img src="@/assets/cv-sample1.jpg" alt="CV Sample" class="object-cover w-full h-full" />
          </div>
        </div>
      </transition>
    </div>
  </div>

  <!-- Divider line between hero and section 2 -->
  <hr class="border-t border-gray-200 mx-auto" />

  <div class="bg-white pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-4xl font-bold mb-16 text-gray-800 text-center">Reviewed by the community</h2>

      <div class="flex flex-col md:flex-row justify-between items-start">
        <div class="w-full md:w-1/4 text-center md:text-left mb-8 md:mb-0">
          <div class="text-blue-600 text-4xl mb-2">★★★★★</div>
          <div class="text-3xl font-bold mb-2">4.9 out of 5</div>
          <div class="text-xl font-semibold mb-2">From Community</div>
          <p class="text-base text-gray-600">based on 51,569 reviews</p>
        </div>

        <div class="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="review in reviews" :key="review.id" class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-blue-600 text-xl mb-2">★★★★★</div>
            <h3 class="text-xl font-bold mb-2">{{ review.title }}</h3>
            <p class="text-base mb-4 text-gray-700">{{ review.content }}</p>
            <p class="text-sm text-gray-500">{{ review.author }} • {{ review.date }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-center mt-8">
        <button
          class="bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center mr-2"
        >
          &lt;
        </button>
        <button
          class="bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center"
        >
          &gt;
        </button>
      </div> -->
    </div>
  </div>

  <!-- Divider line -->
  <hr class="border-t border-gray-200 mx-auto" />

  <div class="bg-gray-100 py-16">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-4xl font-bold mb-16 text-gray-800 text-center">
        Features designed to help you win your<br />dream job
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" class="flex items-start">
          <img :src="feature.icon" :alt="feature.title" class="w-12 h-12 mr-4 flex-shrink-0" />
          <div>
            <h3 class="text-xl font-semibold text-blue-600 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Section 3 -->
  <div class="bg-white py-16">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-8 md:mb-0">
          <img
            src="@/assets/icons/team-up.jpg"
            alt="Resume Maker Illustration"
            class="w-full h-auto"
          />
        </div>
        <div class="md:w-1/2 md:pl-12">
          <h2 class="text-4xl font-bold mb-6 text-gray-800">
            Use the best resume maker as your guide
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            Getting that dream job can seem like an impossible task. We're here to change that. Give
            yourself a real advantage with the best online resume maker: created by experts,
            improved by data, trusted by millions of professionals.
          </p>
          <div class="flex items-center">
            <button
              class="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 mr-4"
            >
              Create my resume
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="text-left">
          <img
            src="@/assets/icons/easy-builder.png"
            alt="Win Interviews"
            class="w-16 h-16 mb-4 text-left"
          />
          <h3 class="text-xl font-bold mb-4 text-gray-800">Make a resume that wins interviews</h3>
          <p class="text-gray-600">
            Use our resume maker with its advanced creation tools to tell a professional story that
            engages recruiters, hiring managers and even CEOs.
          </p>
        </div>
        <div class="text-left">
          <img
            src="@/assets/icons/easy-builder.png"
            alt="Easy Writing"
            class="w-16 h-16 mb-4 text-left"
          />
          <h3 class="text-xl font-bold mb-4 text-gray-800">Resume writing made easy</h3>
          <p class="text-gray-600 text-left">
            Resume writing has never been this effortless. Pre-generated text, visual designs and
            more - all already integrated into the resume maker. Just fill in your details.
          </p>
        </div>
        <div class="text-left">
          <img
            src="@/assets/icons/easy-builder.png"
            alt="Recruiter Tested"
            class="w-16 h-16 mb-4 text-left"
          />
          <h3 class="text-xl font-bold mb-4 text-gray-800 text-left">
            A recruiter-tested CV maker tool
          </h3>
          <p class="text-gray-600 text-left">
            Our resume builder and its pre-generated content are tested by recruiters and IT
            experts. We help your resume become truly competitive in the hiring process.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const reviews = [
  {
    id: 1,
    title: 'This is the only resume ...',
    content:
      'This is the only resume maker that has land me my dream job inerviews. Easy to navigate and very well put together.',
    author: 'Melga Pierce',
    date: 'about 5 hours ago'
  },
  {
    id: 2,
    title: 'I had an billing issue an...',
    content:
      'I had an billing issue and their customer service was very good! They solved my problem, and for that they...',
    author: 'Miguel',
    date: '1 day ago'
  },
  {
    id: 3,
    title: 'Great experience to cre...',
    content:
      'Great experience to create my cv by registering in this resume.io. I would highly recommend this site. Much...',
    author: 'DSV',
    date: '1 day ago'
  },
  {
    id: 4,
    title: 'Great experience to cre...',
    content:
      'Great experience to create my cv by registering in this resume.io. I would highly recommend this site. Much...',
    author: 'DSV',
    date: '1 day ago'
  },
  {
    id: 5,
    title: 'Great experience to cre...',
    content:
      'Great experience to create my cv by registering in this resume.io. I would highly recommend this site. Much...',
    author: 'DSV',
    date: '1 day ago'
  },
  {
    id: 6,
    title: 'Great experience to cre...',
    content:
      'Great experience to create my cv by registering in this resume.io. I would highly recommend this site. Much...',
    author: 'DSV',
    date: '1 day ago'
  }
]

import easyBuilderIcon from '@/assets/icons/easy-builder.png'
import spellCheckerIcon from '@/assets/icons/spell-check.png'
import dataSafeIcon from '@/assets/icons/safe-data.png'
import summaryGeneratorIcon from '@/assets/icons/summary.png'
import approvedTemplatesIcon from '@/assets/icons/template.png'
import aiPhrasesIcon from '@/assets/icons/ai-pre-written.png'
import optimizedResumesIcon from '@/assets/icons/optimized-cv.png'
import multiFormatIcon from '@/assets/icons/multi-format.png'
import coverLettersIcon from '@/assets/icons/cover-mail.png'

const features = [
  {
    title: 'Easy online resume builder',
    description: 'Create an awesome resume in minutes, without leaving your web browser.',
    icon: easyBuilderIcon
  },
  {
    title: 'Automatic spell-checker',
    description:
      'Our built-in spell-checker takes care of the grammar for you. Create a resume with zero typos or errors.',
    icon: spellCheckerIcon
  },
  {
    title: 'Your data is safe',
    description: 'Your data is kept private and protected by strong 256-bit encryption.',
    icon: dataSafeIcon
  },
  {
    title: 'Automatic summary generator',
    description:
      "Create a powerful resume profile or cover letter in one click. Writer's block is no longer an obstacle. Try for free!",
    icon: summaryGeneratorIcon
  },
  {
    title: 'Approved templates',
    description:
      'Professionally-designed resume templates and examples. Just edit and download in 5 minutes.',
    icon: approvedTemplatesIcon
  },
  {
    title: 'AI pre-written phrases',
    description:
      'Use the power of AI and data analysis, choose pre-generated effective phrases and keywords.',
    icon: aiPhrasesIcon
  },
  {
    title: 'Optimized resumes',
    description:
      'Formats and designs are optimized for resume-filtering algorithms. Ensure humans see your application!',
    icon: optimizedResumesIcon
  },
  {
    title: 'Multi-format resume options',
    description:
      'Save your perfect resume in any common format, including Microsoft Word and PDF in a single click.',
    icon: multiFormatIcon
  },
  {
    title: 'Cover letters',
    description:
      'Our cover letter builder works with the same ease and use of elegant templates as the resume creator.',
    icon: coverLettersIcon
  }
]
</script>

<style scoped>
/* Nếu cần, thêm các style để điều chỉnh khoảng cách */
.education-section {
  margin-bottom: 1rem; /* Điều chỉnh giá trị này nếu cần */
}

.skills-section {
  margin-top: 0;
}

.slide-up-enter-active {
  transition: all 0.8s ease-out;
}

.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

/* ... other styles ... */
</style>
