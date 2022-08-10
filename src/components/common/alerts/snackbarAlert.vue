<template>
  <v-snackbar
    v-model="isOpen"
    
  >
    {{ dataAlert.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="isOpen = false"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    dataAlert: {
      type: Object,
      default: Object,
    }
  },
  data: () => ({
    isOpen: false
  }),

  methods: {
    toogleAlert(value) {
      this.isOpen = value
    }
  },

}
</script>

<style>

</style>