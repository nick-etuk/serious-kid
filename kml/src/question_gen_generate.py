from pprint import pprint
from Questgen import main

a = """
Volcanoes 
The word "volcano" comes from the Roman name "Vulcan".
"But who was Vulcan?" you might ask. He was the Roman god of fire!
"""
b = """
"Sachin Ramesh Tendulkar is a former international cricketer from India and a former captain of the Indian national team. He is widely regarded as one of the greatest batsmen in the history of cricket. He is the highest run scorer of all time in International cricket."
"""


def generate():
    qe = main.BoolQGen()
    #qg = main.QGen()
    payload = {
        "input_text": a
    }
    output = qe.predict_boolq(payload)
    #output = qg.predict_mcq(payload)
    return output


if __name__ == "__main__":
    pprint(generate())
