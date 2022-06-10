import { Link } from 'react-router-dom';

export const ListingItem = ({ listing, id }) => {
  return (
    <div>
      <div>{listing.location}</div>
      <Link to={`/category/${listing.category}/${id}`}>
        <div>{listing.title}</div>
      </Link>
      <div>${listing.price}.00/night</div>
    </div>
  );
};
