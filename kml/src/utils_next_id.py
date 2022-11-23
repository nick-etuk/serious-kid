import sqlite3 as sl
from config import db


def next_id(table: str) -> int:
    keys = {
        'kml_file': 'file_id',
        'snippet': 'snippet_id'
    }

    key = keys[table]

    sql = f"""
    select max({key}) as next_id from {table}
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        row = c.execute(sql).fetchone()

    if row[0]:
        next_id = int(row[0]) + 1
    else:
        next_id = 1

    return next_id


if __name__ == "__main__":
    print(next_id('snippet'))
