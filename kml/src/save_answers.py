import sqlite3 as sl
from config import db
from utils_get_last_item import get_last_item
from lib import named_tuple_factory


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
    snippet_id, descr = get_last_item(
        'snippet', 'P', level_id=level_id, subject_id=subject_id, id=file_id)
    answers = content.split(',')
    for index, answer in enumerate(answers):
        print(f'Answer to {descr}: {index}.{answer.strip()}')
        save_answer(level_id=level_id, subject_id=subject_id,
                    question_id=snippet_id, answer_id=index, answer=answer.strip())
