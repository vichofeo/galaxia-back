# procesar.py (versión para ser llamado desde Node)
import sys
import json
import os
import subprocess

def descomprimir_ves(archivo_ves, salida_temp):
    """Descompresión usando expand.exe (sistema Windows)"""
    if not os.path.exists(archivo_ves):
        raise FileNotFoundError(f"Archivo {archivo_ves} no encontrado")
    
    os.makedirs(salida_temp, exist_ok=True)
    try:
        # Usa expand.exe (nativo de Windows)
        subprocess.run(
            ["expand", archivo_ves, "-F:*", salida_temp],
            check=True,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        # Busca el archivo SQL
        for root, _, files in os.walk(salida_temp):
            for file in files:
                if file.lower() == "transfer.sql":
                    return os.path.join(root, file)
        
        raise FileNotFoundError("transfer.sql no encontrado")
    except subprocess.CalledProcessError as e:
        raise Exception(f"Error al descomprimir: {e.stderr.decode()}")

def leer_access97(archivo_mdb):
    """Lee un .mdb de Access 97 usando mdbtools y devuelve JSON"""
    try:
        # 1. Listar tablas
        tablas = subprocess.check_output(
            ["mdb-tables", "-1", archivo_mdb],
            stderr=subprocess.PIPE,
            text=True
        ).splitlines()
        
        resultados = {}
        
        # 2. Extraer datos de cada tabla
        for tabla in tablas:
            tabla = tabla.strip()
            if not tabla:
                continue
            
            # Exportar tabla a CSV
            csv_data = subprocess.check_output(
                ["mdb-export", archivo_mdb, tabla],
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Convertir CSV a JSON
            lineas = csv_data.strip().split('\n')
            if not lineas:
                continue
            
            columnas = lineas[0].split(',')
            registros = []
            for linea in lineas[1:]:
                valores = linea.split(',')
                registro = dict(zip(columnas, valores))
                registros.append(registro)
            
            resultados[tabla] = registros
        
        return resultados
    
    except subprocess.CalledProcessError as e:
        raise Exception(f"Error mdbtools: {e.stderr}")


if __name__ == "__main__":
    try:
        archivo_ves = sys.argv[1]  # Ruta del archivo .ves desde Node
        salida_temp = "temp_python"
        
        archivo_sql = descomprimir_ves(archivo_ves, salida_temp)
        datos_json = leer_access97(archivo_sql)
        
        # Imprimir JSON para que Node lo capture
        print(json.dumps(datos_json))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)