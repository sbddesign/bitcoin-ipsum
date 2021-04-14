<template>
  <span class="btn-container" :class="['btn-container', buttonStyle ? buttonStyle : 'primary']">
    <button
      v-if="!to"
      :id="id"
      type="button"
      :class="[iconOnly ? 'icon-only' : '', buttonStyle ? buttonStyle : 'primary', flipped ? 'flipped' : '']"
      @click="() => { $emit('button-click'); this.clicked = true }"
      @mouseleave="swapText"
    >
      <span class="text">
        <slot>Submit</slot>
      </span>
      <font-awesome-icon :icon="icon ? icon : 'arrow-circle-right'" />
    </button>
    <router-link
      v-if="to"
      :to="to"
      tag="button"
      :class="[iconOnly ? 'icon-only' : '', buttonStyle ? buttonStyle : 'primary', flipped ? 'flipped' : '']"
    >
      <span class="text">
        <slot>Submit</slot>
      </span>
      <font-awesome-icon :icon="icon ? icon : 'arrow-circle-right'" />
    </router-link>
    <label
      v-if="tooltipText"
      class="tooltip"
      :for="id"
    >
      <span class="text" v-html="!clicked ? tooltipText : (tooltipClickedText ? tooltipClickedText : tooltipText)"></span>
      <span class="arrow-up"></span>
    </label>
  </span>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      buttonStyle: String,
      icon: String,
      iconOnly: Boolean,
      to: String,
      flipped: String,
      tooltipText: String,
      tooltipClickedText: String,
      id: String
    },
    data(){
      return {
        clicked: false
      }
    },
    methods: {
      swapText(){
        setTimeout(()=>{
          this.clicked = false;
        }, 250);
      }
    }
  }
</script>

<style lang="scss">
  @import "../scss/variables";

  button {
    background: #ff9500;
    padding: 1rem 1.5rem;
    color: #fff;
    font-weight: 600;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.25s, box-shadow 0.25s;
    box-shadow: 0 2px 5px rgba(10,10,10,0.0);
    border-width: 3px;
    border-style: solid;
    border-color: $color-orange;

    svg {
      margin-left: 0.5rem;
    }

    &.icon-only {
      padding: 1rem;

      .text {
        position: absolute;
        left: -999rem;
      }

      svg {
        margin-left: 0;
        transform: scale(1.5);
      }
    }

    &:hover {
      transform: scale(1.02);
      transition: transform 0.25s, box-shadow 0.25s;
      box-shadow: 0 2px 5px rgba(10,10,10,0.15);
    }

    &:focus {
      outline: none;
      border-color: darken($color-orange, 15%);
    }

    &.flipped {
      display: flex;
      flex-direction: row-reverse;

      svg {
        margin-left: 0;
        margin-right: 0.5rem;
      }
    }
  }

  button.secondary {
    background: $color-blue;
    border-color: $color-blue;

    &:focus {
      border-color: darken($color-blue, 15%);
    }
   }

  .btn-container {
    position: relative;

    .tooltip {
      position: absolute;
      top: 90%;
      left: 0;
      width: 300%;
      display: flex;
      flex-direction: column-reverse;
      transform: translate(-33.333%, -50%);
      opacity:0;
      justify-content: center;
      align-items: center;
      pointer-events: none;
      transition: transform 0.25s cubic-bezier(0, 0, 0.16, 1.04), opacity 0.25s cubic-bezier(0, 0, 0.16, 1.04);

      .arrow-up {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid lighten($color-orange, 35%);
      }

      .text {
        //border: 1px solid darken($color-orange, 10%);
        background: lighten($color-orange, 35%);
        padding: 0.25rem;
        border-radius: 0.25rem;
        display: inline-block;
        box-shadow: 0 5px 10px rgba(10,10,10,0.07);
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 1px;
      }
    }

    &:hover {
      .tooltip {
        //top: 90%;
        //left: 0;
        transform: translate(-33.333%, 0%);
        opacity:1;
      }
    }

    &.secondary {
      .tooltip {
        .arrow-up {
          border-bottom: 10px solid lighten($color-blue, 35%);
        }

        .text {
          background: lighten($color-blue, 35%);
          box-shadow: 0 5px 10px rgba(10,10,10,0.07);
        }
      }
    }
  }

  @media #{$medium-up} {
    button {
      font-size: 1rem;
    }
  }
</style>