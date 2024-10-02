from sqlalchemy.orm import declarative_base
from utils import connection
import logging


class DatabaseTableBuilder:
    """
    A class that facilitates the creation of tables in a database using SQLAlchemy.

    Attributes:
        - Base: An SQLAlchemy base object used to define the structure of tables.
        - engine: A database engine connection object used for executing operations on the database.

    Methods:
        - create_table: A method that uses the Base object to create all tables defined in SQLAlchemy in the database
        associated with the engine.
    """
    _instance = None
    _base = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._base = declarative_base()
            cls._instance._engine = connection()
        return cls._instance

    @staticmethod
    def get_instance():
        if DatabaseTableBuilder._instance is None:
            DatabaseTableBuilder._instance = DatabaseTableBuilder()
        return DatabaseTableBuilder._instance._base

    def create_table(self):
        try:
            self._base.metadata.create_all(self._engine, checkfirst=True)
            logging.info("The tables were created successfully")

        except Exception as e:
            logging.error(str(e))



