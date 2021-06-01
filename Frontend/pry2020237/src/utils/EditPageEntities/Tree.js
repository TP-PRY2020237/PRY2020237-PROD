import { Node } from "./Node";
export class Tree {
  root;
  elements;
  maxWidth = 12;
  parentNodeFound;
  constructor(elements = [], root = null) {
    this.elements = elements;
    if (root === null) {
      this.root = new Node("root", [], null);
      this.insertNodes();
      this.ungroup();
      this.balance();
      this.setWidthParentNodes(this.root);
      this.setLevelsValueToNodes(this.root);
    } else {
      this.root = root;
    }
  }

  insertNodes() {
    this.elements.forEach((element) => {
      const newNode = new Node("Element", [], element);
      this.root.childrens.push(newNode);
    });
  }

  ungroup() {
    this.root.childrens.forEach((child) => {
      if (child.element.elementsHTML.length > 0) {
        child.type = "Row";
        child.childrens = [...this.groupNodes(child.element.elementsHTML)];
        child.element = null;
      } else {
        this.convertNodeToElement(child);
      }
    });
  }

  balance() {
    this.find(this.root);
  }

  findCloseElements(node) {
    node.childrens.forEach((j, idx) => {
      const nodeTarget = j;

      nodeTarget.leftLevel = idx;
      let tmp = [];
      node.childrens.forEach((g, i) => {
        if (this.isNodeValidToEvaluate(g, nodeTarget)) {
          const leftTarget = nodeTarget.element.attributesJson.boundingBox.left;
          const leftNode = g.element.attributesJson.boundingBox.left;

          if (Math.abs(leftTarget - leftNode) < 0.04) {
            g.isAlign = true;
            g.leftLevel = i;
            tmp.push(g);
          }
        }
      });
      if (this.isFoundCoincidence(tmp)) {
        nodeTarget.isAlign = true;

        tmp.push(nodeTarget);
        this.orderByTop(tmp);
        const newNodeContainer = new Node("Column", [...tmp], null, true);

        node.childrens[tmp[0].leftLevel] = newNodeContainer;

        const excludeNodes = (element) => {
          return !tmp.some((n) => n.uuid === element.uuid);
        };

        node.childrens = node.childrens.filter(excludeNodes);
      }
    });
  }

  orderByTop(array) {
    array.sort((a, b) =>
      a.element.attributesJson.boundingBox.top >
      b.element.attributesJson.boundingBox.top
        ? 1
        : -1
    );
  }
  orderByLeft(ar) {
    ar.sort((a, b) =>
      a.element.attributesJson.boundingBox.left >
      b.element.attributesJson.boundingBox.left
        ? 1
        : -1
    );
  }

  isFoundCoincidence(tmp) {
    return tmp.length > 0;
  }

  isNodeValidToEvaluate(node, current) {
    return current !== node && !current.isAlign && node.element !== null;
  }

  find(node) {
    if (node.childrens.length > 0) {
      node.childrens.forEach((e, i) => {
        if (e.type === "Row") {
          this.findCloseElements(e);
        } else if (e.type === "Element") {
          const RowElement = new Node("Row", [e], null);
          node.childrens[i] = RowElement;
        }
        this.find(e);
      });
    } else {
      return;
    }
  }

  setLevelValueToChildrens(node) {
    node.childrens.forEach((child) => {
      child.level = node.level + 1;
    });
  }
  setLevelsValueToNodes(node) {
    if (node.childrens.length > 0) {
      node.childrens.forEach((child) => {
        if (child.level === null) {
          child.level = 1;
        }
        this.setLevelValueToChildrens(child);
        this.setLevelsValueToNodes(child);
      });
    } else {
      return;
    }
  }

  setWidthParentNodes(node) {
    if (node.childrens.length > 0) {
      node.childrens.forEach((child) => {
        if (child.width === null) {
          child.width = 12;
        }

        const totalChildrens = child.childrens.length;
        if (child.type === "Column") {
          this.setWidthChildElements(child, this.maxWidth);
        } else {
          this.setWidthChildElements(child, this.maxWidth / totalChildrens);
        }
        this.setWidthParentNodes(child);
      });
    } else {
      return;
    }
  }

  setWidthChildElements(node, width) {
    node.childrens.forEach((child) => {
      child.width = width;
    });
  }

  groupNodes(nodes) {
    let newNodes = [];

    nodes.forEach((e) => {
      const node = new Node("Element", [], e);
      newNodes.push(node);
    });
    return newNodes;
  }

  convertNodeToElement(node) {
    node.element = node.element.elementsHTML[0];
    node.childrens = [];
    node.type = "Element";
  }

  insertElement(node) {
    //console.log(node)
  }

  findNode(nodeTarget) {
    return this.search(this.root, nodeTarget);
  }

  findParentNode(root = this.root, nodeTarget) {
    this.parentNodeFound = null;
    this.searchParent(root, nodeTarget);
    return this.parentNodeFound;
  }

  removeElementFromTree(root = this.root, element) {
    const parentNode = this.findParentNode(root, element);
    //console.log("Parent ",parentNode.uuid)
    const parentParentNode = this.findParentNode(root, parentNode);
    //console.log("Paren parent ", parentParentNode.uuid)

    parentParentNode.childrens = parentParentNode.childrens.filter(
      (node) => node.uuid !== parentNode.uuid
    );
    //console.log("ParentNode new", parentParentNode.childrens)
    return this;
  }

  searchParent(parentNode, nodeTarget) {
    for (let i = 0; i < parentNode.childrens.length; ++i) {
      const currentNode = parentNode.childrens[i];
      if (currentNode.uuid === nodeTarget.uuid) {
        this.parentNodeFound = parentNode;
        break;
      }
      this.searchParent(currentNode, nodeTarget);
    }
  }

  search(child, nodeTarget) {
    for (let i = 0; i < child.childrens.length; ++i) {
      const currentNode = child.childrens[i];
      const coincidence = currentNode.uuid === nodeTarget.uuid;
      if (coincidence) {
        return t;
      }
      this.search(currentNode, nodeTarget);
    }
  }
}
