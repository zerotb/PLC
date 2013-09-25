App.models.Persona = Backbone.Model.extend({
	idAttribute: "rut",

	url: function() {
		return App.baseapiurl + "/personas/"+this.get('rut');
	},
	
	initialize : function() {
		var self = this;

		this.set("nombrecompleto", this.getFullName);

		this.hogares = new App.collections.Hogares();
		this.hogares.url = function() {
			return App.baseapiurl + "/personas/"+self.id+"/hogares"
		}

		this.organizaciones = new App.collections.Organizaciones();
		this.organizaciones.url = function() {
			return App.baseapiurl + "/personas/"+self.id+"/organizaciones"
		}

		this.miembros = new App.collections.Miembros();
		this.miembros.url = function() {
			return App.baseapiurl + "/personas/"+self.id+"/miembros"
		}


		this.solicitudes = new App.collections.Solicitudes();
		this.solicitudes.url = function() {
			return App.baseapiurl + "/personas/"+self.id+"/solicitudes"
		}
	},

	getFullName: function() {
		if (this.get('tipo_persona_cod') == "natural")
			return this.get('apellido_paterno')+" "+this.get('apellido_materno')+", "+this.get('nombre');
		else
			return this.get('razon_social')

	},

	isPersonaNatural: function() {
		return this.get("tipo_persona_cod")=="natural";
	}

})


App.collections.Personas = Backbone.Collection.extend({
	model: App.models.Persona,

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/personas";
	}

})


App.collections.TipoEstadoCivil = Backbone.Collection.extend({

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/tipoEstadoCivil";
	}

})


App.collections.Prevision = Backbone.Collection.extend({

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/tipoPrevision";
	}

})

App.collections.Escolaridad = Backbone.Collection.extend({

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/tipoEscolaridad";
	}

})


App.collections.ActividadLaboral = Backbone.Collection.extend({

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/tipoActividadLaboral";
	}

})

App.collections.SubtipoServicio = Backbone.Collection.extend({

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/servicios/1/subtipos";
	}

})

App.collections.EstadoSolicitud = Backbone.Collection.extend({

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/tipoEstadoSolicitud";
	}

})

App.models.SolicitudTEST = Backbone.Model.extend({
	initialize: function() {
		var a = 5;
	},
	
	defaults:{
        "id":null,
        "persona_rut":"",
        "servicio_id":"",
        "servicio_subtipo_id":"1",
        "detalle_publico":"",
        "detalle_privado":"",
        "monto_solicitud":0,
        "referencia_solicitud":"",
        "created_date":"",
        "_embedded":{"persona":{"_label":""}}
    },

	url: function() {
	// 	//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		var mylinks = this.get("_links");
	 	return mylinks.self.href;
	}
})

App.collections.SolicitudesServicios = Backbone.Collection.extend({
	model: App.models.SolicitudTEST,

	initialize: function() {
		this.servicioId = 1;
		this.filter = []; // [{filtro:"persona", valor:"99565570"}];
	},


	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		
		var myurl =  App.baseapiurl + "/servicios/"+this.servicioId+"/solicitudes";
		if (this.filter.length > 0) {
			myurl = myurl+"?";
			for (var i = 0; i < this.filter.length; i++) {
				if (i==0) {
					myurl = myurl + this.filter[i].filtro+"="+this.filter[i].valor;
				} else {
					myurl = myurl + "&"+this.filter[i].filtro+"="+this.filter[i].valor;
				}
			} 
		}

		return myurl;

	},

	setFilter: function(filter) {
		this.filter = filter;
	}

})




App.models.Solicitud = Backbone.Model.extend({
	
	defaults:{
        "id":null,
        "persona_rut":"",
        "servicio_id":"",
        "servicio_subtipo_id":"1",
        "detalle_publico":"",
        "detalle_privado":"",
        "monto_solicitud":0,
        "referencia_solicitud":"",
        "created_date":"",
        "version":"",
        "_embedded":{"persona":{"_label":""}}
    }

	// url: function() {
	// 	//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
	// 	return App.baseapiurl + "/solicitudes/";
	// }
})

App.collections.Solicitudes = Backbone.Collection.extend({
	model: App.models.Solicitud,

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/solicitudes";
	}

})


App.models.Hogar = Backbone.Model.extend({
	
	initialize : function() {
		this.miembros = new App.collections.MiembrosDeHogar();
		this.miembros.url = App.baseapiurl + "/hogares/"+this.id+"/miembros"
	},

})

App.collections.Hogares = Backbone.Collection.extend({
	model: App.models.Hogar,

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/hogar";
	}

})

App.models.MiembroDeHogar = Backbone.Model.extend({
	initialize : function() {
		this.persona = new App.models.Persona();
		this.persona.url = function() {
			return App.baseapiurl + "/personas/"+this.get('persona_rut')
		}
	},
})

App.collections.MiembrosDeHogar = Backbone.Collection.extend({
	model: App.models.MiembroDeHogar

})



App.models.MiembroDeOrganizacion = Backbone.Model.extend({
	initialize : function() {
		this.persona = new App.models.Persona();
		this.persona.url = function() {
			return App.baseapiurl + "/persona/"+this.get('persona_rut')
		}
	},
})

App.collections.MiembrosDeOrganizacion = Backbone.Collection.extend({
	model: App.models.MiembroDeOrganizacion

})


App.collections.Organizacion = Backbone.Collection.extend({
	idAttribute: "rut",

	url: function() {
		//return "http://testphptide.azurewebsites.net/test/test/index.php/apiplc/persona"
		return App.baseapiurl + "/personas/"+this.id+"/organizaciones";
	}

})

App.collections.Organizaciones = Backbone.Collection.extend({
	//model: App.models.Organizacion,

	url: function() {
		return App.baseapiurl + "/personas/"+this.id+"/organizaciones";
	}

})

App.collections.Miembros = Backbone.Collection.extend({
	//model: App.models.Organizacion,

	url: function() {
		return App.baseapiurl + "/personas/"+this.id+"/miembros";
	}

})

App.collections.APIs = Backbone.Collection.extend({
	url: function() {
		return "./api.js";
	}

})

App.models.TEST = Backbone.Model.extend({
	parse: function(data, a, b) {
		// Data from firebase arrives as aon object (not array).  {"1": {"name":"john"}, "2": {"name":"jane"}}
		// We have to transform it to an array [{id:"1", name:"john"}, {id:"2", name:"jane"}, ...]
		var keys = _.keys(data);
		var name = keys[0];

		var item = data[key];
		item.id = name;

		return item;
	}


})

App.collections.TEST = Backbone.Collection.extend({
	model: App.models.TEST,

	url: function() {
		return "https://tide.firebaseio.com/test.json";
	},

	parse: function(data, a, b) {
		// Data from firebase arrives as aon object (not array).  {"1": {"name":"john"}, "2": {"name":"jane"}}
		// We have to transform it to an array [{id:"1", name:"john"}, {id:"2", name:"jane"}, ...]
		var keys = _.keys(data);
		var array = [];

		_.each(keys, function(key) {
			var item = data[key];
			item.id = key;

			array.push(item)
		})
		return array;
	}


})