import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import router from './router'



import Paginator from 'primevue/paginator';
import Carousel from 'primevue/carousel';
import Image from 'primevue/image';
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Paginator', Paginator);
app.component('Carousel', Carousel);
app.component('Image', Image);
app.mount('#app')
