<template>
  <div>
    <div :class="{'text-area-scrollable-container': true, 'copied': copied}">
      <overlay-scrollbars
          ref="osComponentRef1"
          :options="{
            resize: 'none',
            className: 'os-theme-round-dark',
            paddingAbsolute: true,
            scrollbars: {
              autoHide: 'never'
            }
          }"
          :class="['Vue', 'text-area-scrollable']"
      >
        <div :class="{'text-area-html': true, 'copied': copied}">
          <p v-for="paragraph in placeholder" :key="paragraph">
            {{paragraph}}
          </p>
        </div>

        <textarea id="text-area-input" readonly v-html="placeholderString"></textarea>
      </overlay-scrollbars>
    </div>

    <ButtonGroup>
      <Button to="/" id="go-back-btn" button-style="secondary" icon="arrow-circle-left" flipped="true">Go Back</Button>
      <Button
        iconOnly
        id="copy-text-btn"
        icon="copy"
        @button-click="copyText"
        tooltip-text="Copy text"
        tooltip-clicked-text="Copied!"
      >
        Copy to Clipboard
      </Button>
    </ButtonGroup>
  </div>
</template>

<script>
  import ButtonGroup from '../components/ButtonGroup';
  import Button from '../components/Button';


  export default {
    name: 'Generator',
    metaInfo: {
      title: 'Generator'
    },
    props: {
      useIntro: Boolean,
      memes: Boolean,
      economics: Boolean,
      paragraphsCount: Number,
    },
    components: {
      Button,
      ButtonGroup
    },
    data(){
      return {
        placeholder: null,
        placeholderString: "",
        copied: false,
        timerHold: false
      }
    },
    created(){
      this.generatePlaceholder()
    },
    methods: {
      generatePlaceholder(){
        let paragraphCount = this.paragraphsCount ? this.paragraphsCount : 5
        let averageParagraphSize = 30
        let averageSentenceSize = 8
        let placeholder = []
        let starter = "Bitcoin ipsum dolor sit amet. "
        let paragraph = this.useIntro ? starter : ""

        let words = [];

        words.push([
            'bitcoin', 'blockchain', 'blocksize', 'hash', 'transaction', 'inputs', 'outputs', 'UTXO', 'address', 'wallet',
            'whitepaper', 'Satoshi Nakamoto', 'genesis block', 'difficulty', 'hashrate', 'nonce', 'segwit', 'hard fork',
            'soft fork', 'full node', 'miner', 'mining', 'block reward', 'halvening', 'Bitcoin Improvement Proposal',
            'sats', 'satoshis', "stacking sats", "decentralized", "cryptocurrency", "double-spend problem",
            "block height", "peer-to-peer", "proof-of-work", "digital signature", "electronic cash", "timestamp server",
            "SHA-256", "Merkle Tree", "public key", "private key", "key pair", "consensus", "mempool", "taproot", "full RBF", 
            "non-replacement", "justice transaction", 'eltoo', 'channels', 'multi-sig', 'single-sig', 'tapscript', 'musig2', 'MPP',
            'key-tweak', 'Schnorr', 'HTLC', 'trust minimized', 'witness', 'federation' , 'Chaumian', 'preimage', 'gossip', 'IBD',
            'key aggregation', 'multi-party', 'validation', 'LSP', 'liquidity', 'feature bit', 'SIGHASH', 'CHECKSIG', 'commitment', 
            'timelock', 'sovereign', 'activation', 'CLTV', 'bits', 'signet', 'testnet', 'mainnet', 'seed', 'M-of-N', '2-of-2',
            'OP_RETURN', 'verify', 'delegate'
        ]);

        if(this.memes) words.push([
          'pizza', 'few understand this', 'space citadel', "to the moon", "hodl", "freefall together",
          "roller coaster", "money printer go brrrrr", "I'm in it for the tech", "when lambo"
        ]);

        if(this.economics) words.push([
            'fee market', 'hyperbitcoinization', "volatility", "deflationary monetary policy", "price action"
        ]);

        words = words.concat.apply([], words)

        let punctuationArray = [".", ".", ".", "?", "!"]
        // Build paragraphs
        for(let i=0; i<paragraphCount; i++) {
          // Determine unique size of this paragraph
          let paragraphAdd = Math.random() > 0.5,
              paragraphAdjustment = Math.floor( Math.random() * (averageParagraphSize/4)),
              paragraphSize = paragraphAdd ? averageParagraphSize + paragraphAdjustment : averageParagraphSize - paragraphAdjustment;

          // Build paragraph
          while(paragraphSize > 0) {
            // Determine unique size of sentence
            let sentenceAdd = Math.random() > 0.5,
                sentenceAdjustment = Math.floor( Math.random() * (averageSentenceSize/4)),
                sentenceSize = sentenceAdd ? averageSentenceSize + sentenceAdjustment : averageSentenceSize - sentenceAdjustment,
                firstWord = true,
                prevWord = 0;

            // Build sentence
            while(sentenceSize > 0 && paragraphSize > 0) {
              // Check for using same word twice in a row
              let x = Math.floor(Math.random() * (words.length));
              if(x === prevWord) {
                while(x === prevWord) {
                  x = Math.floor(Math.random() * (words.length));
                }
              }

              // Get word
              let word = words[x];

              paragraph += firstWord ? word[0].toUpperCase() + word.substring(1) : word ;

              // Slight chance of a comma if not end of sentence
              if(sentenceSize > 1 && paragraphSize > 1) {
                if(Math.random() < 0.15) paragraph += ",";
              }

              // Punctuate if end of sentence
              if(sentenceSize === 1 || paragraphSize === 1) {
                let y = Math.floor(Math.random() * (punctuationArray.length));
                paragraph += punctuationArray[y];
              }

              // Space after word if not end of paragraph
              if(paragraphSize !== 1) paragraph += " ";
              sentenceSize--;
              paragraphSize--;
              firstWord = false;
              prevWord = x;
            }
          }

          placeholder.push(paragraph);
          paragraph = "";
        }

        this.placeholder = placeholder;

        this.placeholder.forEach(paragraph => {
          this.placeholderString += paragraph + "\n\n"
        });
      },
      copyText() {
        this.copied = false;
        let copyText = document.getElementById("text-area-input");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        document.execCommand("copy");
        this.copied = true;
        this.timerHold = true;
        setTimeout(()=>{
          this.copied = false;
        }, 4000);


      },
      deselect(){
        this.copied = false;
        document.removeEventListener('click', ()=>{this.deselect()});
      }
    }
  }
