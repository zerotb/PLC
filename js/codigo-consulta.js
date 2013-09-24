App.views.ConsultaMainView = Backbone.View.extend({

	/**
	* @class ConsultaMainView vista principal para administración de personas
	*
	* @augments Backbone.View
	* @constructs
	*
	* @param {object} options parametros de incializacion
	* @param {string} options.el Identificador de elemento en DOM donde se despliegau la vista
	* @param {string} options.collection Colección (personas) utilizada en la administración de personas
	* 
	* AdminPersonaMainView Construye las distintas vistas que administran el listado,
	* actualización, eliminación y creación de personas
	*/
	initialize: function() {
		var self = this;

		this.template = _.template($("#template_ConsultaMainView").html());
		
		this.render();


		// Header View
		this.personaBuscada = new App.models.Persona({rut:""}); // Persona nueva con rut vacío

		this.busquedaView = new App.views.ConsultaBusquedaView({model:this.personaBuscada})
		this.$el.find(".consulta.busqueda").html(this.busquedaView.$el)

		this.infoGeneralView = new App.views.ConsultaInfoGeneralView({model:this.personaBuscada})
		this.$el.find(".consulta.info_general").html(this.infoGeneralView.$el)

		this.fichaView = new App.views.ConsultaFichaView({model:this.personaBuscada})
		this.$el.find(".consulta.ficha").html(this.fichaView.$el)


	},

	// Muestra mensajes en la vista
	showAlert : function(msg) {
		this.$alert.html(msg);
	},

	render: function() {
		this.$el.html(this.template());

		return this;
	},


	consulta : function(rut) {
		var self = this;
		this.personaBuscada = new App.models.Persona();
		this.personaBuscada.set("rut", rut);


		this.personaBuscada.fetch();

		this.personaBuscada.on("sync", function() {
			this.solicitudes.fetch();
			this.hogares.fetch();
			this.organizaciones.fetch();
			this.miembros.fetch();
		})

		// Actualiza las subvistas del módulo con el nuevo modelo

		// Busqueda
		if (this.busquedaView) this.busquedaView.close();
		this.busquedaView = new App.views.ConsultaBusquedaView({model:this.personaBuscada})
		this.$el.find(".consulta.busqueda").html(this.busquedaView.$el)

		// Info General
		if (this.infoGeneralView) this.infoGeneralView.close();
		this.infoGeneralView = new App.views.ConsultaInfoGeneralView({model:this.personaBuscada});
		this.$el.find(".consulta.info_general").html(this.infoGeneralView.$el);
		
		// Ficha
		if (this.fichaView) this.fichaView.close();
		this.fichaView = new App.views.ConsultaFichaView({model:this.personaBuscada});
		this.$el.find(".consulta.ficha").html(this.fichaView.$el);
		
		// Localizacion
		if (this.localizacionView) this.localizacionView.close();
		this.localizacionView = new App.views.ConsultaLocalizacionView({model:this.personaBuscada});
		this.$el.find(".consulta.localizacion").html(this.localizacionView.$el);

		
		// // Solicitudes 
		// if (this.solicitudesView) this.solicitudesView.close();
		// this.solicitudesView = new App.views.ConsultaSolicitudesView({collection:this.personaBuscada.solicitudes})
		// this.$el.find(".consulta.info.solicitudes").html(this.solicitudesView.$el);
// 
		// // Hogares 
		// if (this.hogaresView) this.hogaresView.close();
		// this.hogaresView = new App.views.ConsultaListaHogaresView({collection:this.personaBuscada.hogares});
		// this.$el.find(".consulta.info.hogares").html(this.hogaresView.$el);
	}


});

/**
* @class ConsultaBusquedaView vista con listado de personas
* 
* Construye una grilla con el listado de personas, incluyendo opciones para editar y eliminar los items
* permite también agregar nuevos items
*/
App.views.ConsultaBusquedaView = Backbone.View.extend({
	events: {
		"change .form-control.rut":"buscaPersona"
	},

	initialize: function() {
		var self = this;

		this.template = _.template($("#template_ConsultaBusquedaView").html());
		this.render();
	}, 

	render: function() {
		var self=this;

		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		return this;
	},
	
	buscaPersona: function(e) {
		var self = this;

		var rutCompleto = $(e.currentTarget).val();
		rutCompleto = rutCompleto.split(".").join(""); 
		var rut = rutCompleto.split("-");

		App.router.navigate("consulta/persona/"+rut[0], {trigger: true});
	},

	close: function() {
		this.remove();
		this.unbind();
	}


});

