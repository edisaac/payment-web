import Vue from 'vue'
import Vuex from 'vuex'
import payuService from '@/services/payuService'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    payudata: {
      merchantId: null,
      accountId: null,
      responseUrl: null,
      confirmationUrl: null,
      webCheckOutUrl: null,
      consumerId: null,
      consumer: null,
      signature: null,
      referenceCode: null,
      amount: null,
      originId: null,
      orderId: null,
      billedAmmount: null,
      arrears: null,
      currency: null,
      tax: null,
      taxReturnBase: null,
      mobilePhone: null,
      payerDocument: null,
      billingAddress: null,
      billingAddress2: null,
      billingCountry: null,
      billingCity: null,
      test: null,
      description: null,
      status: null,
      errorCode: null,
      uuid: null
    }
  },
  mutations: {
    SET_PAYU_DATA(state, payudata) {
      state.payudata = payudata
    }
  },
  actions: {
    createDebt({ commit }, debt) {
      return payuService
        .postDebt(debt)
        .then(response => {
          commit('SET_PAYU_DATA', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  },
  getters: {
    getPayuData: state => {
      return state.payudata
    }
  }
})
