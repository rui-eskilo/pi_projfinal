function Queixinha(id, estado, categoria, criador, geo, descricao)
{
	this.id = id;
	this.state = estado;
	this.description = descricao;
	this.owner = criador;
	this.cat = categoria;
	this.geoRef = geo;
}

module.exports.Queixinha = Queixinha;