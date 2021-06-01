import ButtonComponentTemplate from "@/views/ComponentsTemplate/ButtonComponentTemplate";
import InputComponentTemplate from "@/views/ComponentsTemplate/InputComponentTemplate";
import CheckComponentTemplate from "@/views/ComponentsTemplate/CheckComponentTemplate";
import RadioComponentTemplate from "@/views/ComponentsTemplate/RadioComponentTemplate";
import SelectComponentTemplate from "@/views/ComponentsTemplate/SelectComponentTemplate";
import ImageComponentTemplate from "@/views/ComponentsTemplate/ImageComponentTemplate";
import TextComponentTemplate from "@/views/ComponentsTemplate/TextComponentTemplate";
import TextAreaComponentTemplate from "@/views/ComponentsTemplate/TextAreaComponentTemplate";
import EditPageSidebarMenu from "@/views/EditPage/SidebarMenu";

import axios from "axios";
import RenderHTMLSection from "@/views/Page/RenderHTMLSection";

/*Variables*/
import { LocalizationES } from "@/Entities/LocalizationES";
import { RowsController } from "../../utils/EditPageEntities/RowsController";
import { Tree } from "../../utils/EditPageEntities/Tree";

export default {
  props: ["PageViewId"],
  name: "Edit Page",
  namePageView: "",
  components: {
    ButtonComponentTemplate,
    CheckComponentTemplate,
    InputComponentTemplate,
    RadioComponentTemplate,
    SelectComponentTemplate,
    ImageComponentTemplate,
    TextComponentTemplate,
    TextAreaComponentTemplate,
    RenderHTMLSection,
    EditPageSidebarMenu,
  },
  computed: {
    /* obtener el nombre del proyecto */
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || "Wire2Web - Edit Your Webpage";
      },
    },
  },
  data: () => ({
    otherViewsName: ["", "Option 1", "Option 2"],
    drawer: null,
    nameRules: [
      (v) => !!v || "El nombre es requerido",
      (v) =>
        (v && v.length <= 15) ||
        "El nombre de la vista debe contener máximo 15 caracteres",
      (v) => (v || "").indexOf(" ") < 0 || "No se permiten espacios",
    ],
    componentDetectedArray: [],
    tokenDataTrue: "",
    componentsDetected: {
      id: "",
      name: "",
      description: "",
      createDate: "",
      modifyDate: "",
      imgUrl: "",
      isPrincipal: false,
      componentDetectedJson: "",
      htmlUrl: "",
      projectId: 0,
    },
    customVisionArray: [],
    attributesDetected: {
      id: "",
      name: "",
      attributesJson: "",
      PageViewId: 0,
      componentTypeId: 0,
    },
    componentSelected: {},
    attributesJson: {
      component: "",
      data: [],
    },
    loading: true,
    rowsController: RowsController,
    tree: Tree,
    editableState: false,
    componentDataDictionary: [],
    loadingSaveTemplate: false,
    nameTmp: "",
    activeEdit: false,
    pageViewId: 0,
    newValueCombo: "",
    notTroll: false,
  }),
  async created() {
    this.loading = true;
    try {
      await this.GetPageView();
      await this.GetComponentsDetected();
      this.NamePageView();
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  },

  mounted() {
    document.title = "Wire2Web - Editar wireframe";
  },
  methods: {
    /*Primeras solicitudes*/
    /*Obtener las paginas del mismo proyecto*/
    NamePageView() {
      let objeto = this.componentsDetected;
      this.namePageView = objeto["name"];
      this.nameTmp = objeto["name"];
      return this.namePageView;
    },
    ObtenerOtrasVistas() {
      let me = this;

      if (localStorage.getItem("tokenDataTrue") != null) {
        me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
      }

      axios
        .get("api/PageView/project/" + me.componentsDetected.projectId, {
          headers: {
            Authorization: "Bearer " + me.tokenDataTrue,
          },
        })
        .then(function(response) {
          const listaTodasLasVistas = response.data;
          const listaVistasFiltered = listaTodasLasVistas.filter(
            (vista) => vista.id != me.PageViewId
          );
          var listaVistaNombres = listaVistasFiltered.map(function(item) {
            return item["name"] + ".html";
          });
          me.otherViewsName = listaVistaNombres;
        })
        .catch(function(error) {
          if (error.response.status == 401) {
            me.$swal
              .fire({
                title: "Necesita autenticarse!!",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  window.location = "/login";
                }
              });
            /*   alert("Necesita autenticarse!!") */
          }
        });
    },

    AlmacenarHtmlBlob() {
      let me = this;
      var content = String(me.GetHTMLContent().innerHTML);
      var fileName = [
        String(me.componentsDetected.projectId),
        String(me.componentsDetected.id),
        "html",
        String(me.namePageView) + ".html",
      ].join("/");

      if (localStorage.getItem("tokenDataTrue") != null) {
        me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
      }
      return axios.post(
        "blobs/uploadfile",
        {
          content: content,
          fileName: fileName,
        },
        {
          headers: {
            Authorization: "Bearer " + me.tokenDataTrue,
          },
        }
      );
    },

    UploadPageView(htmlURl) {
      let me = this;

      if (localStorage.getItem("tokenDataTrue") != null) {
        me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
      }

      return axios.put(
        "api/PageView",
        {
          id: parseInt(me.componentsDetected.id),
          name: this.namePageView,
          description: me.componentsDetected.description,
          modifyDate: new Date(),
          imgUrl: me.componentsDetected.imgUrl,
          componentDetectedJson: me.componentsDetected.componentDetectedJson,
          htmlUrl: htmlURl,
          isPrincipal: me.componentsDetected.isPrincipal,
          jsonTree: JSON.stringify(me.tree),
          projectId: parseInt(me.componentsDetected.projectId),
        },
        {
          headers: {
            Authorization: "Bearer " + me.tokenDataTrue,
          },
        }
      );
    },
    setActiveEdit() {
      this.activeEdit = !this.activeEdit;
      if (this.activeEdit == false) {
        this.notTroll = false;
        this.namePageView = this.nameTmp;
      }
    },
    saveNewName() {
      if (this.$refs.form.validate()) {
        let me = this;
        me.notTroll = true;
        if (localStorage.getItem("tokenDataTrue") != null) {
          me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
        }

        axios
          .post(
            "api/PageView/check",
            {
              idProject: parseInt(me.componentsDetected.projectId),
              nName: me.namePageView,
            },
            {
              headers: {
                Authorization: "Bearer " + me.tokenDataTrue,
              },
            }
          )
          .then(function(response) {
            if (response.data == true) {
              me.activeEdit = false;
            } else {
              alert("El nombre del pageView ya existe");
            }
          })
          .catch(function(error) {});
      }
    },
    SaveEdition() {
      let me = this;
      let promises = [];
      me.loadingSaveTemplate = true;
      if (localStorage.getItem("tokenDataTrue") != null) {
        me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
      }
      for (let component of me.componentDetectedArray) {
        var promise = axios
          .put(
            "api/Component",
            {
              id: parseInt(component.id),
              attributesJson: JSON.stringify(component.attributesJson),
              componentTypeId: parseInt(component.componentTypeId),
              pageViewId: parseInt(component.pageViewId),
            },
            {
              headers: {
                Authorization: "Bearer " + me.tokenDataTrue,
              },
            }
          )
          .then(function(response) {
            return true;
          })
          .catch(function(error) {
            return false;
          });
        promises.push(promise);
      }
      //Guardar todos los componentes
      Promise.all(promises).then(function(results) {
        var result = results.every((x) => x);
        //Si todos estan bien
        if (result) {
          //Subir Hmtl al Blob
          var hmlUrl = me.AlmacenarHtmlBlob();
          hmlUrl
            .then(function(response) {
              //Actualizar Url del PageView
              var UpdatePageView = me.UploadPageView(response.data);
              UpdatePageView.then(function(response) {
                me.$swal
                  .fire({
                    icon: "success",
                    title: "Su pagina web se almacenó correctamente",
                    confirmButtonText: "OK",
                  })
                  .then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    me.loadingSaveTemplate = false;
                    if (result.isConfirmed) {
                      window.history.back();
                      /*  window.location.reload(); */
                    }
                  });
              }).catch(function(error) {
                me.$swal.fire({
                  icon: "warning",
                  title: "Hubo un error al guardar, intentelo nuevamente",
                  showConfirmButton: false,
                  timer: 2000,
                });
                /*  alert("Hubo un error al guardar, intentelo nuevamente"); */
              });
            })
            .catch(function(error) {
              me.$swal.fire({
                icon: "warning",
                title: "Hubo un error al guardar, intentelo nuevamente",
                showConfirmButton: false,
                timer: 2000,
              });
            });
        } else {
          me.$swal.fire({
            icon: "warning",
            title: "Hubo un error al guardar, intentelo nuevamente",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    },

    download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },

    GetHTMLContent() {
      var content = document.getElementById("HTMLRenderSection");
      var contentJson = {
        value:
          '<!DOCTYPE html><html lang="en"> <head> <meta name="viewport" content="width=device-width" /> <title>Wire2Web</title> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"> </head> <body> <div class="container body-content"> <div id="container" class="container"> </div> </div> </body> </html>',
      };
      var htmlObject = document.createElement("div");
      htmlObject.innerHTML = contentJson.value;
      htmlObject.getElementsByClassName("container").item(0).innerHTML =
        content.innerHTML;
      return htmlObject;
    },

    downloadHTMLBody() {
      var me = this;
      var fullHtml = this.GetHTMLContent();
      var fileName = me.componentsDetected.name + ".html";
      //htmlObject.getElementById("container").innerHTML=content.innerHTML;
      this.download(fileName, fullHtml.innerHTML);
    },

    GetPageView() {
      let me = this;
      let url = "api/PageView/" + me.PageViewId;

      if (localStorage.getItem("tokenDataTrue") != null) {
        me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
      }
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + me.tokenDataTrue,
          },
        })
        .then(function(response) {
          var array = [];
          me.componentsDetected = response.data;
          me.customVisionArray = JSON.parse(
            me.componentsDetected.componentDetectedJson
          );
          /*Obtener Listado de las otras vistas*/
          me.ObtenerOtrasVistas();
          me.tree = JSON.parse(response.data.jsonTree);
        })
        .catch(function(error) {});
    },

    async GetComponentsDetected() {
      let me = this;
      let url = "api/Component/pageview/" + me.PageViewId;

      if (localStorage.getItem("tokenDataTrue") != null) {
        me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
      }

      await axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + me.tokenDataTrue,
          },
        })
        .then(function(response) {
          me.componentDetectedArray = response.data;
        })
        .catch(function(error) {})
        .finally(async function() {
          var componentsType = [];
          await axios
            .get("api/ComponentType", {
              headers: {
                Authorization: "Bearer " + me.tokenDataTrue,
              },
            })
            .then(function(response) {
              componentsType = response.data;
              me.componentDataDictionary = response.data;
            })
            .catch(function(error) {})
            .finally(function() {
              for (const index in me.componentDetectedArray) {
                me.componentDetectedArray[index].attributesJson = JSON.parse(
                  me.componentDetectedArray[index].attributesJson.toString()
                );
                var componentType = {
                  id: "",
                  atributesJson: "",
                  name: "",
                  tagId: "",
                };
                componentType = componentsType.find((obj) => {
                  return (
                    obj.id === me.componentDetectedArray[index].componentTypeId
                  );
                });

                me.componentDetectedArray[index].componentType = componentType;
              }
              me.componentDetectedArray.sort(function(itemA, itemB) {
                let result1 = itemA.componentType.name;
                let result2 = itemB.componentType.name;

                const primeraPalabra =
                  LocalizationES[result1.replace(/\s+/g, "")];
                const segundaPalabra =
                  LocalizationES[result2.replace(/\s+/g, "")];

                if (primeraPalabra > segundaPalabra) {
                  return 1;
                }
                if (primeraPalabra < segundaPalabra) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });
            });
        });
    },

    ClicInComponent(action) {
      if (action.id === this.componentSelected.id) {
        this.componentSelected = {};
        this.attributesJson = {};
        return;
      }
      this.componentSelected = action;
      this.attributesJson = action.attributesJson;
    },

    menuActionClick(title, value) {
      this.title = title;
      this.componentDetail = value;
    },

    goBack() {
      let me = this;
      me.$swal
        .fire({
          title: "¿Estás seguro de cancelar los cambios realizados?",
          text: "¡No podrás recuperar tus cambios!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            window.history.back();
          }
        });
    },

    selectComponent(mode) {
      document
        .getElementById(`${mode.uuid}-component`)
        .parentNode.parentNode.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      this.ClicInComponent(mode.element);
    },

    GetTextInSpanish(text) {
      let nameCleaned = text.replace(/\s+/g, "");
      const result = LocalizationES[nameCleaned];
      if (result == null) {
        return text;
      }
      return result;
    },

    addComponents() {
      this.editableState = !this.editableState;
    },

    deleteOption(list, option) {
      var indexOf = list.indexOf(data.item);
      list.splice(indexOf, indexOf);
    },
  },
};
