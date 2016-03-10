// Cria o modulo do angular para o plugin
var module = require('ui/modules').get('bubble_vis');



module.controller('BubbleController', function($scope, Private) {

	$scope.$watch('esResponse', function(resp) {
		if (!resp) {
			$scope.tags = null;
			return;
		}

		var tagsAggId = $scope.vis.aggs.bySchemaName['tags'][0].id;
		var metricsAgg = $scope.vis.aggs.bySchemaName['tagsize'][0];
		var buckets = resp.aggregations[tagsAggId].buckets;

		var min = Number.MAX_VALUE,
			max = - Number.MAX_VALUE;

		$scope.tags = buckets.map(function(bucket) {
			var value = metricsAgg.getValue(bucket);
			min = Math.min(min, value);
			max = Math.max(max, value);
			return {
				label: bucket.key,
				value: value
			};
		});

		// Adiciona os parametros para ser utilizado na view (bubble_vis.html)
		$scope.tags = $scope.tags.map(function(tag) {
			var size = ((tag.value - min) / (max - min) * 100) + 100;
			tag.bubbleSize = size;
			tag.labelSize = size * 0.12;
			tag.bubbleColor = generateColor();
			tag.labelName = tag.label.slice(0,14); //Pegar somente os 15 primeiros caractéres
			tag.tooltip = tag.label + " " + tag.value;

			return tag;
		});
	});
});

//Gera um hexadecimal para cor aleatória
function generateColor() {
		var colorGenerate = '#';
    var hexadecimal = '0123456789ABCDEF'.split('');

    for (var i = 0; i < 6; i++ ) {
        colorGenerate += hexadecimal[Math.floor(Math.random() * 16)];
    }

    return colorGenerate;
}
