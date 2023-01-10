import os
import pandas as pd
from kml.constants import FREQUENCY_THRESHOLD_MEDIUM
from kml.config import data_dir


def world_significant_words(frequency_file):
    df = pd.read_csv(frequency_file)
    df['word'] = df['word'].astype('str')
    medium = df[df['word_count'] < FREQUENCY_THRESHOLD_MEDIUM]
    medium = medium[(medium.word.str.len() > 3)]
    result = medium['word'].values.tolist()
    return result


if __name__ == "__main__":
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    df = world_significant_words(frequency_file)
    print('world_significant_words:')
    df.head(20)
