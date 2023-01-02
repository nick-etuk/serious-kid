import sqlite3 as sl
from config import db
from lib import named_tuple_factory


def get_last_question(subject_id: str, topic_id: int, snippet_id: int) -> str:

    sql = """
    select q.question_id as id, q.descr
    from question q
    where q.subject_id = ?
    and q.topic_id = ?
    and q.snippet_id = ?
    and q.question_id = (
        select max(question_id) from question
        where topic_id = q.topic_id
        and subject_id = q.subject_id
        and snippet_id = q.snippet_id
        )
    """
    args = (subject_id, topic_id, snippet_id)

    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, args).fetchone()

    if row and row[0]:
        return row.id, row.descr

    return 0, ''


if __name__ == "__main__":
    print(get_last_question('GEOG', 1, 4))
