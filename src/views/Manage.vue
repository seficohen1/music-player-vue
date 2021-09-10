<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addSong="addSong"></app-upload>
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <composition-item v-for="(song, i) in songsList"
            :key="song.docID"
            :song="song" :updateSong="updateSong" :index="i"
            :removeSong="removeSong"
            :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import { songsCollection, auth } from '@/includes/firebase';
import AppUpload from '../components/Upload.vue';
import CompositionItem from '../components/CompositionItem.vue';

export default {
  name: 'manage',
  components: {
    AppUpload,
    CompositionItem,
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
    snapshot.forEach(this.addSong);
  },
  data() {
    return {
      songsList: [],
      unsavedFlag: false,
    };
  },
  methods: {
    updateSong(i, values) {
      this.songsList[i].modified_name = values.modified_name;
      this.songsList[i].genre = values.genre;
    },
    removeSong(i) {
      this.songsList.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songsList.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('Are you sure you want to leave?');
      next(leave);
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  // },

};
</script>
