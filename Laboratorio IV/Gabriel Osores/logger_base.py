import logging as log

log.basicConfig(level=log.INFO,
                format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                datefmt='%I:%M:%S %p',
                handlers=[
                    log.FileHandler('logs/logfile.log', encoding='utf-8'),
                    log.StreamHandler()
                ])


if __name__ == '__main__':
    log.debug('Mensaje a nivel debug')
    log.info('Mensaje a nivel info')
    log.warning('Mensaje a nivel warning')
    log.error('Mensaje a nivel error')
    log.critical('Mensaje a nivel critical')
