from logger_base import log
from cursor_pool import CursorDelPool
from usuario import Usuario


class UsuarioDao:
    """
    Clase de acceso a datos para gestionar operaciones relacionadas con usuarios.

    Atributos:
        _SELECT (str): Consulta SQL para seleccionar todos los usuarios ordenados por id.
        _INSERTAR (str): Consulta SQL para insertar un nuevo usuario.
        _ACTUALIZAR (str): Consulta SQL para actualizar un usuario existente.
        _ELIMINAR (str): Consulta SQL para eliminar un usuario.

    Métodos:
        seleccionar(): Selecciona todos los usuarios de la base de datos y devuelve una lista de objetos Usuario.
        insertar(usuario): Inserta un nuevo objeto Usuario en la base de datos y devuelve el número de filas afectadas.
        actualizar(usuario): Actualiza un objeto Usuario existente en la base de datos y devuelve el número de filas afectadas.
        eliminar(usuario): Elimina un objeto Usuario de la base de datos y devuelve el número de filas afectadas.
    """

    _SELECT = "SELECT * FROM usuario order by id_usuario"
    _INSERTAR = "INSERT INTO usuario (username, password) VALUES (%s, %s)"
    _ACTUALIZAR = "UPDATE usuario SET id_usuario = %s , password = %s WHERE id_usuario = %s"
    _ELIMINAR = "DELETE FROM usuario WHERE id_usuario = %s"

    @classmethod
    def seleccionar(cls):
        with CursorDelPool() as cursor:
            log.debug('Seleccionando usuarios')
            cursor.execute(cls._SELECT)
            registros = cursor.fetchall()
            usuarios = []
            for registro in registros:
                usuario = Usuario(registro[0], registro[1], registro[2])
                usuarios.append(usuario)
            return usuarios

    @classmethod
    def insertar(cls, usuario):
        with CursorDelPool() as cursor:
            log.debug('Insertando usuario')
            valores = (usuario.username, usuario.password)
            cursor.execute(cls._INSERTAR, valores)
            return cursor.rowcount

    @classmethod
    def actualizar(cls, usuario):
        with CursorDelPool() as cursor:
            log.debug('Actualizando usuario')
            valores = (usuario.username, usuario.password, usuario.id_usuario)
            cursor.execute(cls._ACTUALIZAR, valores)
            return cursor.rowcount

    @classmethod
    def eliminar(cls, usuario):
        with CursorDelPool() as cursor:
            log.debug('Eliminando usuario')
            valores = (usuario.id_usuario,)
            cursor.execute(cls._ELIMINAR, valores)
            return cursor.rowcount
