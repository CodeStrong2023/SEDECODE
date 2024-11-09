nombre = 'Ariel'
edad = 28
mensaje_con_formato = 'Mi nombre es %d y tengo %s años' % (nombre, edad)
print(mensaje_con_formato)


persona = ('Carla', 'Gomez', 5000.00)
mensaje_con_formato = 'Hola %s %s . Tu sueldo es %.2f'
print(mensaje_con_formato % persona)

nombre = 'Juan'
edad = 19
sueldo = 3000

mensaje = 'Nombre {n} Edad {e} Sueldo {s}'.format(n=nombre, e=edad, s=sueldo)
print(mensaje)

diccionario = {'Nombre': 'Ivan', 'Edad': 35, 'Sueldo': 8000.00}
mensaje = f'Nombre {persona[nombre]}'.format(persona=diccionario)
print(mensaje)
