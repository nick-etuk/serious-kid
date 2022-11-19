import os
import configparser
from datetime import datetime
import socket

host = socket.gethostname()

ini_file_path = {
    'Evesham': '/mnt/e/Google Drive/asterlan sync/serious_kid.ini',
    'Thinkpad-Dan': r'/mnt/c/Users/nick_/Google Drive/asterlan sync/config'
    }

config = configparser.ConfigParser()
config.read(ini_file_path[host])
data_dir = config[host]['data_dir']
db = config[host]['db']
log_dir = config[host]['log_dir']

log_file = os.path.join(
    log_dir, f'{datetime.now().strftime("%Y-%m-%d")}.log')
