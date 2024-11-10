import psycopg2
from contextlib import contextmanager
from dotenv import load_dotenv
import os

load_dotenv()


@contextmanager
def CursorDelPool():
    # Obtener la configuración de la conexión desde las variables de entorno
    conn_params = {
        'host': os.getenv('DB_HOST'),
        'port': os.getenv('DB_PORT'),
        'dbname': os.getenv('DB_NAME'),
        'user': os.getenv('DB_USER'),
        'password': os.getenv('DB_PASSWORD')
    }

    # Conectar a la base de datos
    conn = psycopg2.connect(**conn_params)
    try:
        cursor = conn.cursor()
        yield cursor
    finally:
        cursor.close()
        conn.close()
