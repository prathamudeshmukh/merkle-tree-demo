
function initConstructTree(){
  var data = $('#data').val();
  var chunks = $('#chunkSize').val();
  var nodeList = convertToNodeList(getChunksFromData(data, chunks));
  var nodeTreeStructure = constructTree(nodeList)[0].toString();
  var chart_config = {
    	chart: {
    		container: "#merkle-tree",
        connectors: {
          "type":"step",
          "style": {
            "stroke-width": 2
          }
        }
    	},
    	nodeStructure: nodeTreeStructure
  };
  new Treant( chart_config );
}

function getChunksFromData(data, chunkSize) {
  var data = data.split('');
  return _.chunk(data, Math.floor(data.length / chunkSize) + 1).map(
    function(splitData){
      return splitData.join('')
    }
  )
}
