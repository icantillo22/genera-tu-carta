<template>
  <v-form class="my-5">
    <label>¿De qué ciudad eres? *</label>
    <v-text-field 
      dense 
      outlined
      v-model="resignationLetter.city"
      :rules="[v => v.length > 0 || 'Este campo es importante, así sabremos qué poner en la carta 😀']"
    ></v-text-field>
    <label>¿Cuál es la fecha en la que enviarás esta carta?</label>
    <v-text-field 
      type="date"
      dense 
      outlined
      v-model="resignationLetter.generationDate"
      :rules="[
        v => (v.length > 0) || 'Con este campo realizamos acciones importantes en el documento, por favor ingrésalo 😅'
      ]"
    ></v-text-field>
    <label>¿Cuál es tu nombre? *</label>
    <v-text-field 
      dense 
      outlined
      v-model="resignationLetter.dataPerson.name"
      :rules="[v => v.length > 0 || 'Sin esta información tu empresa no sabrá quién está renunciando 😂']"
    ></v-text-field>
    <label>¿Como es tu E-mail o correo electrónico? *</label>
    <v-text-field 
      dense 
      outlined
      v-model="resignationLetter.dataPerson.email"
      :rules="[
        v => v.length > 0 || 'Este campo es de suma importancia, ya que es tu medio de contacto 😁',
        v => /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v) || 'Tu correo electrónico es incorrecto, aquí un ejemplo: ejemplo@generatucarta.com'
      ]"
    ></v-text-field>
    <label>¿Nos podrías decir cuál es tu número celular? *</label>
    <v-text-field 
      dense 
      outlined
      v-model="resignationLetter.dataPerson.cellPhone"
      :rules="[
        v => v.length > 0 || 'Este campo es de suma importancia, ya que es tu medio de contacto 😁',
        v => /^([0-9])+$/.test(v) || 'Ingresa un número celular válido, aquí un ejemplo: 3123456789 😬',
      ]"
    ></v-text-field>
    <label>¿Que cargo desempeñas? *</label>
    <v-text-field 
      dense 
      outlined
      v-model="resignationLetter.dataPerson.position"
      :rules="[v => v.length > 0 || 'Este campo es importante, así sabremos qué poner en la carta 😀']"
    ></v-text-field>
    <label>¿Qué día empezaste a laborar en esta empresa? *</label>
    <v-text-field 
      type="date"
      dense 
      outlined
      v-model="resignationLetter.startDate"
      :rules="[v => v.length > 0 || 'Este campo es importante, así sabremos qué poner en la carta 😀']"
    ></v-text-field>
    <label>¿Cuando dejarás de trabajar en la misma *</label>
    <v-text-field 
      type="date"
      dense 
      outlined
      v-model="resignationLetter.endDate"
      :rules="[v => v.length > 0 || 'Este campo es importante, así sabremos qué poner en la carta 😀']"
    ></v-text-field>
    <label>¿Por qué estás dejando este empleo? *</label>
    <v-textarea 
      dense 
      outlined
      v-model="resignationLetter.reason"
      :rules="[v => v.length > 0 || 'Debes explicar por qué dejas la empresa, así sabrán el talento que están perdiendo 😎']"
    ></v-textarea>
    <label>¿Dejas alguna tarea pendiente? *</label>
    <v-radio-group
      v-model="resignationLetter.pendingTasks"
      row
    >
      <v-radio
        label="Si, tengo tareas pendientes 😪"
        :value="true"
      ></v-radio>
      <v-radio
        label="No, no dejo tareas pendientes 😎"
        :value="false"
      ></v-radio>
    </v-radio-group>
    <label>¿Deseas agrader a alguien?</label>
    <v-radio-group
      v-model="resignationLetter.gratitude"
      row
    >
      <v-radio
        label="Si, tengo a quien agradecer 🧡"
        :value="true"
      ></v-radio>
      <v-radio
        label="No, no deseo hacerlo 🙂"
        :value="false"
      ></v-radio>
    </v-radio-group>
    <div v-show="resignationLetter.gratitude">
      <label>Escribe aquí su(s) nombre(s) y algo mas...</label>
      <v-textarea 
        dense 
        outlined
        v-model="resignationLetter.thanksTo"
        :rules="[v => v.length > 0 || '¿A quién deseas agradecer en la empresa? 🤔']"
      ></v-textarea>
    </div>
    <label>Adjunta tu firma</label>
    <v-file-input 
      v-model="resignationLetter.firm"
      dense 
      outlined 
      accept=".jpg, .png, .jpge"
    />
  </v-form>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'IndexResignationLetter',

    computed: {
      ...mapState(['resignationLetter']),
    },    
  }
</script>
