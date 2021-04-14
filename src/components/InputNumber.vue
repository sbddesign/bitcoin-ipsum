<template>
  <div>
    <input
      type="number"
      v-model.number="count"
      :name="name"
      :id="name"
      @change="$emit('number-change', name, count)"
    />
    <label :for="name">
      <slot></slot>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'InputNumber',
    props: {
      value: Number,
      checked: Boolean,
      name: String
    },
    data(){
      return {
        count: this.value
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../scss/variables";

  div {
    margin-bottom: 1rem;
  }

  input {
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border-width: 1px;
    border-style: solid;
    border-color: #999;
    box-shadow: 0 0 20px fade-out($color-orange, 1);
    transition: box-shadow 0.25s;
    color: #666;
    width: 5rem;

    &:active {
      border-radius: 0.5rem;
      border-color: #00A7A7;
    }

    &:focus {
      border-radius: 0.5rem !important;
      border-color: $color-orange !important;
      outline: none;
      box-shadow: 0 0 20px fade-out($color-orange, 0.65);
      transition: box-shadow 0.25s;
    }
  }
</style>