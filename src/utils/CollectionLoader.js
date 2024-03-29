const extract = (category, key) => {
  let slug = key.replace("./", "");
  let content = require(`/content/${category}/${slug}`);
  content["slug"] = slug.replace(".json", "");
  return content;
};

export const CollectionLoader = {
  music: () =>
    require
      .context("/content/music", true, /.json$/)
      .keys()
      .map((key) => extract("music", key)),
  movies: () =>
    require
      .context("/content/movies", true, /.json$/)
      .keys()
      .map((key) => extract("movies", key)),
  art: () =>
    require
      .context("/content/art", true, /.json$/)
      .keys()
      .map((key) => extract("art", key)),
  museums: () =>
    require
      .context("/content/museums", true, /.json$/)
      .keys()
      .map((key) => extract("museums", key)),
  songs: () =>
    require
      .context("/content/songs", true, /.json$/)
      .keys()
      .map((key) => extract("songs", key)),
  literature: () =>
    require
      .context("/content/literature", true, /.json$/)
      .keys()
      .map((key) => extract("literature", key)),
  tv: () =>
    require
      .context("/content/tv", true, /.json$/)
      .keys()
      .map((key) => extract("tv", key)),
  memes: () =>
    require
      .context("/content/memes", true, /.json$/)
      .keys()
      .map((key) => extract("memes", key)),
};
