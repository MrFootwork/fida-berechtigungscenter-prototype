<!-- src/components/PermissionCenter.vue -->
<script setup>
import { ref } from 'vue'
import "@ui5/webcomponents/dist/Toast.js"
import { usePermissions } from '@/composables/usePermissions'
import ActivePermissions from '@/components/ActivePermissions.vue'

// Geschäftslogik wird sauber über das Composable eingebunden
const {
  permissions,
  history,
  loading,
  permissionChanged,
  saving,
  toastMessage,
  toastKey,
  handleToggle,
  savePermissions,
  createPermission
} = usePermissions()

const newPerm = ref({
  dateninhaber: 'Externe Bank',
  produkt: 'Girokonto',
  zweck: 'Finanzübersicht',
  gueltigBis: '1 Jahr'
})

const onSubmit = async () => {
  await createPermission(newPerm.value)
}
</script>

<template>
  <div>
    <h2>Berechtigungsmaske</h2>

    <div v-if="loading">Lade Daten...</div>

    <ActivePermissions
                       v-else
                       :permissions="permissions"
                       :permission-changed="permissionChanged"
                       :saving="saving"
                       @toggle="handleToggle"
                       @save="savePermissions" />

    <ui5-toast
               v-if="toastMessage"
               :key="toastKey"
               :open="true"
               duration="5000">
      {{ toastMessage }}
    </ui5-toast>

    <!-- Formular -->
    <!-- <section style="margin-bottom: 30px; border-top: 2px solid #eee; padding-top: 20px;">
      <h3>Neue Berechtigung erteilen</h3>
      <div style="display: flex; flex-direction: column; max-width: 400px; gap: 10px;">
        <label for="dateninhaber">Dateninhaber</label>
        <select id="dateninhaber" v-model="newPerm.dateninhaber">
          <option>Inhouse Bank</option>
          <option>Externe Bank</option>
          <option>Wertpapierfirma</option>
          <option>Versicherer</option>
          <option>Altersversorge GmbH</option>
        </select>
        <label for="zweck">Zweck</label>
        <input id="zweck" type="text" v-model="newPerm.zweck" placeholder="Zweck" />
        <label for="produkt">Produkt</label>
        <input id="produkt" type="text" v-model="newPerm.produkt" placeholder="Produkt" />
        <button @click="onSubmit" style="padding: 8px; background: #007ad9; color: white; border: none;">
          Freigabe erteilen
        </button>
      </div>
    </section> -->

    <!-- Historie -->
    <!-- <section style="border-top: 2px solid #eee; padding-top: 20px;">
      <h3>Zweijahreshistorie</h3>
      <ul>
        <li v-for="h in history" :key="h.id">
          {{ h.dateninhaber }} – {{ h.produkt }} | <em>{{ h.ereignis }}</em>
        </li>
      </ul>
    </section> -->
  </div>
</template>