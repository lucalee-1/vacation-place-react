import { Link } from 'react-router-dom';

export const ListingItem = ({ listing, id, onDelete }) => {
  return (
    <div className='listing-item'>
      <div>{listing.location}</div>
      <Link to={`/category/${listing.category}/${id}`}>
        <div>{listing.title}</div>
      </Link>
      <div>${listing.price}.00/night</div>
      {onDelete && (
        <button type='button' onClick={()=> onDelete(listing.id, listing.title)}>Delete</button>
      )}
    </div>
  );
};
