# Verificación de valores booleanos
valor_decimal = 0
resultado_bool = bool(valor_decimal)
print(resultado_bool)  # Imprime: False

valor_decimal = 1
resultado_bool = bool(valor_decimal)
print(resultado_bool)  # Imprime: True

valor_cadena_vacia = ''
resultado_bool = bool(valor_cadena_vacia)
print(resultado_bool)  # Imprime: False

valor_cadena = 'hola'
resultado_bool = bool(valor_cadena)
print(resultado_bool)  # Imprime: True

# Condición simple
if 1:  # Esto siempre es verdadero
    print('verdadero')  # Se imprime: verdadero
else:
    print('falso')

# Bucle while
contador = 3
while contador:
    print('verdadero')  # Se imprime: verdadero
    break  # Sale del bucle inmediatamente
else:
    print('falso')

# Concatenación de cadenas
texto = 'hola'
mensaje = texto + ' me llamo rosario'  # Se agrega un espacio entre las palabras
mensaje_final = f"{mensaje}, vos?"  # Mensaje formateado

print(mensaje_final)  # Imprime: hola pepito hola don josé
