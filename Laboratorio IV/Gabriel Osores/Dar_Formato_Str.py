#from metodo_join import mensaje

# dar formato a un string
nombre = 'Gabriel'
edad = 37
mensaje_con_formato = 'Mi nombre es %s y tengo %d años '% (nombre,edad)
# print(mensaje_con_formato)

#Creamos una tupla
persona = ('Pedro', 'Flores', 5000.00)
mensaje_con_formato = 'Hola %s %s . Tu sueldo es %.2f' # % persona #Aqui le pasamos el objeto de la tupla
# print(mensaje_con_formato % persona)

nombre = 'Isaias'
edad = 25
sueldo = 3000
# mensaje_con_formato = 'Nombre {} Edad {} Sueldo {:.2f}'.format(nombre, edad, sueldo)
# print(mensaje_con_formato)

# mensaje = 'Nombre {0} Edad {1} Sueldo {2:.2f}'.format(nombre, edad, sueldo)
# print(mensaje)

mensaje = 'Nombre {n} Edad {e} Sueldo {s:.2f}'.format(n=nombre, e=edad, s=sueldo)
# print(mensaje)

diccionario = {'nombre': 'Juan', 'edad': 30, 'sueldo': 8000.00}
mensaje = 'Nombre {dic[nombre]} Edad {dic[edad]} Sueldo {dic[sueldo]:.2f}'.format(dic=diccionario)
print(mensaje)
