import { Artist } from "@spotify/web-api-ts-sdk";

const ArtistsGrid = (artists: Artist[]) => (
  <>
    {artists && artists.length ? (
      <>
        {artists.map((artist: any, i: any) => (
          <li className="grid__item" key={i}>
            <div className="grid__item__inner">
              {artist.images[0] && (
                <div className="grid__item__img">
                  <img src={artist.images[0].url} alt={artist.name} />
                </div>
              )}
              <h3 className="grid__item__name overflow-ellipsis">
                {artist.name}
              </h3>
              <p className="grid__item__label">Artist</p>
            </div>
          </li>
        ))}
      </>
    ) : (
      <p className="empty-notice">No artists available</p>
    )}
  </>
);

export default ArtistsGrid;
