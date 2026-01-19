import { useArtists } from '../context/ArtistContext';
import { formatFollowers } from '../services/spotify';

export default function RankingBadge({ artistId }) {
  const { getRankings, selectedArtists, getFollowerComparison } = useArtists();
  const rankings = getRankings();
  const rank = rankings[artistId] || 0;
  const comparison = getFollowerComparison(artistId);

  const getRankLabel = () => {
    if (rank === 1) return '1st';
    if (rank === 2) return '2nd';
    if (rank === 3) return '3rd';
    return `${rank}th`;
  };

  return (
    <div className="ranking-container">
      <div className={`ranking-badge rank-${rank}`}>
        <span className="rank-number">#{rank}</span>
        <span className="rank-label">
          {getRankLabel()} of {selectedArtists.length} by followers
        </span>
      </div>
      
      {comparison && comparison.length > 0 && (
        <div className="follower-comparison">
          <h3>Comparison with other artists</h3>
          <div className="comparison-list">
            {comparison.map((item) => (
              <div key={item.artistId} className={`comparison-item ${item.difference >= 0 ? 'ahead' : 'behind'}`}>
                <span className="comparison-artist">{item.artistName}</span>
                <span className="comparison-diff">
                  {item.difference >= 0 ? '+' : ''}{formatFollowers(item.difference)} followers
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
