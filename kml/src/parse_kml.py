import os
#from config import data_dir
from icecream import ic
#from lib import named_tuple_factory
#from init import init, log
from kml import KML


def get_tags(id: int, content: str):
    print(f"Paragaph {id} tags:")
    kml = KML(content)
    while kml.find(":"):
        tag = kml.prev_word()
        print(tag)


def get_paragraphs():
    data_dir = "/mnt/g/data/serious_kid"
    filename = os.path.join(data_dir, "volcanoes.kml.txt")
    with open(filename, 'r') as f:
        content = f.read()

    # remove double new lines
    while "\n\n" in content:
        content = content.replace("\n\n", "\n")

    paragraphs = content.split("\n")

    para_id = 0
    paras = {}
    for para in paragraphs:
        para_id += 1
        if para == "":
            continue
        paras[para_id] = para
        get_tags(id=para_id, content=para)

    # ic(paragraphs)


if __name__ == "__main__":
    #    init()
    get_paragraphs()
