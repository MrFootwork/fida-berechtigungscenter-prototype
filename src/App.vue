<script setup>
import "@ui5/webcomponents-fiori/dist/ShellBar.js"
import "@ui5/webcomponents-fiori/dist/Page.js"
import "@ui5/webcomponents/dist/TabContainer.js"
import "@ui5/webcomponents/dist/Tab.js"
import "@ui5/webcomponents/dist/BusyIndicator.js"
import "@ui5/webcomponents/dist/MessageStrip.js"
import "@ui5/webcomponents/dist/Table.js"
import "@ui5/webcomponents/dist/TableRow.js"
import "@ui5/webcomponents/dist/TableCell.js"
import "@ui5/webcomponents/dist/TableHeaderRow.js"
import "@ui5/webcomponents/dist/TableHeaderCell.js"
import "@ui5/webcomponents/dist/Title.js"
import "@ui5/webcomponents/dist/Toast.js"
import { usePermissions } from '@/composables/usePermissions'
import ActivePermissions from '@/components/ActivePermissions.vue'

const {
  permissions,
  history,
  loading,
  permissionChanged,
  saving,
  toastMessage,
  toastKey,
  handleToggle,
  savePermissions
} = usePermissions()
</script>

<template>
  <div class="application-layout">
    <ui5-shellbar
                  primary-title="FIDA Berechtigungscenter"
                  secondary-title="Berechtigungsverwaltung"></ui5-shellbar>

    <ui5-page class="application-page">
      <div slot="header" class="page-heading">
        <ui5-title level="H1">Berechtigungscenter</ui5-title>
        <p>Verwalten Sie Ihre aktiven Datenfreigaben.</p>
      </div>

      <main class="page-content">
        <ui5-message-strip
                           v-if="permissionChanged || saving"
                           design="Information"
                           hide-close-button>
          {{ saving ? 'Änderungen werden gespeichert...' : 'Sie haben ungespeicherte Änderungen.' }}
        </ui5-message-strip>

        <ui5-busy-indicator
                            v-if="loading"
                            class="loading-state"
                            active
                            size="M"
                            text="Berechtigungen werden geladen..."></ui5-busy-indicator>

        <ui5-tabcontainer v-else>
          <ui5-tab text="Aktive Freigaben">
            <ActivePermissions
                               :permissions="permissions"
                               :permission-changed="permissionChanged"
                               :saving="saving"
                               @toggle="handleToggle"
                               @save="savePermissions" />
          </ui5-tab>

          <ui5-tab text="Verlauf">
            <ui5-table
                       v-if="history.length"
                       overflow-mode="Popin"
                       accessible-name="Berechtigungsverlauf">
              <ui5-table-header-row slot="headerRow">
                <ui5-table-header-cell popin-text="Dateninhaber">
                  Dateninhaber
                </ui5-table-header-cell>
                <ui5-table-header-cell popin-text="Produkt">
                  Produkt
                </ui5-table-header-cell>
                <ui5-table-header-cell popin-text="Zweck">
                  Zweck
                </ui5-table-header-cell>
                <ui5-table-header-cell popin-text="Ereignis">
                  Ereignis
                </ui5-table-header-cell>
              </ui5-table-header-row>

              <ui5-table-row v-for="entry in history" :key="entry.id">
                <ui5-table-cell>{{ entry.dateninhaber }}</ui5-table-cell>
                <ui5-table-cell>{{ entry.produkt }}</ui5-table-cell>
                <ui5-table-cell>{{ entry.zweck }}</ui5-table-cell>
                <ui5-table-cell>{{ entry.ereignis }}</ui5-table-cell>
              </ui5-table-row>
            </ui5-table>
            <p v-else class="history-empty">Es gibt noch keine Einträge im Verlauf.</p>
          </ui5-tab>
        </ui5-tabcontainer>
      </main>
    </ui5-page>

    <ui5-toast
               v-if="toastMessage"
               :key="toastKey"
               :open="true"
               duration="5000">
      {{ toastMessage }}
    </ui5-toast>
  </div>
</template>