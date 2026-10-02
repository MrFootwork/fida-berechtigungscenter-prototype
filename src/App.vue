<script setup>
import '@ui5/webcomponents-fiori/dist/ShellBar.js'
import '@ui5/webcomponents-fiori/dist/Page.js'
import '@ui5/webcomponents/dist/TabContainer.js'
import '@ui5/webcomponents/dist/Tab.js'
import '@ui5/webcomponents/dist/BusyIndicator.js'
import '@ui5/webcomponents/dist/MessageStrip.js'
import '@ui5/webcomponents/dist/Title.js'
import '@ui5/webcomponents/dist/Toast.js'
import '@ui5/webcomponents/dist/Button.js'
import { usePermissions } from '@/composables/usePermissions'
import ActivePermissions from '@/components/ActivePermissions.vue'
import PermissionHistory from '@/components/PermissionHistory.vue'
import GrantPermission from '@/components/GrantPermission.vue'

const {
  permissions,
  dataOwners,
  purposes,
  history,
  loading,
  permissionChanged,
  saving,
  toastMessage,
  toastKey,
  updatePermission,
  savePermissions,
} = usePermissions()

const openFidaDemo = () => {
  window.location.assign(
    'https://adesso-sap-dna-sac-sandbox.eu20.analytics.cloud.sap/sap/fpa/ui/app.html#/story2&/s2/C69009F47698490F834B9AB582E67DD5/?mode=view',
  )
}

const handleGrantPermission = async (permission) => {
  updatePermission(permission)
  await savePermissions()
}
</script>

<template>
  <div class="application-layout">
    <ui5-shellbar
      primary-title="FIDA Berechtigungscenter"
      secondary-title="Berechtigungsverwaltung"
    ></ui5-shellbar>

    <ui5-page class="application-page">
      <div slot="header" class="page-heading">
        <div class="page-heading-copy">
          <ui5-title level="H1">Berechtigungscenter</ui5-title>
          <p>Verwalten Sie Ihre aktiven Datenfreigaben.</p>
        </div>
        <div class="page-heading-action">
          <ui5-button accessible-role="Link" @click="openFidaDemo">
            FIDA Kunde Demo öffnen
          </ui5-button>
        </div>
      </div>

      <main class="page-content">
        <ui5-message-strip
          class="save-status"
          v-if="permissionChanged || saving"
          design="Information"
          hide-close-button
        >
          {{ saving ? 'Änderungen werden gespeichert...' : 'Sie haben ungespeicherte Änderungen.' }}
        </ui5-message-strip>

        <ui5-busy-indicator
          v-if="loading"
          class="loading-state"
          active
          size="M"
          text="Berechtigungen werden geladen..."
        >
        </ui5-busy-indicator>

        <ui5-tabcontainer v-else>
          <!-- <ui5-tab text="Freigabe erteilen">
            <GrantPermission
              :data-owners="dataOwners"
              :purposes="purposes"
              :permissions="permissions"
              :saving="saving"
              @change="handleGrantPermission"
            />
          </ui5-tab> -->

          <ui5-tab text="Aktive Freigaben">
            <ActivePermissions
              :permissions="permissions"
              :permission-changed="permissionChanged"
              :saving="saving"
              @change="updatePermission"
              @save="savePermissions"
            />
          </ui5-tab>

          <ui5-tab text="Verlauf">
            <PermissionHistory :history="history" />
          </ui5-tab>
        </ui5-tabcontainer>
      </main>
    </ui5-page>

    <ui5-toast v-if="toastMessage" :key="toastKey" :open="true" duration="5000">
      {{ toastMessage }}
    </ui5-toast>
  </div>
</template>
