<template>
  <div>
    <h1>{{ jobTitle }}</h1>
    <div>
      <h2>{{ firstName }} {{ lastName }}</h2>
      <p>Email: {{ email }}</p>
      <p>Phone: {{ phone }}</p>
      <p>Address: {{ address }}</p>
      <p>City: {{ city }}</p>
    </div>
    <div>
      <h3>Profile</h3>
      <p>{{ profile }}</p>
    </div>
    <div>
      <h3>Skills</h3>
      <ul>
        <li v-for="skill in skills" :key="skill">{{ skill }}</li>
      </ul>
    </div>
    <div>
      <h3>Courses</h3>
      <ul>
        <li v-for="course in courses" :key="course">{{ course }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    jobTitle: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    profile: String,
    skills: Array,
    courses: Array
  }
}
</script>
