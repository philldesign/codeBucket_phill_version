var db = require("../models");

module.exports = function (app) {

  // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––   M A I N      R O U T E S   ––––––––––––––––––––––––––––––
  // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  // 1st LEVEL PAGE / Getting info from "TOPICS" Table
  // Load index page / Query should get a list of ALL TOPICS;

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

  // _______________________________________________________________________________

  // 2nd LEVEL PAGE / Getting info from "SUBJECT" Table
  // Load page with ALL SUBJECTS that are WITHIN the selected TOPIC 

  // * Check FILTER: TopicId using the file: ../seeders/###subject-id.js *
  // i.e. "/subject/ENTER NUMBER HERE" : "/subject/1 " OR "/subject/2 " 

  app.get("/topic/:topicid", function (req, res) {
    db.Subject.findAll({ where: { topicid: req.params.topicid } })
      .then(function (dbSubject) {

        //Pulls/Renders object within the subject.handlebars file to display in the browser

        res.render("./layouts/subject", {
          subject: dbSubject
        });
      });
  });

  // _______________________________________________________________________________

  // 3rd LEVEL PAGE / Getting info from "CARD" Table
  // ENDPOINT! Load page with SELECTED CARD from PREVIOUS page: Topic/Subjects.

  // * Check FILTER: SubjectId using the file: ../seeders/###card-seed.js *
  // i.e. "/card/ENTER NUMBER HERE" : "/card/1 " OR "/card/2 " 

  app.get("/topic/subject/:subjectid", function (req, res) {
    db.Card.findAll({ where: { subjectid: req.params.subjectid } })
      .then(function (dbCard) {

        //Renders the function above and passes/prints it through the
        // "card" object (line 65 below) from the card.handlebars file to display in the browser

        res.render("./layouts/card", {
          card: dbCard
        });
      });
  });

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ––––––––––––––––––––––––––––   E N D     M A I N      R O U T E S   ––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//--------------------------–––––--------------------------------------------------------------

  // Route to render the Team codeBucket page

    app.get("/team", function (req, res) {
      res.render("./layouts/team", {
      });
    });
    
  // _______________________________________________________________________________

    // Route to render the add card page

  app.get("/insertcard", function (req, res) {
    res.render("./layouts/add", {
    });
  });

  // _______________________________________________________________________________

  // Render 404 page for any unmatched routes

  app.get("*", async (req, res) => {
    res.render("404");
  });
};
