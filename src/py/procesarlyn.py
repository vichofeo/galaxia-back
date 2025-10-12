# procesar.py (versión para CentOS 7)
import sys
import json
import os
import subprocess

def descomprimir_ves(archivo_ves, salida_temp):
    """Descompresión usando cabextract (Linux)"""
    if not os.path.exists(archivo_ves):
        raise FileNotFoundError(f"Archivo {archivo_ves} no encontrado")
    
    os.makedirs(salida_temp, exist_ok=True)
    try:
        # Usamos cabextract en lugar de expand.exe
        subprocess.run(
            ["cabextract", "-d", salida_temp, archivo_ves],
            check=True,
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
    try:
        # Usa universal_newlines en lugar de text
        tablas = subprocess.check_output(
            ["/usr/local/bin/mdb-tables", "-1", archivo_mdb],
            stderr=subprocess.PIPE,
            universal_newlines=True  # 👈 Cambio aquí
        ).splitlines()
        
        resultados = {}
        for tabla in tablas:
            tabla = tabla.strip()
            if not tabla:
                continue
            
            # Decodifica manualmente (opción 2)
            csv_bytes = subprocess.check_output(
                ["/usr/local/bin/mdb-export", archivo_mdb, tabla],
                stderr=subprocess.PIPE
            )
            csv_data = csv_bytes.decode('latin1')
            
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
        print(json.dumps(datos_json, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}, ensure_ascii=False))
        sys.exit(1)