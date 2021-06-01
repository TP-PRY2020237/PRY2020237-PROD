export default {
    name: 'Wireframe-Guide',
    components: {
    },
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = to.meta.title || 'Wire2Web - Wireframe Guide';
            }
        },
    },
}