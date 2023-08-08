import { createRouter, createWebHistory } from 'vue-router'

import ArtefactDetailView from '@/views/ArtefactDetailView.vue'
import ArtefactListView from '@/views/ArtefactListView.vue'
import AuditDetailView from '@/views/AuditDetailView.vue'
import AuditListView from '@/views/AuditListView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProcessDetailView from '@/views/ProcessDetailView.vue'
import ProcessListView from '@/views/ProcessListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/data',
      name: 'data-list',
      component: ArtefactListView
    },
    {
      path: '/data/:artefactId',
      props: true,
      name: 'data-detail',
      component: ArtefactDetailView
    },
    {
      path: '/job',
      name: 'job-list',
      component: ProcessListView
    },
    {
      path: '/job/:processId',
      props: true,
      name: 'job-detail',
      component: ProcessDetailView
    },
    {
      path: '/run',
      name: 'run-list',
      component: AuditListView
    },
    {
      path: '/job/:processId/run/:auditId',
      props: true,
      name: 'run-detail',
      component: AuditDetailView
    }
  ]
})

export default router
