from logger_base import log
from cursor_del_pool import CursorDelPool
from Usuario import Usuario
class UsuarioDao:

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
            log.debug('Inserando usuario')
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
            valores = (usuario.id_usuario, usuario.username, usuario.password)
            cursor.execute(cls._ELIMINAR, valores)
            return cursor.rowcount
