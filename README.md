The source code of [website of YPKBK](http://ypkbksite.herokuapp.com), including a very simple CMS

# Application structure
/ - the site
/admin - the administration

The root application simply returns the public static site. In the templates returned will call back to the /api and get the content for the different parts of the page.

In the administration part we simply administer the small content chunks

index.html before template: 705 lines (674 sloc)  39.011 kb
index.html after  template: ???



# Kanban
## Later
* Google Analytics setup
* The Yayasan Pelayan Kesehatan Bala Keselamatan needs to be smaller for medium sized screens
* Set the app name of the site when doing Add to homescreen
* Create list of old articles in admin-ui
* Test for sorting texts should verify that the text are sorted
* Test for sorting articles should verify that the articles are sorted
* Consider move all pictures to flickr

## Todo
* Tests that **doesn't** verify the database content.
* Background pictures
	* header image

## Refactoring ideas
* change css style name service-heading to be articles-heading
* function getSlugFromName is duplicated
* create a separate file for site routes

## Doing (2)
* Contact form should send proper emails


## Done
* tests for articles on site
* Use article data on the site
* Create Flickr Account (ypkbk, https://www.flickr.com/photos/131918734@N03/?, https://farm8.staticflickr.com/7584/16596141074_afeebb86ed_m_d.jpg)
* Administration Article
* Administration Clinics
* Use clinic data on the site
* created one test helpers
* Refactor lib (render and db) to one place
* Change to hospital*s*Collection
* Sorting of lain-lain texts in the admin UI
* Set safe output ({{ apa | safe }}) for all textarea fields for hospitals
* Add kantor information
* Administration Lain-lain
* Use lain-lain texts on the site
* Link directly to hospital/clinic/news doesnt work
* Use hospital data on the site
* Server images from Dropbox / Google Drive - DOESN'T WORK
* add city and id property for hospitals
* remove unsed files in admin
* make favicon for ypkbk
* Set up github
	* Deny
	* Org for YPKBK
* closing modal windows should set URL (ex. #institution-rsbungsu -> #hospitals)
* Admin hospitals
* Fixed... again the linking to the to modal windows
* Background image for contact us
* Hardcoded example news section
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
