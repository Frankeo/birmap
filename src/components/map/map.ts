export async function initMap(tourStops: MapPoint[]): Promise<void> {
  const { Map, InfoWindow } = (await google.maps.importLibrary(
    "maps",
  )) as google.maps.MapsLibrary;

  const { AdvancedMarkerElement, PinElement } =
    (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

  const bounds = new google.maps.LatLngBounds();

  const map = new Map(document.getElementById("map") as HTMLElement, {
    zoom: 14,
    center: { lat: 41.393796178419166, lng: 2.1745315543550334 },
    mapId: "BirMap",
  });

  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();

  // Create the markers.
  tourStops.forEach(({ position, title, slug }, i) => {
    const pin = new PinElement({
      glyph: `${i + 1}`,
    });

    const marker = new AdvancedMarkerElement({
      position,
      map,
      title: `<a href='/places/${slug}'>${title}</a>`,
      content: pin.element,
    });

    bounds.extend(position);

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  });

  map.fitBounds(bounds);
}
