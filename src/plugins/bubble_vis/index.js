module.exports = function(kibana) {
	//Retorna um novo plugin do Kibana
	return new kibana.Plugin({
		uiExports: {
			// Registra a nova visualização
			visTypes: [
				'plugins/bubble_vis/bubble_vis'
			]
		}
	});
};
