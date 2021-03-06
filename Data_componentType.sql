USE [PRY2020237-1]
GO
SET IDENTITY_INSERT [dbo].[ComponentType] ON 

INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (1, N'Text', N'{
  "component": "Text",
  "boundingBox": {
    "height": 0,
    "left": 0,
    "top": 0,
    "width": 0
  },
  "data": [
    {
      "type": "Multioption",
      "name": "TextAligment",
      "displayName": "Alineación",
      "isVisibleToUser": true,
      "options": [
        {
          "type": "Option",
          "icon": "mdi-format-align-left",
          "name": "Left",
          "value": false,
          "displayName": "Izquierda",
          "isVisibleToUser": true
        },
        {
          "type": "Option",
          "icon": "mdi-format-align-center",
          "name": "Center",
          "value": false,
          "displayName": "Centrado",
          "isVisibleToUser": true
        },
        {
          "type": "Option",
          "icon": "mdi-format-align-right",
          "name": "Right",
          "value": false,
          "displayName": "Derecho",
          "isVisibleToUser": true
        }
      ]
    },
    {
      "type": "Multioption",
      "name": "TextFormat",
      "displayName": "Fuente",
      "isVisibleToUser": true,
      "options": [
        {
          "type": "Option",
          "icon": "mdi-format-bold",
          "name": "Bold",
          "value": false,
          "displayName": "Negrita",
          "isVisibleToUser": true
        },
        {
          "type": "Option",
          "icon": "mdi-format-italic",
          "name": "Italic",
          "value": false,
          "displayName": "Cursiva",
          "isVisibleToUser": true
        },
        {
          "type": "Option",
          "icon": "mdi-format-underline",
          "name": "Underline",
          "value": false,
          "displayName": "Subrayado",
          "isVisibleToUser": true
        }
      ]
    },
    {
      "type": "Integer",
      "name": "Id",
      "value": 0,
      "displayName": "Identificador",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "DisplayName",
      "value": "Lorem Ipsum",
      "displayName": "Texto",
      "isVisibleToUser": true
    },
    {
      "type": "String",
      "name": "StyleParam",
      "value": "",
      "displayName": "Estilo",
      "isVisibleToUser": false
    },
    {
      "type": "Integer",
      "name": "FontSize",
      "value": 16,
      "displayName": "Tamaño del texto",
      "isVisibleToUser": true
    }
  ]
}', N'b8a0d14a-069c-4a67-992e-c12bb874daf0')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (2, N'Circle Image', N'{
  "component": "CircleImage",
  "boundingBox": {
    "height": 0.0,
    "left": 0.0,
    "top": 0.0,
    "width": 0.0
  },
  "data": [
    {
      "type": "Integer",
      "name": "Id",
      "value": 0,
      "displayName": "Identificador",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "Alt",
      "value": "",
      "displayName": "Texto Alternativo",
      "isVisibleToUser": true
    },
    {
      "type": "String",
      "name": "ImageType",
      "value": "rounded",
      "displayName": "Tipo de Imagen",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "StyleParam",
      "value": "",
      "displayName": "Estilo",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "Src",
      "value": "https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png",
      "displayName": "ImageUrl",
      "isVisibleToUser": true
    },
    {
      "type": "Integer",
      "name": "Width",
      "value": 100,
      "displayName": "Width(%)",
      "isVisibleToUser": true
    }
  ]
}', N'5ec9062f-82d4-4b49-b077-465644150c5d')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (3, N'Square Image', N'{
  "component": "SquareImage",
  "boundingBox": {
    "height": 0.0,
    "left": 0.0,
    "top": 0.0,
    "width": 0.0
  },
  "data": [
    {
      "type": "Integer",
      "name": "Id",
      "value": 0,
      "displayName": "Identificador",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "Alt",
      "value": "",
      "displayName": "Texto Alternativo",
      "isVisibleToUser": true
    },
    {
      "type": "String",
      "name": "ImageType",
      "value": "square",
      "displayName": "Tipo de Imagen",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "StyleParam",
      "value": "",
      "displayName": "Estilo",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "Src",
      "value": "https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png",
      "displayName": "ImageUrl",
      "isVisibleToUser": true
    },
    {
      "type": "Integer",
      "name": "Width",
      "value": 100,
      "displayName": "Width(%)",
      "isVisibleToUser": true
    }
  ]
}', N'39fad814-f490-4d5c-9a13-084ec8bf7b05')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (4, N'Input', N'{
"component": "Input",
"boundingBox": {
"height": 0.0,
"left": 0.0,
"top": 0.0,
"width": 0.0
},
"data": [
{
"type": "Integer",
"name": "Id",
"value": 0,
"displayName": "Identificador",
"isVisibleToUser": false
},
{
"type": "String",
"name": "PlaceHolder",
"value": "Lorem Ipsum",
"displayName": "PlaceHolder",
"isVisibleToUser": true
},
{
"type": "String",
"name": "StyleParam",
"value": "",
"displayName": "Estilo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Type",
"value": "",
"displayName": "Tipo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Value",
"value": "Lorem Ipsum",
"displayName": "Valor",
"isVisibleToUser": true
}
]
}', N'31da17b6-1d3e-4220-b570-27ebd10b78ea')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (5, N'Combo Box', N'{
  "component": "ComboBox",
  "boundingBox": {
    "height": 0.0,
    "left": 0.0,
    "top": 0.0,
    "width": 0.0
  },
  "data": [
    {
      "type": "Boolean",
      "name": "Disable",
      "value": false,
      "displayName": "Desactivar",
      "isVisibleToUser": true
    },
    {
      "type": "Integer",
      "name": "Id",
      "value": 0,
      "displayName": "Identificador",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "DisplayName",
      "value": "Lorem Ipsum",
      "displayName": "Texto",
      "isVisibleToUser": true
    },
    {
      "type": "String",
      "name": "Name",
      "value": "",
      "displayName": "Nombre",
      "isVisibleToUser": false
    },
    {
      "type": "Array",
      "name": "Options",
      "items": [],
      "value": "",
      "displayName": "Opciones",
      "isVisibleToUser": true
    },
    {
      "type": "String",
      "name": "StyleParam",
      "value": "",
      "displayName": "Estilo",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "Value",
      "value": "",
      "displayName": "Valor",
      "isVisibleToUser": false
    }
  ]
}', N'e6332b0a-d349-4d79-a982-4647c1b6d73d')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (6, N'Radio Button', N'{
"component": "RadioButton-Off",
"boundingBox": {
"height": 0.0,
"left": 0.0,
"top": 0.0,
"width": 0.0
},
"data": [
{
"type": "Boolean",
"name": "Checked",
"value": false,
"displayName": "Seleccionado",
"isVisibleToUser": true
},
{
"type": "Boolean",
"name": "Disable",
"value": false,
"displayName": "Desactivar",
"isVisibleToUser": true
},
{
"type": "Integer",
"name": "Id",
"value": 0,
"displayName": "Identificador",
"isVisibleToUser": false
},
{
"type": "String",
"name": "DisplayName",
"value": "Lorem Ipsum",
"displayName": "Texto",
"isVisibleToUser": true
},
{
"type": "String",
"name": "Name",
"value": "",
"displayName": "Nombre del Grupo",
"isVisibleToUser": true
},
{
"type": "String",
"name": "StyleParam",
"value": "",
"displayName": "Estilo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Type",
"value": "radio",
"displayName": "Tipo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Value",
"value": "",
"displayName": "Valor",
"isVisibleToUser": false
}
]
}', N'9bfd82cd-593d-47c2-b1b3-538e68bbf261')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (7, N'Radio Button', N'{
"component": "RadioButton-On",
"boundingBox": {
"height": 0.0,
"left": 0.0,
"top": 0.0,
"width": 0.0
},
"data": [
{
"type": "Boolean",
"name": "Checked",
"value": true,
"displayName": "Seleccionado",
"isVisibleToUser": true
},
{
"type": "Boolean",
"name": "Disable",
"value": false,
"displayName": "Desactivar",
"isVisibleToUser": true
},
{
"type": "Integer",
"name": "Id",
"value": 0,
"displayName": "Identificador",
"isVisibleToUser": false
},
{
"type": "String",
"name": "DisplayName",
"value": "Lorem Ipsum",
"displayName": "Texto",
"isVisibleToUser": true
},
{
"type": "String",
"name": "Name",
"value": "",
"displayName": "Nombre del Grupo",
"isVisibleToUser": true
},
{
"type": "String",
"name": "StyleParam",
"value": "",
"displayName": "Estilo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Type",
"value": "radio",
"displayName": "Tipo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Value",
"value": "",
"displayName": "Valor",
"isVisibleToUser": false
}
]
}', N'526c3c13-a017-411d-9527-974d296880f3')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (8, N'CheckBox', N'{
"component":"CheckBox-Off",
"boundingBox": {
"height": 0.0,
"left": 0.0,
"top": 0.0,
"width": 0.0
},
"data": [
{
"type": "Boolean",
"name": "Checked",
"value": false,
"displayName": "Marcado",
"isVisibleToUser": true
},
{
"type": "Boolean",
"name": "Disable",
"value": false,
"displayName": "Desactivar",
"isVisibleToUser": true
},
{
"type": "Integer",
"name": "Id",
"value": 0,
"displayName": "Identificador",
"isVisibleToUser": false
},
{
"type": "String",
"name": "DisplayName",
"value": "Lorem Ipsum",
"displayName": "Texto",
"isVisibleToUser": true
},
{
"type": "String",
"name": "Name",
"value": "",
"displayName": "Nombre",
"isVisibleToUser": false
},
{
"type": "String",
"name": "StyleParam",
"value": "",
"displayName": "Estilo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Type",
"value": "checkbox",
"displayName": "Tipo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Value",
"value": "",
"displayName": "Valor",
"isVisibleToUser": false
}
]
}', N'dcbbcd4f-ce9c-4953-8c7e-d1949c3a7449')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (10, N'CheckBox', N'{
"component":"CheckBox-On",
"boundingBox": {
"height": 0.0,
"left": 0.0,
"top": 0.0,
"width": 0.0
},
"data": [
{
"type": "Boolean",
"name": "Checked",
"value": true,
"displayName": "Marcado",
"isVisibleToUser": true
},
{
"type": "Boolean",
"name": "Disable",
"value": false,
"displayName": "Desactivar",
"isVisibleToUser": true
},
{
"type": "Integer",
"name": "Id",
"value": 0,
"displayName": "Identificador",
"isVisibleToUser": false
},
{
"type": "String",
"name": "DisplayName",
"value": "Lorem Ipsum",
"displayName": "Texto",
"isVisibleToUser": true
},
{
"type": "String",
"name": "Name",
"value": "",
"displayName": "Nombre",
"isVisibleToUser": false
},
{
"type": "String",
"name": "StyleParam",
"value": "",
"displayName": "Estilo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Type",
"value": "checkbox",
"displayName": "Tipo",
"isVisibleToUser": false
},
{
"type": "String",
"name": "Value",
"value": "",
"displayName": "Valor",
"isVisibleToUser": false
}
]
}
', N'fb959fd7-4508-46cf-9808-d1b14f63730d')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (11, N'Button', N'{
    "component":"Button",
    "boundingBox": {
    "height": 0.0,
        "left": 0.0,
        "top": 0.0,
        "width": 0.0
    },
    "data": [
    {
        "type": "Boolean",
        "name": "Disable",
        "value": false,
        "displayName": "Desactivar",
        "isVisibleToUser": true
    },
    {
        "type": "Link",
        "name": "Href",
        "value": "",
        "displayName": "Enlazar a",
        "isVisibleToUser": true
    },
    {
        "type": "Select",
        "name": "BtnClass",
        "options":["primary","secondary","success","danger","warning","info","light","dark","link"],
        "value": "primary",
        "displayName": "Tipo del boton",
        "isVisibleToUser": true
    },
    {
        "type": "Integer",
        "name": "Id",
        "value": 0,
        "displayName": "Identificador",
        "isVisibleToUser": false
    },
    {
        "type": "String",
        "name": "DisplayName",
        "value": "Lorem Ipsum",
        "displayName": "Texto",
        "isVisibleToUser": true
    },
    {
        "type": "String",
        "name": "Name",
        "value": "",
        "displayName": "Nombre",
        "isVisibleToUser": false
    },
    {
        "type": "String",
        "name": "StyleParam",
        "value": "",
        "displayName": "Estilo",
        "isVisibleToUser": false
    },
    {
        "type": "String",
        "name": "Type",
        "value": "Submit",
        "displayName": "Tipo",
        "isVisibleToUser": false
    },
    {
        "type": "String",
        "name": "Value",
        "value": "",
        "displayName": "Valor",
        "isVisibleToUser": false
    }
]
}', N'21458067-df86-4db8-8c01-affe1d30f7db')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (12, N'Input Number', N'{
  "component":"InputNumber",
  "boundingBox": {
    "height": 0.0,
    "left": 0.0,
    "top": 0.0,
    "width": 0.0
  },
  "data": [
    {
      "type": "Boolean",
      "name": "Disable",
      "value": false,
      "displayName": "Desactivar",
      "isVisibleToUser": true
    },
    {
      "type": "Integer",
      "name": "Id",
      "value": 0,
      "displayName": "Identificador",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "Placeholder",
      "value": "Lorem Ipsum",
      "displayName": "Placeholder",
      "isVisibleToUser": true
    },
    {
      "type": "String",
      "name": "StyleParam",
      "value": "",
      "displayName": "Estilo",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "Type",
      "value":"Number",
      "displayName": "Tipo",
      "isVisibleToUser": false
    },
    {
      "type": "Integer",
      "name": "Value",
      "value": 0,
      "displayName": "Valor",
      "isVisibleToUser": true
    }
  ]
}
', N'02690d99-4c3a-4811-9d04-977ef8f73fa5')
INSERT [dbo].[ComponentType] ([Id], [name], [atributesJson], [tagId]) VALUES (13, N'Text Area', N'{
  "component":"TextArea",
  "boundingBox": {
    "height": 0.0,
    "left": 0.0,
    "top": 0.0,
    "width": 0.0
  },
  "data": [
    {
      "type": "Boolean",
      "name": "Disable",
      "value": false,
      "displayName": "Desactivar",
      "isVisibleToUser": true
    },
    {
      "type": "String",
      "name": "Placeholder",
      "value": "Lorem Ipsum",
      "displayName": "Placeholder",
      "isVisibleToUser": true
    },
    {
      "type": "Integer",
      "name": "Id",
      "value": 0,
      "displayName": "Identificador",
      "isVisibleToUser": false
    },
    {
      "type": "Integer",
      "name": "Rows",
      "value": 2,
      "displayName": "Filas",
      "isVisibleToUser": true
    },
    {
      "type": "String",
      "name": "Text",
      "value":"Lorem Ipsum",
      "displayName": "Texto",
      "isVisibleToUser": true
    },
    {
      "type": "String",
      "name": "Name",
      "value":"",
      "displayName": "Nombre",
      "isVisibleToUser": false
    },
    {
      "type": "String",
      "name": "StyleParam",
      "value": "",
      "displayName": "Estilo",
      "isVisibleToUser": false
    }
  ]
}', N'd9726440-aa03-4ce2-b9a5-06384b47ad90')
SET IDENTITY_INSERT [dbo].[ComponentType] OFF
GO
