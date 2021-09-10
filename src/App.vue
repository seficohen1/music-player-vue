<template>
  <app-header></app-header>
  <router-view v-slot="{ Component }" mode="out-in">
    <transition name="fade">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <app-player></app-player>
  <auth-modal></auth-modal>
</template>

<script>
import AppHeader from './components/Header.vue';
import AuthModal from './components/Auth.vue';
import AppPlayer from './components/Player.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};

</script>

<style >
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5 linear;
  opacity: 0;
}
</style>
