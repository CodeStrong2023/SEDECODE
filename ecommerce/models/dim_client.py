from base_model import DatabaseTableBuilder
from sqlalchemy import Column, Integer, Text, DateTime, func

base = DatabaseTableBuilder.get_instance()


class DimClient(base):
    """
    A class representing the dimension table 'dim_client' in the database.
    """
    __tablename__ = 'dim_client'
    sk_client = Column(Integer, primary_key=True, autoincrement=True)
    client_name = Column(Text)
    client_surname = Column(Text)
    client_address = Column(Text)
    client_cellphone = Column(Text)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    # TODO: Definir sí hacemos una tabla para las tarjetas de crédito
