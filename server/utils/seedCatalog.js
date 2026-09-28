const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const Movie = require("../models/Movie");
const User = require("../models/User");

const catalog = [
  {
    title: "The Shawshank Redemption",
    release_year: 1994,
    synopsis: "A banker sentenced to life in prison builds an unlikely friendship and holds on to hope.",
    poster_url: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
  },
  {
    title: "The Dark Knight",
    release_year: 2008,
    synopsis: "Batman faces a criminal mastermind who throws Gotham into chaos.",
    poster_url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    title: "Inception",
    release_year: 2010,
    synopsis: "A skilled thief enters dreams to steal secrets and is offered one last, impossible job.",
    poster_url: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
  },
  {
    title: "Interstellar",
    release_year: 2014,
    synopsis: "A team of explorers travels beyond this galaxy to find a future for humanity.",
    poster_url: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    title: "Spirited Away",
    release_year: 2001,
    synopsis: "A young girl enters a world of spirits and must find the courage to save her family.",
    poster_url: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"
  },
  {
    title: "Parasite",
    release_year: 2019,
    synopsis: "A struggling family becomes entangled with a wealthy household in an unexpected way.",
    poster_url: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
  },
  {
    title: "Pulp Fiction",
    release_year: 1994,
    synopsis: "The lives of two hitmen, a boxer and a mobster's wife intertwine across four tales of violence and redemption.",
    poster_url: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
  },
  {
    title: "The Godfather",
    release_year: 1972,
    synopsis: "The aging patriarch of a crime dynasty transfers control of his empire to his reluctant youngest son.",
    poster_url: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  },
  {
    title: "Fight Club",
    release_year: 1999,
    synopsis: "An insomniac office worker and a soap maker form an underground fight club that spirals far beyond control.",
    poster_url: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
  },
  {
    title: "Forrest Gump",
    release_year: 1994,
    synopsis: "Through simple kindness, a slow-witted but good-hearted man witnesses and shapes decades of American history.",
    poster_url: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"
  },
  {
    title: "The Matrix",
    release_year: 1999,
    synopsis: "A hacker discovers that reality is a simulation and joins a rebellion to free humanity from the machines.",
    poster_url: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    title: "Goodfellas",
    release_year: 1990,
    synopsis: "The rise and fall of a mob associate spanning three decades of loyalty, betrayal and excess.",
    poster_url: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg"
  },
  {
    title: "Whiplash",
    release_year: 2014,
    synopsis: "A young drummer enrolls at a cutthroat music conservatory under a ruthless instructor who will settle for nothing less than perfection.",
    poster_url: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg"
  },
  {
    title: "Gladiator",
    release_year: 2000,
    synopsis: "A betrayed Roman general rises through the gladiatorial arena to avenge the murder of his family.",
    poster_url: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    release_year: 2001,
    synopsis: "A young hobbit inherits a perilous ring and sets out with a fellowship to destroy it before darkness consumes the world.",
    poster_url: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    release_year: 2003,
    synopsis: "As armies mass for a final battle, two hobbits carry the last hope of Middle-earth to the fires of Mordor.",
    poster_url: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"
  },
  {
    title: "The Silence of the Lambs",
    release_year: 1991,
    synopsis: "A young FBI trainee seeks the help of an imprisoned cannibal to catch another serial killer still at large.",
    poster_url: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg"
  },
  {
    title: "Se7en",
    release_year: 1995,
    synopsis: "Two detectives hunt a meticulous killer who uses the seven deadly sins as the blueprint for his murders.",
    poster_url: "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg"
  },
  {
    title: "Coco",
    release_year: 2017,
    synopsis: "A boy who dreams of becoming a musician journeys into the Land of the Dead to unlock his family's history.",
    poster_url: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"
  },
  {
    title: "Your Name",
    release_year: 2016,
    synopsis: "Two teenagers who have never met discover they are mysteriously swapping bodies across time and distance.",
    poster_url: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg"
  },
  {
    title: "Joker",
    release_year: 2019,
    synopsis: "A failed comedian's descent into madness mirrors a city on the brink, giving rise to an icon of chaos.",
    poster_url: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  },
  {
    title: "Avengers: Endgame",
    release_year: 2019,
    synopsis: "The surviving heroes make one final, desperate stand to undo the devastation left in Thanos's wake.",
    poster_url: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  },
  {
    title: "Django Unchained",
    release_year: 2012,
    synopsis: "A freed slave teams with a bounty hunter to rescue his wife from a brutal Mississippi plantation owner.",
    poster_url: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg"
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    release_year: 2018,
    synopsis: "A Brooklyn teen becomes Spider-Man and teams with heroes from parallel dimensions to save the multiverse.",
    poster_url: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg"
  },
  {
    title: "The Grand Budapest Hotel",
    release_year: 2014,
    synopsis: "A legendary concierge and his loyal lobby boy become entangled in the theft of a priceless painting.",
    poster_url: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg"
  },
  {
    title: "Blade Runner 2049",
    release_year: 2017,
    synopsis: "A young blade runner uncovers a long-buried secret that could plunge what's left of society into chaos.",
    poster_url: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg"
  },
  {
    title: "Dune",
    release_year: 2021,
    synopsis: "A gifted heir travels to the most dangerous planet in the universe to secure the future of his family and people.",
    poster_url: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
  },
  {
    title: "Everything Everywhere All at Once",
    release_year: 2022,
    synopsis: "An overwhelmed laundromat owner discovers she must connect with parallel versions of herself to save the multiverse.",
    poster_url: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg"
  },
  {
    title: "Oppenheimer",
    release_year: 2023,
    synopsis: "The story of the brilliant, conflicted physicist who led the race to build the first atomic bomb.",
    poster_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
  }
];

const seedCatalog = async () => {
  if (await Movie.exists({})) {
    return;
  }

  let curator = await User.findOne({ email: "catalog@cinerate.local" });

  if (!curator) {
    curator = await User.create({
      username: "cinerate_catalog",
      email: "catalog@cinerate.local",
      password: await bcrypt.hash(crypto.randomBytes(32).toString("hex"), 12)
    });
  }

  await Movie.insertMany(
    catalog.map((movie) => ({ ...movie, created_by: curator._id }))
  );

  console.log(`Added ${catalog.length} starter movies to the empty catalog.`);
};

module.exports = seedCatalog;
