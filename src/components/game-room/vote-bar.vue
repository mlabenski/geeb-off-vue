<template>
        <v-sheet color="white" elevation="1" height="75px" :width="whiteWidthRedSide">
      </v-sheet>
      <v-sheet color="red" elevation="1" height="75px" :width="redWidth">
      </v-sheet>
      <v-sheet color="green" elevation="1" height="75px"  :width="greenWidth">
      </v-sheet>
      <v-sheet color="white" elevation="1" height="75px"  :width="whiteWidthGreenSide">
      </v-sheet>
</template>

<script>
export default {
  props: [
    'currentPlayerNumberOfVotes'
  ],
  data() {
    return {
      
        whiteWidthRedSide: '',
        redWidth: '',
        greenWidth: '',
        whiteWidthGreenSide: ''
    }
  },
  methods: {
    //this is where the calculation for width will take place:
    
  },
  watch: {
    currentPlayerNumberOfVotes (val) {
      console.log(val);
      if(val < 0) {
        //at this time the max width sould go to 50%
        var newVal = Math.abs(val);
        var calculateRedWidth = newVal * 10;
        var stringR = calculateRedWidth.toString();
        this.redWidth = stringR+'%';
         console.log('The calculation for red width: '+stringG);
        var whiteWidthR = 50-calculateRedWidth;
        var whiteStringR = whiteWidthR.toString();
        this.whiteWidthRedSide = whiteStringR+'%';
        this.whiteWidthGreenSide = '50%';
        //the votes are in the red
      }
      else if (val > 0) {
                //at this time the max width sould go to 50%
        var calculateGreenWidth = val * 10;
        var stringG = calculateGreenWidth.toString();
        console.log('The calculation for green width: '+stringG);
        this.greenWidth = stringG+'%';
        var whiteWidthG = 50-calculateGreenWidth;
        var whiteStringG = whiteWidthG.toString();
        this.whiteWidthGreenSide = whiteStringG+'%';
        this.whiteWidthRedSide = '50%';
        //the votes are in the red
        //the votes are in the green
      }
      else {
        this.greenWidth = '0%';
        this.whiteWidthGreenSide='50%';
        this.redWidth = '0%';
        this.whiteWidthRedSide = '50%';
        //the votes are in the middle
      }
    }
  }
}
</script>

<style>

</style>