The website of YPKBK, including a very simple CMS

# Application structure
/ - the site
/admin - the administration
/api - the api for the application

The root application simply returns the public static site. In the templates returned will call back to the /api and get the content for the different parts of the page.

In the administration part we simply administer the small content chunks

# Kanban
## Todo
* Setting up the administration site
** CRUD for content chunks
** List all
** Each chunk should have: title, id, text, publication_start, publication_end, tags, description (that doesn't show up on the page)

* Create API
** Get a content chunk by key
** Get content chunks by tag


## Doing
* Use CDN for common files
* Make a YPKBK demo site, but with real data

## Done
* Deploy first version


# License
The [MIT LICENSE](LICENSE) for the site code

Using the [Agency - Start Bootstrap Theme](http://startbootstrap.com/template-overviews/agency/) from [Start Bootstrap](http://startbootstrap.com) under the [Apache License](/public/LICENSE)