import pandas as pd
from constants import FREQUENCY_THRESHOLD_MEDIUM


def world_hard_words(frequency_file):
    df = pd.read_csv(frequency_file)
    df['word'] = df['word'].astype('str')
    medium = df[df['word_count'] < FREQUENCY_THRESHOLD_MEDIUM]
    medium = medium[(medium.word.str.len() > 3)]

    return medium['word']
