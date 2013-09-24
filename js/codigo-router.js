// Router 
App.AppRouter = Backbone.Router.extend({

	routes:{
		"":"consulta",
		"admin/persona":"adminPersona",
		"admin/persona/update/:rut": "updatePersona",
		"admin/persona/delete/:rut": "deletePersona",
		"admin/persona/create": "createPersona",
		"consulta":"consulta",
		"consulta/persona/:rut":"consultaPersona",
		"solicitudes":"solicitudes",
		"solicitudes/nuevaSolicitud":"nuevaSolicitud"
	},


	initialize: function() {

		// Oculta todas las secciones (DIVS con clase 'seccion')
		$(".seccion").hide();
	},

	// admin/create/persona
	consultaPersona: function(rut) {
		this.consulta();

		App.models.personaEnConsulta.set("rut", rut);
		App.models.personaEnConsulta.fetch();

		App.views.consultaMainView.consulta(rut);

	},

	solicitudesPersonaNuevaSolicitud: function(rut) {
		

		App.models.personaEnConsulta.set("rut", rut);
		App.models.personaEnConsulta.fetch();

		this.nuevaSolicitud();

		// App.views.solicitudesMainView.consulta(rut);

	},

	// Otra sección
	consulta:function () {
		console.log("consulta");
		$(".nav.navbar-nav  li").removeClass("active");
		$(".nav.navbar-nav li.consulta").addClass("active");
		$(".seccion").hide();
		$(".seccion.consulta").show();
	},

	solicitudes:function () {
		console.log("solicitudes");
		$(".nav.navbar-nav li").removeClass("active");
		$(".nav.navbar-nav li.gestion_servicios").addClass("active");
		$(".seccion").hide();
		$(".seccion.solicitudes").show();
	},

	
	nuevaSolicitud:function () {
		App.views.solicitudesNuevaSolicitudView.render();
	},


});

