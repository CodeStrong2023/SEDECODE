from base_model import DatabaseTableBuilder
from sqlalchemy import Column, Integer, Text, DateTime, func, ForeignKey

base = DatabaseTableBuilder.get_instance()


class FactSell(base):
    """
    A class representing the dimension table 'fact_sell' in the database.
    """
    __tablename__ = 'fact_sell'
    sk_sell = Column(Integer, primary_key=True, autoincrement=True)
    quantity = Column(Integer)
    # TODO: Le podríamos agregar un estado de orden, pero creo que primero vayamos con lo básico, ya que hacer esto va a implicar mayor detalle en los html al recibir info
    created_at = Column(DateTime, server_default=func.now())
    sk_client = Column(Integer, ForeignKey('dim_client.sk_client'))
    sk_product = Column(Integer, ForeignKey('dim_product.sk_product'))