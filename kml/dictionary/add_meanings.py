import sqlite3 as sl
from icecream import ic
from kml.utils.config import db
from kml.dictionary.api.mock_oxford_api import MockOxfordAPI
from kml.utils.init import init
from kml.utils.lib import named_tuple_factory


def add_meanings(dictionary_api):
    update_sql = """
    select subject_id, level_id, lemma, pos 
    from dictionary
    where meaning = ' '
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        rows = c.execute(update_sql,)

    if not rows:
        return

    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        for row in rows:
            result = dictionary_api.fetch_meanings(row.lemma, row.pos)
            ic(result)
            meaning = ' . It can also mean '.join(result['meanings'])
            print(f"{row.lemma}: {meaning}")
            update_sql = """
            update dictionary
            set meaning=?
            where subject_id = ?
            and level_id = ?
            and lemma=?
            and pos=?
            """
            c.execute(update_sql, (meaning, row.subject_id,
                      row.level_id, row.lemma, row.pos))

            delete_sql = """
            delete from synonym
            where subject_id = ?
            and level_id = ?
            and lemma = ?
            and pos = ?
            """
            c.execute(delete_sql, (row.subject_id,
                      row.level_id, row.lemma, row.pos))

            insert_sql = """
            insert into synonym(subject_id, level_id, lemma, pos, synonym, meaning, source)
            values(?,?,?,?,?,?,?)
            """
            for syn in result['synonyms']:
                c.execute(insert_sql, (row.subject_id, row.level_id, row.lemma,
                          row.pos, syn['synonym'], syn['meaning'], 'DIAPI'))


if __name__ == "__main__":
    init()
    add_meanings()
