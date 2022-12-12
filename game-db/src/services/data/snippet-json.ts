import { Snippet } from "./data.interface";

export const snippetDb: Snippet[] = [
  {
    snippetId: 1,
    snippetType: "HE",
    descr: "Volcanoes",
    questions: [],
  },
  {
    snippetId: 2,
    snippetType: "P",
    descr: `The word "volcano" comes from the Roman name "Vulcan"`,
    questions: [],
  },
  {
    snippetId: 3,
    snippetType: "P",
    descr: `"But who was Vulcan?" you might ask. He was the Roman god of fire!`,
    questions: [
      {
        snippetId: 3,
        questionSeq: 1,
        questionsnippetType: "T",
        descr: "who was Vulcan?",
        answers: [
          {
            answerSeq: 1,
            descr: "the Roman god of fire",
          },
          {
            answerSeq: 2,
            descr: "a greek god",
          },
          {
            answerSeq: 3,
            descr: "or a type of tyre",
          },
        ],
      },
    ],
  },
  {
    snippetId: 4,
    snippetType: "HE",
    descr: "Volcano shapes",
    questions: [],
  },
  {
    snippetId: 5,
    snippetType: "P",
    descr: `Volcanoes can be a variety of shapes.`,
    questions: [],
  },
  {
    snippetId: 6,
    snippetType: "P",
    descr: `They come in various shapes and sizes, but there are two main types:`,
    questions: [],
  },
  {
    snippetId: 7,
    snippetType: "P",
    descr: `cone-shaped, with steep slopes. These are called keyword:composite volcanoes:.`,
    questions: [],
  },
  {
    snippetId: 8,
    snippetType: "P",
    descr: `They can also be wide, with gentle slopes. These are called keyword:shield volcanoes:.`,
    questions: [],
  },
  {
    snippetId: 9,
    snippetType: "HE",
    descr: "Volcanic activity",
    questions: [],
  },
  {
    snippetId: 10,
    snippetType: "P",
    descr: `Volcanoes are classified as keyword:active, keyword:dormant or keyword:extinct.
              This refers to the amount of volcanic activity. "Active" means there's regular activity, "dormant" means there's been recent activity, but the volcano is currently quiet, and "extinct" means it’s been so long since the last eruption that it’s unlikely to ever erupt again.
              amazing:About 1,900 volcanoes on Earth are considered active, likely to explode again. Yikes!`,
    questions: [],
  },
  {
    snippetId: 11,
    snippetType: "HE",
    descr: "Where they occur",
    questions: [],
  },
  {
    snippetId: 12,
    snippetType: "P",
    descr: `Volcanoes are often found at meeting points of topic:tectonic plates:.
              These plates are pieces of the Earth's surface that fit together just like a jigsaw puzzle.
              Volcanoes can also occur over hard:mantle plumes:.
              Mantle plumes are super-hot areas of rock inside the Earth!
              Volcanoes don't just occur on land.
              They can be found on the ocean floor and under ice caps, too!
              Volcanoes exist throughout the solar system!
              Other planets and moons have volcanoes, too.`,
    questions: [],
  },
];
