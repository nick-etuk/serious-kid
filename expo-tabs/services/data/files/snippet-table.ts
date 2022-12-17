import { Snippet } from "../data.interface";

export const snippetTable: Snippet[] = [
  {
    snippetId: 1,
    snippetType: "HE",
    descr: "Volcanoes",
    questions: [],
  },
  {
    snippetId: 2,
    snippetType: "I",
    descr: "volcano.jpg",
    questions: [],
  },
  {
    snippetId: 3,
    snippetType: "P",
    descr: `The word "volcano" comes from the Roman name "Vulcan"`,
    questions: [],
  },
  {
    snippetId: 4,
    snippetType: "P",
    descr: `"But who was Vulcan?" you might ask. He was the Roman god of fire!`,
    questions: [
      {
        snippetId: 5,
        questionSeq: 1,
        questionType: "T",
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
    snippetId: 5,
    snippetType: "HE",
    descr: "Volcano shapes",
    questions: [],
  },
  {
    snippetId: 6,
    snippetType: "P",
    descr: `Volcanoes can be a variety of shapes.`,
    questions: [],
  },
  {
    snippetId: 7,
    snippetType: "P",
    descr: `They come in various shapes and sizes, but there are two main types:`,
    questions: [],
  },
  {
    snippetId: 8,
    snippetType: "P",
    descr: `cone-shaped, with steep slopes. These are called composite volcanoes.`,
    questions: [],
  },
  {
    snippetId: 9,
    snippetType: "P",
    descr: `They can also be wide, with gentle slopes. These are called shield volcanoes.`,
    questions: [],
  },
  {
    snippetId: 10,
    snippetType: "HE",
    descr: "Volcanic activity",
    questions: [],
  },
  {
    snippetId: 11,
    snippetType: "P",
    descr: `Volcanoes are classified as active, dormant or extinct.`,
    questions: [],
  },
  {
    snippetId: 12,
    snippetType: "P",
    descr: `This refers to the amount of volcanic activity. "Active" means there's regular activity, "dormant" means there's been recent activity, but the volcano is currently quiet, and "extinct" means it’s been so long since the last eruption that it’s unlikely to ever erupt again.`,
    questions: [],
  },
  {
    snippetId: 13,
    snippetType: "P",
    descr: `amazing:About 1,900 volcanoes on Earth are considered active, likely to explode again. Yikes!`,
    questions: [],
  },
  {
    snippetId: 14,
    snippetType: "HE",
    descr: "Where they occur",
    questions: [],
  },
  {
    snippetId: 15,
    snippetType: "P",
    descr: `Volcanoes are often found at meeting points of topic:tectonic plates:.`,
    questions: [],
  },
  {
    snippetId: 16,
    snippetType: "P",
    descr: `These plates are pieces of the Earth's surface that fit together just like a jigsaw puzzle.`,
    questions: [],
  },
  {
    snippetId: 17,
    snippetType: "P",
    descr: `Volcanoes can also occur over hard:mantle plumes:.`,
    questions: [],
  },
  {
    snippetId: 18,
    snippetType: "P",
    descr: `Mantle plumes are super-hot areas of rock inside the Earth!`,
    questions: [],
  },
  {
    snippetId: 19,
    snippetType: "P",
    descr: `Volcanoes don't just occur on land.`,
    questions: [],
  },
  {
    snippetId: 20,
    snippetType: "P",
    descr: `They can be found on the ocean floor and under ice caps, too!`,
    questions: [],
  },
  {
    snippetId: 21,
    snippetType: "P",
    descr: `Volcanoes exist throughout the solar system!`,
    questions: [],
  },
  {
    snippetId: 22,
    snippetType: "P",
    descr: `Other planets and moons have volcanoes, too.`,
    questions: [],
  },
];
