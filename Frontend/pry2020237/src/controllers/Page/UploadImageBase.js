import Stepper from '@/views/Page/Stepper'
import LoadingView from '@/views/Page/loadingView'


export default {
    props: {
        PageViewId: {
            type: String
        },
    },
    name: 'Upload-Image',
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = to.meta.title || 'Wire2Web - Upload Your Wireframe';
            }
        },
    },
    components: {
        Stepper,
        LoadingView
    },

}