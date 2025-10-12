// services/galaxia/validationService.js
class ValidationService {
  validateProcess(processId, activities, transitions, roles) {
    const errors = []
    const warnings = []

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
      warnings.push('El proceso contiene ciclos potenciales')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      timestamp: Math.floor(Date.now() / 1000)
    }
  }

  validateStructure(activities) {
    const errors = []

    // Debe tener exactamente 1 actividad de inicio
    const startActivities = activities.filter(a => a.type === 'start')
    if (startActivities.length !== 1) {
      errors.push('PROC_STRUCT_001: Debe tener exactamente UNA actividad de inicio')
    }

    // Debe tener al menos 1 actividad de fin
    const endActivities = activities.filter(a => a.type === 'end')
    if (endActivities.length === 0) {
      errors.push('PROC_STRUCT_002: Debe tener al menos UNA actividad de fin')
    }

    // No debe haber múltiples actividades con el mismo nombre
    const nameCounts = {}
    activities.forEach(activity => {
      nameCounts[activity.name] = (nameCounts[activity.name] || 0) + 1
    })
    
    const duplicateNames = Object.keys(nameCounts).filter(name => nameCounts[name] > 1)
    if (duplicateNames.length > 0) {
      errors.push(`PROC_STRUCT_003: Nombres duplicados: ${duplicateNames.join(', ')}`)
    }

    return errors
  }

  validateConnectivity(activities, transitions) {
    const errors = []
    
    // Encontrar actividades inalcanzables
    const unreachable = this.findUnreachableActivities(activities, transitions)
    if (unreachable.length > 0) {
      errors.push(`PROC_CONN_001: Actividades inalcanzables: ${unreachable.map(a => a.name).join(', ')}`)
    }

    // Verificar que desde el inicio se pueda llegar al fin
    const canReachEnd = this.canReachEndFromStart(activities, transitions)
    if (!canReachEnd) {
      errors.push('PROC_CONN_002: No se puede llegar desde el inicio hasta el fin')
    }

    return errors
  }

  validateRoles(activities, roles) {
    const errors = []

    // Actividades interactivas deben tener roles asignados
    const interactiveWithoutRoles = activities.filter(
      a => a.isInteractive === 'y' && this.getActivityRoles(a.activityId, roles).length === 0
    )

    if (interactiveWithoutRoles.length > 0) {
      errors.push(`PROC_ROLE_001: Actividades interactivas sin roles: ${interactiveWithoutRoles.map(a => a.name).join(', ')}`)
    }

    return errors
  }

  validateRouting(activities, transitions) {
    const errors = []

    // Actividades auto-routed deben tener exactamente 1 transición saliente
    activities.forEach(activity => {
      if (activity.isAutoRouted === 'y') {
        const outgoingTransitions = transitions.filter(t => t.actFromId === activity.activityId)
        
        if (outgoingTransitions.length === 0) {
          errors.push(`PROC_ROUT_001: Actividad auto-routed '${activity.name}' no tiene transiciones salientes`)
        } else if (outgoingTransitions.length > 1) {
          errors.push(`PROC_ROUT_002: Actividad auto-routed '${activity.name}' tiene múltiples transiciones salientes`)
        }
      }
    })

    return errors
  }

  // ===== ALGORITMOS AVANZADOS =====

  findUnreachableActivities(activities, transitions) {
    const startActivity = activities.find(a => a.type === 'start')
    if (!startActivity) return activities // Si no hay inicio, todas son inalcanzables

    const visited = new Set()
    const queue = [startActivity.activityId]

    // BFS desde la actividad de inicio
    while (queue.length > 0) {
      const currentId = queue.shift()
      visited.add(currentId)

      // Encontrar transiciones salientes
      const outgoingTransitions = transitions.filter(t => t.actFromId === currentId)
      outgoingTransitions.forEach(transition => {
        if (!visited.has(transition.actToId)) {
          queue.push(transition.actToId)
        }
      })
    }

    // Actividades no visitadas son inalcanzables
    return activities.filter(activity => !visited.has(activity.activityId))
  }

  canReachEndFromStart(activities, transitions) {
    const startActivity = activities.find(a => a.type === 'start')
    const endActivities = activities.filter(a => a.type === 'end')

    if (!startActivity || endActivities.length === 0) return false

    // Verificar si desde el inicio podemos llegar a ALGÚN fin
    return endActivities.some(endActivity => 
      this.canReach(activities, transitions, startActivity.activityId, endActivity.activityId)
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
    return roles.filter(role => role.activityId === activityId)
  }
}

module.exports = new ValidationService()