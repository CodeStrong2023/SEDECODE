from base_model import DatabaseTableBuilder
from dim_product import DimProduct
import logging


def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        datefmt='%m/%d/%Y %I:%M:%S %p'
    )


def main():
    setup_logging()
    create = DatabaseTableBuilder()
    create.create_table()

if __name__ == '__main__':
    main()