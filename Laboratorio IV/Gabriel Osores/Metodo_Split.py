# help(str.split)
cursos = 'Java Javascript Node Python Diseno'
lista_cursos = cursos.split()
print(f'Lista de cursos: {lista_cursos}')
print(type(lista_cursos))

cursos_separado_coma = 'Java,Python,Node,JavaScript,Spring'
lista_cursos = cursos_separado_coma.split(',',2)
print(f'Lista de cursos: {lista_cursos}')
print(len(lista_cursos))
