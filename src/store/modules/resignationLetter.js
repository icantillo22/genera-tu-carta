/* eslint-disable no-unused-vars */
import * as API from '../../helpers/api'
import moment from 'moment'

export default {
  namespaced: true,
  
  state: {
    city: '',
    generationDate: '',
    dataPerson: {
      name: '',
      position: '',
      email: '',
      cellPhone: '',
    },
    startDate: '',
    endDate: '',
    reason: '',
    pendingTasks: false,
    gratitude: false,
    thanksTo: '',
    firm: null,
  },
  mutations: {
  },
  actions: {
    async generatePDF({commit}, payload) {
      try {      
        const formData = new FormData()

        formData.append("city", payload.city)
        formData.append("generationDate", moment(payload.generationDate).format('D [de] MMMM [del] YYYY'))
        formData.append("dataPerson", JSON.stringify(payload.dataPerson))
        formData.append("startDate", moment(payload.startDate).format('D [de] MMMM [del] YYYY'))
        formData.append("endDate", moment(payload.endDate).format('D [de] MMMM [del] YYYY'))
        formData.append("reason", payload.reason)
        formData.append("pendingTasks", payload.pendingTasks)
        formData.append("gratitude", payload.gratitude)
        formData.append("thanksTo", payload.thanksTo)
        formData.append("firm", payload.firm)

        const res = await API.sendData('job-letters', '/resignation', formData)
        
        return res
    } catch (error) {
        return error
    }
    }
  },
}