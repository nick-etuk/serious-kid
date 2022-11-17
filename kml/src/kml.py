import os
#from config import data_dir
from icecream import ic
#from lib import named_tuple_factory
#from init import init, log


class KML:
    def __init__(self, content: str):
        content = content.replace("::", "~~")
        self.content = content
        self.cursor_pos = 0

    def pos(self):
        return self.cursor_pos

    def find(self, str: str):
        result = self.content.find(str, self.cursor_pos + 1)
        if result != -1:
            self.cursor_pos = result + 1
            return True
        return False

    def prev_word(self):
        result = ""
        i = self.cursor_pos
        word_boundaries = [' ', '.', ',', "\n"]
        while i > 0 and self.content[i] not in word_boundaries:
            i -= 1

        result = self.content[i:self.cursor_pos-1]
        return result
