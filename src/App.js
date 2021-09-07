import React, { useEffect, useState } from 'react'
import './App.css'
import { RatingView } from 'react-simple-star-rating'


function App() {

  const quizData = require("./questions.json")
  const [quizIndex, setQuixIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [minScore, setMinScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isRight, setisRight] = useState(null)
  const [disabled, setDisabled] = useState(null)
  const [isComplete, setIsComplete] = useState(false)

  console.log("dasdas", score, minScore, maxScore)

  useEffect(() => {
    let array = []
    array = [...quizData[quizIndex].incorrect_answers, quizData[quizIndex].correct_answer]
    setAnswers(array.sort((a, b) => Math.random() - 0.5))
  }, [quizIndex, quizData])
  const updateQuixIndex = () => {
    if (quizIndex + 1 < quizData.length) {
      setQuixIndex(quizIndex + 1)
      setSelectedIndex(null)
      setisRight(null)
      setDisabled(null)
    } else if (quizIndex + 1 === quizData.length) {
      setIsComplete(true)
    }
  }
  const onPressOption = (index , ans) => {
    setSelectedIndex(index)
    setDisabled(true)
    if (ans === quizData[quizIndex].correct_answer) {
      setScore(score + 10)
      setisRight(true)
    } else {
      setisRight(false)
    }
    setMinScore((score + ((quizData.length - quizIndex) * 0)) / quizData.length * 10)
      setMaxScore((score + ((quizData.length - quizIndex) * 10)) / quizData.length * 10)
  }
  const ProgressBar = ({ bgcolor, progress, height }) => {

    const Parentdiv = {
      height: height,
      width: '100%',
      backgroundColor: 'white',
    }
    const Childdiv = {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: bgcolor,
      textAlign: 'right'
    }
    return (
      <div style={Parentdiv}>
        <div style={Childdiv}>
        </div>
      </div>
    )
  }
  const MultiProgressBar = ({ firstbgcolor, secondbgcolor, thirdbgcolor, height }) => {

    const Parentdiv = {
      height: height,
      width: `${quizData.length * 5}%`,
      backgroundColor: 'white',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'black',
      marginTop: 40
    }
    const Childdiv = {
      height: '100%',
      width: `${maxScore}%`,
      backgroundColor: firstbgcolor,
      textAlign: 'right'
    }
    const SecondChild = {
      height: '100%',
      width: `${score / 2}%`,
      backgroundColor: secondbgcolor,
      textAlign: 'right',
      zIndex: +1
    }
    const ThirdChild = {
      height: '100%',
      width: `${minScore}%`,
      backgroundColor: thirdbgcolor,
      textAlign: 'right',
      zIndex: +1
    }

    return (
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <div style={SecondChild}>
            <div style={ThirdChild}>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const SingleOption = ({ index, ans }) => {

    const setBackColor = () => {
      if (selectedIndex === index) {
        if (ans === quizData[quizIndex].correct_answer) {
          return 'black';
        } else {
          return 'white';
        }
      } else {
        if (ans === quizData[quizIndex].correct_answer && selectedIndex !== null) {
          return 'black';
        }
        return 'whitesmoke';
      }
    };
    const setTextColor = () => {
      if (selectedIndex === index) {
        if (ans === quizData[quizIndex].correct_answer) {
          return 'white';
        } else {
          return 'black';
        }
      } else {
        if (ans === quizData[quizIndex].correct_answer && selectedIndex !== null) {
          return 'white';
        }
        return 'black';
      }
    };

    return (
      <button
        key={index}
        style={{
          paddingTop: 2,
          paddingBottom: 2,
          width: '250px',
          height: '40px',
          color: setTextColor(),
          marginTop: '5px',
          backgroundColor: setBackColor()
        }} onClick={() => onPressOption(index, ans)}
        disabled={disabled}>
        {ans} </button>
    )
  }

  return (
    <div className='App'>

      <div className='main-div'>
        <ProgressBar bgcolor={'gray'} height={20} progress={((quizIndex + 1) / quizData.length) * 100} />

        <div className='top-div'>
          <p className='ques-number-text'> {`Question  ${quizIndex + 1}  from  ${quizData.length}`} </p>
          <p className='category-text'> {quizData[quizIndex].category} </p>
          <RatingView
            ratingValue={quizData[quizIndex].difficulty === 'easy' ? 1 : quizData[quizIndex].difficulty === 'medium' ? 2 : 3}
            emptyColor={'gray'}
            fillColor={'black'}
            stars={5}
            size={15}
          />
        </div>

        <div className='ques-div'>
          <p className='ques-text'> {quizData[quizIndex].question.trim() + " ?"} </p>
        </div>

        <div className='ans-div'>
          {
            answers && answers.sort(() => Math.random(0.5))
              .map((ans, index) => (
                <SingleOption
                  ans={ans} index={index} key={index}
                />))
          }
        </div>

        <div style={{ height: 50 }}></div>

        <div className='result-text-div'>
          <p> {isRight !== null ? isRight === true ? "Correct!" : "Sorry!" : ""} </p>
        </div>

        <div className='btn-div'>
          {
            isComplete ?
              <p>Completed</p>
              :
              <button onClick={() => updateQuixIndex()}  className='btn' >
                {quizIndex + 1 > quizData.length ? "Quiz is Complete" : "Next Question"}
              </button>

          }

        </div>

        <div className='score-row' >
          <p>{"Score : " + (score / 2) + "%"}</p>
          <p>{"Max Score : " + maxScore + "%"}</p>

        </div>

        <MultiProgressBar
          firstbgcolor={"gray"}
          height={25}
          secondbgcolor={'whitesmoke'}
          thirdbgcolor={'black'}
        />
      </div>
    </div>
  )
}

export default App
