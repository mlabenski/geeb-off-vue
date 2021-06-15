<template>
        <v-sheet color="grey" elevation="1" height="65px" :width="timerLength">
      </v-sheet>
</template>

<script>
export default {
    props: [
        'numberOfRounds'
    ],
    data() {
        return {
            timerLength: '100%',
            timer: 120
        }
    },
    watch: {
        numberOfRounds(value){
            this.timer = 120;
            console.log("timer is started: "+this.numberOfRounds)
            if(value ==1){
                console.log("The first round timer initated: ");
                this.calculateInitalTimer();
            }
            else if (value > 1) {
                console.log("Second round timer: ");
                this.timerLength = "100%";
                this.calculateTimerLength();
            }
        }
    },
    methods: {
        calculateInitalTimer() {
            var finalTimeRemaining = 0;
            var currentTime = new Date();
            var minutes = currentTime.getMinutes();
            minutes = minutes.toString();
            if(minutes.length > 1) {
                minutes = minutes.slice(1);
            }
            var seconds = currentTime.getSeconds();
            var under60seconds = ['1','3','5','7','9'];
            var over60seconds = ['0','2','4','6','8'];
            if(under60seconds.includes(minutes)) {
                finalTimeRemaining = 60-seconds;
            }
            else if(over60seconds.includes(minutes)) {
                finalTimeRemaining = 60+(60-seconds);
            }
            if(finalTimeRemaining != 0 ) {
                this.timer = finalTimeRemaining;
                this.calculateTimerLength();
            }
        },
        calculateTimerLength(){
            var countdownPercent = 100;
            var lastRoundNumber = this.numberOfRounds;
            setTimeout(() => {
                if(this.timer > 1 && lastRoundNumber == this.numberOfRounds) {
                    countdownPercent = this.timer*.8333;
                    this.timerLength = countdownPercent.toString()+'%';
                    this.timer = this.timer-1;
                    this.calculateTimerLength()
                }
            }, 1000)
        }
    }
}
</script>

<style>

</style>