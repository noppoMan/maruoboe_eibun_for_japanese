exports.get = {
	"/" : "routes.index",
	"/article/add" : "article.add",
	"/article/add_tag" : "article.add_tag",
	"/article/edit" : "article.edit",
	"/article/result" : "article.result",
	"/article/list" : "article.list",
	"/search/scene" : "search.scene",
	"/search/refine" : "search.refine",
	"/official/about" : "official.about",
}

exports.post = {
	"/article/edit" : "article.edit",
	"/article/save_exec" : "article.save_exec",
	"/search/search_exec" : "search.search_exec",
}