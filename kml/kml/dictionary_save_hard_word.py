import sqlite3 as sl
from config import db
from lib import named_tuple_factory


def save_hard_word(level_id: int, subject_id: str, word: str):
    exists = """
    select 1 as result 
    from dictionary
    where level_id = ?
    and word = ?
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(exists, (level_id, word)).fetchone()

    if row and row[0]:
        print(f'{word} is already in the dictionary')
        return

    sql = """
    insert into dictionary (level_id, subject_id, word)
    values (?, ?, ?)
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        c.execute(sql, (level_id, subject_id, word))
