/**
* Parametros - Tipo Estado Civil
*/
App.views.ParametrosTipoEstadoCivilView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		
		this.collection = new App.collections.TipoEstadoCivil();
		this.collection.fetch();

		this.collection.on("sync", this.render, this);

		this.template = _.template($("#template_ParametrosTipoEstadoCivilView").html());

		/*this.render();*/
			
	}, 

	render: function() {
		var self=this;

		this.$el.html(this.template());
		this.collection.each(function(item) {
			var itemView = new App.views.ParametrosTipoEstadoCivilItemView({model:item})
			self.$el.find(".select.options").append(itemView.render().$el);
		})

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}



});

/**
* @class ParametrosTipoEstadoCivilItemView 
*/
App.views.ParametrosTipoEstadoCivilItemView = Backbone.View.extend({
	tagName: "option",

	initialize: function() {
		var self = this;
		this.template = _.template($("#template_ParametrosTipoEstadoCivilItemView").html());
		this.render();
	}, 

	render: function() {
		var self=this;
		var data = this.model.toJSON();

		this.$el.html(this.template(data));
		this.$el.attr("value", data.cod);

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}

});


/**
* Parametros - Prevision
*/
App.views.ParametrosPrevisionView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		
		this.collection = new App.collections.Prevision();
		this.collection.fetch();

		this.collection.on("sync", this.render, this);

		this.template = _.template($("#template_ParametrosPrevisionView").html());
			
	}, 

	render: function() {
		var self=this;

		this.$el.html(this.template());
		this.collection.each(function(item) {
			var itemView = new App.views.ParametrosPrevisionItemView({model:item})
			self.$el.find(".select.options").append(itemView.render().$el);
		})

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}



});

/**
* @class ParametrosPrevisionItemView
*/
App.views.ParametrosPrevisionItemView = Backbone.View.extend({
	tagName: "option",

	initialize: function() {
		var self = this;
		this.template = _.template($("#template_ParametrosPrevisionItemView").html());
		this.render();
	}, 

	render: function() {
		var self=this;
		var data = this.model.toJSON();

		this.$el.html(this.template(data));
		this.$el.attr("value", data.cod);

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}

});


/**
* Parametros - Escolaridad
*/
App.views.ParametrosEscolaridadView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		
		this.collection = new App.collections.Escolaridad();
		this.collection.fetch();

		this.collection.on("sync", this.render, this);

		this.template = _.template($("#template_ParametrosEscolaridadView").html());
			
	}, 

	render: function() {
		var self=this;

		this.$el.html(this.template());
		this.collection.each(function(item) {
			var itemView = new App.views.ParametrosEscolaridadItemView({model:item})
			self.$el.find(".select.options").append(itemView.render().$el);
		})

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}



});

/**
* @class ParametrosEscolaridadItemView
*/
App.views.ParametrosEscolaridadItemView = Backbone.View.extend({
	tagName: "option",

	initialize: function() {
		var self = this;
		this.template = _.template($("#template_ParametrosEscolaridadItemView").html());
		this.render();
	}, 

	render: function() {
		var self=this;
		var data = this.model.toJSON();

		this.$el.html(this.template(data));
		this.$el.attr("value", data.cod);

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}

});



/**
* Parametros - ActividadLaboral
*/
App.views.ParametrosActividadLaboralView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		
		this.collection = new App.collections.ActividadLaboral();
		this.collection.fetch();

		this.collection.on("sync", this.render, this);

		this.template = _.template($("#template_ParametrosActividadLaboralView").html());
			
	}, 

	render: function() {
		var self=this;

		this.$el.html(this.template());
		this.collection.each(function(item) {
			var itemView = new App.views.ParametrosActividadLaboralItemView({model:item})
			self.$el.find(".select.options").append(itemView.render().$el);
		})

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}



});

/**
* @class ParametrosActividadLaboralItemView
*/
App.views.ParametrosActividadLaboralItemView = Backbone.View.extend({
	tagName: "option",

	initialize: function() {
		var self = this;
		this.template = _.template($("#template_ParametrosActividadLaboralItemView").html());
		this.render();
	}, 

	render: function() {
		var self=this;
		var data = this.model.toJSON();

		this.$el.html(this.template(data));
		this.$el.attr("value", data.id);

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}

});



/**
* Parametros - SubtipoServicio
*/
App.views.ParametrosSubtipoServicioView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		
		this.collection = new App.collections.SubtipoServicio();
		this.collection.fetch();

		this.collection.on("sync", this.render, this);

		this.template = _.template($("#template_ParametrosSubtipoServicioView").html());
			
	}, 

	render: function() {
		var self=this;

		this.$el.html(this.template());
		this.collection.each(function(item) {
			var itemView = new App.views.ParametrosSubtipoServicioItemView({model:item})
			self.$(".select.options").append(itemView.render().$el);
		})

		return this;
	},

	setSelectedOption: function(option){
		this.$(".select.options").attr("value", option)
	},

	close: function() {
		this.remove();
		this.unbind();
	}



});

/**
* @class ParametrosSubtipoServicioItemView
*/
App.views.ParametrosSubtipoServicioItemView = Backbone.View.extend({
	tagName: "option",

	initialize: function() {
		var self = this;
		this.template = _.template($("#template_ParametrosSubtipoServicioItemView").html());
		this.render();
	}, 

	render: function() {
		var self=this;
		var data = this.model.toJSON();

		this.$el.html(this.template(data));
		this.$el.attr("value", data.id);

		return this;
	},


	close: function() {
		this.remove();
		this.unbind();
	}

});




/**
* Parametros - EstadoSolicitud
*/
App.views.ParametrosEstadoSolicitudView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		
		this.collection = new App.collections.EstadoSolicitud();
		this.collection.fetch();

		this.collection.on("sync", this.render, this);

		this.template = _.template($("#template_ParametrosEstadoSolicitudView").html());
			
	}, 

	render: function() {
		var self=this;

		this.$el.html(this.template());
		this.collection.each(function(item) {
			var itemView = new App.views.ParametrosEstadoSolicitudItemView({model:item})
			self.$(".select.options").append(itemView.render().$el);
		})

		return this;
	},

	setSelectedOption: function(option){
		this.$(".select.options").attr("value", option)
	},

	close: function() {
		this.remove();
		this.unbind();
	}



});

/**
* @class ParametrosEstadoSolicitudItemView
*/
App.views.ParametrosEstadoSolicitudItemView = Backbone.View.extend({
	tagName: "option",

	initialize: function() {
		var self = this;
		this.template = _.template($("#template_ParametrosEstadoSolicitudItemView").html());
		this.render();
	}, 

	render: function() {
		var self=this;
		var data = this.model.toJSON();

		this.$el.html(this.template(data));
		this.$el.attr("value", data.id);

		return this;
	},


	close: function() {
		this.remove();
		this.unbind();
	}

});