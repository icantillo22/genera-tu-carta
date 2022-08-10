<template>
  <div>
    <v-card elevation="3">
      <v-container class="px-10 py-15">
        <v-row>
          <v-col class="text-right">
            {{ resignationLetter.city || 'Ciudad' }}, a {{ formatDateToText(resignationLetter.generationDate, 'la fecha creción carta') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <b :class="!resignationLetter?.dataPerson.name ? 'underlined' : ''">{{ resignationLetter.dataPerson.name || 'Tu nombre' }}</b><br />
            <b :class="!resignationLetter?.dataPerson.position ? 'underlined' : ''">{{ resignationLetter.dataPerson.position || 'Cargo que desempeñas' }}</b><br />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-justify">
            Por este medio, me permito informarle que presento mi renuncia con carácter 
            irrevocable al puesto de <b :class="!resignationLetter?.dataPerson.position ? 'underlined' : ''">{{ resignationLetter.dataPerson.position || 'cargo que desempeñas' }}</b>, cargo que he desempeñado 
            desde el <b :class="!resignationLetter?.startDate ? 'underlined' : ''">{{ formatDateToText(resignationLetter.startDate, 'día que comenzaste a trabajar') }}</b> 
            y que se hará efectiva a partir del día <b :class="!resignationLetter?.endDate ? 'underlined' : ''">{{ formatDateToText(resignationLetter.endDate, 'en que dejarás de trabajar') }}.</b>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-justify">
            Lo anterior debido a que <span :class="!resignationLetter?.reason ? 'underlined' : ''">{{ resignationLetter.reason || '"Razón por la cuál te irás de este trabajo".' }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-justify">
            Por otro lado, le manifiesto que, {{existPendingTasks}}. Asimismo, hago de su conocimiento que en virtud de esta renuncia 
            voluntaria no me reservo acción o derecho que ejercita de ninguna naturaleza en el 
            futuro, ni en contra suya ni de la unidad administrativa o de la empresa.
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-justify">
            Sin más por el momento, agradezco las atenciones brindadas por todos{{ resignationLetter.gratitude && resignationLetter.thanksTo ? ', en especial a' : '' }} 
            <b>{{ resignationLetter.gratitude && resignationLetter.thanksTo ? `${resignationLetter.thanksTo}` : '' }}</b>
            {{ resignationLetter.gratitude && resignationLetter.thanksTo ? 'por ayudarme a realizar las labores' : 'para el desarrollo' }} de mi cargo, 
            así como la oportunidad de haberme permitido ser parte de este equipo. 
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <p><b>ATENTAMENTE</b></p>
            <div v-show="resignationLetter.firm">
              <v-img 
                class="mx-auto"
                contain
                width="300" 
                height="100"
                lazy-src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Firma_Sandy_Camila_godoy.png" 
                :src="convertFirmToUrl"
              />
              <div class="mx-auto mb-2" style="max-width: 15rem; height: 1px; background: black;"></div>
            </div>
            <b :class="!resignationLetter?.dataPerson.name ? 'underlined' : ''">{{ resignationLetter.dataPerson.name || 'Tu nombre' }}</b><br />
            <b :class="!resignationLetter?.dataPerson.email ? 'underlined' : ''">{{ resignationLetter.dataPerson.email || 'Tu dirección de correo electrónico' }}</b><br />
            <b :class="!resignationLetter?.dataPerson.cellPhone ? 'underlined' : ''">{{ resignationLetter.dataPerson.cellPhone || 'Tu número de teléfono celular' }}</b><br />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div class="mt-3 d-flex justify-center">
      <v-btn 
        v-show="!showFloatingActionButton"
        dark
        color="pink"
        @click="methodGeneratePDF"
        :loading="isLoading"
      >
        Descargar PDF
      </v-btn>
      <v-fab-transition>
        <v-btn
          v-show="showFloatingActionButton"
          color="pink"
          dark
          fixed
          bottom
          right
          fab
          large
          @click="methodGeneratePDF"
          :loading="isLoading"
        >
          <v-icon>{{ icons.mdiDownload }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>

    <snackbar-alert 
      :data-alert="dataSnackbarAlert" 
      ref="snackbarAlert"
    />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import moment from "moment";
  import snackbarAlert from '@/components/common/alerts/snackbarAlert.vue';
  import validateData from '@/helpers/validateData';
  import { mdiDownload } from '@mdi/js';

  export default {
    components: { snackbarAlert },
    name: 'PreviewResignationLetter',
  
    computed: {
      ...mapState(['resignationLetter']),

      existPendingTasks() {
        let text = ''

        if (this.resignationLetter.pendingTasks) {
          text = 'si bien quedan algunos pendientes correspondientes a mis tareas, cumpliré con mis compromisos hasta el día de la dimisión'
        }else {
          text = 'he cumplido con mis compromisos y seguiré cumpliéndolos hasta el día de mi dimisión'
        }

        return text
      },

      convertFirmToUrl() {
        return  this.resignationLetter.firm ? URL.createObjectURL(this.resignationLetter.firm) : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Firma_Sandy_Camila_godoy.png'
      },

      showFloatingActionButton() {
        return ['md', 'sm', 'xs'].includes(this.$vuetify.breakpoint.name);
      }
    },
    data: () => ({
      icons: {mdiDownload},
      moment,
      isLoading: false,
      dataSnackbarAlert: {
        text: '',
      }
    }),
    
    methods: {
      ...mapActions('resignationLetter', ['generatePDF']),

      formatDateToText(date, placeholder) {
        return date ? moment(date).format('D [de] MMMM [del] YYYY') : placeholder
      },

      async methodGeneratePDF() {
        try {
          const data = {
            city: {
              type: 'text',
              value: this.resignationLetter.city,
              validate: true,
              fieldName: 'Ciudad',
            },
            dataPerson: {
              name: {
                type: 'text',
                value: this.resignationLetter.dataPerson.name,
                validate: true,
                fieldName: 'Nombre',
              },
              position: {
                type: 'text',
                value: this.resignationLetter.dataPerson.position,
                validate: true,
                fieldName: 'Puesto de trabajo',
              },
              email: {
                type: 'email',
                value: this.resignationLetter.dataPerson.email,
                validate: true,
                fieldName: 'Email',
              },
              cellPhone: {
                type: 'phone',
                value: this.resignationLetter.dataPerson.cellPhone,
                validate: true,
                fieldName: 'Número celular',
              },
            },
            startDate: {
              type: 'text',
              value: this.resignationLetter.startDate,
              validate: true,
              fieldName: 'Fecha en que inició a laborar',
            },
            endDate: {
              type: 'text',
              value: this.resignationLetter.endDate,
              validate: true,
              fieldName: 'Fecha en que finalizará su labor',
            },
            reason: {
              type: 'text',
              value: this.resignationLetter.reason,
              validate: true,
              fieldName: 'Motivo por el cuál te se irá',
            },
            pendingTasks: {
              type: 'bool',
              value: this.resignationLetter.pendingTasks,
              validate: false,
              fieldName: 'Tareas pendientes',
            },
            gratitude: {
              type: 'bool',
              value: this.resignationLetter.gratitude,
              validate: true,
              fieldName: 'Agradecimiento',
            },
            thanksTo: {
              type: 'text',
              value: this.resignationLetter.thanksTo,
              validate: false,
              fieldName: 'Personas a agradecer',
            },
            firm: {
              type: 'file',
              value: this.resignationLetter.firm,
              validate: false,
              fieldName: 'Firma',
            },
          }

          const validations = validateData(data);

          if(validations?.error) {
            this.dataSnackbarAlert.text = validations.message
            this.$refs.snackbarAlert.toogleAlert(true)

            return false
          }
          
          this.isLoading = true;
          const res = await this.generatePDF(this.resignationLetter);
          this.isLoading = false;
          
          window.open(res.url, '_blank')
        } catch (error) {
          this.isLoading = false;
          console.log(error.message)
        }
      }
    }
  }
</script>
<style scoped>
  .underlined {
    text-decoration: underline;
  }
</style>