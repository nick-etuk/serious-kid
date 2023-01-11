import sqlite3 as sl
from typing import List
from kml.utils.config import db
from icecream import ic


def add_quotes(obj) -> str:
    if type(obj) is str:
        return "'" + obj + "'"
    return str(obj)


def broken_next_id(table: str, secondary_keys: List[str] = []) -> int:
    """
    usage: snippet_id = next_id(table='snippet', secondary_keys=[subject_id])
    """
    lookup_keys = {
        'kml_file': ['file_id'],
        'snippet': ['snippet_id', 'subject_id']
    }

    keys = lookup_keys[table]
    where_clause = ''
    if len(keys) > 1:
        secondary_keys = keys[1:]
        for index, key in enumerate(secondary_keys):
            where_clause += f'and {key} = {add_quotes(secondary_keys[index])} '

    sql = f"""
    select max({keys[0]}) as next_id 
    from {table}
    where 1=1
    {where_clause}
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        row = c.execute(sql).fetchone()

    if row[0]:
        next_id = int(row[0]) + 1
    else:
        next_id = 1

    print(f'next_id:{next_id}')
    print(f'next id select statement:{sql}')
    return next_id


if __name__ == "__main__":
    print(broken_next_id('snippet', ['OLIV', 1]))
