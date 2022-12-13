import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { StepPage } from './components/step'
import { NotFound } from './components/not-found';
import { Admin } from './components/admin';
import { Layout } from './components/layout';
import { Home } from './components/home';
import { Step } from './services/journey';
//import { log } from '../utils';
import { nextLap } from './services/pagination/next-lap';
import { log } from '../utils';
//import { getStudentPos } from './services/student/progress';

export function App() {
    let steps: Step[] = [];

    function getSteps() {
        log(0, '=>getSteps');
        steps = nextLap(0, 80);
        //log(0, 'steps', steps, true);
    }
    
    const display = {
        chars: 300
    };

    
    const [stepNum, setStepNum] = useState(0);

    useEffect(() => {
        log(0, '=>App.useEffect');
        getSteps(); /*to-do fix this */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    log(0, 'stepNum', stepNum, true);
    getSteps();
    const snippetList = steps[stepNum].snippets.reduce((a, i) => a + i.snippetId + ',', '');

    return (
        <Routes>
            <Route path="/" element={<Layout stepNum={stepNum} snippetList={snippetList} />}>
                <Route index element={<Home />} />
                <Route path="step" element={<StepPage steps={steps} display={display} />} />
                <Route path="admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}