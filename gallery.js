(function(root) {
	var PhotoWidget = root.PhotoWidget = (root.PhotoWidget || {});

	var Gallery = PhotoWidget.Gallery = function(el) {
		this.el = el;
		this.photos = this.dupPhotos(el.getElementsByTagName('img'));
		this.mode = this.getMode(el);
		this.innerFrame = null;
		this.filmstrip = null;
		this.currentPhoto = 0;
		this.render();
	};

	Gallery.init = function() {
		var elements = document.getElementsByClassName("photo_widget")
		for (var i = 0; i < elements.length; i++){
			new Gallery(elements[i])
		}
	};

	Gallery.prototype.getMode = function(el) {
		if (el.classList.contains("mode_single")) {
			return "single"
		} else {
			return "filmstrip"
		}
	};

	Gallery.prototype.dupPhotos = function(photos) {
		var dupedPhotos = [];
		for (var i = 0; i < photos.length; i++) {
			dupedPhotos.push(photos[i]);
		}
		return dupedPhotos;
	}

	Gallery.prototype.render = function() {
		this.makeFrame();
		this.configPhotos();
		this.addListeners();
		this.applyCss();
	};

	Gallery.prototype.makeFrame = function() {
		var frame = document.createElement("div");
		this.el.appendChild(frame);
		frame.classList.add("frame");
		this.innerFrame = document.createElement("div");
		this.innerFrame.classList.add("inner-frame");
		frame.appendChild(this.innerFrame);
		if (this.mode === "filmstrip") {
			this.addFilmstrip(frame);
		}
	};

	Gallery.prototype.addFilmstrip = function(frame) {
		this.filmstrip = document.createElement("div");
		this.filmstrip.classList.add("filmstrip");
		frame.appendChild(this.filmstrip);
	};

	Gallery.prototype.configPhotos = function() {
		if (this.mode === "single") {
			this.configSinglePhotos();
		} else {
			this.configFilmStripPhotos();
		}
	};

	Gallery.prototype.configSinglePhotos = function() {
		for(var i = 0; i < this.photos.length; i++){
    		var photo = this.photos[i];
    		this.innerFrame.appendChild(photo);
    		if(i !== 0){
        		photo.style.display = "none";
    		};
    	};
	};

	Gallery.prototype.configFilmStripPhotos = function() {
		var featuredPhotoSrc = this.photos[0].getAttribute('src');
		var featuredPhoto = document.createElement("img")
		featuredPhoto.setAttribute('src', featuredPhotoSrc);
		this.innerFrame.appendChild(featuredPhoto);
		for (var i = 0; i < this.photos.length; i++) {
			this.filmstrip.appendChild(this.photos[i]);
		}
	};

	Gallery.prototype.addListeners = function() {
		if (this.mode === "single") {
			this.el.addEventListener("click", this.swapSinglePhoto.bind(this));
		} else {
			this.filmstrip.addEventListener("click", this.swapFilmstrip.bind(this));
		}
	};

	Gallery.prototype.swapSinglePhoto = function() {
		this.photos[this.currentPhoto].style.display = "none";
		if(this.currentPhoto < this.photos.length-1) {
			this.currentPhoto += 1
		}
		else {
			this.currentPhoto = 0;
		}
		this.photos[this.currentPhoto].style.display = "block";
	};

	Gallery.prototype.swapFilmstrip = function (event) {
		var newImgSrc = event.target.getAttribute("src");
		var newImg = document.createElement("img");
		newImg.setAttribute("src", newImgSrc);
		this.innerFrame.innerHTML = "";
		this.innerFrame.appendChild(newImg);
	};

	Gallery.prototype.applyCss = function() {
		var style = document.createElement("style");
		style.type = 'text/css';
		document.head.appendChild(style);

	    var sheet = document.styleSheets[0];
	    sheet.addRule('.photo_widget', 'height: 300px; width: 300px; margin-left: auto; margin-right: auto; border: 5px solid black; border-radius: 5px;')
	    sheet.addRule('.mode_filmstrip', 'height: 420px;')
	    sheet.addRule('.mode_single', 'cursor: pointer')
	    sheet.addRule('.frame', 'height: 300px; width: 300px; background-color: black;');
	    sheet.addRule('.inner-frame', 'height: 100%; width: 100%; overflow: hidden');
	    sheet.addRule('.filmstrip img', 'height: 100px; width: auto; display: inline-block; border: 3px solid black;')
	    sheet.addRule('.filmstrip', 'height: 120px; width: 100%; overflow-x: scroll; overflow-y: hidden; background-color: black; white-space: nowrap; cursor: pointer;')
		};

	Gallery.init();

})(this);