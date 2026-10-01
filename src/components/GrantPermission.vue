<script setup>
import '@ui5/webcomponents/dist/Button.js'
import '@ui5/webcomponents/dist/RadioButton.js'
import '@ui5/webcomponents/dist/Table.js'
import '@ui5/webcomponents/dist/TableRow.js'
import '@ui5/webcomponents/dist/TableCell.js'
import '@ui5/webcomponents/dist/TableHeaderRow.js'
import '@ui5/webcomponents/dist/TableHeaderCell.js'
import { computed, reactive, ref } from 'vue'

const emit = defineEmits(['change'])

const props = defineProps({
  dataOwners: {
    type: Array,
    required: true,
  },
  purposes: {
    type: Array,
    required: true,
  },
  permissions: {
    type: Array,
    required: true,
  },
  saving: {
    type: Boolean,
    default: false,
  },
})

const form = reactive({
  dateninhaber: '',
  zweck: '',
})

const permissionOptions = props.permissions.map((permission) => ({
  ...permission,
  angeforderteFelder: [...permission.angeforderteFelder],
  nichtAngefordert: [...permission.nichtAngefordert],
  ergebnis: [...permission.ergebnis],
}))
const selectedPermissionId = ref('')

const matchingPermissions = computed(() =>
  permissionOptions.filter(
    (permission) =>
      permission.dateninhaber === form.dateninhaber && permission.zweck === form.zweck,
  ),
)

const selectedPermission = computed(() =>
  matchingPermissions.value.find((permission) => permission.id === selectedPermissionId.value),
)
const selectionIncomplete = computed(() => !form.dateninhaber || !form.zweck)

const updateSelection = (field, value) => {
  form[field] = value
  selectedPermissionId.value = ''
}

const createGrant = () => {
  if (!selectedPermission.value) return

  emit('change', {
    ...selectedPermission.value,
    status: true,
  })
  selectedPermissionId.value = ''
}
</script>

<template>
  <section class="grant-permission">
    <h3>Neue Freigabe</h3>
    <form class="grant-form" @submit.prevent="createGrant">
      <div class="selection-groups">
        <fieldset class="form-options">
          <legend>Dateninhaber</legend>
          <ui5-radio-button
            v-for="owner in dataOwners"
            :key="owner"
            name="data-owner"
            :text="owner"
            :value="owner"
            :checked="form.dateninhaber === owner"
            @change="updateSelection('dateninhaber', $event.currentTarget.value)"
          ></ui5-radio-button>
        </fieldset>

        <fieldset class="form-options">
          <legend>Zweck</legend>
          <ui5-radio-button
            v-for="purpose in purposes"
            :key="purpose.zweck"
            name="permission-purpose"
            :text="purpose.zweck"
            :value="purpose.zweck"
            :checked="form.zweck === purpose.zweck"
            @change="updateSelection('zweck', $event.currentTarget.value)"
          ></ui5-radio-button>
        </fieldset>
      </div>

      <section class="permission-options" aria-label="Mögliche Berechtigungsobjekte">
        <h4>Mögliche Berechtigungen</h4>
        <p v-if="selectionIncomplete" class="empty-options">
          Bitte wählen Sie einen Dateninhaber und einen Zweck aus.
        </p>
        <ui5-table
          v-else-if="matchingPermissions.length"
          overflow-mode="Popin"
          accessible-name="Berechtigungsobjekte für die ausgewählte Kombination"
        >
          <ui5-table-header-row slot="headerRow">
            <ui5-table-header-cell popin-text="Auswahl">Auswahl</ui5-table-header-cell>
            <ui5-table-header-cell popin-text="Produkt">Produkt</ui5-table-header-cell>
            <ui5-table-header-cell popin-text="Kategorie">Kategorie</ui5-table-header-cell>
            <ui5-table-header-cell popin-text="Angeforderte Daten">
              Angeforderte Daten
            </ui5-table-header-cell>
          </ui5-table-header-row>

          <ui5-table-row v-for="permission in matchingPermissions" :key="permission.id">
            <ui5-table-cell>
              <ui5-radio-button
                name="permission-option"
                text="Auswählen"
                :accessible-name="`${permission.produkt}, ${permission.kategorie} auswählen`"
                :value="permission.id"
                :checked="selectedPermissionId === permission.id"
                @change="selectedPermissionId = $event.currentTarget.value"
              ></ui5-radio-button>
            </ui5-table-cell>
            <ui5-table-cell>{{ permission.produkt }}</ui5-table-cell>
            <ui5-table-cell>{{ permission.kategorie }}</ui5-table-cell>
            <ui5-table-cell>{{ permission.angeforderteFelder.join(', ') }}</ui5-table-cell>
          </ui5-table-row>
        </ui5-table>
        <p v-else class="empty-options">
          Für diese Kombination gibt es kein Berechtigungsobjekt zur Auswahl.
        </p>
      </section>

      <div class="form-actions">
        <ui5-button design="Emphasized" type="Submit" :disabled="!selectedPermission || saving">
          Freigabe erteilen
        </ui5-button>
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selection-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.form-options {
  flex: 1 1 17rem;
  min-width: 0;
  display: grid;
  margin: 0;
  padding: 0;
  border: 0;
}

.form-options legend {
  margin-bottom: 0.5rem;
  padding: 0;
}

.permission-options h4 {
  margin: 0 0 0.75rem;
}

.empty-options {
  margin: 0;
  padding: 0.75rem 1rem;
  color: var(--sapNeutralTextColor);
  background: var(--sapList_Background);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}
</style>
