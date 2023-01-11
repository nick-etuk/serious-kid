import sqlite3 as sl
from kml.utils.config import db


def clear_db_all_files(subject_id):
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute("delete from snippet_child where subject_id=?", (subject_id,))
        c.execute("delete from question where subject_id=?", (subject_id,))
        c.execute("delete from snippet where subject_id=?", (subject_id,))
