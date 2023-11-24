/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type CollectionEntry } from "astro:content";
import { getHtmlMarkerInfo } from "./html-marker-info";

export async function initMap(
  tourStops: Array<CollectionEntry<"places">>,
): Promise<void> {
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
  tourStops.forEach(
    ({ data: { title, coordinates, featuresPlace }, slug }, i) => {
      const pin = new PinElement({
        glyph: `${i + 1}`,
      });

      const marker = new AdvancedMarkerElement({
        position: coordinates,
        map,
        title,
        content: pin.element,
      });

      bounds.extend(coordinates);

      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", async () => {
        infoWindow.close();
        infoWindow.setContent(
          await getHtmlMarkerInfo(featuresPlace, slug, title),
        );
        infoWindow.open(marker.map, marker);
      });
    },
  );

  map.fitBounds(bounds);
}
