// Functions
import getFormattedDate from "../../functions/getFormattedDate";

export const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const avatarPath = review?.author_details?.avatar_path;

  let avatarUrl;
  if (avatarPath?.includes("gravatar.com")) {
    const avatarUriMatch =
      avatarPath.match(/gravatar\.com\/avatar\/(.*)/)?.[1] || "";

    avatarUrl = `https://secure.gravatar.com/avatar/${avatarUriMatch}`;
  } else if (avatarPath) {
    avatarUrl = `https://image.tmdb.org/t/p/original${avatarPath}`;
  } else avatarUrl = "/no-image-person.svg";

  return (
    <a
      href={review.url}
      target="_blank"
      rel="noreferrer"
      className="relative flex flex-col items-center gap-4 py-4 text-center rounded-md md:text-left md:flex-row"
    >
      <div
        className="relative z-0 flex-shrink-0 w-24 h-24 bg-center bg-cover rounded-lg"
        style={{
          backgroundImage: `url('${avatarUrl}')`,
        }}
      >
        <div className="absolute flex items-center justify-center select-none -right-2 -bottom-2">
          <div className="px-4 py-px bg-green-600 rounded-md ring-4 ring-white">
            <span className="font-light leading-none text-white">
              {review.author_details.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-1 overflow-hidden">
        <div className="flex items-center justify-center space-x-2 md:justify-start">
          <h3 className="font-medium truncate">{review.author}</h3>
          <span className="opacity-20">
            {getFormattedDate(review.created_at)}
          </span>
        </div>

        <p className="text-sm opacity-50 line-clamp-3">{review.content}</p>
      </div>
    </a>
  );
};

export default ReviewCard;
