<!-- src/components/PermissionCenter.vue -->
<script setup>
import { ref } from 'vue'
import ToggleSwitch from 'primevue/toggleswitch'
import { usePermissions } from '@/composables/usePermissions'

// Geschäftslogik wird sauber über das Composable eingebunden
const { permissions, history, loading, handleToggle, createPermission } = usePermissions()

const newPerm = ref({
  dateninhaber: 'Bank B',
  produkt: 'Girokonto',
  zweck: 'Finanzübersicht',
  gueltigBis: '1 Jahr'
})

const onSubmit = async () => {
  await createPermission(newPerm.value)
}
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h2>Berechtigungscenter (Modularer Prototyp)</h2>

    <div v-if="loading">Lade Daten...</div>

    <!-- Aktive Freigaben -->
    <section style="margin-bottom: 30px;" v-else>
      <h3>Aktive Freigaben</h3>
      <div v-for="item in permissions" :key="item.id"
           style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px;">
        <p><strong>Dateninhaber:</strong> {{ item.dateninhaber }}</p>
        <p><strong>Produkt:</strong> {{ item.produkt }}</p>
        <p><strong>Zweck:</strong> {{ item.zweck }}</p>
        <p>
          <strong>Status: </strong>
          <ToggleSwitch v-model="item.status" @change="handleToggle(item)" />
          <span style="margin-left: 10px;">{{ item.status ? 'Aktiv' : 'Widerrufen' }}</span>
        </p>
      </div>
    </section>

    <!-- Formular -->
    <section style="margin-bottom: 30px; border-top: 2px solid #eee; padding-top: 20px;">
      <h3>Neue Berechtigung erteilen</h3>
      <div style="display: flex; flex-direction: column; max-width: 400px; gap: 10px;">
        <select v-model="newPerm.dateninhaber">
          <option>Bank B</option>
          <option>Finanzdienstleister C</option>
          <option>Versicherer D</option>
        </select>
        <input type="text" v-model="newPerm.zweck" placeholder="Zweck" />
        <input type="text" v-model="newPerm.produkt" placeholder="Produkt" />
        <button @click="onSubmit" style="padding: 8px; background: #007ad9; color: white; border: none;">
          Freigabe erteilen
        </button>
      </div>
    </section>

    <!-- Historie -->
    <section style="border-top: 2px solid #eee; padding-top: 20px;">
      <h3>Zweijahreshistorie</h3>
      <ul>
        <li v-for="h in history" :key="h.id">
          {{ h.dateninhaber }} – {{ h.produkt }} | <em>{{ h.ereignis }}</em>
        </li>
      </ul>
    </section>
  </div>
</template>