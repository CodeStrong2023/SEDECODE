import pygame
from main import screen, clock, running, player_pos

pygame.init()

# configuración de pantalla
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()
running = True
dt = 0

# posición del jugador
player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

# Velocidad del jugador
player_speed = 5

# Bucle principal
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Detectar las teclas para presionar
    keys = pygame.key.get_pressed()

    # Movimiento del jugador
    if keys[pygame.K_LEFT]:  # se presiona la tecla izquierda
        player_pos.x -= player_speed
    if keys[pygame.K_RIGHT]:  # se presiona la tecla derecha
        player_pos.x += player_speed
    if keys[pygame.K_DOWN]:  # se presiona la tecla hacia abajo
        player_pos.y += player_speed
    if keys[pygame.K_UP]:  # se presiona la tecla hacia arriba
        player_pos.y -= player_speed

    # Limpiar la pantalla
    screen.fill("black")

    # Dibujar jugador (ejemplo como un rectángulo)
    pygame.draw.rect(screen, (255, 0, 0), (player_pos.x, player_pos.y, 50, 50))

    # Actualizar la pantalla
    pygame.display.flip()

    # Configurar FPS
    clock.tick(60)

pygame.quit()
