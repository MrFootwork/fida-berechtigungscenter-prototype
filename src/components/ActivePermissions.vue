<script setup>
import "@ui5/webcomponents/dist/Switch.js"
import "@ui5/webcomponents/dist/Button.js"
import "@ui5/webcomponents/dist/Table.js"
import "@ui5/webcomponents/dist/TableRow.js"
import "@ui5/webcomponents/dist/TableCell.js"
import "@ui5/webcomponents/dist/TableHeaderRow.js"
import "@ui5/webcomponents/dist/TableHeaderCell.js"

defineProps({
  permissions: {
    type: Array,
    required: true
  },
  permissionChanged: {
    type: Boolean,
    default: false
  },
  saving: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle', 'save'])

const openFidaDemo = () => {
  window.location.assign(
    'https://adesso-sap-dna-sac-sandbox.eu20.analytics.cloud.sap/sap/fpa/ui/app.html#/story2&/s2/C69009F47698490F834B9AB582E67DD5/?mode=view'
  )
}

</script>

<template>
  <section style="margin-bottom: 30px;">
    <h3>Aktive Freigaben</h3>

    <ui5-button
                accessible-role="Link"
                @click="openFidaDemo">
      FIDA Kunde Demo öffnen
    </ui5-button>

    <div class="save-actions">
      <ui5-button
                  design="Emphasized"
                  :disabled="!permissionChanged || saving"
                  @click="emit('save')">
        Speichern
      </ui5-button>
    </div>

    <ui5-table overflow-mode="Popin" accessible-name="Aktive Freigaben">
      <ui5-table-header-row slot="headerRow">
        <ui5-table-header-cell popin-text="Dateninhaber">
          Dateninhaber
        </ui5-table-header-cell>
        <ui5-table-header-cell popin-text="Zweck">
          Zweck
        </ui5-table-header-cell>
        <ui5-table-header-cell popin-text="Kategorie">
          Kategorie
        </ui5-table-header-cell>
        <ui5-table-header-cell popin-text="Status" importance="3">
          Status
        </ui5-table-header-cell>
      </ui5-table-header-row>

      <ui5-table-row v-for="item in permissions" :key="item.id">
        <ui5-table-cell>{{ item.dateninhaber }}</ui5-table-cell>
        <ui5-table-cell>{{ item.zweck }}</ui5-table-cell>
        <ui5-table-cell>{{ item.kategorie }}</ui5-table-cell>
        <ui5-table-cell>
          <ui5-switch
                      class="permission-switch"
                      :checked="item.status"
                      :disabled="saving"
                      :accessible-name="`Status für ${item.dateninhaber}`"
                      @change="emit('toggle', {
                        ...item,
                        status: $event.currentTarget.checked
                      })"></ui5-switch>
          <!-- <span>{{ item.status ? 'Aktiv' : 'Widerrufen' }}</span> -->
        </ui5-table-cell>
      </ui5-table-row>
    </ui5-table>

  </section>
</template>

<style scoped>
.permission-switch {
  padding-left: 0.25rem;
}

.save-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-bottom: .5rem;
}

:deep(.permission-switch::part(slider)) {
  border-radius: 999px;
}

:deep(.permission-switch::part(handle)) {
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
}
</style>