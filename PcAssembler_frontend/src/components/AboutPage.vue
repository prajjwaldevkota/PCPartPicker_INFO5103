<template>
  <v-app>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card class="elevation-12 pa-6">
            <v-card-title class="text-center text-h4">About PC Assembler</v-card-title>
            <v-card-text>
              <p>
                Welcome to <strong>PC Assembler</strong>, your ultimate destination for building the
                perfect custom PC! Our platform is designed to make PC building accessible and
                enjoyable for everyone, whether you're a gamer, a content creator, or just need a
                reliable machine for everyday use.
              </p>
              <p>
                At PC Assembler, we believe in empowering our users with the knowledge and tools to
                craft their ideal PC setup. With a user-friendly interface, detailed specifications,
                user reviews, and expert recommendations, we guide you through every step of the
                journey.
              </p>
              <v-divider class="my-4"></v-divider>
              <p>PC Assembler is proudly brought to you by a dedicated and talented team:</p>
              <ul>
                <li>
                  <strong>Shashwat Malla</strong>.
                </li>
                <li>
                  <strong>Isaac Lajoie</strong> 
                </li>
                <li>
                  <strong>Prajjwal Devkota</strong> 
                </li>
                <li>
                  <strong>Siddharth Keswani</strong>
                </li>
              </ul>
              <v-divider class="my-4"></v-divider>
              <p>
                Thank you for choosing PC Assembler. We’re passionate about bringing your dream PC
                to life and are here to support you at every step. If you have any questions,
                feedback, or suggestions, don’t hesitate to contact us. Together, let’s build the
                future, one PC at a time!
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  background-color: #f8f9fa;
  color: #333;
}
ul {
  list-style-type: disc;
  margin-left: 1.5rem;
}
</style>
