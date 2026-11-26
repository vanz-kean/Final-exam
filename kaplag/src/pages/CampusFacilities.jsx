import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const officialFacilitiesUrl = 'https://dbses.upmin.edu.ph/academic-programs/university-facilities';

const categories = [
  'Sports and Recreation',
  'Learning and Academic Resources',
  'Student Welfare and Accommodation',
  'Administrative and Technical Services',
];

const facilities = [
  {
    id: 'sports-complex',
    name: 'Davao City-UP Mindanao Sports Complex',
    category: categories[0],
    description: 'Spaces for athletics, recreation, physical education, training, and sports activities for the university community and its partners.',
    image: 'https://dbses.upmin.edu.ph/cms/assets/dd5b204c-7b5c-4322-9d9b-09e143792d8b',
    source: `${officialFacilitiesUrl}/davao-city-up-mindanao-sports-complex`,
    coordinates: [7.0846867, 125.4710537],
    mapLabel: 'Matched to the named sports complex in OpenStreetMap.',
  },
  {
    id: 'outdoor-gym',
    name: 'Outdoor Gym',
    category: categories[0],
    description: 'An open-air space where students and members of the university community can stay active and exercise on campus.',
    image: 'https://dbses.upmin.edu.ph/cms/assets/5d6bf019-1dbd-4ee2-bf18-eedef016d95d',
    source: `${officialFacilitiesUrl}/outdoor-gym`,
  },
  {
    id: 'university-library',
    name: 'University Library',
    category: categories[1],
    description: 'A welcoming place for reading, research, study, and access to learning resources.',
    image: 'https://dbses.upmin.edu.ph/cms/assets/676614ba-7207-40b4-81f6-250e7cb1fae4',
    source: `${officialFacilitiesUrl}/university-library`,
    coordinates: [7.0848261, 125.4836522],
    mapLabel: 'Matched to the named UP Mindanao Library building in OpenStreetMap.',
  },
  {
    id: 'ilc',
    name: 'Interactive Learning Center (ILC) and ILC-Hub',
    category: categories[1],
    description: 'Campus technology facilities and decentralized collaboration hubs dedicated to interactive learning.',
    image: 'https://dbses.upmin.edu.ph/cms/assets/81f7b34f-d9b5-450a-be96-aa2f2a5e528e',
    source: `${officialFacilitiesUrl}/interactive-learning-center-ilc-and-ilc-hub`,
    coordinates: [7.0837807, 125.4851872],
    mapLabel: 'Approximate match to the mapped Interactive Learning Resource Center.',
  },
  {
    id: 'osa',
    name: 'Office of Student Affairs',
    category: categories[2],
    description: 'Student support services, leadership development, and active campus community engagement.',
    image: 'https://dbses.upmin.edu.ph/cms/assets/d59b646d-3c66-4721-9a91-b10f70919b89',
    source: `${officialFacilitiesUrl}/office-of-student-affairs`,
  },
  {
    id: 'ebl-dormitory',
    name: 'EBL Dormitory',
    category: categories[2],
    description: 'On-campus accommodation for residents to rest, study, and take part in university life.',
    image: 'https://dbses.upmin.edu.ph/cms/assets/98d0b589-53eb-49fe-b5b9-c7ebb78534de',
    source: `${officialFacilitiesUrl}/ebl-dormitory`,
    coordinates: [7.0838382, 125.4851888],
    mapLabel: 'Matched to the mapped Elias B. Lopez Dormitory Hall.',
  },
  {
    id: 'clinic',
    name: 'University Clinic',
    category: categories[2],
    description: 'A first point of care for students, faculty, staff, and visitors who need basic health support on campus.',
    image: 'https://dbses.upmin.edu.ph/cms/assets/42be872c-c751-4f4b-8280-3f28ccedc195',
    source: `${officialFacilitiesUrl}/university-clinic`,
  },
  {
    id: 'ito',
    name: 'Information Technology Office',
    category: categories[3],
    description: 'Digital infrastructure, technical support, and technology services for university teaching, research, administration, and operations.',
    image: 'https://dbses.upmin.edu.ph/cms/assets/8d36fa1b-7dab-4d6e-9171-3f18240335d4',
    source: `${officialFacilitiesUrl}/information-technology-office`,
  },
  {
    id: 'registrar',
    name: 'Office of the University Registrar',
    category: categories[3],
    description: 'Academic records and registration services for the university community.',
    image: 'https://dbses.upmin.edu.ph/cms/assets/a132a2c9-e8a5-4d88-b855-1d5e0a3f28e6',
    source: `${officialFacilitiesUrl}/office-of-the-university-registrar`,
  },
];

