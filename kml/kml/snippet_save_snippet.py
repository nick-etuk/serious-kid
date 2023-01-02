import sqlite3 as sl
from config import db
from lib import named_tuple_factory
from utils_next_id import next_id


def save_snippet(subject_id: str, topic_id: int, level_id: str, content: str, file_id: int) -> int:
    if not content:
        return

    snippet_id = next_id(table='snippet', key_values=[subject_id, topic_id])

    sql = """
    insert into snippet(subject_id, topic_id, level_id, snippet_id, snippet_type, descrlong, file_id)
    values (?, ?, ? ,? ,? ,? ,?)

    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute(sql, (subject_id, topic_id, level_id,
                  snippet_id, 'P', content, file_id))

    return snippet_id
