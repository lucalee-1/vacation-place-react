import { Link } from 'react-router-dom';

export const ListingItem = ({ listing, id }) => {
  console.log(listing);

  return (
    <div>
      <div>{listing.location}</div>
      <Link to={`/category/${listing.type}/${id}`}>
        <div>{listing.name}</div>
      </Link>
      <div>${listing.regularPrice}.00/night</div>
    </div>
  );
};
