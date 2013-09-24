window.App = {
        models : {},
        collections : {},
        views : {},
/*        baseapiurl : "http://testphptide.azurewebsites.net/test/test/index.php/apiplc"
*/        baseapiurl : "http://uranio.tide.cl/plc/apiplc"
}


$().ready(function() {
        // Definición de datos a utilizar en la App

        // CONSTRUCCION DE MODELOS Y COLECCIONES
        // =====================================

		// personas - utilizado en administración de personas
		App.collections.personas = new App.collections.Personas();
	
		// personaEnConsulta - utilizado en módulo de consulta
		App.models.personaEnConsulta = new App.models.Persona();
		App.models.personaEnConsulta.on("sync", function() {
			this.solicitudes.fetch();
			this.hogares.fetch();
            this.organizaciones.fetch();
            this.miembros.fetch();
		})


        // consultaMainView - Consulta de persona
        App.views.consultaMainView = new App.views.ConsultaMainView({
                el:$(".seccion.consulta"),
                model:App.models.personaEnConsulta
        });

        App.views.solicitudesMainView = new App.views.SolicitudesMainView({
                el:$(".seccion.solicitudes")
        });

        App.views.solicitudesNuevaSolicitudView = new App.views.SolicitudesNuevaSolicitudView({
        });

        // App.views.consultaBusquedaView = new App.views.ConsultaBusquedaView({
                // el:$(".consulta.busqueda"),
                // model:App.models.personaEnConsulta
        // });
// 
        // App.views.consultaInfoGeneralView = new App.views.ConsultaInfoGeneralView({
                // el:$(".consulta.info_general"),
                // model:App.models.personaEnConsulta
        // });

        // adminPersonaUpdateView - Actualiza datos de una persona
        /*App.views.adminPersonaUpdateView = new App.views.AdminPersonaUpdateView();*/

        App.router = new App.AppRouter({app:window.app });
        
        Backbone.history.start();


});

// Intercepta links para tener navegación con rutas (urls) normales (/ en vez de #)
// Globally capture clicks. If they are internal and not in the pass 
// through list, route them through Backbone's navigate method.
$(document).on("click", "a[href^='/']", function(event){
	var href = $(event.currentTarget).attr('href');

	// chain 'or's for other black list routes
  	var passThrough = href.indexOf('sign_out') >= 0;

	// Allow shift+click for new tabs, etc.
	if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) 
		event.preventDefault()

	// Remove leading slashes and hash bangs (backward compatablility)
	var url = href.replace(/^\//,'').replace('\#\!\/','');

	// Instruct Backbone to trigger routing events
	App.router.navigate(url, {trigger:true});

	return false
});