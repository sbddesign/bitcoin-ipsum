<template>
  <div class="buttons-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ButtonGroup'
  }
</script>

<style lang="scss">
  .buttons-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;

    .btn-container {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>