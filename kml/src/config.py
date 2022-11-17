import os
import configparser
from datetime import datetime

config = configparser.ConfigParser()
config.read("/mnt/e/Google Drive/asterlan sync/serious_kid.ini")
data_dir = config['default']['data_dir']
db = config['default']['db']
log_dir = config['default']['log_dir']

log_file = os.path.join(
    log_dir, f'{datetime.now().strftime("%Y-%m-%d")}.log')
