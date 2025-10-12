notas pendientes
http://localhost:3000/api/galaxia/users/current-user/workitems
cambiar mecanismo de usuarios


FASE 3: WORKFLOW ENGINE - PLAN
MOTOR DE EJECUCIÓN
OBJETIVO: Poder ejecutar instancias de procesos reales

COMPONENTES A CREAR:

text
📁 components/galaxia/
├── InstanceManager.vue          # 👈 Gestor de instancias
├── UserDashboard.vue            # 👈 Panel del usuario
├── ActivityExecutor.vue         # 👈 Ejecutor de actividades
└── WorkitemList.vue             # 👈 Lista de tareas pendientes

📁 views/galaxia/
├── UserDashboardView.vue        # 👈 Vista principal usuario
└── InstanceDetail.vue           # 👈 Detalle de instancia


PLAN USERDASHBOARD:
text
🎯 USERDASHBOARD (Panel de Usuario)
├── WorkitemList.vue          # Lista de tareas pendientes del usuario
├── ActivityExecutor.vue      # Ejecutor de actividades (formularios)
├── InstanceTracker.vue       # Seguimiento de instancias propias
└── DashboardStats.vue        # Estadísticas personales