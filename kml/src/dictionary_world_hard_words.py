import os
import pandas as pd


def world_hard_words(frequency_file):
    THRESHOLD_MEDIUM = 7660350
    df = pd.read_csv(frequency_file)
    df['word'] = df['word'].astype('str')
    # &                 (df['word'].str.len() <= 4)
    medium = df[df['word_count'] < THRESHOLD_MEDIUM]
    medium = medium[(medium.word.str.len() > 3)]
    # print(medium.shape)
    # print(medium.head(20))
    # print(short.shape)
    # print(short.head(200))
    #short.to_csv(r'g:\del\medium.txt', sep='\t')

    return medium['word']
