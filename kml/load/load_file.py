import os
import sqlite3 as sl
from kml.dictionary.add_meanings import add_meanings
from kml.dictionary.dictionary_pipeline import dictionary_pipeline
# from kml.dictionary_file_significant_words import file_significant_words
# from kml.dictionary.sa _save_hard_word import save_hard_word
from kml.utils.init import init
from kml.parse.parse import ParseKML
from kml.question.generate_questions import generate_questions
from kml.utils.get_last_snippet import get_last_snippet
from kml.tag.save_tag import save_tag
from kml.snippet.save_snippet import save_snippet
from kml.tag.get_tags import get_tags
from kml.utils.next_file_id import next_file_id
from kml.utils.config import data_dir
from kml.utils.config import db
from kml.utils.lib import named_tuple_factory
from kml.utils.constants import TAG_TYPE
from kml.load.clear_db_one_file import clear_db_one_file
from kml.load.clear_db_all_files import clear_db_all_files


def load_file(subject_id, topic_id: int, level_id: str, filename: str, dictionary_api) -> int:
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
        clear_db_one_file(subject_id, file_id)
    else:
        sql = """
        insert into kml_file(file_id, filename, subject_id, topic_id, level_id)
        values (?, ?, ?, ?, ?)
        """
        file_id = next_file_id(subject_id)
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
        print(f'=>load_file next paragraph')
        if para == "":
            continue
        print(f'{para}')
        kml = ParseKML(para)
        has_sentence_tags = False
        tags, updated_para = get_tags(para)
        if updated_para != para:
            print(f'updated_para:{updated_para}')
        for tag in tags:
            if kml.get_tag_type(tag[0]) == TAG_TYPE['sentence']:
                has_sentence_tags = True
                break
        if has_sentence_tags:
            snippet_id, descr = get_last_snippet(
                subject_id=subject_id, snippet_type='P')
        else:
            snippet_id = save_snippet(subject_id=subject_id, topic_id=topic_id,
                                      level_id=level_id, content=updated_para, file_id=file_id)

        for tag in tags:
            save_tag(subject_id=subject_id,
                     level_id=level_id, parent_id=snippet_id,
                     tag_name=tag[0], type=kml.get_tag_code(tag[0]), content=tag[1], file_id=file_id)

        dictionary_pipeline(subject_id=subject_id,
                            snippet_id=snippet_id, text=updated_para)
        add_meanings(dictionary_api)
    '''
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    hard = file_significant_words(filename, frequency_file)
    for word in hard:
        save_hard_word(level_id=level_id, subject_id=subject_id, word=word)
    if hard:
        add_meanings()
    '''
    generate_questions(subject_id=subject_id, word_count=50)
    print(f'<=load_file paragraph')


if __name__ == "__main__":
    init()
    # clear_db_all_files('GEOG')
    load_file(subject_id='GEOG', topic_id=1,
              level_id='HS', filename='volcanoes.kml.txt')
    load_file(subject_id='GEOG', topic_id=2, level_id='HS',
              filename='earthquakes.kml.txt')
    load_file(subject_id='GEOG', topic_id=3, level_id='HS',
              filename='tectonic plates.kml.txt')
    load_file(subject_id='OLIV', topic_id=1, level_id='HS',
              filename=r'oliver\chapter1.txt')
