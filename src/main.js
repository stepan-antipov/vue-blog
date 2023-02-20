import { createApp } from 'vue'
import App from './App.vue'
import Components from '@/Components/UI'

const app = createApp(App)

Components.forEach((Component) => {
  app.component(Component.name, Component)
})

app.mount('#app')
