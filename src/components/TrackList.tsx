import { formatDuration } from "../utils";
import { StyledTrackList } from "../styles";

const TrackList = ({ tracks, sortValue }: any) => (
  <>
    {tracks && tracks.length ? (
      <StyledTrackList>
        {tracks.map((track: any, i: any) => (
          <li className="track__item" key={i}>
            <div className="track__item__num">{i + 1}</div>
            <div className="track__item__title-group">
              {track.album.images.length && track.album.images[0] && (
                <div className="track__item__img">
                  <img src={track.album.images[0].url} alt={track.name} />
                </div>
              )}
              <div className="track__item__name-artist">
                <div className="track__item__name overflow-ellipsis">
                  {track.name}
                </div>
                <div className="track__item__artist overflow-ellipsis">
                  {track.artists.map((artist: any, i: any) => (
                    <span key={i}>
                      {artist.name}
                      {i !== track.artists.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="track__item__album overflow-ellipsis">
              {track.album.name}
            </div>
            <div>
              <div className="track__item__duration">
                {sortValue && track.audio_features
                  ? track.audio_features[sortValue]
                  : " "}
              </div>
              <div className="track__item__duration">
                {formatDuration(track.duration_ms)}
              </div>
            </div>
          </li>
        ))}
      </StyledTrackList>
    ) : (
      <p className="empty-notice">No tracks available</p>
    )}
  </>
);

export default TrackList;
