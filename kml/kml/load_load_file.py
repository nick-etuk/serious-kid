import os
from dictionary.dictionary_add_meanings import add_meanings
from dictionary_hard_words import hard_words
from dictionary_save_hard_word import save_hard_word
from init import init
from kml import KML
from question_generate_questions import generate_questions
from utils_get_last_snippet import get_last_snippet
from tag_save_tag import save_tag
from snippet_save_snippet import save_snippet
from tags_get_tags import get_tags

from utils_next_id import next_id
from config import data_dir
import sqlite3 as sl
from config import db
from lib import named_tuple_factory
from constants import TAG_TYPE
from load.clear_db_one_file import clear_db_one_file
from load.clear_db_all_files import clear_db_all_files


def load_file(subject_id, topic_id: int, level_id: str, filename: str) -> int:
    sql = """
    select file_id from kml_file
    where filename=?
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, (filename,)).fetchone()

    if row:
        file_id = row.file_id
        clear_db_one_file(file_id)
    else:
        sql = """
        insert into kml_file(file_id, filename, subject_id, topic_id, level_id)
        values (?, ?, ?, ?, ?)
        """
        file_id = next_id(table='kml_file')
        with sl.connect(db) as conn:
            c = conn.cursor()
            c.execute(sql, (file_id, filename, level_id, topic_id, subject_id))

    filename = os.path.join(data_dir, filename)
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # remove double newlines
    text = text.replace("\n\n", "\n")

    paragraphs = text.split("\n")

    for para in paragraphs:
        if para == "":
            continue
        print(para)
        kml = KML(para)
        has_sentence_tags = False
        tags, updated_para = get_tags(para)
        for tag in tags:
            if kml.get_tag_type(tag[0]) == TAG_TYPE['sentence']:
                has_sentence_tags = True
                break
        if has_sentence_tags:
            snippet_id, descr = get_last_snippet(
                subject_id=subject_id, topic_id=topic_id, snippet_type='P')
        else:
            snippet_id = save_snippet(subject_id=subject_id, topic_id=topic_id,
                                      level_id=level_id, content=updated_para, file_id=file_id)

        for tag in tags:
            save_tag(subject_id=subject_id, topic_id=topic_id,
                     level_id=level_id, parent_id=snippet_id,
                     tag_name=tag[0], type=kml.get_tag_code(tag[0]), content=tag[1], file_id=file_id)

    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    hard = hard_words(filename, frequency_file)
    for word in hard:
        save_hard_word(level_id=level_id, subject_id=subject_id, word=word)
    if hard:
        add_meanings()

    generate_questions(subject_id=subject_id, topic_id=topic_id, word_count=50)


if __name__ == "__main__":
    init()
    clear_db_all_files()
    load_file(subject_id='GEOG', topic_id=1,
              level_id='HS', filename='volcanoes.kml.txt')
    load_file(subject_id='GEOG', topic_id=2, level_id='HS',
              filename='earthquakes.kml.txt')
    load_file(subject_id='GEOG', topic_id=3, level_id='HS',
              filename='tectonic plates.kml.txt')
    load_file(subject_id='OLIV', topic_id=1, level_id='HS',
              filename=r'oliver\chapter1.txt')
