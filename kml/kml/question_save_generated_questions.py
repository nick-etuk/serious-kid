import sqlite3 as sl
from config import db
from init import init
from question_save_answers import save_answer
from utils_get_last_question import get_last_question
from lib import named_tuple_factory
from z_data import sample_questions
from icecream import ic
from utils_utils import log


def save_generated_questions(subject_id: str, topic_id: int, snippet_id: int, questions: any):
    last_question_id, discard_me = get_last_question(
        subject_id=subject_id, topic_id=topic_id, snippet_id=snippet_id)
    next_question_id = int(last_question_id)

    for q in questions['questions']:
        answers = []
        answer_id = 0
        next_question_id += 1
        question = q['question_statement']

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
                            question)).fetchone()

        if row:
            log(f"Duplicate question for snippet {snippet_id}: {question}")
            continue

        sql = """
        insert into question (subject_id, topic_id, snippet_id, question_id, question_type, descr)
        values (?, ?, ?, ?, ?, ?)
        """
        with sl.connect(db) as conn:
            conn.row_factory = named_tuple_factory
            c = conn.cursor()
            c.execute(sql, (subject_id, topic_id, snippet_id,
                      next_question_id, 'T', question))

        answers.append(q['answer'])
        for a in q['options']:
            answer_id += 1
            answers.append(a)
            save_answer(subject_id=subject_id, topic_id=topic_id, snippet_id=snippet_id,
                        question_id=next_question_id, answer_id=answer_id, answer=a)

        for a in q['extra_options']:
            answer_id += 1
            answers.append(a)
            save_answer(subject_id=subject_id, topic_id=topic_id, snippet_id=snippet_id,
                        question_id=next_question_id, answer_id=answer_id, answer=a)

        print(question)
        print(answers)


if __name__ == "__main__":
    init()
    save_generated_questions(subject_id='GEOG',
                             topic_id=1, snippet_id=17, questions=sample_questions)
