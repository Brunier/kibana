
// Requisita o CSS
require('plugins/bubble_vis/bubble_vis.css');

// Requisita o controller
require('plugins/bubble_vis/bubble_vis_controller');

	// Carrega o TemplateVisType
var module = require('ui/modules').get('bubble_vis');

// Retorna o objeto do plugin
function BubbleProvider(Private) {
	var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
	var Schemas = Private(require('ui/Vis/Schemas'));

	// Describe our visualization
	return new TemplateVisType({
		name: 'bubble_vis', //Nome usado dentro do kibana
		title: 'Bubble', // Nome mostrado no wizard do kibana
		icon: 'fa-circle',
		description: 'Gera um grafico em bolhas',
		requiresSearch: false,
		template: require('plugins/bubble_vis/bubble_vis.html'), // Carrega o template (html)
	 // Define os schemas
		schemas: new Schemas([
				{
					group: 'metrics',
					name: 'tagsize',
					title: 'Contador',
					min: 1,
					max: 1,
					aggFilter: ['count', 'avg', 'sum', 'min', 'max']
				},
				{
					group: 'buckets',
					name: 'tags',
					title: 'Separador',
					min: 1,
					max: 1,
					aggFilter: '!geohash_grid'
				}
			])
	});
}

require('ui/registry/vis_types').register(BubbleProvider);
