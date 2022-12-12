import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { StepPage } from './components/step'
import { NotFound } from './components/not-found';
import { Admin } from './components/admin';
import { Layout } from './components/background';
import { Home } from './components/home';
import { QuestionPage } from './components/questions';
import { refineQuestions, Step } from './services/journey';
import { listSnippets, Question } from './services/data';
import { log } from '../utils';
//import { getStudentPos } from './services/student/progress';

const start = 1;
const end = 10;

const step: Step = {
  stepId: 1,
  start: start,
  end: end,
  currentSnippetId: 1,
  snippets: []
};

const display = {
  chars: 300
};

let questions: Question[] = [];

async function loadData() {
  step.snippets = await listSnippets(start, end)
  const s1 = step.snippets.filter(s => s.questions);
  //*todo use replace next line with reduce
  for (const s of s1) questions = questions.concat(s.questions);
  questions = refineQuestions(questions);
}

await loadData();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="step" element={<StepPage step={step} questions={questions} display={display} />} />
          <Route path="question" element={<QuestionPage step={step} questions={questions} display={display} />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
