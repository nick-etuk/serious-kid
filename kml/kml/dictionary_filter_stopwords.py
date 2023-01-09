from icecream import ic
from constants import WORD_BOUNDARIES
from tests_data_para import raw_para
from pke.lang import stopwords
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk import pos_tag


def filter_stopwords(para: str):
    tokens = word_tokenize(para.lower())
    tags = pos_tag(tokens=tokens, lang='eng')
    ic(tags)
    stop_words = set(stopwords.words('english') + WORD_BOUNDARIES)
    #stop_words = set(WORD_BOUNDARIES)
    result = [tag for tag in tags if not tag[0] in stop_words]
    return result


if __name__ == "__main__":
    print(filter_stopwords(raw_para))
