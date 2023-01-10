import sqlite3 as sl
from kml.config import db
from kml.lib import named_tuple_factory


def save_significant_word(subject_id: str, snippet_id: int, word: str, lemma, pos: str):
    exists = """
    select 1 as result 
    from snippet_dictionary
    where subject_id = ?
    and snippet_id =?
    and word = ?
    and pos = ?
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(exists, (subject_id, snippet_id, word, pos)).fetchone()

    if row and row[0]:
        print(
            f'{word} {pos} is already in the dictionary for paragraph {subject_id} {snippet_id}')
        return

    sql = """
    insert into snippet_dictionary (subject_id, snippet_id, subject_id, word, lemma, pos)
    values (?, ?, ?, ?, ?, ?)
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        c.execute(sql, (subject_id, snippet_id,
                  subject_id, word, lemma, pos))
