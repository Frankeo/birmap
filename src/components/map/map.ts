/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { getEntry, type CollectionEntry } from "astro:content";
import { getIconHtml } from "../icon/icon";

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
      const getHtmlInfo = async (): Promise<string> => {
        let featuresHtml = "";
        for (const fp of featuresPlace) {
          const feature = await getEntry(
            fp.feature.collection,
            fp.feature.slug,
          );
          featuresHtml = `${featuresHtml}${getIconHtml(
            feature.data.iconCss,
            fp.value,
            true,
          )}`;
        }
        return /* html */ `        
      <a href="/places/${slug}" class="has-text-primary">
        <p>${title}</p>
        ${featuresHtml}
      </a>
      `;
      };
      marker.addListener("click", async () => {
        infoWindow.close();
        infoWindow.setContent(await getHtmlInfo());
        infoWindow.open(marker.map, marker);
      });
    },
  );

  map.fitBounds(bounds);
}
