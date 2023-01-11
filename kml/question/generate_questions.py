import sqlite3 as sl
from kml.utils.config import db
from kml.utils.lib import named_tuple_factory
from kml.utils.utils import log
from kml.question.generate_page_questions import generate_page_questions
from kml.question.save_generated_questions import save_generated_questions


def get_word_count(text: str) -> int:
    return len(text.strip().split(' '))


def generate_questions(subject_id: str, word_count: int):
    sql = """
    select snippet_id, descrlong 
    from snippet
    where subject_id = ?
    and snippet_type in ('T','HE','P')
    order by snippet_id
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        rows = c.execute(sql, (subject_id,)).fetchall()

    page = ""
    page_word_count = 0
    row_index = 0
    a = len(rows)
    while row_index < len(rows):
        row = rows[row_index]
        text = row.descrlong
        page_word_count += get_word_count(text)
        if page_word_count > word_count:
            print(f"text:", page)
            print(f"last snippet id:", row.snippet_id)
            questions = generate_page_questions(page)
            save_generated_questions(
                subject_id=subject_id, snippet_id=row.snippet_id, questions=questions)
            page = text
            page_word_count = 0
        else:
            page += ' ' + text
        row_index += 1


if __name__ == "__main__":
    print(generate_questions(subject_id='GEOG', word_count=80))
