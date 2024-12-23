<template>
    <div class="stepper-wrapper">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="stepper-item"
      >
        <div 
          class="step-counter"
          :class="{ 'active': currentStep >= index + 1 }"
        >
          {{ index + 1 }}
        </div>
        <div class="step-name">{{ step }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StepIndicator',
    props: {
      currentStep: {
        type: Number,
        default: 1,
        validator: (value) => value > 0
      },
      steps: {
        type: Array,
        default: () => ['日期時段', '繳費方式', '預約完成']
      }
    }
  }
  </script>
  
  <style scoped>
  .stepper-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 600px;
    margin: 40px auto;
    font-family: Arial, sans-serif;
  }
  
  .stepper-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
  }
  
  .step-counter {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgb(249, 249, 249);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #646464;
    font-size: 28px;
    position: relative;
    z-index: 2;
    transition: background-color 0.3s ease;
  }
  
  .step-counter.active {
    background: #ffc9b5;
    color: #1d1d1d;
  }
  
  .step-name {
    margin-top: 10px;
    font-size: 17px;
    color: #333;
  }
  
  .stepper-item:not(:last-child)::after {
    content: "";
    position: absolute;
    right: calc(-50% + 40px);
    top: 20px;
    width: calc(100% - 80px);
    height: 2px;
    background: #ccc;
    z-index: 1;
  }
  </style>