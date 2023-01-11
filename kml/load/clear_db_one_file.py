import sqlite3 as sl
from kml.utils.config import db


def clear_db_one_file(subject_id, file_id: int):
    snippet_child_sql = """
    delete from snippet_child
    where exists
        (select 1 from snippet
        where subject_id=?
        and subject_id=snippet_child.subject_id
        and snippet_id=snippet_child.parent_id
        and file_id = ?)
    """

    question_sql = """
    delete from question
    where exists
        (select 1 from snippet
        where subject_id=?
        and subject_id=question.subject_id
        and snippet_id=question.snippet_id
        and file_id = ?)
    """

    answer_sql = """
    delete from answer
    where exists
        (select 1 from snippet
        where subject_id=?
        and subject_id=answer.subject_id
        and snippet_id=answer.snippet_id
        and file_id = ?)
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute(snippet_child_sql, (subject_id, file_id,))
        c.execute(question_sql, (subject_id, file_id,))
        c.execute(answer_sql, (subject_id, file_id,))
        c.execute('delete from snippet where subject_id=? and file_id = ?',
                  (subject_id, file_id,))
