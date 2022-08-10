<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="4"
        class="mx-auto"        
      >
        <form-resignation-latter />
      </v-col>
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
        class="mx-auto"
      >
        <preview-resignation-letter />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormResignationLatter from './FormResignationLatter.vue'
  import PreviewResignationLetter from './PreviewResignationLetter.vue'
  
  export default {
    components: { PreviewResignationLetter, FormResignationLatter, },
    name: 'IndexResignationLetter',
  }
</script>
