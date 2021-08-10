<template lang="html">
    <div class="pl-collapse">
        <slot />
    </div>
</template>

<script>
import { ParentMixin } from '../../../src/assets/js/relation'

export default {
    name: 'PlCollapse',
    mixins: [ParentMixin('Collapse')],
    props: {
        // 为true时，只能同时打开一个collepse-item
        accordion: Boolean,
        value: {
            type: Array,
            default () {
                return []
            }
        },
        border: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        switch (name, expanded) {
            if (!this.accordion) {
                name = expanded
                    ? this.value.concat(name)
                    : this.value.filter(activeName => activeName !== name)
            }
            this.$emit('change', name)
            this.$emit('input', name)
        }
    }
}
</script>
