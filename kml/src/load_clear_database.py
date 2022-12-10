import sqlite3 as sl
from config import db


def clear_database(file_id: int):
    snippet_child_sql = """
    delete from snippet_child
    where exists
        (select 1 from snippet
        where level_id=snippet_child.level_id
        and subject_id=snippet_child.subject_id
        and snippet_id=snippet_child.parent_id
        and file_id = ?)
    """

    question_sql = """
    delete from question
    where exists
        (select 1 from snippet
        where level_id=question.level_id
        and subject_id=question.subject_id
        and snippet_id=question.snippet_id
        and file_id = ?)
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute(snippet_child_sql, (file_id,))
        c.execute(question_sql, (file_id,))
        c.execute('delete from snippet where file_id = ?', (file_id,))
