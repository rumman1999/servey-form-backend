const express = require('express');
const themeRouter = express.Router();
const Theme = require('../model/theme.model');

themeRouter.get('/themes', async (req, res) => {
    try {
      let allTheme = await Theme.find()
      res.status(200).json({
        status:"Success",
        result : allTheme
    })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  themeRouter.post('/themes', async (req, res) => {
    console.log(req.body);
    try {
      const {
        email,
        surveyId,
        themeOpt,
        themeName,
        themeType,
        fromType,
        allQuestionMandatory,
        enableSkip,
        optionType,
        font,
        color
      } = req.body;
  
      const existingTheme = await Theme.findOne({ email, surveyId });
  
      if (existingTheme) {
        existingTheme.themeOpt = themeOpt;
        existingTheme.themeName = themeName;
        existingTheme.themeType = themeType;
        existingTheme.fromType = fromType;
        existingTheme.allQuestionMandatory = allQuestionMandatory;
        existingTheme.enableSkip = enableSkip;
        existingTheme.optionType = optionType;
        existingTheme.font = font;
        existingTheme.color = color;
  
        const updatedTheme = await existingTheme.save();
        res.status(200).json(updatedTheme);
      } else {
        const newTheme = new Theme({
          email,
          surveyId,
          themeOpt,
          themeName,
          themeType,
          fromType,
          allQuestionMandatory,
          enableSkip,
          optionType,
          font,
          color
        });
  
        const savedTheme = await newTheme.save();
        res.status(201).json(savedTheme);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  themeRouter.post('/theme', async (req, res) => {
    // console.log("hello");
    try {
      const { email , surveyId} = req.body;
  
      const existingTheme = await Theme.findOne({ email, surveyId });
      console.log(existingTheme);
      if (existingTheme) {
        res.status(200).json(existingTheme);
      } else {
        const theme = {
        email: email,
        surveyName: "default",
        themeOpt: "normal",
        themeName: "default",
        themeType: "normal",
        fromType: "default",
        allQuestionMandatory: "default",
        enableSkip: "default",
        optionType: "box",
        font: "roboto",
        color: "blue"
    }
        res.status(202).json(theme);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = themeRouter;
