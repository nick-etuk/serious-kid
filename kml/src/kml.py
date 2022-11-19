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
        self.stack = []

        self.word_boundaries = [' ', '.', ',', ';', ':', '!', "\n"]
        self.sentence_boundaries = ['.', '?', "\n"]

        self.get_content_function = {
            'keyword': {
                'get_content': self.next_word
            },
            'hard': {
                'get_content': self.next_word
            },
            'topic': {
                'get_content': self.next_word
            },
            'amazing': {
                'get_content': self.next_sentence
            },
            'question': {
                'get_content': self.next_sentence
            },
            'answers': {
                'get_content': self.next_sentence
            },
            'heading': {
                'get_content': self.next_sentence
            }
        }

        self.tag_full_name = {
            'q': 'question',
            'a': 'answers',
            'answer': 'answers',
            'k': 'keyword',
            'h': 'hard'
        }

    def pos(self):
        return self.cursor_pos

    def push(self):
        self.stack.append(self.cursor_pos)
        #print(f'cursor saved at {self.cursor_pos}')

    def pop(self):
        self.cursor_pos = self.stack.pop()
        #print(f'cursor restored to {self.cursor_pos}')

    def find_next(self, str: str):
        result = self.content.find(str, self.cursor_pos + 1)
        if result != -1:
            # don't add 1 if we are at the end of the text
            if result == len(self.content):
                self.cursor_pos = result
            else:
                self.cursor_pos = result
            return True
        return False

    def prev_word(self):
        result = ''
        start = self.cursor_pos - 1
        end = self.cursor_pos -1
        char = self.content[start]
        while start > 0 and self.content[start] not in self.word_boundaries:
            char = self.content[start]
            start -= 1
        #if start > 0:start += 1
        result = self.content[start:end + 1]
        self.cursor_pos = start
        return result

    def z_prev_word(self):
        result = ''
        end = self.cursor_pos
        start = 0
        for boundary in self.word_boundaries:
            end = self.content.find(boundary)
            if end: break
        if not end:end = len(self.content)
            
        result = self.content[start:end]

    def next_word(self):
        result = ""
        i = self.cursor_pos + 1
        while i > 0 and self.content[i] not in self.word_boundaries:
            i += 1

        result = self.content[self.cursor_pos + 1:i]
        self.cursor_pos = i
        return result

    def old_next_sentence(self):
        result = ""
        i = self.cursor_pos + 1
        end = len(self.content)
        while i > 0 and i < end and self.content[i] not in self.sentence_boundaries:
            char = self.content[i]
            i += 1

        result = self.content[self.cursor_pos + 1:i]
        self.cursor_pos = i
        return result

    def next_sentence(self):
        result = ''
        start = self.cursor_pos + 1
        end = 0
        for boundary in self.sentence_boundaries:
            end = self.content.find(boundary)
            if end: break
        if not end:end = len(self.content)
            
        result = self.content[start:end]
        return result


    def prev_sentence(self):
        result = ""
        i = self.cursor_pos
        while i >= 0 and self.content[i] not in self.sentence_boundaries:
            i -= 1

        result = self.content[i:self.cursor_pos]
        self.cursor_pos = i
        return result

    def next_tag_content(self, tag: str) -> str:
        tag = tag.lower()
        if not tag in self.get_content_function:
            if not tag in self.tag_full_name:
                print(f'unknown tag <{tag}>')
                return
            tag = self.tag_full_name[tag]
        return self.get_content_function[tag]['get_content']()
