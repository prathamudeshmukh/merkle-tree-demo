const sha1 = require('sha1');
const _    = require('underscore');

function constructTree(listOfNodes) {
  if(listOfNodes.length === 1) return listOfNodes;
  listOfNodes = _.chunk(listOfNodes, 2);
  var allParentNodes = [];
  for (var i in listOfNodes) {
    var currentHash = null;
    var node = null;
    if(listOfNodes[i].length < 2) {
      currentHash = listOfNodes[i][0].hash;
      node = new Node(currentHash, listOfNodes[i][0]);
    } else {
      currentHash = getParentNodeHash(listOfNodes[i][0].hash, listOfNodes[i][1].hash);
      node = new Node(currentHash, listOfNodes[i][0], listOfNodes[i][1]);
    }
    allParentNodes.push(node);
  }
  return constructTree(allParentNodes);
}

function getParentNodeHash(hash1, hash2) {
    return sha1(hash1 + hash2);
}

function convertToNodeList(dataChunkList) {
  var nodeList = [];
  for (var i in dataChunkList) {
    nodeList.push(new Node(sha1(dataChunkList[i])));
  }
  return nodeList;
}
/**
{
  "name": "Top Level",
  "parent": "null",
  "children": [
    {
      "name": "Level 2: A",
      "parent": "Top Level",
      "children": [
        {
          "name": "Son of A",
          "parent": "Level 2: A"
        },
        {
          "name": "Daughter of A",
          "parent": "Level 2: A"
        }
      ]
    },
    {
      "name": "Level 2: B",
      "parent": "Top Level"
    }
  ]
}
**/
function Node (hash, leftNode, rightNode) {
    this.hash = hash;
    this.leftNode = leftNode;
    this.rightNode = rightNode;

    this.toString = function() {
        console.log("***");
      if(this.leftNode || this.rightNode) {
        return {
          name: this.hash.substr(0, 6),
          parent: "null",
          children: [
            this.leftNode ? this.leftNode.toString() : "",
            this.rightNode ? this.rightNode.toString() : ""
          ]
        };
      }
      return {
        name: this.hash.substr(0, 6),
        parent: "null",
      };
    }
}
///////////////////Test/////////////////////////////////////////////////////////
var testData = ['a','b','c','d','e','f','g','h'];
var nodeList = convertToNodeList(testData);
console.log(JSON.stringify(constructTree(nodeList)[0].toString()));
