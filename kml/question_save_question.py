import sqlite3 as sl
from kml.config import db
from init import log
from utils_get_last_question import get_last_question
from kml.lib import named_tuple_factory


def save_question(subject_id: str, topic_id: int, snippet_id: int, content: str):
    sql = """
    select question_id
    from question
    where subject_id = ?
    and snippet_id = ?
    and descr = ?
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, (subject_id, topic_id, snippet_id,
                        content)).fetchone()

    if row:
        log(f"Duplicate question for snippet {snippet_id}: {content}")
        return

    question_id, discard_me = get_last_question(
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
