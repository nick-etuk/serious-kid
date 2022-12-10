import os
import configparser
from datetime import datetime
import socket
from platform import uname

host = socket.gethostname()
# print('host name:'+host)


def in_wsl() -> bool:
    return 'microsoft-standard' in uname().release


if in_wsl():
    evesham_config_file = r'/mnt/e/Google Drive/asterlan sync/config/serious_kid.ini'
    evesham_hostname = 'Evesham-WSL'
else:
    evesham_config_file = r'E:\\Google Drive\asterlan sync\config\serious_kid.ini'
    evesham_hostname = 'Evesham-Windows'

ini_file_path = {
    'Evesham': evesham_config_file,
    'Thinkpad-Dan': r'/mnt/c/Users/nick_/Google Drive/asterlan sync/config/serious_kid.ini'
}

config = configparser.ConfigParser()
config.read(ini_file_path[host])

if host == 'Evesham':
    host = evesham_hostname
data_dir = config[host]['data_dir']
db = config[host]['db']
log_dir = config[host]['log_dir']

log_file = os.path.join(
    log_dir, f'{datetime.now().strftime("%Y-%m-%d")}.log')
