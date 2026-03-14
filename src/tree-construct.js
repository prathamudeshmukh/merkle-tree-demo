import { sha1 } from 'js-sha1';

const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

class Node {
  constructor(hash, leftNode = null, rightNode = null) {
    this.hash = hash;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
    this.isRoot = false;
  }

  toString() {
    if (this.leftNode || this.rightNode) {
      const children = [];
      if (this.leftNode) children.push(this.leftNode.toString());
      if (this.rightNode) children.push(this.rightNode.toString());
      return {
        text: { name: this.hash.substr(0, 6) },
        HTMLclass: this.isRoot ? 'root-node' : 'parent-node',
        children,
      };
    }
    return {
      text: { name: this.hash.substr(0, 6) },
      HTMLclass: 'leaf-node',
    };
  }
}

const getParentNodeHash = (hash1, hash2) => sha1(hash1 + hash2);

const convertToNodeList = (dataChunkList) =>
  dataChunkList.map((data) => new Node(sha1(data)));

const constructTree = (listOfNodes) => {
  if (listOfNodes.length === 1) {
    listOfNodes[0].isRoot = true;
    return listOfNodes;
  }

  const pairs = chunk(listOfNodes, 2);
  const parentNodes = pairs.map(([left, right]) => {
    if (!right) {
      return new Node(left.hash, left);
    }
    return new Node(getParentNodeHash(left.hash, right.hash), left, right);
  });

  return constructTree(parentNodes);
};

export { Node, constructTree, convertToNodeList, getParentNodeHash };
