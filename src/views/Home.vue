<template>
  <div>
    <p>
      Are you looking for interesting placeholder text for your next Bitcoin related design project? Bitcoin Ipsum is
      here to generate interesting filler for you with ease.
    </p>

    <InputCheckbox value="starter-text" name="starter-text-checkbox" :checked="starterText" v-on:checkbox-change="updateGeneratorButton">
      Start with &ldquo;Bitcoin ipsum dolor sit amet&hellip;&rdquo;
    </InputCheckbox>

    <InputCheckbox value="memes" name="memes-checkbox" :checked="memes" v-on:checkbox-change="updateGeneratorButton">
      Include memes
    </InputCheckbox>

    <InputCheckbox value="economics" name="economics-checkbox" :checked="economics" v-on:checkbox-change="updateGeneratorButton">
      Include economics
    </InputCheckbox>

    <InputNumber :value="paragraphsNumber" name="paragraphs-number" v-on:number-change="updateGeneratorButton">
      Paragraphs
    </InputNumber>

    <ButtonGroup>
      <Button :to="generatorURI" id="generator-btn">Generate Placeholder</Button>
      <Button
        to="questions"
        id="questions-btn"
        button-style="secondary"
        iconOnly
        icon="question-circle"
        tooltip-text="Questions"
      >
        Questions
      </Button>
    </ButtonGroup>

    <ul class="links-group">
      <li>
        <a href="https://twitter.com/StephenDeLorme">Built by Stephen DeLorme</a>
      </li>
      <li>
        <a href="https://github.com/sbddesign/bitcoin-ipsum">View Source</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import InputNumber from '../components/InputNumber';
  import Button from '../components/Button';
  import InputCheckbox from '../components/InputCheckbox';
  import ButtonGroup from '../components/ButtonGroup';

  export default {
    name: 'Home',
    metaInfo: {
      title: 'Home'
    },
    components: {
      ButtonGroup,
      InputNumber,
      Button,
      InputCheckbox
    },
    created() {
    },
    data(){
      return {
        starterText: true,
        memes: false,
        economics: false,
        paragraphsNumber: 5,
        generatorURI: '/generator'
      }
    },
    methods: {
      updateGeneratorButton(name, value){
        let kebabName = name.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
        this[kebabName] = value
        let newGeneratorURI = "/generator/";

        let details = [];

        if(this.starterText) details.push("starter-text")
        if(this.memes) details.push("memes")
        if(this.economics) details.push("economics")
        if(details.length === 0) details.push("vanilla")
        let detailsString = details.join(',')
        newGeneratorURI += detailsString + "/" + this.paragraphsNumber
        this.generatorURI = newGeneratorURI;
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.links-group {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.links-group li {
  margin-right: 2rem;
  margin-bottom: 1rem;
}

.links-group li:last-child {
  margin-right: 0;
  margin-bottom: 0;
}
</style>