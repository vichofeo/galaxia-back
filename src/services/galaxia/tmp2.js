// services/galaxia/validationService.js - VERSIÓN CORREGIDA
class ValidationService {
  validateProcess(processId, activities, transitions, roles) {
    const errors = []
    const warnings = []

    console.log(`\n🔍 Validando proceso ${processId}`, {
      actividades: activities.length,
      transiciones: transitions.length,
      roles: roles ? roles.length : 'UNDEFINED'
    })

    // DEBUG DETALLADO
    console.log("🐛 DEBUG - ESTRUCTURA DE DATOS:")
    console.log("Actividades:", activities.map(a => ({ id: a.activityId, name: a.name, interactive: a.isInteractive })))
    console.log("Roles:", roles)
    console.log("Transiciones:", transitions.map(t => ({ from: t.actFromId, to: t.actToId })))

    // 1. VALIDACIÓN ESTRUCTURAL
    const structuralErrors = this.validateStructure(activities)
    errors.push(...structuralErrors)

    // 2. VALIDACIÓN DE CONECTIVIDAD
    const connectivityErrors = this.validateConnectivity(activities, transitions)
    errors.push(...connectivityErrors)

    // 3. VALIDACIÓN DE ROLES (MEJORADA)
    const roleErrors = this.validateRoles(activities, roles)
    errors.push(...roleErrors)

    // 4. VALIDACIÓN DE RUTING
    const routingErrors = this.validateRouting(activities, transitions)
    errors.push(...routingErrors)

    // 5. VALIDACIÓN DE CÓDIGO (SOLO WARNINGS)
    const codeWarnings = this.validateCodeRequirements(activities)
    warnings.push(...codeWarnings)

    // 6. DETECCIÓN DE CICLOS
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

  validateRoles(activities, roles) {
    console.log("👥 Validando roles...")
    const errors = []

    // Verificar si roles es undefined o vacío
    if (!roles || roles.length === 0) {
      errors.push('PROC_ROLE_000: No se encontraron roles definidos para el proceso')
      return errors
    }

    // Actividades interactivas deben tener roles asignados
    const interactiveActivities = activities.filter(a => a.isInteractive === 'y')
    
    interactiveActivities.forEach(activity => {
      const activityRoles = this.getActivityRoles(activity.activityId, roles)
      console.log(`🔍 ${activity.name} (ID:${activity.activityId}) -> Roles:`, activityRoles)

      if (activityRoles.length === 0) {
        errors.push(`PROC_ROLE_001: Actividad interactiva "${activity.name}" no tiene roles asignados`)
      }
    })

    return errors
  }

  validateCodeRequirements(activities) {
    console.log("💻 Validando requisitos de código...")
    const warnings = []

    // Actividades interactivas deben usar complete() - SOLO WARNING
    const interactiveActivities = activities.filter(a => a.isInteractive === 'y')
    interactiveActivities.forEach(activity => {
      warnings.push(`Actividad interactiva "${activity.name}" debe usar $instance->complete()`)
    })

    // Actividades switch deben usar setNextActivity() - SOLO WARNING  
    const switchActivities = activities.filter(a => a.type === 'switch')
    switchActivities.forEach(activity => {
      warnings.push(`Actividad switch "${activity.name}" debe usar $instance->setNextActivity()`)
    })

    return warnings
  }

  getActivityRoles(activityId, roles) {
    if (!roles) return []
    
    return roles.filter(role => {
      // Manejar diferentes formatos de ID
      const roleActivityId = role.activityId || role.actividadId || role.activityID
      return roleActivityId == activityId // Usar == para manejar string vs number
    })
  }

  // ... (el resto de los métodos permanece igual)
}

module.exports = new ValidationService()