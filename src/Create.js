import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Divider,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  formControl: {
    margin: theme.spacing(1),
  },
  questionContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const TriviaForm = () => {
  const classes = useStyles();

  useEffect(() => {}, []);

  const [gameName, setGameName] = useState("");
  const [categories, setCategories] = useState([
    {
      name: "",
      questions: [
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
      ],
    },
    {
      name: "",
      questions: [
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
      ],
    },
    {
      name: "",
      questions: [
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
      ],
    },
    {
      name: "",
      questions: [
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
      ],
    },
  ]);

  const [teams, setTeams] = useState([
    { name: "", points: 0 },
    { name: "", points: 0 },
  ]);

  const handleChangeGameName = (event) => {
    setGameName(event.target.value);
  };

  const handleChangeCategoryName = (event, index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = event.target.value;
    setCategories(updatedCategories);
  };

  const handleChangeQuestion = (event, categoryIndex, questionIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].questions[questionIndex].question =
      event.target.value;
    setCategories(updatedCategories);
  };

  const handleChangeAnswer = (event, categoryIndex, questionIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].questions[questionIndex].answer =
      event.target.value;
    setCategories(updatedCategories);
  };

  const handleEditCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].editMode = true;
    setCategories(updatedCategories);
  };

  const handleSaveCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].editMode = false;
    setCategories(updatedCategories);
  };

  const handleChangeTeamName = (event, index) => {
    const updatedTeams = [...teams];
    updatedTeams[index].name = event.target.value;
    setTeams(updatedTeams);
  };

  const handleSaveAll = () => {
    // Prepare the data to be sent to the server
    const gameData = {
      name: gameName,
      categories: categories.map((category) => ({
        name: category.name,
        questions: category.questions,
      })),
    };

    console.log("here");

    // Send the data to the server
    axios
      .post("http://localhost:5000/api/game", gameData)
      .then((response) => {
        console.log("Game data saved successfully:", response.data);
        // Clear the form or show a success message if needed
      })
      .catch((error) => {
        console.error("Error saving game data:", error);
        // Show an error message or handle the error as needed
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Game Name"
            value={gameName}
            onChange={handleChangeGameName}
            fullWidth
          />
        </Grid>
        {teams.map((team, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              label={`Team ${index + 1} Name`}
              value={team.name}
              onChange={(event) => handleChangeTeamName(event, index)}
              fullWidth
            />
          </Grid>
        ))}
        {categories.map((category, categoryIndex) => (
          <Grid item xs={12} sm={6} md={3} key={categoryIndex}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel shrink>Category Name</InputLabel>
              {category.editMode ? (
                <>
                  <Input
                    value={category.name}
                    onChange={(event) =>
                      handleChangeCategoryName(event, categoryIndex)
                    }
                  />
                  <FormHelperText>Click save to finish editing.</FormHelperText>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveCategory(categoryIndex)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Input
                    value={category.name}
                    disabled
                    endAdornment={
                      <IconButton
                        onClick={() => handleEditCategory(categoryIndex)}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                  />
                </>
              )}
            </FormControl>
            {category.questions.map((question, questionIndex) => (
              <div key={questionIndex} className={classes.questionContainer}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel shrink>{`Question ${
                    questionIndex + 1
                  }`}</InputLabel>
                  <Input
                    value={question.question}
                    onChange={(event) =>
                      handleChangeQuestion(event, categoryIndex, questionIndex)
                    }
                  />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    label="Answer"
                    value={question.answer}
                    onChange={(event) =>
                      handleChangeAnswer(event, categoryIndex, questionIndex)
                    }
                  />
                </FormControl>
              </div>
            ))}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSaveAll}>
            Save All
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TriviaForm;
