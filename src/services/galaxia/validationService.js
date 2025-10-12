// services/galaxia/validationService.js
class ValidationService {
  validateProcess(processId, activities, transitions, roles) {
    const errors = []
    const warnings = []

    console.log(`\n🔍 Validando proceso ${processId}`, {
      actividades: activities.length,
      transiciones: transitions.length,
      roles: roles.length
    })

    // 1. VALIDACIÓN ESTRUCTURAL
    const structuralErrors = this.validateStructure(activities)
    errors.push(...structuralErrors)

    // 2. VALIDACIÓN DE CONECTIVIDAD
    const connectivityErrors = this.validateConnectivity(activities, transitions)
    errors.push(...connectivityErrors)

    // 3. VALIDACIÓN DE ROLES
    const roleErrors = this.validateRoles(activities, roles)
    errors.push(...roleErrors)

    // 4. VALIDACIÓN DE RUTING
    const routingErrors = this.validateRouting(activities, transitions)
    errors.push(...routingErrors)

    // 5. DETECCIÓN DE CICLOS (solo warning)
    const hasCycles = this.detectCycles(activities, transitions)
    if (hasCycles) {
      warnings.push('El proceso contiene ciclos potenciales - revisar lógica del flujo')
    }

    const isValid = errors.length === 0

    console.log(`✅ Validación completada: ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`, {
      errores: errors.length,
      advertencias: warnings.length
    })

    return {
      isValid,
      errors,
      warnings,
      timestamp: Math.floor(Date.now() / 1000),
      summary: {
        totalActivities: activities.length,
        totalTransitions: transitions.length,
        startActivities: activities.filter(a => a.type === 'start').length,
        endActivities: activities.filter(a => a.type === 'end').length,
        interactiveActivities: activities.filter(a => a.isInteractive === 'y').length,
        standaloneActivities: activities.filter(a => a.type === 'standalone').length,
        activitiesWithRoles: activities.filter(a => this.getActivityRoles(a.activityId, roles).length > 0).length
      }
    }
  }

  validateStructure(activities) {
    console.log("🔧 Validando estructura...")
    const errors = []

    // Múltiples actividades de inicio permitidas
    const startActivities = activities.filter(a => a.type === 'start')    
    if (startActivities.length === 0) {
      errors.push('PROC_STRUCT_001: El proceso debe tener al menos una actividad de INICIO')
    }

    // Debe tener al menos 1 actividad de fin
    const endActivities = activities.filter(a => a.type === 'end')
    if (endActivities.length === 0) {
      errors.push('PROC_STRUCT_002: El proceso debe tener al menos una actividad de FIN')
    }

    // Validar nombres duplicados
    const nameCounts = {}
    activities.forEach(activity => {
      const normalizedName = activity.name.toLowerCase().trim()
      nameCounts[normalizedName] = (nameCounts[normalizedName] || 0) + 1
    })
    
    const duplicateNames = Object.keys(nameCounts).filter(name => nameCounts[name] > 1)
    if (duplicateNames.length > 0) {
      errors.push(`PROC_STRUCT_003: Nombres duplicados: ${duplicateNames.join(', ')}`)
    }

    return errors
  }

  validateConnectivity(activities, transitions) {
    console.log("🔗 Validando conectividad...")
    const errors = []
    
    if (activities.length === 0) {
      errors.push('PROC_CONN_001: El proceso no tiene actividades')
      return errors
    }

    // Encontrar actividades inalcanzables (excluyendo standalone)
    const nonStandaloneActivities = activities.filter(a => a.type !== 'standalone')
    const unreachable = this.findUnreachableActivities(nonStandaloneActivities, transitions)
    
    if (unreachable.length > 0) {
      const unreachableNames = unreachable.map(a => `"${a.name}"`).join(', ')
      errors.push(`PROC_CONN_002: Actividades inalcanzables: ${unreachableNames}`)
    }

    // Verificar que desde ALGÚN inicio se pueda llegar a ALGÚN fin
    const canReachEnd = this.canReachEndFromAnyStart(activities, transitions)
    if (!canReachEnd) {
      errors.push('PROC_CONN_003: No se puede llegar desde ninguna actividad de INICIO hasta alguna actividad de FIN')
    }

    return errors
  }

