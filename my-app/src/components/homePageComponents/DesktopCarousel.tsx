import '../../styles/homePageStyles/DesktopCarousel.scss';

interface Park {
  id: number;
  fullName: string;
  images: { url: string; altText?: string }[];
}

interface DesktopCarouselProps {
  parks: Park[];
  startIndex: number;
}

export default function DesktopCarousel({ parks, startIndex }: DesktopCarouselProps) {
  const visibleParks = parks.slice(startIndex, startIndex + 3);

  return (
    <div className="carousel">
      <div className="carousel-track">
        {visibleParks.map((park) => (
          <div className="carousel-item" key={park.id}>
            <img
              src={park.images?.[0]?.url}
              alt={park.images?.[0]?.altText || park.fullName}
            />
            <p>{park.fullName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
