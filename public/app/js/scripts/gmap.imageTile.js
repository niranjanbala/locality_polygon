function ImageTiles (map, options) {
      var self = this;

      self.tileSize = new google.maps.Size(256,256);
      self.maxZoom = 20;
      self.minZoom = 6;
      self.baseURL = options.baseURL;
      self.setBaseURL = function(url){
        self.baseURL = url;
      };
      self.getTile = function(coord, zoom, ownerDocument) {
        if (zoom < self.minZoom || zoom > self.maxZoom) {
            return ownerDocument.createElement('div');
        }
        var div = ownerDocument.createElement('div'),
          img = ownerDocument.createElement('img');

        var imgURL = self.baseURL.replace('{Z}', Math.floor(zoom))
                                 .replace('{X}', self.normalizeCoordinate(coord.x, zoom))
                                 .replace('{Y}', self.normalizeCoordinate(coord.y, zoom));

        img.src = imgURL;
        img.setAttribute("class", "heatmap_tile");
        img.style.width = this.tileSize.width + 'px';
        img.style.height = this.tileSize.height + 'px';
        img.style.borderWidth = '0px';

        div.appendChild(img);

        return div;
      };

      self.normalizeCoordinate = function (coord, zoom) {
        // tiles are on a 4^zoom tile grid
        var maxTiles = Math.sqrt(Math.pow(4, zoom));

        if (zoom > 0)
        {
          while (coord > maxTiles || coord < 0)
          {
            if (coord > maxTiles)
            {
              coord -= maxTiles;
            }
            else if (coord < 0)
            {
              coord += maxTiles;
            }
          }
        }

        return coord;
      };

      return self;
    }