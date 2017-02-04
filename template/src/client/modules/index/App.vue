<template>
    <div id="app">
        request uri params: {{params}}
    </div>
</template>
<script>
import common from 'components/common';

export default {
    name: 'app',
    data: function() {
        return {
            params: common.params
        };
    }
};
</script>
