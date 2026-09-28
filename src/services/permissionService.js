// src/services/permissionService.js

// Interne Mock-Daten
let permissions = [
  {
    id: '1',
    dateninhaber: 'Versicherer D',
    produkt: 'Hausrat- und Kfz-Versicherung',
    zweck: 'Vorsorge-Überblick / Finanzanalyse',
    gueltigBis: '2027-08-26',
    status: true
  },
  {
    id: '2',
    dateninhaber: 'Bank B',
    produkt: 'Ratenkredit',
    zweck: 'Kreditoptimierung',
    gueltigBis: '2027-08-26',
    status: true
  }
]

let history = [
  {
    id: 'h-1',
    dateninhaber: 'Finanzdienstleister C',
    produkt: 'Depot, ETF-Sparplan',
    zweck: 'Liquiditätsoptimierung',
    ereignis: 'Widerrufen am 15.01.2026'
  }
]

export const permissionService = {
  async getPermissions() {
    return [...permissions]
  },

  async getHistory() {
    return [...history]
  },

  async togglePermission(id, newStatus) {
    const item = permissions.find(p => p.id === id)
    if (item) {
      item.status = newStatus
      if (!newStatus) {
        history.unshift({
          id: Date.now().toString(),
          dateninhaber: item.dateninhaber,
          produkt: item.produkt,
          zweck: item.zweck,
          ereignis: `Widerrufen am ${new Date().toLocaleDateString()}`
        })
      }
    }
    return [...permissions]
  },

  async addPermission(newPermData) {
    permissions.push({
      id: Date.now().toString(),
      ...newPermData,
      status: true
    })
    return [...permissions]
  }
}