from base_model import DatabaseTableBuilder
from sqlalchemy import Column, Integer, Text, Float, DateTime, func

base = DatabaseTableBuilder.get_instance()


class DimProduct(base):
    """
    A class representing the dimension table 'dim_product' in the database.
    """
    __tablename__ = 'dim_product_laboratorio'
    sk_product = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(Text, nullable=False)
    product_price = Column(Float, nullable=False)
    product_stock = Column(Integer, nullable=False)
    product_url = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, onupdate=func.now(), nullable=False)