</script>

<style lang="scss">
@import "../scss/variables";

.text-area-scrollable-container {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid $color-gray-faint;

  &.copied {
    border-width: 1px solid $color-orange;
    box-shadow: 0 0 30px fade-out($color-orange, 0.85);
    animation: copyGlow 4s ease-out both;

    p {
      animation: copyTextHighlight 4s ease-out both;
    }
  }

  @keyframes copyGlow {
    0% {
      border-color: $color-gray-faint;
      box-shadow: 0 0 0px fade-out($color-orange, 1.0);
    }
    10% {
      border-color: $color-orange;
      box-shadow: 0 0 30px fade-out($color-orange, 0.65);
    }
    65% {
      border-color: $color-orange;
      box-shadow: 0 0 30px fade-out($color-orange, 0.65);
    }
    100% {
      border-color: $color-gray-faint;
      box-shadow: 0 0 0px fade-out($color-orange, 1.0);
    }
  }

  @keyframes copyTextHighlight {
    0% {
      background-color: fade-out($color-orange, 1);
    }
    10% {
      background-color: fade-out($color-orange, 0.65);
    }
    65% {
      background-color: fade-out($color-orange, 0.65);
    }
    100% {
      background-color: fade-out($color-orange, 1);
    }
  }

  .text-area-scrollable {
    height: 400px;

    .text-area-html {
      padding: 2rem 3rem 2rem 2rem;
    }

    #text-area-input {
      position: absolute;
      left: -999rem;
      width: 100px;
      height: 100px;
      top: -999rem;
    }
  }
}

/*
os-theme-round-dark
*/

.os-theme-round-dark > .os-scrollbar {
  padding: 0;
}
.os-theme-round-dark > .os-scrollbar-horizontal {
  right: 20px;
  height: 20px;
}
.os-theme-round-dark > .os-scrollbar-vertical {
  bottom: 20px;
  width: 20px;
}
.os-theme-round-dark.os-host-rtl > .os-scrollbar-horizontal {
  left: 20px;
  right: 0;
}
.os-theme-round-dark > .os-scrollbar-corner {
  height: 20px;
  width: 20px;
  background-color: transparent;
}
.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track {
  background: transparent;
}
.os-theme-round-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before,
.os-theme-round-dark > .os-scrollbar-vertical > .os-scrollbar-track:before {
  content: '';
  display: block;
  position: absolute;
  background: rgba(0, 0, 0, 0.15);
}
.os-theme-round-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before {
  left: 3px;
  right: 3px;
  height: 2px;
  top: 50%;
  margin-top: -1px;
}
.os-theme-round-dark > .os-scrollbar-vertical > .os-scrollbar-track:before {
  top: 3px;
  bottom: 3px;
  width: 2px;
  left: 50%;
  margin-left: -1px;
}
.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
  background: transparent;
}
.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {
  content: '';
  display: block;
  position: absolute;
  background: $color-blue;
  border-radius: 100%;
  top: 3px;
  bottom: 3px;
  left: 3px;
  right: 3px;
  transform: scale(1);
}
.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover:before,
.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active:before {
  transform: scale(1.3);
}
.os-theme-round-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {
  height: 100%;
  min-width: 20px;
  max-width: 20px;
}
.os-theme-round-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {
  width: 100%;
  min-height: 20px;
  max-height: 20px;
}
.os-theme-round-dark.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {
  transition: transform 0.3s;
}
</style>