import sqlite3 as sl
from config import db
from dictionary_fetch_meaning import fetch_meaning
from init import init
from lib import named_tuple_factory
from icecream import ic


def add_meanings():
    sql = """
    select word from dictionary
    where meaning = ' '
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        rows = c.execute(sql,)

    if not rows:
        return
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        for row in rows:
            meaning = fetch_meaning(row.word)
            print(f"{row.word}: {meaning}")
            sql = """
            update dictionary
            set meaning=?
            where word=?
            """
            c.execute(sql, (meaning, row.word))


if __name__ == "__main__":
    init()
    add_meanings()
