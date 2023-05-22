<template>
  <v-sheet :color="voteColor" elevation="1" height="65px"></v-sheet>
</template>

<script>
export default {
  props: ['currentPlayerNumberOfVotes'],
  
  data() {
    return {
      whiteWidthRedSide: '',
      redWidth: '',
      greenWidth: '',
      whiteWidthGreenSide: ''
    };
  },
  
  computed: {
    voteColor() {
      if (this.currentPlayerNumberOfVotes > 0) return "red";
      else if (this.currentPlayerNumberOfVotes < 0) return "green";
      else return "white";
    }
  },
  
  methods: {
    calculateVoteBar(votes) {
      var votesPositive = Math.abs(votes);
      var redWidthCalculation = votesPositive * 10;
      var whitePercent = 50 - redWidthCalculation;
      return { redPercent: redWidthCalculation - 5, whitePercent: whitePercent - 5 };
    }
  },
  
  watch: {
    currentPlayerNumberOfVotes(val) {
      var numbers = this.calculateVoteBar(val);
      if(val < 0) {
        this.redWidth = `${numbers.redPercent}%`;
        this.whiteWidthRedSide = `${numbers.whitePercent}%`;
        this.whiteWidthGreenSide = '50%';
      } else if (val > 0) {
        this.greenWidth = `${numbers.redPercent}%`;
        this.whiteWidthGreenSide = `${numbers.whitePercent}%`;
        this.whiteWidthRedSide = '50%';
      } else {
        this.greenWidth = '0%';
        this.whiteWidthGreenSide='50%';
        this.redWidth = '0%';
        this.whiteWidthRedSide = '50%';
      }
    }
  }
}
</script>

<style>

</style>
