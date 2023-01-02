import sqlite3 as sl
from typing import List
from config import db
from icecream import ic


def add_quotes(obj) -> str:
    if type(obj) is str:
        return "'" + obj + "'"
    return str(obj)


def next_id(table: str, key_values: List[str] = []) -> int:
    lookup_keys = {
        'kml_file': ['file_id'],
        'snippet': ['snippet_id', 'subject_id']
    }

    keys = lookup_keys[table]
    where_clause = ''
    if len(keys) > 1:
        secondary_keys = keys[1:]
        for index, key in enumerate(secondary_keys):
            where_clause += f'and {key} = {add_quotes(key_values[index])} '

    sql = f"""
    select max({keys[0]}) as next_id 
    from {table}
    where 1=1
    {where_clause}
    """
    # print(sql)
    with sl.connect(db) as conn:
        c = conn.cursor()
        row = c.execute(sql).fetchone()

    if row[0]:
        next_id = int(row[0]) + 1
    else:
        next_id = 1

    return next_id


if __name__ == "__main__":
    print(next_id('snippet', ['OLIV', 1]))
