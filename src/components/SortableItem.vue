<template>
    <ul class="list">
      <slot />
    </ul>
</template>
<script>
import { ContainerMixin, ElementMixin } from 'vue-slicksort';
export default {
    name:"SortableList",
    mixins: [ContainerMixin],
}
</script>
<style>

</style>