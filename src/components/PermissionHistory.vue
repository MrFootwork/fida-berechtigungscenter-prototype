<script setup>
import '@ui5/webcomponents/dist/Table.js'
import '@ui5/webcomponents/dist/TableRow.js'
import '@ui5/webcomponents/dist/TableCell.js'
import '@ui5/webcomponents/dist/TableHeaderRow.js'
import '@ui5/webcomponents/dist/TableHeaderCell.js'

defineProps({
  history: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <ui5-table v-if="history.length" overflow-mode="Popin" accessible-name="Berechtigungsverlauf">
    <ui5-table-header-row slot="headerRow">
      <ui5-table-header-cell popin-text="Dateninhaber"> Dateninhaber </ui5-table-header-cell>
      <ui5-table-header-cell popin-text="Produkt"> Produkt </ui5-table-header-cell>
      <ui5-table-header-cell popin-text="Zweck"> Zweck </ui5-table-header-cell>
      <ui5-table-header-cell popin-text="Angeforderte Daten">
        Angeforderte Daten
      </ui5-table-header-cell>
      <ui5-table-header-cell popin-text="Ereignis"> Ereignis </ui5-table-header-cell>
    </ui5-table-header-row>

    <ui5-table-row v-for="entry in history" :key="entry.id">
      <ui5-table-cell>{{ entry.dateninhaber }}</ui5-table-cell>
      <ui5-table-cell>{{ entry.produkt }}</ui5-table-cell>
      <ui5-table-cell>{{ entry.zweck }}</ui5-table-cell>
      <ui5-table-cell>{{ entry.angeforderteFelder.join(', ') }}</ui5-table-cell>
      <ui5-table-cell>{{ entry.ereignis }}</ui5-table-cell>
    </ui5-table-row>
  </ui5-table>
  <p v-else class="history-empty">Es gibt noch keine Einträge im Verlauf.</p>
</template>

<style scoped>
.history-empty {
  padding: 1rem 0;
  color: var(--sapContent_LabelColor, #5b738b);
}
</style>
