import { View, StyleSheet } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { MAP_STYLE_URL } from "@/constants/mapbox";
import { places } from "@/data/places";
import { forwardRef } from "react";

const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

type Place = (typeof places)[0];

interface HomeMapProps {
  selectedPlace: Place | null;
  onAnnotationPress?: (place: Place) => void;
}

export const HomeMap = forwardRef<MapboxGL.Camera, HomeMapProps>(
  ({ selectedPlace, onAnnotationPress }, cameraRef) => {
    const handleAnnotationSelect = (place: Place) => {
      onAnnotationPress?.(place);
    };

    return (
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MAP_STYLE_URL}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
        scaleBarEnabled={false}
        pitchEnabled
      >
        <MapboxGL.Camera
          ref={cameraRef}
          zoomLevel={16}
          centerCoordinate={CAMPUS_CENTER}
          animationMode="flyTo"
          animationDuration={0}
        />

        <MapboxGL.UserLocation visible showsUserHeadingIndicator />

        <MapboxGL.FillExtrusionLayer
          id="3d-buildings"
          sourceID="composite"
          sourceLayerID="building"
          minZoomLevel={15}
          maxZoomLevel={22}
          style={{
            fillExtrusionColor: "#D1D5DB",
            fillExtrusionHeight: ["get", "height"],
            fillExtrusionBase: ["get", "min_height"],
            fillExtrusionOpacity: 0.8,
          }}
        />

        {selectedPlace && (
          <MapboxGL.PointAnnotation
            key={selectedPlace.id}
            id={`marker-${selectedPlace.id}`}
            coordinate={[selectedPlace.longitude, selectedPlace.latitude]}
            onSelected={() => handleAnnotationSelect(selectedPlace)}
          >
            <View style={styles.markerPin}>
              <View style={styles.markerDot} />
            </View>
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>
    );
  },
);

HomeMap.displayName = "HomeMap";

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  markerPin: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4DA8FF",
  },
});
