// src/composables/usePermissions.js
import { ref, onMounted } from 'vue'
import { permissionService } from '@/services/permissionService'

export function usePermissions() {
  const permissions = ref([])
  const dataOwners = ref([])
  const purposes = ref([])
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
    const [loadedPermissions, loadedHistory, loadedDataOwners, loadedPurposes] = await Promise.all([
      permissionService.getPermissions(),
      permissionService.getHistory(),
      permissionService.getDataOwners(),
      permissionService.getPurposes(),
    ])
    permissions.value = loadedPermissions.map((permission) => ({ ...permission }))
    history.value = loadedHistory
    dataOwners.value = loadedDataOwners
    purposes.value = loadedPurposes
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
    const activation = await permissionService.activatePermission(formData.id)

    if (activation) {
      permissions.value = activation.permissions

      if (activation.alreadyActive) {
        showToast('Diese Berechtigung ist bereits aktiv. Es wurden keine Daten geändert.')
        return
      }

      showToast('Freigabe erfolgreich erteilt.')
      return
    }

    permissions.value = await permissionService.addPermission(formData)
    showToast('Freigabe erfolgreich erteilt.')
  }

  onMounted(() => {
    loadData()
  })

  return {
    permissions,
    dataOwners,
    purposes,
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
