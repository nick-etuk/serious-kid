import os
from dictionary_add_meanings import add_meanings
from dictionary_hard_words import hard_words
from dictionary_save_hard_word import save_hard_word
from init import init
from kml import KML
from utils_get_last_item import get_last_item
from save_tag import save_tag
from save_para import save_para
from tags_get_tags import get_tags

from utils_next_id import next_id
from config import data_dir
import sqlite3 as sl
from config import db
from lib import named_tuple_factory
from constants import TAG_TYPE
from load_clear_database import clear_database


def load_file(level_id, subject_id, filename: str) -> int:
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
        clear_database(file_id)
    else:
        sql = """
        insert into kml_file(level_id, subject_id, file_id, filename)
        values (?, ?, ?, ?)
        """
        file_id = next_id('kml_file')
        with sl.connect(db) as conn:
            c = conn.cursor()
            c.execute(sql, (level_id, subject_id, file_id, filename))

    filename = os.path.join(data_dir, filename)
    with open(filename, 'r') as f:
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
            para_id, descr = get_last_item(
                'snippet', 'P', level_id=level_id, subject_id=subject_id, id=file_id)
        else:
            para_id = save_para(level_id=level_id,
                                subject_id=subject_id, content=updated_para, file_id=file_id)

        for tag in tags:
            save_tag(level_id=level_id, subject_id=subject_id,
                     tag_name=tag[0], type=kml.get_tag_code(tag[0]), content=tag[1], para_id=para_id, file_id=file_id)

    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    hard = hard_words(filename, frequency_file)
    for word in hard:
        save_hard_word(level_id=level_id, subject_id=subject_id, word=word)
    if hard:
        add_meanings()


if __name__ == "__main__":
    init()
    #load_file('HS', 'GEOG', 'volcanoes.kml.txt')
    load_file('HS', 'GEOG', 'tectonic plates.kml.txt')
