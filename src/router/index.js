import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/doctores',
            name: 'doctores',
            component: () => import('../views/DoctoresView.vue')
        },
        {
            path: '/pacientes',
            name: 'pacientes',
            component: () => import('../views/PacientesView.vue')
        },
        {
            path: '/citas',
            name: 'citas',
            component: () => import('../views/CitasView.vue')
        },
        {
            path: '/usuarios',
            name: 'tareas',
            component: () => import('../views/UsuariosView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: {
                header: 1
            }
        }
    ]
})

export default router;