  validateRoles(activities, roles) {
    console.log("👥 Validando roles...")
    const errors = []

    // Actividades interactivas deben tener roles asignados
    const interactiveActivities = activities.filter(a => a.isInteractive === 'y')
    
    interactiveActivities.forEach(activity => {
      const activityRoles = this.getActivityRoles(activity.activityId, roles)
      
      if (activityRoles.length === 0) {
        errors.push(`PROC_ROLE_001: Actividad interactiva "${activity.name}" no tiene roles asignados`)
      }
    })

    return errors
  }

  validateRouting(activities, transitions) {
    console.log("🔄 Validando routing...")
    const errors = []

    // Actividades auto-routed deben tener al menos 1 transición saliente
    activities.forEach(activity => {
      if (activity.isAutoRouted === 'y' && activity.type !== 'end') {
        const outgoingTransitions = transitions.filter(t => t.actFromId === activity.activityId)
        
        if (outgoingTransitions.length === 0) {
          errors.push(`PROC_ROUT_001: Actividad auto-routed "${activity.name}" no tiene transiciones salientes`)
        }
        
        // Switch activities pueden tener múltiples transiciones
        if (activity.type !== 'switch' && outgoingTransitions.length > 1) {
          errors.push(`PROC_ROUT_002: Actividad auto-routed "${activity.name}" tiene múltiples transiciones salientes`)
        }
      }
    })

    return errors
  }

  // ===== ALGORITMOS AVANZADOS =====

  findUnreachableActivities(activities, transitions) {
    console.log("🔎 Buscando actividades inalcanzables...")
    
    const startActivities = activities.filter(a => a.type === 'start')
    if (startActivities.length === 0) return activities

    const visited = new Set()
    
    // BFS desde TODAS las actividades de inicio
    startActivities.forEach(startActivity => {
      const queue = [startActivity.activityId]
      
      while (queue.length > 0) {
        const currentId = queue.shift()
        if (visited.has(currentId)) continue
        
        visited.add(currentId)

        const outgoingTransitions = transitions.filter(t => t.actFromId === currentId)
        outgoingTransitions.forEach(transition => {
          if (!visited.has(transition.actToId)) {
            queue.push(transition.actToId)
          }
        })
      }
    })

    // Actividades no visitadas son inalcanzables
    return activities.filter(activity => !visited.has(activity.activityId))
  }

  canReachEndFromAnyStart(activities, transitions) {
    const startActivities = activities.filter(a => a.type === 'start')
    const endActivities = activities.filter(a => a.type === 'end')

    if (startActivities.length === 0 || endActivities.length === 0) return false

    // Verificar si desde ALGÚN inicio podemos llegar a ALGÚN fin
    return startActivities.some(startActivity => 
      endActivities.some(endActivity => 
        this.canReach(activities, transitions, startActivity.activityId, endActivity.activityId)
      )
    )
  }

  canReach(activities, transitions, fromId, toId, visited = new Set()) {
    if (fromId === toId) return true
    if (visited.has(fromId)) return false

    visited.add(fromId)

    const outgoingTransitions = transitions.filter(t => t.actFromId === fromId)
    
    for (const transition of outgoingTransitions) {
      if (this.canReach(activities, transitions, transition.actToId, toId, visited)) {
        return true
      }
    }

    return false
  }

  detectCycles(activities, transitions) {
    console.log("🔄 Detectando ciclos...")
    const visited = new Set()
    const recursionStack = new Set()

    for (const activity of activities) {
      if (this.hasCycleUtil(activity.activityId, transitions, visited, recursionStack)) {
        return true
      }
    }

    return false
  }

  hasCycleUtil(activityId, transitions, visited, recursionStack) {
    if (recursionStack.has(activityId)) return true
    if (visited.has(activityId)) return false

    visited.add(activityId)
    recursionStack.add(activityId)

    const outgoingTransitions = transitions.filter(t => t.actFromId === activityId)
    
    for (const transition of outgoingTransitions) {
      if (this.hasCycleUtil(transition.actToId, transitions, visited, recursionStack)) {
        return true
      }
    }

    recursionStack.delete(activityId)
    return false
  }

  getActivityRoles(activityId, roles) {
    const activityRoles = []
    
    roles.forEach(role => {
      // Buscar en gr_ga_activities donde está mapeado este role
      if (role.gr_ga_activities && Array.isArray(role.gr_ga_activities)) {
        role.gr_ga_activities.forEach(activityRole => {
          // Verificar si este role está asignado a la actividad
          if (activityRole.activityId == activityId) {
            activityRoles.push({
              roleId: role.roleId,
              roleName: role.name,
              activityId: activityId
            })
          }
        })
      }
    })
    
    return activityRoles
  }
}

module.exports = new ValidationService()