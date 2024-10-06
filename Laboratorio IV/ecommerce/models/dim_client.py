from base_model import DatabaseTableBuilder
from sqlalchemy import Column, Integer, Text, DateTime, func

base = DatabaseTableBuilder.get_instance()


class DimClient(base):
    """
    A class representing the dimension table 'dim_client' in the database.
    """
    __tablename__ = 'dim_client_laboratorio'
    sk_client = Column(Integer, primary_key=True, autoincrement=True)
    client_name = Column(Text, nullable=False, unique=True)
    client_surname = Column(Text)
    client_password = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
