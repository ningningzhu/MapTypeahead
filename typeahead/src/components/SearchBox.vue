<script>
import GoogleMap from "./GoogleMap.vue";

export default {
  components: {
    GoogleMap,
  },
  data() {
    return {
      message: "",
      output: "",
      res: [],
      selected: {},
      isLoading: false,
    };
  },
  computed: {
    clicked() {
      return this.selected.name === this.message
    }
  },
  methods: {
    getData() {
      if (this.clicked) {
        return;
      }
      const q = this.message.toLowerCase();
      const numReturn = 10;
      const query = `query($q: String, $numReturn: Int) {
            stateTypeahead(q: $q, numReturn: $numReturn) {
                id
                name
                boundary{lng,lat}
                center{lng,lat}
                abbreviation
            }
        }`;
      this.isLoading = true;
      fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { q, numReturn },
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          this.res = data.data.stateTypeahead;
          this.isLoading = false;
        });
    },
    setSelected(id) {
      for (let i = 0; i < this.res.length; i++) {
        if (this.res[i].id === id) {
          this.selected = this.res[i];
          this.message = this.res[i].name;
          this.res = [];
        }
      }
    },
  },
  // update searched results
  watch: {
    message() {
      this.getData();
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="search">
      <input type="text" v-model="message" placeholder="Search States..." />
      <div
        class="item"
        v-for="state in res"
        :key="state.id"
        @click="(e) => setSelected(state.id)"
      >
        <p>{{ state.name }}</p>
      </div>
      <div
        class="item error"
        v-if="!isLoading && !clicked && message && !res.length"
      >
        <p>No results found!</p>
      </div>
      <div v-if="isLoading">
        <p class="loading">...loading</p>
      </div>
    </div>
    <div class="map">
      <GoogleMap
        :boundary="
          selected && selected.boundary && selected.boundary.length > 0
            ? selected.boundary
            : []
        "
        :selectedCenter="selected && selected.center ? selected.center : {}"
        :name="selected.name"
        :abbreviation="selected.abbreviation"
      />
    </div>
  </div>
</template>

<style>
input {
  display: block;
  width: 250px;
  padding: 10px 10px;
  background: white no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 250px;
  padding: 10px 10px;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  cursor: pointer;
}

.item:hover {
  background-color: rgb(230, 230, 230);
}
.error {
  background-color: tomato;
}

.container {
  width: 100%;
  height: 40em;
  position: relative;
  padding-top: 2%;
}
.search {
  width: 20%;
  margin-left: 5%;
  margin-right: 0%;
  position: absolute;
}

.map {
  width: 100%;
  height: 100%;
  margin-left: 25%;
  position: absolute;
}
.loading {
  color: gray;
}
</style>
