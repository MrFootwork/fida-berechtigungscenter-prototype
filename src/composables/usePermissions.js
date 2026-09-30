// src/composables/usePermissions.js
import { ref, onMounted } from 'vue'
import { permissionService } from '@/services/permissionService'

export function usePermissions() {
  const permissions = ref([])
  const dataOwners = ref([])
  const history = ref([])
  const loading = ref(true)
  const permissionChanged = ref(false)
  const saving = ref(false)
  const toastMessage = ref('')
  const toastKey = ref(0)

  const showToast = (message) => {
    toastMessage.value = message
    toastKey.value += 1
  }

  const loadData = async () => {
    loading.value = true
    const [loadedPermissions, loadedHistory, loadedDataOwners] = await Promise.all([
      permissionService.getPermissions(),
      permissionService.getHistory(),
      permissionService.getDataOwners(),
    ])
    permissions.value = loadedPermissions.map((permission) => ({ ...permission }))
    history.value = loadedHistory
    dataOwners.value = loadedDataOwners
    loading.value = false
  }

  const handleToggle = (updatedItem) => {
    permissions.value = permissions.value.map((permission) =>
      permission.id === updatedItem.id ? { ...permission, status: updatedItem.status } : permission,
    )
    permissionChanged.value = true
  }

  const savePermissions = async () => {
    if (!permissionChanged.value || saving.value) return

    const pendingPermissions = permissions.value.map((permission) => ({ ...permission }))
    permissionChanged.value = false
    saving.value = true

    try {
      const savedData = await permissionService.savePermissions(pendingPermissions)
      permissions.value = savedData.permissions
      history.value = savedData.history
      showToast('Berechtigungen erfolgreich gespeichert.')
    } catch (error) {
      permissionChanged.value = true
      throw error
    } finally {
      saving.value = false
    }
  }

  const createPermission = async (formData) => {
    permissions.value = await permissionService.addPermission(formData)
    showToast('Freigabe erfolgreich erteilt.')
  }

  onMounted(() => {
    loadData()
  })

  return {
    permissions,
    dataOwners,
    history,
    loading,
    permissionChanged,
    saving,
    toastMessage,
    toastKey,
    showToast,
    handleToggle,
    savePermissions,
    createPermission,
  }
}
