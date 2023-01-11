from icecream import ic
from kml.utils.constants import WORD_BOUNDARIES
from kml.tests.data.para import raw_para
from pke.lang import stopwords
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk import pos_tag


def filter_stopwords(para: str):
    print('=>filter_stopwords')

    # These pos tags cause key errors in site-packages\nltk\corpus\reader\wordnet.py
    excluded_pos_tags = ['``', "''", 'MD']

    # These tags combinations cause key errors in site-packages\nltk\corpus\reader\wordnet.py
    bad_cominations = [('two', 'CD')]

    tokens = word_tokenize(para.lower())
    tags = pos_tag(tokens=tokens, lang='eng')
    # ic(tags)
    stop_words = set(stopwords.words('english') + WORD_BOUNDARIES)
    #stop_words = set(WORD_BOUNDARIES)
    # and not tag[1] in excluded_pos_tags and not tag in bad_cominations]
    filtered = [tag for tag in tags if not tag[0] in stop_words]
    if filtered != tags:
        print(f'filtered:{filtered}')
    print('<=filter_stopwords')
    return filtered


if __name__ == "__main__":
    print(filter_stopwords(raw_para))
