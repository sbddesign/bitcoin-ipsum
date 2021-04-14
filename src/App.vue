<template>
  <div id="app">
    <div class="background"></div>
    <main>
      <h1>
        <router-link to="/">Bitcoin Ipsum</router-link>
      </h1>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
  @import "scss/variables";

  body, html {
    font-family: $font-main;
    font-weight: 300;
    font-size: 18px;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  ::selection {
    background-color: fade-out($color-orange, 0.65);
  }

  a {
    color: $color-blue;
    text-decoration: underline;
    font-weight: 600;
  }

  h1 {
    font-weight: 300;
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 1rem;

    a {
      color: #000;
      text-decoration: none;
      font-weight: 300;
    }
  }

  h3 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
  }

  #app {
    display: flex;
    flex-direction: row-reverse;
    padding: 1rem 1rem 0;
    justify-content: center;
  }

  .background {
    background:  url('assets/bitcoin-ipsum-background.svg'), linear-gradient(180deg, #FFFFFF 0%, #A2F7FD 81.25%);
    background-repeat: no-repeat;
    background-size: 100% auto, cover;
    background-position: right bottom, center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }

  main {
    background: #ffffff;
    box-shadow: 0 1rem 4rem rgba(0,0,0,0.15);
    //padding: 3rem 4rem 4rem;
    padding: 1rem 1.5rem 1.5rem;
    border-radius: 1rem;
    max-width: 500px;
    align-self: flex-start;
    position: relative;
    z-index: 99;
    width: 100%;

    div {
      :last-child {
        margin-bottom: 0;
      }
    }
  }

  @media #{$medium-up} {
    h1 {
      font-size: 4rem;
    }

    #app {
      padding: 2rem 2rem 2rem 0;
      justify-content: flex-start;
    }

    main {
      padding: 3rem 4rem 4rem;
    }
  }

  @media #{$large-up} {
    h1 {
      font-size: 4rem;
    }

    #app {
      padding: 4rem 4rem 4rem 0;
    }

    main {
      padding: 3rem 4rem 4rem;
    }
  }

  @media #{$xlarge-up} {
    #app {
      padding: 6rem 6rem 6rem 0;
    }
  }
</style>