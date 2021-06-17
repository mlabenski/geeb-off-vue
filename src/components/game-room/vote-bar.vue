<template>
        <v-sheet color="white" elevation="1" height="65px" :width="whiteWidthRedSide">
      </v-sheet>
      <v-sheet color="red" elevation="1" height="65px" :width="redWidth">
      </v-sheet>
      <v-sheet color="green" elevation="1" height="65px"  :width="greenWidth">
      </v-sheet>
      <v-sheet color="white" elevation="1" height="65px"  :width="whiteWidthGreenSide">
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
    calculateVoteBar(votes){
      var votesPositive = Math.abs(votes);
      var redWidthCalculation = votesPositive * 10;
      var redPercent = redWidthCalculation.toString();
      var whitePercent = 50-redWidthCalculation;
      var whitePercentString = whitePercent.toString();
      console.log(redPercent, whitePercent);
      return [redPercent, whitePercentString];
    }
    
  },
  watch: {
    currentPlayerNumberOfVotes (val) {
      var numbers = this.calculateVoteBar(val);
      console.log(numbers);
      if(val < 0) {
        //make them red bars
        this.redWidth = numbers[0]+"%";
        this.whiteWidthRedSide = numbers[1]+"%";
        this.whiteWidthGreenSide = '50%';
      }
      else if (val > 0) {
        this.greenWidth = numbers[0]+"%";
        this.whiteWidthGreenSide = numbers[1]+"%";
        this.whiteWidthRedSide = '50%'
      }
      else {
        this.greenWidth = '0%';
        this.whiteWidthGreenSide='49%';
        this.redWidth = '0%';
        this.whiteWidthRedSide = '49%';
        //the votes are in the middle
      }
    }
  }
}
</script>

<style>

</style>