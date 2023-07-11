import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";

const GamePage = (props) => {
  const [gameName, setGameName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isFKeyPressed, setIsFKeyPressed] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/game/${props.match.params.name}`
        );
        setGameName(response.data.name);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.match.params.name]);

  const handleQuestionClick = (question) => {
    setCurrentQuestion(question);
    setShowQuestionModal(true);
    question.clicked = true; // Set the clicked property of the question object
  };

  const handleModalClose = () => {
    setShowQuestionModal(false);
  };

  const handleShowAnswer = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      showAnswer: true,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "f") {
        setIsFKeyPressed(true);
      }

      if (isFKeyPressed) {
        // Handle key combinations
        if (event.key === "1") {
          handleQuestionClick(categories[0].questions[0]);
        } else if (event.key === "2") {
          handleQuestionClick(categories[0].questions[1]);
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "f") {
        setIsFKeyPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [categories, isFKeyPressed]);

  return (
    <div className="game-page">
      <h4 className="game-title">
        <img src="/logo.png" />
      </h4>

      <div className="categories-container">
        {categories.map((category, categoryIndex) => (
          <div className="category-box" key={categoryIndex}>
            <h6>{category.name}</h6>
          </div>
        ))}
      </div>

      {categories.map((category) => (
        <div className="questions-row" key={category.name}>
          {category.questions.map((question, questionIndex) => (
            <div
              className={`question-box ${question.clicked ? "clicked" : ""}`}
              key={questionIndex}
              onClick={() =>
                !question.clicked &&
                !question.showAnswer &&
                handleQuestionClick(question)
              }
            >
              <p>{questionIndex + 1}</p>
            </div>
          ))}
        </div>
      ))}

      {showQuestionModal && (
        <div className="question-modal fade-enter-active">
          <div className="modal-content fade-enter-active">
            {currentQuestion.showAnswer ? (
              <p>{currentQuestion.answer}</p>
            ) : (
              <p>{currentQuestion.question}</p>
            )}
            {!currentQuestion.showAnswer && (
              <button className="show-answer-button" onClick={handleShowAnswer}>
                Show Answer
              </button>
            )}
            <button className="close-button" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
