class Clase_tipo:
    """
    Atributos:
        tipo (str): Tipo de objeto que se va a instanciar.
    """
    def __init__(self, tipo):
        """
        Inicializa el instanciador con el tipo de objeto.

        Args:
            tipo (str): Tipo de objeto a instanciar.
        """
        self.tipo = tipo

    def metodo(self):
        """
        Returns:
                object: Una nueva instancia del tipo especificado.

            Raises:
                ValueError: Si el tipo de objeto no es reconocido.
        """
        print(self.tipo)


clases = 'hola como estas pepito don jose'
lista = clases.split(' ')
print(lista)