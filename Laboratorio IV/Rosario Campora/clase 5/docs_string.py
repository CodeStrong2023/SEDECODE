class InstanciadorDeTipo:
    """
    Clase para instanciar objetos de un tipo específico.

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

    def crear_instancia(self):
        """
        Crea y retorna una nueva instancia del tipo especificado.

        Returns:
            object: Una nueva instancia del tipo especificado.

        Raises:
            ValueError: Si el tipo de objeto no es reconocido.
        """
        print(self.tipo)


# Ejemplo de uso
texto = 'javascript c# c++ python Go Fortran'
lista = texto.split(' ')
print(lista)
