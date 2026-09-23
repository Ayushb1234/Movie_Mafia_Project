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
