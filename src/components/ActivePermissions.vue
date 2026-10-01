<script setup>
import '@ui5/webcomponents/dist/Switch.js'
import '@ui5/webcomponents/dist/Button.js'
import '@ui5/webcomponents/dist/Table.js'
import '@ui5/webcomponents/dist/TableRow.js'
import '@ui5/webcomponents/dist/TableCell.js'
import '@ui5/webcomponents/dist/TableHeaderRow.js'
import '@ui5/webcomponents/dist/TableHeaderCell.js'
import '@ui5/webcomponents/dist/Title.js'
import '@ui5/webcomponents/dist/Icon.js'
import '@ui5/webcomponents-icons/dist/loan.js'
import '@ui5/webcomponents-icons/dist/money-bills.js'
import '@ui5/webcomponents-icons/dist/insurance-life.js'
import '@ui5/webcomponents-icons/dist/save.js'
import { computed } from 'vue'

const props = defineProps({
  permissions: {
    type: Array,
    required: true,
  },
  permissionChanged: {
    type: Boolean,
    default: false,
  },
  saving: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change', 'save'])

const purposes = [
  { name: 'Kreditoptimierung', icon: 'loan' },
  { name: 'Liquiditätsoptimierung', icon: 'money-bills' },
  { name: 'Vorsorgeüberblick', icon: 'insurance-life' },
]

const permissionGroups = computed(() =>
  purposes.map(({ name, icon }) => ({
    purpose: name,
    icon,
    permissions: props.permissions.filter((item) => item.zweck === name),
  })),
)
</script>

<template>
  <section style="margin-bottom: 30px">
    <div class="permissions-header">
      <h3 class="permissions-title">Aktive Freigaben</h3>
      <ui5-button
        design="Emphasized"
        icon="save"
        :disabled="!permissionChanged || saving"
        @click="emit('save')"
      >
        Speichern
      </ui5-button>
    </div>

    <section
      v-for="group in permissionGroups"
      :key="group.purpose"
      class="permission-group"
      :aria-label="group.purpose"
    >
      <div class="purpose-heading">
        <ui5-icon class="purpose-icon" :name="group.icon" aria-hidden="true"></ui5-icon>
        <ui5-title class="purpose-title" level="H4">
          {{ group.purpose }}
        </ui5-title>
      </div>

      <ui5-table
        v-if="group.permissions.length"
        overflow-mode="Popin"
        :accessible-name="`Freigaben für ${group.purpose}`"
      >
        <ui5-table-header-row slot="headerRow">
          <ui5-table-header-cell popin-text="Dateninhaber"> Dateninhaber </ui5-table-header-cell>
          <ui5-table-header-cell popin-text="Kategorie"> Kategorie </ui5-table-header-cell>
          <ui5-table-header-cell popin-text="Status" importance="3"> Status </ui5-table-header-cell>
        </ui5-table-header-row>

        <ui5-table-row v-for="item in group.permissions" :key="item.id">
          <ui5-table-cell>{{ item.dateninhaber }}</ui5-table-cell>
          <ui5-table-cell>{{ item.kategorie }}</ui5-table-cell>
          <ui5-table-cell>
            <ui5-switch
              class="permission-switch"
              :checked="item.status"
              :disabled="saving"
              :accessible-name="`Status für ${item.dateninhaber}`"
              @change="
                emit('change', {
                  ...item,
                  status: $event.currentTarget.checked,
                })
              "
            ></ui5-switch>
          </ui5-table-cell>
        </ui5-table-row>
      </ui5-table>
      <p v-else class="empty-group">Keine Freigaben für diesen Zweck.</p>
    </section>
  </section>
</template>

<style scoped>
.permission-switch {
  padding-left: 0.25rem;
}

.permissions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.permissions-title {
  margin: 0;
}

.permission-group + .permission-group {
  margin-top: 1.5rem;
}

.purpose-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 0.75rem;
  border-left: 3px solid var(--sapBrandColor);
}

.purpose-icon {
  flex: none;
  width: 1rem;
  height: 1rem;
  color: var(--sapBrandColor);
}

.purpose-title {
  margin: 0;
}

.empty-group {
  padding: 0.75rem 1rem;
  color: var(--sapNeutralTextColor);
  background: var(--sapList_Background);
}

:deep(.permission-switch::part(slider)) {
  border-radius: 999px;
}

:deep(.permission-switch::part(handle)) {
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
}
</style>
