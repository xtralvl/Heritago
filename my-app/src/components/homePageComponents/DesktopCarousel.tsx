import { useNavigate } from "react-router-dom";
import '../../styles/homePageStyles/DesktopCarousel.scss';

interface Destination {
  id?: number;
  fullName?: string;
  name_en?: string;
  images?: { url: string; altText?: string }[];
  main_image_url?: { url: string };
}

interface DesktopCarouselProps {
  parks: Destination[];
  startIndex: number;
}

export default function DesktopCarousel({ parks, startIndex }: DesktopCarouselProps) {
  const navigate = useNavigate();

  // slice 3 visible items, looping around
  const visibleDestinations = Array.from({ length: 3 }, (_, i) =>
    parks[(startIndex + i) % parks.length]
  );

  function slugify(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }

  return (
    <div className="carousel">
      <div className="carousel-track">
        {visibleDestinations.map((destination, index) => {
          const imageUrl =
            destination?.images?.[0]?.url || destination?.main_image_url?.url;
          const altText =
            destination?.images?.[0]?.altText ||
            destination?.fullName ||
            destination?.name_en ||
            "Destination image";

          const displayName = destination?.fullName || destination?.name_en;
          const slug = slugify(displayName || "");

          return (
            <div
              key={index}
              className="carousel-item"
              onClick={() => navigate(`/details/${slug}`)}
              role="button"
              tabIndex={0}
            >
              <img src={imageUrl} alt={altText} />
              <p>{displayName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
