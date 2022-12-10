import sqlite3 as sl
from config import db
from utils_get_last_item import get_last_item
from lib import named_tuple_factory


def save_question(level_id: int, subject_id: str, snippet_id: int, content: str):
    seq, discard_me = get_last_item(
        table='question', type='', level_id=level_id, subject_id=subject_id, id=snippet_id)
    sql = """
    insert into question (level_id, subject_id, snippet_id, seq, question_type, descr)
    values (?, ?, ?, ?, ?, ?)
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        c.execute(sql, (level_id, subject_id, snippet_id,
                  int(seq) + 1, 'T', content))
