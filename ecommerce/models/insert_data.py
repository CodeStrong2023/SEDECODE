import pandas as pd
from utils import connection
from datetime import datetime

def main():
    # Crear un DataFrame con los datos
    data = {
        'product_name': ['RATATOUILLE', 'ESCARGOTS DE BOURGOGNE', 'ANCAS DE RANA', 'MACARRONES', 'CROQUE-MONSIEUR', 'CROQUE-MADAME'],
        'product_price': [200, 15.50, 39.99, 99.99, 5.49, 6.87],
        'product_stock': [100, 50, 200, 25, 500, 89],
        'product_url': [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw2wc8uzFEoKuDmWxjpfAPxh8CW46ZTLmKKA&s',
            'https://img.freepik.com/fotos-premium/escargots-bourgogne-caracoles-mantequilla-hierbas-comer-sano-comida-frances_97840-2962.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRQLFF5TvzICLHMXJotakexASg5kHXulAw6w&s',
            'https://www.nutandme.com/media/wordpress/872d4a63ae77b3e310dd355ec84cabb7.jpg',
            'https://hips.hearstapps.com/hmg-prod/images/croque-monsieur-66a219aa5f0b2.jpg?crop=0.689xw:1.00xh;0.0817xw,0&resize=1200:*',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0tsQKHQW_RdWR3RW0ESX-3a00ZHJx_CD2Uw&s'
        ],
    }

    df = pd.DataFrame(data)
    df['created_at'] = datetime.now()
    df['updated_at'] = datetime.now()

    # Insertar los datos en la tabla dim_product_laboratorio
    df.to_sql('dim_product', connection(), if_exists='append', index=False)

if __name__ == "__main__":
    main()