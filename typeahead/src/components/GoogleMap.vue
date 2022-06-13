<script>
import { defineComponent } from "vue";
import { GoogleMap, Polygon, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Polygon, Marker },
  props: {
    boundary: Array,
    selectedCenter: Object,
    abbreviation: String,
    name: String,
  },
  setup() {
    const center = { lat: 39.8097343, lng: -88.5556199 };

    return { center };
  },
  computed: {
    polygonOptions() {
      return {
        paths: this.boundary,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      };
    },
    markerOptions() {
      return {
        position: this.selectedCenter,
        label: this.abbreviation,
        title: this.name,
      };
    },
  },
});
</script>

<template>
  <GoogleMap
    api-key="AIzaSyAyJSrj_9wIk5Fj9HUT2UO7H9hvtSnE_P8"
    style="width: 100%; height: 100%"
    :center="center"
    :zoom="4"
  >
    <Polygon v-if="boundary && boundary.length >= 3" :options="polygonOptions" />
    <Marker
      v-if="selectedCenter.lat && selectedCenter.lng"
      :options="markerOptions"
    />
  </GoogleMap>
</template>
