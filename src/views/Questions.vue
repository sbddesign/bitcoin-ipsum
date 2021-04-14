<template>
  <div>
    <h2>Questions &amp; Answers</h2>

    <h3>What am I looking at?</h3>
    <p>
      A joke, mostly. It’s an alternative to the web’s original <a href="https://lipsum.com/">Lorem Ipsum Generator</a>.
      If you are a designer, you can use this to generate placeholder text for your designs.
    </p>

    <h3>What is lorem ipsum text?</h3>
    <p>
      Lorem ipsum text is dummy text that is used by printers, graphic designers, etc. when designing a layout. The
      original lorem ipsum text dates back to the 1500’s. I read that on the internet, so it must be true.
    </p>

    <h3>What is Bitcoin?</h3>
    <p>
      It’s <a href="https://hellobitco.in/">magic internet money</a>.
    </p>

    <ButtonGroup>
      <Button to="/" button-style="secondary" icon="arrow-circle-left" flipped="true">Go Back</Button>
    </ButtonGroup>
  </div>
</template>

<script>
import Button from '../components/Button';
import ButtonGroup from '../components/ButtonGroup';

export default {
  name: 'Questions',
  components: {
    Button, ButtonGroup
  },
  metaInfo: {
    title: 'Questions &amp; Answers'
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.buttons-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.links-group {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0 0 1rem 0;
  padding: 0;
}

.links-group li {
  margin-right: 2rem;
}

.links-group li:last-child {
  margin-right: 0;
}
</style>