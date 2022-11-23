import sqlite3 as sl
from config import db
from utils_get_last_item import get_last_item
from lib import named_tuple_factory
from utils_next_id import next_id


def save_answer(level_id: int, subject_id: str, question_id: int, answer_id: int, answer: str):
    sql = """
    insert into answer (level_id, subject_id, snippet_id, answer_id, descr)
    values (?, ?, ?, ?, ?)
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        c.execute(sql, (question_id, level_id, subject_id, answer_id, answer))


def save_answers(level_id: int, subject_id: str, content: str, file_id: int):
    snippet_id, descr = get_last_item('snippet', 'Q', file_id)
    answers = content.split(',')
    for index, answer in enumerate(answers):
        print(f'Answer to {descr}: {index}.{answer.strip()}')
        save_answer(level_id=level_id, subject_id=subject_id,
                    question_id=snippet_id, answer_id=index, answer=answer.strip())


def save_tag(level_id: int, subject_id: str, tag_name: str, type: str, content: str, para_id: int, file_id: int) -> int:
    if not content:
        return
    if tag_name == 'answers':
        save_answers(level_id, subject_id, content, file_id)

    sql = """
    select snippet_id
    from snippet
    where level_id = ?
    and subject_id = ?
    and descr = ?
    and snippet_type = ?
    and descrlong = ?
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, (level_id, subject_id,
                        tag_name, type, content)).fetchone()

    if row:
        return row.snippet_id

    tag_id = next_id('snippet')

    sql = """
    insert into snippet(level_id, subject_id, snippet_id, snippet_type, descr, descrlong, file_id)
    values (? ,? ,?, ? ,? ,? ,?)
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute(sql, (level_id, subject_id,
                        tag_id, type, tag_name, content, file_id))

    sql = """
        select 1 from snippet_child
        where level_id=?
        and subject_id=?
        and parent_id = ? 
        and child_id = ?
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        child_row = c.execute(
            sql, (level_id, subject_id, para_id, tag_id)).fetchone()

    if not child_row:
        sql = """
        insert into snippet_child(level_id, subject_id, parent_id, child_id)
        values (?, ?, ?, ?)
        """
        with sl.connect(db) as conn:
            c = conn.cursor()
            c.execute(sql, (level_id, subject_id, para_id, tag_id))

    return tag_id
