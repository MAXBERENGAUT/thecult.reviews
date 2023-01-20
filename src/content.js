
/* 

const categoryPaths = {
  music: '/content/music',
  movies: '/content/movies',
  art: '/content/art',
  songs: '/content/songs',
  literature: '/content/literature',
  television: '/content/tv'
}

export function loadContent(category) {
  const path = categoryPaths[category]
  if (!path) {
    return []
  }

  return require.context(path, true, /.json$/).keys().map(key => {
    let slug = key.replace('./', '')
    let content = require(`${path}/${slug}`)
    content['slug'] = slug.replace('.json', '')
    return content
  })
}

*/

// TODO: turn this into a function that creates/exports functions
export function loadContent(category) {
    switch (category) {
        case 'music':
            return require.context('/content/music', true, /.json$/).keys().map(key => {
                let slug = key.replace('./', '')
                let content = require(`/content/music/${slug}`)
                content['slug'] = slug.replace('.json', '')
                return content
            })

        case 'movies':
            return require.context('/content/movies', true, /.json$/).keys().map(key => {
                let slug = key.replace('./', '')
                let content = require(`/content/movies/${slug}`)
                content['slug'] = slug.replace('.json', '')
                return content
            })

        case 'art':
            return require.context('/content/art', true, /.json$/).keys().map(key => {
                let slug = key.replace('./', '')
                let content = require(`/content/art/${slug}`)
                content['slug'] = slug.replace('.json', '')
                return content
            })

        case 'songs':
            return require.context('/content/songs', true, /.json$/).keys().map(key => {
                let slug = key.replace('./', '')
                let content = require(`/content/songs/${slug}`)
                content['slug'] = slug.replace('.json', '')
                return content
            })

        case 'literature':
            return require.context('/content/literature', true, /.json$/).keys().map(key => {
                let slug = key.replace('./', '')
                let content = require(`/content/literature/${slug}`)
                content['slug'] = slug.replace('.json', '')
                return content
            })

        case 'television':
            return require.context('/content/tv', true, /.json$/).keys().map(key => {
                let slug = key.replace('./', '')
                let content = require(`/content/tv/${slug}`)
                content['slug'] = slug.replace('.json', '')
                return content
            })

        default:
            return []
    }
}