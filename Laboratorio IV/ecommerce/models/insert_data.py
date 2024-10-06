import pandas as pd
from utils import connection
from datetime import datetime

def main():
    # Crear un DataFrame con los datos
    data = {
        'product_name': ['Nirvana', 'Linkin Park', 'Ramnstein', 'SOAD', 'Led-Zeppelin'],
        'product_price': [200, 15.50, 39.99, 99.99, 5.49],
        'product_stock': [100, 50, 200, 25, 500],
        'product_url': [
            'https://acdn.mitiendanube.com/stores/029/842/products/nirvana1-2d1bbed349758198e516166141022282-1024-1024.webp',
            'https://acdn.mitiendanube.com/stores/001/843/621/products/linkin-park-con-logo-negra1-c7e0198851d2be48d116625559257012-640-0.webp',
            'https://http2.mlstatic.com/D_NQ_NP_2X_629009-MLA54975028038_042023-F.webp',
            'https://http2.mlstatic.com/D_NQ_NP_869384-MLA51829867569_102022-O.webp',
            'https://acdn.mitiendanube.com/stores/614/494/products/pic_20200904_143633-02b4a3653de8fae37315992411938651-480-0.jpg'
        ],
    }

    df = pd.DataFrame(data)
    df['created_at'] = datetime.now()
    df['updated_at'] = datetime.now()

    # Insertar los datos en la tabla dim_product_laboratorio
    df.to_sql('dim_product_laboratorio', connection(), if_exists='append', index=False)

if __name__ == "__main__":
    main()