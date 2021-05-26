/* eslint-disable max-len */

export const fetchArtists = async (limit = 25, page, query) => {
  const offset = page * limit;
  const res = await fetch(
    `http://musicbrainz.org/ws/2/artist?query=${query}&fmt=json&limit=${limit}&offset=${offset}`
  );
  const { artists, count } = res.json();
  const artistArray = artists.map((artist) => ({
    artistId: artist.id,
    name: artist.name,
    tags: artist.tags
      .sort((a, b) => {
        return a.count - b.count;
      })
      .slice(0, 2),
  }));
  return {
    artistArray, count
  };
};

// add release-events for stretch goal <>
export const fetchReleases = async (id) => {
  const res =
    await fetch(`http://musicbrainz.org/ws/2/release?artist=${id}&fmt=json
    `);
  const releaseCount = res.json()['releases-count']; 
  const { releases } = res.json();
  const releaseArray = releases.map((release) => ({
    albumId: release.id,
    albumTitle: release.title,
    releaseDate: release.date,
    country: release.country,
    coverArt: release['cover-art-archive'].front,
  }));

  return {
    releaseArray, releaseCount
  };
};

export const fetchSongs = async (albumId) => {
  const res = await fetch(
    `http://musicbrainz.org/ws/2/recording?release=${albumId}&fmt=json`
  );
  const { recordings } = res.json();
  const recordingCount = res.json()['recording-count'];
  return {
    recordings, recordingCount
  };
};

export const fetchLyrics = async (artist, songTitle) => {
  const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);

  const json = await res.json();

  return JSON.parse(json);
};
