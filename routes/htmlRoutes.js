var db = require("../models");

module.exports = function (app) {
  // Load index page / Query should get a list of all topics;
  // 1st LEVEL PAGE / "TOPICS" Table, LOAD ALL.
  app.get("/", async (req, res) => {
    try {
      const dbTopic = await db.Topic.findAll({});
      //Pulls/Renders object within the index.handlebars file to display in the browser
      res.render("index", {
        msg: "Welcome To codeBucket!",
        topic: dbTopic
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });
  //SHAKIBS EXAMPLE HELP WITH SUBJECTS! GOOD FOR THE FILTERs  ________________

  app.get("/subject/:topicid", function (req, res) {
    db.Subject.findAll({ where: { topicid: req.params.topicid } })
    .then(function (dbExample) {
      res.render("subject", {
        subject: dbExample
      });
    });       
  });
  
  // _______________________________________________________________________________


  // _______________________________________________________________________________
  // Load page with ALL SUBJECTS that are WITHIN the selected TOPIC
  // from index/home page. Check for FoerignKeys, ID, & Filters to be included on URL *
  // 2nd LEVEL PAGE / "SUBJECT" Table, EX: CSS

  app.get("/subject", async (req, res) => {
    // /subject?suject=css
    // route: /subject/:search   example: /subject/css
    // req.body = {query: css}
    // const search = req.params.subject;
    try {
      const dbSubject = await db.Subject.findOne({ //Iterate through the columns 
        //"subjectNames" in the table SUBJECT and returns the objects 
        where: { TopicId: req.params.Subject.TopicId }
      });
      // TEST THIS:  //must match name of table column
      //Pulls code from the file "SUBJECT.HANDLEBAR" and renders it in the browser
      res.render("subject", {
        subject: dbSubject
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });
  // ENDPOINT! Load page with SELECTED CARD from PREVIOUS page: Topic/Subjects.
  // Check for FoerignKeys, ID, & Filters to be included on URL *
  // 3rd LEVEL PAGE / "CARD" Table, EX: Media Queries.

  app.get("/card", async (req, res) => {
    // const search = [req.query.topic, req.query.card];
    // const topic = req.query.topic;
    // const card = req.query.card;

    try {
      const getCard = await db.Card.findOne({
        where: { cardName: topic, cardName: card }
      });
      //Pulls code from the file "SUBJECT.HANDLEBAR" and renders it in the browser, /card route.
      res.render("card", {
        cardName: getCard
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });

  // _______________________________________________________________________________
  // _______________________________________________________________________________
  // Load card page and pass in an card by id
  app.get("/card/:id", async (req, res) => {
    try {
      const dbCard = await db.Card.findOne({
        where: { id: req.params.id }
      });
      res.render("card", {
        card: dbCard
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", async (req, res) => {
    res.render("404");
  });
};
