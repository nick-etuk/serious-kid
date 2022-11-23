import sqlite3 as sl
from config import db
from lib import named_tuple_factory
from utils_next_id import next_id


def save_para(level_id: int, subject_id: str, content: str, file_id: int) -> int:
    if not content:
        return

    snippet_id = next_id('snippet')

    sql = """
    insert into snippet(level_id, subject_id, snippet_id, snippet_type, descrlong, file_id)
    values (?, ?, ? ,? ,? ,?)

    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute(sql, (level_id, subject_id, snippet_id, 'P', content, file_id))

    return snippet_id