/**
* ConsultaInfoGeneralView
*/
App.views.ConsultaInfoGeneralView = Backbone.View.extend({
	initialize: function() {
		var self = this;

		this.model.on("sync", this.render, this);
		
		this.template = _.template($("#template_ConsultaInfoGeneralView").html());
		
	}, 

	render: function() {
		var self=this;


		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}


});


/**
* ConsultaFichaView
*/
App.views.ConsultaFichaView = Backbone.View.extend({
	initialize: function() {
		var self = this;

		this.model.on("sync", this.render, this);
		this.template = _.template($("#template_ConsultaFichaView").html());
		



		this.localizacionView = new App.views.ConsultaLocalizacionView({model:this.model})

		this.datosPersonalesView = new App.views.ConsultaDatosPersonalesView({model:this.model})
	
		this.serviciosSolicitadosView = new App.views.ConsultaServiciosSolicitadosView({collection:this.model.solicitudes})

		this.grupoHogarView = new App.views.ConsultaGrupoHogarView({collection:this.model.hogares})

		this.organizacionesView = new App.views.ConsultaOrganizacionesView({collection:this.model.organizaciones})

		this.miembrosView = new App.views.ConsultaMiembrosView({collection:this.model.miembros})
		
	}, 

	render: function() {
		var self=this;


		this.$el.html(this.template());

		this.$(".consulta.info.localizacion").html(this.localizacionView.$el);

		this.$(".consulta.info.datos_personales").html(this.datosPersonalesView.$el);

		this.$(".consulta.info.servicios_solicitados").html(this.serviciosSolicitadosView.$el);

		this.$(".consulta.info.grupo_hogar").html(this.grupoHogarView.$el);

		this.$(".consulta.info.organizaciones").html(this.organizacionesView.$el);

		this.$(".consulta.info.miembros").html(this.miembrosView.$el);

		this.checkTipoPersona();

		return this;
	},

	checkTipoPersona : function() {
		if (this.model.isPersonaNatural()) {

			this.$(".tab.miembros").hide();

		} else {
			
			this.$(".tab.datos_personales").hide();
			this.$(".tab.grupo_hogar").hide();
			this.$(".tab.organizaciones").hide();

		}
	},
	
	close: function() {
		this.remove();
		this.unbind();
	}





});



/**
* ConsultaLocalizacionView
*/
App.views.ConsultaLocalizacionView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		
		this.model.on("sync", this.render, this);

		this.template = _.template($("#template_ConsultaLocalizacionView").html());
			
	}, 

	render: function() {
		var self=this;

		var data = this.model.toJSON();
		for (member in data) {
		    if (data[member] == null){
		    	data[member] = ""
		    }
		}
		this.$el.html(this.template(data));



		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}



});



/**
* ConsultaDatosPersonalesView
*/
App.views.ConsultaDatosPersonalesView = Backbone.View.extend({
	
	"events":{
		"click .btn.calendar": "datepicker"

	},

	initialize: function() {
		var self = this;

		this.model.on("sync", this.render, this);

		this.template = _.template($("#template_ConsultaDatosPersonalesView").html());

		//Parámetros
		this.estadoCivilView = new App.views.ParametrosTipoEstadoCivilView();
		this.previsionView = new App.views.ParametrosPrevisionView();
		this.escolaridadView = new App.views.ParametrosEscolaridadView();
		this.actividadLaboralView = new App.views.ParametrosActividadLaboralView();

	}, 

	render: function() {
		var self=this;

		var data = this.model.toJSON();
		for (member in data) {
		    if (data[member] == null){
		    	data[member] = ""
		    }
		}
		this.$el.html(this.template(data));



		this.$(".estado_civil").html(this.estadoCivilView.$el);
		this.$(".prevision").html(this.previsionView.$el);
		this.$(".escolaridad").html(this.escolaridadView.$el);
		this.$(".actividad_laboral").html(this.actividadLaboralView.$el);

		

		return this;
	},

	datepicker: function(){
		this.$(".btn.calendar").datepicker();
	},





});



/**
* ConsultaServiciosSolicitadosView
*/
App.views.ConsultaServiciosSolicitadosView = Backbone.View.extend({
	initialize: function() {
		var self = this;


		this.template = _.template($("#template_ConsultaServiciosSolicitadosView").html());

		this.collection.on("sync", this.render, this);
	}, 

	render: function() {
		var self=this;

		var data = this.collection.toJSON();
		this.$el.html(this.template(data));
		this.collection.each(function(item) {
			var itemView = new App.views.ConsultaServiciosSolicitadosItemView({model:item})
			self.$el.find("table.solicitudes").append(itemView.$el);
		})

		return this;
	},




});


