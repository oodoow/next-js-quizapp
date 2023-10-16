import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Question} from '../components/question'
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import arrayShuffle from 'array-shuffle';
import { questions } from '../helpers/questions';

const numberOfQuestions = 5;

export default function Home() {
  let [pickedQuestions, setPickedQuestions] = useState([]);
  let [selectedIndex, setSelectedIndex] = useState(0);
  let [rightAnswers, setRightAnswers] = useState(0);

  const getQuestions = ()=>
  {
    const five =  arrayShuffle(questions).slice(0,numberOfQuestions);
    
    return five.map((x)=>{
      const answers = [{text:x.correctAnswer, correct:true},...x.incorrectAnswers.map((y)=>{return {text:y, correct:false}})];
      return {
        text:x.text,
        answers: arrayShuffle(answers)
      }
    });
  }

  const newQuiz = ()=>
  {
    pickedQuestions = getQuestions();
    setSelectedIndex(0);
    setRightAnswers(0);
  }

  const answerClicked=(index)=>
  {
    const question = pickedQuestions[selectedIndex];
    if(question?.answers[index]?.correct)
    {
      console.log(true);
      rightAnswers++;
      setRightAnswers(rightAnswers);
    }
    else
    {
      console.log(false);
    }

    setSelectedIndex(selectedIndex+1)
  }

  useEffect(() => {
    pickedQuestions = getQuestions();
    setPickedQuestions(pickedQuestions);
  }, []);

 
  return (
    <div className={styles.container}>
      <Head>
        <title>Quiz!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
        {selectedIndex<numberOfQuestions? <Question question = {pickedQuestions[selectedIndex] || {}} answerClicked={answerClicked}/>:
        <div>
        <p>Quiz finished - correct answers {rightAnswers}/{numberOfQuestions}</p>
        <button onClick={newQuiz}>New Quiz</button>
        </div>
        }
        </div>
      </main>
    </div>
  );
}
