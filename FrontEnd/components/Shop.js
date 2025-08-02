import movieStyles from "../styles/Movie.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Movie = ({ title = "Name", desc = "Description", votes = 8 }) => {
  const totalStars = 10;
  return (
    <div className={movieStyles.parent}>
      <div className={movieStyles.movie}>
        <img src="/poster.jpg" alt="Poster" className={movieStyles.poster} />
        <div className={movieStyles.name}>Name</div>
        <div className={movieStyles.description}>Description</div>
        <div className={movieStyles.vote}>
          {[...Array(totalStars)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              style={{
                color: i < votes ? "#FFD700" : "#ccc",
                marginRight: "2px",
              }}
            />
          ))}
          <span style={{ marginLeft: "5px" }}>({votes} votes)</span>
        </div>
      </div>
    </div>
  );
};

export default Movie;