/**
* ConsultaServiciosSolicitadosItemView
*/
App.views.ConsultaServiciosSolicitadosItemView = Backbone.View.extend({
	tagName: "tr",

	initialize: function() {
		var self = this;


		this.template = _.template($("#template_ConsultaServiciosSolicitadosItemView").html());

		this.render();

	}, 

	render: function() {
		var self=this;


		var data = this.model.toJSON();
		for (member in data) {
		    if (data[member] == null){
		    	data[member] = ""
		    }
		}
		this.$el.html(this.template(data));

		return this;
	},




});



/**
* ConsultaGrupoHogarView
*/
App.views.ConsultaGrupoHogarView = Backbone.View.extend({
	initialize: function() {
		var self = this;


		this.template = _.template($("#template_ConsultaGrupoHogarView").html());

		this.collection.on("sync", this.render, this);
	}, 

	render: function() {
		var self = this;


		var data = this.collection.toJSON();
		this.$el.html(this.template(data));
		this.collection.each(function(item) {
			var itemView = new App.views.ConsultaGrupoHogarItemView({model:item})
			self.$(".accordion.hogares").append(itemView.$el);
		})

		return this;
	},




});


/**
* ConsultaGrupoHogarView
*/
App.views.ConsultaGrupoHogarItemView = Backbone.View.extend({
	initialize: function() {
		var self = this;


		this.template = _.template($("#template_ConsultaGrupoHogarItemView").html());
		this.miembros = this.model.miembros;
		this.listenTo(this.miembros, "sync", this.render)
		this.miembros.fetch();
	}, 

	render: function() {
		var self = this;


		var data = this.model.toJSON();
		data.cantmiembros = this.miembros.length;
		this.$el.html(this.template(data));

		this.miembros.each(function(item) {
			var itemView = new App.views.ConsultaGrupoHogarMiembrosItemView({model:item});
			self.$el.find("table.miembros").append(itemView.render().$el);
		})

		return this;
	},




});


/**
* ConsultaGrupoHogarView
*/
App.views.ConsultaGrupoHogarMiembrosItemView = Backbone.View.extend({
	tagName : "tr",

	initialize: function() {
		var self = this;
		this.template = _.template($("#template_ConsultaGrupoHogarMiembrosItemView").html());

	}, 


	render: function() {
		var self=this;

		// Create subsection for this household member
		this.$el.html(this.template(this.model.toJSON()));	

		return this;
	},

	close: function() {
		this.remove();
		this.unbind();
	}




});



/**
* ConsultaOrganizacionesView
*/
App.views.ConsultaOrganizacionesView = Backbone.View.extend({
	initialize: function() {
		var self = this;


		this.template = _.template($("#template_ConsultaOrganizacionesView").html());

		this.collection.on("sync", this.render, this);
	}, 

	render: function() {
		var self=this;


		var data = this.collection.toJSON();
		this.$el.html(this.template(data));
		this.collection.each(function(item) {
			var itemView = new App.views.ConsultaOrganizacionesItemView({model:item})
			self.$("table.organizaciones").append(itemView.render().$el);
		})

		return this;
	},




});

/**
* ConsultaGrupoHogarView
*/
App.views.ConsultaOrganizacionesItemView = Backbone.View.extend({
	tagName: "tr",

	initialize: function() {
		var self = this;


		this.template = _.template($("#template_ConsultaOrganizacionesItemView").html());

		this.render();
	}, 

	render: function() {
		var self=this;

		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		return this;
	},




});


/**
* ConsultaMiembrosView
*/
App.views.ConsultaMiembrosView = Backbone.View.extend({
	initialize: function() {
		var self = this;


		this.template = _.template($("#template_ConsultaMiembrosView").html());


		this.collection.on("sync", this.render, this);
	}, 

	render: function() {
		var self=this;


		var data = this.collection.toJSON();
		this.$el.html(this.template(data));
		this.collection.each(function(item) {
			var itemView = new App.views.ConsultaMiembrosItemView({model:item})
			self.$("table.miembros").append(itemView.render().$el);
		})

		return this;
	},




});


/**
* ConsultaMiembrosItemView
*/

App.views.ConsultaMiembrosItemView = Backbone.View.extend({
	tagName: "tr",

	initialize: function() {
		var self = this;


		this.template = _.template($("#template_ConsultaMiembrosItemView").html());

		this.render();
	}, 

	render: function() {
		var self=this;

		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		return this;
	},




});