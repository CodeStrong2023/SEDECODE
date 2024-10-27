from base_model import DatabaseTableBuilder
from sqlalchemy import Column, Integer, Text

base = DatabaseTableBuilder.get_instance()


class DimUser(base):
    """
    A class representing the dimension table 'dim_user' in the database.
    """
    __tablename__ = 'dim_user'
    sk_user = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(Text, nullable=False)
    user_lastname = Column(Text, nullable=False)
