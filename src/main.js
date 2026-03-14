import { convertToNodeList, constructTree } from './tree-construct.js';

const getChunksFromData = (data, chunkSize) => {
  const chars = data.split('');
  const effectiveSize = Math.floor(chars.length / chunkSize) + 1;
  const chunks = [];
  for (let i = 0; i < chars.length; i += effectiveSize) {
    chunks.push(chars.slice(i, i + effectiveSize).join(''));
  }
  return chunks;
};

const initConstructTree = () => {
  const data = document.querySelector('#data').value;
  const chunkSize = document.querySelector('#chunkSize').value;
  const nodeList = convertToNodeList(getChunksFromData(data, chunkSize));
  const nodeTreeStructure = constructTree(nodeList)[0].toString();
  const chartConfig = {
    chart: {
      container: '#merkle-tree',
      connectors: {
        type: 'step',
        style: { 'stroke-width': 2 },
      },
    },
    nodeStructure: nodeTreeStructure,
  };
  new window.Treant(chartConfig);
};

// Bridge ES module scope to the onclick attribute in index.html
window.initConstructTree = initConstructTree;
