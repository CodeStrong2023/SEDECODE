from dotenv import load_dotenv
from sqlalchemy import create_engine
import logging
import os


def connection():
    """
    Establishes a connection to a PostgreSQL database using SQLAlchemy.

    Returns:
        Engine: A SQLAlchemy database engine connected to Postgresql.
    """

    try:
        load_dotenv()
        print(os.getenv('POSTGRESQL_USER'))
        engine = create_engine(f"postgresql://{os.getenv('POSTGRESQL_USER')}:{os.getenv('PASSWORD')}@{os.getenv('HOST')}:{os.getenv('PORT')}/{os.getenv('DATABASE')}")
        logging.info('Successful connection to the DB.')
        return engine

    except Exception as e:
        logging.error(str(e))

if __name__ == '__main__':
    connection()
