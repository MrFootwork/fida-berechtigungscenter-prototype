<script setup>
import '@ui5/webcomponents/dist/Button.js'
import '@ui5/webcomponents/dist/Input.js'
import '@ui5/webcomponents/dist/Select.js'
import '@ui5/webcomponents/dist/Option.js'
import '@ui5/webcomponents/dist/RadioButton.js'
import { reactive } from 'vue'

const emit = defineEmits(['create'])

const props = defineProps({
  dataOwners: {
    type: Array,
    required: true,
  },
})

const form = reactive({
  dateninhaber: props.dataOwners[0] ?? '',
  produkt: '',
  kategorie: 'lit. a',
  zweck: 'Kreditoptimierung',
})

const purposeCodes = {
  Kreditoptimierung: 'Z1',
  Liquiditätsoptimierung: 'Z2',
  Vorsorgeüberblick: 'Z3',
}

const createGrant = () => {
  emit('create', {
    ...form,
    zweckCode: purposeCodes[form.zweck],
    angeforderteFelder: [],
    nichtAngefordert: [],
    ergebnis: [],
    gueltigBis: '',
  })
  form.dateninhaber = ''
  form.produkt = ''
}
</script>

<template>
  <section class="grant-permission">
    <h3>Neue Freigabe</h3>
    <form class="grant-form" @submit.prevent="createGrant">
      <fieldset class="data-owner-options">
        <legend>Dateninhaber</legend>
        <ui5-radio-button
          v-for="owner in dataOwners"
          :key="owner"
          name="data-owner"
          :text="owner"
          :value="owner"
          :checked="form.dateninhaber === owner"
          @change="form.dateninhaber = $event.currentTarget.value"
        ></ui5-radio-button>
      </fieldset>

      <label>
        Produkt
        <ui5-input
          :value="form.produkt"
          required
          placeholder="z. B. Girokonto"
          accessible-name="Produkt"
          @input="form.produkt = $event.currentTarget.value"
        ></ui5-input>
      </label>

      <label>
        Zweck
        <ui5-select @change="form.zweck = $event.currentTarget.value">
          <ui5-option value="Kreditoptimierung" selected>Kreditoptimierung</ui5-option>
          <ui5-option value="Liquiditätsoptimierung">Liquiditätsoptimierung</ui5-option>
          <ui5-option value="Vorsorgeüberblick">Vorsorgeüberblick</ui5-option>
        </ui5-select>
      </label>

      <label>
        Kategorie
        <ui5-select @change="form.kategorie = $event.currentTarget.value">
          <ui5-option value="lit. a" selected>lit. a</ui5-option>
          <ui5-option value="lit. b">lit. b</ui5-option>
          <ui5-option value="lit. c">lit. c</ui5-option>
          <ui5-option value="lit. e">lit. e</ui5-option>
        </ui5-select>
      </label>

      <div class="form-actions">
        <ui5-button design="Emphasized" type="Submit">Freigabe erteilen</ui5-button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.grant-permission {
  max-width: 48rem;
  margin-bottom: 30px;
}

.grant-permission h3 {
  margin: 0 0 1rem;
}

.grant-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.grant-form label {
  display: grid;
  gap: 0.375rem;
  font-weight: 600;
}

.data-owner-options {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  border: 0;
}

.data-owner-options legend {
  margin-bottom: 0.5rem;
  padding: 0;
}

.form-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .grant-form {
    grid-template-columns: 1fr;
  }
}
</style>
