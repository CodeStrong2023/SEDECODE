import psycopg2
from contextlib import contextmanager
from dotenv import load_dotenv
import os

load_dotenv()


@contextmanager
def CursorDelPool():
    """
       Administrador de contexto que gestiona la conexión a una base de datos PostgreSQL.

       Este administrador de contexto establece una conexión a la base de datos utilizando los parámetros
       de conexión obtenidos de las variables de entorno. Proporciona un cursor que se puede usar para ejecutar
       consultas dentro del bloque de contexto. Al finalizar el bloque, el cursor y la conexión se cierran automáticamente.

       Ejemplo de uso:
           with CursorDelPool() as cursor:
               cursor.execute("SELECT * FROM tabla")
               resultados = cursor.fetchall()

       Raises:
           psycopg2.Error: Si ocurre un error durante la conexión o la ejecución de la consulta.
       """
    conn_params = {
        'host': os.getenv('DB_HOST'),
        'port': os.getenv('DB_PORT'),
        'dbname': os.getenv('DB_NAME'),
        'user': os.getenv('DB_USER'),
        'password': os.getenv('DB_PASSWORD')
    }


    conn = psycopg2.connect(**conn_params)
    try:
        cursor = conn.cursor()
        yield cursor
    finally:
        cursor.close()
        conn.close()
