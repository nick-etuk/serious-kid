import sqlite3 as sl
from kml.config import db
from kml.lib import named_tuple_factory
from utils_next_id import next_id
from icecream import ic


def save_fragments(level_id: int, subject_id: str, snippet_id: int, content: str, file_id: int):
    if not content:
        return
    print(content)

    fragment_num = 0
    remainder = content
    fragments = [{}]

    lookup_words = ['fertile', 'lava', 'nutrient']

    proceed = True
    while remainder and proceed:
        for word in lookup_words:
            proceed = False
            pos = remainder.find(word)
            if pos != -1:
                proceed = True
                fragment_num += 1
                fragment = {
                    'fragment_num': fragment_num,
                    'type': 'P',
                    'descr': remainder[:pos]
                }
                ic(fragment['descr'])
                fragments.append(fragment)

                fragment_num += 1
                fragment = {
                    'fragment_num': fragment_num,
                    'type': 'L',
                    'descr': word
                }
                ic(fragment['descr'])
                fragments.append(fragment)

                remainder = remainder[pos + len(word):]
                ic(remainder)

    if remainder:
        fragment_num += 1
        fragment = {
            'fragment_num': fragment_num,
            'type': 'P',
            'descr': remainder
        }
        fragments.append(fragment)

    ic(fragments)
    return

    sql = """
    insert into fragment(level_id, subject_id, snippet_id, fragment_num, descr, file_id)
    values (?, ?, ? ,? ,? ,?)

    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        for fragment in fragments:
            c.execute(sql, (level_id, subject_id, snippet_id,
                      fragment['fragment_num'], fragment['descr'], file_id))

    return snippet_id


if __name__ == "__main__":
    content = """That means that around one in 20 people live in an area at risk of volcanic activity. Volcanoes can produce rich, fertile land. Over time, lava and ash break down to produce nutrient-rich soil, great for growing crops! That's why some people like to set up home on the slopes of a volcano."""
    save_fragments(level_id='HS', subject_id='GEOG',
                   snippet_id=100, content=content, file_id=20)
