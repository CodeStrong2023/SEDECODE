import logging as log

log.basicConfig(level=log.INFO,
                format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                datefmt='%I:%M:%S %p',
                handlers=[
                    log.FileHandler('logs/logfile.log', encoding='utf-8'),
                    log.StreamHandler()
                ])
