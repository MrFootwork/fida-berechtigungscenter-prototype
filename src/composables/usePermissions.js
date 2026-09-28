// src/composables/usePermissions.js
import { ref, onMounted } from 'vue'
import { permissionService } from '@/services/permissionService'

export function usePermissions() {
  const permissions = ref([])
  const history = ref([])
  const loading = ref(false)

  const loadData = async () => {
    loading.value = true
    permissions.value = await permissionService.getPermissions()
    history.value = await permissionService.getHistory()
    loading.value = false
  }

  const handleToggle = async (item) => {
    permissions.value = await permissionService.togglePermission(item.id, item.status)
    history.value = await permissionService.getHistory()
  }

  const createPermission = async (formData) => {
    permissions.value = await permissionService.addPermission(formData)
  }

  onMounted(() => {
    loadData()
  })

  return {
    permissions,
    history,
    loading,
    handleToggle,
    createPermission
  }
}