<template>
  <div class="hello">
    <br />
    <form @submit.prevent="createDebt">
      <div class="field">
        <label>externalId</label>
        <input v-model="debt.externalId" type="text" />
      </div>
      <div class="field">
        <label>dueDate</label>
        <input v-model="debt.dueDate" type="text" />
      </div>
      <div class="field">
        <label>description</label>
        <input v-model="debt.description" type="text" />
      </div>
      <div class="field">
        <label>currencyCode</label>
        <input v-model="debt.currencyCode" type="text" />
      </div>
      <div class="field">
        <label>amount</label>
        <input v-model="debt.amount" type="text" />
      </div>
      <div class="field">
        <label>actionOnDueDate</label>
        <input v-model="debt.actionOnDueDate" type="text" />
      </div>
      <div class="field">
        <label>originId</label>
        <input v-model="debt.originId" type="text" />
      </div>
      <div class="field">
        <label>userInsert</label>
        <input v-model="debt.userInsert" type="text" />
      </div>
      <br />
      <div class="field">
        <label>paymentKey</label>
        <input v-model="paymentKey" type="text" />
      </div>
      <br />
      <div class="field">
        <label>
          <b>signature:</b>
        </label>
        <label>
          debt.externalId + '~' +debt.amount +'~' +debt.originId +'~'
          +debt.description +'~' +paymentKey
        </label>
        <br />
        <input
          type="button"
          @click="generateSignature()"
          value="generar firma"
        />
        <input v-model="debt.signature" type="text" readonly />
      </div>
      <br />
      <input
        type="submit"
        class="button -fill-gradient"
        value="Registrar Deuda y Generar Datos PayU"
      />
    </form>
    <br />
    <hr />
    <form
      name="redirect"
      v-bind:action="payudata.webCheckOutUrl"
      method="POST"
      target="_blank"
    >
      <input value="Enviar a PAYU" name="submit" type="submit" />
      <br />
      <br />referenceCode
      <input
        name="referenceCode"
        type="text"
        v-model="payudata.referenceCode"
      />
      <br />extra1
      <input name="extra1" type="text" v-model="payudata.extra1" />

      <br />signature
      <input name="signature" type="text" v-model="payudata.signature" />
      <br />merchantId
      <input name="merchantId" type="text" v-model="payudata.merchantId" />
      <br />accountId
      <input name="accountId" type="text" v-model="payudata.accountId" />
      <br />description
      <input name="description" type="text" v-model="payudata.description" />

      <br />extra2
      <input name="extra2" type="text" v-model="payudata.extra2" />
      <br />extra3
      <input name="extra3" type="text" v-model="payudata.extra3" />
      <br />amount
      <input name="amount" type="text" v-model="payudata.amount" />
      <br />tax
      <input name="tax" type="text" v-model="payudata.tax" />
      <br />taxReturnBase
      <input
        name="taxReturnBase"
        type="text"
        v-model="payudata.taxReturnBase"
      />
      <br />currency
      <input name="currency" type="text" v-model="payudata.currency" />
      <br />buyerEmail
      <input
        name="buyerEmail"
        type="text"
        value="test.pasarela.utec@gmail.com"
      />
      <br />buyerFullName
      <input name="buyerFullName" type="text" value="Test Pasarela" />
      <br />responseUrl
      <input name="responseUrl" type="text" v-model="payudata.responseUrl" />
      <br />confirmationUrl
      <input
        name="confirmationUrl"
        type="text"
        v-model="payudata.confirmationUrl"
      />
      <br />payerMobilePhone
      <input name="payerMobilePhone" type="text" value="969744885" />
      <br />payerFullName
      <input
        name="payerFullName"
        type="text"
        v-model="payudata.payerFullName"
      />
      <br />payerDocument
      <input
        name="payerDocument"
        type="text"
        v-model="payudata.payerDocument"
      />
      <br />billingAddress
      <input
        name="billingAddress"
        type="text"
        v-model="payudata.billingAddress"
      />
      <br />billingAddress2
      <input
        name="billingAddress2"
        type="text"
        v-model="payudata.billingAddress2"
      />
      <br />billingCountry
      <input name="billingCountry" type="text" value="PE" />
      <br />billingCity
      <input name="billingCity" type="text" value="Lima" />
      <br />test
      <input name="test" type="text" v-model="payudata.test" />
      <br />
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { sha256 } from 'js-sha256'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      paymentKey: 'paymentKey123',
      debt: {
        externalId: '999',
        dueDate: '02-01-2019 00:00:00',
        description: 'Prueba',
        currencyCode: 'PEN',
        amount: 100.5,
        actionOnDueDate: 'none',
        originId: 1,
        userInsert: 'caleidos',
        signature: ''
      }
    }
  },
  methods: {
    createDebt() {
      this.$store.dispatch('createDebt', this.debt)
    },
    generateSignature() {
      let hash = sha256.create()
      hash.update(
        this.debt.externalId +
          '~' +
          this.debt.amount +
          '~' +
          this.debt.originId +
          '~' +
          this.debt.description +
          '~' +
          this.paymentKey
      )
      hash.hex()
      this.debt.signature = '' + hash
    }
  },
  computed: { ...mapState(['payudata']) }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.field {
  margin-bottom: 0px;
}
</style>
