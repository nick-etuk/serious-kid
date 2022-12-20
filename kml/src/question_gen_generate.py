from pprint import pprint
from Questgen import main

a = """
Volcanoes 
The word "volcano" comes from the Roman name "Vulcan".
"But who was Vulcan?" you might ask. He was the Roman god of fire!
"""
long_text = """
Volcanoes 
The word "volcano" comes from the Roman name "Vulcan".
"But who was Vulcan?" you might ask. He was the Roman god of fire!
Volcano shapes
Volcanoes can be a variety of shapes.
They come in various shapes and sizes, but there are two main types:
cone-shaped, with steep slopes. These are called composite volcanoes.
They can also be wide, with gentle slopes. These are called shield volcanoes.

Volcanic activity
Volcanoes are classified as active, dormant or extinct.
This refers to the amount of volcanic activity. "Active" means there's regular activity, "dormant" means there's been recent activity, but the volcano is currently quiet, and "extinct" means it's been so long since the last eruption that it's unlikely to ever erupt again.
About 1,900 volcanoes on Earth are considered active, likely to explode again. Yikes! 

Where they occur
Volcanoes are often found at meeting points of tectonic plates.
These plates are pieces of the Earth's surface that fit together just like a jigsaw puzzle.
Volcanoes can also occur over mantle plumes.
Mantle plumes are super-hot areas of rock inside the Earth!
Volcanoes don't just occur on land.
They can be found on the ocean floor and under ice caps, too!
Volcanoes exist throughout the solar system!
Other planets and moons have volcanoes, too.


Magma and lava
Magma and lava are two different things!
Magma is the name given to hot liquid rock inside a volcano.
Once the hot liquid rock leaves the volcano, it's known as lava.
Lava from a volcano can reach 1,250°C!
Lava is so hot it can burn everything in its path. If you used a glass thermometer to take the temperature it would melt!

 The world's largest active volcano is Mauna Loa in Hawaii.
Standing a whopping 4,169m tall, this geological giant last erupted in 1984.

In A.D. 79, the Italian town of Pompeii was destroyed and buried by a volcano called Mount Vesuvius.
Incredibly, the ash deposits preserved the town and the remains of the people within it. Today, it's one of Italy’s most popular historical sites!

Most of the world's active volcanoes are found on the "Ring of Fire", a 40,000 km horseshoe shaped area of the Pacific Ocean.

The loudest sound in recorded history was made by a volcano called Krakatau.
Found in Southeast Asia, when Krakatau erupted in 1883 it released 200 megatons of energy – that's the equivalent of 15,000 nuclear bombs. Boom!

Volcanoes and humans
Approximately 350 million people live within "danger range" of an active volcano.
That means that around one in 20 people live in an area at risk of volcanic activity.
Volcanoes can produce rich, fertile land.
Over time, lava and ash break down to produce nutrient-rich soil, great for growing crops! 
That's why some people like to set up home on the slopes of a volcano.

It's not just humans that makes use of volcanoes – birds do, too!
Maleo birds bury their eggs in the sand or soil near volcanoes to keep them warm. When the chicks hatch, they claw their way up to the surface!
Volcanoes are a type of natural Hazard. Other natural hazards are earthquakes, tsunamis, storms, landslides and floods.
"""
old = """
"Sachin Ramesh Tendulkar is a former international cricketer from India and a former captain of the Indian national team. He is widely regarded as one of the greatest batsmen in the history of cricket. He is the highest run scorer of all time in International cricket."
"""


def generate():
    #qe = main.BoolQGen()
    qg = main.QGen()
    payload = {
        "input_text": long_text
    }
    #output = qe.predict_boolq(payload)
    output = qg.predict_mcq(payload)
    return output


if __name__ == "__main__":
    pprint(generate())
