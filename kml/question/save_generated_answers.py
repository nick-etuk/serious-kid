import sqlite3 as sl
from kml.utils.config import db
from kml.utils.lib import named_tuple_factory


def save_generated_answer(subject_id: str, snippet_id: int, question_id: int, answer_id: int, answer: str):
    sql = """
    insert into answer (subject_id, snippet_id, question_id, answer_id, descr)
    values (?, ?, ?, ?, ?)
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        c.execute(sql, (subject_id, snippet_id,
                  question_id, answer_id, answer))


def save_generated_answers(subject_id: str, snippet_id: int, question_id: int, question: str, content: str):
    answers = content.split(',')
    for index, answer in enumerate(answers):
        print(f'Answer to {question}: {index}.{answer.strip()}')
        save_generated_answer(subject_id=subject_id, snippet_id=snippet_id,
                              question_id=question_id, answer_id=index, answer=answer.strip())
