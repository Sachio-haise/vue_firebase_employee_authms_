import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";


let app;
const auth = getAuth();
onAuthStateChanged(auth,(user) => {
  if (!app) {
    app = createApp(App)
    app.use(router)

    app.mount('#app')
  }
});