const categoryColors = {
  'Sports and Recreation': 'sports',
  'Learning and Academic Resources': 'learning',
  'Student Welfare and Accommodation': 'welfare',
  'Administrative and Technical Services': 'admin',
};

const hasCoordinates = (facility) => Array.isArray(facility.coordinates);

function MapViewport({ visibleFacilities, selectedFacility }) {
  const map = useMap();

  useEffect(() => {
    const points = selectedFacility && hasCoordinates(selectedFacility)
      ? [selectedFacility]
      : visibleFacilities.filter(hasCoordinates);

    if (points.length === 1) {
      map.setView(points[0].coordinates, 16, { animate: true });
    } else if (points.length > 1) {
      map.fitBounds(points.map((facility) => facility.coordinates), {
        padding: [36, 36],
        maxZoom: 16,
        animate: true,
      });
    }
  }, [map, visibleFacilities, selectedFacility]);

  return null;
}

function createFacilityIcon(group, isSelected) {
  const color = categoryColors[group.facilities[0].category];
  const isCluster = group.facilities.length > 1;
  const markerNumbers = group.facilities
    .map((item) => facilities.findIndex(({ id }) => id === item.id) + 1)
    .join('·');
  return L.divIcon({
    className: 'campus-marker-shell',
    html: `<span class="campus-marker campus-marker--${color}${isCluster ? ' campus-marker--cluster' : ''}${isSelected ? ' is-selected' : ''}"><span>${markerNumbers}</span></span>`,
    iconSize: isCluster ? [46, 50] : [38, 44],
    iconAnchor: isCluster ? [23, 46] : [19, 40],
    popupAnchor: [0, -38],
  });
}

function distanceInMeters(first, second) {
  const latitude = (first[0] + second[0]) / 2;
  const northSouth = (first[0] - second[0]) * 111_320;
  const eastWest = (first[1] - second[1]) * 111_320 * Math.cos((latitude * Math.PI) / 180);
  return Math.hypot(northSouth, eastWest);
}

function groupNearbyFacilities(mappedFacilities, radiusMeters = 20) {
  const groups = [];
  mappedFacilities.forEach((facility) => {
    const nearbyGroup = groups.find((group) => distanceInMeters(group.coordinates, facility.coordinates) < radiusMeters);
    if (nearbyGroup) {
      nearbyGroup.facilities.push(facility);
    } else {
      groups.push({
        id: facility.id,
        coordinates: facility.coordinates,
        facilities: [facility],
      });
    }
  });
  return groups;
}

