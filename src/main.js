import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// PrimeVue und Theme importieren
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

// PrimeVue mit einem installierten Theme registrieren
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
