import pygame
import sys
from constantes import SCREEN_WIDTH, SCREEN_HEIGTH, ASSEST_PATH, IMPERIAL_MARCH_PATH, FONDO1_PATH, ESTRELLA_PATH, FONDO_PATH, PATH_SOUND
def mostrar_pantalla_inicio(screen):
    # cargar y mostrar la imagen de inicio
    imagen_inicio = pygame.image.load(START_IMAGE_PATH)
    imagen_inicio = pygame.transform.scale(imagen_inicio, (SCREEN_WIDTH, SCREEN_HEIGHT))
    screen.blit(imagen_inicio, (0, 0))
    pygame.display.flip()

    # reproducir audio
    pygame.mixer.music.load(IMPERIAL_MARCH_PATH)
    pygame.mixer.music.play()

    # Esperar a que termine el audio
    while pygame.mixer.music.get_busy():
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        screen.blit(imagen_inicio, (0,0))
        pygame.display.flip()


def main():
    pygame.init()
    screen = pygame.display.set_mode(SCREEN_WIDTH, SCREEN_HEIGTH)
    pygame.display.set_caption("Amenaza fantasma")

    icon = pygame.image.load("")
    pygame.display.set_icon(icon)

    fondo = pygame.image.load(FONDO_PATH)
    fondo = pygame.transform.scale(fondo(SCREEN_WIDTH, SCREEN_HEIGTH))

    estrella = pygame.image.load(ESTRELLA_PATH)
    estrella = pygame.transform.scale(fondo1(SCREEN_WIDTH, SCREEN_HEIGTH))

    fondo1 = pygame.image.load(FONDO1_PATH)
    fondo1 = pygame.transform.scale(fondo1(SCREEN_WIDTH, SCREEN_HEIGTH))

    sonido_laser = pygame.mixer.Sound(PATH_SOUND)

    personaje = Personaje(SCREEN_WIDTH//2, SCREEN_HEIGTH//2)
    enemigos = []
    explosiones = []
    puntos = 0
    nivel = 1
    clock = pygame.time.Clock()
    running = True
    fondo_actual = fondo
    while running:
        for event in pygame.event.get():
            if event.type ==pygame.QUIT:
                pygame.quit()
                sys.exit()

        keys = pygame.key.get_pressed()
        dx, dy = 0, 0
        if keys[pygame.K_LEFT]:
            dx = -5
        if keys[pygame.K_RIGHT]:
            dx = 5
        if keys[pygame.K_UP]:
            dy = -5
        if keys[pygame.K_DOWN]:
            dy = 5