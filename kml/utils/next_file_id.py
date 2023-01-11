import sqlite3 as sl
from typing import List
from kml.utils.config import db
from icecream import ic


def next_file_id(subject_id) -> int:
    sql = """
    select max(file_id) as next_id 
    from kml_file
    where 1=1
    and subject_id = ?
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        row = c.execute(sql).fetchone()

    if row[0]:
        next_id = int(row[0]) + 1
    else:
        next_id = 1

    print(f'next_file_id:{next_id}')
    return next_id


if __name__ == "__main__":
    print(next_file_id('OLIV'))
