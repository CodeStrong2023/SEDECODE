from base_model import DatabaseTableBuilder
from sqlalchemy import Column, Integer, Text, Float, DateTime, func

base = DatabaseTableBuilder.get_instance()


class DimProduct(base):
    """
    A class representing the dimension table 'dim_product' in the database.
    """
    __tablename__ = 'dim_product'
    sk_product = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(Text)
    product_price = Column(Float)
    product_stock = Column(Integer)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, onupdate=func.now(), nullable=False)
