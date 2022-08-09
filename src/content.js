
// TODO turn this into a function that creates/exports functions
export function loadContent(category) {
    switch (category) {
        case 'music':
            return require.context('/content/music', true, /.json$/).keys().map(key =>
                require(`/content/music/${key.replace('./', '')}`)
            )
        case 'movies':
            return require.context('/content/movies', true, /.json$/).keys().map(key =>
                require(`/content/movies/${key.replace('./', '')}`)
            )
        case 'art':
            return require.context('/content/art', true, /.json$/).keys().map(key =>
                require(`/content/art/${key.replace('./', '')}`)
            )
        case 'songs':
            return require.context('/content/songs', true, /.json$/).keys().map(key =>
                require(`/content/songs/${key.replace('./', '')}`)
            )
        case 'literature':
            return require.context('/content/literature', true, /.json$/).keys().map(key =>
                require(`/content/literature/${key.replace('./', '')}`)
            )
        case 'television':
            return require.context('/content/tv', true, /.json$/).keys().map(key =>
                require(`/content/tv/${key.replace('./', '')}`)
            )

        default:
            return []
    }
}