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

	Gallery.init();

})(this);