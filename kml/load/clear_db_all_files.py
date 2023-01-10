import sqlite3 as sl
from kml.config import db


def clear_db_all_files():
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute("delete from snippet_child")
        c.execute("delete from question")
        c.execute("delete from snippet")