function CampusMap({ visibleFacilities, selectedFacility, onSelect }) {
  const mappedFacilities = visibleFacilities.filter(hasCoordinates);
  const markerGroups = groupNearbyFacilities(mappedFacilities, selectedFacility ? 20 : 250);

  return (
    <div className="campus-map" aria-label="Interactive map of mapped UP Mindanao facilities">
      <MapContainer
        center={[7.0845, 125.4805]}
        zoom={14}
        scrollWheelZoom={false}
        className="campus-map__canvas"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewport visibleFacilities={visibleFacilities} selectedFacility={selectedFacility} />
        {markerGroups.map((group) => {
          const firstFacility = group.facilities[0];
          const isSelected = group.facilities.some(({ id }) => id === selectedFacility?.id);
          return (
            <Marker
              key={group.id}
              position={group.coordinates}
              icon={createFacilityIcon(group, isSelected)}
              title={group.facilities.map(({ name }) => name).join(', ')}
              eventHandlers={{ click: () => onSelect(firstFacility.id) }}
            >
              <Popup>
                {group.facilities.map((facility) => {
                  const index = facilities.findIndex(({ id }) => id === facility.id);
                  return (
                    <div key={facility.id}>
                      <strong>{index + 1}. {facility.name}</strong>
                      <p>{facility.mapLabel}</p>
                      <a href={facility.source} target="_blank" rel="noreferrer">Official facility details</a>
                    </div>
                  );
                })}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="campus-map__credit">
        <span>{mappedFacilities.length} of {visibleFacilities.length} listed facilities have a public map match</span>
        <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">View map data</a>
      </div>
    </div>
  );
}

function FacilityCard({ facility, index, isSelected, onSelect }) {
  return (
    <article className={`campus-facility-card${isSelected ? ' is-selected' : ''}`}>
      <img className="campus-facility-card__image" src={facility.image} alt="" loading="lazy" />
      <div className="campus-facility-card__body">
        <div className="campus-facility-card__meta">
          <span className={`campus-category-dot campus-category-dot--${categoryColors[facility.category]}`} />
          <span>{facility.category}</span>
          <span className="campus-facility-card__number">#{index + 1}</span>
        </div>
        <h3>{facility.name}</h3>
        <p>{facility.description}</p>
        {hasCoordinates(facility) ? (
          <p className="campus-facility-card__location">
            <span aria-hidden="true">●</span> {facility.mapLabel}
          </p>
        ) : (
          <p className="campus-facility-card__location campus-facility-card__location--unknown">
            Exact building/room not identified in the public directory.
          </p>
        )}
        <div className="campus-facility-card__actions">
          {hasCoordinates(facility) && (
            <button type="button" className="campus-text-button" onClick={() => onSelect(facility.id)}>
              Show on map
            </button>
          )}
          <a href={facility.source} target="_blank" rel="noreferrer">Official details ↗</a>
        </div>
      </div>
    </article>
  );
}

export default function CampusFacilities() {
  const [activeCategory, setActiveCategory] = useState('All facilities');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const visibleFacilities = facilities.filter((facility) => {
    const matchesCategory = activeCategory === 'All facilities' || facility.category === activeCategory;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${facility.name} ${facility.description} ${facility.category}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  const selectedFacility = visibleFacilities.find(({ id }) => id === selectedId);

  const filters = ['All facilities', ...categories];

  return (
    <section className="campus-page">
      <header className="campus-page__header">
        <div>
          <span className="campus-page__eyebrow">UP MINDANAO · CAMPUS GUIDE</span>
          <h1 tabIndex="-1">Campus Facility &amp; Safety</h1>
          <p>Find campus facilities, check the map, and keep the campus security contact close.</p>
        </div>
        <a className="campus-page__official-link" href={officialFacilitiesUrl} target="_blank" rel="noreferrer">
          Official UP Mindanao directory <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="campus-safety" aria-labelledby="campus-safety-title">
        <div className="campus-safety__icon" aria-hidden="true">!</div>
        <div className="campus-safety__copy">
          <h2 id="campus-safety-title">Campus assistance</h2>
          <p>For on-campus assistance, contact the Front Entrance Guard. For emergencies, contact local emergency services.</p>
        </div>
        <a href="tel:+63822930312" className="campus-safety__phone">
          <span>Front Entrance Guard</span>
          <strong>+63 (82) 293-0312</strong>
        </a>
      </section>

      <section className="campus-map-panel" aria-labelledby="campus-map-title">
        <div className="campus-section-heading">
          <div>
            <h2 id="campus-map-title">Campus map</h2>
            <p>Nearby pins cluster at campus scale. Select a facility below to zoom in; unlocated facilities are not placed speculatively.</p>
          </div>
          <label className="campus-search">
            <span className="visually-hidden">Search campus facilities</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search facilities"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedId(null);
              }}
            />
          </label>
        </div>

        <div className="campus-filters" role="group" aria-label="Filter facilities by category">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeCategory === filter ? 'is-active' : ''}
              aria-pressed={activeCategory === filter}
              onClick={() => {
                setActiveCategory(filter);
                setSelectedId(null);
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <CampusMap
          visibleFacilities={visibleFacilities}
          selectedFacility={selectedFacility}
          onSelect={setSelectedId}
        />

        <p className="campus-map-disclaimer">
          The official facilities directory does not provide a campus site plan or room-level locations. Facility descriptions and photos are from UP Mindanao; mapped pins use OpenStreetMap data and are approximate building matches, not an official university map.
        </p>
      </section>

      <section className="campus-directory" aria-labelledby="campus-directory-title">
        <div className="campus-section-heading">
          <div>
            <h2 id="campus-directory-title">Facility directory</h2>
            <p>{visibleFacilities.length} {visibleFacilities.length === 1 ? 'facility' : 'facilities'} shown</p>
          </div>
        </div>
        {visibleFacilities.length > 0 ? (
          <div className="campus-facility-grid">
            {visibleFacilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                index={facilities.findIndex(({ id }) => id === facility.id)}
                isSelected={facility.id === selectedId}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        ) : (
          <p className="campus-no-results">No facilities match that search. Try another name or category.</p>
        )}
      </section>

      <footer className="campus-sources">
        <span>Sources</span>
        <a href={officialFacilitiesUrl} target="_blank" rel="noreferrer">UP Mindanao Facilities Directory</a>
        <span aria-hidden="true">·</span>
        <a href="https://dbses.upmin.edu.ph/" target="_blank" rel="noreferrer">DBSES official site</a>
        <span aria-hidden="true">·</span>
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>
      </footer>
    </section>
  );
}
