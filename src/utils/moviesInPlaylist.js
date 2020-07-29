// Add the property isInPlaylist to each movie for add or remove icon in playlist
export default (movies, playlist) => {
  let flag = false;
  for (let i = 0; i < movies.length; i++) {
    flag = false;
    for (let j = 0; j < playlist.length; j++) {
      if (movies[i].id === playlist[j].id) {
        flag = true;
      }
    }
    movies[i].isInPlaylist = flag;
  }
  return movies;
};
