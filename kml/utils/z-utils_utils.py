import kml.utils.config as config
import time
import random
import logging
from datetime import datetime
from kml.utils.init import log


def pause(pause_length: int):
    log(f"Sleeping for {pause_length} seconds")
    time.sleep(pause_length)


def random_pause():
    random.seed(datetime.now())
    pause_length = random.randint(10, 20)
    log(f"Sleeping for {pause_length} seconds")

    time.sleep(pause_length)


def long_pause():
    if config.debug_local_files_only:
        return
    pause_length = random.randint(5*60, 10*60)
    mins = round(pause_length/60, 1)
    log(f"Waiting for {mins} minutes")
    time.sleep(pause_length)


def short_pause():
    if config.debug_local_files_only:
        return
    pause_length = 10
    log(f"Sleeping for {pause_length} seconds")
    time.sleep(pause_length)
