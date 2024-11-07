# Bistro Bon Appétit

Bienvenido a Bistro Bon Appétit, tu ecommerce gourmet para disfrutar de la auténtica gastronomía francesa desde la comodidad de tu hogar. Este proyecto es un sitio web de compras en línea que ofrece productos gourmet, platos preparados y alimentos artesanales de alta calidad.

## Descripción

Bistro Bon Appétit es un ecommerce diseñado para ofrecer productos gourmet franceses. Los usuarios pueden comprar alimentos artesanales, platos preparados y productos gourmet de alta calidad.

## Características

- **Productos gourmet** organizados en tarjetas elegantes.
- **Carrito de compras** con integración de pago vía MercadoPago.
- **Frontend Interactivo**: HTML, CSS y Bootstrap para una interfaz de usuario responsiva.
- **Interactividad Dinámica**: JavaScript para funcionalidades dinámicas y experiencias de usuario mejoradas.
- **Backend Sólido**: Desarrollado con Flask y gestionado con PostgreSQL para un rendimiento y escalabilidad óptimos.

## Requisitos

- pip install -r requirements.txt

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/CodeStrong2023/SEDECODE.git
   cd SEDECODE/ecommerce

# Manual de Ejecución para el Ecommerce "Bistro Bon Appétit"

## Requisitos
Antes de comenzar con la instalación y configuración, asegúrate de tener instaladas las siguientes herramientas y dependencias:
- **Python** (versión 3.9.11)
- **Docker**
- **PostgreSQL**

## Instalación y Configuración del Proyecto

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/CodeStrong2023/SEDECODE.git
cd SEDECODE/ecommerce

### Paso 2: Crear el archivo env

POSTGRESQL_USER='postgres'
PASSWORD='123456'
HOST='localhost'
PORT='5431'
DATABASE='sedecode'

### Paso 3: Crear y activar el un Entorno Virtual

# Instalar virtual env

pip install virtualenv

# Crear el entorno virtual

virtualenv sedecode

# Activar el entorno virtual en Windows

sedecode\Scripts\activate

# Activar el entorno virtual en maCOS y Linux

source sedecode/bin/activate

### Paso 4: instalar las dependencias del Backend

pip install Flask psycopg2 python-dotenv mercadopago sqlalchemy pandas

### Paso 5: Configurar la Base de Datos

POSTGRES_PASSWORD='123456'
CONTAINER_NAME='SEDECODE'
POSTGRES_USER='postgres'
POSTGRES_DB='sedecode'
POSTGRES_HOST='localhost'
POSTGRES_PORT='5432'

### Paso 6: Iniciar Docker

cd container
docker-compose up -d

### Paso 7: Importar las Tablas en la Base de Datos
# Crea un archivo .env dentro de la carpeta models con las siguientes variables:

POSTGRESQL_USER='postgres'
PASSWORD='123456'
HOST='localhost'
PORT='5431'
DATABASE='sedecode'

# Ejecuta el script para crear las tablas:
python main.py

### Paso 8: Iniciar el Servidor Flask
python app.py

### Uso del Proyecto

# Para acceder al frontend del ecommerce: Visita http://127.0.0.1:5000.

# Para gestión de productos y administración: Accede a http://127.0.0.1:5000/admin/products.


### Con estos pasos, deberías tener todo lo necesario para instalar, configurar y ejecutar el ecommerce "Bistro Bon Appétit" correctamente. ¡A ejecutarlo!

