class Usuario:
    """
    Clase que representa un usuario en el sistema.

    Atributos:
        id_usuario (int): Identificador único del usuario.
        username (str): Nombre de usuario del usuario.
        password (str): Contraseña del usuario.

    Métodos:
        __str__(): Devuelve una representación en forma de cadena del usuario.
        id_usuario: Propiedad para obtener y establecer el id del usuario.
        username: Propiedad para obtener y establecer el nombre de usuario.
        password: Propiedad para obtener y establecer la contraseña del usuario.
    """

    def __init__(self, id_usuario: None, username: None, password: None):
        self.id_usuario = id_usuario
        self.username = username
        self.password = password

    def __str__(self):
        return f"Usuario {self.id_usuario} - {self.username} - {self.password}"

    @property
    def id_usuario(self):
        return self.id_usuario

    @id_usuario.setter
    def id_usuario(self, id_usuario):
        self.id_usuario = id_usuario

    @property
    def username(self):
        return self.username

    @username.setter
    def username(self, username):
        self.username = username

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, password):
        self.password = password
