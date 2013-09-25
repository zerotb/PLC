App.views.SolicitudesMainView = Backbone.View.extend({

	/**
	* @class SolicitudesMainView vista principal para administración de solicitudes
	*
	* @augments Backbone.View
	* @constructs
	*
	* @param {object} options parametros de incializacion
	* @param {string} options.el Identificador de elemento en DOM donde se despliegau la vista
	* @param {string} options.collection Colección (personas) utilizada en la administración de personas
	* 
	*/
	initialize: function() {
		var self = this;

		this.template = _.template($("#template_SolicitudesMainView").html());
		
		this.render();

		this.solicitudes = new App.collections.SolicitudesServicios();
		this.solicitudes.fetch();

		this.filtroView = new App.views.SolicitudesFiltroView()
		this.$(".filtro").html(this.filtroView.$el);
		this.listenTo(this.filtroView, "filtrar", this.filtrarSolicitudes);

		this.serviciosSolicitadosListView = new App.views.SolicitudesServiciosSolicitadosListView({collection:this.solicitudes})
		this.$(".servicios_solicitados").html(this.serviciosSolicitadosListView.$el)

		this.filtrarSolicitudes([]);

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


		// Actualiza las subvistas del módulo con el nuevo modelo

		// // Busqueda
		// if (this.busquedaView) this.busquedaView.close();
		// this.busquedaView = new App.views.ConsultaBusquedaView({model:this.personaBuscada})
		// this.$el.find(".consulta.busqueda").html(this.busquedaView.$el)

		// // Info General
		// if (this.infoGeneralView) this.infoGeneralView.close();
		// this.infoGeneralView = new App.views.ConsultaInfoGeneralView({model:this.personaBuscada});
		// this.$el.find(".consulta.info_general").html(this.infoGeneralView.$el);
		
		// // Ficha
		// if (this.fichaView) this.fichaView.close();
		// this.fichaView = new App.views.ConsultaFichaView({model:this.personaBuscada});
		// this.$el.find(".consulta.ficha").html(this.fichaView.$el);
		
		// // Localizacion
		// if (this.localizacionView) this.localizacionView.close();
		// this.localizacionView = new App.views.ConsultaLocalizacionView({model:this.personaBuscada});
		// this.$el.find(".consulta.localizacion").html(this.localizacionView.$el);

		
		// // Solicitudes 
		// if (this.solicitudesView) this.solicitudesView.close();
		// this.solicitudesView = new App.views.ConsultaSolicitudesView({collection:this.personaBuscada.solicitudes})
		// this.$el.find(".consulta.info.solicitudes").html(this.solicitudesView.$el);
// 
		// // Hogares 
		// if (this.hogaresView) this.hogaresView.close();
		// this.hogaresView = new App.views.ConsultaListaHogaresView({collection:this.personaBuscada.hogares});
		// this.$el.find(".consulta.info.hogares").html(this.hogaresView.$el);

		
	},

	filtrarSolicitudes : function(filtro) {
		this.solicitudes.setFilter(filtro);
		this.solicitudes.fetch();
	}


});


/**
* SolicitudesFiltroView
*/
App.views.SolicitudesFiltroView = Backbone.View.extend({
	events: {
		"change input.filtro": "filtrar",
	},


	initialize: function() {
		var self = this;

		this.template = _.template($("#template_SolicitudesFiltroView").html());
		
		this.render();



	},


	render: function() {
		this.$el.html(this.template());

		return this;
	},

	filtrar: function() {
		var filtro = [];
		var rut = $("input.filtro.rut").val();

		if (rut) {filtro.push({"filtro":"persona", valor:rut})};
		this.trigger("filtrar", filtro)
	}

});

/**
* SolicitudesServiciosSolicitadosListView
*/
App.views.SolicitudesServiciosSolicitadosListView = Backbone.View.extend({


	initialize: function() {
		var self = this;

		this.template = _.template($("#template_SolicitudesServiciosSolicitadosListView").html());
		
		this.collection.on("sync", this.render, this);
		this.listenTo(this.collection, "add", this.render);
		this.listenTo(this.collection, "remove", this.render);



	},


	render: function() {
		
		var data = this.collection.toJSON();
		this.$el.html(this.template(data));
		this.collection.each(function(item) {
			var itemView = new App.views.SolicitudesServiciosSolicitadosItemView({model:item})
			self.$("table.solicitudes").append(itemView.$el);
		})

		return this;
	},
});


/**
* SolicitudesServiciosSolicitadosItemView
*/
App.views.SolicitudesServiciosSolicitadosItemView = Backbone.View.extend({
	tagName: "tr",

	events : {
		"click .boton.edicion" : "edicion",
		"click .boton.eliminar" : "eliminar",
	},

	initialize: function() {
		var self = this;

		this.template = _.template($("#template_SolicitudesServiciosSolicitadosItemView").html());
		
		// this.model.on("sync", this.render, this);
		this.render();



	},


	render: function() {
		

		var data = this.model.toJSON();
		for (member in data) {
		    if (data[member] == null){
		    	data[member] = ""
		    }
		}
		this.$el.html(this.template(data));

		return this;
	},

	edicion: function() {
		App.views.solicitudesNuevaSolicitudView.setModel(this.model);
	},	

	eliminar: function() {
		if (confirm('Desea eliminar solicitud '+this.model.get("id"))) { 
		  this.model.destroy();
		}
	}

	
});


