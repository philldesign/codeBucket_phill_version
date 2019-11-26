var db = require("../models");

module.exports = function(app) {
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
// _______________________________________________________________________________
  // Load page with ALL SUBJECTS that are WITHIN the selected TOPIC
  // from index/home page. Check for FoerignKeys, ID, & Filters to be included on URL *
  // 2nd LEVEL PAGE / "SUBJECT" Table, EX: CSS

  app.get("/subject", async (req, res) => {
    // /subject?suject=css
    // route: /subject/:search   example: /subject/css
    // req.body = {query: css}
    // const search = req.query.subject;
    try {
      const dbSubjects = await db.Subject.findAll({});
        // TEST THIS: where: { subjectList: search } //must match name of table column
      //Pulls code from the file "SUBJECT.HANDLEBAR" and renders it in the browser
      res.render("subject", {
        subjec: dbSubjects
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
