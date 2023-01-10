import os
from icecream import ic
#from kml.lib import named_tuple_factory
#from init import init, log
from kml import KML
from snippet_save_snippet import save_snippet


def get_paragraphs():
    #data_dir = "/mnt/g/data/serious_kid"
    filename = os.path.join(data_dir, "volcanoes.kml.txt")
    with open(filename, 'r') as f:
        content = f.read()

    # remove double new lines
    while "\n\n" in content:
        content = content.replace("\n\n", "\n")

    paragraphs = content.split("\n")

    for para in paragraphs:
        if para == "":
            continue
        para_id = save_snippet(para)
        get_tags(para_id=para_id, content=para)

    # ic(paragraphs)


if __name__ == "__main__":
    #    init()
    get_paragraphs('volcanoes.kml.txt')
    # print('topic:Volcanoes'.find(':'))
    # print('topic:Volcanoes'[5])
