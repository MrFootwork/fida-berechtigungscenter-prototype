// src/services/permissionService.js

// Interne Mock-Daten
let permissions = [
  {
    id: 'PRM-Z1-B',
    zweckCode: 'Z1',
    dateninhaber: 'Externe Bank',
    produkt: 'Ratenkredit',
    kategorie: 'lit. a',
    zweck: 'Kreditoptimierung',
    angeforderteFelder: ['Restschuld', 'Effektivzins', 'Rate', 'Restlaufzeit'],
    nichtAngefordert: ['Transaktionen'],
    ergebnis: ['Konditionsvergleich'],
    gueltigBis: '2027-08-26',
    status: false,
  },
  {
    id: 'PRM-Z2-B',
    zweckCode: 'Z2',
    dateninhaber: 'Externe Bank',
    produkt: 'Tagesgeld, Festgeld',
    kategorie: 'lit. a',
    zweck: 'Liquiditätsoptimierung',
    angeforderteFelder: ['Saldo', 'Konditionen'],
    nichtAngefordert: ['Transaktionen'],
    ergebnis: ['Konditionsvergleich', 'Übersicht'],
    gueltigBis: '2027-08-26',
    status: false,
  },
  {
    id: 'PRM-Z2-C',
    zweckCode: 'Z2',
    dateninhaber: 'Wertpapierfirma',
    produkt: 'Depot, ETF-Sparplan',
    kategorie: 'lit. b',
    zweck: 'Liquiditätsoptimierung',
    angeforderteFelder: ['Bestandswert', 'Sparrate'],
    nichtAngefordert: ['Eignungsdaten'],
    ergebnis: ['Übersicht'],
    gueltigBis: '2027-08-26',
    status: false,
  },
  {
    id: 'PRM-Z2-D',
    zweckCode: 'Z2',
    dateninhaber: 'Versicherer',
    produkt: 'Hausrat, Kfz',
    kategorie: 'lit. e',
    zweck: 'Liquiditätsoptimierung',
    angeforderteFelder: ['Vertragsart', 'Prämie'],
    nichtAngefordert: ['Schadenhistorie', 'Bedarfsanalyse'],
    ergebnis: ['Übersicht', 'feste Auszahlungen'],
    gueltigBis: '2027-08-26',
    status: false,
  },
  {
    id: 'PRM-Z3-E',
    zweckCode: 'Z3',
    dateninhaber: 'Altersversorge GmbH',
    produkt: 'Anwartschaft',
    kategorie: 'lit. c',
    zweck: 'Vorsorgeüberblick',
    angeforderteFelder: ['Anwartschaftshöhe', 'Rentenbeginn'],
    nichtAngefordert: [],
    ergebnis: ['Anzeige'],
    gueltigBis: '2027-08-26',
    status: false,
  },
]

const dataOwners = [...new Set(permissions.map(({ dateninhaber }) => dateninhaber))]

let history = [
  // {
  //   id: 'h-1',
  //   dateninhaber: 'Wertpapierfirma',
  //   produkt: 'Depot, ETF-Sparplan',
  //   angeforderteFelder: ['Bestandswert', 'Sparrate'],
  //   zweck: 'Liquiditätsoptimierung',
  //   ereignis: 'Widerrufen am 15.01.2026',
  // },
]

const simulateApiDelay = () => new Promise((resolve) => setTimeout(resolve, 800))

export const permissionService = {
  async getDataOwners() {
    await simulateApiDelay()
    return [...dataOwners]
  },

  async getPurposes() {
    await simulateApiDelay()
    return [
      ...new Map(permissions.map(({ zweck, zweckCode }) => [zweck, { zweck, zweckCode }])).values(),
    ]
  },

  async getPermissions() {
    await simulateApiDelay()
    return [...permissions]
  },

  async getHistory() {
    await simulateApiDelay()
    return [...history]
  },

  async savePermissions(updatedPermissions) {
    await simulateApiDelay()

    updatedPermissions.forEach((updatedPermission) => {
      const previousPermission = permissions.find(
        (permission) => permission.id === updatedPermission.id,
      )

      if (previousPermission && previousPermission.status !== updatedPermission.status) {
        history.unshift({
          id: `${Date.now()}-${updatedPermission.id}`,
          dateninhaber: updatedPermission.dateninhaber,
          produkt: updatedPermission.produkt,
          angeforderteFelder: [...updatedPermission.angeforderteFelder],
          zweck: updatedPermission.zweck,
          ereignis: `${updatedPermission.status ? 'Erteilt' : 'Widerrufen'} am ${new Date().toLocaleDateString()}`,
        })
      }
    })

    permissions = updatedPermissions.map((permission) => ({ ...permission }))

    return {
      permissions: permissions.map((permission) => ({ ...permission })),
      history: [...history],
    }
  },
}
