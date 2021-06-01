import NodeComponent from "@/views/ComponentsTemplate/NodeComponent";
export default {
  name: "RenderHTMLSection",
  props: {
    componentSelected: {},
    tree: {},
  },

  components: {
    NodeComponent,
  },
  data: () => ({
    width: 0.0,
    height: 700,
  }),

  methods: {
    async getRenderHTMLSize() {
      var HTMLContent = document.getElementById("HTMLRenderSection");
      this.width = HTMLContent.offsetWidth;
    },
    id(child) {
      return `${child.uuid}-component`;
    },
  },
};
