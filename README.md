The website of YPKBK, including a very simple CMS

# Application structure
/ - the site
/admin - the administration
/api - the api for the application

The root application simply returns the public static site. In the templates returned will call back to the /api and get the content for the different parts of the page.

In the administration part we simply administer the small content chunks

# Kanban
## Later
* Google Analytics setup
* The Yayasan Pelayan Kesehatan Bala Keselamatan needs to be smaller for medium sized screens
* make favicon for ypkbk


## Todo
* Hardcoded example news section

* Background pictures
	* header image
	* map
		* http://indonesiamap.facts.co/indonesiablankmap.png
		* http://d2z7bzwflv7old.cloudfront.net/cdn_image/exH_600/images/maps/en/id/id-outline.gif


* Setting up the administration site
	* Separate admin for Hospitals, Clinics, News and Lain-lain text
	* Create Read Update Delete for each

* Use the data to create webpage on each request

# Fix

## Doing (2)


## Done
* Make the social media icons bigger using fa-2x
* The panels for hospital doesn't have to be in <div class="row"></div> they will just overflow to the next line
* Structure the application using mount
	* Admin
	* Api

* Hardcoded, example clinic data
	* Define information
	** Opsir
	** Visi Misi
	** Pelayanan
	** Rujukan
	* Good pictures (400 x 250)
	* Information
* For example hospital
** pictures for web, fb and emails
** find good picture (400 wide x 250 high)
** get information to put on hospital page
* define hospital information
* Use CDN for common files
* Deploy first version


# License
The [MIT LICENSE](LICENSE) for the site code

Using the [Agency - Start Bootstrap Theme](http://startbootstrap.com/template-overviews/agency/) from [Start Bootstrap](http://startbootstrap.com) under the [Apache License](/public/LICENSE)