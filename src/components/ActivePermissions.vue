<script setup>
import ToggleSwitch from 'primevue/toggleswitch'
import "@ui5/webcomponents/dist/Switch.js"

defineProps({
  permissions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <section style="margin-bottom: 30px;">
    <h3>Aktive Freigaben</h3>
    <!-- <div v-for="dataOwner in source">

    </div> -->
    <div
         v-for="item in permissions"
         :key="item.id"
         style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px;">
      <p><strong>Dateninhaber:</strong> {{ item.dateninhaber }}</p>
      <p><strong>Zweck:</strong> {{ item.zweck }}</p>
      <p><strong>Kategorie:</strong> {{ item.kategorie }}</p>
      <p>
        <strong>Status: </strong>
        <!-- <ToggleSwitch
                      :model-value="item.status"
                      @update:model-value="emit('toggle', { ...item, status: $event })" /> -->
        <ui5-switch
                    :checked="item.status"
                    @change="emit('toggle', {
                      ...item,
                      status: $event.currentTarget.checked
                    })"></ui5-switch>
        <span style="margin-left: 10px;">{{ item.status ? 'Aktiv' : 'Widerrufen' }}</span>
      </p>
    </div>
  </section>
</template>