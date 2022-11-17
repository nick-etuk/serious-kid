import config
import time
import random
import logging
from datetime import datetime
from init import log


def pause():
    random.seed(datetime.now())
    # log = logging.getLogger(__name__)
    # sleep for between 5 and ten seconds between each request
    pause_length = random.randint(10, 20)
    # log(f"Sleeping for {pause_length} seconds")
    log(f"Sleeping for {pause_length} seconds")

    time.sleep(pause_length)


def long_pause():
    # log = logging.getLogger(__name__)
    # sleep for between 5 and ten minutes between each brand
    if config.debug_local_files_only:
        return
    pause_length = random.randint(5*60, 10*60)
    mins = round(pause_length/60, 1)
    log(f"Waiting for {mins} minutes")
    time.sleep(pause_length)


def short_pause():
    # log = logging.getLogger(__name__)
    # sleep for between 5 and ten seconds between each request
    if config.debug_local_files_only:
        return
    pause_length = 10
    log(f"Sleeping for {pause_length} seconds")
    time.sleep(pause_length)
