<template>
  <div>
    <div class="custom-check">
      <input
          type="checkbox"
          :value="value"
          :checked="checked"
          :name="name"
          :id="name"
          @change="updateIsChecked"
      />
      <div class="custom-check-inner">
        <div class="fill" :class="{'checked': isChecked, 'default-state': defaultState}"></div>
      </div>
    </div>
    <label :for="name">
      <slot></slot>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'InputCheckbox',
    props: {
      value: String,
      checked: Boolean,
      name: String
    },
    data(){
      return {
        isChecked: false,
        defaultState: true
      }
    },
    created() {
      this.setIsCheckedFromProp();
    },
    methods: {
      setIsCheckedFromProp() {
        this.isChecked = this.checked
      },
      updateIsChecked(e){
        this.isChecked = !this.isChecked
        this.defaultState = false;
        this.$emit('checkbox-change', e.target.value, e.target.checked)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../scss/variables";

  div {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .custom-check {
    width: 1.5rem;
    height: 1.5rem;
    //overflow: hidden;
    background: #fff;
    padding: 0.25rem;
    position: relative;
    margin-right: 1rem;
    margin-bottom: 0;
    flex-basis: 1.5rem;

    .fill {
      background: #ff9500;
      display: block;
      pointer-events: none;
      width: 100%;
      height: 100%;
      //border: 3px solid #fff;
      border-radius: 0.25rem;
      position: absolute;
      top: 20%;
      left: 20%;
      width: 60%;
      height: 60%;
      animation: scale_out 0.25s ease-in both;

      &.default-state {
        animation: none;
        display: none;
      }

      &.checked {
        display: block;
        animation: bounce_in 0.5s ease-out both;

        &.default-state {
          animation: none;
          display: block;
        }
      }
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      cursor: pointer;

      &:focus {
        &+ .custom-check-inner {
          border-color: $color-orange;
          //outline: $color-orange solid thick;
          //border-radius: 0.5rem;
          box-shadow: 0 0 20px fade-out($color-orange, 0.65);
          transition: box-shadow 0.25s;
        }
      }
    }

    .custom-check-inner {
      width: 100%;
      height: 100%;
      position: absolute;
      border: 1px solid $color-gray-faint;
      border-radius: 0.5rem;
      top: 0;
      left: 0;
      cursor: pointer;
      pointer-events: none;
      box-shadow: 0 0 20px fade-out($color-orange, 1);
      transition: box-shadow 0.25s;
    }
  }

  label {
    flex-basis: 70%;
  }

  @keyframes bounce_in {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1.0;
      transform: scale(1.1);
    }
    65% {
      opacity: 1.0;
      transform: scale(0.9);
    }
    85% {
      opacity: 1.0;
      transform: scale(1.05);
    }
    100% {
      opacity: 1.0;
      transform: scale(1.0);
    }
  }

  @keyframes scale_out {
    0% {
      opacity: 1.0;
      transform: scale(1);
    }
    25% {
      opacity: 1.0;
      transform: scale(1.2);
    }
    100% {
      opacity: 0.0;
      transform: scale(0);
    }
  }
</style>