import React, { forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";

import { places } from "@/data/places";
import { MAP_STYLE_LIGHT, MAP_STYLE_DARK } from "@/constants/mapbox";
import { useColorScheme } from "@/hooks/useColorScheme";

type Place = (typeof places)[number];

export interface Props {
  selectedPlace: Place | null;
  onAnnotationPress: (place: Place) => void;
}

export type CameraRef = MapboxGL.Camera;

const HomeMap = forwardRef<CameraRef, Props>(
  ({ selectedPlace, onAnnotationPress }, ref) => {
    const theme = useColorScheme() ?? "light";

    const mapStyle = theme === "dark" ? MAP_STYLE_DARK : MAP_STYLE_LIGHT;
    return (
      <MapboxGL.MapView
        style={styles.map}
        styleURL={mapStyle}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
        scaleBarEnabled={false}
        pitchEnabled
      >
        <MapboxGL.Camera
          ref={ref}
          zoomLevel={16}
          pitch={0}
          centerCoordinate={[-0.1869, 5.6508]}
          animationMode="easeTo"
          animationDuration={700}
        />

        <MapboxGL.UserLocation visible showsUserHeadingIndicator />

        <MapboxGL.FillExtrusionLayer
          id="home-3d-buildings"
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
            id={`home-marker-${selectedPlace.id}`}
            coordinate={[selectedPlace.longitude, selectedPlace.latitude]}
            onSelected={() => onAnnotationPress(selectedPlace)}
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

export default HomeMap;

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
