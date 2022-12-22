import sqlite3 as sl
from config import db
from utils_get_last_question import get_last_question
from lib import named_tuple_factory


def save_question(subject_id: str, topic_id: int, snippet_id: int, content: str):
    question_id = get_last_question(
        subject_id=subject_id, topic_id=topic_id, snippet_id=snippet_id)
    sql = """
    insert into question (subject_id, topic_id, snippet_id, question_id, question_type, descr)
    values (?, ?, ?, ?, ?, ?)
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        c.execute(sql, (subject_id, topic_id, snippet_id,
                  int(question_id) + 1, 'T', content))
