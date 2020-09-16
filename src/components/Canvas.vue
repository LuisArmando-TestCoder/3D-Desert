<template>
  <div>
    <canvas contenteditable="true" tabindex="0"></canvas>
  </div>
</template>

<script>
import renderScene from '../scene/renderScene';

export default {
  name: 'Canvas',
  mounted: renderScene,
};
</script>

<style scoped>
canvas {
  display: block;
  cursor: pointer;
}
</style>
