import sqlite3 as sl
from kml.utils.config import db
from kml.dictionary.save_significant_word import save_significant_word
from kml.utils.get_last_question import get_last_question
from kml.utils.lib import named_tuple_factory
from kml.utils.next_id import next_id
from kml.utils.utils import log
from kml.question.save_answers import save_answers
from kml.question.save_question import save_question


def save_tag(subject_id: str, level_id: str, parent_id: int, tag_name: str, type: str, content: str, file_id: int) -> int:
    if not content:
        return

    if tag_name == 'question':
        save_question(subject_id=subject_id,
                      snippet_id=parent_id, content=content)
    if tag_name == 'answers':
        question_id, question_text = get_last_question(
            subject_id=subject_id, snippet_id=parent_id)
        save_answers(subject_id=subject_id, snippet_id=parent_id,
                     question_id=question_id, question_text=question_text, answer_text=content)
        return
    elif tag_name == 'hard':
        save_significant_word(subject_id=subject_id, level_id=level_id,
                              word=content)
        return

    # Warn of duplicate tags
    # duplicates are allowed, e.g multiple keyword tags for one snippet
    sql = """
    select snippet_id
    from snippet
    where subject_id = ?
    and level_id = ?
    and snippet_type = ?
    and descrlong = ?
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, (subject_id, level_id,
                              type, content)).fetchone()

    if row:
        log(f"Warning: duplicate tag",
            f"{tag_name} already exists for snippet {parent_id}")
        # return row.snippet_id

    tag_id = next_id(table='snippet', secondary_keys=[subject_id])

    sql = """
    insert into snippet(subject_id, level_id, snippet_id, snippet_type, descrlong, file_id)
    values (? ,? ,?, ? ,? ,? ,?)
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute(sql, (subject_id, level_id,
                        tag_id, type, content, file_id))

    sql = """
        select 1 from snippet_child
        where subject_id = ?
        and parent_id = ? 
        and child_id = ?
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        child_row = c.execute(
            sql, (subject_id, parent_id, tag_id)).fetchone()

    if not child_row:
        sql = """
        insert into snippet_child(subject_id, parent_id, child_id)
        values (?, ?, ?)
        """
        with sl.connect(db) as conn:
            c = conn.cursor()
            c.execute(sql, (subject_id, parent_id, tag_id))

    return tag_id