/**
* SolicitudesNuevaSolicitudView
*/
App.views.SolicitudesNuevaSolicitudView = Backbone.View.extend({
	
	className: "modal fade",

	events: {
		"click .btn.cancel": "hide",
		"click .btn.close": "hide",
		"click .btn.save": "save",
		"click .btn.calendar": "datepicker",
		"change .form-control.persona_rut":"buscaPersona"
	},

	initialize: function() {
		var self = this;

		this.template = _.template($("#template_SolicitudesNuevaSolicitudView").html());

		this.personaBuscada = new App.models.Persona(); 

		this.solicitudCreada = new App.models.Solicitud();

		this.collection = new App.collections.Solicitudes();


		this.subtipoServicioView = new App.views.ParametrosSubtipoServicioView();
		this.estadoSolicitudView = new App.views.ParametrosEstadoSolicitudView();

		this.listenTo(this.solicitudCreada, "change", this.render);



	}, 

	datepicker: function(){
		this.$(".btn.calendar").datepicker();
		// this.$(".modal.in").attr("z-index":1);
	},

	setModel: function(model) {
		this.solicitudCreada = model;
		this.listenTo(this.solicitudCreada, "change", this.render);
		this.render()
	},

	buscaPersona: function(e) {
		var self = this;

		var rutCompleto = this.$(".form-control.persona_rut").val();
		rutCompleto = rutCompleto.split(".").join(""); 
		var rut = rutCompleto.split("-");

		this.existePersona = false;

		this.personaBuscada.set("rut", rut)
		this.personaBuscada.fetch({
			error : function(model, response, options) {
				alert("Error ");
				self.existePersona = false;

				
			},

			success: function(model, response, options) {
				console.log("success");
				self.existePersona = true;
			}
		});

	},


	save: function() {
		var self = this;



		if(this.existePersona){

			var persona_rut = this.$(".form-control.persona_rut").val();
			var servicio_id = "1";
			var created_date = "0000-00-00 00:00:00";
			var detalle_publico = this.$(".form-control.detalle_publico").val();
			var detalle_privado = this.$(".form-control.detalle_privado").val();
			var monto_solicitud = this.$(".form-control.monto_solicitud").val();
			var referencia_solicitud = this.$(".form-control.referencia_solicitud").val();


			var data = {
				"persona_rut": persona_rut,
				"servicio_id": servicio_id,
				"created_date": created_date,
				"detalle_publico": detalle_publico,
				"detalle_privado": detalle_privado,
				"monto_solicitud": monto_solicitud,
				"referencia_solicitud": referencia_solicitud
				};

			this.solicitudCreada.set(data);


			if(this.solicitudCreada.isNew()){



				this.collection.create(this.solicitudCreada, {
					wait: true,
					error:function(model,xqr,options) {
						var errorMsg = "Error al crear solicitud. "+ xqr.statusText+" ("+xqr.responseText + ")";
						console.log(errorMsg);
					}, 
					success: function(model,response,options) {
						var successMsg =  "Datos creados ("+model.id+")";
						console.log(successMsg);
						self.solicitudCreada.fetch();

						self.render();

					}
				});

			}else{

				this.solicitudCreada.save({},{
					error:function(model,xqr,options){
						var errorMsg = "Error al crear solicitud. "+ xqr.statusText+" ("+xqr.responseText + ")";
						console.log(errorMsg);
					},
					success:function(model,xqr,options){
						var successMsg =  "Datos actualizados ("+model.id+")";
						console.log(successMsg);

						self.render();
						self.solicitudCreada.fetch();
					}
					

				});

			}	



		}else{
			alert("Rut inválido");
		}




	},

	render: function() {
		var self=this;

		//alert("render");
		


		var data = this.solicitudCreada.toJSON();
		for (member in data) {
		    if (data[member] == null){
		    	data[member] = ""
		    }
		}

		self.$el.html(self.template(data));
		this.buscaPersona();

		this.subtipoServicioView.setSelectedOption(data.servicio_subtipo_id);
		this.estadoSolicitudView.setSelectedOption(data.tipo_estado_solicitud_id);

		this.$(".subtipo_servicio").html(this.subtipoServicioView.$el);
		this.$(".estado_solicitud").html(this.estadoSolicitudView.$el);

		self.$el.modal("show");

		//Verifica que el rut ingresado es correcto
		


	},


	hide: function() {
		App.router.navigate("solicitudes", {trigger:true});
		this.$el.modal("hide");
	},

	close: function() {	
		this.hide();
		this.undelegateEvents();
		this.remove();
	},
});