export let movies = [
  { _id: "123", title: "Avatar" },
  { _id: "234", title: "Terminator" },
  { _id: "345", title: "Aliens" },
  { _id: "456", title: "Titanic" },
];
const MoviesController = (app) => {
  const deleteMovie = (req, res) => {
    const mid = req.params["mid"];
    movies = movies.__7__((m) => m._id !== mid);
    res.status(200);
  };
  app.delete("/api/movies/:mid", deleteMovie);
};
export default MoviesController;
