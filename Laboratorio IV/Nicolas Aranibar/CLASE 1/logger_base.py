import logging as log


"""
Configuración del sistema de logging para la aplicación.

Establece el nivel de logging en INFO y define el formato de los mensajes,
que incluye fecha, nombre del logger, nivel de severidad y mensaje. 

Los logs se envían a:
- Un archivo 'logfile.log' en el directorio 'logs' con codificación UTF-8.
- La consola (salida estándar).

Esto facilita el registro de eventos y errores durante la ejecución de la aplicación.
"""

log.basicConfig(level=log.INFO,
                format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                datefmt='%I:%M:%S %p',
                handlers=[
                    log.FileHandler('logs/logfile.log', encoding='utf-8'),
                    log.StreamHandler()
                ])