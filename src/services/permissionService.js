// src/services/permissionService.js

// Interne Mock-Daten
let dataOwners = [
  'Bank B',
  'Finanzdienstleister C',
  'Versicherer D',
  'Einrichtung E'
]

let permissions = [
  {
    id: '1',
    dateninhaber: 'Versicherer D',
    produkt: 'Hausrat- und Kfz-Versicherung',
    zweck: 'Liquiditätsoptimierung',
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
  },
  {
    id: '21',
    dateninhaber: 'Bank B',
    produkt: 'Tagesgeld, Festgeld',
    zweck: 'Liquiditätsoptimierung',
    gueltigBis: '2027-08-26',
    status: true
  },
  {
    id: '3',
    dateninhaber: 'Finanzdienstleister C',
    produkt: 'Depot, ETF-Sparplan',
    zweck: 'Liquiditätsoptimierung',
    gueltigBis: '2027-08-26',
    status: true
  },
  {
    id: '4',
    dateninhaber: 'Einrichtung E',
    produkt: 'Anwartschaft',
    zweck: 'Vorsorgeüberblick',
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

const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 500))

export const permissionService = {
  async getDataOwners() {
    await simulateApiDelay()
    return [...dataOwners]
  },

  async getPermissions() {
    await simulateApiDelay()
    return [...permissions]
  },

  async getHistory() {
    await simulateApiDelay()
    return [...history]
  },

  async togglePermission(id, newStatus) {
    await simulateApiDelay()
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
    await simulateApiDelay()
    permissions.push({
      id: Date.now().toString(),
      ...newPermData,
      status: true
    })
    return [...permissions]
  }
}